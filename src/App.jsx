import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Quote, BookOpen, Lock, Check, Zap, Shield, Clock, X, ChevronRight, AlertTriangle, ArrowRight
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
    className={`group relative inline-flex items-center justify-center px-8 py-5 overflow-hidden rounded-sm transition-all hover:scale-[1.02] active:scale-[0.98] duration-500 ease-out shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.2)] ${light ? 'bg-black text-white border border-white/20' : 'bg-white text-black'} ${className}`}
  >
    <div className={`absolute inset-0 ${light ? 'bg-white/10' : 'bg-neutral-200'} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`} />
    <span className="relative z-10 flex items-center gap-3 text-[11px] md:text-[13px] font-black uppercase tracking-[0.2em]">
      {children} <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform duration-500" />
    </span>
  </a>
);

// Floating Sticky Checkout Bar (Appears after scrolling past hero)
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
          <div className="max-w-4xl mx-auto bg-black/80 backdrop-blur-xl border border-white/10 p-3 md:p-4 rounded-sm flex items-center justify-between shadow-[0_-20px_40px_rgba(0,0,0,0.8)] pointer-events-auto">
            <div className="hidden md:block pl-4">
              <p className="text-white text-sm font-serif uppercase tracking-widest mb-0.5">Der Standhafte Muslim</p>
              <p className="text-white/40 text-[9px] uppercase tracking-[0.2em] font-medium">Sofortiger Digital-Zugang</p>
            </div>
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="flex flex-col items-end md:mr-4 pl-2 md:pl-0">
                <span className="text-white font-serif text-xl leading-none">14,99€</span>
                <span className="text-white/30 text-[10px] line-through decoration-white/30">25,00€</span>
              </div>
              <a 
                href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer"
                className="bg-white text-black px-6 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm hover:bg-neutral-200 transition-colors whitespace-nowrap"
              >
                Jetzt Sichern
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Ultra-Premium E-Book Mockup mit Studio-Beleuchtung
const PremiumMockup = () => (
  <div className="relative w-64 h-80 md:w-80 md:h-[420px] shrink-0 group perspective-1000 z-20 flex justify-center items-center">
    {/* Studio Backlight / Aura */}
    <motion.div 
      animate={{ opacity: [0.4, 0.7, 0.4], scale: [0.9, 1.1, 0.9] }} 
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute inset-0 bg-white/10 blur-[80px] rounded-full pointer-events-none"
    />
    
    <motion.div 
      animate={{ y: [0, -15, 0] }} 
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#050505] to-black border border-white/10 shadow-[40px_40px_80px_rgba(0,0,0,0.9),inset_1px_1px_0_rgba(255,255,255,0.05)] transform rotate-y-[-12deg] group-hover:rotate-y-[-5deg] group-hover:scale-[1.03] transition-all duration-1000 transform-style-3d flex flex-col justify-between p-8 md:p-10 rounded-r-md z-10"
    >
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
        <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] backdrop-blur-sm">
          <BookOpen size={14} className="text-white/40" />
        </div>
      </div>
    </motion.div>
    
    {/* Floating Shadow */}
    <motion.div 
      animate={{ scale: [1, 0.8, 1], opacity: [0.8, 0.4, 0.8] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[80%] h-12 bg-black blur-xl transform rotate-y-[-12deg]" 
    />
  </div>
);

// --- SECTIONS ---

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative h-screen min-h-[850px] flex flex-col justify-center items-center px-6 overflow-hidden bg-black">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.03),_transparent_50%)] pointer-events-none blur-3xl" />
      
      <motion.div style={{ y, opacity }} className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center text-center mt-10">
        
        <FadeIn delay={0.1} className="mb-10 border border-white/10 rounded-full px-6 py-2 bg-white/[0.01] backdrop-blur-xl">
          <span className="text-white/60 uppercase text-[9px] md:text-[10px] tracking-[0.4em] font-medium flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            Das Praxis-E-Book
          </span>
        </FadeIn>
        
        <div className="flex flex-col items-center mb-10 w-full">
          <motion.div initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 1.5, ease: ultraSmooth }}>
            <h1 className="text-white font-serif text-[13vw] md:text-[9vw] lg:text-[120px] leading-[0.85] tracking-tighter uppercase mb-2 md:mb-0">
              Die Lüge Der
            </h1>
          </motion.div>
          <motion.div initial={{ clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ duration: 1.5, delay: 0.15, ease: ultraSmooth }}>
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
          <div className="mt-8 flex items-center gap-6 text-white/30 text-[10px] uppercase tracking-[0.2em] font-medium">
            <span className="flex items-center gap-2"><Lock size={12} /> Sicher über Payhip</span>
            <span className="hidden sm:inline-block w-1 h-1 bg-white/20 rounded-full" />
            <span className="hidden sm:inline-block">Digitales PDF</span>
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

