import React, { useState, useEffect, useRef, useContext, createContext } from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';
import {
  ArrowUpRight,
  ArrowUp,
  Menu,
  X,
  Copy,
  Check,
  Layers,
  Cpu,
  Globe,
  Filter,
  Sparkles,
  Code2,
  Sun,
  Moon,
  Award,
  Upload,
  ChevronLeft,
  ChevronRight,
  Mail,
  Send,
  Github,
  Linkedin,
  Instagram,
  Clock,
  MapPin,
} from 'lucide-react';

/**
 * ============================================================================
 * CENTRALIZED PORTFOLIO DATA
 * All content, projects, skills, and contact links are stored here for easy
 * maintenance without modifying UI layout components.
 * ============================================================================
 */

const PROFILE_META = {
  monogram: 'Faa',
  fullName: 'Muhammad Faris Arrachman',
  roleLabel: 'Frontend Developer • UI/UX Designer • Network Enthusiast',
  location: 'Palembang, Indonesia',
  coordinates: "02°59'S 104°45'E",
  institution: 'Fasilkom, Universitas Sriwijaya (UNSRI)',
  vocationalBackground: 'Computer & Network Engineering (SMK TKJ)',
  availability: 'AVAILABLE FOR PROJECTS',
  year: '2026',
};

const NAV_LINKS = [
  { id: 'about', label: 'About Me', index: '01' },
  { id: 'skills', label: 'Skills', index: '02' },
  { id: 'projects', label: 'Projects', index: '03' },
  { id: 'experience', label: 'Experience', index: '04' },
  { id: 'contact', label: 'Contact', index: '05' },
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
    cursorPrompt: 'VIEW CASE ↗',
    role: 'Frontend & Web Implementation',
    stack: ['Laravel', 'Vite', 'PHP', 'JavaScript', 'MySQL'],
    image: '/sifest.jpeg',
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
    id: 'taskboard-app',
    index: '02',
    title: 'Interactive Taskboard Application',
    category: 'Web Application & Productivity Tool',
    year: '2025',
    featured: false,
    isPlaceholder: false,
    statusLabel: 'PRODUCTIVITY TOOL',
    cursorPrompt: 'VIEW CASE ↗',
    role: 'Frontend Developer',
    stack: ['React', 'JavaScript', 'Tailwind CSS', 'State Management'],
    image: '/taskboard.jpeg',
    summary:
      'Aplikasi taskboard interaktif untuk pengorganisasian tugas, manajemen alur kerja, dan pelacakan progres proyek secara efisien.',
    overview:
      'Dirancang untuk memberikan pengalaman manajemen tugas dan alur kerja yang intuitif dan terstruktur. Mengintegrasikan kolom status (To-Do, In Progress, Done) dengan navigasi cepat, antarmuka visual clean, serta sistem persistensi data lokal yang responsif.',
    architecturalNotes: [
      'Modular task card & column architecture dengan visual pipeline yang terorganisir.',
      'Optimasi alur interaksi pengguna berbasis antarmuka responsif dan minim gesekan.',
      'Pengorganisasian hierarki tugas, label prioritas, serta arsitektur state yang mudah dikembangkan.',
    ],
    previewType: 'taskboard',
  },
  {
    id: 'linktree-bio',
    index: '03',
    title: 'Personal Bio Linktree Platform',
    category: 'Responsive Web Page & Social Hub',
    year: '2025',
    featured: false,
    isPlaceholder: false,
    statusLabel: 'DIGITAL IDENTITY',
    cursorPrompt: 'VIEW CASE ↗',
    role: 'UI Designer & Web Implementation',
    stack: ['HTML5', 'CSS3', 'JavaScript', 'Responsive UI'],
    image: '/linktree.jpeg',
    summary:
      'Halaman bio link personal yang responsif dan elegan sebagai agregator identitas digital, jejaring sosial, dan portofolio.',
    overview:
      'Platform single-page responsive yang diformulasikan sebagai sentra koneksi digital personal. Menggabungkan estetika visual modern, micro-interactions halus pada tombol tautan, serta optimasi tampilan sempurna di layar smartphone.',
    architecturalNotes: [
      'Mobile-first responsive architecture dirancang presisi untuk rasio layar perangkat genggam.',
      'Micro-interactions hover states dan styling tombol dengan kontras tinggi serta aksesibilitas terjaga.',
      'Performa rendering ultra-cepat dengan beban aset minimal dan eksekusi instan.',
    ],
    previewType: 'linktree',
  },
];

const EXPERIENCE_DATA = [
  {
    index: '01',
    period: 'Internship',
    title: 'Magang — Divisi Maintenance',
    category: 'TELECOMMUNICATION INFRASTRUCTURE',
    location: 'Palembang, Sumatera Selatan',
    organization: 'PT Telkom Akses Sumatera Selatan',
    role: 'Maintenance Division Intern',
    status: 'VERIFIED INTERNSHIP',
    description:
      'Melaksanakan program magang di PT Telkom Akses Wilayah Telekomunikasi Sumatera Selatan pada Divisi Maintenance, berfokus pada pemeliharaan infrastruktur kabel fiber optik, monitoring stabilitas link broadband, serta penanganan gangguan fisik dan perangkat jaringan.',
    tags: ['Network Maintenance'],
    previewType: 'telkom-maintenance',
    hasPhotoSlot: false,
    highlights: [
      'Pemeliharaan dan perbaikan jaringan fiber optic (FTTH) pada Optical Distribution Point (ODP) dan Optical Distribution Cabinet (ODC).',
      'Troubleshooting gangguan redaman tinggi dan pengukuran kualitas transmisi optik menggunakan OTDR dan Power Meter.',
      'Koordinasi penanganan gangguan di lapangan bersama tim teknisi maintenance Telkom Akses Wilayah Sumatera Selatan.',
    ],
    tools: ['Fiber Optic', 'OTDR', 'Optical Power Meter', 'Fiber Splicer', 'FTTH Toolkit', 'Winbox'],
  },
  {
    index: '02',
    period: '2026',
    title: 'Staff Pubdok — Sharing Session Magang & Kerja Praktik 2026',
    category: 'EVENT COMMITTEE // MEDIA & CREATIVE',
    location: 'Fasilkom UNSRI',
    organization: 'Sharing Session Magang & Kerja Praktik 2026',
    role: 'Staff Publikasi & Dokumentasi (Pubdok)',
    status: 'COMPLETED EVENT',
    description:
      'Bertanggung jawab atas seluruh aspek visual dokumentasi, publikasi media sosial, serta aset kreatif pada perhelatan Sharing Session Magang & Kerja Praktik 2026.',
    tags: ['Pubdok', 'Figma', 'Photography', 'Social Media Publishing', 'Documentation'],
    previewType: 'sharingsession-pubdok',
    hasPhotoSlot: true,
    docPlaceholderName: 'sertifikatssmkp.png',
    docImage: '/sertifikatssmkp.png',
    docTitle: 'Sertifikat / Dokumentasi Sharing Session 2026',
    highlights: [
      'Merancang materi publikasi media sosial (feed, story, poster digital) dengan standar visual branding yang konsisten.',
      'Mendokumentasikan seluruh rangkaian sesi presentasi narasumber dan diskusi interaktif mahasiswa secara profesional.',
      'Mengelola pengarsipan aset visual dan dokumentasi digital pasca-kegiatan.',
    ],
    tools: ['Figma', 'Adobe Photoshop', 'Canva', 'Camera Rig', 'Social Media Management'],
  },
  {
    index: '03',
    period: 'Department Event',
    title: 'Staff Pubdok & Operator — PKKMB Departemen Sistem Informasi',
    category: 'CAMPUS EVENT // MEDIA & OPERATIONS',
    location: 'Fasilkom UNSRI',
    organization: 'Departemen Sistem Informasi Fasilkom UNSRI',
    role: 'Staff Pubdok & Operator Teknis',
    status: 'VERIFIED COMMITTEE',
    description:
      'Bertindak sebagai staff publikasi dokumentasi sekaligus operator teknis multimedia dan audio-visual dalam rangkaian Pengenalan Kehidupan Kampus Mahasiswa Baru (PKKMB) Departemen Sistem Informasi.',
    tags: ['Operator', 'Pubdok', 'OBS Studio', 'Audio/Visual Rig', 'Live Presentation'],
    previewType: 'pkkmb-pubdok',
    hasPhotoSlot: true,
    docPlaceholderName: 'sertifikatpkkmb.png',
    docImage: '/sertifikatpkkmb.png',
    docTitle: 'Sertifikat / Dokumentasi PKKMB Sistem Informasi',
    highlights: [
      'Mengoperasikan sistem display, audio-visual, dan live presentation screen selama jalannya agenda PKKMB Jurusan.',
      'Membuat dokumentasi foto & video interaktif momen orientasi mahasiswa baru Sistem Informasi.',
      'Mengatur alur materi presentasi dosen dan narasumber agar tersaji tepat waktu dan responsif.',
    ],
    tools: ['OBS Studio', 'Audio/Visual Rig', 'Figma', 'Camera Rig', 'Presentation Systems'],
  },
  {
    index: '04',
    period: '2026',
    title: 'Staff TID & Operator — SIFEST 2026',
    category: 'FLAGSHIP FESTIVAL // IT & MULTIMEDIA OPERATIONS',
    location: 'HIMSI Fasilkom UNSRI',
    organization: 'SIFEST 2026 (Sistem Informasi Festival)',
    role: 'Staff Teknologi Informasi & Desain (TID) / Operator',
    status: 'FLAGSHIP EVENT COMMITTEE',
    description:
      'Bertugas di divisi Teknologi Informasi dan Desain (TID) serta sebagai operator sistem teknis pada perhelatan akbar tahunan Sistem Informasi Festival (SIFEST) 2026.',
    tags: ['Staff TID', 'Operator', 'Event Technology', 'Display Controls', 'Digital Operations'],
    previewType: 'sifest-tid',
    hasPhotoSlot: true,
    isBlackout: true,
    docPlaceholderName: 'sertif-sifest.png',
    docImage: null,
    docTitle: 'SIFEST 2026 (Sertifikat Belum Tersedia)',
    highlights: [
      'Mendukung operasional teknologi informasi, manajemen aset digital, dan integrasi sistem acara festival.',
      'Mengoperasikan perangkat teknis, kontrol display screen panggung utama, dan sistem pengumuman lomba.',
      'Berkolaborasi dengan tim web dev dan pubdok guna menjamin kelancaran platform digital SIFEST 2026.',
    ],
    tools: ['Event IT Systems', 'Multimedia Rig', 'Hardware Controls', 'Figma', 'Git'],
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
    handle: '88farisrachman@gmail.com',
    href: 'mailto:88farisrachman@gmail.com',
    actionLabel: 'Send Mail',
    copyable: true,
  },
  {
    index: '02',
    label: 'GitHub',
    handle: 'github.com/Faa-07',
    href: 'https://github.com/Faa-07',
    actionLabel: 'Inspect Code',
    copyable: false,
  },
  {
    index: '03',
    label: 'Instagram',
    handle: '@frs8127_',
    href: 'https://instagram.com/frs8127_',
    actionLabel: 'Follow',
    copyable: false,
  },
];

/**
 * ============================================================================
 * ARCHITECTURAL PRIMITIVES & LIVE PALEMBANG TELEMETRY HOOK
 * ============================================================================
 */

function usePalembangClock() {
  const formatTime = () => {
    try {
      const formatted = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      }).format(new Date());
      return `${formatted} WIB`;
    } catch {
      return 'WIB // GMT+7';
    }
  };

  const [timeString, setTimeString] = useState(formatTime);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeString(formatTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeString;
}

function RegistrationCrosshair({ className = '' }) {
  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none select-none font-mono-tech text-[11px] leading-none text-[#EF233C] ${className}`}
    >
      +
    </span>
  );
}

function BlueprintGridOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="max-w-[1380px] mx-auto h-full px-5 sm:px-8 lg:px-12">
        <div className="h-full grid grid-cols-2 lg:grid-cols-4 border-x border-[#2A2A2A]/35">
          <div className="border-r border-[#2A2A2A]/25 h-full" />
          <div className="hidden lg:block border-r border-[#2A2A2A]/25 h-full" />
          <div className="hidden lg:block border-r border-[#2A2A2A]/25 h-full" />
          <div className="h-full" />
        </div>
      </div>
    </div>
  );
}

function CustomSpringCursor({ label }) {
  const prefersReducedMotion = useReducedMotion();
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [visible, setVisible] = useState(false);

  const springConfig = { damping: 28, stiffness: 320, mass: 0.4 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX + 16);
      cursorY.set(e.clientY + 16);
      if (!visible) setVisible(true);
    };

    const handleMouseLeave = () => setVisible(false);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, prefersReducedMotion, visible]);

  if (prefersReducedMotion || !label || !visible) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{ x: smoothX, y: smoothY }}
      className="pointer-events-none fixed top-0 left-0 z-50 hidden md:flex items-center gap-1.5 rounded-none bg-[#EF233C] px-3 py-1.5 font-mono-tech text-[10px] font-semibold tracking-[0.18em] uppercase text-[#F1EEE8] shadow-lg"
    >
      <span>{label}</span>
    </motion.div>
  );
}

/**
 * ============================================================================
 * SWISS EDITORIAL BAND PRIMITIVE
 * Supports two architectural modes:
 * - 'stacked': Full-width top editorial header with hairline telemetry rule,
 *   followed by full 12-column content below (About, Skills, Projects, Experience).
 * - 'split': Asymmetric 12-column row (sticky title left + content right).
 * ============================================================================
 */

function SwissEditorialBand({
  id,
  index,
  title,
  subtitle,
  children,
  className = '',
  layout = 'split',
  headerMeta = null,
}) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id={id}
      className={`relative z-10 border-t border-[#2A2A2A] py-20 md:py-28 scroll-mt-4 ${className}`}
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 relative">
        {/* Architectural '+' Registration Marks on Top Hairline */}
        <RegistrationCrosshair className="hidden sm:inline-block absolute -top-[87px] md:-top-[119px] left-5 sm:left-8 lg:left-12" />
        <RegistrationCrosshair className="hidden sm:inline-block absolute -top-[87px] md:-top-[119px] right-5 sm:right-8 lg:right-12" />

        {layout === 'stacked' ? (
          <div className="space-y-10 md:space-y-14">
            {/* TOP HEADER: Bold Uppercase Section Title + Structural Rule */}
            <div className="pb-6 md:pb-8 border-b border-[#2A2A2A] flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5 font-mono-tech text-xs tracking-[0.2em] uppercase mb-3">
                  <span className="w-1.5 h-1.5 rounded-none bg-[#EF233C]" />
                  <span className="text-[#EF233C] font-semibold">{index}</span>
                  <span className="text-[#2A2A2A]">/</span>
                  <span className="text-[#8E8D8A]">{subtitle}</span>
                </div>

                <motion.h2
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-4xl sm:text-5xl xl:text-[3.75rem] font-extrabold uppercase tracking-[-0.045em] leading-[0.94] text-[#F1EEE8]"
                >
                  {title}
                </motion.h2>
              </div>

              {/* Right-Side Architectural Hairline & Telemetry Meta */}
              <div className="hidden sm:flex items-center gap-3.5 flex-1 max-w-xs md:max-w-md lg:max-w-xl justify-end pb-1.5">
                <div className="h-[1px] flex-1 bg-[#2A2A2A]" />
                <span className="w-2.5 h-[1px] bg-[#EF233C] shrink-0" />
                <span className="font-mono-tech text-[10px] tracking-[0.22em] uppercase text-[#8E8D8A] shrink-0">
                  {headerMeta || `SEC.${index} // ${subtitle}`}
                </span>
              </div>
            </div>

            {/* BOTTOM CONTENT: Full 12-Column Editorial Space */}
            <div className="w-full">{children}</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT COLUMN: Sticky Bold Tight-Tracked Uppercase Title */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 self-start">
              <div className="flex items-center gap-2.5 font-mono-tech text-xs tracking-[0.2em] uppercase mb-3">
                <span className="text-[#EF233C] font-semibold">{index}</span>
                <span className="text-[#2A2A2A]">/</span>
                <span className="text-[#8E8D8A]">{subtitle}</span>
              </div>

              <motion.h2
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-4xl sm:text-5xl xl:text-[3.35rem] font-extrabold uppercase tracking-[-0.045em] leading-[0.94] text-[#F1EEE8]"
              >
                {title}
              </motion.h2>
            </div>

            {/* RIGHT COLUMN: Baseline-Aligned Editorial Content */}
            <div className="lg:col-span-8">{children}</div>
          </div>
        )}
      </div>
    </section>
  );
}

