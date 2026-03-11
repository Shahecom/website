import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Plus, Minus, Star, Lock, 
  Quote, Loader2, Zap, BookOpen, Layers, Target, Smartphone, Eye, X
} from 'lucide-react';

// --- KONFIGURATION FÜR PRODUKTION ---
// Dein Payhip Checkout URL
const CHECKOUT_URL = "https://payhip.com/b/sI9w2";

// --- Easing für den "Expensive Feel" ---
const premiumEase = [0.16, 1, 0.3, 1];

// --- Menschliches, direktes Copywriting ---
const PROBLEMS = [
  {
    title: "Der Träumer",
    desc: "Du wartest auf das Gefühl, endlich bereit zu sein. Dein Alltag ist geprägt von dem Gedanken 'Morgen fange ich richtig an'. Dein Iman ist ein schöner Wunsch, hat aber im echten Leben keine Substanz.",
    status: "Die Illusion",
    visual: (
      <div className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-[2s] ease-out bg-[#020202]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(30,41,59,0.3),_transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
           <div className="w-32 h-32 md:w-48 md:h-48 border-[0.5px] border-white/5 bg-white/[0.01] backdrop-blur-3xl rounded-full flex items-center justify-center shadow-[inset_0_0_30px_rgba(255,255,255,0.01)]" />
           <div className="absolute w-1 h-1 bg-white/40 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
        </div>
      </div>
    ),
    detail: "Du baust auf Sand. Wenn der Alltag stressig wird, bricht dein Vorhaben sofort zusammen, weil das Fundament fehlt."
  },
  {
    title: "Der Kämpfer",
    desc: "Ein ewiges Auf und Ab. Heute bist du hochmotiviert, morgen fällst du wieder in alte Muster. Du bist extrem erschöpft, weil du versuchst, alles nur durch pure Willenskraft zu erzwingen.",
    status: "Die Erschöpfung",
    visual: (
      <div className="absolute inset-0 w-full h-full group-hover:scale-105 transition-transform duration-[2s] ease-out bg-[#020202]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(69,10,10,0.2),_transparent_70%)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex items-center justify-center">
           <div className="absolute w-[120%] h-[1px] bg-gradient-to-r from-transparent via-red-500/20 to-transparent rotate-45 group-hover:rotate-[225deg] transition-all duration-[3s] ease-out" />
           <div className="w-32 h-32 md:w-48 md:h-48 border-[0.5px] border-red-500/10 bg-black/40 backdrop-blur-3xl flex items-center justify-center shadow-[inset_0_0_30px_rgba(220,38,38,0.02)]" />
        </div>
      </div>
    ),
    detail: "Motivation ist ein Gefühl. Und Gefühle verschwinden. Wer sich auf Motivation verlässt, scheitert am Ende immer."
  }
];

const SOLUTION_STEPS = [
  { day: "01-10", title: "Das Fundament", desc: "Wir beenden die Selbstlüge. Wir identifizieren genau, was dich zurückhält und bauen ein klares Bewusstsein für dich als Muslim auf." },
  { day: "11-20", title: "Das System", desc: "Wir reden nicht mehr über Motivation. Wir bauen Gewohnheiten. Dein Iman wird in klare, einfache Strukturen für den Alltag gegossen." },
  { day: "21-30", title: "Der Standard", desc: "Der Wandel wird normal. Am Ende der 30 Tage ist das Gebet und deine Disziplin kein täglicher Kampf mehr, sondern dein fester Standard." }
];

const TESTIMONIALS = [
  { name: "Bilal K.", text: "Früher dachte ich immer, mir fehlt einfach die Disziplin. Usamahs Ansatz hat mir gezeigt, dass mein System komplett falsch war. Jetzt, nach den 30 Tagen, fällt mir das Gebet selbst an harten Arbeitstagen leicht.", highlight: "Fundament" },
  { name: "Aisha M.", text: "Ich war echt skeptisch. Aber die Kombination aus Islam und praktischer Struktur hat bei mir sofort Klick gemacht. Die 30 Tage vergingen schnell, und mein Iman fühlt sich nicht mehr an wie ein ständiger Kampf.", highlight: "Klarheit" },
  { name: "Tariq S.", text: "Verrückt, wie schnell sich Dinge ändern, wenn man aufhört, sich selbst Ausreden zu erzählen. Die 30 Tage waren intensiv, aber ich fühle mich jetzt mental so extrem stabil. Eines der ehrlichsten E-Books auf dem Markt.", highlight: "Fokus" }
];

const FAQS = [
  { 
    q: "Ist das nur Motivation oder ein echtes System?", 
    a: "Nein. Dieses E-Book basiert nicht auf Motivation, sondern auf Struktur.\n\nDu bekommst ein klares 30-Tage-System, das dir hilft, dein Gebet und deinen Iman Schritt für Schritt stabiler zu machen – auch an Tagen, an denen du keine Motivation fühlst." 
  },
  { 
    q: "Was unterscheidet dieses Buch von normalen islamischen Büchern?", 
    a: "Viele Bücher geben Wissen.\nDieses E-Book gibt dir eine Struktur.\n\nStatt nur Inspiration bekommst du ein praktisches System, das dir zeigt, wie du deinen Iman im Alltag wirklich stabilisieren kannst." 
  },
  { 
    q: "Was, wenn ich einen Tag nicht durchhalte?", 
    a: "Das wird passieren – und genau dafür gibt es Strategien im Buch.\n\nZiel ist nicht Perfektion, sondern Standhaftigkeit. Du lernst, wie du nach Rückfällen sofort wieder aufstehst und weitermachst." 
  },
  { 
    q: "Wann kann ich anfangen?", 
    a: "Sofort.\n\nNach dem Kauf erhältst du direkten Zugriff auf das digitale E-Book und kannst direkt mit Tag 1 starten." 
  },
  { 
    q: "Brauche ich viel Zeit pro Tag?", 
    a: "Nein.\n\nDas System ist bewusst für den Alltag aufgebaut. Die Schritte sind kurz, praktisch und so gestaltet, dass du sie auch neben Arbeit, Studium oder Schule umsetzen kannst." 
  }
];

// --- Sub-Components ---

const NoiseOverlay = () => (
  <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.015] mix-blend-overlay">
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  </div>
);

