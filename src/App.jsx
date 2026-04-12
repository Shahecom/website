import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValueEvent } from 'framer-motion';
import { 
  BookOpen, Check, Zap, ArrowRight, Star, ShieldCheck, ChevronRight, Target, Shield, AlertCircle, Download, BookText, Layers, Lock, X, Award, TrendingUp, Users, ChevronDown
} from 'lucide-react';

// --- KONFIGURATION FÜR PRODUKTION ---
const CHECKOUT_URL = "https://payhip.com/b/sI9w2";

// --- EASING FÜR KINOREIFE ANIMATIONEN ---
const ultraSmooth = [0.16, 1, 0.3, 1];
const slowFade = [0.22, 1, 0.36, 1];

// --- DATEN ---
const CHAPTERS = [
  { num: "01", title: "Die Fundament-Analyse", desc: "Warum YouTube-Reminder nicht funktionieren und wie du die wahren Blockaden erkennst, die dich im Bett halten." },
  { num: "02", title: "Dopamin-Detox Protokoll", desc: "Die klinisch bewiesene 60-Minuten-Routine vor dem Schlafen, die dein Gehirn auf das Fajr-Gebet umprogrammiert." },
  { num: "03", title: "Das 30-Tage System", desc: "Der exakte, kompromisslose Plan, um Standhaftigkeit zu einer unbrechbaren neurologischen Gewohnheit zu machen." }
];

const FAQS = [
  { q: "Ist dieses System auch für Anfänger geeignet?", a: "Absolut. Das System setzt kein islamisches Vorwissen voraus. Es ist keine theologische Abhandlung, sondern ein psychologisches Praxis-Framework, das jeder sofort anwenden kann." },
  { q: "Wie erhalte ich das E-Book?", a: "Nach dem sicheren Checkout erhältst du sofortigen Zugriff auf das PDF. Du kannst es direkt auf deinem Smartphone, Tablet oder PC lesen und herunterladen." },
  { q: "Ich habe wenig Zeit. Schaffe ich das?", a: "Das Buch ist absichtlich extrem kurz und komprimiert geschrieben. Keine Füllwörter. Du kannst es an einem Nachmittag durchlesen und das System am selben Abend starten." },
  { q: "Was, wenn es bei mir nicht funktioniert?", a: "Dank unserer 30-Tage-Garantie hast du null Risiko. Setze das System um. Wenn sich dein Fajr nicht spürbar verbessert, schreib eine kurze E-Mail und du bekommst jeden Cent zurück." }
];

// --- GENERATOR FÜR LIVE-VERKÄUFE ---
const NAMES = ["Ali M.", "Sara K.", "Bilal Y.", "Amina S.", "Yusuf T.", "Zainab R.", "Omar F.", "Fatima A.", "Tarik B.", "Hasan C.", "Leila D.", "Hamza E.", "Mariam F.", "Ibrahim G.", "Khadija H.", "Karim I.", "Nora J.", "Amir K.", "Rania L.", "Samir M.", "Ilyas O.", "Meryem P."];
const CITIES = ["Berlin", "Hamburg", "München", "Köln", "Frankfurt", "Stuttgart", "Düsseldorf", "Leipzig", "Dortmund", "Essen", "Bremen", "Wien", "Zürich", "Basel", "Hannover", "Nürnberg"];
const TIMES = ["vor 2 Minuten", "vor 5 Minuten", "vor 12 Minuten", "vor 18 Minuten", "vor 23 Minuten", "vor 34 Minuten", "vor 41 Minuten", "vor 1 Stunde", "vor 2 Stunden"];

