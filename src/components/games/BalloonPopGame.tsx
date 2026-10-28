import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Sparkles, RotateCcw, Volume2, Plus } from 'lucide-react';
import { soundEngine } from '../../services/soundEngine';

interface Balloon {
  id: number;
  color: string;
  nameVi: string;
  label: string;
  xPercent: number;
  yPercent: number;
  size: number;
  isPopped: boolean;
}

const BALLOON_PRESETS = [
  { color: '#EF4444', nameVi: 'Màu Đỏ', label: '1' },
  { color: '#3B82F6', nameVi: 'Màu Xanh Dương', label: '2' },
  { color: '#F59E0B', nameVi: 'Màu Vàng', label: '3' },
  { color: '#10B981', nameVi: 'Màu Xanh Lá', label: '4' },
  { color: '#EC4899', nameVi: 'Màu Hồng', label: '5' },
  { color: '#8B5CF6', nameVi: 'Màu Tím', label: '⭐' },
  { color: '#F97316', nameVi: 'Màu Cam', label: '🎃' },
  { color: '#06B6D4', nameVi: 'Màu Xanh Ngọc', label: '🐝' },
];

interface BalloonPopGameProps {
  onAddStar: () => void;
}

export const BalloonPopGame: React.FC<BalloonPopGameProps> = ({ onAddStar }) => {
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [poppedCount, setPoppedCount] = useState(0);

  const spawnBalloons = () => {
    soundEngine.playPop(1.2);
    const newBalloons: Balloon[] = BALLOON_PRESETS.map((preset, index) => ({
      id: Date.now() + index,
      color: preset.color,
      nameVi: preset.nameVi,
      label: preset.label,
      xPercent: 10 + (index % 4) * 22 + Math.random() * 8,
      yPercent: 20 + Math.floor(index / 4) * 35 + Math.random() * 10,
      size: 80 + Math.floor(Math.random() * 25),
      isPopped: false,
    }));
    setBalloons(newBalloons);
  };

  useEffect(() => {
    spawnBalloons();
  }, []);

  const handlePop = (balloon: Balloon, event: React.MouseEvent | React.TouchEvent) => {
    if (balloon.isPopped) return;

    // Pop sound
    soundEngine.playPop(1.0 + Math.random() * 0.5);

    // Speak color in Vietnamese
    soundEngine.speakVietnamese(`${balloon.nameVi}! Giỏi quá!`);

    // Confetti effect at touch position
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 20,
      spread: 60,
      origin: { x, y },
      colors: [balloon.color, '#FBBF24', '#FFFFFF'],
      disableForReducedMotion: true,
    });

    // Update state
    setBalloons(prev =>
      prev.map(b => (b.id === balloon.id ? { ...b, isPopped: true } : b))
    );
    setPoppedCount(prev => prev + 1);
    onAddStar();

    // If all popped, celebrate with fanfare!
    const remaining = balloons.filter(b => b.id !== balloon.id && !b.isPopped);
    if (remaining.length === 0) {
      setTimeout(() => {
        soundEngine.playFanfare();
        soundEngine.speakVietnamese('Hoan hô bé Đỗ Minh Hoàng đã đập hết bóng bay rồi!');
      }, 400);
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-100 to-amber-50 border-4 border-sky-300 rounded-3xl p-4 sm:p-6 shadow-xl relative overflow-hidden">
      {/* Header Bar */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl">🎈</span>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Đập Bóng Bay Sắc Màu
            </h3>
            <p className="text-xs sm:text-sm font-bold text-sky-800">
              Bé chạm vào quả bóng để nổ "Pốp!" và nghe màu sắc nhé
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="bg-white px-3 py-1.5 rounded-2xl border-2 border-sky-300 shadow-sm flex items-center gap-1.5 font-black text-sky-900 text-sm">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span>Đã nổ: {poppedCount}</span>
          </div>

          <button
            onClick={spawnBalloons}
            className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black px-3.5 py-1.5 rounded-2xl border-3 border-amber-500 shadow-md clay-btn cursor-pointer text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm bóng</span>
          </button>
        </div>
      </div>

      {/* Balloon Play Area */}
      <div className="relative w-full h-[320px] sm:h-[400px] bg-white/60 border-3 border-dashed border-sky-300 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
        {/* Floating Clouds Background */}
        <div className="absolute top-4 left-6 text-4xl opacity-40 animate-float pointer-events-none">☁️</div>
        <div className="absolute top-16 right-10 text-3xl opacity-40 animate-float pointer-events-none" style={{ animationDelay: '1.5s' }}>☁️</div>
        <div className="absolute bottom-8 left-1/3 text-4xl opacity-30 animate-float pointer-events-none" style={{ animationDelay: '2.5s' }}>☁️</div>

        {balloons.map((balloon) => {
          if (balloon.isPopped) return null;

          return (
            <button
              key={balloon.id}
              onClick={(e) => handlePop(balloon, e)}
              onTouchStart={(e) => handlePop(balloon, e)}
              style={{
                left: `${balloon.xPercent}%`,
                top: `${balloon.yPercent}%`,
                width: `${balloon.size}px`,
                height: `${balloon.size * 1.25}px`,
                backgroundColor: balloon.color,
              }}
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-[50%_50%_50%_50%_/_40%_40%_60%_60%] border-4 border-white/60 shadow-[0_10px_20px_rgba(0,0,0,0.15)] flex flex-col items-center justify-center text-white cursor-pointer transform hover:scale-110 active:scale-90 transition-transform animate-gentle-bounce"
            >
              {/* Highlight gleam on balloon */}
              <div className="absolute top-3 left-3 w-4 h-7 bg-white/40 rounded-full transform -rotate-45 pointer-events-none"></div>

              {/* Number / Item text */}
              <span className="font-black text-2xl sm:text-3xl drop-shadow-md select-none pointer-events-none">
                {balloon.label}
              </span>

              {/* Balloon knot and string */}
              <div
                style={{ borderTopColor: balloon.color }}
                className="absolute -bottom-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] pointer-events-none"
              ></div>
              <div className="absolute -bottom-6 w-0.5 h-5 bg-slate-400 pointer-events-none"></div>
            </button>
          );
        })}

        {/* If all popped, show celebratory message */}
        {balloons.every((b) => b.isPopped) && (
          <div className="text-center p-6 bg-white/95 rounded-3xl border-4 border-amber-400 shadow-2xl animate-bounce">
            <span className="text-5xl mb-2 block">🎉 🐝 ⭐</span>
            <h4 className="text-2xl font-black text-amber-950 mb-1">
              Bé Ong giỏi tuyệt đỉnh!
            </h4>
            <p className="text-sm font-bold text-slate-600 mb-4">
              Bé Đỗ Minh Hoàng đã đập hết bóng bay rồi!
            </p>
            <button
              onClick={spawnBalloons}
              className="bg-amber-400 text-amber-950 font-black px-6 py-3 rounded-2xl border-3 border-amber-500 shadow-md clay-btn cursor-pointer inline-flex items-center gap-2 text-base"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Chơi Tiếp Cùng Bé Ong</span>
            </button>
          </div>
        )}
      </div>

      {/* Toddler Instruction Footer */}
      <div className="mt-3 flex items-center justify-between text-xs sm:text-sm font-bold text-slate-500">
        <span className="flex items-center gap-1 text-sky-700">
          <Volume2 className="w-4 h-4" /> Chạm vào bóng để nghe tên màu sắc tiếng Việt
        </span>
        <span className="bg-amber-200/80 text-amber-900 px-2.5 py-0.5 rounded-full font-extrabold">
          +1 ⭐ mỗi quả bóng
        </span>
      </div>
    </div>
  );
};