const Spotlight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setOpacity(1);
    };
    const handleMouseLeave = () => setOpacity(0);

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 hidden md:block"
      animate={{ opacity }}
      style={{
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.03), transparent 40%)`
      }}
    />
  );
};

const FadeIn = ({ children, delay = 0, direction = "up", className = "", fullWidth = false }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: direction === "up" ? 40 : 0, scale: direction === "scale" ? 0.98 : 1 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.2, delay: delay, ease: premiumEase }}
      className={`${className} ${fullWidth ? 'w-full' : ''}`}
    >
      {children}
    </motion.div>
  );
};

// --- TODSICHERE VARIANTE FÜR EXTERNE LINKS ---
const MagneticButton = ({ children, className, onClick, disabled, href, target }) => {
  const content = (
    <>
      <span className="relative z-10 flex items-center justify-center gap-4">{children}</span>
      {!disabled && <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />}
    </>
  );

  // Wenn ein Link (href) vorhanden ist:
  if (href && !disabled) {
    const linkTarget = target || "_blank";
    
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.4, ease: premiumEase }}
        className={`relative overflow-hidden group inline-flex items-center justify-center cursor-pointer ${className}`}
      >
        {/* DER TRICK: Ein nativer, absolut positionierter HTML-Link über allem. 
            So fängt der Browser den Klick ganz normal ab, ohne React-Verzögerung. */}
        <a 
          href={href} 
          target={linkTarget} 
          rel="noopener noreferrer"
          className="absolute inset-0 w-full h-full z-50"
          aria-label="Checkout"
        />
        {content}
      </motion.div>
    );
  }

  // Für normale Buttons (wie den "Zum E-Book" Scroll-Button)
  return (
    <motion.button 
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      transition={{ duration: 0.4, ease: premiumEase }}
      className={`relative overflow-hidden group inline-flex items-center justify-center cursor-pointer ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {content}
    </motion.button>
  );
};

const EBookMockup = ({ size = "normal" }) => {
  const dimensions = size === "small" 
    ? "w-32 h-44 lg:w-40 lg:h-56" 
    : "w-56 h-72 lg:w-[280px] lg:h-[400px]"; 
    
  const padding = size === "small" ? "p-4 lg:p-5" : "p-6 lg:p-8";
  const titleSize = size === "small" ? "text-[12px] lg:text-base leading-[1.1]" : "text-xl lg:text-3xl leading-[1.0]";
  const subtitleSize = size === "small" ? "text-[5px] lg:text-[7px]" : "text-[7px] lg:text-[9px]";
  const iconSize = size === "small" ? 10 : 14;
  const iconContainerSize = size === "small" ? "w-6 h-6" : "w-8 h-8";
  const spineOffset = size === "small" ? "pl-2 lg:pl-3" : "pl-3 lg:pl-4";

  return (
    <div className={`relative shrink-0 ${dimensions} group-hover:scale-[1.03] transition-transform duration-1000 [perspective:1200px] z-20`}>
      <div className={`w-full h-full relative bg-gradient-to-br from-[#1a1a1a] via-[#050505] to-black border border-white/10 rounded-r-md rounded-l-sm shadow-[25px_25px_50px_rgba(0,0,0,0.9),inset_1px_1px_0_rgba(255,255,255,0.1)] [transform:rotateY(-15deg)] group-hover:[transform:rotateY(-8deg)] transition-transform duration-1000 [transform-style:preserve-3d] flex flex-col justify-between ${padding} overflow-hidden`}>
        
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06] pointer-events-none" />

        <div className="absolute left-0 top-0 bottom-0 w-3 lg:w-4 bg-gradient-to-r from-white/10 via-white/5 to-transparent rounded-l-sm opacity-80" />
        <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/20 opacity-50" />
        <div className="absolute left-3 lg:left-4 top-0 bottom-0 w-[1px] bg-black/80" />
        
        <div className={`${spineOffset} mt-1 lg:mt-0 relative z-10`}>
           <p className={`text-white/30 ${subtitleSize} uppercase tracking-[0.4em] mb-2 lg:mb-4`}>Premium E-Book</p>
           <h4 className={`text-white font-serif ${titleSize} tracking-tighter uppercase drop-shadow-md break-words`}>Der<br/>standhafte<br/><span className="text-white/40">Muslim</span></h4>
        </div>
        <div className="flex justify-end mb-1 lg:mb-0 relative z-10">
           <div className={`${iconContainerSize} rounded-full border-[0.5px] border-white/20 flex items-center justify-center bg-white/[0.02] shadow-inner`}>
             <BookOpen size={iconSize} className="text-white/40" />
           </div>
        </div>
      </div>
      <div className="absolute -bottom-4 lg:-bottom-6 left-4 right-0 h-6 lg:h-8 bg-black/90 blur-xl [transform:rotateY(-15deg)] pointer-events-none" />
    </div>
  );
};