// --- SUB-COMPONENTS ---

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const yOffset = direction === "up" ? 30 : direction === "down" ? -30 : 0;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, delay, ease: slowFade }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// PREMIUM CTA BUTTON MIT SHINE EFFEKT
const PremiumButton = ({ href, children, className = "", icon = <ArrowRight size={18} /> }) => (
  <motion.a 
    href={href} target="_blank" rel="noopener noreferrer"
    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
    className={`group relative inline-flex items-center justify-center px-8 py-5 overflow-hidden rounded-sm bg-gradient-to-r from-[#E5C07B] to-[#c29b53] text-black font-black uppercase tracking-[0.15em] transition-all duration-300 shadow-[0_0_40px_rgba(229,192,123,0.3)] hover:shadow-[0_0_60px_rgba(229,192,123,0.5)] w-full md:w-auto ${className}`}
  >
    {/* Animated Shine */}
    <motion.div 
      animate={{ x: ["-100%", "200%"] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
      className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform -skew-x-12 z-10"
    />
    <span className="relative z-20 flex items-center gap-3 text-sm md:text-base drop-shadow-sm">
      {children} 
      <span className="group-hover:translate-x-1 transition-transform duration-300">{icon}</span>
    </span>
  </motion.a>
);

// HIGH-END E-BOOK MOCKUP
const EBookMockup = ({ floating = true }) => {
  const animationProps = floating ? {
    animate: { y: [-12, 12, -12], rotateY: [-15, -12, -15] },
    transition: { duration: 7, repeat: Infinity, ease: "easeInOut" }
  } : {};

  return (
    <div className="relative w-[280px] h-[380px] md:w-[400px] md:h-[540px] shrink-0 group perspective-[1200px] z-20 mx-auto">
      {/* Ambient Glow */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.9, 1.1, 0.9] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 bg-[#E5C07B] blur-[100px] rounded-full pointer-events-none" 
      />
      
      <motion.div 
        {...animationProps}
        className="relative w-full h-full transform-style-3d transition-all duration-700 ease-out"
      >
        {/* Buchrücken */}
        <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-[#050505] to-[#1a1a1a] border-y border-l border-white/10 origin-left transform rotate-y-[-90deg] translate-x-[-1px] flex items-center justify-center overflow-hidden shadow-2xl">
           <span className="text-white/20 text-[8px] md:text-[10px] tracking-[0.4em] uppercase transform -rotate-90 whitespace-nowrap font-serif">Der Standhafte Muslim</span>
        </div>

        {/* Seiten-Effekt */}
        <div className="absolute right-0 top-[1%] bottom-[1%] w-10 md:w-16 bg-gradient-to-l from-[#d4d4d4] to-[#f5f5f5] origin-right transform rotate-y-[90deg] translate-x-[1px] flex flex-col justify-evenly overflow-hidden rounded-r-sm">
          {[...Array(30)].map((_, i) => <div key={i} className="w-full h-[1px] bg-black/5" />)}
        </div>

        {/* Front Cover */}
        <div className="absolute inset-0 bg-[#030303] border border-white/10 shadow-[30px_30px_60px_rgba(0,0,0,0.95),inset_1px_1px_0_rgba(255,255,255,0.15)] rounded-r-md flex flex-col justify-between p-8 md:p-12 overflow-hidden z-10 group-hover:border-[#E5C07B]/30 transition-colors duration-500">
          
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-[#E5C07B]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
          
          <div className="relative z-10">
            <p className="text-[#E5C07B] text-[8px] md:text-[10px] uppercase tracking-[0.4em] font-bold mb-4 md:mb-6">Das Premium E-Book</p>
            <h4 className="font-serif tracking-tighter uppercase leading-[1.05] font-black flex flex-col text-white">
              <span className="text-3xl md:text-4xl text-white/50 mb-1">Der</span>
              <span className="text-4xl md:text-5xl mb-1 drop-shadow-lg">Standhafte</span>
              <span className="text-5xl md:text-6xl text-[#E5C07B] drop-shadow-[0_0_15px_rgba(229,192,123,0.3)]">Muslim</span>
            </h4>
          </div>
          
          <div className="relative z-10 flex items-end justify-between border-t border-white/10 pt-6">
            <div className="text-white/40 text-[8px] md:text-[10px] uppercase tracking-widest leading-relaxed">
              30-Tage<br/>Praxis<br/>System
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 border border-[#E5C07B]/30 flex items-center justify-center bg-[#E5C07B]/10 backdrop-blur-md rounded-sm shadow-[0_0_20px_rgba(229,192,123,0.1)]">
              <BookOpen size={24} className="text-[#E5C07B]" />
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Floating Shadow */}
      <motion.div 
        animate={floating ? { scale: [1, 0.85, 1], opacity: [0.6, 0.2, 0.6] } : {}}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-[90%] h-10 bg-black blur-2xl transform rotate-y-[-15deg] pointer-events-none" 
      />
    </div>
  );
};

// AMBIENT BACKGROUND GLOWS
const AmbientBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <motion.div 
      animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.1, 0.15, 0.1] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#E5C07B] blur-[150px] rounded-full opacity-10 mix-blend-screen"
    />
    <motion.div 
      animate={{ x: [0, -100, 0], y: [0, 50, 0], opacity: [0.05, 0.1, 0.05] }}
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-white blur-[150px] rounded-full opacity-5 mix-blend-screen"
    />
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-[0.02]" />
  </div>
);

// --- GLOBAL LIVE SALES POPUP ---
const LiveSalesPopup = () => {
  const [currentSale, setCurrentSale] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showRandomSale = () => {
      const name = NAMES[Math.floor(Math.random() * NAMES.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const time = TIMES[Math.floor(Math.random() * TIMES.length)];
      
      setCurrentSale({ name, city, time });
      setIsVisible(true);

      // Verstecke Popup nach 5 Sekunden
      setTimeout(() => setIsVisible(false), 5000);
    };

    // Erster Sale nach 4 Sekunden
    const initialTimeout = setTimeout(showRandomSale, 4000);

    // Danach zufällig alle 12 bis 25 Sekunden
    const interval = setInterval(() => {
      showRandomSale();
    }, Math.floor(Math.random() * (25000 - 12000 + 1) + 12000));

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && currentSale && (
        <motion.div
          initial={{ opacity: 0, y: 50, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.5, ease: ultraSmooth }}
          className="fixed bottom-6 left-6 z-[90] bg-[#0a0a0a]/90 backdrop-blur-md border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.8)] p-4 rounded-sm flex items-center gap-4 pr-12 hidden md:flex max-w-[320px]"
        >
          <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <Check size={18} className="text-emerald-500" />
          </div>
          <div>
            <p className="text-white text-sm font-bold leading-tight">
              {currentSale.name} <span className="text-white/40 font-normal">aus {currentSale.city}</span>
            </p>
            <p className="text-[#E5C07B] text-xs font-medium mt-0.5">
              hat das E-Book gesichert.
            </p>
            <p className="text-white/30 text-[10px] mt-1 uppercase tracking-widest">{currentSale.time}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


// --- SECTIONS ---

const StickyHeader = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 600) setIsVisible(true);
    else setIsVisible(false);
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: "-100%" }} animate={{ y: 0 }} exit={{ y: "-100%" }} transition={{ duration: 0.4, ease: ultraSmooth }}
          className="fixed top-0 left-0 w-full z-[100] bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="hidden md:flex items-center gap-4">
              <BookOpen className="text-[#E5C07B]" size={20} />
              <div>
                <div className="text-white font-serif tracking-widest uppercase text-sm font-bold leading-none mb-1">Der Standhafte Muslim</div>
                <div className="flex items-center gap-2 text-emerald-400 text-[10px] uppercase tracking-widest font-bold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Live Verfügbar
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto">
              <div className="text-right">
                <span className="text-white/40 line-through text-[10px] uppercase tracking-widest mr-2">49,00€</span>
                <span className="text-white font-serif text-xl font-bold">14,99€</span>
              </div>
              <motion.a 
                href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="bg-[#E5C07B] text-black px-6 py-3 text-xs font-black uppercase tracking-widest rounded-sm shadow-[0_0_20px_rgba(229,192,123,0.2)] flex items-center gap-2"
              >
                Sichern <ChevronRight size={14}/>
              </motion.a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-12 px-6 overflow-hidden bg-[#020202]">
      <AmbientBackground />
      
      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-8 items-center relative z-10">
        
        <div className="order-2 lg:order-1 flex flex-col items-center lg:items-start text-center lg:text-left mt-4 lg:mt-0">
          <FadeIn delay={0.1} className="flex items-center gap-2 mb-6">
            <div className="flex -space-x-2 mr-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className={`w-6 h-6 rounded-full border border-black flex items-center justify-center text-[8px] bg-[#111] text-[#E5C07B]`}>★</div>
              ))}
              <div className="w-6 h-6 rounded-full border border-black bg-[#E5C07B] flex items-center justify-center text-black text-[8px] font-bold">+</div>
            </div>
            <div className="text-white/60 text-[10px] md:text-[11px] uppercase tracking-widest font-medium">
              Von <strong className="text-white">1.000+</strong> Muslimen vertraut
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="text-white font-serif text-5xl md:text-7xl lg:text-[90px] leading-[0.9] tracking-tighter uppercase mb-6 drop-shadow-2xl">
              Disziplin <br/>
              <span className="text-white/40 italic">ist kein Zufall.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-white/70 text-lg md:text-xl font-light leading-relaxed mb-10 max-w-lg">
              Vergiss flüchtige Motivation. Dieses kompakte Praxis-E-Book liefert dir das exakte 30-Tage-System, um dein Fajr-Gebet und deinen Alltag <strong className="text-white font-medium">unbrechbar</strong> zu machen.
            </p>
          </FadeIn>

          <FadeIn delay={0.4} className="w-full sm:w-auto flex flex-col gap-5">
            <PremiumButton href={CHECKOUT_URL} icon={<Download size={18}/>}>
              Sofortigen Zugang Erhalten
            </PremiumButton>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/50 text-[10px] md:text-[11px] uppercase tracking-widest font-bold">
              <span className="flex items-center gap-1.5"><Check size={14} className="text-[#E5C07B]" /> Digital PDF</span>
              <span className="w-1 h-1 bg-white/20 rounded-full" />
              <span className="flex items-center gap-1.5"><Shield size={14} className="text-[#E5C07B]" /> 14,99€ Einmalig</span>
              <span className="w-1 h-1 bg-white/20 rounded-full hidden sm:block" />
              <span className="flex items-center gap-1.5 text-emerald-400 w-full sm:w-auto justify-center mt-2 sm:mt-0"><ShieldCheck size={14} /> 30-Tage Garantie</span>
            </div>
          </FadeIn>
        </div>

        <div className="order-1 lg:order-2 flex justify-center w-full relative">
          <FadeIn delay={0.3} className="w-full">
            <EBookMockup />
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

const TrustStrip = () => (
  <div className="bg-[#050505] border-y border-white/5 py-8 relative z-10">
    <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center opacity-60">
      <div className="flex flex-col items-center gap-2">
        <Users className="text-[#E5C07B]" size={24} />
        <span className="text-white text-xs uppercase tracking-widest font-bold">Hunderte Leser</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Star className="text-[#E5C07B]" size={24} />
        <span className="text-white text-xs uppercase tracking-widest font-bold">4.9/5 Bewertung</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <TrendingUp className="text-[#E5C07B]" size={24} />
        <span className="text-white text-xs uppercase tracking-widest font-bold">Sofort Resultate</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <ShieldCheck className="text-[#E5C07B]" size={24} />
        <span className="text-white text-xs uppercase tracking-widest font-bold">0% Risiko</span>
      </div>
    </div>
  </div>
);

const QuickProblem = () => {
  return (
    <section className="py-32 px-6 bg-[#020202] relative border-b border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-white font-serif text-4xl md:text-5xl tracking-tighter uppercase mb-4">Warum du <span className="text-white/40 italic">scheiterst</span></h2>
            <div className="w-12 h-1 bg-[#E5C07B]/50 mx-auto rounded-full" />
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <FadeIn delay={0.1} className="group bg-[#080808] border border-white/5 p-10 rounded-sm hover:bg-[#0a0a0a] transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-red-500/10 transition-colors duration-300">
              <AlertCircle size={24} className="text-white/40 group-hover:text-red-500 transition-colors duration-300" />
            </div>
            <h3 className="text-white font-serif text-xl uppercase tracking-widest mb-4">Der Schmerz</h3>
            <p className="text-white/50 text-sm leading-relaxed">Du speicherst unzählige Reminder, nimmst dir abends viel vor. Doch morgens siegt die Müdigkeit. Das toxische Gefühl des Versagens holt dich jeden Tag ein.</p>
          </FadeIn>
          
          <FadeIn delay={0.2} className="group bg-[#080808] border border-white/5 p-10 rounded-sm hover:bg-[#0a0a0a] transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-8 group-hover:bg-white/10 transition-colors duration-300">
              <Target size={24} className="text-white/40 group-hover:text-white transition-colors duration-300" />
            </div>
            <h3 className="text-white font-serif text-xl uppercase tracking-widest mb-4">Der Fehler</h3>
            <p className="text-white/50 text-sm leading-relaxed">Du verlässt dich komplett auf "Motivation". Aber Motivation ist eine Lüge, die nach 3 Tagen verschwindet. Ohne eiserne Systeme bleibst du machtlos.</p>
          </FadeIn>

          <FadeIn delay={0.3} className="group bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#E5C07B]/30 p-10 rounded-sm relative overflow-hidden shadow-[0_0_30px_rgba(229,192,123,0.05)] hover:-translate-y-1 transition-transform duration-300">
            <div className="absolute top-0 right-0 w-40 h-40 bg-[#E5C07B]/10 blur-3xl rounded-full group-hover:bg-[#E5C07B]/20 transition-colors duration-500" />
            <div className="w-12 h-12 rounded-full bg-[#E5C07B]/10 flex items-center justify-center mb-8 border border-[#E5C07B]/30 shadow-[0_0_15px_rgba(229,192,123,0.2)]">
              <BookOpen size={24} className="text-[#E5C07B]" />
            </div>
            <h3 className="text-[#E5C07B] font-serif text-xl uppercase tracking-widest mb-4">Das Protokoll</h3>
            <p className="text-white/80 text-sm leading-relaxed">Kein langes Gerede. Ein kompaktes, gnadenloses Praxis-Framework. Du liest es in 2 Stunden und baust eine Fundament für die Ewigkeit auf.</p>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

const InsideTheBook = () => {
  return (
    <section className="py-32 px-6 bg-[#050505] relative border-b border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_rgba(229,192,123,0.03),_transparent_50%)] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <FadeIn className="text-center mb-20">
          <h2 className="text-white font-serif text-4xl md:text-6xl tracking-tighter uppercase mb-6">
            Ein Blick ins <span className="text-[#E5C07B] italic">Innere</span>
          </h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto font-light">Was dich auf den digitalen Seiten dieses Handbuchs erwartet. Pure psychologische Praxis, null Füllmaterial.</p>
        </FadeIn>

        <div className="grid lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3 space-y-4 relative">
            <div className="absolute left-[38px] top-10 bottom-10 w-[1px] bg-white/5" />
            {CHAPTERS.map((chap, idx) => (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div className="group relative flex gap-8 items-start p-6 bg-[#080808] hover:bg-[#0a0a0a] border border-white/5 hover:border-[#E5C07B]/30 rounded-sm transition-all duration-300">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-[#E5C07B] transition-all duration-300 group-hover:h-full rounded-l-sm" />
                  <span className="relative z-10 bg-[#050505] text-[#E5C07B]/30 font-serif text-3xl italic group-hover:text-[#E5C07B] transition-colors w-12 h-12 flex items-center justify-center rounded-sm border border-white/5 group-hover:border-[#E5C07B]/30 shrink-0">
                    {chap.num}
                  </span>
                  <div>
                    <h4 className="text-white text-lg md:text-xl uppercase tracking-widest font-bold mb-2">{chap.title}</h4>
                    <p className="text-white/50 text-sm leading-relaxed">{chap.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
          
          <FadeIn delay={0.4} className="lg:col-span-2 hidden lg:flex justify-center relative perspective-1000">
            <div className="absolute inset-0 bg-[#E5C07B]/10 blur-[80px] rounded-full" />
            <motion.div 
              whileHover={{ rotateY: 0, rotateX: 0, scale: 1.05 }}
              className="w-[85%] aspect-[3/4] bg-gradient-to-br from-[#111] to-[#050505] border border-white/10 rounded-md shadow-[0_30px_60px_rgba(0,0,0,0.8)] relative p-10 flex flex-col justify-between transform rotate-y-[-10deg] rotate-x-[5deg] transition-all duration-500"
            >
              <div className="space-y-5">
                <div className="w-16 h-1 bg-[#E5C07B] rounded-full mb-10 shadow-[0_0_10px_rgba(229,192,123,0.5)]" />
                <div className="w-full h-4 bg-white/10 rounded-sm" />
                <div className="w-5/6 h-4 bg-white/10 rounded-sm" />
                <div className="w-4/6 h-4 bg-white/10 rounded-sm" />
                <div className="w-full h-4 bg-white/10 rounded-sm mt-8" />
                <div className="w-full h-4 bg-white/10 rounded-sm" />
              </div>
              <div className="flex flex-col gap-4 border-t border-white/10 pt-6">
                 <div className="flex items-center gap-3">
                   <Layers className="text-[#E5C07B]" size={16} />
                   <span className="text-white/40 text-xs uppercase tracking-widest font-bold">PDF Format</span>
                 </div>
                 <div className="flex items-center gap-3">
                   <Check className="text-emerald-500" size={16} />
                   <span className="text-white/40 text-xs uppercase tracking-widest font-bold">Handy & Tablet optimiert</span>
                 </div>
              </div>
            </motion.div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// 3.5 FAQ SECTION (Neu: Die Einwand-Zerstörer)
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-24 px-6 bg-[#020202] relative border-b border-white/5">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="text-white font-serif text-3xl md:text-5xl tracking-tighter uppercase mb-4">
            Noch <span className="text-white/40 italic">Zweifel?</span>
          </h2>
          <div className="w-12 h-1 bg-[#E5C07B]/50 mx-auto rounded-full" />
        </FadeIn>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <FadeIn key={idx} delay={idx * 0.1}>
                <div 
                  className={`border ${isOpen ? 'border-[#E5C07B]/30 bg-[#0a0a0a]' : 'border-white/5 bg-[#050505]'} hover:border-[#E5C07B]/20 rounded-sm transition-all duration-300 overflow-hidden cursor-pointer`}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                >
                  <div className="flex items-center justify-between p-6">
                    <h3 className={`text-sm md:text-base font-bold uppercase tracking-widest ${isOpen ? 'text-[#E5C07B]' : 'text-white'}`}>
                      {faq.q}
                    </h3>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className={isOpen ? 'text-[#E5C07B]' : 'text-white/30'}>
                      <ChevronDown size={20} />
                    </motion.div>
                  </div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 text-white/60 text-sm leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};


const PricingAndOffer = () => {
  return (
    <section id="checkout" className="py-32 px-6 bg-[#020202] relative flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(229,192,123,0.05),_transparent_60%)] pointer-events-none" />
      
      <FadeIn className="w-full max-w-5xl relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-white font-serif text-5xl md:text-7xl tracking-tighter uppercase mb-4 drop-shadow-lg">
            Sichere dir dein <span className="text-[#E5C07B] italic">Exemplar</span>
          </h2>
        </div>
        
        <div className="bg-gradient-to-b from-[#0a0a0a] to-[#020202] border border-[#E5C07B]/40 p-1 md:p-2 rounded-sm relative overflow-hidden shadow-[0_0_80px_rgba(229,192,123,0.1)]">
          <div className="bg-[#050505] w-full h-full p-8 md:p-16 rounded-sm relative">
            
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#E5C07B] text-black text-[10px] uppercase tracking-[0.3em] font-bold px-8 py-2 rounded-b-md shadow-[0_0_20px_rgba(229,192,123,0.5)]">
              Digitaler Sofortzugang
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mt-8">
              <div>
                <h3 className="text-white font-serif text-2xl md:text-3xl uppercase tracking-widest mb-8 border-b border-white/10 pb-4">Dein Arsenal</h3>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#E5C07B]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="text-[#E5C07B]" size={14} />
                    </div>
                    <div>
                      <span className="text-white font-bold block mb-1">Das Haupt-System (PDF E-Book)</span>
                      <span className="text-white/40 text-sm line-through font-serif italic">Wert: 49,00€</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#E5C07B]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="text-[#E5C07B]" size={14} />
                    </div>
                    <div>
                      <span className="text-white font-bold block mb-1">Bonus: Das Notfall-Protokoll</span>
                      <span className="text-white/40 text-sm line-through font-serif italic">Wert: 29,00€</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-[#E5C07B]/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Target className="text-[#E5C07B]" size={14} />
                    </div>
                    <div>
                      <span className="text-white font-bold block mb-1">Bonus: Dopamin-Detox Plan</span>
                      <span className="text-white/40 text-sm line-through font-serif italic">Wert: 19,00€</span>
                    </div>
                  </li>
                </ul>
                
                <div className="mt-10 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-sm">
                   <div className="flex items-center gap-3 text-emerald-400 font-bold mb-2 uppercase tracking-widest text-sm">
                     <ShieldCheck size={18} /> 30-Tage Geld-Zurück
                   </div>
                   <p className="text-white/60 text-xs leading-relaxed">
                     Setze das System für 30 Tage um. Wenn du keine Veränderung spürst, schreib mir eine Mail und ich erstatte dir jeden Cent. Du hast absolut null Risiko.
                   </p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center lg:border-l border-white/10 lg:pl-16 h-full">
                <span className="text-white/30 text-[11px] uppercase tracking-[0.3em] font-bold mb-4">Wahrer Gesamtwert: <span className="line-through">97,00€</span></span>
                <div className="flex items-start gap-2 mb-10">
                  <span className="text-white font-serif text-8xl md:text-[120px] tracking-tighter leading-none drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]">14</span>
                  <div className="flex flex-col mt-3 md:mt-5">
                    <span className="text-[#E5C07B] font-serif text-3xl md:text-5xl leading-none">,99€</span>
                    <span className="text-white/30 text-[10px] uppercase tracking-widest mt-2">Einmalige Zahlung</span>
                  </div>
                </div>
                
                <PremiumButton href={CHECKOUT_URL} className="w-full py-6 text-lg mb-6">
                  Jetzt Zugang Sichern
                </PremiumButton>
                
                <div className="flex items-center gap-6 text-white/30 text-[10px] uppercase tracking-widest font-bold">
                   <span className="flex items-center gap-2"><Lock size={12} /> SSL-Verschlüsselt</span>
                   <span className="flex items-center gap-2"><Download size={12} /> Direkt-Download</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

// --- LEGAL MODAL ---
const LegalModal = ({ activeSection, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    if (activeSection) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [activeSection, onClose]);

  if (!activeSection) return null;

  const content = {
    impressum: { title: "Impressum", body: <p>Usamah Sulaiman Shah<br/>Adresse wird vor Veröffentlichung ergänzt<br/>E-Mail: Shahmarketing@outlook.de<br/>USt-ID: DE353013127</p> },
    datenschutz: { title: "Datenschutzerklärung", body: <p>Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Daten werden vertraulich und nach DSGVO behandelt.</p> },
    widerruf: { title: "Widerrufsrecht", body: <p>Beim Kauf digitaler Inhalte erlischt das Widerrufsrecht vorzeitig mit Beginn des Downloads.</p> },
    agb: { title: "AGB", body: <p>Gegenstand ist der Verkauf des E-Books. Ausschließliche private Nutzung. Kommerzielle Weitergabe ist untersagt.</p> }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm" 
        onClick={onClose}
      >
        <motion.div 
          initial={{ y: 50, opacity: 0, scale: 0.95 }} animate={{ y: 0, opacity: 1, scale: 1 }} exit={{ y: 50, opacity: 0, scale: 0.95 }}
          className="bg-[#0a0a0a] border border-white/10 p-8 md:p-12 max-w-2xl w-full rounded-sm relative shadow-2xl" 
          onClick={e => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors cursor-pointer">
            <X size={24} />
          </button>
          <h2 className="text-2xl font-serif text-[#E5C07B] mb-6 uppercase tracking-widest">{content[activeSection]?.title}</h2>
          <div className="text-white/60 font-light leading-relaxed space-y-4">
            {content[activeSection]?.body}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  const [legalModal, setLegalModal] = useState(null);

  return (
    <div className="bg-[#020202] min-h-screen text-white font-sans antialiased selection:bg-[#E5C07B] selection:text-black overflow-x-hidden relative">
      {/* GLOBAL FONT OVERRIDE */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Inter:wght@300;400;500;600;700;900&display=swap');
        .font-serif { font-family: 'Cinzel', serif !important; }
        .font-sans { font-family: 'Inter', sans-serif !important; }
      `}} />

      <LiveSalesPopup />
      <StickyHeader />

      <nav className="absolute top-0 w-full z-50 flex justify-center md:justify-between items-center px-6 md:px-12 py-8 pointer-events-none">
        <div className="flex items-center gap-3">
          <BookOpen className="text-[#E5C07B]" size={24} />
          <div className="text-white font-serif tracking-[0.2em] uppercase text-sm md:text-base drop-shadow-md">
            Der Standhafte Muslim
          </div>
        </div>
      </nav>

      <main>
        <Hero />
        <TrustStrip />
        <QuickProblem />
        <InsideTheBook />
        <FAQSection />
        <PricingAndOffer />
        
        <footer className="py-24 px-6 bg-[#000] border-t border-white/5 relative z-10 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-10 opacity-50 hover:opacity-100 transition-opacity">
            <BookOpen className="text-white" size={20} />
            <div className="text-white font-serif tracking-[0.3em] uppercase text-xl text-center">
              Der Standhafte Muslim
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12 mb-12">
            {['impressum', 'datenschutz', 'widerruf', 'agb'].map(item => (
              <button key={item} onClick={() => setLegalModal(item)} className="text-white/30 text-[10px] tracking-[0.2em] uppercase font-bold hover:text-white transition-colors cursor-pointer">
                {item}
              </button>
            ))}
          </div>
          <div className="text-white/20 text-[10px] tracking-[0.2em] uppercase font-medium text-center flex flex-col gap-2">
            <span>&copy; {new Date().getFullYear()} Usamah Sulaiman Shah • Alle Rechte vorbehalten.</span>
            <span className="text-white/10 text-[8px]">Keine Meta/Facebook Endorsement. Diese Seite ist nicht Teil der Facebook-Website oder Facebook Inc.</span>
          </div>
        </footer>
      </main>
      
      <LegalModal activeSection={legalModal} onClose={() => setLegalModal(null)} />
    </div>
  );
}
