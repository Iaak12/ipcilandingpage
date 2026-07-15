import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Navbar, Footer } from './App.jsx';
import AbstractSubmissionForm from './AbstractSubmissionForm.jsx';
import {
  CalendarDays, MapPin, ArrowLeft, ArrowRight,
  CheckCircle, Users, Award, FileText, Globe, Info,
  Plane, Train, Car, Home, XCircle, AlertCircle, Sparkles, BookOpen,
  X, Loader2, Send, Heart, Star
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

const REGISTRATION_FEES = {
  indian: [
    { id: 'ug', label: 'Undergraduate Students', early: 2000, regular: 3000, spot: 4000 },
    { id: 'pg', label: 'Postgraduate Students', early: 3000, regular: 4000, spot: 5000 },
    { id: 'phd', label: 'PhD Scholars / Research Fellows', early: 3500, regular: 4500, spot: 5500 },
    { id: 'faculty', label: 'Faculty / Practitioners', early: 6000, regular: 7500, spot: 9000 },
    { id: 'industry', label: 'Industry Delegates', early: 12000, regular: 15000, spot: 18000 },
    { id: 'institutional', label: 'Institutional Delegation (5 Delegates)', early: 25000, regular: 30000, spot: null }
  ],
  international: [
    { id: 'intl_student', label: 'International Students', early: 100, regular: 125, spot: 150, currency: 'USD' },
    { id: 'intl_delegate', label: 'International Delegates', early: 200, regular: 250, spot: 300, currency: 'USD' }
  ]
};

const THEMES = [
  "Acute Pancreatitis", "Chronic Pancreatitis", "Pediatric Pancreatitis", "Genetics & Biomarkers",
  "Endoscopy & Surgery", "Nutrition & Lifestyle", "Pain Management", "Basic Science",
  "Integrative Medicine", "Drug Discovery & Reverse Pharmacology", "Patient Advocacy & Quality of Life"
];

const getCurrentPhase = () => {
  const now = new Date();
  if (now <= new Date('2026-09-30T23:59:59')) return 'early';
  if (now <= new Date('2027-01-31T23:59:59')) return 'regular';
  return 'spot';
};

export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', designation: '', institution: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAbstractModalOpen, setIsAbstractModalOpen] = useState(false);

  // Simple Math Captcha State
  const [mathCaptcha, setMathCaptcha] = useState({ num1: 0, num2: 0, answer: '' });
  
  // Generate new math captcha
  const generateCaptcha = () => {
    setMathCaptcha({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1,
      answer: ''
    });
  };

  useEffect(() => {
    if (isModalOpen) {
      generateCaptcha();
    }
  }, [isModalOpen]);

  // New Registration Form State
  const [nationality, setNationality] = useState('indian'); // 'indian' | 'international'
  const [selectedCategoryId, setSelectedCategoryId] = useState('faculty');
  const currentPhase = getCurrentPhase();

  // Find the selected category data
  const categoryData = REGISTRATION_FEES[nationality]?.find(c => c.id === selectedCategoryId) || REGISTRATION_FEES[nationality][0];
  const currentPrice = categoryData[currentPhase];
  const currency = categoryData.currency || 'INR';

  // Make sure to update selected category if nationality changes and the old ID isn't found
  useEffect(() => {
    if (!REGISTRATION_FEES[nationality].find(c => c.id === selectedCategoryId)) {
      setSelectedCategoryId(REGISTRATION_FEES[nationality][0].id);
    }
  }, [nationality]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollRef = useRef(null);
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollBy({ left: clientWidth * 0.8, behavior: 'smooth' });
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    return e;
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const submitForm = async (paymentId) => {
    const formData = new FormData();
    formData.append("access_key", "045af9f2-df45-4afd-bacb-f59ed567d070");
    formData.append("subject", `New Registration & Payment - ${form.name}`);
    formData.append("from_name", "IPCI 2027 Registration");
    
    // Add ReplyTo so the admin can easily reply to the user
    formData.append("replyTo", form.email);
    
    formData.append("Name", form.name);
    formData.append("Email", form.email);
    formData.append("Phone", form.phone);
    formData.append("Designation", form.designation);
    formData.append("Institution", form.institution);
    formData.append("Category", categoryData.label);
    formData.append("Amount Paid", `${currency === 'INR' ? '₹' : '$'}${currentPrice.toLocaleString('en-IN')}`);
    formData.append("Payment Status", "Successful");
    formData.append("Razorpay Payment ID", paymentId);
    
    if (form.message.trim()) {
      formData.append("Message", form.message);
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setErrors({});
        setSubmitted(true);
      } else {
        alert("Something went wrong with form submission: " + data.message);
      }
    } catch (error) {
      alert("Something went wrong submitting form. Please contact support.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    
    // Math Captcha Validation
    const expectedAnswer = mathCaptcha.num1 + mathCaptcha.num2;
    if (!mathCaptcha.answer) {
      errs.captcha = "Please answer the security question.";
    } else if (parseInt(mathCaptcha.answer) !== expectedAnswer) {
      errs.captcha = "Incorrect answer. Please try again.";
      generateCaptcha(); // regenerate on failure
      setMathCaptcha(prev => ({...prev, answer: ''}));
    }
    
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setIsSubmitting(true);
    
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      setIsSubmitting(false);
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_live_T6CokHy3SBvB4h",
      amount: currentPrice * 100, // Amount in paise/cents
      currency: currency,
      name: "IPCI 2027",
      description: `Registration Fee - ${categoryData.label}`,
      handler: async function (response) {
        // Successful payment, proceed to submit form
        await submitForm(response.razorpay_payment_id);
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone
      },
      theme: {
        color: "#0ea5e9" // Tailwind sky-500
      },
      modal: {
        ondismiss: function() {
          setIsSubmitting(false);
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen bg-[#f0fdf9] font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 hero-mesh relative overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-sky-500 text-white px-5 py-2 rounded-full shadow-lg shadow-emerald-200 mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest">Registration Open</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0B1E4A] leading-tight mb-4">
              IPCI 2027 <span className="gradient-text-green block mt-2">Registration</span>
            </h1>
            
            <p className="text-xl text-slate-600 font-semibold mb-6">
              Advancing Science. Improving Care. Building Collaborations.
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8 mb-10">
              <div className="flex items-center gap-2.5 glass px-5 py-3 rounded-2xl shadow-sm">
                <CalendarDays size={20} className="text-emerald-500 shrink-0" />
                <span className="font-bold text-[#0B1E4A] text-sm sm:text-base">12–14 February 2027</span>
              </div>
              <div className="flex items-center gap-2.5 glass px-5 py-3 rounded-2xl shadow-sm">
                <MapPin size={20} className="text-sky-500 shrink-0" />
                <span className="font-bold text-[#0B1E4A] text-sm sm:text-base">Gandhi Hall, Pantnagar University, Uttarakhand, India</span>
              </div>
            </div>

            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              The International Pancreatitis Conclave India 2027 (IPCI 2027) is a premier international scientific forum dedicated to advancing research, clinical practice, innovation, and interdisciplinary collaboration in pancreatitis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E4A]">Registration Categories & Fees</h2>
            <p className="text-slate-500 mt-3">Choose the appropriate category to register for IPCI 2027</p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
            {/* Interactive Form Card */}
            <div className="lg:col-span-5">
              <div className="glass rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xl shadow-sky-100/50 relative overflow-hidden h-full flex flex-col">
                <div className="absolute top-0 right-0 w-48 h-48 bg-sky-400/10 rounded-full blur-3xl pointer-events-none"></div>
                <h3 className="text-2xl font-black text-[#0B1E4A] mb-6">Calculate Your Fee</h3>
                
                <div className="space-y-6 relative z-10 flex-1 flex flex-col">
                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Delegate Type</label>
                    <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
                      <button onClick={() => setNationality('indian')} className={`py-2.5 rounded-lg font-bold text-sm transition-all ${nationality === 'indian' ? 'bg-white text-[#0B1E4A] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>Indian</button>
                      <button onClick={() => setNationality('international')} className={`py-2.5 rounded-lg font-bold text-sm transition-all ${nationality === 'international' ? 'bg-white text-[#0B1E4A] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>International</button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2 block">Registration Category</label>
                    <select value={selectedCategoryId} onChange={(e) => setSelectedCategoryId(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 bg-slate-50 outline-none focus:bg-white focus:border-sky-500 focus:ring-2 focus:ring-sky-100 appearance-none transition-all">
                      {REGISTRATION_FEES[nationality].map(c => (
                        <option key={c.id} value={c.id}>{c.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-6 mt-auto border-t border-slate-100">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Payable ({currentPhase.toUpperCase()})</p>
                    {currentPrice ? (
                      <div className="text-4xl sm:text-5xl font-black text-sky-600 mb-2">
                        {currency === 'INR' ? '₹' : '$'}{currentPrice.toLocaleString('en-IN')}
                      </div>
                    ) : (
                      <div className="text-2xl font-bold text-slate-400 mb-2">Not Applicable</div>
                    )}
                    <p className="text-xs text-slate-500">Based on current date. Fees may change after deadlines.</p>
                  </div>

                  <button onClick={() => setIsModalOpen(true)} disabled={!currentPrice} className="w-full text-center py-4 rounded-xl font-black text-white bg-gradient-to-r from-emerald-500 to-sky-500 hover:from-emerald-600 hover:to-sky-600 shadow-lg shadow-emerald-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                    Proceed to Registration
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing Table Reference */}
            <div className="lg:col-span-7">
              <div className="glass rounded-3xl p-6 sm:p-8 border border-slate-100 overflow-x-auto shadow-sm h-full">
                {/* Desktop Table View */}
                <div className="hidden md:block">
                  <table className="w-full text-left border-collapse min-w-[500px]">
                    <thead>
                      <tr>
                        <th className="pb-4 pt-2 px-4 border-b border-slate-200 text-xs font-bold text-slate-400 uppercase tracking-wider">Category</th>
                        <th className="pb-4 pt-2 px-4 border-b border-slate-200 text-xs font-bold text-emerald-500 uppercase tracking-wider">Early Bird<br/><span className="text-[10px] font-medium text-slate-400 normal-case">Up to 30 Sep '26</span></th>
                        <th className="pb-4 pt-2 px-4 border-b border-slate-200 text-xs font-bold text-sky-500 uppercase tracking-wider">Regular<br/><span className="text-[10px] font-medium text-slate-400 normal-case">1 Oct - 31 Jan '27</span></th>
                        <th className="pb-4 pt-2 px-4 border-b border-slate-200 text-xs font-bold text-amber-500 uppercase tracking-wider">Spot<br/><span className="text-[10px] font-medium text-slate-400 normal-case">From 1 Feb '27</span></th>
                      </tr>
                    </thead>
                    <tbody>
                      {REGISTRATION_FEES.indian.map(c => (
                        <tr key={c.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="py-3 px-4 border-b border-slate-50 text-sm font-bold text-[#0B1E4A] group-last:border-0">{c.label}</td>
                          <td className="py-3 px-4 border-b border-slate-50 text-sm font-medium text-slate-600 group-last:border-0">₹{c.early?.toLocaleString('en-IN') || '-'}</td>
                          <td className="py-3 px-4 border-b border-slate-50 text-sm font-medium text-slate-600 group-last:border-0">₹{c.regular?.toLocaleString('en-IN') || '-'}</td>
                          <td className="py-3 px-4 border-b border-slate-50 text-sm font-medium text-slate-600 group-last:border-0">{c.spot ? `₹${c.spot.toLocaleString('en-IN')}` : '-'}</td>
                        </tr>
                      ))}
                      {REGISTRATION_FEES.international.map((c, i) => (
                        <tr key={c.id} className="hover:bg-sky-50/80 transition-colors bg-sky-50/30 group">
                          <td className={`py-3 px-4 border-b border-sky-100/50 text-sm font-bold text-[#0B1E4A] ${i===1?'border-0':''}`}>{c.label}</td>
                          <td className={`py-3 px-4 border-b border-sky-100/50 text-sm font-medium text-slate-600 ${i===1?'border-0':''}`}>${c.early}</td>
                          <td className={`py-3 px-4 border-b border-sky-100/50 text-sm font-medium text-slate-600 ${i===1?'border-0':''}`}>${c.regular}</td>
                          <td className={`py-3 px-4 border-b border-sky-100/50 text-sm font-medium text-slate-600 ${i===1?'border-0':''}`}>${c.spot}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-4">
                  {/* Indian Fees */}
                  <h4 className="font-bold text-[#0B1E4A] border-b border-slate-100 pb-2 mb-3">Indian Delegates</h4>
                  {REGISTRATION_FEES.indian.map(c => (
                    <div key={c.id} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                      <div className="font-bold text-[#0B1E4A] mb-3">{c.label}</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Early Bird <span className="text-[10px] ml-1">(Up to 30 Sep '26)</span></span>
                          <span className="font-bold text-emerald-600">₹{c.early?.toLocaleString('en-IN') || '-'}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Regular <span className="text-[10px] ml-1">(1 Oct - 31 Jan '27)</span></span>
                          <span className="font-bold text-sky-600">₹{c.regular?.toLocaleString('en-IN') || '-'}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Spot <span className="text-[10px] ml-1">(From 1 Feb '27)</span></span>
                          <span className="font-bold text-amber-600">{c.spot ? `₹${c.spot.toLocaleString('en-IN')}` : '-'}</span>
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* International Fees */}
                  <h4 className="font-bold text-[#0B1E4A] border-b border-slate-100 pb-2 mb-3 mt-6">International Delegates</h4>
                  {REGISTRATION_FEES.international.map(c => (
                    <div key={c.id} className="bg-sky-50 rounded-xl p-4 border border-sky-100">
                      <div className="font-bold text-[#0B1E4A] mb-3">{c.label}</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Early Bird <span className="text-[10px] ml-1">(Up to 30 Sep '26)</span></span>
                          <span className="font-bold text-emerald-600">${c.early}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Regular <span className="text-[10px] ml-1">(1 Oct - 31 Jan '27)</span></span>
                          <span className="font-bold text-sky-600">${c.regular}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-slate-500">Spot <span className="text-[10px] ml-1">(From 1 Feb '27)</span></span>
                          <span className="font-bold text-amber-600">${c.spot}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Blocks */}
      <section className="py-16 px-4 bg-emerald-50/30">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Registration Includes */}
          <div className="glass rounded-3xl p-8 border border-white shadow-sm">
            <h3 className="text-2xl font-black text-[#0B1E4A] mb-6 text-center">Registration Includes</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 text-center">
              {[
                { icon: Award, label: "Official IPCI Delegate Cap" },
                { icon: CheckCircle, label: "IPCI Souvenir Key Ring" },
                { icon: FileText, label: "Delegate Kit & Material" },
                { icon: Users, label: "Two Working Lunches" },
                { icon: Globe, label: "Four Tea/Snack Sessions" },
                { icon: Heart, label: "Networking Dinner" },
                { icon: FileText, label: "Participation Certificate" },
                { icon: CheckCircle, label: "Exhibition & Sessions Access" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center justify-center gap-3 p-4 bg-white/50 rounded-2xl border border-white shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <item.icon size={24} />
                  </div>
                  <span className="text-xs font-bold text-slate-700 leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {/* Present Your Research */}
            <div className="glass rounded-3xl p-8 border border-white shadow-sm lg:col-span-2">
              <h3 className="text-2xl font-black text-[#0B1E4A] mb-6 flex items-center gap-3">
                <FileText className="text-emerald-500" /> Present Your Research at IPCI 2027
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/60 p-6 rounded-2xl border border-white shadow-sm">
                  <h4 className="font-bold text-[#0B1E4A] mb-2 text-lg">Abstract Submission</h4>
                  <div className="inline-block bg-emerald-100 text-emerald-700 font-black text-xs px-2 py-1 rounded mb-3">FREE OF COST</div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">Researchers, clinicians, students and scholars are invited to submit abstracts on all aspects of pancreatitis research, clinical care, innovation and patient outcomes.</p>
                  
                  <h4 className="font-bold text-[#0B1E4A] mb-2 mt-4 text-sm">Poster Presentations</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">All accepted abstracts will be presented as posters. Poster presentation fee is applicable only after abstract acceptance and is separate from conference registration.</p>
                </div>
                
                <div className="bg-gradient-to-br from-[#0B1E4A] to-blue-900 p-6 rounded-2xl border border-blue-800 shadow-sm text-white relative overflow-hidden">
                  <Star className="absolute -top-4 -right-4 w-24 h-24 text-white/5" />
                  <h4 className="font-bold text-amber-400 mb-2 text-lg flex items-center gap-2"><Sparkles size={18} /> IPCI Spotlight Session</h4>
                  <p className="text-sm text-sky-100 leading-relaxed mb-4">Top 10-15 posters selected by the Scientific Committee will be invited for:</p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-white/90"><CheckCircle size={16} className="text-amber-400 shrink-0 mt-0.5" /> 5-Minute Spotlight Presentation</li>
                    <li className="flex items-start gap-2 text-sm text-white/90"><CheckCircle size={16} className="text-amber-400 shrink-0 mt-0.5" /> Recognition Certificate</li>
                    <li className="flex items-start gap-2 text-sm text-white/90"><CheckCircle size={16} className="text-amber-400 shrink-0 mt-0.5" /> Presentation before International Experts</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Important Dates */}
            <div className="glass rounded-3xl p-8 border border-white shadow-sm bg-sky-50/50">
              <h3 className="text-xl font-black text-[#0B1E4A] mb-6 flex items-center gap-3">
                <CalendarDays className="text-sky-500" /> Important Dates
              </h3>
              <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-sky-200 before:to-transparent">
                {[
                  { title: "Abstract Submission Opens", date: "June 2026" },
                  { title: "Early Bird Reg. Closes", date: "30 September 2026", highlight: true },
                  { title: "Abstract Submission Deadline", date: "31 December 2026" },
                  { title: "Acceptance Notification", date: "15 January 2027" },
                  { title: "Conference Dates", date: "12-14 February 2027", highlight: true }
                ].map((item, i) => (
                  <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-white bg-sky-500 text-slate-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10" />
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl bg-white shadow-sm border border-slate-100 flex flex-col">
                      <span className="font-bold text-slate-800 text-xs">{item.title}</span>
                      <span className={`text-xs font-bold mt-1 ${item.highlight ? 'text-sky-600' : 'text-slate-500'}`}>{item.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Suggested Themes */}
            <div className="glass rounded-3xl p-8 border border-white shadow-sm">
              <h3 className="text-xl font-black text-[#0B1E4A] mb-5 flex items-center gap-3">
                <Globe className="text-amber-500" /> Suggested Themes
              </h3>
              <div className="grid sm:grid-cols-2 gap-y-3 gap-x-4">
                {THEMES.map((theme, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm font-medium text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" /> {theme}
                  </div>
                ))}
              </div>
            </div>

            {/* IPCI Awards */}
            <div className="glass rounded-3xl p-8 border border-white shadow-sm">
              <h3 className="text-xl font-black text-[#0B1E4A] mb-5 flex items-center gap-3">
                <Award className="text-amber-500" /> IPCI Awards
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg inline-block mb-3">Student Category</h4>
                  <ul className="space-y-2.5">
                    {["Best Undergraduate Poster", "Best Postgraduate Poster", "Best PhD Research Poster", "Young Investigator Award"].map((award, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                        <Star size={14} className="text-emerald-500 shrink-0 mt-0.5 fill-emerald-50" /> {award}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg inline-block mb-3">Professional Category</h4>
                  <ul className="space-y-2.5">
                    {["Best Clinical Research Poster", "Best Basic Science Poster", "Best Integrative Medicine Research Poster", "IPCI Innovation Award", "Sant Prakash Memorial Award for Innovation"].map((award, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700 font-medium">
                        <Star size={14} className="text-purple-500 shrink-0 mt-0.5 fill-purple-50" /> {award}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Venue & Travel */}
      <section className="py-16 px-4 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1E4A]">Venue & Travel Info</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">Pantnagar is located in the Kumaon region of Uttarakhand and is well connected by air, rail, and road. Combine scientific learning with the natural beauty of the Himalayan foothills.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass p-6 rounded-2xl border border-slate-100 text-center hover:border-emerald-200 transition-colors">
              <Plane className="mx-auto text-sky-500 mb-3" size={32} />
              <h4 className="font-bold text-[#0B1E4A] mb-2">By Air</h4>
              <p className="text-xs text-slate-600">Pantnagar Airport (PGH) is 5-10 km away. Alternative: Delhi (DEL) 280km or Dehradun (DED) 260km.</p>
            </div>
            <div className="glass p-6 rounded-2xl border border-slate-100 text-center hover:border-emerald-200 transition-colors">
              <Train className="mx-auto text-amber-500 mb-3" size={32} />
              <h4 className="font-bold text-[#0B1E4A] mb-2">By Rail</h4>
              <p className="text-xs text-slate-600">Pantnagar Station (5km), Rudrapur City (12km), Lal Kuan Jn (30km), Kathgodam (40km).</p>
            </div>
            <div className="glass p-6 rounded-2xl border border-slate-100 text-center hover:border-emerald-200 transition-colors">
              <Car className="mx-auto text-emerald-500 mb-3" size={32} />
              <h4 className="font-bold text-[#0B1E4A] mb-2">By Road & Local</h4>
              <p className="text-xs text-slate-600">280km from Delhi (5-6 hours). Taxis and app-based cabs available locally.</p>
            </div>
            <div className="glass p-6 rounded-2xl border border-slate-100 text-center hover:border-emerald-200 transition-colors">
              <Home className="mx-auto text-purple-500 mb-3" size={32} />
              <h4 className="font-bold text-[#0B1E4A] mb-2">Accommodation</h4>
              <p className="text-xs text-slate-600">Hotels, guest houses & university lodging available nearby. List coming soon.</p>
            </div>
          </div>

          {/* Explore Uttarakhand */}
          <div className="mt-12 bg-gradient-to-r from-emerald-500 to-sky-500 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 flex flex-col gap-8">
              <div className="max-w-2xl">
                <h3 className="text-2xl sm:text-3xl font-black mb-3">Explore Uttarakhand</h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6">
                  Extend your visit and experience the cultural heritage, wildlife, and natural beauty. Explore these nearby attractions before or after the conference.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold">
                  <Info size={16} /> Plan sightseeing before or after conference dates.
                </div>
              </div>
              
              {/* Attraction Boxes */}
              <div ref={scrollRef} className="flex overflow-x-auto gap-4 sm:gap-5 pb-6 pt-2 snap-x hide-scrollbar -mx-8 sm:-mx-12 px-8 sm:px-12 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
                <style>{`.hide-scrollbar::-webkit-scrollbar { display: none; }`}</style>
                {[
                  { name: 'Nainital', km: '60 km', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Nainital_metro.jpg/500px-Nainital_metro.jpg' },
                  { name: 'Bhimtal', km: '50 km', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Lake_Bhimtal.jpg/500px-Lake_Bhimtal.jpg' },
                  { name: 'Sattal', km: '55 km', img: 'https://picsum.photos/id/1015/400/400' },
                  { name: 'Naukuchiatal', km: '55 km', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Naukuchiatal_Lake.jpg/500px-Naukuchiatal_Lake.jpg' },
                  { name: 'Jim Corbett', km: '85 km', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Bengal-Tiger_Corbett_Uttarakhand_Dec-2013.jpg/500px-Bengal-Tiger_Corbett_Uttarakhand_Dec-2013.jpg' },
                  { name: 'Mukteshwar', km: '95 km', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Chauli_Ki_Jali%2C_Mukteshwar.jpg/500px-Chauli_Ki_Jali%2C_Mukteshwar.jpg' },
                  { name: 'Kainchi Dham', km: '70 km', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Early_morning_Glimpse_of_Kainchi_Dham_Nainital_2023.jpg/500px-Early_morning_Glimpse_of_Kainchi_Dham_Nainital_2023.jpg' }
                ].map((place, idx) => (
                  <div key={idx} className={`shrink-0 w-32 h-32 sm:w-36 sm:h-36 rounded-2xl bg-[#0B1E4A] border border-white/30 flex items-center justify-center relative overflow-hidden group snap-center transition-transform ${idx % 2 === 0 ? 'rotate-2 hover:rotate-0' : '-rotate-2 hover:rotate-0'}`}>
                    <img src={place.img} alt={place.name} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 z-0"></div>
                    <span className="relative z-10 text-center font-bold text-sm sm:text-base text-white drop-shadow-lg mt-auto pb-4">
                      {place.name}<br/><span className="font-medium text-xs text-emerald-300 drop-shadow-md">{place.km}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Registration Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#0B1E4A]/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl max-h-[90vh] glass rounded-3xl border border-white shadow-2xl shadow-emerald-900/50 flex flex-col overflow-hidden">
              <div className="absolute top-4 right-4 z-20">
                <button onClick={() => setIsModalOpen(false)} className="p-2 rounded-xl bg-white/50 hover:bg-slate-100 backdrop-blur-sm transition-colors shadow-sm">
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
              <div className="overflow-y-auto w-full h-full p-6 sm:p-8 modal-scrollbar">

              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-emerald-200">
                    <CheckCircle size={36} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-[#0B1E4A] mb-3">Thank You!</h3>
                  <p className="text-slate-600 text-base leading-relaxed max-w-sm mx-auto">Your registration details have been received and your payment was successful. We'll be in touch with you shortly.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                    <button onClick={() => setIsAbstractModalOpen(true)} className="btn-primary">
                      Submit Abstract
                    </button>
                    <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', designation: '', institution: '', message: '' }); setMathCaptcha({num1:0,num2:0,answer:''}); generateCaptcha(); setIsModalOpen(false); }}
                      className="btn-outline">
                      Close
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5 mt-2">
                  <div className="mb-6">
                    <h3 className="text-2xl font-black text-[#0B1E4A] mb-1">Register for IPCI 2027</h3>
                    <p className="text-slate-500 text-sm">Please fill out your details below to complete your registration.</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { id: 'name', label: 'Name*', type: 'text', placeholder: 'Dr. John Doe' },
                      { id: 'designation', label: 'Designation', type: 'text', placeholder: 'e.g. Professor' },
                      { id: 'institution', label: 'Institution', type: 'text', placeholder: 'e.g. University Name' },
                      { id: 'email', label: 'Email Address*', type: 'email', placeholder: 'john@example.com' },
                      { id: 'phone', label: 'Phone Number*', type: 'tel', placeholder: '+91 98XXX XXXXX' },
                    ].map(({ id, label, type, placeholder }) => (
                      <div key={id} className="flex flex-col gap-1.5">
                        <label htmlFor={`reg-${id}`} className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</label>
                        <input id={`reg-${id}`} type={type} placeholder={placeholder} value={form[id]}
                          onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 bg-white/70 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 ${errors[id] ? 'border-red-300 bg-red-50/40' : 'border-slate-200'}`} />
                        {errors[id] && <p className="text-xs text-red-500 font-medium">{errors[id]}</p>}
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="reg-message" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Additional Message (Optional)</label>
                    <textarea id="reg-message" rows={3} placeholder="Any specific requirements..."
                      value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 bg-white/70 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 resize-none" />
                  </div>

                  <div className="flex flex-col gap-1.5 items-center justify-center my-4">
                    <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
                      Security Check
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-3/4 mx-auto">
                      <div className="flex-1 whitespace-nowrap bg-slate-100 rounded-xl px-4 py-3 text-center text-sm font-black text-[#0B1E4A] tracking-wider border border-slate-200">
                        {mathCaptcha.num1} + {mathCaptcha.num2} = ?
                      </div>
                      <input 
                        type="number"
                        placeholder="Answer" 
                        value={mathCaptcha.answer}
                        onChange={(e) => {
                          setMathCaptcha(prev => ({...prev, answer: e.target.value}));
                          if (errors.captcha) setErrors(prev => ({...prev, captcha: null}));
                        }}
                        className={`flex-1 px-4 py-3 rounded-xl border text-sm font-bold text-center text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 bg-white/70 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 ${errors.captcha ? 'border-red-300 bg-red-50/40' : 'border-slate-200'}`}
                      />
                    </div>
                    {errors.captcha && <p className="text-xs text-red-500 font-medium text-center mt-1">{errors.captcha}</p>}
                  </div>

                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full justify-center py-4 text-base disabled:opacity-70 disabled:cursor-not-allowed">
                    {isSubmitting ? <Loader2 size={17} className="animate-spin" /> : <Send size={17} />}
                    {isSubmitting ? 'Submitting...' : 'Confirm Registration'}
                  </button>
                  <p className="text-center text-xs text-slate-400">
                    By submitting, you agree to the registration terms and conditions.
                  </p>
                </form>
              )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Abstract Submission Modal */}
      <AnimatePresence>
        {isAbstractModalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAbstractModalOpen(false)}
              className="absolute inset-0 bg-[#0B1E4A]/80 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl flex justify-center z-10">
              <AbstractSubmissionForm inModal={true} onClose={() => setIsAbstractModalOpen(false)} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