// --- Legal Modal Component ---
const LegalModal = ({ activeSection, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
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
    impressum: {
      title: "Impressum",
      body: (
         <div className="text-white/50 text-sm font-light leading-relaxed space-y-4">
            <p><strong>Angaben gemäß § 5 TMG:</strong></p>
            <p>Usamah Sulaiman Shah<br/>
            Adresse wird vor Veröffentlichung ergänzt</p>
            <p><strong>Kontakt:</strong><br/>
            E-Mail: Shahmarketing@outlook.de</p>
            <p><strong>Umsatzsteuer-ID:</strong><br/>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br/>
            DE353013127</p>
            <p className="text-white/30 italic text-xs mt-4">* Hinweis: Die Adresse wird vor dem finalen Launch ergänzt.</p>
         </div>
      )
    },
    datenschutz: {
      title: "Datenschutzerklärung",
      body: (
         <div className="text-white/50 text-sm font-light leading-relaxed space-y-4">
            <p>Wir nehmen den Schutz deiner persönlichen Daten sehr ernst. Wir behandeln deine personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
            <p><strong>1. Websitebetrieb & Hosting:</strong><br/>
            Für die Bereitstellung dieser Website nutzen wir Hosting-Dienste, die notwendige Zugriffsdaten (wie IP-Adressen) verarbeiten, um die Sicherheit und Stabilität der Seite zu gewährleisten.</p>
            <p><strong>2. Analyse-Tools:</strong><br/>
            Wir setzen möglicherweise datenschutzkonforme Analyse-Tools ein, um das Nutzererlebnis zu optimieren. Daten werden hierbei im Regelfall anonymisiert verarbeitet.</p>
            <p><strong>3. Kontakt per E-Mail:</strong><br/>
            Wenn du uns per E-Mail kontaktierst, werden deine Angaben inklusive der von dir dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne deine Einwilligung weiter.</p>
         </div>
      )
    },
    widerruf: {
      title: "Widerrufsbelehrung",
      body: (
         <div className="text-white/50 text-sm font-light leading-relaxed space-y-4">
            <p><strong>Widerrufsrecht bei digitalen Inhalten:</strong></p>
            <p>Beim Kauf dieses digitalen E-Books erlischt dein Widerrufsrecht, da es sich um digitale Inhalte handelt, die nicht auf einem körperlichen Datenträger geliefert werden.</p>
            <p>Mit dem Abschluss des Kaufs stimmst du ausdrücklich zu, dass mit der Ausführung des Vertrags vor Ablauf der Widerrufsfrist begonnen wird, und nimmst zur Kenntnis, dass du durch diese Zustimmung mit Beginn der Ausführung des Vertrags dein Widerrufsrecht verlierst (Download/Bereitstellung des E-Books).</p>
         </div>
      )
    },
    agb: {
      title: "Allgemeine Geschäftsbedingungen",
      body: (
         <div className="text-white/50 text-sm font-light leading-relaxed space-y-4">
            <p><strong>1. Vertragsgegenstand:</strong><br/>
            Gegenstand des Vertrages ist der Verkauf eines digitalen Produkts (PDF E-Book "Der standhafte Muslim").</p>
            <p><strong>2. Lieferung:</strong><br/>
            Die Lieferung des E-Books erfolgt unmittelbar nach erfolgreicher Zahlung per digitalem Download oder per E-Mail-Bereitstellung.</p>
            <p><strong>3. Nutzungsrechte & Urheberrecht:</strong><br/>
            Das angebotene E-Book ist urheberrechtlich geschützt. Der Kauf berechtigt dich ausschließlich zur privaten Nutzung. Jede Form der kommerziellen Nutzung, Vervielfältigung, Verbreitung, Weitergabe an Dritte oder öffentliche Zugänglichmachung ist strikt untersagt und wird rechtlich verfolgt.</p>
         </div>
      )
    }
  };

  return (
    <AnimatePresence>
      {activeSection && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
        >
          {/* Abdunkelnder Hintergrund (Backdrop) */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
            onClick={onClose}
          />
          
          {/* Modal Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: premiumEase }}
            className="relative w-full max-w-2xl max-h-[85vh] bg-[#050505] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] rounded-sm flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 md:p-8 border-b border-white/5 shrink-0">
              <h2 className="text-white font-serif text-2xl md:text-3xl uppercase tracking-tighter">
                {content[activeSection].title}
              </h2>
              <button 
                onClick={onClose}
                className="text-white/40 hover:text-white transition-colors p-2 -mr-2 rounded-full hover:bg-white/5"
              >
                <X size={20} strokeWidth={1.5} />
              </button>
            </div>
            
            {/* Content (Scrollbar) */}
            <div className="p-6 md:p-8 overflow-y-auto">
              {content[activeSection].body}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main Sections ---

const Intro = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.5, ease: premiumEase }}
    className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
  >
    <div className="text-center overflow-hidden">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 1.2, ease: premiumEase }}
        className="flex flex-col items-center"
      >
        <span className="text-white font-serif text-3xl md:text-5xl tracking-[0.3em] uppercase mb-4">Das E-Book</span>
        <div className="h-px w-12 bg-white/20 mb-4" />
        <span className="text-white/30 text-[9px] md:text-[11px] tracking-[0.8em] uppercase">Der standhafte Muslim</span>
      </motion.div>
    </div>
  </motion.div>
);