/**
 * ============================================================================
 * STICKY EDITORIAL NAVBAR WITH LIVE STUDIO TELEMETRY
 * ============================================================================
 */




/**
 * ============================================================================
 * FLOATING SCROLL TO TOP BUTTON
 * ============================================================================
 */

function FloatingDock({ theme, onToggleTheme }) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      {/* Theme Toggle Button */}
      <button
        type="button"
        onClick={onToggleTheme}
        className="rounded-none flex items-center justify-center w-10 h-10 bg-[#141414] hover:bg-[#1D1D1D] border border-[#2A2A2A] hover:border-[#EF233C] text-[#F1EEE8] shadow-2xl transition-all"
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        aria-label="Toggle Light and Dark Mode"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-[#EF233C]" />
        ) : (
          <Moon className="w-4 h-4 text-[#EF233C]" />
        )}
      </button>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="rounded-none flex items-center justify-center w-10 h-10 bg-[#141414] hover:bg-[#1D1D1D] border border-[#2A2A2A] hover:border-[#EF233C] text-[#F1EEE8] shadow-2xl transition-all"
          title="Scroll to Top"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </aside>
  );
}

function Navbar({ activeSection, palembangTime, theme, onToggleTheme }) {
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
            ? theme === 'light'
              ? 'bg-[#F8F7F4]/94 backdrop-blur-md border-b border-[#DCD6CC]'
              : 'bg-[#101010]/94 backdrop-blur-md border-b border-[#2A2A2A]'
            : theme === 'light'
            ? 'bg-[#F8F7F4] border-b border-[#DCD6CC]/60'
            : 'bg-[#101010] border-b border-[#2A2A2A]/60'
        }`}
      >
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-4">
          {/* Brand Wordmark + Live Studio Telemetry */}
          <div className="flex items-center gap-4 lg:gap-6">
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
            </a>

            {/* Live Palembang WIB Clock & Geographic Coordinates */}
            <div className="hidden xl:flex items-center gap-3 border-l border-[#2A2A2A] pl-5 font-mono-tech text-[11px] tracking-[0.16em] uppercase text-[#8E8D8A]">
              <span className="inline-block w-1.5 h-1.5 rounded-none bg-[#EF233C]" />
              <span className="text-[#F1EEE8]">{palembangTime}</span>
              <span className="text-[#2A2A2A]">/</span>
              <span>{PROFILE_META.coordinates}</span>
            </div>
          </div>

          {/* Desktop Editorial Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-9" aria-label="Primary Navigation">
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

          {/* Header Theme Switcher & Mobile Hamburger Trigger */}
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onToggleTheme}
              className="rounded-none inline-flex items-center gap-1.5 border border-[#2A2A2A] hover:border-[#EF233C] bg-[#141414] hover:bg-[#1D1D1D] px-2.5 py-1.5 font-mono-tech text-xs tracking-wider text-[#F1EEE8] transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Light and Dark Mode"
            >
              {theme === 'dark' ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-[#EF233C]" />
                  <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-widest">LIGHT</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-[#EF233C]" />
                  <span className="hidden sm:inline text-[11px] font-semibold uppercase tracking-widest">DARK</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="md:hidden rounded-none inline-flex items-center justify-center w-11 h-11 border border-[#2A2A2A] bg-[#1D1D1D] text-[#F1EEE8] hover:border-[#EF233C] transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
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

            <div className="border-t border-[#2A2A2A] pt-6 space-y-3 font-mono-tech text-xs text-[#8E8D8A]">
              <div className="flex items-center justify-between pb-2 border-b border-[#2A2A2A]/40">
                <span className="text-[11px] uppercase tracking-wider text-[#8E8D8A]">THEME:</span>
                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="rounded-none inline-flex items-center gap-2 border border-[#2A2A2A] hover:border-[#EF233C] bg-[#141414] px-3 py-1.5 text-xs text-[#F1EEE8] transition-colors"
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-3.5 h-3.5 text-[#EF233C]" />
                      <span>LIGHT MODE</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-3.5 h-3.5 text-[#EF233C]" />
                      <span>DARK MODE</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[#F1EEE8] uppercase tracking-widest">{PROFILE_META.fullName}</p>
              <p>
                {PROFILE_META.location} — {palembangTime}
              </p>
              <p>{PROFILE_META.coordinates}</p>
              <div className="flex items-center gap-2 pt-2 text-[#EF233C]">
                <span className="w-2 h-2 rounded-none bg-[#EF233C] animate-pulse" />
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
 * INFINITE KINETIC MARQUEE STRIP
 * ============================================================================
 */

function InfiniteMarqueeStrip() {
  const prefersReducedMotion = useReducedMotion();
  const marqueeText =
    'FRONTEND ENGINEERING ✦ UI/UX ARCHITECTURE ✦ NETWORK INFRASTRUCTURE ✦ SIFEST 2026 ✦ PALEMBANG, INDONESIA ✦ ';

  return (
    <div className="relative mt-8 sm:mt-10 border-y border-[#2A2A2A] bg-[#101010] py-3 overflow-hidden select-none">
      <RegistrationCrosshair className="absolute top-1 left-2" />
      <RegistrationCrosshair className="absolute top-1 right-2" />

      {prefersReducedMotion ? (
        <div className="px-4 font-mono-tech text-[11px] tracking-[0.22em] uppercase text-[#8E8D8A] text-center">
          {marqueeText}
        </div>
      ) : (
        <div className="flex w-max animate-sibal-marquee hover:[animation-play-state:paused]">
          {[0, 1, 2].map((loopIdx) => (
            <div
              key={loopIdx}
              aria-hidden={loopIdx > 0}
              className="flex items-center whitespace-nowrap font-mono-tech text-[11px] tracking-[0.22em] uppercase text-[#F1EEE8]/90 pr-6"
            >
              <span>FRONTEND ENGINEERING</span>
              <span className="mx-4 text-[#EF233C]">✦</span>
              <span>UI/UX ARCHITECTURE</span>
              <span className="mx-4 text-[#EF233C]">✦</span>
              <span>NETWORK INFRASTRUCTURE</span>
              <span className="mx-4 text-[#EF233C]">✦</span>
              <span>SIFEST 2026</span>
              <span className="mx-4 text-[#EF233C]">✦</span>
              <span>PALEMBANG, INDONESIA</span>
              <span className="mx-4 text-[#EF233C]">✦</span>
            </div>
          ))}
        </div>
      )}
    </div>
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
    <div className="relative pt-8 sm:pt-12 md:pt-14 select-none">
      {/* Main Monumental Headline:
          "Crafting interfaces & resilient systems through design and code." */}
      <h1
        aria-label="Crafting interfaces & resilient systems through design and code."
        className="font-extrabold text-[#F1EEE8] tracking-[-0.038em] leading-[0.95] uppercase"
        style={{ fontSize: 'clamp(2.45rem, 6.6vw, 6.85rem)' }}
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

      {/* Full-Width 1px-Bordered Infinite Kinetic Marquee */}
      <InfiniteMarqueeStrip />
    </div>
  );
}

/**
 * ============================================================================
 * HERO SECTION
 * ============================================================================
 */

function Hero({ palembangTime }) {
  const heroRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const handleExploreProjects = (e) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };


  return (
    <section
      id="home"
      ref={heroRef}
      className="relative z-10 overflow-x-clip pt-6 pb-16 sm:pt-10 sm:pb-24 md:pb-28"
    >
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Editorial Telemetry Bar */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative flex items-center justify-end pb-2 font-mono-tech text-[11px] tracking-[0.16em] uppercase"
        >
          <div className="flex items-center gap-2.5 text-[#F1EEE8]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-none bg-[#EF233C] opacity-75" />
              <span className="relative inline-flex rounded-none h-2.5 w-2.5 bg-[#EF233C]" />
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
          className="mt-8 sm:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
        >
          {/* Role & Supporting Biography Copy */}
          <div className="lg:col-span-7 space-y-4">
            <p className="font-mono-tech text-xs sm:text-[13px] tracking-[0.14em] uppercase text-[#EF233C]">
              {PROFILE_META.roleLabel}
            </p>
          </div>

          {/* Primary CTA */}
          <div className="lg:col-span-5 flex items-center justify-start lg:justify-end">
            <a
              href="#projects"
              onClick={handleExploreProjects}
              className="group rounded-none inline-flex items-center gap-3 bg-[#EF233C] hover:bg-[#B91C1C] text-[#F1EEE8] font-semibold text-sm tracking-wide uppercase px-7 py-4 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#EF233C] focus:ring-offset-2 focus:ring-offset-[#101010]"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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

/**
 * ============================================================================
 * INTERACTIVE 3D PERSPECTIVE PREVIEW CARD & FLOATING WIREFRAME
 * ============================================================================
 */

/**
 * ============================================================================
 * SIBAL DESIGN 4 GLOWING CORNER RETICLES
 * Distinctive cybernetic corner registration brackets matching sibaldesign.com
 * Elevated in 3D space with high-intensity glowing reticle nodes.
 * ============================================================================
 */

function SibalCornerReticles({ proximity = 1 }) {
  return (
    <div style={{ transform: 'translateZ(26px)' }} className="pointer-events-none">
      {/* Top Left Bracket */}
      <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[#EF233C] z-30 drop-shadow-[0_0_10px_rgba(239,35,60,0.95)] flex items-start justify-start">
        <span className="w-1.5 h-1.5 bg-[#FFFFFF] block shadow-[0_0_6px_#FFFFFF]" />
      </div>
      {/* Top Right Bracket */}
      <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[#EF233C] z-30 drop-shadow-[0_0_10px_rgba(239,35,60,0.95)] flex items-start justify-end">
        <span className="w-1.5 h-1.5 bg-[#FFFFFF] block shadow-[0_0_6px_#FFFFFF]" />
      </div>
      {/* Bottom Left Bracket */}
      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[#EF233C] z-30 drop-shadow-[0_0_10px_rgba(239,35,60,0.95)] flex items-end justify-start">
        <span className="w-1.5 h-1.5 bg-[#FFFFFF] block shadow-[0_0_6px_#FFFFFF]" />
      </div>
      {/* Bottom Right Bracket */}
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[#EF233C] z-30 drop-shadow-[0_0_10px_rgba(239,35,60,0.95)] flex items-end justify-end">
        <span className="w-1.5 h-1.5 bg-[#FFFFFF] block shadow-[0_0_6px_#FFFFFF]" />
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * SIBAL DESIGN 3D FLOATING CONTEXT & ELEMENT
 * Enables true multi-layer 3D floating parallax for text, headings, and buttons
 * ============================================================================
 */

const Modal3DContext = createContext({ textX: 0, textY: 0, isNear: false });

function Floating3DElement({
  children,
  depth = 28,
  className = '',
  style = {},
  as: Component = 'div',
  ...props
}) {
  const { textX, textY } = useContext(Modal3DContext);
  const factor = depth / 28;
  const shiftX = textX * factor;
  const shiftY = textY * factor;

  return (
    <Component
      className={className}
      style={{
        ...style,
        transform: `translate3d(${shiftX.toFixed(2)}px, ${shiftY.toFixed(2)}px, ${depth}px)`,
        transition: 'transform 0.16s cubic-bezier(0.2, 0.9, 0.4, 1)',
        transformStyle: 'preserve-3d',
      }}
      {...props}
    >
      {children}
    </Component>
  );
}

/**
 * ============================================================================
 * INTERACTIVE FULL-MODAL 3D PERSPECTIVE CARD (SIBAL DESIGN STYLE)
 * - True 3D perspective tilt with deep spring physics
 * - Dynamic perimeter edge spotlight glow tracking cursor (Sibal Design)
 * - Multi-layer 3D floating typography space
 * ============================================================================
 */

function Interactive3DFullModalCard({ children, onClick, className = '' }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [parallax, setParallax] = useState({ textX: 0, textY: 0, isNear: false });
  const [edgePos, setEdgePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Distance from card perimeter
      const distX = Math.max(0, Math.max(rect.left - e.clientX, e.clientX - rect.right));
      const distY = Math.max(0, Math.max(rect.top - e.clientY, e.clientY - rect.bottom));
      const distance = Math.hypot(distX, distY);

      // Detection threshold: activates up to 450px outside card
      const isNear = distance < 450;
      if (!isNear) {
        setRotateX(0);
        setRotateY(0);
        setParallax({ textX: 0, textY: 0, isNear: false });
        return;
      }

      // Smooth 3D tilt tracking cursor (-6.5 to +6.5 deg)
      const normX = Math.max(-1.2, Math.min(1.2, (x - centerX) / centerX));
      const normY = Math.max(-1.2, Math.min(1.2, (y - centerY) / centerY));

      setRotateX(-normY * 6.5);
      setRotateY(normX * 8);

      // Subtle balanced parallax offsets for floating typography (shifts up to 6px)
      setParallax({
        textX: normX * 6,
        textY: normY * 6,
        isNear: true,
      });

      // Clamped to perimeter for the glowing edge border
      const clampedX = Math.max(0, Math.min(rect.width, x));
      const clampedY = Math.max(0, Math.min(rect.height, y));
      setEdgePos({ x: clampedX, y: clampedY });
    };

    const handleMouseLeave = () => {
      setRotateX(0);
      setRotateY(0);
      setParallax({ textX: 0, textY: 0, isNear: false });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('blur', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('blur', handleMouseLeave);
    };
  }, [prefersReducedMotion]);

  return (
    <div className="w-full max-w-5xl my-auto flex items-center justify-center py-6 px-2 sm:px-4" style={{ perspective: '1600px' }}>
      <motion.div
        ref={cardRef}
        onClick={onClick}
        initial={prefersReducedMotion ? false : { opacity: 0, rotateX: 20, rotateY: -8, y: 35, scale: 0.94 }}
        animate={{
          opacity: 1,
          rotateX,
          rotateY,
          y: 0,
          scale: 1,
        }}
        exit={prefersReducedMotion ? false : { opacity: 0, rotateX: -12, y: 20, scale: 0.96 }}
        transition={{
          rotateX: { type: 'spring', stiffness: 220, damping: 20 },
          rotateY: { type: 'spring', stiffness: 220, damping: 20 },
          default: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className={`relative z-10 w-full rounded-none bg-[#090C10] border border-[#1E2630] text-[#F1EEE8] shadow-[0_25px_80px_rgba(0,0,0,0.95)] ${className}`}
      >
        <SibalCornerReticles />

        {/* Sibal Design Dynamic Perimeter Edge Spotlight Hairline (Only on Border Line, Inside is 100% Clear) */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] z-30 overflow-visible"
        >
          <defs>
            <radialGradient
              id="sibalEdgeGlowGradient"
              gradientUnits="userSpaceOnUse"
              cx={edgePos.x}
              cy={edgePos.y}
              r="260"
            >
              <stop offset="0%" stopColor="#EF233C" stopOpacity="1" />
              <stop offset="35%" stopColor="#EF233C" stopOpacity="0.85" />
              <stop offset="70%" stopColor="#EF233C" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#EF233C" stopOpacity="0" />
            </radialGradient>
            <filter id="sibalEdgeGlowBlur" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Glowing laser hairline - purely on the perimeter stroke, inside is completely transparent */}
          <rect
            x="0.75"
            y="0.75"
            width="calc(100% - 1.5px)"
            height="calc(100% - 1.5px)"
            fill="none"
            stroke="url(#sibalEdgeGlowGradient)"
            strokeWidth="1.5"
            filter="url(#sibalEdgeGlowBlur)"
            style={{
              opacity: parallax.isNear ? 1 : 0.2,
              transition: 'opacity 0.2s ease',
            }}
          />
        </svg>

        {/* Subtle Cybernetic Scanline Texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <Modal3DContext.Provider value={parallax}>
          <div className="relative z-10 w-full" style={{ transformStyle: 'preserve-3d' }}>
            {children}
          </div>
        </Modal3DContext.Provider>
      </motion.div>
    </div>
  );
}

function Interactive3DPreviewFrame({ children, className = '' }) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = -((y - centerY) / centerY) * 11;
    const rotY = ((x - centerX) / centerX) * 11;

    setRotateX(rotX);
    setRotateY(rotY);
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.22,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlare((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 1100 }}
      className={`relative overflow-hidden cursor-crosshair select-none ${className}`}
    >
      <motion.div
        animate={{ rotateX, rotateY }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="w-full h-full relative"
      >
        {children}

        {/* 3D Specular Light Glare Sheen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glare.opacity,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(239, 35, 60, 0.25), rgba(255, 255, 255, 0.16) 30%, transparent 65%)`,
          }}
        />

        {/* 3D Holographic Spatial Badge */}
        <div
          style={{ transform: 'translateZ(32px)' }}
          className="pointer-events-none absolute bottom-3 right-3 hidden sm:flex items-center gap-1.5 font-mono-tech text-[9px] tracking-widest uppercase text-[#EF233C] bg-[#101010]/92 border border-[#2A2A2A] px-2 py-0.5 shadow-md"
        >
          <span className="w-1.5 h-1.5 bg-[#EF233C] animate-ping" />
          <span>3D PERSPECTIVE // TILT</span>
        </div>
      </motion.div>
    </div>
  );
}

