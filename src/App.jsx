import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Quote, BookOpen, Lock, Zap, Clock, X, ChevronRight, AlertTriangle, ArrowRight, Star
} from 'lucide-react';

// --- KONFIGURATION FÜR PRODUKTION ---
const CHECKOUT_URL = "https://payhip.com/b/sI9w2";
const PROFILE_IMAGE_URL = "https://raw.githubusercontent.com/Shahecom/website/main/public/profile.jpg";

// --- EASING FÜR KINOREIFE ANIMATIONEN ---
const ultraSmooth = [0.16, 1, 0.3, 1];
const slowFade = [0.22, 1, 0.36, 1];

// --- DATEN ---
const SOLUTION_STEPS = [
  { phase: "01", title: "Die Zerstörung", desc: "Wir reißen das falsche Fundament ab. Schluss mit der Illusion, dass morgen alles besser wird. Wir entlarven die Ausreden, die dich festhalten." },
  { phase: "02", title: "Das System", desc: "Motivation stirbt. Disziplin bleibt. Wir implementieren ein gnadenloses, aber alltagstaugliches System für deine Gebete und deine mentale Stärke." },
  { phase: "03", title: "Der Standard", desc: "Standhaftigkeit ist kein Zufall mehr, sondern deine feste Identität. Dein Iman wird immun gegen den Stress des modernen Alltags." }
];

const TESTIMONIALS = [
  { name: "Bilal K.", text: "Habe gerade die ersten Kapitel gelesen. Die Unterscheidung zwischen 'Träumer' und 'Kämpfer' hat mich direkt erwischt – genau da stecke ich fest. Der Start ist extrem vielversprechend.", role: "Unternehmer" },
  { name: "Aisha M.", text: "Endlich mal kein typisches Motivationsbuch. Habe bisher nur reingelesen, aber man merkt sofort, wie klar und logisch das System aufgebaut ist. Fühlt sich jetzt schon nach einem Gamechanger an.", role: "Studentin" },
  { name: "Tariq S.", text: "Bin erst bei Tag 3, aber das Buch regt extrem zum Nachdenken an. Usamah bringt die Dinge direkt auf den Punkt, ohne leere Versprechen. Die klare Struktur nimmt einem komplett die Überforderung.", role: "Angestellter" }
];

const FAQS = [
  { q: "Ist das nur ein weiteres Motivationsbuch?", a: "Nein. Motivation ist ein Gefühl und Gefühle verschwinden. Dieses Buch liefert dir ein hartes, klares 30-Tage-System. Es geht um Disziplin und Umsetzung, nicht um gute Gefühle." },
  { q: "Wann und wie erhalte ich Zugang?", a: "Sofort nach dem Kauf. Du bekommst einen direkten Download-Link für das E-Book (PDF) und kannst es auf dem Smartphone, Tablet oder Laptop lesen." },
  { q: "Ich habe wenig Zeit. Ist das für mich?", a: "Gerade dann. Das System ist dafür gebaut, in einem stressigen Alltag (Uni, Arbeit, Familie) zu funktionieren. Du brauchst keine Stunden pro Tag, sondern nur den Willen, die klaren Anweisungen umzusetzen." }
];

// --- SUB-COMPONENTS ---

const Noise = () => (
  <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.03] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const FadeIn = ({ children, delay = 0, className = "", direction = "up" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.4, delay, ease: slowFade }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Premium Button mit pulsierendem Glow für extreme Click-Rate
const SolidButton = ({ href, children, className = "", light = false }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`group relative inline-flex items-center justify-center px-8 py-5 overflow-hidden rounded-sm transition-all hover:scale-[1.02] active:scale-[0.98] duration-500 ease-out shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.3)] ${light ? 'bg-black text-white border border-white/20' : 'bg-white text-black'} ${className}`}
  >
    <div className={`absolute inset-0 ${light ? 'bg-white/10' : 'bg-neutral-200'} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`} />
    <span className="relative z-10 flex items-center gap-3 text-[11px] md:text-[13px] font-black uppercase tracking-[0.2em]">
      {children} <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-500" />
    </span>
  </a>
);

