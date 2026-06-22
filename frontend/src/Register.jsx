import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CalendarDays, MapPin, ArrowLeft, ArrowRight,
  CheckCircle, Users, Award, FileText, Globe, Info,
  Plane, Train, Car, Home, XCircle, AlertCircle, Sparkles, BookOpen
} from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#f0fdf9] font-sans">
      {/* Navbar Minimal */}
      <header className="fixed top-0 left-0 right-0 z-50 py-3 glass shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <img src="/ipci2027Logo.png" alt="IPCI 2027 Logo" className="h-10 w-auto object-contain" />
          </Link>
          <Link to="/" className="btn-outline text-sm py-2 px-4 flex items-center gap-2 border-emerald-200">
            <ArrowLeft size={16} /> <span className="hidden sm:inline">Back to Home</span>
          </Link>
        </div>
      </header>

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
                <span className="font-bold text-[#0B1E4A] text-sm sm:text-base">12–14 March 2027</span>
              </div>
              <div className="flex items-center gap-2.5 glass px-5 py-3 rounded-2xl shadow-sm">
                <MapPin size={20} className="text-sky-500 shrink-0" />
                <span className="font-bold text-[#0B1E4A] text-sm sm:text-base">Pantnagar University, Uttarakhand, India</span>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* UG Student */}
            <div className="glass-sky rounded-3xl p-6 border border-sky-100 flex flex-col">
              <h3 className="text-lg font-bold text-[#0B1E4A] mb-1">UG Student</h3>
              <div className="text-sky-600 font-black text-3xl mb-4">₹2,200 <span className="text-sm font-medium text-slate-500">/ USD 50</span></div>
              <ul className="space-y-3 mb-8 flex-1">
                {['Access to all scientific sessions', 'Conference cap & key ring', 'Access to exhibition area', 'Participation certificate', 'Tea/coffee & refreshments', 'Lunch on all days', 'Cultural Evening & Dinner (13 Mar)'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-sky-500 shrink-0 mt-0.5" /> <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="w-full text-center py-3 rounded-xl font-bold bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors">Register Now</a>
            </div>

            {/* PG/PhD */}
            <div className="glass-sky rounded-3xl p-6 border border-sky-100 flex flex-col">
              <h3 className="text-lg font-bold text-[#0B1E4A] mb-1">PG / PhD Student</h3>
              <div className="text-sky-600 font-black text-3xl mb-4">₹5,000 <span className="text-sm font-medium text-slate-500">/ USD 100</span></div>
              <ul className="space-y-3 mb-8 flex-1">
                {['Access to all scientific sessions', 'Delegate kit', 'Participation certificate', 'Tea/coffee & refreshments', 'Lunch on all days', 'Access to exhibition area', 'Cultural Evening & Dinner (13 Mar)'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-sky-500 shrink-0 mt-0.5" /> <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="w-full text-center py-3 rounded-xl font-bold bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors">Register Now</a>
            </div>

            {/* Delegate */}
            <div className="glass-green rounded-3xl p-6 border border-emerald-100 flex flex-col relative overflow-hidden shadow-lg shadow-emerald-100/50">
              <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">Popular</div>
              <h3 className="text-lg font-bold text-[#0B1E4A] mb-1">Delegate</h3>
              <div className="text-emerald-600 font-black text-3xl mb-4">₹7,000 <span className="text-sm font-medium text-slate-500">/ USD 150</span></div>
              <ul className="space-y-3 mb-8 flex-1">
                {['All scientific sessions & exhibition', 'Delegate kit & participation certificate', 'Digital abstract supplement', 'Tea/coffee, refreshments & Lunch', 'Faculty & Delegate Dinner (12 Mar)', 'Cultural Evening & Dinner (13 Mar)'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle size={16} className="text-emerald-500 shrink-0 mt-0.5" /> <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a href="#" className="w-full text-center py-3 rounded-xl font-bold bg-emerald-500 text-white hover:bg-emerald-600 transition-colors shadow-md">Register Now</a>
            </div>

            {/* Delegate + Poster */}
            <div className="bg-gradient-to-b from-[#0B1E4A] to-[#1e3a8a] rounded-3xl p-6 border border-navy flex flex-col text-white shadow-xl transform lg:-translate-y-2">
              <div className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-1 rounded mb-3 w-max"><Sparkles size={12} /> Recommended for Researchers</div>
              <h3 className="text-lg font-bold mb-1">Delegate + Poster</h3>
              <div className="text-white font-black text-3xl mb-4">₹12,500 <span className="text-sm font-medium text-white/60">/ USD 300</span></div>
              <ul className="space-y-3 mb-8 flex-1">
                <li className="flex items-start gap-2 text-sm text-sky-100"><CheckCircle size={16} className="text-amber-400 shrink-0 mt-0.5" /> <span>All benefits of Delegate Registration</span></li>
                <li className="flex items-start gap-2 text-sm text-sky-100"><CheckCircle size={16} className="text-amber-400 shrink-0 mt-0.5" /> <span>Abstract submission & review</span></li>
                <li className="flex items-start gap-2 text-sm text-sky-100"><CheckCircle size={16} className="text-amber-400 shrink-0 mt-0.5" /> <span>Poster presentation opportunity</span></li>
                <li className="flex items-start gap-2 text-sm text-sky-100"><CheckCircle size={16} className="text-amber-400 shrink-0 mt-0.5" /> <span>Inclusion in conference proceedings</span></li>
                <li className="flex items-start gap-2 text-sm text-sky-100"><CheckCircle size={16} className="text-amber-400 shrink-0 mt-0.5" /> <span>Eligibility for Poster Awards</span></li>
                <li className="flex items-start gap-2 text-sm text-sky-100"><CheckCircle size={16} className="text-amber-400 shrink-0 mt-0.5" /> <span>Chance for 5-minute oral presentation</span></li>
              </ul>
              <a href="#" className="w-full text-center py-3 rounded-xl font-bold bg-amber-400 text-amber-900 hover:bg-amber-300 transition-colors shadow-md">Register & Submit</a>
            </div>
          </div>
        </div>
      </section>

      {/* Info Blocks */}
      <section className="py-16 px-4 bg-emerald-50/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">
          
          {/* Abstract & Awards */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8 border border-white shadow-sm">
              <h3 className="text-2xl font-black text-[#0B1E4A] mb-4 flex items-center gap-3">
                <FileText className="text-emerald-500" /> Abstract Submission
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Participants registering under the <strong>"Delegate with Poster Presentation"</strong> category may submit their research findings for scientific review. Accepted abstracts will be presented as posters. All abstracts undergo peer review.
              </p>
              <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
                <p className="text-sm text-amber-800 font-medium flex items-start gap-2">
                  <Award size={18} className="shrink-0" />
                  IPCI 2027 will recognize outstanding scientific contributions through the <strong>Best Five Poster Awards</strong> presented during the Valedictory Session.
                </p>
              </div>
            </div>

            <div className="glass rounded-3xl p-8 border border-white shadow-sm">
              <h3 className="text-2xl font-black text-[#0B1E4A] mb-4 flex items-center gap-3">
                <Globe className="text-sky-500" /> Special Events
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-sky-50/50 rounded-xl border border-sky-100">
                  <h4 className="font-bold text-[#0B1E4A] text-sm">Faculty & Delegate Networking Dinner (12 March)</h4>
                  <p className="text-xs text-slate-600 mt-1">Exclusive networking to facilitate interaction among clinicians, researchers, and healthcare leaders. <em>*For Delegates & Invited Faculty only.</em></p>
                </div>
                <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100">
                  <h4 className="font-bold text-[#0B1E4A] text-sm">Cultural Evening & Conference Dinner (13 March)</h4>
                  <p className="text-xs text-slate-600 mt-1">A special cultural programme celebrating India's rich traditions followed by dinner for all participants.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines & Exclusions */}
          <div className="space-y-6">
            <div className="glass rounded-3xl p-8 border border-white shadow-sm">
              <h3 className="text-2xl font-black text-[#0B1E4A] mb-4 flex items-center gap-3">
                <AlertCircle className="text-amber-500" /> Important Information
              </h3>
              <ul className="space-y-3">
                {[
                  "Registration is mandatory for all participants.",
                  "Presenting authors must complete registration under 'Delegate with Poster Presentation'.",
                  "Certificates will be issued only to registered participants.",
                  "Registration fees are non-refundable and non-transferable.",
                  "The Scientific Committee's decision on abstract acceptance is final."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <Info size={16} className="text-amber-500 shrink-0 mt-0.5" /> <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass rounded-3xl p-8 border border-white shadow-sm">
              <h3 className="text-xl font-black text-[#0B1E4A] mb-4 flex items-center gap-3">
                <XCircle className="text-red-400" /> Fee Does Not Include
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Accommodation", "Airfare or Rail Travel", "Local Transportation", 
                  "Airport/Station Transfers", "Sightseeing Activities", "Visa Expenses", 
                  "Travel Insurance", "Personal Expenses"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-300"></div> {item}
                  </div>
                ))}
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
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="max-w-xl">
                <h3 className="text-2xl sm:text-3xl font-black mb-3">Explore Uttarakhand</h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed mb-6">
                  Extend your visit and experience the cultural heritage, wildlife, and natural beauty. Nearby attractions include Nainital (60km), Jim Corbett National Park (85km), Bhimtal, and Kainchi Dham.
                </p>
                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold">
                  <Info size={16} /> Plan sightseeing before or after conference dates.
                </div>
              </div>
              <div className="shrink-0 flex gap-4">
                <div className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center rotate-3 hover:rotate-0 transition-transform">
                  <span className="text-center font-bold text-sm">Nainital<br/><span className="font-normal text-xs opacity-80">60 km</span></span>
                </div>
                <div className="w-32 h-32 rounded-2xl bg-white/20 backdrop-blur border border-white/30 flex items-center justify-center -rotate-3 hover:rotate-0 transition-transform mt-8">
                  <span className="text-center font-bold text-sm">Jim Corbett<br/><span className="font-normal text-xs opacity-80">85 km</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="bg-[#0B1E4A] py-8 text-center border-t border-white/10">
        <p className="text-slate-400 text-sm mb-2">© 2027 International Pancreatitis Conclave India. All rights reserved.</p>
        <p className="text-slate-500 text-xs flex justify-center items-center gap-4">
          <span>info@ipci2027.co.in</span>
          <span>www.ipci2027.co.in</span>
        </p>
      </footer>
    </div>
  );
}
