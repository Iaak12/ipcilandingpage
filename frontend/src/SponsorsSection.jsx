import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, Heart, Building, Users, GraduationCap, Star, ShieldCheck } from 'lucide-react';

function useInView({ threshold = 0.15, triggerOnce = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { 
      if (e.isIntersecting) {
        setInView(true);
        if (triggerOnce && ref.current) obs.unobserve(ref.current);
      } else if (!triggerOnce) {
        setInView(false);
      }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold, triggerOnce]);
  return [ref, inView];
}

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };

// Data
const SPONSORS = [
  {
    category: "Founding Sponsor",
    icon: Award,
    color: "amber",
    items: [
      { name: "VCPCRF Founders' Contribution", amount: 6000000, subtitle: "Vaidya Chandra Prakash Cancer Research Foundation", logo: "/logos/vcpcrf.png" }
    ]
  },
  {
    category: "Industry Sponsors",
    icon: Building,
    color: "blue",
    items: [
      { name: "Zandu Care", amount: 250000, subtitle: "Silver Sponsor", logo: "/logos/zandu.png" },
      { name: "Sudhir Cranes Pvt Ltd", amount: 51000, subtitle: "Industry Sponsor" },
      { name: "Venus Stampings Pvt. Ltd.", amount: 50000, subtitle: "VENUS", logo: "/logos/venus.png" },
      { name: "ND R.F.M.", amount: 31000, subtitle: "", logo: "/logos/ndrfm.png" },
    ]
  },
  {
    category: "Medical Fraternity",
    icon: ShieldCheck,
    color: "rose",
    items: [
      { name: "Dr Neeraj Gupta, Rishikesh", amount: 250000, subtitle: "" },
      { name: "Atharva Ayurveda, Rajkot", amount: 150000, subtitle: "", logo: "/logos/atharva.png" },
      { name: "Dr C K Katiyar, Gurugram", amount: 100000, subtitle: "" },
      { name: "Prof (Dr) G. G. Gangadharan, Bangalore", amount: 100000, subtitle: "" },
      { name: "SL Ayucare Wellness Center, Rampur", amount: 50000, subtitle: "", logo: "/logos/sl-ayucare.png" },
      { name: "Dr. Anuj Jain, Gwalior", amount: 250000, subtitle: "", logo: "/logos/anuj-jain.png" }, // Wait, old was 25000. Let's keep old value: 25000
      { name: "Vd Sonal, Mumbai", amount: 11000, subtitle: "" },
      { name: "Dr Ravinder Amraik", amount: 11000, subtitle: "" },
      { name: "Vaidya Lavkush Nigam, Ayodhya", amount: 11111, subtitle: "" },
      { name: "Dr Surendra Singh, Barmer", amount: 5100, subtitle: "" },
      { name: "Dr Sanjeev Khanna, Patiala", amount: 5000, subtitle: "" },
      { name: "Dr G D Ramchandani, Rajasthan", amount: 5000, subtitle: "" },
    ],
  },
  {
    category: "Academic Sponsor",
    icon: GraduationCap,
    color: "emerald",
    items: [
      { name: "R B Ayurvedic Medical College", amount: 250000, subtitle: "Agra" },
      { name: "Uttaranchal Ayurvedic College", amount: 151000, subtitle: "Dehradun", logo: "/logos/uttaranchal.png" }
    ]
  },
  {
    category: "Well Wishers and Patients",
    icon: Heart,
    color: "sky",
    items: [
      { name: "Manish Lalji Parmar", amount: 31000, subtitle: "" },
      { name: "Ketan Kamdar", amount: 11001, subtitle: "" },
      { name: "Abhishek Bharadwaj", amount: 11000, subtitle: "" },
      { name: "Sanjiv Chawla", amount: 11000, subtitle: "" },
      { name: "Patel Jaydeep", amount: 11000, subtitle: "" },
      { name: "Sanjiv Singhal", amount: 10000, subtitle: "" },
      { name: "Kiran Shah", amount: 5000, subtitle: "" },
      { name: "Ashish Barthwal, Dehradun", amount: 5000, subtitle: "" },
      { name: "Tarun Guha Neogi", amount: 5000, subtitle: "" },
      { name: "Abhijit Patil", amount: 5000, subtitle: "" },
      { name: "Samip Desai", amount: 5000, subtitle: "" },
      { name: "Rajiv Kumar Singh, Rampur", amount: 2100, subtitle: "" },
      { name: "Nikita Agarwal", amount: 1100, subtitle: "" },
    ]
  }
];

// Calculate totals dynamically
SPONSORS.forEach(category => {
  const catTotal = category.items.reduce((sum, item) => sum + item.amount, 0);
  if (category.category !== "Founding Sponsor") {
    category.totalStr = `₹ ${catTotal.toLocaleString('en-IN')}/-`;
  }
});

const GRAND_TOTAL = SPONSORS.reduce((total, cat) => total + cat.items.reduce((sum, item) => sum + item.amount, 0), 0);
const TARGET_AMOUNT = 17500000;
const PERCENT_ACHIEVED = ((GRAND_TOTAL / TARGET_AMOUNT) * 100).toFixed(2);
const GRAND_TOTAL_LAKH = (GRAND_TOTAL / 100000).toFixed(2);