// Floating Sticky Checkout Bar
const StickyCheckout = () => {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsVisible(latest > 800);
    });
  }, [scrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.6, ease: ultraSmooth }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto bg-black/90 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-sm flex items-center justify-between shadow-[0_-20px_50px_rgba(0,0,0,0.9)] pointer-events-auto">
            <div className="hidden md:block pl-4">
              <p className="text-white text-sm font-serif uppercase tracking-widest mb-0.5">Der Standhafte Muslim</p>
              <div className="flex items-center gap-1 text-white/50">
                {[...Array(5)].map((_, i) => <Star key={i} size={10} className="fill-white/50" />)}
                <span className="text-[9px] uppercase tracking-[0.2em] font-medium ml-2">Das Original System</span>
              </div>
            </div>
            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end pr-2 md:pr-0">
              <div className="flex flex-col items-end pl-2 md:pl-0">
                <span className="text-white font-serif text-xl leading-none">14,99€</span>
                <span className="text-white/40 text-[10px] line-through decoration-white/40">25,00€</span>
              </div>
              <a 
                href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer"
                className="bg-white text-black px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-neutral-200 transition-colors whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.2)]"
              >
                Sofort Starten
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Ultra-Premium E-Book Mockup mit Studio-Beleuchtung & Glass-Shine
const PremiumMockup = () => (
  <div className="relative w-64 h-80 md:w-80 md:h-[420px] shrink-0 group perspective-1000 z-20 flex justify-center items-center">
    <motion.div 
      animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.9, 1.1, 0.9] }} 
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 bg-white/10 blur-[80px] rounded-full pointer-events-none"
    />
    
    <motion.div 
      animate={{ y: [0, -12, 0] }} 
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full h-full bg-gradient-to-br from-[#1c1c1c] via-[#080808] to-black border border-white/10 shadow-[40px_40px_80px_rgba(0,0,0,0.9),inset_1px_1px_0_rgba(255,255,255,0.05)] transform rotate-y-[-12deg] group-hover:rotate-y-[-5deg] group-hover:scale-[1.03] transition-all duration-1000 transform-style-3d flex flex-col justify-between p-8 md:p-10 rounded-r-md z-10 overflow-hidden"
    >
      {/* ANIMIERTER GLASS-SHINE EFFEKT */}
      <motion.div 
        animate={{ x: ["-150%", "250%"] }}
        transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
        className="absolute inset-0 w-[50%] h-[200%] -top-[50%] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 pointer-events-none z-30"
      />

      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none" />
      <div className="absolute left-0 top-0 bottom-0 w-5 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-l-md" />
      <div className="absolute left-5 top-0 bottom-0 w-[1px] bg-black/90" />

      <div className="relative z-10 pl-2 mt-2">
        <p className="text-white/30 text-[8px] md:text-[10px] uppercase tracking-[0.4em] mb-4">Das 30-Tage System</p>
        <h4 className="text-white font-serif text-3xl md:text-4xl tracking-tighter uppercase drop-shadow-2xl leading-[0.9]">
          Der<br/>standhafte<br/><span className="text-white/40">Muslim</span>
        </h4>
      </div>
      
      <div className="relative z-10 flex justify-end">
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] backdrop-blur-sm shadow-inner">
          <BookOpen size={14} className="text-white/50" />
        </div>
      </div>
    </motion.div>
    
    <motion.div 
      animate={{ scale: [1, 0.8, 1], opacity: [0.8, 0.4, 0.8] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black blur-xl transform rotate-y-[-12deg]" 
    />
  </div>
);

// HOCHWERTIGER HINTERGRUND-EFFEKT: "Struktur vs. Chaos"
const HeroBackground = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-40" />
    <motion.div
      animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.04),_transparent_60%)] blur-3xl"
    />
  </div>
);