function ProjectArtworkPreview({ project, type, compact = false }) {
  const currentProject =
    project ||
    PROJECTS_DATA.find((p) => p.previewType === type || p.id === type) ||
    PROJECTS_DATA[0];

  const imgSrc =
    currentProject?.image ||
    (type === 'sifest'
      ? '/sifest.jpeg'
      : type === 'taskboard'
      ? '/taskboard.jpeg'
      : '/linktree.jpeg');

  const title = currentProject?.title || 'Project Showcase';

  return (
    <div
      className={`relative w-full ${
        compact ? 'min-h-[220px]' : 'min-h-[280px] sm:min-h-[380px]'
      } bg-[#07090C] flex flex-col justify-between overflow-hidden select-none`}
    >
      {/* Top Browser / Window Header */}
      <div className="relative z-10 flex items-center justify-between border-b border-[#1E2630] bg-[#0A0D12] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-none bg-[#EF233C]" />
          <span className="w-2.5 h-2.5 rounded-none bg-[#2A3441]" />
          <span className="w-2.5 h-2.5 rounded-none bg-[#1E2630]" />
          <span className="font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#8E8D8A] ml-2">
            {currentProject?.id || type}.faris.dev
          </span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href={imgSrc}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 font-mono-tech text-[9px] uppercase tracking-wider text-[#F1EEE8] bg-[#141414] hover:bg-[#EF233C] border border-[#2A2A2A] transition-colors"
          >
            Lihat Ukuran Penuh ↗
          </a>
          <span className="font-mono-tech text-[10px] text-[#EF233C] font-bold">
            FIG. 0{currentProject?.index || '1'}
          </span>
        </div>
      </div>

      {/* Main Real Image Showcase Stage */}
      <div className="relative z-10 my-2 aspect-[16/9] w-full bg-[#030406] flex items-center justify-center overflow-hidden group/art">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-contain bg-black/85 transition-transform duration-500 group-hover/art:scale-[1.02]"
        />
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
      </div>

      {/* Bottom Telemetry Bar */}
      <div className="relative z-10 flex items-center justify-between font-mono-tech text-[9px] tracking-[0.16em] uppercase text-[#8E8D8A] px-4 py-2 border-t border-[#1E2630] bg-[#0A0D12]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#EF233C] animate-pulse" />
          <span className="text-[#F1EEE8]">{title}</span>
        </div>
        <span className="text-[#EF233C]">VERIFIED BUILD</span>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * ROW 01 — ABOUT ME (TWO-COLUMN EDITORIAL BIOGRAPHY)
 * ============================================================================
 */

function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SwissEditorialBand
      id="about"
      index="01"
      subtitle="INTRODUCTION"
      title="ABOUT ME"
      layout="stacked"
      headerMeta="PROFILE // BIOGRAPHY"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start lg:items-center">
        {/* Editorial Introduction Copy (Left 7–8 cols) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7 xl:col-span-8 space-y-6"
        >
          <p className="text-2xl sm:text-3xl lg:text-[2rem] font-medium text-[#F1EEE8] leading-[1.35] tracking-[-0.025em] max-w-3xl">
            Hello, I&apos;m{' '}
            <span className="text-[#EF233C] font-semibold">Muhammad Faris Arrachman</span> — an
            Information Systems undergraduate at Fasilkom, Universitas Sriwijaya (UNSRI), based in
            Palembang, Indonesia.
          </p>

          <div className="space-y-4 max-w-2xl">
            <p className="text-base sm:text-[17px] text-[#8E8D8A] leading-relaxed">
              Starting from a vocational foundation in{' '}
              <span className="text-[#F1EEE8]">Computer &amp; Network Engineering (SMK TKJ)</span>, I
              developed an appreciation for how network infrastructure, routing, and low-level
              systems operate beneath the surface before anything renders on screen.
            </p>

            <p className="text-base sm:text-[17px] text-[#8E8D8A] leading-relaxed">
              Today, my work centers on{' '}
              <span className="text-[#F1EEE8]">
                Frontend Development, UI/UX Design, and web system architecture
              </span>
              —crafting typographically sharp, responsive editorial interfaces backed by structured
              software engineering.
            </p>
          </div>

          {/* Compact Metadata Strip */}
          <div className="pt-6 border-t border-[#2A2A2A] grid grid-cols-1 sm:grid-cols-3 gap-5 font-mono-tech text-xs max-w-2xl">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#EF233C] block mb-1">
                LOCATION
              </span>
              <span className="text-[#F1EEE8] text-sm">Palembang, ID</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#EF233C] block mb-1">
                CURRENT STUDY
              </span>
              <span className="text-[#F1EEE8] text-sm">Fasilkom UNSRI</span>
            </div>
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#EF233C] block mb-1">
                BACKGROUND
              </span>
              <span className="text-[#F1EEE8] text-sm">SMK TKJ</span>
            </div>
          </div>
        </motion.div>

        {/* Sharp 0px Minimalist Portrait / Monogram Frame (Right 4–5 cols, balanced size) */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="lg:col-span-5 xl:col-span-4 w-full max-w-[380px] mx-auto lg:ml-auto lg:mr-0"
        >
          <div className="relative rounded-none bg-[#1D1D1D] border border-[#2A2A2A] p-4">
            <RegistrationCrosshair className="absolute -top-[7px] -left-[4px]" />
            <RegistrationCrosshair className="absolute -top-[7px] -right-[4px]" />
            <RegistrationCrosshair className="absolute -bottom-[7px] -left-[4px]" />
            <RegistrationCrosshair className="absolute -bottom-[7px] -right-[4px]" />

            <div className="relative aspect-[4/5] w-full rounded-none bg-[#121212] border border-[#2A2A2A] overflow-hidden flex flex-col justify-between p-4 group">
              {/* Profile Photo */}
              <img
                src="/fotoprofil.png"
                alt={PROFILE_META.fullName}
                className="absolute inset-0 w-full h-full object-cover object-top filter grayscale contrast-105 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                loading="eager"
              />

              {/* Gradient Vignette for Telemetry Readability */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none"
              />

              {/* Subtle Red Scanline Grid Overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage:
                    'radial-gradient(circle at center, #EF233C 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Top HUD Metadata */}
              <div className="relative z-10 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[#F1EEE8] bg-black/40 backdrop-blur-sm px-2.5 py-1 border border-[#2A2A2A]/80">
                <span>PORTRAIT // ARCHIVE</span>
                <span className="text-[#EF233C] font-semibold">FIG. 01</span>
              </div>

              {/* Bottom HUD Coordinates */}
              <div className="relative z-10 border-t border-white/10 pt-2 flex items-center justify-between font-mono-tech text-[9px] tracking-[0.14em] uppercase text-[#F1EEE8] bg-black/40 backdrop-blur-sm px-2.5 py-1.5 border border-[#2A2A2A]/80">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-none bg-[#EF233C] animate-pulse" />
                  <span>PALEMBANG, ID</span>
                </span>
                <span className="text-[#8E8D8A]">{PROFILE_META.coordinates}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.12em] uppercase text-[#8E8D8A]">
              <span>Palembang, ID / Fasilkom UNSRI / SMK TKJ</span>
            </div>
          </div>
        </motion.div>
      </div>
    </SwissEditorialBand>
  );
}

/**
 * ============================================================================
 * ROW 02 — SKILLS (4-COLUMN ARCHITECTURAL GRID ALIGNED TO BLUEPRINT)
 * ============================================================================
 */

function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <SwissEditorialBand
      id="skills"
      index="02"
      subtitle="TOOLKIT & STACK"
      title="SKILLS"
      layout="stacked"
      headerMeta="04 CORE PILLARS"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#2A2A2A] bg-[#101010]">
        {EXPERTISE_PILLARS.map((pillar, idx) => (
          <motion.div
            key={pillar.index}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.05 }}
            className="group relative border-r border-b border-[#2A2A2A] p-5 sm:p-6 xl:p-7 flex flex-col justify-between hover:bg-[#1D1D1D] transition-colors duration-300 rounded-none"
          >
            <RegistrationCrosshair className="absolute -top-[7px] -right-[4px]" />

            <div>
              <div className="flex items-center justify-between pb-3.5 border-b border-[#2A2A2A]">
                <span className="font-mono-tech text-xs font-semibold text-[#EF233C]">
                  {pillar.index} / CATEGORY
                </span>
                <span className="font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[#8E8D8A]">
                  0{pillar.skills.length} ITEMS
                </span>
              </div>

              <h3 className="mt-4 text-lg xl:text-xl font-bold tracking-[-0.02em] text-[#F1EEE8] group-hover:text-[#EF233C] transition-colors leading-snug">
                {pillar.category}
              </h3>

              <p className="mt-2 text-xs text-[#8E8D8A] leading-relaxed">{pillar.subtitle}</p>
            </div>

            <div className="mt-7 pt-4 border-t border-[#2A2A2A] flex flex-wrap gap-2">
              {pillar.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-none font-mono-tech text-[11px] xl:text-xs px-2.5 xl:px-3 py-1.5 bg-[#141414] border border-[#2A2A2A] text-[#F1EEE8] group-hover:border-[#EF233C]/50 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SwissEditorialBand>
  );
}

/**
 * ============================================================================
 * ROW 03 — PROJECTS (FEATURED SHOWCASE + SECONDARY ENTRIES IN RIGHT COLUMN)
 * ============================================================================
 */

/**
 * ============================================================================
 * SIBAL DESIGN RESPONSIVE VIEWPORT STACK WITH SCROLL STACKING ANIMATION
 * Exact 1:1 Physics and Mathematics from sibaldesign.com (#work / .hz__stage):
 * - GPU-Accelerated Framer Motion useScroll + useTransform (Zero main-thread lag)
 * - True Single-Card Focus: Pending cards are 100% invisible (opacity: 0, y: 120%)
 *   until scrolled into view, sliding smoothly from bottom to top on entrance
 * - Overflow-Clipped Stage Frame (no peeking secondary boxes)
 * - Layered Physical Card Deck: Outgoing cards scale to 0.95, shift up by 18px, and dim
 * - Compact Device Heights (no viewport clipping or overflow on laptops/desktops)
 * - Step Narrative Story ("HOVER A STEP FOR ITS STORY" -> 4-Step Progressive Assembly)
 * - Sibal-style HUD with Hairline Progress Track & Quick Jump Indicators
 * ============================================================================
 */

const SIBAL_STEPS = [
  {
    id: 1,
    tag: '01 / WIREFRAME',
    title: 'BLUEPRINT & GRID SYSTEM',
    story: 'Low-fidelity layout wireframes, skeleton placeholders & modular grid baseline.',
    shortLabel: 'BLUEPRINT',
  },
  {
    id: 2,
    tag: '02 / TYPOGRAPHY',
    title: 'FLUID ARCHITECTURAL TYPE',
    story: 'Proportional clamp() typography and optical hierarchy calibrated across viewports.',
    shortLabel: 'TYPOGRAPHY',
  },
  {
    id: 3,
    tag: '03 / REFLOW',
    title: 'RESPONSIVE COLUMN REFLOW',
    story: 'Dynamic viewport adaptation: 3-col desktop collapses to 2-col tablet & 1-col mobile stack.',
    shortLabel: 'REFLOW',
  },
  {
    id: 4,
    tag: '04 / ENGINE',
    title: 'LIVE MICRO-MOTION & CTA',
    story: 'Production-ready interactive states, 60fps spring transitions & live action triggers.',
    shortLabel: 'LIVE ENGINE',
  },
];

function ViewportScreenContent({ step, mode, project }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${project.id}-${mode}-${step}`}
        initial={{ opacity: 0, y: 4, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -4, scale: 0.98 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="h-full flex flex-col justify-between"
      >
        {/* Step 0: Wireframe Blueprint */}
        {step === 0 && (
          <div className="space-y-1 select-none h-full flex flex-col justify-between">
            <div className="space-y-1 border border-dashed border-[#EF233C]/60 bg-[#EF233C]/5 p-1">
              <div className="flex items-center justify-between border-b border-dashed border-[#EF233C]/40 pb-0.5">
                <span className="h-1.5 w-8 bg-[#EF233C] animate-pulse" />
                <span className="font-mono-tech text-[6px] text-[#EF233C]">GRID // 4PX</span>
              </div>
              <div className="h-1 w-full bg-[#1E2630]" />
              <div className="h-1 w-3/4 bg-[#1E2630]" />
            </div>

            {mode === 'mobile' && (
              <div className="space-y-1 pt-0.5">
                <div className="h-8 border border-dashed border-[#2A3441] bg-[#12161F]/40 flex flex-col items-center justify-center text-[6px] font-mono-tech text-[#8E8D8A]">
                  <span>HERO_CONTAINER</span>
                  <span className="text-[5px] text-[#EF233C]">W: 100%</span>
                </div>
                <div className="h-5 border border-dashed border-[#2A3441] flex items-center justify-center text-[6px] font-mono-tech text-[#8E8D8A]">
                  NAV_DRAWER
                </div>
              </div>
            )}

            {mode === 'tablet' && (
              <div className="grid grid-cols-2 gap-1 pt-0.5 flex-1">
                <div className="border border-dashed border-[#EF233C]/40 bg-[#EF233C]/10 flex flex-col items-center justify-center p-1 text-[6px] font-mono-tech text-[#EF233C]">
                  <span>COL_A</span>
                  <span className="text-[5px] text-[#8E8D8A]">50% SPAN</span>
                </div>
                <div className="border border-dashed border-[#2A3441] bg-[#12161F]/40 flex flex-col items-center justify-center p-1 text-[6px] font-mono-tech text-[#8E8D8A]">
                  <span>COL_B</span>
                  <span className="text-[5px] text-[#8E8D8A]">50% SPAN</span>
                </div>
              </div>
            )}

            {mode === 'desktop' && (
              <div className="grid grid-cols-3 gap-1 pt-0.5 flex-1">
                <div className="border border-dashed border-[#EF233C]/40 bg-[#EF233C]/10 flex flex-col items-center justify-center p-1 text-[6px] font-mono-tech text-[#EF233C]">
                  <span>MOD_01</span>
                  <span className="text-[5px] text-[#8E8D8A]">33.3%</span>
                </div>
                <div className="border border-dashed border-[#2A3441] bg-[#12161F]/40 flex flex-col items-center justify-center p-1 text-[6px] font-mono-tech text-[#8E8D8A]">
                  <span>MOD_02</span>
                  <span className="text-[5px] text-[#8E8D8A]">33.3%</span>
                </div>
                <div className="border border-dashed border-[#2A3441] bg-[#12161F]/40 flex flex-col items-center justify-center p-1 text-[6px] font-mono-tech text-[#8E8D8A]">
                  <span>MOD_03</span>
                  <span className="text-[5px] text-[#8E8D8A]">33.3%</span>
                </div>
              </div>
            )}

            <div className="text-[6px] font-mono-tech text-[#8E8D8A] flex justify-between border-t border-[#1E2630] pt-0.5">
              <span>SKELETON</span>
              <span className="text-[#EF233C]">STEP 01</span>
            </div>
          </div>
        )}

        {/* Step 1: Fluid Typography */}
        {step === 1 && (
          <div className="space-y-1 select-none h-full flex flex-col justify-between">
            <div className="space-y-0.5">
              <span className="font-mono-tech text-[6px] text-[#EF233C] tracking-wider uppercase block">
                {mode === 'mobile' ? 'TYPE: 14PX // FLUID' : mode === 'tablet' ? 'TYPE: 18PX // CLAMP' : 'TYPE: 24PX // EDITORIAL'}
              </span>
              <h4 className={`font-black uppercase tracking-tight text-[#F1EEE8] leading-tight line-clamp-1 ${
                mode === 'desktop' ? 'text-xs sm:text-sm' : 'text-[10px]'
              }`}>
                {project.title}
              </h4>
            </div>

            <div className="p-1 border border-[#1E2630] bg-[#12161F]/80 space-y-0.5">
              <div className="flex items-center justify-between text-[6px] font-mono-tech text-[#8E8D8A]">
                <span>CATEGORY</span>
                <span className="text-[#EF233C]">{project.year}</span>
              </div>
              <p className="text-[7px] text-[#8E8D8A] font-mono-tech leading-snug line-clamp-2">
                {project.category}
              </p>
            </div>

            <div className="text-[6px] font-mono-tech text-[#8E8D8A] flex justify-between border-t border-[#1E2630] pt-0.5">
              <span>OPTICAL SCALE</span>
              <span className="text-[#EF233C]">STEP 02</span>
            </div>
          </div>
        )}

        {/* Step 2: Responsive Reflow */}
        {step === 2 && (
          <div className="space-y-1 select-none h-full flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#1E2630] pb-0.5 text-[6px] font-mono-tech">
              <span className="text-[#EF233C] font-semibold">
                {mode === 'mobile' ? '1-COL VERTICAL' : mode === 'tablet' ? '2-COL SPLIT' : '3-COL SPREAD'}
              </span>
              <span className="text-[#8E8D8A]">REFLOW</span>
            </div>

            {mode === 'mobile' && (
              <div className="space-y-1 flex-1 pt-0.5">
                <div className="p-1 border border-[#EF233C]/50 bg-[#12161F] text-[6px] font-mono-tech text-[#F1EEE8] flex justify-between items-center">
                  <span>01 &bull; {project.stack[0]}</span>
                  <span className="text-[#EF233C]">MAIN</span>
                </div>
                <div className="p-1 border border-[#1E2630] bg-[#12161F] text-[6px] font-mono-tech text-[#8E8D8A] flex justify-between items-center">
                  <span>02 &bull; {project.stack[1] || 'CSS'}</span>
                  <span>MOD</span>
                </div>
              </div>
            )}

            {mode === 'tablet' && (
              <div className="grid grid-cols-2 gap-1 flex-1 pt-0.5">
                <div className="p-1 border border-[#EF233C]/50 bg-[#12161F] space-y-0.5">
                  <span className="text-[6px] font-mono-tech text-[#EF233C] font-bold block">COL 01</span>
                  <span className="text-[7px] font-extrabold text-[#F1EEE8] block truncate">{project.stack[0]}</span>
                </div>
                <div className="p-1 border border-[#1E2630] bg-[#12161F] space-y-0.5">
                  <span className="text-[6px] font-mono-tech text-[#8E8D8A] font-bold block">COL 02</span>
                  <span className="text-[7px] font-extrabold text-[#F1EEE8] block truncate">{project.stack[1] || 'Tooling'}</span>
                </div>
              </div>
            )}

            {mode === 'desktop' && (
              <div className="grid grid-cols-3 gap-1 flex-1 pt-0.5">
                {project.stack.slice(0, 3).map((st, i) => (
                  <div key={st} className={`p-1 border bg-[#12161F] space-y-0.5 ${i === 0 ? 'border-[#EF233C]/60' : 'border-[#1E2630]'}`}>
                    <span className="text-[5px] font-mono-tech text-[#EF233C] block">MOD.0{i + 1}</span>
                    <span className="text-[7px] font-extrabold text-[#F1EEE8] block truncate">{st}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="text-[6px] font-mono-tech text-[#8E8D8A] flex justify-between border-t border-[#1E2630] pt-0.5">
              <span>RESPONSIVE ENGINE</span>
              <span className="text-[#EF233C]">STEP 03</span>
            </div>
          </div>
        )}

        {/* Step 3: Live Micro-Motion & Real Project Screenshot */}
        {step === 3 && (
          <div className="space-y-1 select-none h-full flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-[#1E2630] pb-0.5 text-[6px] font-mono-tech">
              <span className="text-[#EF233C] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF233C] animate-ping" />
                LIVE SCREENSHOT
              </span>
              <span className="text-[#8E8D8A]">DEPLOYED</span>
            </div>

            <div className="relative flex-1 my-0.5 overflow-hidden border border-[#1E2630] bg-[#05070A] group/screen">
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-top filter contrast-[1.05] transition-transform duration-500 group-hover/screen:scale-105"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[7px] font-mono-tech text-[#8E8D8A]">
                  SCREENSHOT
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-1 left-1 right-1 flex items-center justify-between font-mono-tech text-[5px] text-[#F1EEE8] px-1 py-0.5 bg-black/70 backdrop-blur-xs border border-white/10">
                <span className="truncate">{project.title}</span>
                <span className="text-[#EF233C]">PROD</span>
              </div>
            </div>

            <div className="text-[6px] font-mono-tech text-[#8E8D8A] flex justify-between border-t border-[#1E2630] pt-0.5">
              <span className="text-[#F1EEE8] truncate">{project.stack[0]}</span>
              <span className="text-[#EF233C]">STEP 04</span>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

function SibalDeviceMobile({ project, step, isDimmed, isHovered, onHover, onClick }) {
  return (
    <div
      className={`flex flex-col items-center shrink-0 w-[92px] sm:w-[115px] md:w-[130px] lg:w-[148px] transition-all duration-300 ${
        isDimmed ? 'opacity-40 scale-[0.98]' : isHovered ? 'scale-[1.025] z-10' : 'opacity-100'
      }`}
      onMouseEnter={() => onHover?.('mobile')}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className="font-mono-tech text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#8E8D8A] mb-1.5 text-center flex items-center gap-1">
        <span className={isHovered ? 'text-[#EF233C]' : ''}>MOBILE &bull; 390</span>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
        className={`w-full h-[150px] sm:h-[175px] md:h-[195px] lg:h-[215px] rounded-none border bg-[#0A0D12] p-1.5 sm:p-2 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden select-none ${
          isHovered
            ? 'border-[#EF233C] shadow-[0_0_20px_rgba(239,35,60,0.35)]'
            : 'border-[#1E2630] hover:border-[#EF233C]/70'
        }`}
      >
        {/* Speaker notch */}
        <div className={`w-6 h-0.5 mx-auto rounded-full transition-colors mb-1 ${isHovered ? 'bg-[#EF233C]' : 'bg-[#1E2630]'}`} />

        {/* Viewport Screen Content */}
        <div className="flex-1 overflow-hidden">
          <ViewportScreenContent step={step} mode="mobile" project={project} />
        </div>

        {/* Bottom CTA Button */}
        <div className={`mt-1.5 py-0.5 text-center font-mono-tech text-[7px] sm:text-[8px] tracking-wider uppercase border transition-all ${
          isHovered
            ? 'border-[#EF233C] bg-[#EF233C] text-white shadow-[0_0_10px_#EF233C]'
            : 'border-[#1E2630] text-[#EF233C] hover:border-[#EF233C] hover:bg-[#EF233C] hover:text-white'
        }`}>
          CTA
        </div>
      </div>
    </div>
  );
}

function SibalDeviceTablet({ project, step, isDimmed, isHovered, onHover, onClick }) {
  return (
    <div
      className={`flex flex-col items-center shrink-0 w-[138px] sm:w-[175px] md:w-[205px] lg:w-[235px] transition-all duration-300 ${
        isDimmed ? 'opacity-40 scale-[0.98]' : isHovered ? 'scale-[1.025] z-10' : 'opacity-100'
      }`}
      onMouseEnter={() => onHover?.('tablet')}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className="font-mono-tech text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#8E8D8A] mb-1.5 text-center flex items-center gap-1">
        <span className={isHovered ? 'text-[#EF233C]' : ''}>TABLET &bull; 768</span>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
        className={`w-full h-[150px] sm:h-[175px] md:h-[195px] lg:h-[215px] rounded-none border bg-[#0A0D12] p-1.5 sm:p-2 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden select-none ${
          isHovered
            ? 'border-[#EF233C] shadow-[0_0_20px_rgba(239,35,60,0.35)]'
            : 'border-[#1E2630] hover:border-[#EF233C]/70'
        }`}
      >
        {/* Tablet Camera */}
        <div className={`w-1 h-1 mx-auto rounded-full transition-colors mb-1 ${isHovered ? 'bg-[#EF233C]' : 'bg-[#1E2630]'}`} />

        {/* Viewport Screen Content */}
        <div className="flex-1 overflow-hidden">
          <ViewportScreenContent step={step} mode="tablet" project={project} />
        </div>

        {/* Bottom CTA Button */}
        <div className={`mt-1.5 py-0.5 text-center font-mono-tech text-[7px] sm:text-[8px] tracking-wider uppercase border transition-all ${
          isHovered
            ? 'border-[#EF233C] bg-[#EF233C] text-white shadow-[0_0_10px_#EF233C]'
            : 'border-[#1E2630] text-[#EF233C] hover:border-[#EF233C] hover:bg-[#EF233C] hover:text-white'
        }`}>
          CTA
        </div>
      </div>
    </div>
  );
}

function SibalDeviceDesktop({ project, step, isDimmed, isHovered, onHover, onClick }) {
  return (
    <div
      className={`flex flex-col items-center flex-1 min-w-[190px] sm:min-w-[240px] md:min-w-[290px] lg:max-w-[460px] transition-all duration-300 ${
        isDimmed ? 'opacity-40 scale-[0.98]' : isHovered ? 'scale-[1.025] z-10' : 'opacity-100'
      }`}
      onMouseEnter={() => onHover?.('desktop')}
      onMouseLeave={() => onHover?.(null)}
    >
      <div className="font-mono-tech text-[8px] sm:text-[9px] tracking-[0.2em] uppercase text-[#8E8D8A] mb-1.5 text-center flex items-center gap-1">
        <span className={isHovered ? 'text-[#EF233C]' : ''}>DESKTOP &bull; 1440</span>
      </div>
      <div
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick()}
        className={`w-full h-[150px] sm:h-[175px] md:h-[195px] lg:h-[215px] rounded-none border bg-[#0A0D12] p-1.5 sm:p-2 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden select-none ${
          isHovered
            ? 'border-[#EF233C] shadow-[0_0_20px_rgba(239,35,60,0.35)]'
            : 'border-[#1E2630] hover:border-[#EF233C]/70'
        }`}
      >
        {/* Desktop Browser Chrome */}
        <div className="flex items-center justify-between border-b border-[#1E2630] pb-1 mb-1">
          <div className="flex items-center gap-1">
            <span className={`w-1.5 h-1.5 rounded-full transition-colors ${isHovered ? 'bg-[#EF233C]' : 'bg-[#EF233C]/70'}`} />
            <span className="w-1.5 h-1.5 rounded-full bg-[#3A4553]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#1E2630]" />
          </div>
          <div className="font-mono-tech text-[7px] sm:text-[8px] text-[#8E8D8A] px-2 py-0.5 border border-[#1E2630] bg-[#12161F]">
            {project.id}.faris.dev
          </div>
          <div className="w-3" />
        </div>

        {/* Viewport Screen Content */}
        <div className="flex-1 overflow-hidden">
          <ViewportScreenContent step={step} mode="desktop" project={project} />
        </div>

        {/* Bottom CTA Button */}
        <div className={`mt-1.5 py-0.5 text-center font-mono-tech text-[7px] sm:text-[8px] tracking-wider uppercase border transition-all ${
          isHovered
            ? 'border-[#EF233C] bg-[#EF233C] text-white shadow-[0_0_10px_#EF233C]'
            : 'border-[#1E2630] text-[#EF233C] hover:border-[#EF233C] hover:bg-[#EF233C] hover:text-white'
        }`}>
          CTA
        </div>
      </div>
    </div>
  );
}

/**
 * Single Stack Card with Dedicated Motion Values
 */
function ProjectStackCard({
  project,
  index,
  motionStyle,
  onCursorChange,
  onOpenModal,
}) {
  const [activeStep, setActiveStep] = useState(3);
  const [hoveredStep, setHoveredStep] = useState(null);
  const [hoveredDevice, setHoveredDevice] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const currentStep = hoveredStep !== null ? hoveredStep : activeStep;

  return (
    <motion.div
      style={motionStyle}
      className="col-start-1 row-start-1 w-full border border-[#1E2630] bg-[#07090C] overflow-hidden select-none transition-shadow duration-300 hover:border-[#EF233C]/60 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative will-change-transform"
    >
      <RegistrationCrosshair className="absolute -top-[7px] -left-[4px] z-20" />
      <RegistrationCrosshair className="absolute -bottom-[7px] -right-[4px] z-20" />

      {/* Top Telemetry Header Bar */}
      <div className="px-4 sm:px-6 py-2.5 border-b border-[#1E2630] bg-[#090C10] flex items-center justify-between gap-3 font-mono-tech text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-none bg-[#EF233C] animate-pulse" />
          <span className="text-[#F1EEE8] font-bold tracking-wider text-[11px] sm:text-xs">
            PRJ.00{project.index}
          </span>
          <span className="text-[#2A3441]">&bull;</span>
          <span className="text-[#EF233C] uppercase tracking-wider font-semibold text-[10px] sm:text-xs">
            {project.stack[0]}
          </span>
          <span className="text-[#8E8D8A] text-[9px] hidden md:inline tracking-wider">
            [{project.statusLabel}]
          </span>
        </div>

        {/* Dynamic Narrative Story Banner */}
        <div className="flex items-center">
          <AnimatePresence mode="wait">
            {hoveredStep !== null ? (
              <motion.div
                key={`story-${currentStep}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 3, filter: 'blur(3px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={prefersReducedMotion ? false : { opacity: 0, y: -3, filter: 'blur(3px)' }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-2 text-right"
              >
                <span className="text-[#EF233C] font-bold tracking-wider text-[9px] sm:text-[11px]">
                  {SIBAL_STEPS[currentStep].tag}
                </span>
                <span className="text-[#2A3441] hidden md:inline">&bull;</span>
                <span className="text-[#F1EEE8] text-[9px] sm:text-[11px] hidden md:inline truncate max-w-[280px] lg:max-w-[460px]">
                  {SIBAL_STEPS[currentStep].story}
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="idle-story"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 3 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? false : { opacity: 0, y: -3 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-1.5 font-mono-tech text-[9px] sm:text-[10px] text-[#8E8D8A] uppercase tracking-wider"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#EF233C] animate-pulse" />
                <span>HOVER A STEP FOR ITS STORY</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Viewport Canvas Stage (3 Devices: Mobile, Tablet, Desktop) */}
      <div className="p-4 sm:p-5 lg:p-6 bg-[#07090C] relative">
        <div className="flex items-center justify-between pb-2.5 font-mono-tech text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-[#8E8D8A] border-b border-[#1E2630]/60">
          <span className="text-[#EF233C] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#EF233C]" />
            RESPONSIVE BUILD
          </span>
          <span className="flex items-center gap-1.5">
            <span className="text-[#F1EEE8] font-bold">STEP 0{currentStep + 1}</span>
            <span className="text-[#2A3441]">//</span>
            <span>PROOFED</span>
          </span>
        </div>

        <div className="pt-4 pb-1 flex items-end justify-start md:justify-center gap-3 sm:gap-5 lg:gap-9 overflow-x-auto md:overflow-hidden">
          <SibalDeviceMobile
            project={project}
            step={currentStep}
            isDimmed={hoveredDevice !== null && hoveredDevice !== 'mobile'}
            isHovered={hoveredDevice === 'mobile'}
            onHover={setHoveredDevice}
            onClick={() => onOpenModal(project)}
          />
          <SibalDeviceTablet
            project={project}
            step={currentStep}
            isDimmed={hoveredDevice !== null && hoveredDevice !== 'tablet'}
            isHovered={hoveredDevice === 'tablet'}
            onHover={setHoveredDevice}
            onClick={() => onOpenModal(project)}
          />
          <SibalDeviceDesktop
            project={project}
            step={currentStep}
            isDimmed={hoveredDevice !== null && hoveredDevice !== 'desktop'}
            isHovered={hoveredDevice === 'desktop'}
            onHover={setHoveredDevice}
            onClick={() => onOpenModal(project)}
          />
        </div>
      </div>

      {/* Bottom Card Area (Title + Dashes + Overview + Tags) */}
      <div className="p-4 sm:p-5 lg:p-6 border-t border-[#1E2630] bg-[#090C10] grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-center">
        {/* Left Column (5 cols): Title + Sibal 4-Step Interactive Story Progression Dashes */}
        <div className="lg:col-span-5 space-y-2">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold uppercase tracking-tight text-[#F1EEE8] leading-tight line-clamp-1">
            {project.title}
          </h3>

          {/* Sibal 4-Step Interactive Story Progression Dashes */}
          <div className="pt-0.5 space-y-1 max-w-xs">
            <div className="flex items-center justify-between font-mono-tech text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#8E8D8A]">
              <span className="text-[#EF233C] font-semibold">BUILD PROCESS STORY</span>
              <span>
                0{currentStep + 1} &bull; {SIBAL_STEPS[currentStep].shortLabel}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {SIBAL_STEPS.map((step, idx) => {
                const isSelected = currentStep === idx;
                return (
                  <button
                    key={step.id}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    onMouseEnter={() => {
                      setHoveredStep(idx);
                      onCursorChange?.(`STEP 0${step.id}`);
                    }}
                    onMouseLeave={() => {
                      setHoveredStep(null);
                      onCursorChange?.(null);
                    }}
                    className="group py-1 focus:outline-none flex flex-col items-start gap-0.5"
                    title={`Step 0${step.id}: ${step.title}`}
                    aria-label={`Step 0${step.id}: ${step.title}`}
                  >
                    <span className={`font-mono-tech text-[8px] ${isSelected ? 'text-[#EF233C] font-bold' : 'text-[#8E8D8A]'}`}>
                      0{step.id}
                    </span>
                    <motion.div
                      animate={{
                        width: isSelected ? 40 : 18,
                        backgroundColor: isSelected ? '#EF233C' : '#2A3441',
                        boxShadow: isSelected ? '0 0 10px rgba(239,35,60,0.7)' : 'none',
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                      className="h-1 rounded-none group-hover:bg-[#8E8D8A]"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Overview Description & Action */}
        <div className="lg:col-span-7 space-y-3">
          <p className="text-xs sm:text-sm text-[#8E8D8A] leading-relaxed line-clamp-2">
            {project.overview || project.summary}
          </p>

          {/* Tags & Direct 3D Case Study Trigger */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 5).map((tech) => (
                <span
                  key={tech}
                  className="font-mono-tech text-[9px] sm:text-[10px] uppercase tracking-wider px-2.5 py-1 border border-[#1E2630] bg-[#07090C] text-[#F1EEE8] hover:border-[#EF233C] transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={() => onOpenModal(project)}
              className="rounded-none shrink-0 inline-flex items-center gap-1.5 font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.16em] px-4 py-2 bg-[#EF233C] hover:bg-[#B91C1C] text-[#F1EEE8] transition-colors"
            >
              <span>VIEW CASE STUDY</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ProjectsSection({ onCursorChange }) {
  const containerRef = useRef(null);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  // Native Framer Motion useScroll: 0% to 100% across the container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Inertial spring smoothing: perfectly elastic 60fps response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active project index with low overhead (only fires on transition boundaries)
  useEffect(() => {
    return smoothProgress.on('change', (latest) => {
      const idx = latest < 0.38 ? 0 : latest < 0.76 ? 1 : 2;
      setActiveCardIndex((prev) => (prev !== idx ? idx : prev));
    });
  }, [smoothProgress]);

  // Card 0:
  // Starts in resting view at 0. Recedes behind Card 1 (0.30-0.48), recedes further behind Card 2 (0.68-0.86).
  const y0 = useTransform(smoothProgress, [0, 0.30, 0.48, 0.68, 0.86, 1.0], ['0px', '0px', '-18px', '-18px', '-30px', '-30px']);
  const scale0 = useTransform(smoothProgress, [0, 0.30, 0.48, 0.68, 0.86, 1.0], [1.0, 1.0, 0.95, 0.95, 0.92, 0.92]);
  const opacity0 = useTransform(smoothProgress, [0, 0.30, 0.48, 0.68, 0.86, 1.0], [1.0, 1.0, 0.60, 0.60, 0.30, 0.30]);
  const filter0 = useTransform(smoothProgress, [0, 0.30, 0.48, 0.68, 0.86, 1.0], [
    'brightness(1) saturate(1)',
    'brightness(1) saturate(1)',
    'brightness(0.45) saturate(0.65)',
    'brightness(0.45) saturate(0.65)',
    'brightness(0.25) saturate(0.45)',
    'brightness(0.25) saturate(0.45)',
  ]);
  const pointerEvents0 = useTransform(smoothProgress, (p) => (p <= 0.40 ? 'auto' : 'none'));

  // Card 1:
  // 100% INVISIBLE (opacity: 0, y: 120%) until 0.28.
  // Smoothly glides up from bottom and fades in (0.28-0.48) directly into place.
  // Active until 0.68, then recedes behind Card 2 (0.68-0.86).
  const y1 = useTransform(smoothProgress, [0, 0.28, 0.48, 0.68, 0.86, 1.0], ['120%', '120%', '0%', '0%', '-18px', '-18px']);
  const scale1 = useTransform(smoothProgress, [0, 0.28, 0.48, 0.68, 0.86, 1.0], [1.0, 1.0, 1.0, 1.0, 0.95, 0.95]);
  const opacity1 = useTransform(smoothProgress, [0, 0.28, 0.48, 0.68, 0.86, 1.0], [0, 0, 1.0, 1.0, 0.60, 0.60]);
  const filter1 = useTransform(smoothProgress, [0, 0.28, 0.48, 0.68, 0.86, 1.0], [
    'brightness(1) saturate(1)',
    'brightness(1) saturate(1)',
    'brightness(1) saturate(1)',
    'brightness(1) saturate(1)',
    'brightness(0.45) saturate(0.65)',
    'brightness(0.45) saturate(0.65)',
  ]);
  const pointerEvents1 = useTransform(smoothProgress, (p) => (p > 0.40 && p <= 0.78 ? 'auto' : 'none'));

  // Card 2:
  // 100% INVISIBLE (opacity: 0, y: 120%) until 0.66.
  // Smoothly glides up from bottom and fades in (0.66-0.86) directly into place.
  // Active until 1.0.
  const y2 = useTransform(smoothProgress, [0, 0.66, 0.86, 1.0], ['120%', '120%', '0%', '0%']);
  const scale2 = useTransform(smoothProgress, [0, 0.66, 0.86, 1.0], [1.0, 1.0, 1.0, 1.0]);
  const opacity2 = useTransform(smoothProgress, [0, 0.66, 0.86, 1.0], [0, 0, 1.0, 1.0]);
  const filter2 = useTransform(smoothProgress, [0, 0.66, 0.86, 1.0], [
    'brightness(1) saturate(1)',
    'brightness(1) saturate(1)',
    'brightness(1) saturate(1)',
    'brightness(1) saturate(1)',
  ]);
  const pointerEvents2 = useTransform(smoothProgress, (p) => (p > 0.78 ? 'auto' : 'none'));

  // Progress Bar width
  const progressWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Direct Jump
  const scrollToProject = (idx) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const totalDistance = containerRef.current.offsetHeight - window.innerHeight;
    const targets = [0.08, 0.58, 0.94];
    const targetScroll = containerTop + targets[idx] * totalDistance;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  const cardStyles = [
    { y: y0, scale: scale0, opacity: opacity0, filter: filter0, zIndex: 10, pointerEvents: pointerEvents0 },
    { y: y1, scale: scale1, opacity: opacity1, filter: filter1, zIndex: 20, pointerEvents: pointerEvents1 },
    { y: y2, scale: scale2, opacity: opacity2, filter: filter2, zIndex: 30, pointerEvents: pointerEvents2 },
  ];

  return (
    <SwissEditorialBand
      id="projects"
      index="03"
      subtitle="SELECTED ARCHIVE"
      title="PROJECTS"
      layout="stacked"
      headerMeta="03 SELECTED BUILDS"
    >
      {/* Tall Scroll Track: pure native scroll height, no wheel hijacking */}
      <div
        ref={containerRef}
        style={{ overflowAnchor: 'none' }}
        className="relative h-[230vh] sm:h-[250vh]"
      >
        {/* Sticky Pinned Stage (sibaldesign.com .hz__stage) */}
        <div className="sticky top-20 h-[calc(100vh-96px)] min-h-[520px] max-h-[670px] flex flex-col justify-between select-none">
          {/* Main Card Deck Stacking Stage (grid-area: 1/1 with overflow-hidden to cleanly clip incoming cards) */}
          <div className="flex-1 grid grid-cols-1 grid-rows-1 place-items-center w-full relative overflow-hidden pt-7 pb-2">
            {PROJECTS_DATA.map((proj, idx) => (
              <ProjectStackCard
                key={proj.id}
                project={proj}
                index={idx}
                motionStyle={cardStyles[idx]}
                onCursorChange={onCursorChange}
                onOpenModal={setSelectedProject}
              />
            ))}
          </div>

          {/* Sibal-style HUD & Telemetry Status Bar */}
          <div className="pt-2.5 border-t border-[#1E2630] flex items-center justify-between font-mono-tech text-[10px] text-[#8E8D8A] tracking-[0.2em]">
            {/* Left: Project Telemetry Status */}
            <div className="flex items-center gap-2">
              <span className="text-[#EF233C] font-bold">STACK</span>
              <span className="text-[#2A3441]">&bull;</span>
              <span className="text-[#F1EEE8] font-bold">
                0{activeCardIndex + 1} / 0{PROJECTS_DATA.length}
              </span>
              <span className="text-[#8E8D8A] hidden sm:inline truncate max-w-[180px] md:max-w-[320px]">
                {PROJECTS_DATA[activeCardIndex].title}
              </span>
            </div>

            {/* Middle: Hairline Progress Bar */}
            <div className="flex-1 max-w-[160px] sm:max-w-[280px] md:max-w-[340px] mx-3 sm:mx-6 h-[2px] bg-[#1E2630] relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 bottom-0 bg-[#EF233C] shadow-[0_0_8px_#EF233C]"
                style={{ width: progressWidth }}
              />
            </div>

            {/* Right: Quick Jump Dots & Scroll Instruction */}
            <div className="flex items-center gap-2">
              <span className="hidden md:inline text-[8px] text-[#8E8D8A]/70 uppercase tracking-widest mr-1">
                SCROLL DECK
              </span>
              {PROJECTS_DATA.map((proj, idx) => (
                <button
                  key={proj.id}
                  type="button"
                  onClick={() => scrollToProject(idx)}
                  className={`w-2.5 h-2.5 transition-all focus:outline-none ${
                    activeCardIndex === idx
                      ? 'bg-[#EF233C] scale-125 shadow-[0_0_8px_#EF233C]'
                      : 'bg-[#2A3441] hover:bg-[#8E8D8A]'
                  }`}
                  title={`Jump to ${proj.title}`}
                  aria-label={`Jump to project 0${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => {
          setSelectedProject(null);
          onCursorChange(null);
        }}
      />
    </SwissEditorialBand>
  );
}

/**
 * ============================================================================
 * ROW 04 — EXPERIENCE (EDUCATION, EVENT DEV & VOCATIONAL BACKGROUND)
 * ============================================================================
 */

/**
 * ============================================================================
 * EXPERIENCE ARCHITECTURAL PREVIEW SCHEMATICS & CERTIFICATE/DOC SLOT
 * ============================================================================
 */

function ExperienceArtworkPreview({ experience }) {
  const [customPhoto, setCustomPhoto] = useState(() => {
    if (typeof window !== 'undefined' && experience?.index && !experience?.isBlackout) {
      return localStorage.getItem(`faris_exp_doc_${experience.index}`) || null;
    }
    return null;
  });
  const [imgError, setImgError] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target.result;
        setCustomPhoto(dataUrl);
        setImgError(false);
        try {
          localStorage.setItem(`faris_exp_doc_${experience.index}`, dataUrl);
        } catch (err) {
          // localStorage might exceed quota
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // ITEM 1: Telkom Akses (Dihilangkan bagian visual preview/schematic sesuai instruksi)
  if (!experience?.hasPhotoSlot || experience?.previewType === 'telkom-maintenance') {
    return null;
  }

  // ITEM 4: SIFEST 2026 (Dihitamkan karena belum ada sertifikatnya sesuai instruksi)
  if (experience?.isBlackout || experience?.previewType === 'sifest-tid') {
    return (
      <div className="relative w-full min-h-[250px] sm:min-h-[280px] bg-[#040507] border border-[#1A222C] p-5 sm:p-6 flex flex-col justify-between overflow-hidden select-none">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(to right, #1E2630 1px, transparent 1px), linear-gradient(to bottom, #1E2630 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Top Header */}
        <div className="relative z-10 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#8E8D8A] pb-3 border-b border-[#1E2630]/60">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-none bg-[#2A3441]" />
            <span className="text-[#8E8D8A]">DOKUMENTASI & SERTIFIKAT</span>
          </div>
          <span className="text-[#8E8D8A] font-semibold">FIG. {experience.index}</span>
        </div>

        {/* Blacked Out Center Stage */}
        <div className="relative z-10 my-3 aspect-[16/9] w-full bg-[#020304] border border-[#141820] flex flex-col items-center justify-center text-center p-6 shadow-inner">
          <div className="w-10 h-10 border border-[#1E2630] bg-[#07090C] flex items-center justify-center mb-2.5">
            <span className="w-2 h-2 rounded-none bg-[#EF233C]/60 animate-pulse" />
          </div>
          <p className="font-mono-tech text-xs uppercase tracking-[0.22em] text-[#F1EEE8] font-bold">
            SERTIFIKAT BELUM TERSEDIA
          </p>
          <p className="font-mono-tech text-[10px] text-[#8E8D8A] mt-1 tracking-wider uppercase">
            SIFEST 2026 // DOKUMENTASI & SERTIFIKASI TAHAP PENERBITAN
          </p>
          <div className="mt-3 px-3 py-1 bg-[#07090C] border border-[#1E2630] font-mono-tech text-[9px] uppercase tracking-[0.16em] text-[#8E8D8A]">
            STATUS: <span className="text-[#EF233C]">PENDING ARCHIVAL</span>
          </div>
        </div>

        {/* Bottom Telemetry */}
        <div className="relative z-10 flex items-center justify-between font-mono-tech text-[9px] tracking-[0.14em] uppercase text-[#8E8D8A] pt-2 border-t border-[#1E2630]/60">
          <span>{experience.organization || 'HIMSI FASILKOM UNSRI'}</span>
          <span className="text-[#8E8D8A]">PENDING ISSUANCE</span>
        </div>
      </div>
    );
  }

  const activePhotoSrc = customPhoto || experience?.docImage;

  // ITEMS 2 & 3: Slot Sertifikat Terverifikasi
  return (
    <div className="relative w-full min-h-[260px] sm:min-h-[300px] bg-[#07090C] p-5 sm:p-6 flex flex-col justify-between overflow-hidden">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Top Header */}
      <div className="relative z-10 flex items-center justify-between font-mono-tech text-[10px] tracking-[0.2em] uppercase text-[#8E8D8A] pb-3 border-b border-[#1E2630]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-none bg-[#EF233C] animate-pulse" />
          <span className="text-[#F1EEE8]">DOKUMENTASI & SERTIFIKAT</span>
        </div>
        <span className="text-[#EF233C] font-semibold">FIG. {experience.index}</span>
      </div>

      {/* Photo Frame or Placeholder Slot */}
      {activePhotoSrc && !imgError ? (
        <div className="relative my-4 aspect-[16/9] w-full bg-[#05070A] border border-[#1E2630] overflow-hidden flex items-center justify-center group/img">
          <img
            src={activePhotoSrc}
            alt={experience.docTitle || experience.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain bg-black/85 transition-transform duration-500 group-hover/img:scale-[1.02]"
          />
          {/* Quick Action Links */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-2 opacity-0 group-hover/img:opacity-100 transition-opacity">
            <a
              href={activePhotoSrc}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-black/85 hover:bg-[#EF233C] text-[#F1EEE8] font-mono-tech text-[9px] uppercase tracking-wider border border-[#2A2A2A] transition-colors"
            >
              Lihat Ukuran Penuh ↗
            </a>
          </div>
          <div className="absolute bottom-2.5 right-2.5 flex items-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="px-2.5 py-1 bg-black/85 hover:bg-[#EF233C] text-[#F1EEE8] font-mono-tech text-[9px] uppercase tracking-wider border border-[#2A2A2A] transition-colors"
            >
              Ganti Foto
            </button>
          </div>
        </div>
      ) : (
        <div className="relative my-4 py-8 px-6 border border-dashed border-[#EF233C]/40 bg-[#0C1017]/80 flex flex-col items-center justify-center text-center">
          <div className="w-12 h-12 rounded-none border border-[#EF233C] bg-[#141414] flex items-center justify-center mb-3">
            <Award className="w-6 h-6 text-[#EF233C]" />
          </div>
          <p className="font-mono-tech text-xs uppercase tracking-[0.2em] text-[#F1EEE8] font-bold">
            TEMPAT FOTO SERTIFIKAT / DOKUMENTASI
          </p>
          <p className="font-mono-tech text-[11px] text-[#8E8D8A] mt-1 max-w-md">
            {experience.docTitle || 'Sertifikat atau Foto Dokumentasi Kegiatan'}
          </p>

          <div className="mt-3 text-[10px] font-mono-tech text-[#8E8D8A] bg-[#101010] border border-[#2A2A2A] px-3 py-1.5 flex flex-wrap items-center justify-center gap-1.5">
            <span>Simpan file foto di:</span>
            <code className="text-[#EF233C] font-bold">public/{experience.docPlaceholderName}</code>
          </div>

          <button
            type="button"
            onClick={() => {
              setImgError(false);
              fileInputRef.current?.click();
            }}
            className="mt-4 inline-flex items-center gap-2 font-mono-tech text-xs uppercase tracking-[0.18em] px-4 py-2 border border-[#EF233C] text-[#EF233C] hover:bg-[#EF233C] hover:text-white transition-colors"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Pilih File Foto Sekarang</span>
          </button>
        </div>
      )}

      {/* Bottom Telemetry */}
      <div className="relative z-10 flex items-center justify-between font-mono-tech text-[9px] tracking-[0.14em] uppercase text-[#8E8D8A] pt-2 border-t border-[#1E2630]">
        <span>{experience.organization || 'FAKULTAS ILMU KOMPUTER UNSRI'}</span>
        <span className="text-[#EF233C]">VERIFIED CERTIFICATE</span>
      </div>
    </div>
  );
}


function ExperienceModal({ experience, onClose }) {
  const prefersReducedMotion = useReducedMotion();
  const palembangTime = usePalembangClock();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!experience) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [experience, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {experience && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <Interactive3DFullModalCard onClick={(e) => e.stopPropagation()}>
            {/* Sibal-style Top Telemetry Bar */}
            <Floating3DElement depth={25} className="px-6 py-4 border-b border-[#1E2630] bg-[#0C1017]/80 flex items-center justify-between gap-4 font-mono-tech text-xs">
              <div className="flex items-center gap-3 tracking-[0.2em] uppercase">
                <span className="text-[#EF233C] font-semibold">EXP // {experience.index}</span>
                <span className="text-[#2A3441]">|</span>
                <span className="text-[#8E8D8A]">{experience.period}</span>
                <span className="hidden sm:inline text-[#2A3441]">|</span>
                <span className="hidden sm:inline text-[#8E8D8A]">{experience.category}</span>
              </div>

              <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#EF233C]">
                <span className="w-1.5 h-1.5 rounded-none bg-[#EF233C] animate-pulse" />
                <span>3D PERSPECTIVE // HUD</span>
              </div>
            </Floating3DElement>

            {/* Visual Schematic Artwork (Hanya tampil untuk yang memiliki slot foto/sertifikat) */}
            {experience?.hasPhotoSlot && (
              <Floating3DElement depth={15} className="border-b border-[#1E2630] relative overflow-hidden bg-[#07090C]">
                <ExperienceArtworkPreview experience={experience} />
              </Floating3DElement>
            )}

            {/* Sibal Design 2-Column Multi-Telemetry Body (3D Parallax Space) */}
            <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10" style={{ transformStyle: 'preserve-3d' }}>
              {/* Left Column (5 cols): 3D Floating Typography & Details (Unified & Sejajar) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6" style={{ transformStyle: 'preserve-3d' }}>
                <Floating3DElement depth={30} className="space-y-3.5" style={{ transformStyle: 'preserve-3d' }}>
                  <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#EF233C]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    FAA.DEV // {experience.category}
                  </p>
                  <h3
                    className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-[#F1EEE8] uppercase leading-tight select-none"
                    style={{ textShadow: '0 4px 14px rgba(0,0,0,0.9), 0 10px 25px rgba(0,0,0,0.75)' }}
                  >
                    {experience.title}
                  </h3>
                  <p className="font-mono-tech text-xs text-[#8E8D8A]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    {experience.location || 'Palembang, Indonesia'} &bull; {experience.period}
                  </p>
                  <p className="text-xs sm:text-sm text-[#F1EEE8]/85 leading-relaxed pt-1" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.75)' }}>
                    {experience.description}
                  </p>
                </Floating3DElement>

                <Floating3DElement depth={35} className="pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="group rounded-none inline-flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em] px-5 py-2.5 border border-[#EF233C] text-[#EF233C] hover:bg-[#EF233C] hover:text-[#FFFFFF] transition-all duration-300"
                    style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.7), 0 0 12px rgba(239,35,60,0.15)' }}
                  >
                    <span>CLOSE PREVIEW</span>
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </button>
                </Floating3DElement>
              </div>

              {/* Right Column (7 cols): Sibal 3-Column Spec/Skills/Highlights Grid (Unified & Sejajar) */}
              <Floating3DElement depth={26} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#1E2630]" style={{ transformStyle: 'preserve-3d' }}>
                {/* Col 1: SPEC */}
                <div className="space-y-4">
                  <div className="pb-2 border-b border-[#1E2630] font-mono-tech text-xs uppercase tracking-[0.2em] text-[#EF233C]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    SPEC
                  </div>
                  <div className="space-y-3 font-mono-tech text-xs">
                    <div>
                      <span className="text-[10px] text-[#8E8D8A] block uppercase tracking-wider mb-0.5">STATUS</span>
                      <span className="text-[#EF233C]">{experience.status || 'VERIFIED EXPERIENCE'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8E8D8A] block uppercase tracking-wider mb-0.5">PERIOD</span>
                      <span className="text-[#F1EEE8]">{experience.period}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8E8D8A] block uppercase tracking-wider mb-0.5">LOCATION</span>
                      <span className="text-[#F1EEE8]">{experience.location || 'Palembang, ID'}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8E8D8A] block uppercase tracking-wider mb-0.5">INDEX</span>
                      <span className="text-[#EF233C]">{experience.index}</span>
                    </div>
                  </div>
                </div>

                {/* Col 2: STACK / TOOLS */}
                <div className="space-y-4">
                  <div className="pb-2 border-b border-[#1E2630] font-mono-tech text-xs uppercase tracking-[0.2em] text-[#EF233C]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    STACK / TOOLS
                  </div>
                  <div className="flex flex-col gap-1.5 font-mono-tech text-xs text-[#F1EEE8]">
                    {(experience.tools || experience.tags || []).map((tool) => (
                      <span key={tool} className="text-[#F1EEE8]/90 hover:text-[#EF233C] transition-colors py-0.5 border-b border-[#1E2630]/60" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Col 3: HIGHLIGHTS */}
                <div className="space-y-4">
                  <div className="pb-2 border-b border-[#1E2630] font-mono-tech text-xs uppercase tracking-[0.2em] text-[#EF233C]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    HIGHLIGHTS
                  </div>
                  <div className="space-y-3 font-mono-tech text-xs text-[#8E8D8A]">
                    {(experience.highlights || [
                      'Rigorous hands-on technical execution',
                      'Structured architectural system modeling',
                      'Collaborative workflow and agile methodology',
                    ]).map((highlight, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="text-[10px] text-[#EF233C] block font-semibold">0{idx + 1} // SCOPE</span>
                        <span className="text-[#F1EEE8]/85 text-[11px] leading-tight block" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Floating3DElement>
            </div>

            {/* Sibal Bottom Telemetry Bar */}
            <Floating3DElement depth={25} className="px-6 py-3.5 border-t border-[#1E2630] bg-[#07090C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono-tech text-xs text-[#8E8D8A]">
              <div className="flex items-center gap-3">
                <span className="inline-block w-2 h-2 bg-[#EF233C] shadow-[0_0_8px_#EF233C]" />
                <span className="text-[#F1EEE8] tracking-wider uppercase font-semibold">STATUS: ONLINE</span>
                <span className="text-[#2A3441]">&copy;</span>
                <span className="text-[#8E8D8A]">2026 MUHAMMAD FARIS ARRACHMAN</span>
              </div>
              <div className="tracking-[0.18em] text-[11px] text-[#EF233C]">
                {palembangTime}
              </div>
            </Floating3DElement>
          </Interactive3DFullModalCard>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

function ExperienceSection({ onCursorChange }) {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <SwissEditorialBand
      id="experience"
      index="04"
      subtitle="ACADEMIC & FIELD"
      title="EXPERIENCE"
      layout="stacked"
      headerMeta="04 ROLES & FIELDWORK"
    >
      <div className="border-y border-[#2A2A2A] divide-y divide-[#2A2A2A]">
        {EXPERIENCE_DATA.map((item, idx) => (
          <motion.div
            key={item.index}
            role="button"
            tabIndex={0}
            onClick={() => setSelectedExperience(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setSelectedExperience(item);
              }
            }}
            onMouseEnter={() => onCursorChange?.('PREVIEW ↗')}
            onMouseLeave={() => onCursorChange?.(null)}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.06 }}
            className="group py-7 sm:py-9 px-3 sm:px-6 hover:bg-[#1D1D1D]/55 transition-colors grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start cursor-pointer border border-transparent hover:border-[#EF233C]/30 select-none"
          >
            {/* Period, Index & Organization */}
            <div className="md:col-span-4 space-y-1.5">
              <div className="flex items-center gap-2 font-mono-tech text-xs">
                <span className="text-[#EF233C] font-semibold">{item.index}</span>
                <span className="text-[#2A2A2A]">/</span>
                <span className="text-[#F1EEE8] font-medium">{item.period}</span>
              </div>
              <p className="font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[#8E8D8A]">
                {item.category}
              </p>
              {item.organization && (
                <p className="pt-1 font-mono-tech text-[11px] text-[#F1EEE8]/80">
                  {item.organization}
                </p>
              )}
            </div>

            {/* Role / Institution & Description */}
            <div className="md:col-span-8 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-xl sm:text-2xl font-bold tracking-[-0.02em] text-[#F1EEE8] group-hover:text-[#EF233C] transition-colors">
                  {item.title}
                </h3>
                <span className="shrink-0 w-9 h-9 rounded-none border border-[#2A2A2A] group-hover:border-[#EF233C] group-hover:bg-[#EF233C] flex items-center justify-center text-[#8E8D8A] group-hover:text-[#FFFFFF] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              </div>

              <p className="text-sm sm:text-base text-[#8E8D8A] leading-relaxed max-w-3xl">
                {item.description}
              </p>

              <div className="pt-1.5 flex flex-wrap items-center gap-1.5">
                {item.hasPhotoSlot && (
                  item.isBlackout ? (
                    <span className="inline-flex items-center gap-1 font-mono-tech text-[10px] uppercase tracking-wider px-2.5 py-0.5 border border-[#1E2630] bg-[#12161F] text-[#8E8D8A]">
                      <span className="w-1.5 h-1.5 bg-[#EF233C]/60" /> Sertifikat Pending
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 font-mono-tech text-[10px] uppercase tracking-wider px-2.5 py-0.5 border border-[#EF233C]/40 bg-[#EF233C]/10 text-[#EF233C]">
                      <Award className="w-3 h-3" /> Sertifikat Terverifikasi
                    </span>
                  )
                )}
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-none font-mono-tech text-[10px] uppercase tracking-wider px-2.5 py-0.5 border border-[#2A2A2A] bg-[#141414] text-[#8E8D8A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Experience Preview Modal */}
      <ExperienceModal
        experience={selectedExperience}
        onClose={() => {
          setSelectedExperience(null);
          onCursorChange?.(null);
        }}
      />
    </SwissEditorialBand>
  );
}

/**
 * ============================================================================
 * ROW 05 — CONTACT (KINETIC EDITORIAL STAGE + MAGNETIC CTA + SPRING DIRECTORY)
 * ============================================================================
 */

function MagneticActionButton({
  href,
  onClick,
  children,
  className = '',
  onMouseEnter,
  onMouseLeave,
}) {
  const prefersReducedMotion = useReducedMotion();
  const btnRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 280, damping: 20, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 280, damping: 20, mass: 0.35 });

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * 0.18);
    y.set(relY * 0.24);
  };

  const handleMouseLeave = (e) => {
    x.set(0);
    y.set(0);
    onMouseLeave?.(e);
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={btnRef}
      href={href}
      type={href ? undefined : 'button'}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
      className={className}
    >
      {children}
    </Component>
  );
}

function ContactSignalCard({ children, className = '' }) {
  const cardRef = useRef(null);
  const [edgePos, setEdgePos] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, e.clientX - rect.left));
    const y = Math.max(0, Math.min(rect.height, e.clientY - rect.top));
    setEdgePos({ x, y, active: true });
  };

  const handleMouseLeave = () => {
    setEdgePos((prev) => ({ ...prev, active: false }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-none border border-[#2A2A2A] bg-[#141414] overflow-visible ${className}`}
    >
      <RegistrationCrosshair className="absolute -top-[7px] -left-[4px] z-20" />
      <RegistrationCrosshair className="absolute -top-[7px] -right-[4px] z-20" />
      <RegistrationCrosshair className="absolute -bottom-[7px] -left-[4px] z-20" />
      <RegistrationCrosshair className="absolute -bottom-[7px] -right-[4px] z-20" />

      {/* Perimeter-only laser edge highlight */}
      <svg
        aria-hidden="true"
        className="pointer-events-none absolute -inset-[1px] w-[calc(100%+2px)] h-[calc(100%+2px)] z-10 overflow-visible"
      >
        <defs>
          <radialGradient
            id="contactCardEdgeGlow"
            cx={edgePos.x}
            cy={edgePos.y}
            r="190"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#EF233C" stopOpacity="1" />
            <stop offset="45%" stopColor="#EF233C" stopOpacity="0.65" />
            <stop offset="100%" stopColor="#EF233C" stopOpacity="0" />
          </radialGradient>
          <filter id="contactCardEdgeBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect
          x="0.75"
          y="0.75"
          width="calc(100% - 1.5px)"
          height="calc(100% - 1.5px)"
          fill="none"
          stroke="url(#contactCardEdgeGlow)"
          strokeWidth="1.5"
          filter="url(#contactCardEdgeBlur)"
          style={{
            opacity: edgePos.active ? 1 : 0,
            transition: 'opacity 0.25s ease',
          }}
        />
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  );
}

function getContactChannelIcon(label) {
  switch (label.toLowerCase()) {
    case 'email':
      return Mail;
    case 'github':
      return Github;
    case 'linkedin':
      return Linkedin;
    case 'instagram':
      return Instagram;
    default:
      return Globe;
  }
}

function ContactSection({ palembangTime, onCursorChange }) {
  const [copied, setCopied] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const prefersReducedMotion = useReducedMotion();

  const emailChannel = CONTACT_CHANNELS.find((c) => c.copyable) || CONTACT_CHANNELS[0];

  const handleCopyEmail = (e, email) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      });
    }
  };

  return (
    <SwissEditorialBand
      id="contact"
      index="05"
      subtitle="INQUIRIES & TRANSMISSION"
      title="CONTACT"
      layout="stacked"
      headerMeta="SIGNAL // DIRECT CHANNEL"
    >
      <div className="space-y-10 lg:space-y-12">
        {/* Main 12-Column Architectural Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* LEFT COLUMN (5 cols): Kinetic Headline + Live Signal Telemetry & Magnetic CTA */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="space-y-4">
              {/* Masked Editorial Kinetic Headline Reveal */}
              <div className="space-y-1">
                <div className="overflow-hidden">
                  <motion.h3
                    initial={prefersReducedMotion ? false : { y: '100%', opacity: 0 }}
                    whileInView={{ y: '0%', opacity: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl sm:text-4xl xl:text-[2.85rem] font-extrabold tracking-[-0.035em] text-[#F1EEE8] leading-[1.06]"
                  >
                    Have an idea?
                  </motion.h3>
                </div>
                <div className="overflow-hidden">
                  <motion.div
                    initial={prefersReducedMotion ? false : { y: '100%', opacity: 0 }}
                    whileInView={{ y: '0%', opacity: 1 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.72, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="text-3xl sm:text-4xl xl:text-[2.95rem] font-editorial-serif italic font-normal text-[#EF233C] leading-[1.08]"
                  >
                    Let&apos;s make it happen.
                  </motion.div>
                </div>
              </div>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.55, delay: 0.16 }}
                className="text-sm sm:text-base text-[#8E8D8A] leading-relaxed max-w-md"
              >
                Terbuka untuk kolaborasi proyek web development, desain antarmuka UI/UX, peluang magang, maupun diskusi teknis. Pilih salah satu kanal di samping atau mulai percakapan langsung via email.
              </motion.p>
            </div>

            {/* Live Signal Telemetry & Magnetic Action Card */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactSignalCard className="p-5 sm:p-6 space-y-5">
                {/* Status Header with Animated Signal Equalizer */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#2A2A2A] font-mono-tech text-[10px] tracking-[0.2em] uppercase">
                  <div className="flex items-center gap-2.5 text-[#F1EEE8]">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full bg-[#EF233C] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 bg-[#EF233C]" />
                    </span>
                    <span className="font-semibold">{PROFILE_META.availability}</span>
                  </div>

                  {/* Animated Signal Pulse Bars */}
                  <div className="flex items-end gap-0.5 h-3" aria-hidden="true">
                    {[0, 1, 2].map((bar) => (
                      <motion.span
                        key={bar}
                        animate={
                          prefersReducedMotion
                            ? undefined
                            : { scaleY: [0.35, 1, 0.45, 0.85, 0.35] }
                        }
                        transition={{
                          duration: 1.4,
                          repeat: Infinity,
                          delay: bar * 0.22,
                          ease: 'easeInOut',
                        }}
                        style={{ originY: 1 }}
                        className="w-[2.5px] h-full bg-[#EF233C]"
                      />
                    ))}
                  </div>
                </div>

                {/* Location & Live Local Time */}
                <div className="grid grid-cols-2 gap-4 font-mono-tech text-xs">
                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#8E8D8A]">
                      <MapPin className="w-3 h-3 text-[#EF233C]" />
                      BASE
                    </span>
                    <p className="text-[#F1EEE8] font-medium">Palembang, ID</p>
                  </div>
                  <div className="space-y-1">
                    <span className="flex items-center gap-1.5 text-[10px] tracking-[0.18em] uppercase text-[#8E8D8A]">
                      <Clock className="w-3 h-3 text-[#EF233C]" />
                      LOCAL TIME
                    </span>
                    <p className="text-[#F1EEE8] font-medium">{palembangTime || 'WIB // GMT+7'}</p>
                  </div>
                </div>

                {/* Magnetic Primary Email CTA + Quick Copy Trigger */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <MagneticActionButton
                    href={emailChannel.href}
                    onMouseEnter={() => onCursorChange?.('SEND MAIL ↗')}
                    onMouseLeave={() => onCursorChange?.(null)}
                    className="group relative flex-1 min-w-[190px] rounded-none inline-flex items-center justify-between gap-3 px-4 py-3 bg-[#EF233C] hover:bg-[#B91C1C] text-[#FFFFFF] font-mono-tech text-xs font-semibold uppercase tracking-[0.18em] transition-colors overflow-hidden"
                  >
                    <span className="flex items-center gap-2">
                      <Send className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      <span>Start a Project</span>
                    </span>
                    <span className="relative w-4 h-4 overflow-hidden shrink-0">
                      <ArrowUpRight className="w-4 h-4 absolute inset-0 transition-transform duration-300 ease-out group-hover:translate-x-4 group-hover:-translate-y-4" />
                      <ArrowUpRight className="w-4 h-4 absolute inset-0 -translate-x-4 translate-y-4 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
                    </span>
                  </MagneticActionButton>

                  <button
                    type="button"
                    onClick={(e) => handleCopyEmail(e, emailChannel.handle)}
                    onMouseEnter={() => onCursorChange?.(copied ? 'COPIED ✓' : 'COPY EMAIL')}
                    onMouseLeave={() => onCursorChange?.(null)}
                    className="rounded-none inline-flex items-center justify-center gap-2 px-4 py-3 border border-[#2A2A2A] hover:border-[#EF233C] bg-[#101010] hover:bg-[#1D1D1D] text-[#F1EEE8] font-mono-tech text-xs uppercase tracking-[0.16em] transition-colors"
                    aria-label="Copy email address"
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="copied-icon"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          transition={{ duration: 0.16 }}
                          className="inline-flex items-center gap-1.5 text-[#EF233C]"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Copied</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy-icon"
                          initial={{ scale: 0.6, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.6, opacity: 0 }}
                          transition={{ duration: 0.16 }}
                          className="inline-flex items-center gap-1.5"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#EF233C]" />
                          <span>Copy</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                {/* Floating Copy Feedback Banner */}
                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, height: 0 }}
                      animate={{ opacity: 1, y: 0, height: 'auto' }}
                      exit={{ opacity: 0, y: -4, height: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-2 flex items-center gap-2 font-mono-tech text-[10px] tracking-[0.16em] uppercase text-[#EF233C]">
                        <Check className="w-3.5 h-3.5 shrink-0" />
                        <span>Email disalin ke clipboard — {emailChannel.handle}</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ContactSignalCard>
            </motion.div>
          </div>

          {/* RIGHT COLUMN (7 cols): Interactive Spring-Gliding Channel Directory */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="relative border border-[#2A2A2A] bg-[#141414] overflow-visible flex-1 flex flex-col justify-between">
              <RegistrationCrosshair className="absolute -top-[7px] -left-[4px] z-20" />
              <RegistrationCrosshair className="absolute -top-[7px] -right-[4px] z-20" />
              <RegistrationCrosshair className="absolute -bottom-[7px] -left-[4px] z-20" />
              <RegistrationCrosshair className="absolute -bottom-[7px] -right-[4px] z-20" />

              {/* Directory Top Header Bar */}
              <div className="px-5 sm:px-6 py-3.5 border-b border-[#2A2A2A] bg-[#101010] flex items-center justify-between font-mono-tech text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">
                <div className="flex items-center gap-2 text-[#F1EEE8]">
                  <span className="w-1.5 h-1.5 bg-[#EF233C]" />
                  <span>COMMUNICATION DIRECTORY</span>
                </div>
                <span className="text-[#8E8D8A]">03 ACTIVE CHANNELS</span>
              </div>

              {/* Channels List with Spring Hover Glow */}
              <div
                onMouseLeave={() => {
                  setHoveredIdx(null);
                  onCursorChange?.(null);
                }}
                className="divide-y divide-[#2A2A2A] bg-[#101010] flex-1 flex flex-col justify-around"
              >
                {CONTACT_CHANNELS.map((channel, idx) => {
                  const IconComponent = getContactChannelIcon(channel.label);
                  const isHovered = hoveredIdx === idx;

                  return (
                    <motion.div
                      key={channel.index}
                      onMouseEnter={() => {
                        setHoveredIdx(idx);
                        onCursorChange?.(`${channel.actionLabel.toUpperCase()} ↗`);
                      }}
                      onFocus={() => setHoveredIdx(idx)}
                      initial={prefersReducedMotion ? false : { opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.07,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group relative py-5 sm:py-6 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors rounded-none overflow-hidden"
                    >
                      {/* Background Action Link (No nested buttons inside <a>) */}
                      <a
                        href={channel.href}
                        target={channel.copyable ? undefined : '_blank'}
                        rel={channel.copyable ? undefined : 'noopener noreferrer'}
                        className="absolute inset-0 z-10"
                        aria-label={channel.label}
                      />

                      {/* Spring-Gliding Active Background Highlight */}
                      {isHovered && (
                        <motion.span
                          layoutId="contact-active-bg"
                          aria-hidden="true"
                          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                          className="pointer-events-none absolute inset-0 bg-[#1D1D1D]/70 z-0"
                        />
                      )}

                      {/* Spring-Gliding Left Crimson Laser Rail */}
                      {isHovered && (
                        <motion.span
                          layoutId="contact-active-rail"
                          aria-hidden="true"
                          transition={{ type: 'spring', stiffness: 480, damping: 36 }}
                          className="pointer-events-none absolute left-0 top-0 bottom-0 w-[3px] bg-[#EF233C] z-10"
                        />
                      )}

                      {/* Left: Index + Channel Icon + Animated Label */}
                      <div className="relative z-10 flex items-center gap-4 pointer-events-none">
                        <span className="font-mono-tech text-xs font-semibold text-[#EF233C] w-5 shrink-0">
                          {channel.index}
                        </span>

                        <span
                          className={`w-10 h-10 rounded-none border flex items-center justify-center transition-all duration-300 shrink-0 ${
                            isHovered
                              ? 'border-[#EF233C] bg-[#EF233C]/10 text-[#EF233C]'
                              : 'border-[#2A2A2A] bg-[#141414] text-[#8E8D8A]'
                          }`}
                        >
                          <IconComponent className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                        </span>

                        <div className="transition-transform duration-300 group-hover:translate-x-1.5 min-w-0">
                          <div className="flex items-center gap-2.5">
                            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#F1EEE8] group-hover:text-[#EF233C] transition-colors">
                              {channel.label}
                            </span>
                            <span className="hidden md:inline-block font-mono-tech text-[9px] tracking-[0.18em] uppercase px-2 py-0.5 border border-[#2A2A2A] bg-[#141414] text-[#8E8D8A] group-hover:border-[#EF233C]/50 group-hover:text-[#EF233C] transition-colors">
                              {channel.actionLabel}
                            </span>
                          </div>
                          <span className="block font-mono-tech text-xs text-[#8E8D8A] group-hover:text-[#F1EEE8] transition-colors truncate mt-0.5 max-w-[220px] sm:max-w-[280px]">
                            {channel.handle}
                          </span>
                        </div>
                      </div>

                      {/* Right: Copy Action (for Email) + Kinetic Dual-Arrow Box */}
                      <div className="relative z-20 flex items-center justify-end gap-3 pl-9 sm:pl-0">
                        {channel.copyable && (
                          <button
                            type="button"
                            onClick={(e) => handleCopyEmail(e, channel.handle)}
                            className="rounded-none inline-flex items-center gap-1.5 font-mono-tech text-[10px] uppercase tracking-wider px-3 py-2 border border-[#2A2A2A] bg-[#141414] text-[#F1EEE8] hover:border-[#EF233C] hover:text-[#EF233C] transition-colors pointer-events-auto"
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

                        <span className="relative w-10 h-10 rounded-none border border-[#2A2A2A] group-hover:border-[#EF233C] group-hover:bg-[#EF233C] flex items-center justify-center text-[#F1EEE8] transition-colors duration-300 shrink-0 overflow-hidden pointer-events-none">
                          <ArrowUpRight className="w-4 h-4 absolute transition-transform duration-300 ease-out group-hover:translate-x-5 group-hover:-translate-y-5" />
                          <ArrowUpRight className="w-4 h-4 absolute -translate-x-5 translate-y-5 transition-transform duration-300 ease-out group-hover:translate-x-0 group-hover:translate-y-0 text-[#FFFFFF]" />
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Directory Bottom Bar */}
              <div className="px-5 sm:px-6 py-3 border-t border-[#2A2A2A] bg-[#101010] flex items-center justify-between font-mono-tech text-[10px] tracking-[0.18em] uppercase text-[#8E8D8A]">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#EF233C]" />
                  <span>DIRECT ENCRYPTED TRANSMISSION</span>
                </div>
                <span className="text-[#F1EEE8]">READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Architectural Collaboration Strip */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="border border-[#2A2A2A] bg-[#141414] px-4 sm:px-6 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono-tech text-[10px] sm:text-[11px] uppercase tracking-[0.18em] text-[#8E8D8A]"
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="text-[#EF233C] font-semibold">OPEN FOR:</span>
            <span className="text-[#F1EEE8]">Frontend Engineering</span>
            <span className="text-[#2A2A2A]">/</span>
            <span className="text-[#F1EEE8]">UI/UX Design</span>
            <span className="text-[#2A2A2A]">/</span>
            <span className="text-[#F1EEE8]">Web Systems</span>
            <span className="text-[#2A2A2A]">/</span>
            <span className="text-[#F1EEE8]">Network Maintenance</span>
          </div>
          <div className="flex items-center gap-2 text-[#8E8D8A] shrink-0">
            <span className="w-1.5 h-1.5 bg-[#EF233C]" />
            <span>TYPICAL RESPONSE &lt; 24H</span>
          </div>
        </motion.div>
      </div>
    </SwissEditorialBand>
  );
}

/**
 * ============================================================================
 * INTERACTIVE CASE STUDY MODAL
 * ============================================================================
 */

function ProjectModal({ project, onClose }) {
  const prefersReducedMotion = useReducedMotion();
  const palembangTime = usePalembangClock();

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

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <Interactive3DFullModalCard onClick={(e) => e.stopPropagation()}>
            {/* Sibal-style Top Telemetry Bar */}
            <Floating3DElement depth={25} className="px-6 py-4 border-b border-[#1E2630] bg-[#0C1017]/80 flex items-center justify-between gap-4 font-mono-tech text-xs">
              <div className="flex items-center gap-3 tracking-[0.2em] uppercase">
                <span className="text-[#EF233C] font-semibold">CASE // {project.index}</span>
                <span className="text-[#2A3441]">|</span>
                <span className="text-[#8E8D8A]">{project.year}</span>
                <span className="hidden sm:inline text-[#2A3441]">|</span>
                <span className="hidden sm:inline text-[#8E8D8A]">{project.category}</span>
              </div>

              <div className="flex items-center gap-2 text-[10px] tracking-widest uppercase text-[#EF233C]">
                <span className="w-1.5 h-1.5 rounded-none bg-[#EF233C] animate-pulse" />
                <span>3D PERSPECTIVE // HUD</span>
              </div>
            </Floating3DElement>

            {/* Visual Schematic Artwork */}
            <Floating3DElement depth={15} className="border-b border-[#1E2630] relative overflow-hidden bg-[#07090C]">
              <ProjectArtworkPreview type={project.previewType} project={project} />
            </Floating3DElement>

            {/* Sibal Design 2-Column Multi-Telemetry Body (3D Parallax Space) */}
            <div className="p-6 sm:p-8 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10" style={{ transformStyle: 'preserve-3d' }}>
              {/* Left Column (5 cols): 3D Floating Typography & Hero Details (Unified & Sejajar) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-6" style={{ transformStyle: 'preserve-3d' }}>
                <Floating3DElement depth={30} className="space-y-3.5" style={{ transformStyle: 'preserve-3d' }}>
                  <p className="font-mono-tech text-[11px] uppercase tracking-[0.22em] text-[#EF233C]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    FAA.DEV // {project.category}
                  </p>
                  <h3
                    id="modal-project-title"
                    className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-[-0.03em] text-[#F1EEE8] uppercase leading-tight select-none"
                    style={{ textShadow: '0 4px 14px rgba(0,0,0,0.9), 0 10px 25px rgba(0,0,0,0.75)' }}
                  >
                    {project.title}
                  </h3>
                  <p className="font-mono-tech text-xs text-[#8E8D8A]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    {project.role} &bull; Palembang, ID
                  </p>
                  <p className="text-xs sm:text-sm text-[#F1EEE8]/85 leading-relaxed pt-1" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.75)' }}>
                    {project.overview}
                  </p>
                </Floating3DElement>

                <Floating3DElement depth={35} className="pt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="group rounded-none inline-flex items-center gap-3 font-mono-tech text-xs uppercase tracking-[0.2em] px-5 py-2.5 border border-[#EF233C] text-[#EF233C] hover:bg-[#EF233C] hover:text-[#FFFFFF] transition-all duration-300"
                    style={{ boxShadow: '0 8px 20px rgba(0,0,0,0.7), 0 0 12px rgba(239,35,60,0.15)' }}
                  >
                    <span>CLOSE PREVIEW</span>
                    <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
                  </button>
                </Floating3DElement>
              </div>

              {/* Right Column (7 cols): Sibal 3-Column Spec/Stack/Highlights Grid (Unified & Sejajar) */}
              <Floating3DElement depth={26} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-[#1E2630]" style={{ transformStyle: 'preserve-3d' }}>
                {/* Col 1: SPEC */}
                <div className="space-y-4">
                  <div className="pb-2 border-b border-[#1E2630] font-mono-tech text-xs uppercase tracking-[0.2em] text-[#EF233C]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    SPEC
                  </div>
                  <div className="space-y-3 font-mono-tech text-xs">
                    <div>
                      <span className="text-[10px] text-[#8E8D8A] block uppercase tracking-wider mb-0.5">STATUS</span>
                      <span className="text-[#EF233C]">{project.statusLabel}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8E8D8A] block uppercase tracking-wider mb-0.5">YEAR</span>
                      <span className="text-[#F1EEE8]">{project.year}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8E8D8A] block uppercase tracking-wider mb-0.5">ROLE</span>
                      <span className="text-[#F1EEE8]">{project.role}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8E8D8A] block uppercase tracking-wider mb-0.5">INDEX</span>
                      <span className="text-[#EF233C]">{project.index}</span>
                    </div>
                  </div>
                </div>

                {/* Col 2: STACK */}
                <div className="space-y-4">
                  <div className="pb-2 border-b border-[#1E2630] font-mono-tech text-xs uppercase tracking-[0.2em] text-[#EF233C]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    STACK
                  </div>
                  <div className="flex flex-col gap-1.5 font-mono-tech text-xs text-[#F1EEE8]">
                    {project.stack.map((tech) => (
                      <span key={tech} className="text-[#F1EEE8]/90 hover:text-[#EF233C] transition-colors py-0.5 border-b border-[#1E2630]/60" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Col 3: HIGHLIGHTS */}
                <div className="space-y-4">
                  <div className="pb-2 border-b border-[#1E2630] font-mono-tech text-xs uppercase tracking-[0.2em] text-[#EF233C]" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.8)' }}>
                    HIGHLIGHTS
                  </div>
                  <div className="space-y-3 font-mono-tech text-xs text-[#8E8D8A]">
                    {project.architecturalNotes.map((note, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <span className="text-[10px] text-[#EF233C] block font-semibold">0{idx + 1} // ARCH</span>
                        <span className="text-[#F1EEE8]/85 text-[11px] leading-tight block" style={{ textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>{note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Floating3DElement>
            </div>

            {/* Sibal Bottom Telemetry Bar */}
            <Floating3DElement depth={25} className="px-6 py-3.5 border-t border-[#1E2630] bg-[#07090C] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 font-mono-tech text-xs text-[#8E8D8A]">
              <div className="flex items-center gap-3">
                <span className="inline-block w-2 h-2 bg-[#EF233C] shadow-[0_0_8px_#EF233C]" />
                <span className="text-[#F1EEE8] tracking-wider uppercase font-semibold">STATUS: ONLINE</span>
                <span className="text-[#2A3441]">&copy;</span>
                <span className="text-[#8E8D8A]">2026 MUHAMMAD FARIS ARRACHMAN</span>
              </div>
              <div className="tracking-[0.18em] text-[11px] text-[#EF233C]">
                {palembangTime}
              </div>
            </Floating3DElement>
          </Interactive3DFullModalCard>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}

/**
 * ============================================================================
 * MONUMENTAL FULL-BLEED EDITORIAL FOOTER
 * ============================================================================
 */

function Footer({ palembangTime }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-[#2A2A2A] bg-[#101010] pt-8 sm:pt-10 overflow-hidden">
      <div className="max-w-[1380px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Metadata & Back to Top Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-[#2A2A2A] font-mono-tech text-xs text-[#8E8D8A]">
          <div className="space-y-1">
            <p className="text-[#F1EEE8]">
              &copy; {PROFILE_META.year} {PROFILE_META.fullName}
            </p>
            <p className="text-[11px] tracking-wider uppercase">
              {PROFILE_META.location} — {palembangTime} — {PROFILE_META.coordinates}
            </p>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="group rounded-none inline-flex items-center gap-2.5 uppercase tracking-[0.18em] text-[#F1EEE8] hover:text-[#EF233C] transition-colors py-2"
          >
            <span>Back to Top</span>
            <span className="w-8 h-8 rounded-none border border-[#2A2A2A] group-hover:border-[#EF233C] flex items-center justify-center transition-colors">
              <ArrowUp className="w-3.5 h-3.5" />
            </span>
          </button>
        </div>

        {/* Sleek Minimal Status & Copyright Bar */}
        <div className="pt-6 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono-tech text-[11px] text-[#8E8D8A] uppercase tracking-wider border-t border-[#2A2A2A]/40 mt-6">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-[#EF233C] animate-pulse" />
            <span className="text-[#F1EEE8]">All Systems Nominal</span>
            <span className="text-[#2A2A2A]">/</span>
            <span>Palembang, Indonesia</span>
          </div>
          <p className="text-[#8E8D8A]">
            &copy; {PROFILE_META.year} {PROFILE_META.fullName} • Crafted with React &amp; Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}

/**
 * ============================================================================
 * ROOT APPLICATION COMPONENT
 * ============================================================================
 */

/**
 * ============================================================================
 * SIBAL-INSPIRED MONUMENTAL EDITORIAL PRELOADER (00% -> 100%)
 * Realistic organic counter, hairline progress bar, and dramatic curtain reveal.
 * ============================================================================
 */

function EditorialPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    let current = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 7) + 3;
      current += increment;

      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);
        setTimeout(() => {
          document.body.style.overflow = '';
          onComplete();
        }, 360);
      } else {
        setProgress(current);
      }
    }, 40);

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, [onComplete]);

  const statusText =
    progress < 25
      ? 'INITIALIZING VIEWPORT & CORES'
      : progress < 55
      ? 'LOADING DESIGN SYSTEMS & ASSETS'
      : progress < 85
      ? 'CONFIGURING TKJ NETWORK INFRASTRUCTURE'
      : 'SYSTEMS NOMINAL // READY';

  return (
    <motion.div
      initial={{ y: 0 }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex flex-col justify-between p-6 sm:p-10 lg:p-14 bg-[#0D0D0D] text-[#F1EEE8] select-none overflow-hidden"
    >
      {/* Top Telemetry Header */}
      <div className="flex items-center justify-between border-b border-[#2A2A2A] pb-5">
        <div className="flex items-baseline gap-2.5">
          <span className="text-xl sm:text-2xl font-extrabold tracking-[-0.04em] text-[#F1EEE8]">
            {PROFILE_META.monogram}
            <span className="text-[#EF233C]">.</span>
          </span>
          <span className="font-mono-tech text-[10px] tracking-[0.22em] uppercase text-[#8E8D8A] border-l border-[#2A2A2A] pl-2.5">
            ED. {PROFILE_META.year}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2.5 font-mono-tech text-[11px] tracking-[0.2em] uppercase text-[#8E8D8A]">
          <span className="w-2 h-2 rounded-none bg-[#EF233C] animate-pulse" />
          <span>{PROFILE_META.location}</span>
        </div>
      </div>

      {/* Center Monumental Counter Display */}
      <div className="flex flex-col items-start sm:items-center justify-center my-auto py-8">
        <div className="font-mono-tech text-[11px] sm:text-xs uppercase tracking-[0.26em] text-[#EF233C] mb-3 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#EF233C]" />
          <span>PORTFOLIO INITIALIZATION</span>
        </div>

        <div
          className="font-extrabold tracking-[-0.06em] leading-none text-[#F1EEE8] font-mono-tech select-none"
          style={{ fontSize: 'clamp(5.5rem, 21vw, 16rem)' }}
        >
          {progress < 10 ? `00${progress}` : progress < 100 ? `0${progress}` : progress}
          <span className="text-[#EF233C] text-[0.42em] ml-1 sm:ml-2 font-bold">%</span>
        </div>

        <div className="font-mono-tech text-xs tracking-[0.2em] uppercase text-[#8E8D8A] mt-4 text-left sm:text-center">
          {statusText}
        </div>
      </div>

      {/* Bottom Progress Bar & Architecture Metadata */}
      <div>
        <div className="w-full bg-[#1C1C1C] h-[2px] mb-6 overflow-hidden relative">
          <div
            className="h-full bg-[#EF233C] transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono-tech text-xs uppercase tracking-wider text-[#8E8D8A]">
          <div>
            <span className="text-[#F1EEE8]">{PROFILE_META.fullName}</span>
            <span className="mx-2 text-[#2A2A2A]">•</span>
            <span>{PROFILE_META.institution}</span>
          </div>
          <div className="flex items-center gap-2 text-[#EF233C]">
            <span className="w-1.5 h-1.5 rounded-none bg-[#EF233C] animate-pulse" />
            <span className="font-medium">{progress === 100 ? 'ENTER // UNLOCKING' : 'LOADING'}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [cursorLabel, setCursorLabel] = useState(null);
  const palembangTime = usePalembangClock();

  // Persistent Theme State: 'dark' | 'light'
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('faris_portfolio_theme');
      if (savedTheme) return savedTheme;
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
        return 'light';
      }
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
      root.style.backgroundColor = '#F8F7F4';
      root.style.color = '#141414';
      if (document.body) {
        document.body.style.backgroundColor = '#F8F7F4';
        document.body.style.color = '#141414';
      }
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
      root.style.backgroundColor = '#101010';
      root.style.color = '#F1EEE8';
      if (document.body) {
        document.body.style.backgroundColor = '#101010';
        document.body.style.color = '#F1EEE8';
      }
    }
    localStorage.setItem('faris_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };


  // Lightweight scroll spy for active navbar state
  useEffect(() => {
    const sectionIds = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
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
    <div data-theme={theme} className={`relative min-h-screen ${theme === 'light' ? 'bg-[#F8F7F4] text-[#141414]' : 'bg-[#101010] text-[#F1EEE8]'} font-sans-editorial antialiased selection:bg-[#EF233C] selection:text-[#FFFFFF] overflow-x-clip`}>
      {/* Sibal-Inspired Monumental Preloader Animation */}
      <AnimatePresence mode="wait">
        {isLoading && (
          <EditorialPreloader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      {/* Editorial Google Fonts, Keyframes & Custom Design Tokens */}
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

        @keyframes sibalMarquee {
          0% {
            transform: translate3d(0%, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }

        .animate-sibal-marquee {
          animation: sibalMarquee 26s linear infinite;
        }

        /* Custom sharp dark scrollbar */
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

      {/* Subtle 4-Column Structural Hairline Blueprint Grid */}
      <BlueprintGridOverlay />

      {/* Desktop Spring Cursor Follower */}
      <CustomSpringCursor label={cursorLabel} />

      {/* Sticky Editorial Navigation with Live Palembang Telemetry */}
      <Navbar activeSection={activeSection} palembangTime={palembangTime} theme={theme} onToggleTheme={toggleTheme} />

      {/* Main Content Flow: Hero + 5 Two-Column Swiss Editorial Bands */}
      <main>
        <Hero palembangTime={palembangTime} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onCursorChange={setCursorLabel} />
        <ExperienceSection onCursorChange={setCursorLabel} />
        <ContactSection palembangTime={palembangTime} onCursorChange={setCursorLabel} />
      </main>

      {/* Monumental Full-Bleed Editorial Footer */}
      <Footer palembangTime={palembangTime} />

      {/* Floating Scroll to Top Button */}
      <FloatingDock theme={theme} onToggleTheme={toggleTheme} />
    </div>
  );
}
