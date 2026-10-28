import React, { useState } from 'react';
import { Play, Music2 } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface XylophoneKey {
  note: string;
  solfege: string;
  freq: number;
  color: string;
  shadowColor: string;
  heightPercent: number;
}

const XYLOPHONE_KEYS: XylophoneKey[] = [
  { note: 'C4', solfege: 'ĐỒ', freq: 261.63, color: '#EF4444', shadowColor: '#B91C1C', heightPercent: 100 },
  { note: 'D4', solfege: 'RÊ', freq: 293.66, color: '#F97316', shadowColor: '#C2410C', heightPercent: 94 },
  { note: 'E4', solfege: 'MI', freq: 329.63, color: '#FBBF24', shadowColor: '#D97706', heightPercent: 88 },
  { note: 'F4', solfege: 'PHA', freq: 349.23, color: '#10B981', shadowColor: '#047857', heightPercent: 82 },
  { note: 'G4', solfege: 'SOL', freq: 392.00, color: '#06B6D4', shadowColor: '#0E7490', heightPercent: 76 },
  { note: 'A4', solfege: 'LA', freq: 440.00, color: '#3B82F6', shadowColor: '#1D4ED8', heightPercent: 70 },
  { note: 'B4', solfege: 'SI', freq: 493.88, color: '#8B5CF6', shadowColor: '#6D28D9', heightPercent: 64 },
  { note: 'C5', solfege: 'ĐỐ', freq: 523.25, color: '#EC4899', shadowColor: '#BE185D', heightPercent: 58 },
];

// Simple melody: "Kìa con bướm vàng"
const BUTTERFLY_SONG: { freq: number; duration: number }[] = [
  { freq: 261.63, duration: 400 }, // Đồ
  { freq: 293.66, duration: 400 }, // Rê
  { freq: 329.63, duration: 400 }, // Mi
  { freq: 261.63, duration: 400 }, // Đồ
  { freq: 261.63, duration: 400 }, // Đồ
  { freq: 293.66, duration: 400 }, // Rê
  { freq: 329.63, duration: 400 }, // Mi
  { freq: 261.63, duration: 400 }, // Đồ
  { freq: 329.63, duration: 400 }, // Mi
  { freq: 349.23, duration: 400 }, // Pha
  { freq: 392.00, duration: 800 }, // Sol
  { freq: 329.63, duration: 400 }, // Mi
  { freq: 349.23, duration: 400 }, // Pha
  { freq: 392.00, duration: 800 }, // Sol
];

interface RainbowXylophoneProps {
  onAddStar: () => void;
}

