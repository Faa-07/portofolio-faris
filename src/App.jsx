import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Menu,
  X,
  Copy,
  Check,
  Terminal,
  Layers,
  Cpu,
  Globe,
  Code2,
} from 'lucide-react';

/**
 * ============================================================================
 * CENTRALIZED PORTFOLIO DATA
 * All content, projects, skills, and contact links are stored here for easy
 * maintenance without modifying UI layout components.
 * ============================================================================
 */

const PROFILE_META = {
  monogram: 'FARIS',
  fullName: 'Muhammad Faris Arrachman',
  roleLabel: 'Frontend Developer • UI/UX Designer • Network Enthusiast',
  location: 'Palembang, Indonesia',
  coordinates: '2.9761° S, 104.7754° E',
  institution: 'Fasilkom, Universitas Sriwijaya (UNSRI)',
  vocationalBackground: 'Computer & Network Engineering (SMK TKJ)',
  availability: 'AVAILABLE FOR PROJECTS',
  year: '2026',
};

const NAV_LINKS = [
  { id: 'home', label: 'Home', index: '00' },
  { id: 'work', label: 'Work', index: '01' },
  { id: 'about', label: 'About', index: '02' },
  { id: 'contact', label: 'Contact', index: '03' },
];

const PROJECTS_DATA = [
  {
    id: 'sifest-2026',
    index: '01',
    title: 'SIFEST 2026 Web Application',
    category: 'Web Development & UI Implementation',
    year: '2026',
    featured: true,
    isPlaceholder: false,
    statusLabel: 'FLAGSHIP BUILD',
    role: 'Frontend & Web Implementation',
    stack: ['Laravel', 'Vite', 'PHP', 'JavaScript', 'MySQL'],
    summary:
      'Official event web platform developed for SIFEST 2026, combining modern frontend bundling with structured backend architecture.',
    overview:
      'Engineered to serve as the central digital touchpoint for SIFEST 2026. The build pairs Vite-bundled frontend assets and responsive editorial interfaces with a structured Laravel MVC backend and relational MySQL database schema.',
    architecturalNotes: [
      'Modular Blade & JavaScript component structure optimized via Vite asset bundling.',
      'Responsive grid architecture tailored for event schedules, competition tracks, and registration flows.',
      'Structured server-side routing, validation, and relational data modeling in PHP/Laravel & MySQL.',
    ],
    previewType: 'sifest',
  },
  {
    id: 'upcoming-case-02',
    index: '02',
    title: 'Upcoming Case Study 02',
    category: 'UI/UX & Frontend Architecture',
    year: '2026',
    featured: false,
    isPlaceholder: true,
    statusLabel: 'MODULAR SLOT // 02',
    role: 'UI/UX Designer & Frontend Developer',
    stack: ['React', 'Figma', 'CSS'],
    summary:
      'Modular case study slot reserved for upcoming interface engineering and component system documentation.',
    overview:
      'A dedicated archival slot structured for forthcoming frontend architecture and UI/UX design system documentation—focusing on typographic hierarchy, interaction states, and reusable React primitives.',
    architecturalNotes: [
      'Token-driven design specification drafted in Figma with strict spacing and contrast rules.',
      'Accessible interactive patterns built with semantic HTML, modern CSS, and React state management.',
      'Ready for direct data hydration inside the centralized portfolio project registry.',
    ],
    previewType: 'ui-grid',
  },
  {
    id: 'upcoming-case-03',
    index: '03',
    title: 'Upcoming Case Study 03',
    category: 'Network & Systems Integration',
    year: '2026',
    featured: false,
    isPlaceholder: true,
    statusLabel: 'MODULAR SLOT // 03',
    role: 'Network Infrastructure & Systems Student',
    stack: ['MikroTik', 'Cisco', 'Java'],
    summary:
      'Modular case study slot reserved for infrastructure topology, routing lab, and object-oriented system architecture.',
    overview:
      'A dedicated technical slot bridging vocational network engineering practice with object-oriented software logic—documenting segmented routing topologies and structured desktop/backend system workflows.',
    architecturalNotes: [
      'VLAN segmentation, static/dynamic routing, and firewall rule sets modeled on MikroTik & Cisco environments.',
      'Object-oriented system design principles implemented in Java with clean separation of concerns.',
      'Designed to highlight the intersection between network reliability and application-layer design.',
    ],
    previewType: 'network-topology',
  },
];

const EXPERTISE_PILLARS = [
  {
    index: '01',
    category: 'Frontend & Web Development',
    subtitle: 'Interface engineering, responsive layout systems & full-stack web foundations',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'PHP', 'Laravel'],
  },
  {
    index: '02',
    category: 'Programming & Database',
    subtitle: 'Object-oriented logic, structured problem solving & relational data modeling',
    skills: ['Java', 'MySQL'],
  },
  {
    index: '03',
    category: 'UI/UX & Creative Media',
    subtitle: 'Wireframing, visual hierarchy, editorial prototyping & motion assembly',
    skills: ['Figma', 'CapCut'],
  },
  {
    index: '04',
    category: 'Networking & Infrastructure',
    subtitle: 'Routing, switching, network configuration & hardware-level literacy',
    skills: ['MikroTik', 'Cisco'],
  },
];

