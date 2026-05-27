import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDays, MapPin, Mail, Phone, ArrowRight, Menu, X,
  Microscope, Leaf, Stethoscope, Globe, Users, BookOpen,
  ChevronDown, CheckCircle, Star, Award, HeartPulse, FlaskConical,
  Lightbulb, Target, TrendingUp, Building, GraduationCap, Shield,
  Activity, Brain, Pill, Salad, Dna, ExternalLink, Send
} from 'lucide-react';

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Objectives', href: '#objectives' },
  { label: 'Scope', href: '#scope' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Participants', href: '#participants' },
  { label: 'Contact', href: '#contact' },
];

const AT_A_GLANCE = [
  { icon: Globe, label: 'Multidisciplinary & International Platform' },
  { icon: Microscope, label: 'Evidence-Based Discussions' },
  { icon: Users, label: 'Collaboration & Future Research' },
  { icon: HeartPulse, label: 'Patient-Centered Affordable Care' },
  { icon: Globe, label: 'Integrative Approach for Global Impact' },
];

const OBJECTIVES = [
  { num: '01', text: 'Deliberate upon the rising burden and changing epidemiological trends of pancreatitis in India and globally.' },
  { num: '02', text: 'Discuss advances in diagnosis, emergency management, nutrition, rehabilitation and long-term care.' },
  { num: '03', text: 'Scientifically present observational and clinical evidence related to Ayurvedic and integrative approaches.' },
  { num: '04', text: 'Encourage collaborative clinical research, auditing, fellowship programs and evidence-generation initiatives.' },
  { num: '05', text: 'Explore the role of circadian rhythm, diet, stress and lifestyle in etiopathogenesis.' },
  { num: '06', text: 'Create a platform for interaction between modern medicine experts and AYUSH professionals.' },
  { num: '07', text: 'Facilitate development of multicentric studies, registries and consensus initiatives.' },
  { num: '08', text: 'Promote patient-centered and affordable healthcare strategies relevant to developing nations.' },
];

const SCOPE_ITEMS = [
  'Acute Pancreatitis', 'Chronic Pancreatitis', 'Pediatric Pancreatitis',
  'Tropical Pancreatitis', 'Autoimmune Pancreatitis', 'Nutritional & Lifestyle Factors',
  'Circadian Rhythm & Digestive Disorders', 'Integrative & Complementary Approaches',
  'Ayurvedic Therapeutic Protocols', 'Pancreatic Pain Management',
  'Nutritional Rehabilitation', 'Enzyme Therapy & Limitations',
  'Clinical Auditing & Evidence Generation', 'Public Health & Epidemiology',
  'Drug Development & Translational Research', 'Role of Rasashastra & Traditional Pharmacutics',
  'Patient Quality of Life & Rehabilitation', 'AI & Digital Health in Pancreatitis Monitoring',
];

const HIGHLIGHTS = [
  'Keynote Lectures', 'Scientific Paper Presentations', 'Panel Discussions',
  'Workshops & Clinical Audits', 'Poster Sessions', 'Young Researcher Forum',
  'Industry-Academia Interaction', 'Exhibition of Innovations', 'Patient Awareness Initiatives',
];

const NEEDS = [
  'India-specific data on pancreatitis is limited despite increasing burden.',
  'There is a gap between conventional symptom management and long-term holistic rehabilitation.',
  'Integrative approaches require scientific scrutiny, documentation and transparent evaluation.',
  'Existing platforms rarely facilitate meaningful dialogue between modern medicine and Ayurveda experts.',
  'Affordable and sustainable healthcare solutions are urgently needed for chronic pancreatitis patients.',
  'Decades of clinical experience in Ayurveda require systematic academic discussion and independent evaluation.',
  'Need to build collaborative networks among clinicians, researchers, institutions and policymakers.',
];