const Navigation = () => {
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.7]);
  const blur = useTransform(scrollY, [0, 100], [0, 20]);

  // Funktion zum sanften Scrollen zur Call-to-Action
  const scrollToPricing = () => {
    const pricingElement = document.getElementById('pricing');
    if (pricingElement) {
      pricingElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav 
      style={{ backgroundColor: `rgba(0,0,0,${bgOpacity})`, backdropFilter: `blur(${blur}px)` }}
      className="fixed top-0 w-full z-50 flex justify-between items-center px-6 py-6 md:px-12 transition-all duration-500 border-b border-white/[0.02]"
    >
      <div className="flex flex-col">
        <span className="text-white font-serif text-lg tracking-[0.2em] uppercase leading-none">Der Standhafte</span>
        <span className="text-white/30 text-[8px] tracking-[0.4em] uppercase mt-2">Muslim</span>
      </div>
     <MagneticButton
      onClick={scrollToPricing} // <--- Hier klicken = Scrollen
      className="bg-white text-black px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-sm z-50"
    >
      Zum E-Book
    </MagneticButton>
    </motion.nav>
  );
};

const Hero = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section className="relative h-[100vh] min-h-[600px] flex flex-col justify-center items-center px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(255,255,255,0.03),_transparent_50%)] pointer-events-none" />
      <motion.div style={{ y: y1, opacity }} className="relative z-10 w-full max-w-screen-2xl mx-auto flex flex-col items-center justify-center mt-20">
        
        <FadeIn delay={0.2} className="overflow-hidden mb-12 border border-white/10 rounded-full px-6 py-2 bg-white/[0.01] backdrop-blur-md shadow-[0_0_30px_rgba(255,255,255,0.02)]">
          <span className="text-white/60 uppercase text-[9px] tracking-[0.4em] font-medium flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-[pulse_2s_ease-in-out_infinite]" />
            Das Premium E-Book
          </span>
        </FadeIn>
        
        <div className="overflow-hidden w-full flex flex-col items-center text-center">
          <motion.h1 
            initial={{ y: "100%", opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: premiumEase, delay: 0.3 }}
            className="text-white font-serif text-[13vw] md:text-[11vw] leading-[0.8] tracking-tighter uppercase mb-2"
          >
            Fundament
          </motion.h1>
          <motion.h1 
            initial={{ y: "100%", opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: premiumEase, delay: 0.4 }}
            className="text-white/30 font-serif italic text-[11vw] md:text-[9vw] leading-[0.8] tracking-tighter uppercase mb-14 drop-shadow-2xl"
          >
            Aus Stahl
          </motion.h1>
        </div>

        <FadeIn delay={1} className="w-full max-w-2xl text-center">
          <p className="text-white/90 text-sm md:text-base uppercase tracking-[0.2em] leading-loose font-medium mb-3">
            Der standhafte Muslim
          </p>
          <p className="text-white/40 text-xs md:text-sm uppercase tracking-[0.15em] leading-relaxed font-light">
            30 Tage Transformation zu deinem echten Iman.<br/>
            Ein klarer Weg zu Standhaftigkeit, innerer Stärke und einem Leben mit Richtung.
          </p>
        </FadeIn>

        <motion.div 
          initial={{ opacity: 0, height: 0 }} 
          animate={{ opacity: 0.5, height: "3rem" }} 
          transition={{ delay: 1.8, duration: 1.5, ease: premiumEase }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hidden md:flex"
        >
          <div className="w-[1px] h-full bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

const InfiniteTicker = () => {
  return (
    <div className="w-full border-y border-white/5 bg-[#030303] py-4 overflow-hidden flex whitespace-nowrap relative z-20">
      <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-[#030303] to-transparent z-10" />
      <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-[#030303] to-transparent z-10" />
      
      <motion.div 
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
        className="flex gap-16 items-center text-white/20 text-[10px] uppercase tracking-[0.3em] font-medium"
      >
        <span>Von Usamah Sulaiman Shah</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>Das E-Book</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>Ehrliche Ergebnisse</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>Kein Hype. Nur System.</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>Von Usamah Sulaiman Shah</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>Das E-Book</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>Ehrliche Ergebnisse</span>
        <span className="w-1 h-1 bg-white/20 rounded-full" />
        <span>Kein Hype. Nur System.</span>
      </motion.div>
    </div>
  );
};

const ProblemSection = () => {
  return (
    <section className="relative bg-[#020202] z-20">
      <div className="max-w-[1400px] mx-auto px-6 py-32 md:py-0 md:flex">
        
        <div className="md:w-5/12 md:h-screen md:sticky top-0 flex flex-col justify-center py-20 pr-10">
          <FadeIn>
            <span className="text-white/20 font-serif text-xl italic mb-6 block">01 / Die Realität</span>
            <h2 className="text-white font-serif text-5xl md:text-6xl uppercase tracking-tighter mb-8 leading-[0.9]">
              Die harte <br/> <span className="text-white/30">Wahrheit</span>
            </h2>
            <p className="text-white/50 text-sm uppercase tracking-[0.15em] font-light leading-relaxed mb-12 max-w-sm">
              Solange du dir selbst etwas vormachst, ändert sich nichts. Erkenne dein Problem, bevor wir es lösen.
            </p>
          </FadeIn>
        </div>

        <div className="md:w-7/12 flex flex-col gap-32 md:py-40">
          {PROBLEMS.map((p, i) => (
            <FadeIn key={i} delay={0.1} direction="up" fullWidth>
              <div className="group flex flex-col w-full">
                <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-[#050505] border border-white/5 overflow-hidden mb-10 rounded-sm">
                  {p.visual}
                  <div className="absolute top-6 left-6 z-20">
                     <div className="text-white/60 text-[9px] font-medium uppercase tracking-[0.3em] bg-black/40 backdrop-blur-md border border-white/5 px-4 py-2 rounded-sm">
                       {p.status}
                     </div>
                  </div>
                </div>
                
                <h3 className="text-white font-serif text-3xl md:text-4xl mb-4 uppercase tracking-tight">{p.title}</h3>
                <p className="text-white/60 text-base md:text-lg leading-relaxed font-light mb-8 max-w-xl">"{p.desc}"</p>
                
                <div className="p-6 border-l border-white/20 max-w-xl">
                  <p className="text-white/40 text-xs uppercase tracking-[0.15em] leading-relaxed font-medium">
                    {p.detail}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
};

const ProductPreviewCompact = () => {
  return (
    <section className="py-32 px-6 relative z-10 border-t border-white/5 bg-[#030303] flex justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.015),_transparent_60%)] pointer-events-none" />
      <FadeIn className="w-full max-w-4xl relative z-10">
        <div className="relative bg-[#050505] border border-white/10 p-8 md:p-12 text-left rounded-sm group hover:border-white/20 transition-colors duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            
            <div className="shrink-0 z-20">
              <EBookMockup size="small" />
            </div>
            
            <div className="flex-1 text-center md:text-left overflow-hidden">
              <h3 className="text-white text-2xl md:text-3xl font-serif mb-4 tracking-tight uppercase">Der standhafte <span className="text-white/40">Muslim</span></h3>
              <p className="text-white/50 text-sm font-light leading-relaxed mb-8 max-w-md mx-auto md:mx-0">
                30 Tage Transformation zu deinem echten Iman. Ein klarer Weg zu Standhaftigkeit, innerer Stärke und einem Leben mit Richtung.
              </p>
              
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="text-white text-4xl sm:text-5xl font-serif tracking-tighter whitespace-nowrap">12<span className="text-2xl sm:text-3xl text-white/40">,99€</span></div>
                  <div className="text-white/20 text-sm sm:text-base line-through decoration-white/10 decoration-1 tracking-wider mt-1 sm:mt-2 whitespace-nowrap">19,99€</div>
                </div>
                <MagneticButton 
                  href={CHECKOUT_URL}
                  target="_blank"
                  className="w-full md:w-auto bg-white text-black px-8 py-4 font-black uppercase tracking-[0.2em] text-[10px] rounded-sm transition-all shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] whitespace-nowrap"
                >
                  JETZT FÜR 12,99€ SICHERN
                </MagneticButton>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
};

const SolutionSection = () => {
  return (
    <section className="py-40 px-6 relative z-10 border-t border-white/5 bg-[#040404] overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-white/10 pb-12">
          <FadeIn className="max-w-2xl">
            <span className="text-white/20 font-serif text-xl italic mb-6 block">02 / Der Prozess</span>
            <h2 className="text-white font-serif text-4xl md:text-7xl uppercase tracking-tighter leading-[0.9]">
              Aufbau in <br/> <span className="text-white/30">3 Phasen</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.2} className="mt-10 md:mt-0 text-left md:text-right">
            <p className="text-white/40 text-xs uppercase tracking-[0.2em] font-light max-w-xs leading-relaxed">
              Kein Zufall. Reine Systematik für 30 Tage.
            </p>
          </FadeIn>
        </div>
        
        <div className="grid md:grid-cols-3 gap-px bg-white/5">
          {SOLUTION_STEPS.map((s, i) => (
            <FadeIn key={i} delay={i * 0.15} direction="up" className="bg-[#040404] h-full">
              <div className="group relative h-full flex flex-col p-10 md:p-14 hover:bg-white/[0.01] transition-colors duration-700">
                 <div className="text-white/20 font-serif text-5xl mb-12 italic opacity-50 group-hover:opacity-100 transition-opacity">
                   {(i + 1).toString().padStart(2, '0')}
                 </div>
                 
                 <div className="relative z-10 flex-grow">
                   <div className="text-white/40 text-[9px] uppercase tracking-[0.3em] mb-4">
                     Tag {s.day}
                   </div>
                   <h4 className="text-white font-serif text-2xl uppercase tracking-tight mb-6">{s.title}</h4>
                   <p className="text-white/50 text-sm leading-relaxed font-light">{s.desc}</p>
                 </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-40 px-6 relative z-10 border-t border-white/5 bg-[#010101]">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn className="mb-24">
          <span className="text-white/20 font-serif text-xl italic mb-6 block">03 / Die Beweise</span>
          <h2 className="text-white font-serif text-5xl md:text-7xl uppercase tracking-tighter">Klare <br/><span className="text-white/30">Ergebnisse</span></h2>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, idx) => (
            <FadeIn key={`testimonial-${idx}`} delay={idx * 0.2} direction="up" className="h-full">
              <div className="relative h-full p-10 md:p-12 border-[0.5px] border-white/10 bg-gradient-to-br from-[#080808] to-[#020202] hover:border-white/30 transition-all duration-1000 flex flex-col justify-between rounded-sm overflow-hidden group shadow-[0_0_40px_rgba(0,0,0,0.5)] hover:shadow-[0_0_60px_rgba(255,255,255,0.02)]">
                <Quote size={160} className="absolute -top-10 -left-10 text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-1000 -rotate-12 pointer-events-none" />
                
                <div className="relative z-10">
                  <div className="flex gap-1.5 mb-10">
                    {[...Array(5)].map((_, i) => <Star key={`star-${i}`} size={12} className="fill-white/80 text-white/80" />)}
                  </div>
                  <p className="text-white/80 text-base md:text-lg leading-relaxed font-light mb-12">"{t.text}"</p>
                </div>
                
                <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-8 mt-auto">
                  <div>
                    <p className="text-white font-bold text-xs uppercase tracking-[0.2em] mb-1">{t.name}</p>
                  </div>
                  <span className="text-[9px] text-white/40 border border-white/10 px-3 py-1.5 uppercase tracking-[0.2em] bg-white/[0.02] rounded-sm backdrop-blur-sm group-hover:bg-white/[0.05] transition-colors">{t.highlight}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const FeaturesSection = () => {
  const features = [
    { title: "30-Tage System", desc: "Ein glasklarer, kompromissloser Plan ohne Wenn und Aber.", icon: <BookOpen size={24} strokeWidth={1} /> },
    { title: "Alltags-Struktur", desc: "Praktische Routinen für echte Standhaftigkeit im echten Leben.", icon: <Layers size={24} strokeWidth={1} /> },
    { title: "Iman Fokus", desc: "Islamische Tiefe gepaart mit hochmoderner Disziplin.", icon: <Target size={24} strokeWidth={1} /> },
    { title: "Sofortzugang", desc: "Digitales E-Book. Sofort auf Smartphone oder Tablet lesen.", icon: <Smartphone size={24} strokeWidth={1} /> }
  ];

  return (
    <section className="py-40 px-6 relative z-10 border-t border-white/5 bg-[#010101]">
      <div className="max-w-[1400px] mx-auto">
        <FadeIn className="mb-20">
          <span className="text-white/20 font-serif text-xl italic mb-6 block">04 / Der Inhalt</span>
          <h2 className="text-white font-serif text-4xl md:text-6xl uppercase tracking-tighter">Das <br/><span className="text-white/30">bekommst du</span></h2>
        </FadeIn>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {features.map((f, i) => (
            <FadeIn key={i} delay={i * 0.1} className="bg-[#010101] h-full p-10 md:p-12 hover:bg-white/[0.02] transition-colors duration-700 group">
              <div className="text-white/20 mb-10 group-hover:text-white/60 transition-colors duration-500">{f.icon}</div>
              <h4 className="text-white font-serif text-xl md:text-2xl uppercase tracking-tight mb-4">{f.title}</h4>
              <p className="text-white/40 text-sm font-light leading-relaxed">{f.desc}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const PreviewSection = () => {
  const previews = [
    { chapter: "Woche 1", title: "Zerstörung der Illusion", excerpt: "Wir reißen das falsche Fundament ab. Ausreden werden nicht länger toleriert." },
    { chapter: "Woche 2 & 3", title: "Aufbau der Routine", excerpt: "Die Gebete werden zum Zentrum, um das sich der Rest des Tages unweigerlich beugt." },
    { chapter: "Woche 4", title: "Der unverhandelbare Standard", excerpt: "Was einst schwerfiel, ist jetzt deine tief verankerte, echte Identität." }
  ];

  return (
    <section className="py-40 px-6 relative z-10 border-t border-white/5 bg-[#020202] overflow-hidden">
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.02),_transparent_60%)] pointer-events-none" />
      <div className="max-w-[1400px] mx-auto relative z-10">
        <FadeIn className="mb-20 lg:text-right flex flex-col lg:items-end">
          <span className="text-white/20 font-serif text-xl italic mb-6 block">05 / Einblick</span>
          <h2 className="text-white font-serif text-4xl md:text-6xl uppercase tracking-tighter">Blick ins <br/><span className="text-white/30">E-Book</span></h2>
        </FadeIn>
        <div className="grid lg:grid-cols-3 gap-8">
          {previews.map((p, i) => (
            <FadeIn key={i} delay={i * 0.15} direction="up" className="relative group h-full">
              <div className="absolute inset-0 bg-white/5 blur-xl group-hover:bg-white/10 transition-colors duration-700 rounded-sm" />
              <div className="relative h-full p-10 border border-white/10 bg-[#050505] flex flex-col justify-between overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                 <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.01),_transparent_100%)] pointer-events-none" />
                 <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-8">
                      <Eye size={12} className="text-white/30" />
                      <span className="text-white/40 text-[9px] uppercase tracking-[0.3em] font-medium">{p.chapter}</span>
                    </div>
                    <h4 className="text-white font-serif text-2xl uppercase tracking-tight mb-8 leading-tight">{p.title}</h4>
                 </div>
                 <div className="relative z-10 border-t border-white/10 pt-8 mt-auto">
                    <p className="text-white/60 text-sm italic font-light leading-relaxed">"{p.excerpt}"</p>
                 </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-52 px-6 relative z-10 border-t border-white/5 bg-[#010101] flex flex-col items-center overflow-hidden">
      {/* Hier habe ich die ID hinzugefügt, damit das Scrollen dorthin funktioniert */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] md:w-[70vw] md:h-[70vw] max-w-[1000px] max-h-[1000px] bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.03),_transparent_60%)] pointer-events-none" />

      <FadeIn className="text-center w-full max-w-[1200px] relative z-10">
        <span className="text-white/20 font-serif text-xl italic mb-6 block">06 / Die Entscheidung</span>
        <h2 className="text-white font-serif text-6xl md:text-8xl uppercase tracking-tighter mb-24 leading-[0.85]">
          Hol dir <br/> <span className="text-white/30 italic">Das E-Book</span>
        </h2>
        
        {/* Ultra-Premium Black Card Design */}
        <div className="relative p-[1px] rounded-sm bg-gradient-to-b from-white/20 via-white/5 to-transparent shadow-[0_40px_100px_rgba(0,0,0,1)] group hover:from-white/30 transition-colors duration-1000">
          <div className="bg-[#030303] p-10 md:p-16 lg:p-20 text-left rounded-sm relative overflow-hidden">
            
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-white/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-white/15 transition-colors duration-1000" />

            {/* Repariertes Pricing Layout */}
            <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-12 lg:gap-16 relative z-10 w-full">
              
              <div className="shrink-0 z-20">
                <EBookMockup />
              </div>

              {/* Wrapper für Text & Preis */}
              <div className="flex-1 flex flex-col xl:flex-row justify-between items-start xl:items-center w-full gap-10 xl:gap-12">
                
                {/* Text Info */}
                <div className="flex-1 py-4 flex flex-col justify-center min-w-[280px]">
                  <div className="text-white/40 text-[10px] uppercase tracking-[0.4em] mb-6 flex items-center gap-3">
                    <Zap size={12} className="text-white/60" /> Premium Zugang
                  </div>
                  <h3 className="text-white text-3xl md:text-4xl font-serif mb-6 tracking-tight uppercase">Die komplette <br/><span className="text-white/40">Transformation</span></h3>
                  <p className="text-white/50 text-sm md:text-base font-light leading-relaxed mb-8 max-w-md">
                    30 Tage Transformation zu deinem echten Iman. Ein klarer Weg zu Standhaftigkeit, innerer Stärke und einem Leben mit Richtung.
                  </p>
                  <ul className="text-white/80 text-xs uppercase tracking-[0.15em] space-y-4 font-medium mb-10 xl:mb-0">
                    <li className="flex items-center gap-5"><div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] shrink-0" /> PDF E-Book (Digital)</li>
                    <li className="flex items-center gap-5"><div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] shrink-0" /> Sofort-Download</li>
                    <li className="flex items-center gap-5"><div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)] shrink-0" /> Auf Handy & Tablet nutzbar</li>
                  </ul>
                </div>

                {/* Pricing / CTA */}
                <div className="w-full xl:w-auto flex flex-col items-start xl:items-end justify-center xl:pl-12 xl:border-l border-white/10 py-4 shrink-0">
                  <div className="flex items-end gap-3 sm:gap-4 mb-8 lg:mb-10">
                    <div className="text-white text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif tracking-tighter leading-none whitespace-nowrap">12<span className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl text-white/40">,99€</span></div>
                    <div className="text-white/20 text-lg sm:text-xl font-serif line-through decoration-white/20 decoration-1 tracking-widest pb-1 sm:pb-2 whitespace-nowrap">19,99€</div>
                  </div>
                  
                  <div className="w-full">
                    <MagneticButton 
                      href={CHECKOUT_URL}
                      target="_blank"
                      className="w-full lg:w-[280px] bg-white text-black py-6 font-black uppercase tracking-[0.2em] text-[11px] rounded-sm transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] whitespace-nowrap"
                    >
                      JETZT FÜR 12,99€ SICHERN
                    </MagneticButton>
                    <div className="mt-6 flex items-center justify-center xl:justify-end gap-3 text-white/40 text-[9px] uppercase tracking-[0.25em] font-medium">
                      <Lock size={12} /> Sicherer Checkout
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Inhaltsübersicht Mini */}
            <div className="mt-16 pt-12 border-t border-white/5 relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">Woche 1</p>
                <p className="text-white/40 text-sm font-light leading-relaxed">Fundament aufbauen & Selbstlüge beenden.</p>
              </div>
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">Woche 2-3</p>
                <p className="text-white/40 text-sm font-light leading-relaxed">System und feste Struktur im Alltag verankern.</p>
              </div>
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">Woche 4</p>
                <p className="text-white/40 text-sm font-light leading-relaxed">Standhaftigkeit als deinen neuen Standard festigen.</p>
              </div>
              <div>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">Der Fokus</p>
                <p className="text-white/40 text-sm font-light leading-relaxed">Klare Routinen für Gebet, Iman und Identität.</p>
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
    <section className="py-40 px-6 relative z-10 border-t border-white/5 bg-[#040404]">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="flex flex-col mb-16 text-left">
            <span className="text-white/20 font-serif text-xl italic mb-6 block">07 / Klarheit</span>
            <h2 className="text-white font-serif text-4xl md:text-5xl uppercase tracking-tighter">Keine Fragen <br/><span className="text-white/30">mehr offen</span></h2>
        </FadeIn>
        
        <div className="border-t border-white/10">
          {FAQS.map((faq, idx) => (
            <div key={`faq-${idx}`} className="border-b border-white/10">
              <button 
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full py-8 flex justify-between items-center text-left hover:text-white/80 transition-colors"
              >
                <div className="flex gap-6 items-start pr-8">
                    <span className="text-white/20 font-serif text-lg italic mt-0.5">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="text-white/90 font-serif text-lg md:text-xl uppercase tracking-wide">{faq.q}</span>
                </div>
                <div className={`transition-transform duration-500 shrink-0 ${openIndex === idx ? 'rotate-180 text-white' : 'text-white/30'}`}>
                  {openIndex === idx ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                </div>
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div 
                    key={`faq-answer-${idx}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: premiumEase }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-12 pr-8">
                      <p className="text-white/50 text-sm md:text-base leading-relaxed font-light whitespace-pre-line">{faq.a}</p>
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

export default function App() {
  const [loading, setLoading] = useState(true);
  const [legalModal, setLegalModal] = useState(null); 

  useEffect(() => {
    document.title = "Der standhafte Muslim | 30 Tage Transformation E-Book";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }
    metaDescription.content = "30 Tage Transformation zu deinem echten Iman. Ein klarer Weg zu Standhaftigkeit, innerer Stärke und einem Leben mit Richtung.";

    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-[#020202] min-h-screen text-white font-sans antialiased selection:bg-white selection:text-black overflow-x-hidden">
      <NoiseOverlay />
      <Spotlight />
      
      <AnimatePresence mode="wait">
        {loading && <Intro key="intro" />}
      </AnimatePresence>
      
      {!loading && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.5, ease: premiumEase }}
        >
          <Navigation />
          <main>
            <Hero />
            <InfiniteTicker />
            <ProblemSection />
            <ProductPreviewCompact />
            <SolutionSection />
            <Testimonials />
            <FeaturesSection />
            <PreviewSection />
            <PricingSection />
            <FAQ />
            
            <footer className="py-24 px-6 text-center border-t border-white/5 bg-[#020202] relative z-10 flex flex-col items-center">
              <span className="text-white font-serif text-xl tracking-[0.3em] uppercase mb-8">Der Standhafte Muslim</span>
              
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                <button onClick={() => setLegalModal('impressum')} className="opacity-30 text-[9px] tracking-[0.2em] uppercase font-medium hover:opacity-100 transition-opacity">Impressum</button>
                <button onClick={() => setLegalModal('datenschutz')} className="opacity-30 text-[9px] tracking-[0.2em] uppercase font-medium hover:opacity-100 transition-opacity">Datenschutz</button>
                <button onClick={() => setLegalModal('widerruf')} className="opacity-30 text-[9px] tracking-[0.2em] uppercase font-medium hover:opacity-100 transition-opacity">Widerrufsbelehrung</button>
                <button onClick={() => setLegalModal('agb')} className="opacity-30 text-[9px] tracking-[0.2em] uppercase font-medium hover:opacity-100 transition-opacity">AGB</button>
              </div>

              <div className="opacity-30 text-[9px] tracking-[0.2em] uppercase font-medium">
                &copy; {new Date().getFullYear()} Usamah Sulaiman Shah
              </div>
            </footer>
          </main>
          
          <LegalModal activeSection={legalModal} onClose={() => setLegalModal(null)} />
        </motion.div>
      )}
    </div>
  );
}