const CONTACT_CHANNELS = [
  {
    index: '01',
    label: 'Email',
    handle: 'faris.arrachman@example.com',
    href: 'mailto:faris.arrachman@example.com',
    actionLabel: 'Send Mail',
    copyable: true,
  },
  {
    index: '02',
    label: 'LinkedIn',
    handle: 'linkedin.com/in/muhammad-faris-arrachman',
    href: 'https://linkedin.com',
    actionLabel: 'Connect',
    copyable: false,
  },
  {
    index: '03',
    label: 'GitHub',
    handle: 'github.com/farisarrachman',
    href: 'https://github.com',
    actionLabel: 'Inspect Code',
    copyable: false,
  },
  {
    index: '04',
    label: 'Instagram',
    handle: '@faris.arrachman',
    href: 'https://instagram.com',
    actionLabel: 'Follow',
    copyable: false,
  },
];

/**
 * ============================================================================
 * REUSABLE EDITORIAL MOTION PRIMITIVES
 * ============================================================================
 */

function SectionHeader({ index, eyebrow, title, rightMeta }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border-t border-[#2A2A2A] pt-6 pb-10 md:pt-8 md:pb-14">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 font-mono-tech text-xs tracking-[0.2em] uppercase">
          <span className="text-[#EF233C] font-medium">{index}</span>
          <span className="text-[#2A2A2A]">/</span>
          <span className="text-[#8E8D8A]">{eyebrow}</span>
        </div>
        {rightMeta && (
          <span className="font-mono-tech text-[11px] tracking-[0.18em] uppercase text-[#8E8D8A]">
            {rightMeta}
          </span>
        )}
      </div>

      <motion.h2
        initial={prefersReducedMotion ? false : { opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-[-0.03em] text-[#F1EEE8] leading-[1.05]"
      >
        {title}
      </motion.h2>
    </div>
  );
}

/**
 * ============================================================================
 * STICKY EDITORIAL NAVBAR
 * ============================================================================
 */

function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 28);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-300 ${
          scrolled
            ? 'bg-[#101010]/92 backdrop-blur-md border-b border-[#2A2A2A]'
            : 'bg-[#101010] border-b border-transparent'
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Brand Wordmark */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="group inline-flex items-baseline gap-2.5 focus:outline-none"
            aria-label="Muhammad Faris Arrachman Home"
          >
            <span className="text-xl md:text-2xl font-extrabold tracking-[-0.04em] text-[#F1EEE8]">
              {PROFILE_META.monogram}
              <span className="text-[#EF233C] inline-block transition-transform duration-300 group-hover:scale-125">
                .
              </span>
            </span>
            <span className="hidden sm:inline-block font-mono-tech text-[10px] tracking-[0.22em] uppercase text-[#8E8D8A] border-l border-[#2A2A2A] pl-2.5">
              ED. {PROFILE_META.year}
            </span>
          </a>

          {/* Desktop Editorial Navigation */}
          <nav className="hidden md:flex items-center gap-9" aria-label="Primary Navigation">
            {NAV_LINKS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className="group relative py-2 flex items-center gap-1.5 text-sm font-medium tracking-wide transition-colors"
                >
                  <span className="font-mono-tech text-[10px] text-[#EF233C]/80">
                    {item.index}
                  </span>
                  <span
                    className={
                      isActive
                        ? 'text-[#F1EEE8]'
                        : 'text-[#8E8D8A] group-hover:text-[#F1EEE8] transition-colors'
                    }
                  >
                    {item.label}
                  </span>

                  {/* Active / Hover Crimson Underline */}
                  <span
                    className={`absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#EF233C] origin-left transition-transform duration-300 ${
                      isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 border border-[#2A2A2A] bg-[#1D1D1D] text-[#F1EEE8] hover:border-[#EF233C] transition-colors"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Responsive Full-Screen Mobile Editorial Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-30 bg-[#101010] pt-24 pb-10 px-6 flex flex-col justify-between md:hidden overflow-y-auto"
          >
            <div className="border-t border-[#2A2A2A] divide-y divide-[#2A2A2A]">
              {NAV_LINKS.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  className="py-5 flex items-baseline justify-between group"
                >
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono-tech text-xs text-[#EF233C]">{item.index}</span>
                    <span className="text-3xl font-bold tracking-tight text-[#F1EEE8] group-hover:text-[#EF233C] transition-colors">
                      {item.label}
                    </span>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-[#8E8D8A] group-hover:text-[#EF233C]" />
                </motion.a>
              ))}
            </div>

            <div className="border-t border-[#2A2A2A] pt-6 space-y-2 font-mono-tech text-xs text-[#8E8D8A]">
              <p className="text-[#F1EEE8] uppercase tracking-widest">{PROFILE_META.fullName}</p>
              <p>{PROFILE_META.location}</p>
              <div className="flex items-center gap-2 pt-2 text-[#EF233C]">
                <span className="w-2 h-2 rounded-full bg-[#EF233C] animate-pulse" />
                <span>{PROFILE_META.availability}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/**
 * ============================================================================
 * KINETIC TYPOGRAPHY CENTERPIECE
 * Scroll-linked horizontal/vertical typographic shifts + staggered reveal +
 * cursor/hover reactive editorial serif & sans contrast.
 * ============================================================================
 */

function KineticTypography({ containerRef }) {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredWord, setHoveredWord] = useState(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 26,
    mass: 0.5,
  });

  // Opposite-direction subtle horizontal kinetic shifts on scroll
  const line1X = useTransform(smoothProgress, [0, 1], [0, -38]);
  const line2X = useTransform(smoothProgress, [0, 1], [0, 42]);
  const line3X = useTransform(smoothProgress, [0, 1], [0, -28]);
  const tickerX = useTransform(smoothProgress, [0, 1], [0, -120]);

  const lineReveal = {
    hidden: { y: '108%', opacity: 0 },
    visible: (customDelay) => ({
      y: '0%',
      opacity: 1,
      transition: {
        duration: 0.85,
        delay: customDelay,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <div className="relative py-8 sm:py-12 md:py-16 select-none">
      {/* Subtle architectural background index watermark */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-2 right-0 font-mono-tech text-[10px] sm:text-xs tracking-[0.25em] text-[#2A2A2A] uppercase hidden sm:block"
      >
        ISSUE NO. 01 // KINETIC EDITION
      </div>

      {/* Main Monumental Headline:
          "Crafting interfaces & resilient systems through design and code." */}
      <h1
        aria-label="Crafting interfaces & resilient systems through design and code."
        className="font-extrabold text-[#F1EEE8] tracking-[-0.038em] leading-[0.96] uppercase"
        style={{ fontSize: 'clamp(2.45rem, 6.5vw, 6.75rem)' }}
      >
        {/* Line 1 */}
        <div className="overflow-hidden py-1">
          <motion.div
            style={prefersReducedMotion ? undefined : { x: line1X }}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            custom={0.05}
            variants={lineReveal}
            className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-5"
          >
            <span>Crafting</span>
            <span
              onMouseEnter={() => setHoveredWord('interfaces')}
              onMouseLeave={() => setHoveredWord(null)}
              className="font-editorial-serif italic font-normal lowercase text-[#EF233C] tracking-[-0.01em] transition-all duration-300 cursor-default inline-block"
              style={{
                transform:
                  hoveredWord === 'interfaces' && !prefersReducedMotion
                    ? 'skewX(-4deg) translateX(4px)'
                    : 'none',
              }}
            >
              interfaces
            </span>
            <span className="text-[#8E8D8A] font-light">&amp;</span>
          </motion.div>
        </div>

        {/* Line 2 */}
        <div className="overflow-hidden py-1">
          <motion.div
            style={prefersReducedMotion ? undefined : { x: line2X }}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            custom={0.16}
            variants={lineReveal}
            className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-5 md:pl-12 lg:pl-24"
          >
            <span
              onMouseEnter={() => setHoveredWord('resilient')}
              onMouseLeave={() => setHoveredWord(null)}
              className="font-editorial-serif italic font-normal lowercase text-[#EF233C] tracking-[-0.01em] transition-all duration-300 cursor-default inline-block"
              style={{
                transform:
                  hoveredWord === 'resilient' && !prefersReducedMotion
                    ? 'skewX(-4deg) translateX(4px)'
                    : 'none',
              }}
            >
              resilient
            </span>
            <span>systems</span>
          </motion.div>
        </div>

        {/* Line 3 */}
        <div className="overflow-hidden py-1">
          <motion.div
            style={prefersReducedMotion ? undefined : { x: line3X }}
            initial={prefersReducedMotion ? false : 'hidden'}
            animate="visible"
            custom={0.27}
            variants={lineReveal}
            className="flex flex-wrap items-baseline gap-x-3 sm:gap-x-5"
          >
            <span>through</span>
            <span
              onMouseEnter={() => setHoveredWord('design-code')}
              onMouseLeave={() => setHoveredWord(null)}
              className="font-editorial-serif italic font-normal lowercase text-[#EF233C] tracking-[-0.01em] transition-all duration-300 cursor-default inline-block"
              style={{
                transform:
                  hoveredWord === 'design-code' && !prefersReducedMotion
                    ? 'skewX(-4deg) translateX(4px)'
                    : 'none',
              }}
            >
              design and code.
            </span>
          </motion.div>
        </div>
      </h1>

      {/* Scroll-linked kinetic editorial rule strip */}
      <div className="mt-8 sm:mt-10 border-y border-[#2A2A2A] py-2.5 overflow-hidden">
        <motion.div
          style={prefersReducedMotion ? undefined : { x: tickerX }}
          className="flex items-center gap-6 whitespace-nowrap font-mono-tech text-[11px] tracking-[0.22em] uppercase text-[#8E8D8A]"
        >
          <span className="text-[#EF233C]">●</span>
          <span>FRONTEND ARCHITECTURE</span>
          <span className="text-[#2A2A2A]">/</span>
          <span>UI/UX SYSTEMS</span>
          <span className="text-[#2A2A2A]">/</span>
          <span>NETWORK INFRASTRUCTURE (TKJ)</span>
          <span className="text-[#2A2A2A]">/</span>
          <span>INFORMATION SYSTEMS — UNSRI</span>
          <span className="text-[#EF233C]">●</span>
          <span>REACT &amp; LARAVEL</span>
          <span className="text-[#2A2A2A]">/</span>
          <span>MIKROTIK &amp; CISCO</span>
          <span className="text-[#2A2A2A]">/</span>
          <span>PALEMBANG, INDONESIA</span>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * HERO SECTION
 * ============================================================================
 */

function Hero() {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const handleExploreClick = (e) => {
    e.preventDefault();
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative overflow-x-clip pt-6 pb-16 sm:pt-10 sm:pb-24 md:pb-28"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Editorial Metadata Bar */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pb-5 border-b border-[#2A2A2A] font-mono-tech text-[11px] tracking-[0.16em] uppercase"
        >
          <div className="text-[#F1EEE8] font-medium">{PROFILE_META.fullName}</div>

          <div className="text-[#8E8D8A] sm:text-center">{PROFILE_META.location}</div>

          <div className="flex items-center sm:justify-end gap-2.5 text-[#F1EEE8]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#EF233C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EF233C]" />
            </span>
            <span>{PROFILE_META.availability}</span>
          </div>
        </motion.div>

        {/* Kinetic Typography Centerpiece */}
        <KineticTypography containerRef={heroRef} />

        {/* Bottom Asymmetric Editorial Descriptor & CTA */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
        >
          {/* Role & Supporting Biography Copy */}
          <div className="lg:col-span-7 space-y-4">
            <p className="font-mono-tech text-xs sm:text-[13px] tracking-[0.14em] uppercase text-[#EF233C]">
              {PROFILE_META.roleLabel}
            </p>
            <p className="text-base sm:text-lg md:text-xl text-[#F1EEE8]/90 leading-relaxed max-w-2xl font-normal">
              Information Systems undergraduate with a Computer &amp; Network Engineering (TKJ)
              foundation—bridging frontend craftsmanship, UI/UX design, and solid infrastructure.
            </p>
          </div>

          {/* Primary CTA & Minimal Scroll Indicator */}
          <div className="lg:col-span-5 flex flex-wrap sm:flex-nowrap items-center justify-between lg:justify-end gap-6">
            <a
              href="#work"
              onClick={handleExploreClick}
              className="group inline-flex items-center gap-3 bg-[#EF233C] hover:bg-[#B91C1C] text-[#F1EEE8] font-semibold text-sm tracking-wide uppercase px-7 py-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EF233C] focus:ring-offset-2 focus:ring-offset-[#101010]"
            >
              <span>Explore My Work</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <a
              href="#work"
              onClick={handleExploreClick}
              aria-label="Scroll down to Selected Works"
              className="inline-flex items-center gap-2.5 font-mono-tech text-[11px] tracking-[0.2em] uppercase text-[#8E8D8A] hover:text-[#F1EEE8] transition-colors py-2"
            >
              <span>SCROLL</span>
              <span className="w-8 h-8 border border-[#2A2A2A] flex items-center justify-center text-[#EF233C]">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * ARCHITECTURAL THUMBNAIL ARTWORK FOR PROJECT CARDS
 * Custom dark-editorial schematics for each project without fake metrics.
 * ============================================================================
 */

function ProjectArtworkPreview({ type }) {
  if (type === 'sifest') {
    return (
      <div className="relative w-full h-full min-h-[260px] sm:min-h-[340px] bg-[#141414] p-5 sm:p-8 flex flex-col justify-between overflow-hidden">
        {/* Background Swiss Grid */}
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'linear-gradient(to right, #2A2A2A 1px, transparent 1px), linear-gradient(to bottom, #2A2A2A 1px, transparent 1px)',
            backgroundSize: '36px 36px',
          }}
        />

        {/* Top Browser / System Frame Header */}
        <div className="relative z-10 flex items-center justify-between border border-[#2A2A2A] bg-[#101010] px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#EF233C]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2A2A2A]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#2A2A2A]" />
          </div>
          <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#8E8D8A]">
            SIFEST.2026 // LARAVEL + VITE
          </span>
          <Globe className="w-3.5 h-3.5 text-[#EF233C]" />
        </div>

        {/* Editorial Display Specimen Inside Frame */}
        <div className="relative z-10 my-6 border-l-2 border-[#EF233C] pl-4 sm:pl-6">
          <p className="font-mono-tech text-[10px] tracking-[0.25em] uppercase text-[#EF233C] mb-1.5">
            HIMSI FASILKOM UNSRI — EVENT PLATFORM
          </p>
          <div className="text-3xl sm:text-5xl font-extrabold tracking-[-0.04em] text-[#F1EEE8] leading-none">
            SIFEST <span className="font-editorial-serif italic font-normal text-[#EF233C]">2026</span>
          </div>
          <p className="mt-2.5 text-xs sm:text-sm text-[#8E8D8A] max-w-md">
            Modular web architecture pairing Vite asset bundling with structured Laravel controllers and MySQL schema.
          </p>
        </div>

        {/* Bottom Architectural Module Strip */}
        <div className="relative z-10 grid grid-cols-3 gap-2.5 font-mono-tech text-[10px] uppercase tracking-wider">
          <div className="border border-[#2A2A2A] bg-[#101010]/90 p-2.5">
            <span className="text-[#EF233C] block mb-0.5">01 / FRONT</span>
            <span className="text-[#F1EEE8]">VITE + JS</span>
          </div>
          <div className="border border-[#2A2A2A] bg-[#101010]/90 p-2.5">
            <span className="text-[#EF233C] block mb-0.5">02 / CORE</span>
            <span className="text-[#F1EEE8]">LARAVEL PHP</span>
          </div>
          <div className="border border-[#2A2A2A] bg-[#101010]/90 p-2.5">
            <span className="text-[#EF233C] block mb-0.5">03 / DATA</span>
            <span className="text-[#F1EEE8]">MYSQL DB</span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'ui-grid') {
    return (
      <div className="relative w-full h-full min-h-[240px] bg-[#141414] p-6 flex flex-col justify-between overflow-hidden">
        <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#8E8D8A]">
          <span>FIGMA // COMPONENT SPEC</span>
          <Layers className="w-4 h-4 text-[#EF233C]" />
        </div>

        <div className="my-5 grid grid-cols-4 gap-2.5">
          <div className="col-span-2 h-20 border border-[#EF233C]/60 bg-[#101010] p-3 flex flex-col justify-between">
            <span className="font-mono-tech text-[9px] text-[#EF233C]">TYPE SCALE</span>
            <span className="font-editorial-serif italic text-xl text-[#F1EEE8]">Aa Bb Cc</span>
          </div>
          <div className="col-span-2 h-20 border border-[#2A2A2A] bg-[#101010] p-3 flex flex-col justify-between">
            <span className="font-mono-tech text-[9px] text-[#8E8D8A]">GRID SYSTEM</span>
            <span className="font-mono-tech text-xs text-[#F1EEE8]">12-COL // 1PX</span>
          </div>
          <div className="col-span-4 h-12 border border-[#2A2A2A] bg-[#101010] px-3 flex items-center justify-between">
            <span className="font-mono-tech text-[10px] text-[#8E8D8A]">REACT PRIMITIVES</span>
            <span className="w-2 h-2 bg-[#EF233C]" />
          </div>
        </div>

        <div className="font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[#8E8D8A]">
          RESERVED ARCHIVE // CASE 02
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[240px] bg-[#141414] p-6 flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#8E8D8A]">
        <span>TOPOLOGY // VLAN &amp; OOP</span>
        <Cpu className="w-4 h-4 text-[#EF233C]" />
      </div>

      {/* Schematic Node Diagram */}
      <div className="my-5 flex flex-col items-center justify-center gap-3 font-mono-tech text-[10px]">
        <div className="border border-[#EF233C] bg-[#101010] px-4 py-2 text-[#F1EEE8] tracking-widest">
          CORE ROUTER // MIKROTIK
        </div>
        <div className="h-4 w-[1px] bg-[#EF233C]" />
        <div className="w-full grid grid-cols-2 gap-3">
          <div className="border border-[#2A2A2A] bg-[#101010] p-2.5 text-center text-[#8E8D8A]">
            CISCO SWITCH // VLAN
          </div>
          <div className="border border-[#2A2A2A] bg-[#101010] p-2.5 text-center text-[#8E8D8A]">
            JAVA OOP // MODULE
          </div>
        </div>
      </div>

      <div className="font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[#8E8D8A]">
        RESERVED ARCHIVE // CASE 03
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * PROJECT CARD COMPONENT
 * Supports flagship full-width editorial card & asymmetric secondary cards.
 * ============================================================================
 */

function ProjectCard({ project, onSelect }) {
  const prefersReducedMotion = useReducedMotion();

  if (project.featured) {
    return (
      <motion.article
        initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        onClick={() => onSelect(project)}
        className="group cursor-pointer border border-[#2A2A2A] bg-[#1D1D1D] hover:border-[#EF233C] transition-colors duration-300"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Thumbnail Container with Hover Zoom */}
          <div className="lg:col-span-7 overflow-hidden border-b lg:border-b-0 lg:border-r border-[#2A2A2A]">
            <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
              <ProjectArtworkPreview type={project.previewType} />
            </div>
          </div>

          {/* Editorial Metadata & Description */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-4 pb-5 border-b border-[#2A2A2A]">
                <span className="font-mono-tech text-sm font-medium text-[#EF233C]">
                  {project.index}
                </span>
                <span className="font-mono-tech text-[11px] tracking-[0.18em] uppercase text-[#8E8D8A]">
                  {project.statusLabel} — {project.year}
                </span>
              </div>

              <p className="mt-5 font-mono-tech text-xs uppercase tracking-[0.14em] text-[#8E8D8A]">
                {project.category}
              </p>

              <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-[-0.03em] text-[#F1EEE8] group-hover:text-[#EF233C] transition-colors">
                {project.title}
              </h3>

              <p className="mt-4 text-sm sm:text-base text-[#F1EEE8]/80 leading-relaxed">
                {project.summary}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#2A2A2A]">
              {/* Stack Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="font-mono-tech text-[11px] uppercase tracking-wider px-2.5 py-1 bg-[#101010] border border-[#2A2A2A] text-[#F1EEE8]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.18em] text-[#F1EEE8] group-hover:text-[#EF233C] transition-colors">
                <span>Inspect Case Study</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  }

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onSelect(project)}
      className="group cursor-pointer border border-[#2A2A2A] bg-[#1D1D1D] hover:border-[#EF233C] transition-colors duration-300 flex flex-col justify-between h-full"
    >
      <div>
        {/* Thumbnail with Smooth Hover Zoom */}
        <div className="overflow-hidden border-b border-[#2A2A2A]">
          <div className="w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.03]">
            <ProjectArtworkPreview type={project.previewType} />
          </div>
        </div>

        {/* Card Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#2A2A2A]">
            <span className="font-mono-tech text-sm font-medium text-[#EF233C]">
              {project.index}
            </span>
            <span className="font-mono-tech text-[11px] tracking-[0.18em] uppercase text-[#8E8D8A]">
              {project.statusLabel} — {project.year}
            </span>
          </div>

          <p className="mt-4 font-mono-tech text-xs uppercase tracking-[0.14em] text-[#8E8D8A]">
            {project.category}
          </p>

          <h3 className="mt-2 text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F1EEE8] group-hover:text-[#EF233C] transition-colors">
            {project.title}
          </h3>

          <p className="mt-3 text-sm sm:text-base text-[#F1EEE8]/80 leading-relaxed">
            {project.summary}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-4 border-t border-[#2A2A2A] flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="font-mono-tech text-[11px] uppercase tracking-wider px-2.5 py-1 bg-[#101010] border border-[#2A2A2A] text-[#8E8D8A]"
            >
              {tech}
            </span>
          ))}
        </div>

        <span className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-[0.16em] text-[#F1EEE8] group-hover:text-[#EF233C] transition-colors">
          <span>Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </span>
      </div>
    </motion.article>
  );
}

/**
 * ============================================================================
 * INTERACTIVE CASE STUDY MODAL
 * ============================================================================
 */

function ProjectModal({ project, onClose }) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-[#101010]/88 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl bg-[#1D1D1D] border border-[#2A2A2A] text-[#F1EEE8] my-auto overflow-hidden"
          >
            {/* Modal Top Editorial Bar */}
            <div className="px-6 py-4 border-b border-[#2A2A2A] bg-[#101010] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 font-mono-tech text-xs tracking-[0.2em] uppercase">
                <span className="text-[#EF233C] font-semibold">CASE // {project.index}</span>
                <span className="text-[#2A2A2A]">|</span>
                <span className="text-[#8E8D8A]">{project.year}</span>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 font-mono-tech text-xs uppercase tracking-widest text-[#8E8D8A] hover:text-[#EF233C] px-2.5 py-1.5 border border-[#2A2A2A] hover:border-[#EF233C] transition-colors"
                aria-label="Close case study modal"
              >
                <span>ESC</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Visual Preview */}
            <div className="border-b border-[#2A2A2A]">
              <ProjectArtworkPreview type={project.previewType} />
            </div>

            {/* Modal Case Study Content */}
            <div className="p-6 sm:p-8 md:p-10 space-y-6">
              <div>
                <p className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#EF233C]">
                  {project.category}
                </p>
                <h3
                  id="modal-project-title"
                  className="mt-2 text-2xl sm:text-4xl font-bold tracking-[-0.03em] text-[#F1EEE8]"
                >
                  {project.title}
                </h3>
              </div>

              {/* Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 border-y border-[#2A2A2A] font-mono-tech text-xs">
                <div>
                  <span className="text-[#8E8D8A] block uppercase tracking-wider mb-1">ROLE</span>
                  <span className="text-[#F1EEE8]">{project.role}</span>
                </div>
                <div>
                  <span className="text-[#8E8D8A] block uppercase tracking-wider mb-1">STATUS</span>
                  <span className="text-[#EF233C]">{project.statusLabel}</span>
                </div>
              </div>

              {/* Overview */}
              <div className="space-y-2">
                <h4 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#8E8D8A]">
                  ARCHITECTURAL OVERVIEW
                </h4>
                <p className="text-sm sm:text-base text-[#F1EEE8]/90 leading-relaxed">
                  {project.overview}
                </p>
              </div>

              {/* Implementation Highlights */}
              <div className="space-y-3">
                <h4 className="font-mono-tech text-xs uppercase tracking-[0.18em] text-[#8E8D8A]">
                  TECHNICAL STRUCTURE
                </h4>
                <ul className="space-y-2.5">
                  {project.architecturalNotes.map((note, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-3 text-sm text-[#F1EEE8]/85 leading-relaxed"
                    >
                      <span className="font-mono-tech text-xs text-[#EF233C] mt-0.5">
                        0{idx + 1}
                      </span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div className="pt-4 border-t border-[#2A2A2A] flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono-tech text-[11px] uppercase tracking-wider px-3 py-1 bg-[#101010] border border-[#2A2A2A] text-[#F1EEE8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="bg-[#EF233C] hover:bg-[#B91C1C] text-[#F1EEE8] font-mono-tech text-xs uppercase tracking-[0.18em] px-5 py-2.5 transition-colors"
                >
                  Close Entry
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * ============================================================================
 * SELECTED WORKS SECTION
 * ============================================================================
 */

function SelectedWorks() {
  const [selectedProject, setSelectedProject] = useState(null);
  const featuredProject = PROJECTS_DATA.find((p) => p.featured);
  const secondaryProjects = PROJECTS_DATA.filter((p) => !p.featured);

  return (
    <section id="work" className="py-16 sm:py-24 md:py-28">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="01"
          eyebrow="SELECTED WORKS"
          title={
            <>
              Curated{' '}
              <span className="font-editorial-serif italic font-normal text-[#EF233C]">
                Project Index
              </span>
            </>
          }
          rightMeta={`0${PROJECTS_DATA.length} ARCHIVE ENTRIES`}
        />

        {/* Asymmetric Editorial Gallery */}
        <div className="space-y-8 lg:space-y-10">
          {/* Flagship Full-Width Showcase */}
          {featuredProject && (
            <ProjectCard project={featuredProject} onSelect={setSelectedProject} />
          )}

          {/* Asymmetric 7-Col / 5-Col Secondary Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
            {secondaryProjects.map((project, idx) => (
              <div
                key={project.id}
                className={idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}
              >
                <ProjectCard project={project} onSelect={setSelectedProject} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Case Study Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}

/**
 * ============================================================================
 * ABOUT ME SECTION (TWO-COLUMN EDITORIAL BIOGRAPHY)
 * ============================================================================
 */

function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="py-16 sm:py-24 md:py-28">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="02"
          eyebrow="ABOUT ME"
          title={
            <>
              From packet routing to{' '}
              <span className="font-editorial-serif italic font-normal text-[#EF233C]">
                pixel precision.
              </span>
            </>
          }
          rightMeta="BIOGRAPHY // UNSRI & SMK TKJ"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Minimalist Editorial Portrait Placeholder with Crimson Crop Marks */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5"
          >
            <div className="relative bg-[#1D1D1D] border border-[#2A2A2A] p-5 sm:p-6">
              {/* Crimson Corner Crop Marks */}
              <span
                aria-hidden="true"
                className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t-2 border-l-2 border-[#EF233C]"
              />
              <span
                aria-hidden="true"
                className="absolute -top-[1px] -right-[1px] w-5 h-5 border-t-2 border-r-2 border-[#EF233C]"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-b-2 border-l-2 border-[#EF233C]"
              />
              <span
                aria-hidden="true"
                className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 border-[#EF233C]"
              />

              {/* Editorial Portrait Canvas Placeholder */}
              <div className="relative aspect-[4/5] w-full bg-[#121212] border border-[#2A2A2A] overflow-hidden flex flex-col justify-between p-6">
                {/* Architectural Crosshair Lines */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at center, #EF233C 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                <div className="relative z-10 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#8E8D8A]">
                  <span>PORTRAIT SPECIMEN</span>
                  <span className="text-[#EF233C]">MFA // 01</span>
                </div>

                {/* Minimalist Geometric Monogram Frame */}
                <div className="relative z-10 my-auto mx-auto text-center">
                  <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto border border-[#EF233C]/60 flex items-center justify-center bg-[#101010]">
                    <span className="font-editorial-serif italic text-5xl sm:text-6xl text-[#F1EEE8]">
                      M<span className="text-[#EF233C]">F</span>A
                    </span>
                  </div>
                  <p className="mt-4 font-mono-tech text-[11px] tracking-[0.2em] uppercase text-[#8E8D8A]">
                    PHOTO PLACEHOLDER
                  </p>
                </div>

                <div className="relative z-10 border-t border-[#2A2A2A] pt-3 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[#8E8D8A]">
                  <span>PALEMBANG, ID</span>
                  <span>{PROFILE_META.coordinates}</span>
                </div>
              </div>

              {/* Caption below portrait frame */}
              <div className="mt-4 flex items-center justify-between font-mono-tech text-[11px] tracking-[0.14em] uppercase text-[#8E8D8A]">
                <span>FIG. 01 — {PROFILE_META.fullName}</span>
                <span className="text-[#EF233C]">2026</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Biography Copy */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 lg:pt-2"
          >
            <p className="text-xl sm:text-2xl md:text-[26px] font-medium text-[#F1EEE8] leading-[1.4] tracking-[-0.02em]">
              I’m <span className="text-[#EF233C] font-semibold">Muhammad Faris Arrachman</span>, an
              Information Systems undergraduate at Fasilkom, Universitas Sriwijaya (UNSRI), rooted
              in Palembang, Indonesia.
            </p>

            <p className="text-base sm:text-lg text-[#8E8D8A] leading-relaxed">
              My path into software started at the infrastructure layer. Graduating from a
              vocational program in Computer and Network Engineering (SMK TKJ) taught me how data
              actually moves across routers, switches, and protocols before it ever reaches a
              browser window.
            </p>

            <p className="text-base sm:text-lg text-[#8E8D8A] leading-relaxed">
              Today, I channel that systems-first mindset into Frontend Development and UI/UX
              Design—building interfaces that are not only visually deliberate and typographically
              sharp, but structurally resilient, fast, and grounded in solid engineering.
            </p>

            {/* Editorial Metadata Table */}
            <div className="pt-6 mt-8 border-t border-[#2A2A2A] grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#EF233C] block mb-1.5">
                  01 / ACADEMIC
                </span>
                <p className="text-sm font-medium text-[#F1EEE8]">S1 Sistem Informasi</p>
                <p className="text-xs text-[#8E8D8A] mt-0.5">Fasilkom, Universitas Sriwijaya</p>
              </div>

              <div>
                <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#EF233C] block mb-1.5">
                  02 / FOUNDATION
                </span>
                <p className="text-sm font-medium text-[#F1EEE8]">SMK TKJ Alumnus</p>
                <p className="text-xs text-[#8E8D8A] mt-0.5">Computer &amp; Network Engineering</p>
              </div>

              <div>
                <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#EF233C] block mb-1.5">
                  03 / DISCIPLINE
                </span>
                <p className="text-sm font-medium text-[#F1EEE8]">Frontend, UI/UX &amp; Net</p>
                <p className="text-xs text-[#8E8D8A] mt-0.5">Palembang, South Sumatra</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * EXPERTISE & TOOLKIT SECTION
 * Typography-based editorial index (Strictly NO percentage bars or skill meters).
 * ============================================================================
 */

function Expertise() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="expertise" className="py-16 sm:py-24 md:py-28">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <SectionHeader
          index="03"
          eyebrow="EXPERTISE & TOOLKIT"
          title={
            <>
              Technical{' '}
              <span className="font-editorial-serif italic font-normal text-[#EF233C]">
                Capabilities
              </span>
            </>
          }
          rightMeta="04 CORE PILLARS"
        />

        <div className="border-t border-[#2A2A2A] divide-y divide-[#2A2A2A]">
          {EXPERTISE_PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.index}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: idx * 0.06 }}
              className="group py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start hover:bg-[#1D1D1D]/45 transition-colors px-2 sm:px-4"
            >
              {/* Index & Pillar Title */}
              <div className="lg:col-span-5 flex items-baseline gap-4">
                <span className="font-mono-tech text-sm font-medium text-[#EF233C]">
                  {pillar.index}
                </span>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#F1EEE8] group-hover:text-[#EF233C] transition-colors">
                    {pillar.category}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#8E8D8A] max-w-md">
                    {pillar.subtitle}
                  </p>
                </div>
              </div>

              {/* Typography-Driven Skill List */}
              <div className="lg:col-span-7 flex flex-wrap items-center gap-2.5 sm:gap-3 lg:justify-end">
                {pillar.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono-tech text-xs sm:text-sm tracking-wide px-4 py-2 bg-[#1D1D1D] border border-[#2A2A2A] text-[#F1EEE8] group-hover:border-[#EF233C]/50 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * CONTACT & MINIMAL EDITORIAL FOOTER
 * ============================================================================
 */

function Contact() {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleCopyEmail = (e, email) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2200);
      });
    }
  };

  return (
    <section id="contact" className="pt-16 pb-12 sm:pt-24 sm:pb-16">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="border-t border-[#2A2A2A] pt-10 sm:pt-14">
          <div className="flex items-center gap-3 font-mono-tech text-xs tracking-[0.2em] uppercase mb-6">
            <span className="text-[#EF233C] font-medium">04</span>
            <span className="text-[#2A2A2A]">/</span>
            <span className="text-[#8E8D8A]">CONTACT &amp; INQUIRIES</span>
          </div>

          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] text-[#F1EEE8] leading-[1.02] max-w-4xl"
          >
            Have an idea?{' '}
            <span className="font-editorial-serif italic font-normal text-[#EF233C]">
              Let&apos;s make it happen.
            </span>
          </motion.h2>

          {/* Interactive Contact Channels List */}
          <div className="mt-12 sm:mt-16 border-t border-[#2A2A2A] divide-y divide-[#2A2A2A]">
            {CONTACT_CHANNELS.map((channel) => (
              <a
                key={channel.index}
                href={channel.href}
                target={channel.copyable ? undefined : '_blank'}
                rel={channel.copyable ? undefined : 'noopener noreferrer'}
                className="group py-5 sm:py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#1D1D1D]/50 px-2 sm:px-4 transition-colors"
              >
                <div className="flex items-baseline gap-4 sm:gap-6">
                  <span className="font-mono-tech text-xs text-[#EF233C]">{channel.index}</span>
                  <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#F1EEE8] group-hover:text-[#EF233C] transition-colors">
                    {channel.label}
                  </span>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 pl-8 sm:pl-0">
                  <span className="font-mono-tech text-xs sm:text-sm text-[#8E8D8A] group-hover:text-[#F1EEE8] transition-colors break-all">
                    {channel.handle}
                  </span>

                  {channel.copyable && (
                    <button
                      type="button"
                      onClick={(e) => handleCopyEmail(e, channel.handle)}
                      className="inline-flex items-center gap-1.5 font-mono-tech text-[11px] uppercase tracking-wider px-3 py-1.5 border border-[#2A2A2A] bg-[#101010] text-[#F1EEE8] hover:border-[#EF233C] hover:text-[#EF233C] transition-colors"
                      aria-label="Copy email address"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#EF233C]" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  )}

                  <span className="w-9 h-9 border border-[#2A2A2A] group-hover:border-[#EF233C] group-hover:bg-[#EF233C] flex items-center justify-center text-[#F1EEE8] transition-all duration-300 shrink-0">
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#2A2A2A] bg-[#101010] py-8 sm:py-10">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono-tech text-xs text-[#8E8D8A]">
        <div className="space-y-1">
          <p className="text-[#F1EEE8]">
            &copy; {PROFILE_META.year} {PROFILE_META.fullName}
          </p>
          <p className="text-[11px] tracking-wider uppercase">
            {PROFILE_META.location} — DARK EDITORIAL PORTFOLIO
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2.5 uppercase tracking-[0.18em] text-[#F1EEE8] hover:text-[#EF233C] transition-colors py-2"
        >
          <span>Back to Top</span>
          <span className="w-8 h-8 border border-[#2A2A2A] group-hover:border-[#EF233C] flex items-center justify-center transition-colors">
            <ArrowUp className="w-3.5 h-3.5" />
          </span>
        </button>
      </div>
    </footer>
  );
}

/**
 * ============================================================================
 * ROOT APPLICATION COMPONENT
 * ============================================================================
 */

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  // Lightweight scroll spy for active navbar state
  useEffect(() => {
    const sectionIds = ['home', 'work', 'about', 'contact'];
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 220;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    handleScrollSpy();
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <div className="min-h-screen bg-[#101010] text-[#F1EEE8] font-sans-editorial antialiased selection:bg-[#EF233C] selection:text-[#F1EEE8] overflow-x-clip">
      {/* Editorial Google Fonts & Custom Design Tokens */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        html {
          scroll-behavior: smooth;
          background-color: #101010;
        }

        .font-sans-editorial {
          font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .font-editorial-serif {
          font-family: 'Instrument Serif', Georgia, serif;
        }

        .font-mono-tech {
          font-family: 'JetBrains Mono', monospace;
        }

        /* Custom subtle dark scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #101010;
        }
        ::-webkit-scrollbar-thumb {
          background: #2A2A2A;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #EF233C;
        }
      `}</style>

      {/* Sticky Editorial Navigation */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Flow */}
      <main>
        <Hero />
        <SelectedWorks />
        <About />
        <Expertise />
        <Contact />
      </main>

      {/* Minimal Editorial Footer */}
      <Footer />
    </div>
  );
}