const OUTCOMES = [
  { category: 'Academic', icon: BookOpen, color: 'sky', items: ['Publication of conference proceedings & abstracts', 'Development of collaborative research proposals', 'Formation of expert working groups', 'Recommendations for future multicentric studies'] },
  { category: 'Clinical', icon: Stethoscope, color: 'green', items: ['Improved awareness on integrative pancreatitis care', 'Better understanding of lifestyle-linked etiological factors', 'Promotion of evidence-oriented therapeutic approaches'] },
  { category: 'Research', icon: FlaskConical, color: 'purple', items: ['Initiation of clinical audit & fellowship programs', 'Better understanding of data collection & patient registries', 'Encouragement for translational & interdisciplinary research'] },
  { category: 'Societal', icon: Users, color: 'orange', items: ['Improved patient awareness and empowerment', 'Reduction in stigma and misconceptions', 'Promotion of transparent and evidence-based healthcare communication'] },
];

const FAQS = [
  { q: 'What is IPCI 2027?', a: 'IPCI 2027 is an International Pancreatitis Conclave being organized to create a multidisciplinary platform where experts from modern medicine, Ayurveda, nutrition, research, biotechnology, and public health can discuss evidence-based and integrative approaches for pancreatitis care.' },
  { q: 'Why is such a conclave needed today?', a: 'India is witnessing a significant increase in pancreatitis cases, especially among younger populations. Despite this growing burden, multidisciplinary dialogue and India-specific collaborative research are still limited.' },
  { q: 'Is alcohol the only major cause of pancreatitis?', a: 'Not entirely. While alcohol remains an important factor, our long-term observations suggest that irregular lifestyle, stress, late-night sleeping, circadian rhythm disruption, metabolic disorders, and nutritional deficiencies also deserve serious scientific attention.' },
  { q: 'What makes IPCI 2027 different from conventional conferences?', a: 'IPCI 2027 promotes collaboration rather than conflict between healthcare systems. The conclave focuses on: Scientific dialogue, Clinical auditing, Transparent documentation, Integrative healthcare models, Patient-centered affordable care, Future collaborative research.' },
  { q: 'What role will Ayurveda play in IPCI 2027?', a: 'Ayurveda will be presented through evidence-oriented discussions, documented observations, and scientific scrutiny. The aim is not promotion, but transparent academic interaction for better patient outcomes.' },
  { q: 'What are the major themes of IPCI 2027?', a: 'Acute & Chronic Pancreatitis, Pediatric & Tropical Pancreatitis, Nutrition & Lifestyle Factors, Integrative & Complementary Approaches, AI & S&T Development, Pancreatic Pain Management, Clinical Auditing & Evidence Generation, AI & Digital Health Monitoring, Rehabilitation & Quality of Life.' },
  { q: 'Who should participate?', a: 'Gastroenterologists, Pancreatic Surgeons, Ayurvedic Physicians, Researchers & Scholars, Nutritionists, Pharmacologists, Public Health Experts, Medical Students, International Delegates and Patient Support Groups.' },
  { q: 'What outcomes are expected from IPCI 2027?', a: 'IPCI 2027 aims to stimulate collaborative research proposals, clinical audit initiatives, scientific publications & proceedings, better patient registries & documentation, integrative healthcare dialogue and awareness regarding preventive lifestyle measures.' },
  { q: 'Why was Rudrapur chosen as the venue?', a: 'Rudrapur is emerging as an important educational and healthcare hub of Uttarakhand. It symbolizes the perfect blend of natural healing heritage, modern healthcare and academic excellence.' },
  { q: 'What message would you like to give to young doctors and researchers?', a: '"Observe carefully, document honestly, and evaluate scientifically. Healthcare advances when different knowledge systems interact respectfully and transparently."' },
];

const PARTICIPANTS = [
  { icon: Stethoscope, label: 'Gastroenterologists' },
  { icon: Activity, label: 'Pancreatic Surgeons' },
  { icon: Leaf, label: 'Ayurvedic Physicians' },
  { icon: Microscope, label: 'Medical Researchers' },
  { icon: Salad, label: 'Nutritionists' },
  { icon: Pill, label: 'Pharmacologists' },
  { icon: HeartPulse, label: 'Public Health Experts' },
  { icon: GraduationCap, label: 'Medical Students' },
  { icon: Globe, label: 'International Delegates' },
  { icon: FlaskConical, label: 'Biotechnology Experts' },
  { icon: Users, label: 'Patient Support Groups' },
  { icon: Brain, label: 'Policymakers' },
];

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useCountdown(targetDate) {
  const [timeLeft, setTimeLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate) - new Date();
      if (diff <= 0) return setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return timeLeft;
}

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

