"use client";

import React from "react";
import {
  ChevronRight,
  Coffee,
  ExternalLink,
  Github,
  Linkedin,
  Send,
  Youtube,
  X
} from "lucide-react";
import { trackFormSubmission } from "@/lib/mixpanel";

// --- Constants ---

// REPLACE THESE WITH YOUR ACTUAL YOUTUBE VIDEO IDs
const LATEST_VIDEOS = [
  { id: "SVVpGOyQLXs", title: "How I Got Hired as a Freshman (Without Campus Placement)" },
  { id: "wC3WhSFRXp0", title: "My Life as a Software Engineer in Bangalore" },
  { id: "2ilCBd9LE_U", title: "My Life as a Remove SDE" }
];

// --- Components ---

const PixelCard = ({
  children,
  className = "",
  title,
  noPadding = false
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  noPadding?: boolean;
}) => (
  <div
    className={`relative bg-gray-900 border-4 border-gray-200 shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] ${className} ${
    noPadding ? "p-0" : "p-4 md:p-6"
    }`}
  >
    {title && (
      <div className="absolute -top-5 left-2 md:left-4 bg-gray-200 text-gray-900 px-3 md:px-4 py-1 font-bold uppercase tracking-widest text-xs md:text-sm border-2 border-gray-900 z-10">
        {title}
      </div>
    )}
    {children}
  </div>
);

const PixelButton = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
  disabled = false
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}) => {
  const baseStyles =
    "relative px-6 py-3 font-bold uppercase text-sm transition-all transform active:translate-y-1 active:translate-x-1 active:shadow-none border-2";

  const variants = {
    primary:
      "bg-[#f4d73b] text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffe14f]",
    secondary:
      "bg-white text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100",
    danger:
      "bg-[#ff4d4d] text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ff6666]",
    ghost:
      "bg-transparent text-green-400 border-green-400 shadow-[4px_4px_0px_0px_rgba(74,222,128,0.4)] hover:bg-green-400/10"
  } as const;

  const disabledStyles = disabled 
    ? "opacity-50 cursor-not-allowed pointer-events-none" 
    : "";

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
};

const RetroInput = ({
  label,
  placeholder,
  type = "text",
  name,
  required = false
}: {
  label: string;
  placeholder: string;
  type?: string;
  name?: string;
  required?: boolean;
}) => (
  <div className="mb-4">
    <label className="block text-xs uppercase text-green-400 mb-2 font-bold">{label}</label>
    <input
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      className="w-full bg-gray-800 border-2 border-gray-600 p-3 text-white font-mono focus:border-green-400 focus:outline-none focus:shadow-[0_0_10px_rgba(74,222,128,0.5)] placeholder-gray-600 transition-all"
    />
  </div>
);

const RetroTextarea = ({
  label,
  placeholder,
  name,
  required = false
}: {
  label: string;
  placeholder: string;
  name?: string;
  required?: boolean;
}) => (
  <div className="mb-4">
    <label className="block text-xs uppercase text-green-400 mb-2 font-bold">{label}</label>
    <textarea
      name={name}
      required={required}
      placeholder={placeholder}
      rows={4}
      className="w-full bg-gray-800 border-2 border-gray-600 p-3 text-white font-mono focus:border-green-400 focus:outline-none focus:shadow-[0_0_10px_rgba(74,222,128,0.5)] placeholder-gray-600 transition-all resize-none"
    />
  </div>
);

const Modal = ({
  isOpen,
  onClose,
  children,
  title
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg transform transition-all animate-fade-in-up">
        <PixelCard title={title} className="bg-[#111] border-green-500 shadow-[0_0_30px_rgba(74,222,128,0.1)]">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
          {children}
        </PixelCard>
      </div>
    </div>
  );
};

const RetroTV = ({ videoId, title }: { videoId: string; title: string }) => (
  <div className="group relative">
    {/* TV Frame */}
    <div className="bg-[#2a2a2a] p-3 pb-8 rounded-lg border-4 border-gray-600 shadow-xl relative">
      {/* Screen Container */}
      <div className="relative aspect-video bg-black overflow-hidden border-2 border-black mb-2">
        <iframe
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>

        {/* CRT Scanline Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 pointer-events-none bg-[length:100%_4px,6px_100%]"></div>

        {/* Screen Glitch/Reflection */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-20"></div>
      </div>

      {/* TV Controls */}
      <div className="flex justify-between items-center px-2">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-[10px] text-green-500 font-mono tracking-widest uppercase">
            LIVE FEED
          </span>
        </div>
        <div className="flex gap-1">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="w-1 h-3 bg-gray-700"></div>
          ))}
        </div>
      </div>
    </div>
    <h4 className="mt-3 text-white font-vt323 text-xl tracking-wide truncate">{title}</h4>
  </div>
);

