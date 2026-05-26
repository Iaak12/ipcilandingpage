import React from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, MapPin, Mail, ArrowRight, Stethoscope, Microscope, Leaf } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col relative overflow-hidden font-sans">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80%] sm:w-[50%] h-[50%] rounded-full bg-teal-400/10 blur-[80px] md:blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[90%] sm:w-[60%] h-[60%] rounded-full bg-[#0B1E4A]/5 blur-[100px] md:blur-[150px]" />
        <div className="absolute top-[40%] right-[10%] w-[50%] sm:w-[30%] h-[30%] rounded-full bg-orange-400/10 blur-[80px] md:blur-[100px]" />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 relative z-10 w-full max-w-6xl mx-auto">
        
        {/* Top badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-10 px-4 py-1.5 sm:px-5 sm:py-2 bg-white rounded-full shadow-md shadow-slate-200/50 border border-slate-100 flex items-center space-x-2 sm:space-x-3"
        >
          <span className="flex h-2.5 w-2.5 sm:h-3 sm:w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-orange-500"></span>
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-700 tracking-wide uppercase">Website Coming Soon</span>
        </motion.div>

        {/* Logo / Header Area */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center mb-8 md:mb-12 w-full px-2"
        >
          <div className="inline-block mb-3 md:mb-4 relative">
            <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-[#0B1E4A] tracking-tighter drop-shadow-sm">
              IPCI <span className="text-transparent bg-clip-text bg-gradient-to-br from-teal-500 to-emerald-400">2027</span>
            </h1>
            <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 md:-top-10 md:-right-10 opacity-20">
               <svg className="w-10 h-10 sm:w-16 sm:h-16 md:w-20 md:h-20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#0B1E4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="#0B1E4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="#0B1E4A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
          <h2 className="text-lg sm:text-2xl md:text-4xl font-extrabold text-slate-800 uppercase tracking-widest mb-3 md:mb-4 leading-tight">
            International Pancreatitis Conclave India
          </h2>
          <p className="text-sm sm:text-lg md:text-2xl text-slate-600 max-w-3xl mx-auto font-medium leading-relaxed px-4">
            Bridging Evidence, Innovation and Integrative Care in Pancreatitis
          </p>
        </motion.div>

        {/* Info Cards */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 w-full max-w-4xl mb-10 md:mb-16 px-2"
        >
          <div className="bg-white/90 backdrop-blur-xl p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 border border-white flex items-center space-x-4 sm:space-x-6 transform transition-all hover:-translate-y-1 hover:shadow-2xl group">
            <div className="bg-teal-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:bg-teal-100 transition-colors shrink-0">
              <CalendarDays className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />
            </div>
            <div>
              <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5 sm:mb-1">Save The Date</h3>
              <p className="text-lg sm:text-xl font-black text-[#0B1E4A]">12-14 Feb 2027</p>
            </div>
          </div>
          
          <div className="bg-white/90 backdrop-blur-xl p-5 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl shadow-slate-200/50 border border-white flex items-center space-x-4 sm:space-x-6 transform transition-all hover:-translate-y-1 hover:shadow-2xl group">
            <div className="bg-orange-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl group-hover:bg-orange-100 transition-colors shrink-0">
              <MapPin className="w-6 h-6 sm:w-8 sm:h-8 text-orange-500" />
            </div>
            <div>
              <h3 className="text-[10px] sm:text-xs font-bold text-slate-400 uppercase tracking-widest mb-0.5 sm:mb-1">Venue</h3>
              <p className="text-lg sm:text-xl font-black text-[#0B1E4A]">Rudrapur, India</p>
            </div>
          </div>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-10 mb-10 md:mb-16 bg-white/60 px-6 py-4 sm:px-8 rounded-2xl sm:rounded-full border border-white shadow-sm backdrop-blur-md w-full sm:w-auto"
        >
          <div className="flex items-center space-x-3 text-slate-700">
            <Microscope className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
            <span className="font-bold text-xs sm:text-sm uppercase tracking-wider">Modern Medicine</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          <div className="flex items-center space-x-3 text-slate-700">
            <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500" />
            <span className="font-bold text-xs sm:text-sm uppercase tracking-wider">Ayurveda</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-300"></div>
          <div className="flex items-center space-x-3 text-slate-700">
            <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B1E4A]" />
            <span className="font-bold text-xs sm:text-sm uppercase tracking-wider">Integrative Care</span>
          </div>
        </motion.div>

        {/* Coming Soon CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-center w-full max-w-2xl bg-[#0B1E4A] p-6 sm:p-10 md:p-14 rounded-3xl sm:rounded-[2.5rem] shadow-2xl relative overflow-hidden"
        >
          {/* Internal decoration */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl"></div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 md:mb-4 relative z-10 leading-tight">We're building something amazing</h2>
          <p className="text-slate-300 mb-6 sm:mb-10 relative z-10 text-sm sm:text-lg max-w-lg mx-auto leading-relaxed">
            Our full website with registration details, scientific programs, and speaker line-ups is launching soon.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 relative z-10 w-full">
            <button className="w-full sm:w-auto bg-teal-500 hover:bg-teal-400 text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center space-x-2 sm:space-x-3 group shadow-lg shadow-teal-500/30">
              <span>Notify Me</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="mailto:ipci2027@ipci.co.in" className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold py-3.5 sm:py-4 px-6 sm:px-8 rounded-xl sm:rounded-2xl transition-all flex items-center justify-center space-x-2 sm:space-x-3 backdrop-blur-md border border-white/10">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Contact Us</span>
            </a>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 sm:py-8 text-center mt-auto w-full px-4 border-t border-slate-100/50 bg-white/20 backdrop-blur-sm">
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-3 sm:mb-4">
            <span className="text-[10px] sm:text-xs font-bold text-[#0B1E4A] uppercase tracking-widest">Innovate</span>
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <span className="text-[10px] sm:text-xs font-bold text-[#0B1E4A] uppercase tracking-widest">Partner</span>
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <span className="text-[10px] sm:text-xs font-bold text-teal-600 uppercase tracking-widest">Collaborate</span>
            <span className="text-slate-300 hidden sm:inline">&bull;</span>
            <span className="text-[10px] sm:text-xs font-bold text-orange-500 uppercase tracking-widest">Impact</span>
        </div>
        <p className="text-slate-500 text-xs sm:text-sm font-medium leading-relaxed">
          &copy; {new Date().getFullYear()} IPCI 2027. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
