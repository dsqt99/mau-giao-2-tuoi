import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Volume2, CheckCircle2 } from 'lucide-react';
import { SHAPE_LIST } from '../../data/curriculumData';
import { soundEngine } from '../../services/soundEngine';
import { ShapeItem } from '../../types';

interface ShapeMatchGameProps {
  onAddStar: () => void;
}

export const ShapeMatchGame: React.FC<ShapeMatchGameProps> = ({ onAddStar }) => {
  const [currentTarget, setCurrentTarget] = useState<ShapeItem>(SHAPE_LIST[0]);
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'try-again'>('idle');

  const pickNewTarget = (excludeId?: string) => {
    const pool = SHAPE_LIST.filter((s) => s.id !== excludeId);
    const next = pool[Math.floor(Math.random() * pool.length)];
    setCurrentTarget(next);
    setFeedback('idle');

    setTimeout(() => {
      soundEngine.speakVietnamese(`Bé Hoàng hãy tìm ${next.nameVi} màu sắc đẹp nhé!`);
    }, 400);
  };

  useEffect(() => {
    pickNewTarget();
  }, []);

  const handleShapeSelect = (shape: ShapeItem, event: React.MouseEvent) => {
    if (shape.id === currentTarget.id) {
      setFeedback('correct');
      soundEngine.playFanfare();
      soundEngine.speakVietnamese(`Chính xác rồi! Bé Đỗ Minh Hoàng tìm đúng ${shape.nameVi}!`);

      const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
      confetti({
        particleCount: 25,
        spread: 70,
        origin: {
          x: (rect.left + rect.width / 2) / window.innerWidth,
          y: (rect.top + rect.height / 2) / window.innerHeight,
        },
        colors: [shape.color, '#FBBF24', '#38BDF8'],
        disableForReducedMotion: true,
      });

      onAddStar();

      setTimeout(() => {
        pickNewTarget(shape.id);
      }, 1600);
    } else {
      setFeedback('try-again');
      soundEngine.playPop(0.8);
      soundEngine.speakVietnamese(`Đây là ${shape.nameVi}. Bé hãy tìm ${currentTarget.nameVi} nhé!`);
      setTimeout(() => setFeedback('idle'), 1200);
    }
  };

  const renderShapeIcon = (shape: ShapeItem) => {
    const color = shape.color;
    switch (shape.shapeType) {
      case 'circle':
        return <div style={{ backgroundColor: color }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-md" />;
      case 'square':
        return <div style={{ backgroundColor: color }} className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shadow-md" />;
      case 'triangle':
        return (
          <div
            style={{
              borderLeft: '40px solid transparent',
              borderRight: '40px solid transparent',
              borderBottom: `70px solid ${color}`,
            }}
            className="w-0 h-0 filter drop-shadow-md"
          />
        );
      case 'heart':
        return <span style={{ color }} className="text-6xl sm:text-7xl drop-shadow-md">❤️</span>;
      case 'star':
        return <span style={{ color }} className="text-6xl sm:text-7xl drop-shadow-md">⭐</span>;
      case 'oval':
        return <div style={{ backgroundColor: color }} className="w-16 h-20 sm:w-20 sm:h-24 rounded-[50%] shadow-md" />;
    }
  };

  return (
    <div className="bg-gradient-to-b from-rose-50 to-amber-50 border-4 border-rose-300 rounded-3xl p-4 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl">🔷</span>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Bé Khám Phá Hình Khối & Màu Sắc
            </h3>
            <p className="text-xs sm:text-sm font-bold text-rose-800">
              Giáo trình Donald 2: Circle, Square, Triangle, Heart, Star, Oval
            </p>
          </div>
        </div>

        <button
          onClick={() => soundEngine.speakVietnamese(`Bé Hoàng hãy tìm ${currentTarget.nameVi} nhé!`)}
          className="bg-white hover:bg-rose-50 text-rose-900 border-2 border-rose-300 px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm clay-btn cursor-pointer"
        >
          <Volume2 className="w-4 h-4 text-rose-600 animate-pulse" />
          <span>Nghe lại câu đố</span>
        </button>
      </div>

      {/* Target Question Banner */}
      <div className="bg-white border-4 border-dashed border-rose-400 rounded-3xl p-4 text-center mb-6 shadow-md">
        <span className="text-sm sm:text-base font-extrabold text-slate-600 block mb-1">
          Bé Hoàng ơi, hãy tìm giúp cô:
        </span>
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-100 to-amber-100 px-5 py-2 rounded-2xl border-2 border-rose-300 shadow-sm animate-gentle-bounce">
          <span className="text-2xl sm:text-3xl font-black text-rose-900">
            👉 {currentTarget.nameVi} ({currentTarget.nameEn})
          </span>
        </div>
      </div>

      {/* Shapes Options Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {SHAPE_LIST.map((shape) => {
          const isTarget = shape.id === currentTarget.id;
          const isCorrect = feedback === 'correct' && isTarget;

          return (
            <button
              key={shape.id}
              onClick={(e) => handleShapeSelect(shape, e)}
              style={{ backgroundColor: shape.bgSoft }}
              className={`p-4 sm:p-5 rounded-3xl border-4 flex flex-col items-center justify-center gap-3 cursor-pointer min-h-[150px] sm:min-h-[180px] clay-btn transition-all duration-150 ${
                isCorrect
                  ? 'border-emerald-500 bg-emerald-100 scale-105 ring-4 ring-emerald-300 shadow-2xl'
                  : 'border-white hover:border-rose-300 shadow-md'
              }`}
            >
              <div className="h-20 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                {renderShapeIcon(shape)}
              </div>

              <div className="text-center">
                <span className="block text-base sm:text-lg font-black text-slate-900">
                  {shape.nameVi}
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {shape.nameEn}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Encouragement Footer */}
      <div className="mt-4 flex items-center justify-between text-xs sm:text-sm font-bold text-rose-900 bg-white/80 p-3 rounded-2xl border-2 border-rose-200">
        <span className="flex items-center gap-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Chạm đúng hình nhận ngay 1 ⭐ sao thưởng
        </span>
        <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-black">
          Hoan hô bé Đỗ Minh Hoàng!
        </span>
      </div>
    </div>
  );
};