// KINOREIFER TEUFELSKREIS: Atmosphärische Animation im Hintergrund
const ViciousCircleAnimation = () => (
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-40">
    <motion.div 
      animate={{ rotate: 360 }} 
      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      className="absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] border border-red-900/20 rounded-full border-dashed"
    />
    <motion.div 
      animate={{ rotate: -360 }} 
      transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      className="absolute w-[500px] h-[500px] md:w-[900px] md:h-[900px] border border-red-800/10 rounded-full"
    />
    <motion.div 
      animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      className="absolute w-[300px] h-[300px] bg-red-900/20 blur-[120px] rounded-full"
    />
  </div>
);

const Manifesto = () => {
  return (
    <section className="py-40 px-6 bg-[#020202] relative border-t border-white/5 overflow-hidden">
      <ViciousCircleAnimation />
      
      <div className="max-w-4xl mx-auto relative z-10">
        <FadeIn>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-24">
            <div className="w-16 h-[1px] bg-red-500/30" />
            <span className="text-red-500/60 text-[10px] uppercase tracking-[0.4em] font-bold">Der Teufelskreis</span>
          </div>
        </FadeIn>
        
        <div className="space-y-24 md:space-y-32 text-center md:text-left">
          <FadeIn>
            <h2 className="text-white font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              Wir alle kennen den Kreislauf. Du siehst ein Video, fühlst dich schuldig und bist hochmotiviert. <br className="hidden md:block"/>
              <span className="text-white/30">Du planst alles perfekt.</span>
            </h2>
          </FadeIn>
          <FadeIn direction="up">
            <h2 className="text-white/60 font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight">
              Drei Tage später schlägt der Alltag zu. Du bist müde. Gestresst. <br className="hidden md:block"/>
              <span className="text-white/30">Das Gebet wird zur Last. Die Routine bricht.</span>
            </h2>
          </FadeIn>
          <FadeIn direction="up">
            <div className="md:pl-12 md:border-l-2 md:border-red-900/30 py-4">
              <h2 className="text-white/40 font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.1] tracking-tight italic">
                Dein Problem ist nicht dein Glaube.<br/>
                <span className="text-red-500/80 not-italic">Dein Problem ist die Illusion, dass Motivation ausreicht.</span>
              </h2>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

// PSYCHOLOGISCHER HOOK: Anti-Sell (Exklusivität)
const AntiSell = () => {
  return (
    <section className="py-32 px-6 bg-[#040404] relative border-t border-white/5 overflow-hidden">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        
        <FadeIn className="bg-[#080808] border border-white/10 p-10 md:p-16 rounded-sm relative group order-2 md:order-1">
          <div className="absolute top-0 right-0 p-6 text-white/10 group-hover:text-white/20 transition-colors">
            <AlertTriangle size={32} />
          </div>
          <h3 className="text-white font-serif text-2xl md:text-3xl uppercase tracking-widest mb-8">Schließe diese Seite, wenn...</h3>
          <ul className="space-y-6">
            <li className="flex gap-4 items-start">
              <X size={20} className="text-white/30 shrink-0 mt-0.5" />
              <p className="text-white/50 text-sm md:text-base font-light leading-relaxed">...du nur ein weiteres Buch zum Durchblättern suchst, um dich für 10 Minuten gut zu fühlen.</p>
            </li>
            <li className="flex gap-4 items-start">
              <X size={20} className="text-white/30 shrink-0 mt-0.5" />
              <p className="text-white/50 text-sm md:text-base font-light leading-relaxed">...du Ausreden liebst und nicht bereit bist, deinem eigenen Ego ins Gesicht zu sehen.</p>
            </li>
            <li className="flex gap-4 items-start">
              <X size={20} className="text-white/30 shrink-0 mt-0.5" />
              <p className="text-white/50 text-sm md:text-base font-light leading-relaxed">...du glaubst, es gäbe einen magischen Trick ohne ehrliche Arbeit an dir selbst.</p>
            </li>
          </ul>
        </FadeIn>

        <FadeIn className="order-1 md:order-2">
          <h2 className="text-white font-serif text-5xl md:text-6xl tracking-tighter uppercase mb-8 leading-[0.9]">
            Nicht für <br/><span className="text-white/30 italic">Jeden.</span>
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed font-light mb-8">
            Dieses Buch ist kein Trostpflaster. Es ist ein Skalpell. Wir schneiden die Illusionen weg, die dich seit Jahren daran hindern, der Muslim zu sein, der du sein könntest.
          </p>
          <div className="flex items-center gap-4 text-white">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">Bist du bereit?</span>
          </div>
        </FadeIn>

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
            {/* Rotierender, edler Ring im Hintergrund */}
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-6 border border-white/20 rounded-full border-dashed opacity-50 group-hover:opacity-100 transition-opacity duration-700"
            />
            {/* Sanftes Glühen */}
            <div className="absolute inset-0 bg-white/5 blur-3xl rounded-full" />
            
            {/* Das eigentliche, kreisförmige & schwebende Bild */}
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

// PSYCHOLOGISCHER HOOK: Das lächerliche Angebot (Value Anchoring)
const Pricing = () => {
  return (
    <section id="checkout" className="py-40 px-6 bg-[#040404] relative border-t border-white/5 flex flex-col items-center justify-center min-h-screen">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.02),_transparent_70%)] pointer-events-none blur-3xl" />
      
      <FadeIn className="w-full max-w-5xl relative z-10">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-white font-serif text-5xl md:text-7xl lg:text-[100px] tracking-tighter uppercase mb-8 leading-[0.85]">
            Der Filter <br/><span className="text-white/30 italic">Deines Egos</span>
          </h2>
          <p className="text-white/60 font-light text-base md:text-xl max-w-2xl mx-auto leading-relaxed">
            14,99€. Das ist der Preis für eine Pizza. Wenn du nicht bereit bist, diesen Betrag in dein Fundament als Muslim zu investieren, dann schließe diese Seite jetzt. <strong className="text-white">Wenn doch: Willkommen im System.</strong>
          </p>
        </div>

        {/* Die "Black Titanium Card" */}
        <div className="relative p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent rounded-sm overflow-hidden group shadow-[0_40px_100px_rgba(0,0,0,1)] hover:shadow-[0_40px_120px_rgba(255,255,255,0.03)] transition-all duration-1000">
          <div className="bg-[#020202] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 relative">
            
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

            {/* Linke Seite: Bullets */}
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

            {/* Rechte Seite: Brutal Pricing */}
            <div className="w-full lg:w-[400px] shrink-0 bg-[#060606] border border-white/10 p-10 md:p-12 rounded-sm relative z-10 flex flex-col items-center">
              <p className="text-white/40 text-[10px] uppercase tracking-[0.4em] mb-6 font-bold">Einmalige Investition</p>
              
              <div className="flex items-end gap-4 mb-10">
                <span className="text-white font-serif text-7xl md:text-8xl tracking-tighter leading-none">14<span className="text-5xl md:text-6xl text-white/40">,99€</span></span>
                <span className="text-white/20 font-serif text-2xl md:text-3xl line-through decoration-white/20 pb-2 md:pb-3">25,00€</span>
              </div>
              
              <SolidButton href={CHECKOUT_URL} className="w-full py-6 text-[13px]">
                System jetzt sichern
              </SolidButton>
              
              <div className="mt-8 flex flex-col items-center gap-3 text-white/30 text-[9px] uppercase tracking-[0.2em]">
                <span className="flex items-center gap-2"><Lock size={12} /> Sicherer Checkout über Payhip</span>
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
        <div className="text-white font-serif tracking-[0.2em] uppercase text-xs md:text-sm">
          Der Standhafte Muslim
        </div>
        <div className="pointer-events-auto">
          <a href={CHECKOUT_URL} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-2">
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