// --- Sections ---

const Navbar = ({ onConnectClick }: { onConnectClick: () => void }) => (
  <nav className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-b-4 border-gray-800 z-50 h-16 flex items-center px-4 md:px-8 justify-between">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-yellow-400 border-2 border-white animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
      <span className="text-xl md:text-2xl font-bold text-white tracking-widest font-vt323">
        CHILLED<span className="text-yellow-400">BEER</span>
      </span>
    </div>
    <div className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-400">
      <a
        href="#content"
        className="hover:text-green-400 hover:underline decoration-2 underline-offset-4 transition-all"
      >
        Content
      </a>
      <a
        href="#collab"
        className="hover:text-yellow-400 hover:underline decoration-2 underline-offset-4 transition-all"
      >
        Collab
      </a>
    </div>
    <PixelButton 
      variant="primary" 
      className="!py-1 !px-3 !text-xs"
      onClick={onConnectClick}
    >
      Connect
    </PixelButton>
  </nav>
);

const Hero = () => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center items-center relative overflow-hidden pt-24 pb-12 px-4 bg-[#050505]">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      ></div>

      {/* Vignette & Scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] pointer-events-none z-0"></div>
      <div className="absolute inset-0 scanlines z-0 opacity-30"></div>

      <div className="z-10 text-center max-w-5xl mx-auto space-y-6 md:space-y-10 relative">
        <div className="inline-block bg-gray-900/80 backdrop-blur-sm px-4 py-1.5 rounded border border-green-500/30 text-green-400 font-mono text-xs md:text-sm mb-4 animate-fade-in-up shadow-[0_0_15px_rgba(74,222,128,0.1)] tracking-wider">
          <span className="animate-pulse mr-2">●</span>
          LOCATION: BENGALURU_SERVER_1
        </div>

        <h1 className="text-5xl sm:text-7xl md:text-9xl font-bold text-white leading-[0.85] tracking-wide font-vt323 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          BUILDING THE FUTURE <br />
          <span className="text-[#f4d73b] drop-shadow-[0_0_15px_rgba(244,215,59,0.3)]">
            ONE PIXEL AT A TIME
          </span>
        </h1>

        <p className="text-base sm:text-xl md:text-2xl text-gray-400 font-mono max-w-3xl mx-auto leading-relaxed px-4">
          Founders, Builders, and Creators of Bangalore.
          <br className="hidden md:block" />
          Let&apos;s collaborate, ship products, and drink chilled beer.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-10 w-full px-6 sm:px-0 max-w-md sm:max-w-none mx-auto">
          <PixelButton
            variant="primary"
            onClick={() => document.getElementById("collab")?.scrollIntoView({ behavior: "smooth" })}
            className="w-full sm:w-auto justify-center flex text-base py-4"
          >
            Start Collaboration
          </PixelButton>
          <PixelButton
            variant="ghost"
            onClick={() => window.open("https://www.youtube.com/@ChilledBeer", "_blank", "noopener,noreferrer")}
            className="w-full sm:w-auto justify-center flex text-base py-4"
          >
            <div className="flex items-center gap-2">
              <Youtube size={20} />
              Visit Channel
            </div>
          </PixelButton>
        </div>
      </div>
    </section>
  );
};

const ChannelStats = () => {
  return (
    <section id="content" className="py-12 md:py-20 bg-gray-900 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Character Card / Profile */}
          <div className="w-full md:w-1/3 static md:sticky md:top-24">
            <PixelCard className="bg-gray-800 border-gray-600 text-center h-full md:h-auto">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-900 mx-auto mb-6 border-4 border-white overflow-hidden relative group">
                {/* Avatar Placeholder - Pixel Art Smiley */}
                <div className="w-full h-full flex items-center justify-center bg-[#f4d73b]">
                  <div className="space-y-1 relative">
                    {/* Pixel Face */}
                    <div className="flex gap-4">
                      <div className="w-4 h-4 bg-black"></div>
                      <div className="w-4 h-4 bg-black"></div>
                    </div>
                    <div className="w-16 h-2 bg-black mt-4"></div>
                    {/* Sunglasses */}
                    <div className="absolute -top-1 -left-1 w-20 h-6 bg-black opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white font-vt323 mb-1">DHANANJAY SARATHE</h2>
              <p className="text-green-400 text-sm font-mono mb-6">CREATOR • FOUNDER • BUILDER</p>

              <div className="space-y-4 text-left font-mono text-xs">
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">GUILD</span>
                  <span className="text-white">Quickads</span>
                </div>
                <div className="flex justify-between border-b border-gray-700 pb-2">
                  <span className="text-gray-400">BASE</span>
                  <span className="text-white">Bengaluru, IN</span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-400">STATUS</span>
                  <span className="text-yellow-400 animate-pulse">Recording...</span>
                </div>
              </div>

              <div className="mt-6 flex justify-center gap-4">
                <a href="#" className="p-2 bg-gray-700 hover:bg-gray-600 border-2 border-black transition-colors">
                  <Linkedin size={20} className="text-white" />
                </a>
                <a href="#" className="p-2 bg-gray-700 hover:bg-gray-600 border-2 border-black transition-colors">
                  <Github size={20} className="text-white" />
                </a>
              </div>
            </PixelCard>
          </div>

          {/* Videos Section */}
          <div className="w-full md:w-2/3 space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-8 bg-green-500"></div>
              <h3 className="text-3xl font-vt323 text-white tracking-wider">LATEST TRANSMISSIONS</h3>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {LATEST_VIDEOS.map((video, index) => (
                <RetroTV key={index} videoId={video.id} title={video.title} />
              ))}
            </div>

            <div className="mt-8 text-center">
              <a
                href="https://www.youtube.com/@ChilledBeer"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white hover:underline decoration-2 underline-offset-4 font-mono text-sm transition-colors"
              >
                VIEW ARCHIVE <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CollabSection = ({ 
  isModalOpen, 
  setIsModalOpen 
}: { 
  isModalOpen: boolean; 
  setIsModalOpen: (open: boolean) => void;
}) => {
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !isModalOpen) return;

    const handleIframeLoad = () => {
      // When iframe loads, form was submitted
      setIsSubmitted(true);
      
      // Track successful form submission with readable property names
      const form = document.querySelector('form') as HTMLFormElement;
      if (form) {
        const formData = new FormData(form);
        
        // Map Google Forms entry IDs to readable property names
        const fieldMapping: Record<string, string> = {
          'entry.575236684': 'Name',
          'entry.113215161': 'Communication Channel',
          'entry.1261980469': 'Guild / Project',
          'entry.272861269': 'The Context',
        };
        
        const submissionData: Record<string, string> = {};
        formData.forEach((value, key) => {
          // Use readable name if mapping exists, otherwise use original key
          const propertyName = fieldMapping[key] || key;
          submissionData[propertyName] = value.toString();
        });
        
        trackFormSubmission('Join The Party Form', {
          ...submissionData,
          timestamp: new Date().toISOString(),
        });
      }
      
      setTimeout(() => {
        setIsModalOpen(false);
        setIsSubmitted(false);
      }, 3000);
    };

    iframe.addEventListener('load', handleIframeLoad);
    return () => iframe.removeEventListener('load', handleIframeLoad);
  }, [isModalOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // Don't prevent default - let form submit to iframe
    // Google Forms only accepts client-side submissions
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <section id="collab" className="py-12 md:py-20 bg-[#0a0a0a] relative overflow-hidden">
      {/* Decorative Pixels */}
      <div className="absolute top-0 right-0 p-8 opacity-20 hidden lg:block">
        <div className="grid grid-cols-4 gap-2">
          {[...Array(16)].map((_, i) => (
            <div key={i} className={`w-4 h-4 ${i % 3 === 0 ? "bg-green-500" : "bg-gray-700"}`}></div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <PixelCard title="MULTIPLAYER LOBBY" className="bg-[#111] border-green-500/30">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-3xl md:text-5xl font-vt323 text-white mb-4">
                JOIN THE <span className="text-green-400">PARTY</span>
              </h2>
              <p className="text-sm md:text-base text-gray-400 font-mono">
                Are you building something cool in Bangalore? <br className="hidden md:block" />
                We are looking for Developers, Designers, Creators and Founders to share their stories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/50 p-4 md:p-6 border-2 border-dashed border-gray-700">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-sm md:text-base">
                  <Coffee size={20} className="text-yellow-400" /> Why Connect?
                </h3>
                <ul className="space-y-4 text-xs md:text-sm text-gray-300 font-mono">
                  <li className="flex gap-3">
                    <ChevronRight size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Feature your product on ChilledBeer YouTube</span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Find co-founders or beta testers</span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Discuss scaling strategies (0 -&gt; 1)</span>
                  </li>
                  <li className="flex gap-3">
                    <ChevronRight size={16} className="text-green-400 mt-1 shrink-0" />
                    <span>Just hang out and network</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-6 flex flex-col justify-center h-full">
                <div className="space-y-2 text-center md:text-left">
                  <h4 className="text-green-400 font-vt323 text-2xl uppercase">Ready to Connect?</h4>
                  <p className="text-gray-400 font-mono text-sm">
                    We review requests every weekend. Click the button below to drop your details.
                  </p>
                </div>

                <PixelButton 
                  variant="primary" 
                  className="w-full flex justify-center items-center gap-2 py-4 animate-pulse hover:animate-none"
                  onClick={handleOpenModal}
                >
                  <Send size={18} /> JOIN THE PARTY
                </PixelButton>
              </div>
            </div>
          </PixelCard>
        </div>
      </div>

      {/* Application Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="NEW PLAYER REGISTRATION"
      >
        {isSubmitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center animate-bounce">
              <Send size={32} className="text-black" />
            </div>
            <h3 className="text-2xl font-vt323 text-white">TRANSMISSION SENT!</h3>
            <p className="text-gray-400 font-mono text-sm">
              We have received your signal. <br/> Stay tuned for incoming connection.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-400 font-mono text-xs mb-6 border-l-2 border-yellow-400 pl-3">
              Fill out the form below to join the waitlist. We usually reply within 48 hours.
            </p>
            
            <iframe 
              ref={iframeRef}
              name="hidden_iframe" 
              id="hidden_iframe" 
              style={{position: 'absolute', left: '-9999px', width: '1px', height: '1px', border: 'none'}}
              title="Hidden iframe for form submission"
            ></iframe>
            <form 
              action="https://docs.google.com/forms/d/e/1FAIpQLSewjhj_RTogrHrX72HID0ZBPVmTWEm5ta9lyNsGoVLeohSvRA/formResponse"
              method="POST"
              target="hidden_iframe"
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <RetroInput 
                label="Player Name" 
                placeholder="Enter your name..." 
                name="entry.575236684" 
                required 
              />
              <RetroInput 
                label="Communication Channel" 
                placeholder="Twitter/X or Email" 
                name="entry.113215161" 
                required 
              />
              <RetroInput 
                label="Guild / Project" 
                placeholder="What are you building?" 
                name="entry.1261980469" 
                required 
              />
              <RetroTextarea 
                label="The Context" 
                placeholder="What would you like to discuss or show us?" 
                name="entry.272861269" 
                required 
              />
              
              <div className="pt-4">
                <PixelButton 
                  type="submit" 
                  variant="primary" 
                  className="w-full flex justify-center items-center gap-2"
                >
                  <Send size={16} /> TRANSMIT DATA
                </PixelButton>
              </div>
            </form>
          </div>
        )}
      </Modal>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-black py-8 border-t-4 border-gray-800 text-center">
    <div className="flex justify-center gap-6 mb-6">
      <a href="#" className="text-gray-500 hover:text-white transition-colors">
        <Youtube />
      </a>
      <a href="#" className="text-gray-500 hover:text-white transition-colors">
        <Linkedin />
      </a>
      <a href="#" className="text-gray-500 hover:text-white transition-colors">
        <Github />
      </a>
    </div>
    <p className="text-gray-600 font-vt323 text-xl">© 2026 CHILLED BEER STUDIOS. PRESS START TO BEGIN.</p>
  </footer>
);

export default function Page() {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleConnectClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="bg-[#050505] min-h-screen font-sans selection:bg-green-500 selection:text-black">
      <Navbar onConnectClick={handleConnectClick} />
      <Hero />
      <ChannelStats />
      <CollabSection isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <Footer />
    </div>
  );
}