export const RainbowXylophone: React.FC<RainbowXylophoneProps> = ({ onAddStar }) => {
  const [activeNote, setActiveNote] = useState<string | null>(null);
  const [isPlayingSong, setIsPlayingSong] = useState(false);

  const handleKeyPress = (key: XylophoneKey) => {
    soundEngine.playXylophone(key.freq);
    setActiveNote(key.note);
    onAddStar();

    setTimeout(() => {
      setActiveNote(null);
    }, 250);
  };

  const playSongDemo = async () => {
    if (isPlayingSong) return;
    setIsPlayingSong(true);
    soundEngine.speakVietnamese('Bé Ong cùng nghe bài Kìa Con Bướm Vàng nhé!');

    await new Promise((r) => setTimeout(r, 1200));

    for (const step of BUTTERFLY_SONG) {
      const matchKey = XYLOPHONE_KEYS.find((k) => Math.abs(k.freq - step.freq) < 2);
      if (matchKey) {
        setActiveNote(matchKey.note);
        soundEngine.playXylophone(step.freq, step.duration / 1000);
      }
      await new Promise((resolve) => setTimeout(resolve, step.duration));
      setActiveNote(null);
      await new Promise((resolve) => setTimeout(resolve, 80));
    }

    setIsPlayingSong(false);
    soundEngine.playFanfare();
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 to-pink-50 border-4 border-purple-300 rounded-3xl p-4 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl">🎹</span>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Đàn Xylophone Cầu Vồng 8 Nốt
            </h3>
            <p className="text-xs sm:text-sm font-bold text-purple-800">
              Chạm vào thanh đàn nhiều màu để tự sáng tác giai điệu vui vẻ
            </p>
          </div>
        </div>

        <button
          onClick={playSongDemo}
          disabled={isPlayingSong}
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-black text-xs sm:text-sm border-3 shadow-md clay-btn cursor-pointer transition-all ${
            isPlayingSong
              ? 'bg-amber-200 border-amber-400 text-amber-950 animate-pulse'
              : 'bg-amber-400 hover:bg-amber-300 border-amber-500 text-amber-950'
          }`}
        >
          <Play className="w-4 h-4 fill-amber-950" />
          <span>{isPlayingSong ? 'Đang đàn cho bé nghe...' : 'Bé nghe bài mẫu'}</span>
        </button>
      </div>

      {/* Xylophone Instrument Wooden Frame */}
      <div className="bg-amber-100/90 border-4 border-amber-300 rounded-3xl p-4 sm:p-6 shadow-inner relative">
        {/* Support Rods */}
        <div className="absolute top-1/4 left-6 right-6 h-3 bg-amber-800/20 rounded-full pointer-events-none"></div>
        <div className="absolute bottom-1/4 left-6 right-6 h-3 bg-amber-800/20 rounded-full pointer-events-none"></div>

        {/* 8 Keys */}
        <div className="grid grid-cols-8 gap-1.5 sm:gap-3 items-end h-[240px] sm:h-[300px] relative z-10 px-1">
          {XYLOPHONE_KEYS.map((key) => {
            const isHit = activeNote === key.note;

            return (
              <button
                key={key.note}
                onClick={() => handleKeyPress(key)}
                onTouchStart={() => handleKeyPress(key)}
                style={{
                  height: `${key.heightPercent}%`,
                  backgroundColor: key.color,
                  boxShadow: isHit
                    ? `0 2px 0 ${key.shadowColor}`
                    : `0 8px 0 ${key.shadowColor}, 0 12px 16px rgba(0,0,0,0.15)`,
                  transform: isHit ? 'translateY(6px)' : 'translateY(0)',
                }}
                className="w-full rounded-2xl sm:rounded-3xl flex flex-col justify-between items-center py-3 text-white font-black cursor-pointer transition-all duration-75 relative overflow-hidden group select-none"
              >
                {/* Top Screw Rivet */}
                <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-slate-800/30 border border-white/50 shadow-inner"></div>

                {/* Solfege Note Name */}
                <div className="text-center select-none pointer-events-none">
                  <span className="block text-xs sm:text-base font-black drop-shadow-md">
                    {key.solfege}
                  </span>
                  <span className="text-[10px] sm:text-xs font-semibold opacity-80 block">
                    {key.note}
                  </span>
                </div>

                {/* Bottom Screw Rivet */}
                <div className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 rounded-full bg-slate-800/30 border border-white/50 shadow-inner"></div>

                {/* Glow Overlay when Played */}
                {isHit && (
                  <div className="absolute inset-0 bg-white/40 pointer-events-none animate-pulse"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Footer Instructions */}
      <div className="mt-4 flex items-center justify-between text-xs sm:text-sm font-bold text-purple-900 bg-white/80 p-3 rounded-2xl border-2 border-purple-200">
        <span className="flex items-center gap-1.5">
          <Music2 className="w-4 h-4 text-purple-600" /> Âm thanh chuẩn nốt nhạc Đồ - Rê - Mi - Pha - Sol - La - Si - Đố
        </span>
        <span className="bg-purple-100 text-purple-900 px-2.5 py-0.5 rounded-full font-black">
          Gõ tự do cùng bé 🎶
        </span>
      </div>
    </div>
  );
};
