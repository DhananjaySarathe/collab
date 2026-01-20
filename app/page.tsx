"use client";

import React from "react";
import {
  ChevronRight,
  Coffee,
  ExternalLink,
  Github,
  Linkedin,
  Send,
  Youtube
} from "lucide-react";

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
      noPadding ? "p-0" : "p-6"
    }`}
  >
    {title && (
      <div className="absolute -top-5 left-4 bg-gray-200 text-gray-900 px-4 py-1 font-bold uppercase tracking-widest text-sm border-2 border-gray-900 z-10">
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
  className = ""
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  className?: string;
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

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const RetroInput = ({
  label,
  placeholder,
  type = "text"
}: {
  label: string;
  placeholder: string;
  type?: string;
}) => (
  <div className="mb-4">
    <label className="block text-xs uppercase text-green-400 mb-2 font-bold">{label}</label>
    <input
      type={type}
      placeholder={placeholder}
      className="w-full bg-gray-800 border-2 border-gray-600 p-3 text-white font-mono focus:border-green-400 focus:outline-none focus:shadow-[0_0_10px_rgba(74,222,128,0.5)] placeholder-gray-600"
    />
  </div>
);

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

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-md border-b-4 border-gray-800 z-50 h-16 flex items-center px-4 md:px-8 justify-between">
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 bg-yellow-400 border-2 border-white animate-pulse shadow-[0_0_10px_rgba(250,204,21,0.5)]"></div>
      <span className="text-xl md:text-2xl font-bold text-white tracking-widest font-vt323">
        CHILLED<span className="text-yellow-400">BEER</span>
      </span>
    </div>
    <div className="hidden md:flex gap-6 text-sm font-bold uppercase tracking-widest text-gray-400">
      <a href="#content" className="hover:text-green-400 hover:underline decoration-2 underline-offset-4">
        Content
      </a>
      <a href="#collab" className="hover:text-yellow-400 hover:underline decoration-2 underline-offset-4">
        Collab
      </a>
    </div>
    <PixelButton variant="primary" className="!py-1 !px-3 !text-xs">
      Connect
    </PixelButton>
  </nav>
);

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center relative overflow-hidden pt-20 px-4 bg-[#050505]">
      {/* Grid Background */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0, 255, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 0, 0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px"
        }}
      ></div>

      <div className="z-10 text-center max-w-4xl mx-auto space-y-8">
        <div className="inline-block bg-gray-800 px-4 py-1 rounded-none border border-green-500/50 text-green-400 font-mono text-sm mb-4 animate-fade-in-up shadow-[0_0_15px_rgba(74,222,128,0.2)]">
          LOCATION: BENGALURU_SERVER_1
        </div>

        <h1 className="text-5xl md:text-8xl font-bold text-white leading-none font-vt323 drop-shadow-[4px_4px_0_rgba(0,0,0,1)]">
          BUILDING THE FUTURE <br />
          <span className="text-yellow-400">ONE PIXEL AT A TIME</span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-400 font-mono max-w-2xl mx-auto leading-relaxed">
          Founders, Builders, and Creators of Bangalore.
          <br />
          Let&apos;s collaborate, ship products, and drink chilled beer.
        </p>

        <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
          <PixelButton
            variant="primary"
            onClick={() => document.getElementById("collab")?.scrollIntoView({ behavior: "smooth" })}
          >
            Start Collaboration
          </PixelButton>
          <PixelButton
            variant="ghost"
            onClick={() => window.open("https://www.youtube.com/@ChilledBeer", "_blank", "noopener,noreferrer")}
          >
            <div className="flex items-center gap-2">
              <Youtube size={18} />
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
    <section id="content" className="py-20 bg-gray-900 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-start">
          {/* Character Card / Profile */}
          <div className="w-full md:w-1/3 sticky top-24">
            <PixelCard className="bg-gray-800 border-gray-600 text-center">
              <div className="w-32 h-32 bg-gray-900 mx-auto mb-6 border-4 border-white overflow-hidden relative group">
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

const CollabSection = () => {
  return (
    <section id="collab" className="py-20 bg-[#0a0a0a] relative overflow-hidden">
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
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-5xl font-vt323 text-white mb-4">
                JOIN THE <span className="text-green-400">PARTY</span>
              </h2>
              <p className="text-gray-400 font-mono">
                Are you building something cool in Bangalore? <br />
                We are looking for Developers, Designers, and Founders to share their stories.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-black/50 p-6 border-2 border-dashed border-gray-700">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <Coffee size={20} className="text-yellow-400" /> Why Connect?
                </h3>
                <ul className="space-y-4 text-sm text-gray-300 font-mono">
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

              <div className="space-y-4">
                <RetroInput label="Player Name" placeholder="Enter your name..." />
                <RetroInput label="Guild / Project" placeholder="What are you building?" />
                <RetroInput label="Communication Channel" placeholder="Email or Twitter handle" />
                <PixelButton variant="primary" className="w-full flex justify-center items-center gap-2">
                  <Send size={16} /> Send Request
                </PixelButton>
              </div>
            </div>
          </PixelCard>
        </div>
      </div>
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
  return (
    <div className="bg-[#050505] min-h-screen font-sans selection:bg-green-500 selection:text-black">
      <Navbar />
      <Hero />
      <ChannelStats />
      <CollabSection />
      <Footer />
    </div>
  );
}

