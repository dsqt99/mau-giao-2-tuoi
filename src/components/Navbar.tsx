import React, { useState } from 'react';
import { Volume2, VolumeX, Maximize2, Minimize2, Shield, Star, Award, Heart, Mic, MicOff } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

interface NavbarProps {
  fullName: string;
  nickname: string;
  className: string;
  stars: number;
  onOpenParentModal: () => void;
  onOpenStickers: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  fullName,
  nickname,
  className,
  stars,
  onOpenParentModal,
  onOpenStickers,
}) => {
  const [isMuted, setIsMuted] = useState(soundEngine.isMuted());
  const [isVoiceOn, setIsVoiceOn] = useState(soundEngine.isVoiceEnabled());
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleSound = () => {
    const nextMuted = soundEngine.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundEngine.playPop(1.5);
    }
  };

  const toggleVoice = () => {
    const nextVoice = soundEngine.toggleVoice();
    setIsVoiceOn(nextVoice);
    soundEngine.playPop(1.3);
  };

  const toggleFullscreen = () => {
    soundEngine.playPop(1.2);
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  return (
    <header className="sticky top-2 z-50 px-2 sm:px-6 max-w-7xl mx-auto w-full transition-all pt-[max(0.25rem,env(safe-area-inset-top))]">
      <div className="bg-white/95 backdrop-blur-md border-3 sm:border-4 border-amber-300 rounded-3xl shadow-xl px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Profile Badge for Bé Ong */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative group cursor-pointer" onClick={() => soundEngine.playBeeBuzz()}>
            <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl bg-amber-400 border-3 border-amber-500 flex items-center justify-center text-xl sm:text-3xl shadow-md clay-btn transform active:scale-95 transition-transform">
              🐝
            </div>
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 border-2 border-white w-3.5 h-3.5 rounded-full"></span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-extrabold text-sm sm:text-xl text-amber-950 tracking-tight">
                {nickname}
              </span>
              <span className="text-[11px] sm:text-sm font-semibold text-slate-500 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-200">
                {fullName}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-sky-600 flex items-center gap-1">
              <Heart className="w-3 h-3 text-rose-500 fill-rose-500 inline" /> {className}
            </span>
          </div>
        </div>

        {/* Action Pills & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Star Counter */}
          <button
            onClick={() => {
              soundEngine.playFanfare();
              onOpenStickers();
            }}
            className="flex items-center gap-1 sm:gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-300 border-2 sm:border-3 border-amber-500 px-2.5 py-1 sm:px-4 sm:py-2 rounded-2xl text-amber-950 font-black shadow-md clay-btn active:translate-y-1 transition-all"
            title="Số sao bé đạt được"
          >
            <Star className="w-4 h-4 sm:w-5 sm:h-5 text-amber-950 fill-amber-950 animate-gentle-bounce" />
            <span className="text-sm sm:text-lg">{stars}</span>
            <Award className="w-4 h-4 text-amber-900 hidden sm:inline" />
          </button>

          {/* Sound FX Toggle */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            title={isMuted ? 'Bật âm thanh' : 'Tắt âm thanh'}
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center border-2 sm:border-3 transition-all clay-btn ${
              isMuted
                ? 'bg-rose-100 border-rose-300 text-rose-600'
                : 'bg-emerald-100 border-emerald-300 text-emerald-700'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Voice Speech Toggle */}
          <button
            onClick={toggleVoice}
            aria-label={isVoiceOn ? 'Tắt giọng nói' : 'Bật giọng nói'}
            title={isVoiceOn ? 'Giọng nói: Đang bật' : 'Giọng nói: Đang tắt'}
            className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center border-2 sm:border-3 transition-all clay-btn ${
              isVoiceOn
                ? 'bg-amber-100 border-amber-300 text-amber-800'
                : 'bg-slate-100 border-slate-300 text-slate-400'
            }`}
          >
            {isVoiceOn ? <Mic className="w-4 h-4 sm:w-5 sm:h-5" /> : <MicOff className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={toggleFullscreen}
            aria-label="Toàn màn hình"
            title="Toàn màn hình"
            className="w-9 h-9 sm:w-11 sm:h-11 bg-sky-100 border-2 sm:border-3 border-sky-300 text-sky-700 rounded-2xl flex items-center justify-center transition-all clay-btn hidden sm:flex"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4 sm:w-5 sm:h-5" /> : <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Parental Control Access */}
          <button
            onClick={() => {
              soundEngine.playPop(1.1);
              onOpenParentModal();
            }}
            className="flex items-center gap-1 bg-slate-100 border-2 sm:border-3 border-slate-300 hover:bg-slate-200 text-slate-700 px-2 sm:px-3 py-1 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold clay-btn"
            title="Chế độ dành cho Ba Mẹ"
          >
            <Shield className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Ba Mẹ</span>
          </button>
        </div>
      </div>
    </header>
  );
};