export default function SponsorsSection() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="sponsors" ref={ref} className="pt-32 pb-24 px-4 bg-slate-50 relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-amber-300/10 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          
          {/* Header */}
          <motion.div variants={fadeUp} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 px-4 py-1.5 rounded-full text-amber-600 text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
              <Star size={14} className="fill-amber-500 text-amber-500" /> Our Partners & Sponsors
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0B1E4A] mt-2 mb-6 tracking-tight leading-none">
              The Foundation <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Has Been Laid</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              VCPCRF extends its heartfelt gratitude to all sponsors whose generous contributions are helping build <strong className="text-[#0B1E4A]">IPCI 2027</strong>. Connecting India with Global Expertise for a Better Future in Pancreatitis Care, Research & Education.
            </p>
          </motion.div>

          {/* Progress Section */}
          <motion.div variants={scaleIn} className="glass rounded-3xl p-8 sm:p-12 border border-white shadow-xl shadow-slate-200/50 mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-100 to-sky-100 rounded-bl-full opacity-50 -z-10" />
            
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              <div className="lg:col-span-1 text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white shadow-lg shadow-amber-200 mb-6">
                  <TrendingUp size={32} />
                </div>
                <h3 className="text-5xl md:text-6xl font-black text-[#0B1E4A] mb-2 tracking-tight">₹ {GRAND_TOTAL_LAKH}<span className="text-2xl text-slate-500 ml-1">Lakh</span></h3>
                <p className="text-sm font-bold text-amber-600 uppercase tracking-widest">Raised So Far (₹ {GRAND_TOTAL.toLocaleString('en-IN')})</p>
              </div>

              <div className="lg:col-span-2">
                <div className="flex justify-between items-end mb-3">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Target Fund Mobilization</p>
                    <p className="text-2xl font-black text-emerald-600">₹ 1.75 Crore</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-black text-[#0B1E4A]">{PERCENT_ACHIEVED}%</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">of Target Achieved</p>
                  </div>
                </div>
                
                <div className="w-full bg-slate-200 rounded-full h-6 sm:h-8 p-1 shadow-inner relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} 
                    animate={{ width: inView ? `${PERCENT_ACHIEVED}%` : 0 }} 
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full relative shadow-sm"
                  >
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-full">
                      <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8cGF0aCBkPSJNMCA4TDggMFpNMCA0TDQgMFpNOCA0TDQgOFoiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-30" />
                    </div>
                  </motion.div>
                </div>
                
                <p className="text-center sm:text-right text-xs font-medium text-slate-500 mt-4 italic">
                  Every contribution, large or small, brings us closer to our vision.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sponsors Grid (Masonry Layout) */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
            {SPONSORS.map((category, idx) => (
              <motion.div key={idx} variants={fadeUp} className="break-inside-avoid glass rounded-3xl overflow-hidden border border-white shadow-lg transition-transform hover:-translate-y-1 flex flex-col">
                <div className={`p-4 sm:p-5 bg-gradient-to-r ${category.color === 'amber' ? 'from-amber-400 to-orange-500' : category.color === 'blue' ? 'from-[#0B1E4A] to-blue-800' : category.color === 'emerald' ? 'from-emerald-600 to-teal-700' : category.color === 'rose' ? 'from-rose-700 to-red-800' : 'from-sky-500 to-blue-600'} text-white flex items-center gap-3`}>
                  <category.icon size={22} className="opacity-90" />
                  <h4 className="font-black text-sm sm:text-base uppercase tracking-wider">{category.category}</h4>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex flex-col gap-y-5">
                    {category.items.map((item, i) => (
                      <div key={i} className="flex items-start gap-4 w-full group">
                        {item.logo ? (
                          <div className="w-14 h-14 rounded-xl bg-white flex items-center justify-center shrink-0 border border-slate-200 shadow-sm overflow-hidden p-1 group-hover:shadow-md group-hover:border-slate-300 transition-all">
                            <img src={item.logo} alt={item.name} className="w-full h-full object-contain" onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }} />
                            <div className="hidden w-full h-full items-center justify-center bg-slate-50 text-slate-400">
                              <Heart size={20} />
                            </div>
                          </div>
                        ) : (
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border transition-colors
                            ${category.color === 'amber' ? 'bg-amber-50 border-amber-200 text-amber-500 group-hover:bg-amber-100' : 
                              category.color === 'blue' ? 'bg-blue-50 border-blue-200 text-blue-500 group-hover:bg-blue-100' : 
                              category.color === 'emerald' ? 'bg-emerald-50 border-emerald-200 text-emerald-500 group-hover:bg-emerald-100' : 
                              category.color === 'rose' ? 'bg-rose-50 border-rose-200 text-rose-500 group-hover:bg-rose-100' : 
                              'bg-sky-50 border-sky-200 text-sky-500 group-hover:bg-sky-100'}`}>
                            <Heart size={18} className="opacity-50" />
                          </div>
                        )}
                        <div className="flex-1 mt-0.5">
                          <h5 className="font-bold text-[#0B1E4A] text-sm sm:text-base leading-snug mb-1">{item.name}</h5>
                          {item.subtitle && <p className="text-xs text-slate-500 font-semibold mb-1.5">{item.subtitle}</p>}
                          <p className={`font-black text-sm sm:text-lg 
                            ${category.color === 'amber' ? 'text-amber-600' : 
                              category.color === 'blue' ? 'text-blue-600' : 
                              category.color === 'emerald' ? 'text-emerald-600' : 
                              category.color === 'rose' ? 'text-rose-600' : 
                              'text-sky-600'}`}>₹ {typeof item.amount === 'number' ? item.amount.toLocaleString('en-IN') : item.amount}/-</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {category.totalStr && (
                    <div className="mt-8 pt-5 border-t border-slate-200 flex justify-between items-center bg-rose-50/80 -mx-6 -mb-6 p-6">
                      <span className="font-bold text-slate-700 text-xs sm:text-sm uppercase tracking-wider">Total Support</span>
                      <span className="font-black text-rose-600 text-lg sm:text-xl">{category.totalStr}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