// --- SECTIONS ---

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative h-screen min-h-[900px] flex flex-col justify-center items-center px-6 overflow-hidden bg-black">
      <HeroBackground />
      
      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-10">
        
        <FadeIn delay={0.1} className="mb-10 border border-white/10 rounded-full px-6 py-2 bg-white/[0.01] backdrop-blur-xl">
          <span className="text-white/60 uppercase text-[9px] md:text-[10px] tracking-[0.4em] font-medium flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            Das Praxis-E-Book
          </span>
        </FadeIn>
        
        <div className="flex flex-col items-center mb-10 w-full">
          {/* Reparierter "ü"-Abstand: y-Translation statt clipPath, pt-4 hinzugefügt und line-height angepasst */}
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, ease: ultraSmooth }}>
            <h1 className="text-white font-serif text-[13vw] md:text-[9vw] lg:text-[120px] leading-tight md:leading-none tracking-tighter uppercase mb-2 md:mb-0 pt-4">
              Die Lüge Der
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.15, ease: ultraSmooth }}>
            <h1 className="text-white/30 font-serif italic text-[14vw] md:text-[10vw] lg:text-[130px] leading-[0.8] tracking-tighter uppercase mb-12 drop-shadow-2xl">
              Motivation
            </h1>
          </motion.div>
        </div>

        <FadeIn delay={0.5} className="max-w-2xl mx-auto mb-16">
          <p className="text-white/60 text-base md:text-lg font-light leading-relaxed">
            Du wartest auf das Gefühl, endlich bereit zu sein. Doch Motivation stirbt nach 3 Tagen. <strong className="text-white font-medium">Standhaftigkeit erfordert ein System.</strong> Ein kompromissloser 30-Tage-Plan für deinen echten Iman.
          </p>
        </FadeIn>

        <FadeIn delay={0.7} className="flex flex-col items-center w-full">
          <SolidButton href={CHECKOUT_URL} className="w-full sm:w-auto">
            Sofortigen Zugang Sichern — 14,99€
          </SolidButton>
          
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-1.5 mb-1">
              {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-white/80 text-white/80 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />)}
            </div>
            <div className="flex items-center gap-4 text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">
              <span className="flex items-center gap-2"><Lock size={12} /> Einmalige Zahlung. Kein Abo.</span>
            </div>
          </div>
        </FadeIn>

      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/20"
      >
        <span className="text-[8px] uppercase tracking-[0.4em] font-bold">Die Wahrheit</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
};

