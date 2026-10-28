import React, { useEffect } from 'react';
import { Star } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

interface BedtimeScreenProps {
  fullName: string;
  nickname: string;
  onExit: () => void;
}

export const BedtimeScreen: React.FC<BedtimeScreenProps> = ({
  fullName,
  nickname,
  onExit,
}) => {
  useEffect(() => {
    soundEngine.speakVietnamese(
      `Đã đến giờ bé ${fullName} đi ngủ rồi. Chúc bé Ong ngủ thật ngoan và mơ những giấc mơ đẹp!`
    );

    // Play gentle lullaby chimes
    const lullabyNotes = [261.63, 329.63, 392.00, 523.25, 392.00, 329.63];
    let noteIdx = 0;
    const interval = setInterval(() => {
      soundEngine.playLullabyNote(lullabyNotes[noteIdx % lullabyNotes.length]);
      noteIdx++;
    }, 1800);

    return () => clearInterval(interval);
  }, [fullName]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950 text-white flex flex-col items-center justify-center p-6 text-center select-none animate-fade-in">
      {/* Gentle Floating Moon */}
      <div className="relative mb-6">
        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-amber-200/20 flex items-center justify-center blur-xl absolute inset-0"></div>
        <div className="text-8xl sm:text-9xl animate-gentle-bounce relative z-10">
          🌙
        </div>
      </div>

      {/* Sleeping Cloud with Little Bee */}
      <div className="bg-slate-900/80 border-4 border-indigo-500/50 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Star className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
          <span className="text-xs sm:text-sm font-bold text-indigo-300 uppercase tracking-widest">
            Giờ Nghỉ Ngơi Của Bé
          </span>
          <Star className="w-5 h-5 text-amber-300 fill-amber-300 animate-pulse" />
        </div>

        <h2 className="text-2xl sm:text-4xl font-black text-amber-300 mb-3 leading-tight">
          Chúc {nickname} Ngủ Ngoan! 🐝💤
        </h2>

        <p className="text-sm sm:text-base text-slate-300 font-bold mb-6 leading-relaxed">
          Bé <span className="text-amber-200 font-black">{fullName}</span> đã học và vui chơi rất giỏi hôm nay.
          Mắt xinh của bé hãy nhắm lại để có những giấc mơ thật đẹp cùng chú Ong vàng nhé!
        </p>

        {/* Twinkling ambient elements */}
        <div className="flex items-center justify-center gap-3 text-3xl mb-8">
          <span>✨</span>
          <span>⭐</span>
          <span>🧸</span>
          <span>⭐</span>
          <span>✨</span>
        </div>

        {/* Parent Exit Button */}
        <button
          onClick={onExit}
          className="bg-slate-800 hover:bg-slate-700 text-slate-300 border-2 border-slate-600 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold cursor-pointer transition-all"
        >
          Trở lại màn hình chính (Dành cho ba mẹ)
        </button>
      </div>
    </div>
  );
};
