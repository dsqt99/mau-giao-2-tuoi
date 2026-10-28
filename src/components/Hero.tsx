import React, { useState } from 'react';
import { Gamepad2, PlayCircle, Sparkles, Volume2 } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

interface HeroProps {
  fullName: string;
  nickname: string;
  stars: number;
  onExploreGames: () => void;
  onExploreVideos: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  fullName,
  nickname,
  onExploreGames,
  onExploreVideos,
}) => {
  const [isBeeInteracted, setIsBeeInteracted] = useState(false);

  const handleBeeClick = () => {
    setIsBeeInteracted(true);
    soundEngine.playBeeBuzz();
    soundEngine.speakVietnamese(`Xin chào Đỗ Minh Hoàng! Chúc bé Ong học thật vui vẻ nhé!`);
    setTimeout(() => setIsBeeInteracted(false), 1800);
  };

  return (
    <section className="relative overflow-hidden pt-3 pb-6 md:pt-6 md:pb-10 px-4 max-w-6xl mx-auto w-full">
      {/* Decorative Floating Clouds and Soft Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none -z-10 opacity-70">
        <div className="absolute -top-10 -left-10 w-48 h-48 bg-amber-200/50 rounded-full blur-3xl"></div>
        <div className="absolute top-10 right-4 w-60 h-60 bg-sky-200/60 rounded-full blur-3xl"></div>
      </div>

      {/* Adaptive iPad Container: Split side-by-side in Landscape / Wide screens */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 text-center lg:text-left">
        {/* Left Column: Heading, Subtext, and Primary CTAs */}
        <div className="flex-1 flex flex-col items-center lg:items-start max-w-2xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 bg-white/95 border-2 border-amber-300 px-3.5 py-1 rounded-full shadow-sm mb-2.5">
            <span className="text-base sm:text-lg">🌟</span>
            <span className="text-[11px] sm:text-xs font-black text-amber-950 uppercase tracking-wider">
              Lớp Donald 2 • Dành Riêng Cho Bé 2 Tuổi
            </span>
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          </div>

          {/* H1 Heading - Controlled Scale for iPad Portrait & Landscape */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 leading-tight tracking-tight mb-3">
            Chào <span className="text-amber-500 drop-shadow-sm">{nickname}</span> –{' '}
            <span className="text-sky-600 underline decoration-amber-400 decoration-wavy decoration-2">
              {fullName}
            </span>{' '}
            học vui mỗi ngày!
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-base lg:text-lg font-bold text-slate-600 mb-5 leading-relaxed max-w-xl">
            Cùng chú Ong vàng khám phá bóng bay sắc màu, tiếng kêu muông thú, đàn gõ cầu vồng và đếm số 1 đến 5 nào!
          </p>

          {/* Big Chunky Primary Action Buttons (Fit iPad viewports) */}
          <div className="flex flex-row items-center gap-3 sm:gap-4 w-full max-w-md">
            <button
              onClick={() => {
                soundEngine.playPop(1.4);
                onExploreGames();
              }}
              className="flex-1 flex items-center justify-center gap-2 sm:gap-2.5 bg-gradient-to-b from-amber-400 to-amber-500 text-amber-950 text-base sm:text-lg font-black px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-amber-600 shadow-[0_6px_0_#d97706] active:translate-y-1.5 active:shadow-[0_0px_0_#d97706] transition-all cursor-pointer clay-btn"
            >
              <Gamepad2 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-950 shrink-0" />
              <span>BÉ CHƠI GAME</span>
            </button>

            <button
              onClick={() => {
                soundEngine.playPop(1.1);
                onExploreVideos();
              }}
              className="flex-1 flex items-center justify-center gap-2 sm:gap-2.5 bg-gradient-to-b from-sky-400 to-sky-500 text-sky-950 text-base sm:text-lg font-black px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl sm:rounded-3xl border-3 sm:border-4 border-sky-600 shadow-[0_6px_0_#0284c7] active:translate-y-1.5 active:shadow-[0_0px_0_#0284c7] transition-all cursor-pointer clay-btn"
            >
              <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 text-sky-950 shrink-0" />
              <span>XEM VIDEO</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive 3D Flapping Mascot Bé Ong */}
        <div className="relative group cursor-pointer shrink-0 mt-2 lg:mt-0" onClick={handleBeeClick}>
          <div
            className={`relative w-36 h-36 sm:w-48 sm:h-48 lg:w-60 lg:h-60 transition-transform duration-300 ${
              isBeeInteracted ? 'scale-110 animate-bounce' : 'animate-float'
            }`}
          >
            {/* SVG Cartoon Mascot: Bé Ong Hoàng */}
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full drop-shadow-xl"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Wings */}
              <ellipse
                cx="65"
                cy="60"
                rx="35"
                ry="45"
                fill="#BAE6FD"
                fillOpacity="0.85"
                stroke="#38BDF8"
                strokeWidth="4"
                transform="rotate(-25 65 60)"
                className="animate-flap"
              />
              <ellipse
                cx="135"
                cy="60"
                rx="35"
                ry="45"
                fill="#BAE6FD"
                fillOpacity="0.85"
                stroke="#38BDF8"
                strokeWidth="4"
                transform="rotate(25 135 60)"
                className="animate-flap"
              />

              {/* Antennae */}
              <path
                d="M80 65 Q70 30 55 40"
                stroke="#1E293B"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="53" cy="40" r="7" fill="#F59E0B" stroke="#1E293B" strokeWidth="3" />
              <path
                d="M120 65 Q130 30 145 40"
                stroke="#1E293B"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="147" cy="40" r="7" fill="#F59E0B" stroke="#1E293B" strokeWidth="3" />

              {/* Bee Body */}
              <ellipse
                cx="100"
                cy="115"
                rx="55"
                ry="65"
                fill="#FBBF24"
                stroke="#1E293B"
                strokeWidth="6"
              />

              {/* Stripes */}
              <path
                d="M50 110 Q100 125 150 110"
                stroke="#1E293B"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M55 140 Q100 155 145 140"
                stroke="#1E293B"
                strokeWidth="12"
                strokeLinecap="round"
                fill="none"
              />

              {/* Rosy Cheeks */}
              <ellipse cx="72" cy="105" rx="8" ry="6" fill="#FB7185" />
              <ellipse cx="128" cy="105" rx="8" ry="6" fill="#FB7185" />

              {/* Eyes */}
              <ellipse cx="80" cy="90" rx="9" ry="12" fill="#0F172A" />
              <circle cx="83" cy="86" r="3.5" fill="#FFFFFF" />
              <ellipse cx="120" cy="90" rx="9" ry="12" fill="#0F172A" />
              <circle cx="123" cy="86" r="3.5" fill="#FFFFFF" />

              {/* Big Happy Smile */}
              <path
                d="M85 106 Q100 124 115 106"
                stroke="#0F172A"
                strokeWidth="5"
                strokeLinecap="round"
                fill="#EF4444"
              />

              {/* Little Stinger */}
              <polygon points="95,178 105,178 100,192" fill="#1E293B" />
            </svg>
          </div>

          {/* Interactive Speech Bubble */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white border-3 border-amber-400 px-3 py-1 rounded-2xl shadow-md flex items-center gap-1.5 whitespace-nowrap clay-btn">
            <Volume2 className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="text-xs font-black text-amber-950">
              Chạm vào tớ đi bé Hoàng! 🐝
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