// ─── ANIMATION VARIANTS ──────────────────────────────────────────────────────

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } } };
const stagger = { visible: { transition: { staggerChildren: 0.1 } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.5 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.9 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } } };

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function SectionTag({ children, icon: Icon }) {
  return (
    <div className="section-tag">
      {Icon && <Icon size={13} />}
      {children}
    </div>
  );
}

function CountdownUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass rounded-2xl px-4 py-3 sm:px-6 sm:py-4 min-w-[64px] sm:min-w-[80px] text-center relative overflow-hidden">
        <div className="shimmer absolute inset-0 opacity-40" />
        <span className="relative text-3xl sm:text-4xl md:text-5xl font-black text-[#0B1E4A] tabular-nums leading-none">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-500">{label}</span>
    </div>
  );
}

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLinkClick = (href) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2 glass shadow-lg shadow-green-900/5' : 'py-4 bg-transparent'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center shadow-md shadow-emerald-500/30">
              <span className="text-white font-black text-sm leading-none">IP</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-[#0B1E4A] text-lg tracking-tight">IPCI <span className="gradient-text-green">2027</span></span>
              <span className="text-[9px] text-slate-500 font-semibold uppercase tracking-widest hidden sm:block">International Pancreatitis Conclave</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map(({ label, href }) => (
              <a key={href} href={href} onClick={(e) => { e.preventDefault(); handleLinkClick(href); }} className="nav-link">{label}</a>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a href="#contact" onClick={(e) => { e.preventDefault(); handleLinkClick('#contact'); }} className="btn-primary text-sm py-2.5 px-5">
              Register Interest <ArrowRight size={15} />
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setOpen(true)} className="lg:hidden p-2 rounded-xl glass" aria-label="Open menu">
            <Menu size={22} className="text-[#0B1E4A]" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-80 glass-dark flex flex-col p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <span className="font-black text-white text-xl">IPCI <span className="gradient-text-green">2027</span></span>
                <button onClick={() => setOpen(false)} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors" aria-label="Close menu">
                  <X size={20} className="text-white" />
                </button>
              </div>
              <nav className="flex flex-col gap-2 flex-1">
                {NAV_LINKS.map(({ label, href }) => (
                  <a key={href} href={href} onClick={(e) => { e.preventDefault(); handleLinkClick(href); }}
                    className="text-slate-200 hover:text-white font-semibold py-3 px-4 rounded-xl hover:bg-white/10 transition-all text-lg">
                    {label}
                  </a>
                ))}
              </nav>
              <a href="#contact" onClick={(e) => { e.preventDefault(); handleLinkClick('#contact'); setOpen(false); }} className="btn-primary mt-4 justify-center">
                Register Interest <ArrowRight size={16} />
              </a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

// ─── HERO SECTION ────────────────────────────────────────────────────────────

function HeroSection() {
  const countdown = useCountdown('2027-02-12T09:00:00+05:30');

  return (
    <section id="hero" className="hero-mesh min-h-screen flex flex-col items-center justify-center relative overflow-hidden pt-24 pb-16 px-4">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full bg-emerald-400/10 blur-[100px] -translate-x-1/2 -translate-y-1/4 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-sky-400/10 blur-[80px] translate-x-1/4 translate-y-1/4 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-teal-300/8 blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full text-center relative z-10">
        {/* Live badge */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 glass px-5 py-2 rounded-full shadow-lg shadow-emerald-100 mb-8 border border-emerald-100">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
          </span>
          <span className="text-xs font-bold text-slate-700 uppercase tracking-widest">Registrations Opening Soon</span>
        </motion.div>

        {/* Main Headline */}
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }}>
          <h1 className="font-black tracking-tight leading-none mb-4">
            <span className="block text-6xl sm:text-8xl md:text-[120px] text-[#0B1E4A]">IPCI</span>
            <span className="block text-7xl sm:text-9xl md:text-[140px] gradient-text-green" style={{ lineHeight: 1 }}>2027</span>
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl font-extrabold text-[#0B1E4A] uppercase tracking-widest mb-3 mt-2">
            International Pancreatitis Conclave India
          </p>
          <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed mb-2 italic">
            "Bridging Evidence, Innovation and Integrative Care in Pancreatitis"
          </p>
        </motion.div>

        {/* Date & Location */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-6 mb-10">
          <div className="flex items-center gap-2.5 glass px-5 py-3 rounded-2xl shadow-sm">
            <CalendarDays size={20} className="text-emerald-500 shrink-0" />
            <span className="font-bold text-[#0B1E4A] text-sm sm:text-base">12–14 February 2027</span>
          </div>
          <div className="flex items-center gap-2.5 glass px-5 py-3 rounded-2xl shadow-sm">
            <MapPin size={20} className="text-sky-500 shrink-0" />
            <span className="font-bold text-[#0B1E4A] text-sm sm:text-base">Rudrapur, Uttarakhand, India</span>
          </div>
        </motion.div>

        {/* Countdown */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}>
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4">Event Starts In</p>
          <div className="flex justify-center items-end gap-3 sm:gap-5 mb-10">
            <CountdownUnit value={countdown.days} label="Days" />
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 mb-7">:</span>
            <CountdownUnit value={countdown.hours} label="Hours" />
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 mb-7">:</span>
            <CountdownUnit value={countdown.minutes} label="Minutes" />
            <span className="text-3xl sm:text-4xl font-black text-emerald-400 mb-7">:</span>
            <CountdownUnit value={countdown.seconds} label="Seconds" />
          </div>
        </motion.div>

        {/* CTAs */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
          <a href="#contact" onClick={(e) => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-primary text-base px-8 py-4 justify-center">
            Register Interest <ArrowRight size={18} />
          </a>
          <a href="#scope" onClick={(e) => { e.preventDefault(); document.querySelector('#scope')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="btn-outline text-base px-8 py-4 justify-center">
            View Agenda <BookOpen size={18} />
          </a>
        </motion.div>

        {/* At a Glance Pillars */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 max-w-5xl mx-auto">
          {AT_A_GLANCE.map(({ icon: Icon, label }, i) => (
            <motion.div key={i} whileHover={{ y: -4, scale: 1.02 }} transition={{ duration: 0.2 }}
              className="glass rounded-2xl p-4 flex flex-col items-center gap-2 text-center card-hover">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-50 to-sky-50 border border-emerald-100 flex items-center justify-center">
                <Icon size={18} className="text-emerald-600" />
              </div>
              <p className="text-xs font-semibold text-slate-700 leading-snug">{label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Tagline strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-500 py-2 flex justify-center gap-8 sm:gap-16 overflow-hidden">
        {['Knowledge', 'Collaboration', 'Compassion', 'Cure'].map((w, i) => (
          <span key={i} className="text-white font-bold text-xs sm:text-sm uppercase tracking-widest whitespace-nowrap">{w}</span>
        ))}
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ───────────────────────────────────────────────────────────

function AboutSection() {
  const [ref, inView] = useInView();
  return (
    <section id="about" ref={ref} className="py-20 sm:py-28 px-4 mesh-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: About IPCI */}
          <motion.div variants={fadeUp}>
            <SectionTag icon={Lightbulb}>About IPCI 2027</SectionTag>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0B1E4A] leading-tight mb-6">
              A Global Conclave for<br />
              <span className="gradient-text-green">Better Pancreatitis Care</span>
            </h2>
            <div className="space-y-4 text-slate-600 text-base sm:text-lg leading-relaxed">
              <p>Pancreatitis is a growing global health challenge with rising incidence in India across all age groups. Beyond alcohol, factors such as lifestyle disturbances, irregular diet, stress, circadian rhythm disruption, metabolic disorders and nutritional deficiencies are significant contributors.</p>
              <p>IPCI 2027 aims to bring together global experts from modern medicine, Ayurveda, research, nutrition, public health and industry to share evidence, experiences and innovations for better outcomes in pancreatitis care.</p>
            </div>
            <div className="mt-8 p-5 rounded-2xl border-l-4 border-emerald-400 bg-emerald-50/60">
              <p className="text-slate-700 font-medium italic text-base leading-relaxed">
                "Uniting Knowledge Systems for Better Outcomes and Healthier Lives."
              </p>
            </div>
          </motion.div>

          {/* Right: Vaidya Balendu Prakash */}
          <motion.div variants={scaleIn}>
            <div className="relative">
              <div className="glass rounded-3xl p-8 shadow-2xl shadow-emerald-100 border border-emerald-50 relative overflow-hidden">
                {/* Decorative circle */}
                <div className="absolute -top-16 -right-16 w-48 h-48 rounded-full bg-gradient-to-br from-emerald-100 to-sky-100 opacity-60 pointer-events-none" />

                <div className="relative z-10">
                  {/* Header badge */}
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 px-4 py-2 rounded-full mb-5">
                    <Award size={15} className="text-amber-500" />
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Padma Shri Awardee</span>
                  </div>

                  {/* Avatar placeholder */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-emerald-200 shrink-0 pulse-ring">
                      VB
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-black text-[#0B1E4A] leading-tight">Vaidya Balendu Prakash</h3>
                      <p className="text-emerald-600 font-semibold text-sm">Renowned Ayurvedic Physician</p>
                      <p className="text-slate-500 text-xs font-medium mt-0.5">50+ Years of Clinical Experience</p>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    Padma Shri Awardee with 50+ years of clinical experience in integrative management of pancreatitis and metabolic disorders. A pioneer in bridging Ayurvedic wisdom with modern clinical practice.
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[{ num: '50+', label: 'Years Exp.' }, { num: '10K+', label: 'Patients' }, { num: 'Padma Shri', label: 'Awardee' }].map(({ num, label }, i) => (
                      <div key={i} className="text-center p-3 rounded-xl glass-green">
                        <p className="font-black text-[#0B1E4A] text-lg leading-none">{num}</p>
                        <p className="text-[10px] font-semibold text-slate-500 mt-1 uppercase tracking-wide">{label}</p>
                      </div>
                    ))}
                  </div>

                  <blockquote className="mt-5 p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-100 text-sm text-slate-700 italic font-medium leading-relaxed">
                    "Together, let us create a movement towards evidence, innovation and integrative care for a pancreatitis-free future."
                  </blockquote>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── OBJECTIVES SECTION ──────────────────────────────────────────────────────

function ObjectivesSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section id="objectives" ref={ref} className="py-20 sm:py-28 px-4 bg-gradient-to-b from-white to-emerald-50/40">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <SectionTag icon={Target}>Our Objectives</SectionTag>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0B1E4A] mt-2">
              Aim & <span className="gradient-text-green">Objectives</span>
            </h2>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-base sm:text-lg">
              To establish a global scientific platform for dialogue, documentation, collaboration, and evaluation of multidisciplinary and integrative approaches in the prevention, management, and long-term care of pancreatitis.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {OBJECTIVES.map(({ num, text }, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }} transition={{ duration: 0.25 }}
                className="glass rounded-2xl p-6 border border-white shadow-md hover:shadow-xl hover:shadow-emerald-100/50 transition-shadow duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center text-white font-black text-sm mb-4 shadow-md shadow-emerald-200 group-hover:scale-110 transition-transform">
                  {num}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed font-medium">{text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── SCOPE SECTION ───────────────────────────────────────────────────────────

function ScopeSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section id="scope" ref={ref} className="py-20 sm:py-28 px-4 mesh-bg">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <SectionTag icon={BookOpen}>Scientific Program</SectionTag>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0B1E4A] mt-2">
              Conclave <span className="gradient-text-green">Scope & Highlights</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Scope */}
            <motion.div variants={fadeUp}>
              <h3 className="text-xl font-black text-[#0B1E4A] mb-5 flex items-center gap-2">
                <span className="w-1.5 h-7 rounded-full bg-gradient-to-b from-emerald-400 to-sky-500 inline-block" />
                Topics & Scope
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {SCOPE_ITEMS.map((item, i) => (
                  <motion.span key={i} variants={scaleIn} whileHover={{ scale: 1.05 }}
                    className="px-3.5 py-2 rounded-xl text-sm font-semibold text-slate-700 glass border border-emerald-100 hover:border-emerald-300 hover:text-emerald-700 cursor-default transition-all duration-200 shadow-sm">
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Highlights */}
            <motion.div variants={fadeUp}>
              <h3 className="text-xl font-black text-[#0B1E4A] mb-5 flex items-center gap-2">
                <span className="w-1.5 h-7 rounded-full bg-gradient-to-b from-sky-400 to-emerald-400 inline-block" />
                Conclave Highlights
              </h3>
              <div className="space-y-3">
                {HIGHLIGHTS.map((item, i) => (
                  <motion.div key={i} variants={fadeUp} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 glass rounded-xl px-5 py-3.5 border border-white shadow-sm hover:border-emerald-200 transition-all group">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-emerald-50 to-sky-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:from-emerald-100 group-hover:to-sky-100 transition-colors">
                      <CheckCircle size={14} className="text-emerald-500" />
                    </div>
                    <span className="text-slate-700 font-semibold text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── NEED & OUTCOMES SECTION ─────────────────────────────────────────────────

function NeedOutcomesSection() {
  const [ref, inView] = useInView(0.08);
  const [activeTab, setActiveTab] = useState(0);
  return (
    <section id="need" ref={ref} className="py-20 sm:py-28 px-4 bg-gradient-to-b from-emerald-50/40 to-white">
      <div className="max-w-7xl mx-auto">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <SectionTag icon={TrendingUp}>Why It Matters</SectionTag>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0B1E4A] mt-2">
              Need & <span className="gradient-text-green">Expected Outcomes</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            {/* Need */}
            <motion.div variants={fadeUp}>
              <div className="glass-green rounded-3xl p-7 border border-emerald-100 shadow-lg">
                <h3 className="text-xl font-black text-[#0B1E4A] mb-5 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center">
                    <Shield size={15} className="text-emerald-600" />
                  </div>
                  Need for IPCI 2027
                </h3>
                <div className="space-y-3">
                  {NEEDS.map((need, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/60 transition-colors">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-600 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                      <p className="text-slate-700 text-sm leading-relaxed">{need}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Outcomes */}
            <motion.div variants={fadeUp}>
              {/* Tabs */}
              <div className="flex gap-2 mb-5 flex-wrap">
                {OUTCOMES.map(({ category }, i) => (
                  <button key={i} onClick={() => setActiveTab(i)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${activeTab === i ? 'bg-gradient-to-r from-emerald-500 to-sky-500 text-white shadow-md shadow-emerald-200' : 'glass text-slate-600 hover:text-emerald-600 border border-slate-100'}`}>
                    {category}
                  </button>
                ))}
              </div>
              <AnimatePresence mode="wait">
                {OUTCOMES.map(({ category, icon: Icon, items }, i) => (
                  activeTab === i && (
                    <motion.div key={category} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="glass-sky rounded-3xl p-7 border border-sky-100 shadow-lg">
                      <h3 className="text-xl font-black text-[#0B1E4A] mb-5 flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-sky-100 flex items-center justify-center">
                          <Icon size={15} className="text-sky-600" />
                        </div>
                        {category} Outcomes
                      </h3>
                      <div className="space-y-3">
                        {items.map((item, j) => (
                          <div key={j} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/60 transition-colors">
                            <CheckCircle size={16} className="text-sky-500 shrink-0 mt-0.5" />
                            <p className="text-slate-700 text-sm leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FAQ SECTION ─────────────────────────────────────────────────────────────

function FAQSection() {
  const [ref, inView] = useInView(0.08);
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" ref={ref} className="py-20 sm:py-28 px-4 mesh-bg">
      <div className="max-w-4xl mx-auto">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <SectionTag icon={BookOpen}>Q & A</SectionTag>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0B1E4A] mt-2">
              Frequently Asked <span className="gradient-text-green">Questions</span>
            </h2>
            <p className="text-slate-500 mt-3 text-base">An exclusive Q&A with Vaidya Balendu Prakash</p>
          </motion.div>

          <div className="space-y-3">
            {FAQS.map(({ q, a }, i) => (
              <motion.div key={i} variants={fadeUp}>
                <div
                  className={`rounded-2xl overflow-hidden border transition-all duration-300 ${open === i ? 'border-emerald-200 shadow-lg shadow-emerald-50' : 'border-slate-100 shadow-sm'} glass`}
                >
                  <button
                    onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                    id={`faq-btn-${i}`}
                    aria-expanded={open === i}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black shrink-0 transition-all ${open === i ? 'bg-gradient-to-br from-emerald-400 to-sky-400 text-white' : 'bg-slate-100 text-slate-600'}`}>
                        {i + 1}
                      </span>
                      <span className="font-bold text-[#0B1E4A] text-sm sm:text-base leading-snug">{q}</span>
                    </div>
                    <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown size={18} className={open === i ? 'text-emerald-500' : 'text-slate-400'} />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {open === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 border-t border-emerald-50">
                          <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-4">{a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── PARTICIPANTS SECTION ────────────────────────────────────────────────────

function ParticipantsSection() {
  const [ref, inView] = useInView(0.1);
  return (
    <section id="participants" ref={ref} className="py-20 sm:py-28 px-4 bg-gradient-to-b from-white to-sky-50/40">
      <div className="max-w-6xl mx-auto">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <SectionTag icon={Users}>Who Should Come</SectionTag>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0B1E4A] mt-2">
              Who Should <span className="gradient-text-green">Participate?</span>
            </h2>
            <p className="text-slate-600 mt-4 max-w-xl mx-auto text-base">
              IPCI 2027 welcomes a diverse range of healthcare professionals, researchers, and advocates.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {PARTICIPANTS.map(({ icon: Icon, label }, i) => (
              <motion.div key={i} variants={scaleIn} whileHover={{ y: -8, scale: 1.03 }} transition={{ duration: 0.25 }}
                className="glass rounded-2xl p-5 flex flex-col items-center gap-3 text-center card-hover border border-white shadow-md cursor-default group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-50 to-sky-50 border border-emerald-100 flex items-center justify-center group-hover:from-emerald-100 group-hover:to-sky-100 transition-colors shadow-sm">
                  <Icon size={22} className="text-emerald-600 group-hover:text-emerald-700 transition-colors" />
                </div>
                <p className="text-xs font-bold text-slate-700 leading-tight">{label}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Tagline */}
          <motion.div variants={fadeUp} className="mt-12 text-center p-6 rounded-3xl glass-green border border-emerald-100 max-w-3xl mx-auto shadow-md">
            <p className="text-lg sm:text-xl font-bold text-[#0B1E4A] leading-relaxed italic">
              "Together, let us create a movement towards evidence, innovation and integrative care for a pancreatitis-free future."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ─────────────────────────────────────────────────────────

function ContactSection() {
  const [ref, inView] = useInView(0.1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', profession: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Phone is required';
    if (!form.profession.trim()) e.profession = 'Profession is required';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setSubmitted(true);
  };

  return (
    <section id="contact" ref={ref} className="py-20 sm:py-28 px-4 mesh-bg relative overflow-hidden">
      <div className="absolute -top-40 left-0 w-[400px] h-[400px] rounded-full bg-emerald-300/8 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-40 right-0 w-[400px] h-[400px] rounded-full bg-sky-300/8 blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div variants={stagger} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={fadeUp} className="text-center mb-14">
            <SectionTag icon={Mail}>Get In Touch</SectionTag>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0B1E4A] mt-2">
              Connect <span className="gradient-text-green">With Us</span>
            </h2>
            <p className="text-slate-600 mt-4 max-w-xl mx-auto text-base">
              Register your interest, ask questions, or get more information about IPCI 2027.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Contact Info */}
            <motion.div variants={fadeUp} className="lg:col-span-2 space-y-5">
              {[
                { icon: Phone, label: 'Phone', lines: ['+91 98370 28544', '+91 79833 92736'], href: 'tel:+919837028544' },
                { icon: Mail, label: 'Email', lines: ['info@ipci2027.co.in'], href: 'mailto:info@ipci2027.co.in' },
                { icon: MapPin, label: 'Venue', lines: ['Rudrapur, Uttarakhand, India', '12–14 February 2027'], href: null },
                { icon: Globe, label: 'Website', lines: ['www.ipci.co.in'], href: 'https://www.ipci.co.in' },
              ].map(({ icon: Icon, label, lines, href }, i) => (
                <motion.div key={i} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}
                  className="glass rounded-2xl p-5 border border-white shadow-md hover:border-emerald-100 transition-colors group">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-50 to-sky-50 border border-emerald-100 flex items-center justify-center shrink-0 group-hover:from-emerald-100 group-hover:to-sky-100 transition-colors shadow-sm">
                      <Icon size={18} className="text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
                      {lines.map((line, j) => (
                        href ? (
                          <a key={j} href={href} className="block font-semibold text-[#0B1E4A] text-sm hover:text-emerald-600 transition-colors">{line}</a>
                        ) : (
                          <p key={j} className="font-semibold text-[#0B1E4A] text-sm">{line}</p>
                        )
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div variants={scaleIn} className="lg:col-span-3">
              <div className="glass rounded-3xl p-7 sm:p-10 border border-white shadow-2xl shadow-emerald-50">
                {submitted ? (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                    className="text-center py-8">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center mx-auto mb-5 shadow-xl shadow-emerald-200">
                      <CheckCircle size={36} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-black text-[#0B1E4A] mb-3">Thank You!</h3>
                    <p className="text-slate-600 text-base leading-relaxed max-w-sm mx-auto">Your interest has been registered. We'll be in touch with more details about IPCI 2027 soon.</p>
                    <button onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', profession: '', message: '' }); }}
                      className="btn-outline mt-6 mx-auto">Submit Another</button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <h3 className="text-xl font-black text-[#0B1E4A] mb-1">Register Your Interest</h3>
                    <p className="text-slate-500 text-sm mb-4">Be among the first to receive updates and registration details.</p>

                    <div className="grid sm:grid-cols-2 gap-4">
                      {[
                        { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Dr. John Doe' },
                        { id: 'email', label: 'Email Address', type: 'email', placeholder: 'john@example.com' },
                        { id: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+91 98XXX XXXXX' },
                        { id: 'profession', label: 'Profession / Specialty', type: 'text', placeholder: 'Gastroenterologist' },
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
                      <label htmlFor="message" className="text-xs font-bold text-slate-600 uppercase tracking-wider">Message (Optional)</label>
                      <textarea id="message" rows={4} placeholder="Any questions or specific topics you'd like to see addressed..."
                        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-medium text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 bg-white/70 focus:bg-white focus:border-emerald-300 focus:ring-2 focus:ring-emerald-100 resize-none" />
                    </div>

                    <button type="submit" className="btn-primary w-full justify-center py-4 text-base">
                      <Send size={17} />
                      Submit Registration
                    </button>
                    <p className="text-center text-xs text-slate-400">
                      By submitting, you agree to be contacted about IPCI 2027.
                    </p>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#0B1E4A] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-64 h-64 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-sky-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <span className="text-white font-black text-sm">IP</span>
              </div>
              <div>
                <p className="font-black text-2xl tracking-tight">IPCI <span className="gradient-text-green">2027</span></p>
                <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-widest">International Pancreatitis Conclave India</p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Bridging Evidence, Innovation and Integrative Care in Pancreatitis.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {['Knowledge', 'Collaboration', 'Compassion', 'Cure'].map((w, i) => (
                <span key={i} className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-white/10 text-slate-400">{w}</span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-300 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <a href={href} onClick={(e) => { e.preventDefault(); document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }); }}
                    className="text-slate-400 hover:text-emerald-400 text-sm font-medium transition-colors">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-slate-300 mb-4">Contact</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-emerald-400 shrink-0" />
                <a href="tel:+919837028544" className="hover:text-emerald-400 transition-colors">+91 98370 28544</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={13} className="text-emerald-400 shrink-0" />
                <a href="tel:+917983392736" className="hover:text-emerald-400 transition-colors">+91 79833 92736</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={13} className="text-sky-400 shrink-0" />
                <a href="mailto:info@ipci2027.co.in" className="hover:text-sky-400 transition-colors break-all">info@ipci2027.co.in</a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={13} className="text-emerald-400 shrink-0 mt-0.5" />
                <span>Rudrapur, Uttarakhand, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} IPCI 2027 — International Pancreatitis Conclave India. All rights reserved.</p>
          <p>
            <a href="mailto:info@ipci2027.co.in" className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">info@ipci2027.co.in</a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── SCROLL TO TOP ────────────────────────────────────────────────────────────

function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all hover:-translate-y-1"
          aria-label="Scroll to top"
        >
          <ChevronDown size={20} className="text-white rotate-180" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ObjectivesSection />
      <ScopeSection />
      <NeedOutcomesSection />
      <FAQSection />
      <ParticipantsSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
