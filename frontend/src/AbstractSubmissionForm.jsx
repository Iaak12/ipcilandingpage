import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, X, Send, Loader2 } from 'lucide-react';

const WEB3FORMS_ACCESS_KEY = "045af9f2-df45-4afd-bacb-f59ed567d070";

export default function AbstractSubmissionForm({ inModal = false, onClose = () => {} }) {
  const [form, setForm] = useState({ name: '', designation: '', affiliation: '', email: '', phone: '', abstractTitle: '', abstract: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simple Math Captcha State
  const [mathCaptcha, setMathCaptcha] = useState({ num1: 0, num2: 0, answer: '' });
  
  const generateCaptcha = () => {
    setMathCaptcha({
      num1: Math.floor(Math.random() * 10) + 1,
      num2: Math.floor(Math.random() * 10) + 1,
      answer: ''
    });
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.designation.trim()) e.designation = 'Designation is required';
    if (!form.affiliation.trim()) e.affiliation = 'Affiliation is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Contact number is required';
    if (!form.abstractTitle.trim()) e.abstractTitle = 'Abstract Title is required';
    if (!form.abstract.trim()) e.abstract = 'Abstract is required';
    return e;
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
      generateCaptcha();
      setMathCaptcha(prev => ({...prev, answer: ''}));
    }
    
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "New Registration / Inquiry for IPCI 2027");
    formData.append("from_name", "IPCI 2027 Website");
    formData.append("Name", form.name);
    formData.append("Designation", form.designation);
    formData.append("Affiliation", form.affiliation);
    formData.append("Email", form.email);
    formData.append("Phone", form.phone);
    formData.append("Abstract_Title", form.abstractTitle);
    formData.append("Abstract", form.abstract);

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
        alert("Something went wrong: " + data.message);
      }
    } catch (error) {
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={inModal ? "relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass rounded-3xl p-6 sm:p-8 border border-white shadow-2xl shadow-emerald-900/50" : "glass rounded-3xl p-7 sm:p-10 border border-white shadow-2xl shadow-emerald-50"}>
      {inModal && (
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 transition-colors z-10">
          <X size={20} className="text-slate-500" />
        </button>
      )}
      
      {submitted ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
          className="text-center py-8">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-emerald-200">
            <CheckCircle size={36} className="text-white" />
          </div>
          <h3 className="text-2xl font-black text-[#0B1E4A] mb-3">Thank You!</h3>
          <p className="text-slate-600 text-base leading-relaxed max-w-sm mx-auto">Your abstract has been submitted successfully. We will be in touch with you shortly.</p>
          <div className="flex gap-4 justify-center mt-6">
            <button onClick={() => { setSubmitted(false); setForm({ name: '', designation: '', affiliation: '', email: '', phone: '', abstractTitle: '', abstract: '' }); setMathCaptcha({num1:0,num2:0,answer:''}); generateCaptcha(); }}
              className="btn-outline">Submit Another</button>
            {inModal && <button onClick={onClose} className="btn-primary">Close</button>}
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <h3 className="text-xl font-black text-[#0B1E4A] mb-1">Abstract Submission Form</h3>
          <p className="text-slate-500 text-sm mb-4">Please fill out the form below to submit your abstract.</p>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { id: 'name', label: 'Name', type: 'text', placeholder: 'Dr. John Doe' },
              { id: 'designation', label: 'Designation', type: 'text', placeholder: 'e.g. Professor' },
              { id: 'affiliation', label: 'Affiliation', type: 'text', placeholder: 'e.g. University Name' },
              { id: 'email', label: 'Email id', type: 'email', placeholder: 'john@example.com' },
              { id: 'phone', label: 'Contact number', type: 'tel', placeholder: '+91 98XXX XXXXX' },
              { id: 'abstractTitle', label: 'Abstract Title', type: 'text', placeholder: 'Title of your abstract' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} className="flex flex-col gap-1.5">
                <label htmlFor={id} className="text-xs font-bold text-slate-600 uppercase tracking-wider">{label}</label>
                <input id={id} type={type} placeholder={placeholder} value={form[id]}
                  onChange={(e) => setForm({ ...form, [id]: e.target.value })}
                  className={`w-full px-4 py-3 rounded-xl border text-sm font-medium text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 bg-white/70 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 ${errors[id] ? 'border-red-300 bg-red-50/40' : 'border-slate-200'}`} />
                {errors[id] && <p className="text-xs text-red-500 font-medium">{errors[id]}</p>}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="abstract" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Abstract (250 words)</label>
            <textarea id="abstract" rows={6} placeholder="Paste your abstract here (max 250 words)..."
              value={form.abstract} onChange={(e) => setForm({ ...form, abstract: e.target.value })}
              className={`w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 bg-white/70 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 resize-none ${errors.abstract ? 'border-red-300 bg-red-50/40' : 'border-slate-200'}`} />
            {errors.abstract && <p className="text-xs text-red-500 font-medium">{errors.abstract}</p>}
          </div>

          <div className="flex flex-col gap-1.5 items-center justify-center my-4">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">
              Security Check
            </label>
            <div className="flex items-center gap-3 w-full sm:w-2/3">
              <div className="flex-1 bg-slate-100 rounded-xl px-4 py-3 text-center text-sm font-black text-[#0B1E4A] tracking-wider border border-slate-200">
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
            {isSubmitting ? 'Submitting...' : 'Submit Abstract'}
          </button>
          <p className="text-center text-xs text-slate-400">
            By submitting, you agree to be contacted about IPCI 2027.
          </p>
        </form>
      )}
    </div>
  );
}