// DER ABSTURZ (Teufelskreis-Animation)
const EndlessFallAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-30">
    <motion.div 
      animate={{ rotate: 360 }} 
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="absolute w-[300px] h-[300px] md:w-[600px] md:h-[600px] rounded-full border-t border-r border-red-600/30 border-l border-b border-transparent"
    />
    <motion.div 
      animate={{ rotate: -360 }} 
      transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
      className="absolute w-[400px] h-[400px] md:w-[800px] md:h-[800px] rounded-full border-[0.5px] border-dashed border-white/20"
    />
    
    <motion.div
      animate={{ 
        y: [-40, 80, 120, 80, -40], 
        rotate: [0, 45, 180, 270, 360],
        opacity: [0.2, 1, 0.5, 0.8, 0.2]
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute"
    >
      <div className="w-4 h-4 md:w-6 md:h-6 bg-white/80 rounded-full mb-1 mx-auto shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
      <div className="w-1 h-12 md:h-16 bg-gradient-to-b from-white/80 to-transparent mx-auto" />
    </motion.div>

    <motion.div 
      animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-[200px] h-[200px] bg-red-900/30 blur-[100px] rounded-full"
    />
  </div>
);

const Manifesto = () => {
  return (
    <section className="py-40 px-6 bg-[#020202] relative border-t border-white/5 overflow-hidden">
      <EndlessFallAnimation />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-24">
            <div className="w-16 h-[1px] bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
            <span className="text-red-500 text-[10px] uppercase tracking-[0.4em] font-bold">Der endlose Fall</span>
          </div>
        </FadeIn>
        
        <div className="space-y-24 md:space-y-32 text-center md:text-left">
          
          {/* PSYCHOLOGISCHES HIGHLIGHTING - Starke Kontraste */}
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight">
              <span className="text-white/40">Wir alle kennen den Kreislauf.</span> <br className="hidden md:block"/>
              <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">Du siehst ein Video, fühlst dich schuldig und bist hochmotiviert.</span> <br/>
              <span className="text-white/20 text-2xl md:text-4xl italic mt-4 block">Du planst alles perfekt.</span>
            </h2>
          </FadeIn>
          
          <FadeIn direction="up">
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight">
              <span className="text-white/40">Drei Tage später schlägt der Alltag zu. Du bist müde. Gestresst.</span> <br className="hidden md:block"/>
              <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">Das Gebet wird zur Last.<br className="hidden md:block"/>Du fällst in alte Muster zurück.</span>
            </h2>
          </FadeIn>
          
          <FadeIn direction="up">
            <div className="md:pl-12 md:border-l-2 md:border-red-600/50 py-4 relative">
              <div className="absolute left-0 top-0 w-[2px] h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] hidden md:block" />
              <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.2] tracking-tight">
                <span className="text-white/40 italic">Dein Problem ist nicht dein Glaube.</span><br/>
                <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Dein Problem ist die verdammte Illusion, dass Motivation ausreicht.</span>
              </h2>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

// PSYCHOLOGISCHER HOOK: Bento-Box Animationen für die Anti-Sell Sektion
const AntiSell = () => {
  return (
    <section className="py-32 px-6 bg-[#040404] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <FadeIn className="text-center mb-20">
          <h2 className="text-white font-serif text-5xl md:text-7xl tracking-tighter uppercase mb-6 leading-[0.9]">
            Schließe diese Seite, <br/><span className="text-white/30 italic">Wenn Du...</span>
          </h2>
          <p className="text-white/50 text-sm md:text-base font-light uppercase tracking-[0.2em]">Dieses System ist nicht für jeden.</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Card 1: Dopamin / Kurze Motivation */}
          <FadeIn delay={0.1}>
            <div className="bg-[#080808] border border-white/10 p-8 rounded-sm h-full flex flex-col items-center text-center group hover:border-white/20 transition-colors">
              <div className="h-32 w-full mb-6 relative flex items-end justify-center overflow-hidden">
                <motion.svg viewBox="0 0 100 100" className="w-full h-full stroke-white/20 group-hover:stroke-red-500 transition-colors duration-700" fill="none" strokeWidth="2">
                  <motion.path 
                    d="M 0 100 Q 20 80 40 20 T 60 90 T 100 95" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: [0, 1, 1, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />
                </motion.svg>
              </div>
              <h3 className="text-white font-serif text-xl uppercase tracking-widest mb-4">Nur den Kick suchst</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed">
                ...du nur ein weiteres Buch zum Durchblättern willst, um dir für 10 Minuten ein gutes Gewissen einzureden, bevor du aufgibst.
              </p>
            </div>
          </FadeIn>

          {/* Card 2: Ego / Ausreden */}
          <FadeIn delay={0.2}>
            <div className="bg-[#080808] border border-white/10 p-8 rounded-sm h-full flex flex-col items-center text-center group hover:border-white/20 transition-colors">
              <div className="h-32 w-full mb-6 relative flex items-center justify-center">
                <motion.div 
                  animate={{ scale: [1, 1.5, 0.8, 1], opacity: [0.5, 1, 0.2, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-16 h-16 rounded-full border border-white/40 group-hover:bg-white/10 transition-colors"
                />
                <motion.div 
                  animate={{ width: ["100%", "40%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute h-full border-l border-r border-white/20"
                />
              </div>
              <h3 className="text-white font-serif text-xl uppercase tracking-widest mb-4">Ausreden liebst</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed">
                ...du nicht bereit bist, deinem eigenen Ego ins Gesicht zu sehen und lieber dem "stressigen Alltag" die Schuld gibst.
              </p>
            </div>
          </FadeIn>

          {/* Card 3: Magischer Trick */}
          <FadeIn delay={0.3}>
            <div className="bg-[#080808] border border-white/10 p-8 rounded-sm h-full flex flex-col items-center text-center group hover:border-white/20 transition-colors">
              <div className="h-32 w-full mb-6 relative flex items-center justify-center">
                <motion.div 
                  animate={{ rotate: [0, 90, 180, 270, 360], opacity: [1, 0, 1, 0, 1], scale: [1, 2, 0, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "circIn" }}
                  className="w-12 h-12 flex items-center justify-center text-white/50 group-hover:text-white"
                >
                  <Zap size={32} />
                </motion.div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
              </div>
              <h3 className="text-white font-serif text-xl uppercase tracking-widest mb-4">An Magie glaubst</h3>
              <p className="text-white/50 text-sm font-light leading-relaxed">
                ...du denkst, es gäbe einen magischen Trick oder Shortcut ohne ehrliche, harte Arbeit an dir selbst.
              </p>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

const TheSystem = () => {
  return (
    <section className="py-40 px-6 bg-[#010101] relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_left,_rgba(255,255,255,0.02),_transparent_60%)] pointer-events-none blur-3xl" />
      
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start relative z-10 w-full">
            <FadeIn className="w-full flex justify-center lg:justify-start">
              <PremiumMockup />
            </FadeIn>
          </div>
          
          <div className="order-1 lg:order-2 relative z-10">
            <FadeIn>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-[1px] bg-white/20" />
                <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium">Die Lösung</span>
              </div>
              <h2 className="text-white font-serif text-5xl md:text-7xl tracking-tighter uppercase mb-16 leading-[0.9]">
                Kein Hype. <br/><span className="text-white/30 italic">Nur Struktur.</span>
              </h2>
            </FadeIn>

            <div className="space-y-12">
              {SOLUTION_STEPS.map((step, idx) => (
                <FadeIn key={idx} delay={idx * 0.1}>
                  <div className="flex gap-8 group">
                    <span className="text-white/20 font-serif text-4xl italic group-hover:text-white/60 transition-colors duration-500">{step.phase}</span>
                    <div className="pt-2">
                      <h4 className="text-white text-xl md:text-2xl uppercase tracking-widest mb-3 font-medium">{step.title}</h4>
                      <p className="text-white/40 text-sm md:text-base leading-relaxed font-light">{step.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const TestimonialGrid = () => {
  return (
    <section className="py-40 px-6 bg-[#030303] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="text-center mb-24">
          <h2 className="text-white font-serif text-4xl md:text-6xl tracking-tighter uppercase">Die ersten <span className="text-white/30 italic">Eindrücke</span></h2>
          <p className="text-white/40 mt-6 text-sm uppercase tracking-[0.2em]">Authentisches Feedback der allerersten Leser.</p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, idx) => (
            <FadeIn key={idx} delay={idx * 0.15}>
              <div className="h-full p-10 md:p-12 bg-[#060606] border border-white/5 hover:border-white/20 transition-colors duration-500 rounded-sm flex flex-col justify-between group shadow-2xl">
                <div>
                  <Quote size={24} className="text-white/10 mb-8 group-hover:text-white/30 transition-colors" />
                  <p className="text-white/70 text-sm md:text-base leading-relaxed font-light mb-12">"{t.text}"</p>
                </div>
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <span className="text-white font-bold text-xs uppercase tracking-widest">{t.name}</span>
                  <span className="text-white/30 text-[9px] uppercase tracking-[0.2em]">{t.role}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

// HIGH-END AUTOR SEKTION: Kreisförmig & Schwebend
const Author = () => {
  return (
    <section className="py-40 px-6 bg-[#010101] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-20 lg:gap-32">
        
        <FadeIn className="w-full md:w-5/12 flex justify-center">
          <div className="relative w-64 h-64 md:w-80 md:h-80 shrink-0 group">
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 border border-white/20 rounded-full border-dashed opacity-50 group-hover:opacity-100 transition-opacity duration-700"
            />
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full" />
            
            <motion.div 
              animate={{ y: [0, -12, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full rounded-full overflow-hidden border-[0.5px] border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10"
            >
               <img src={PROFILE_IMAGE_URL} alt="Usamah Sulaiman Shah" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#010101]/80 via-transparent to-transparent" />
            </motion.div>
          </div>
        </FadeIn>
        
        <div className="w-full md:w-7/12 text-center md:text-left relative z-20">
          <FadeIn>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-8">
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium">Der Autor</span>
            </div>
            <h2 className="text-white font-serif text-5xl md:text-7xl tracking-tighter uppercase mb-8">
              Usamah <br/><span className="text-white/30 italic">Shah</span>
            </h2>
            <p className="text-white/50 text-base md:text-lg leading-relaxed font-light mb-8 max-w-xl mx-auto md:mx-0">
              Jeden Tag besprechen wir auf Social Media die Dinge, die uns wirklich zurückhalten. Die bittere Realität: Ein Iman, der oft nur eine Wunschvorstellung bleibt, weil die Umsetzung im modernen Alltag scheitert.
            </p>
            <p className="text-white/50 text-base md:text-lg leading-relaxed font-light max-w-xl mx-auto md:mx-0">
              Dieses E-Book ist das Resultat. Keine Ansammlung von Zitaten, sondern das exakte Praxis-System, mit dem wir aufhören, Ausreden zu suchen, und anfangen, Standhaftigkeit zu leben.
            </p>
          </FadeIn>
        </div>

      </div>
    </section>
  );
};

// PSYCHOLOGISCHER HOOK: Extreme Conversion Copy
const Pricing = () => {
  return (
    <section id="checkout" className="py-40 px-6 bg-[#040404] relative border-t border-white/5 flex flex-col items-center justify-center min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02),_transparent_70%)] pointer-events-none blur-3xl" />
      
      <FadeIn className="w-full max-w-5xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-white font-serif text-5xl md:text-7xl lg:text-[100px] tracking-tighter uppercase mb-8 leading-[0.85]">
            Der Ultimative <br/><span className="text-white/30 italic">Filter</span>
          </h2>
          {/* Harte Psychologische Copy */}
          <div className="bg-white/5 border border-white/10 p-6 md:p-8 rounded-sm max-w-3xl mx-auto backdrop-blur-md">
            <p className="text-white/80 font-light text-base md:text-lg leading-relaxed">
              Dein Ego sucht genau in diesem Moment nach einer Ausrede, diese Seite zu schließen. Es will den einfachen Weg. 
              <strong className="text-white font-normal block mt-4 text-xl">14,99€ ist der Preis für eine Pizza.</strong> 
              <span className="block mt-2 text-white/50 text-sm">Du gibst dieses Geld in den nächsten 48 Stunden sowieso für kurzfristiges Dopamin aus. Investiere es hier in ein Fundament, das bleibt. Triff eine bewusste Entscheidung.</span>
            </p>
          </div>
        </div>

        <div className="relative p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-sm overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,1)] hover:shadow-[0_40px_120px_rgba(255,255,255,0.03)] transition-all duration-1000">
          <div className="bg-[#020202] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative">
            
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="flex-1 text-center md:text-left relative z-10 w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-white/10 bg-white/5 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold text-white/80 mb-8">
                <Zap size={12} className="text-white" /> Sofortiger Digital-Zugang
              </div>
              <h3 className="text-white text-4xl md:text-5xl font-serif uppercase tracking-tight mb-6 leading-[0.9]">Der Standhafte <br/> <span className="text-white/40">Muslim</span></h3>
              <p className="text-white/40 text-sm md:text-base font-light mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">
                Das komplette 30-Tage Framework als Premium PDF. Lesbar auf allen Geräten, jederzeit und überall.
              </p>
              
              <ul className="space-y-5 text-left inline-block md:block">
                {[
                  'Das kompromisslose 30-Tage System', 
                  'Alltagstaugliche Gebets-Strukturen', 
                  'Identitäts-Shift: Vom Träumer zum Macher'
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-5 text-white/80 text-xs md:text-sm uppercase tracking-widest font-medium">
                    <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Brutal Pricing */}
            <div className="w-full lg:w-[400px] shrink-0 bg-[#060606] border border-white/10 p-10 md:p-12 rounded-sm relative z-10 flex flex-col items-center">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] mb-6 font-bold">Einmalige Investition</p>
              
              <div className="flex items-end gap-4 mb-8">
                <span className="text-white font-serif text-7xl md:text-8xl tracking-tighter leading-none">14<span className="text-5xl md:text-6xl text-white/40">,99€</span></span>
                <span className="text-white/20 font-serif text-2xl md:text-3xl line-through decoration-white/20 pb-2 md:pb-3">25,00€</span>
              </div>
              
              <SolidButton href={CHECKOUT_URL} className="w-full py-6 text-[13px] mb-6">
                Entscheidung treffen
              </SolidButton>
              
              {/* Trust & Urgency Trigger */}
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="flex items-center gap-1.5 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} className="fill-white/80 text-white/80" />)}
                </div>
                <span className="text-white/60 text-[10px] uppercase tracking-[0.1em] font-medium text-center">
                  Heute entscheiden. Morgen ein anderer Mensch sein.
                </span>
                <div className="w-full h-[1px] bg-white/5 my-2" />
                <span className="flex items-center gap-2 text-white/30 text-[9px] uppercase tracking-[0.2em]">
                  <Lock size={12} /> SSL-Gesicherter Checkout
                </span>
              </div>
            </div>

          </div>
        </div>
      </FadeIn>
    </section>
  );
};

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <section className="py-40 px-6 relative z-10 border-t border-white/5 bg-[#020202]">
      <div className="max-w-4xl mx-auto">
        <FadeIn className="flex flex-col mb-16 text-left">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-[1px] bg-white/20" />
              <span className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-medium">Klarheit</span>
            </div>
            <h2 className="text-white font-serif text-4xl md:text-6xl uppercase tracking-tighter">Keine Fragen <br/><span className="text-white/30 italic">mehr offen</span></h2>
        </FadeIn>
        
        <div className="border-t border-white/10">
          {FAQS.map((faq, idx) => (
            <div key={`faq-${idx}`} className="border-b border-white/10">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full py-8 flex justify-between items-center text-left hover:text-white/80 transition-colors"
              >
                <div className="flex gap-6 items-start pr-8">
                    <span className="text-white/20 font-serif text-lg md:text-xl italic mt-0.5">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-white/90 font-serif text-lg md:text-2xl uppercase tracking-tight">{faq.q}</span>
                </div>
                <div className={`transition-transform duration-500 shrink-0 ${openIndex === idx ? 'rotate-180 text-white' : 'text-white/30'}`}>
                  <X size={20} className={openIndex === idx ? '' : 'rotate-45'} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: ultraSmooth }}
                    className="overflow-hidden"
                  >
                    <div className="pb-10 pl-12 md:pl-16 pr-8">
                      <p className="text-white/50 text-sm md:text-lg leading-relaxed font-light">{faq.a}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
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

  const content = {
    impressum: { title: "Impressum", body: <p>Usamah Sulaiman Shah<br/>Adresse wird vor Veröffentlichung ergänzt<br/>E-Mail: Shahmarketing@outlook.de<br/>USt-ID: DE353013127</p> },
    datenschutz: { title: "Datenschutzerklärung", body: <p>Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Daten werden vertraulich und nach DSGVO behandelt.</p> },
    widerruf: { title: "Widerrufsrecht", body: <p>Beim Kauf digitaler Inhalte erlischt das Widerrufsrecht vorzeitig mit Beginn des Downloads.</p> },
    agb: { title: "AGB", body: <p>Gegenstand ist der Verkauf des E-Books. Ausschließliche private Nutzung. Kommerzielle Weitergabe ist untersagt.</p> }
  };

  return (
    <AnimatePresence>
      {activeSection && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md cursor-pointer" onClick={onClose} />
          <motion.div initial={{ y: 20, scale: 0.98 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.98 }} className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 p-8 md:p-12 z-10 rounded-sm">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-white font-serif text-2xl uppercase tracking-tighter">{content[activeSection].title}</h2>
              <button onClick={onClose} className="text-white/40 hover:text-white"><X size={20} /></button>
            </div>
            <div className="text-white/50 text-sm font-light leading-relaxed space-y-4">
              {content[activeSection].body}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [legalModal, setLegalModal] = useState(null); 

  useEffect(() => {
    document.title = "Der standhafte Muslim | Das 30-Tage System";
  }, []);

  return (
    <div className="bg-black min-h-screen text-white font-sans antialiased selection:bg-white selection:text-black overflow-x-hidden">
      <Noise />
      <StickyCheckout />
      
      {/* Minimalistische Navbar */}
      <nav className="absolute top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-8 pointer-events-none">
        <div className="text-white font-serif tracking-[0.2em] uppercase text-xs md:text-sm drop-shadow-md">
          Der Standhafte Muslim
        </div>
        <div className="pointer-events-auto">
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-2 bg-black/50 px-4 py-2 rounded-full border border-white/5 backdrop-blur-sm">
            Zum E-Book <ArrowRight size={12} />
          </a>
        </div>
      </nav>

      <main>
        <Hero />
        <Manifesto />
        <AntiSell />
        <TheSystem />
        <TestimonialGrid />
        <Author />
        <FAQ />
        <Pricing />
        
        <footer className="py-24 px-6 bg-[#020202] border-t border-white/5 relative z-10 flex flex-col items-center">
          <div className="text-white font-serif tracking-[0.3em] uppercase text-xl md:text-2xl mb-12">
            Der Standhafte Muslim
          </div>
          <div className="flex flex-wrap justify-center gap-6 md:gap-10 mb-12">
            {['impressum', 'datenschutz', 'widerruf', 'agb'].map(item => (
              <button key={item} onClick={() => setLegalModal(item)} className="text-white/30 text-[9px] tracking-[0.2em] uppercase font-medium hover:text-white transition-colors">
                {item}
              </button>
            ))}
          </div>
          <div className="text-white/20 text-[9px] tracking-[0.2em] uppercase font-medium">
            &copy; {new Date().getFullYear()} Usamah Sulaiman Shah
          </div>
        </footer>
      </main>
      
      <LegalModal activeSection={legalModal} onClose={() => setLegalModal(null)} />
    </div>
  );
}
