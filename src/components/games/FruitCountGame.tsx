import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Volume2, Award } from 'lucide-react';
import { FRUIT_LIST } from '../../data/curriculumData';
import { soundEngine } from '../../services/soundEngine';

interface BasketItem {
  id: number;
  emoji: string;
  nameVi: string;
}

interface FruitCountGameProps {
  onAddStar: () => void;
}

export const FruitCountGame: React.FC<FruitCountGameProps> = ({ onAddStar }) => {
  const [basket, setBasket] = useState<BasketItem[]>([]);

  const handlePickItem = (item: (typeof FRUIT_LIST)[0]) => {
    if (basket.length >= 5) {
      soundEngine.speakVietnamese('Giỏ đã đầy năm quả rồi! Bé hãy bấm đổ giỏ để đếm lại nhé!');
      return;
    }

    const nextCount = basket.length + 1;
    const newBasket = [...basket, { id: Date.now(), emoji: item.emoji, nameVi: item.nameVi }];
    setBasket(newBasket);

    soundEngine.playPop(0.9 + nextCount * 0.15);

    // Speak count
    const countWords = ['', 'Một', 'Hai', 'Ba', 'Bốn', 'Năm'];
    const textToSpeak = `${countWords[nextCount]}! Bé thêm một ${item.nameVi}!`;
    soundEngine.speakVietnamese(textToSpeak);

    onAddStar();

    if (nextCount === 4) {
      setTimeout(() => {
        soundEngine.speakVietnamese('Tuyệt vời! Bé Ong vừa đếm được bốn đồ vật, đúng bài cô giáo dạy!');
      }, 1200);
    }

    if (nextCount === 5) {
      setTimeout(() => {
        soundEngine.playFanfare();
        soundEngine.speakVietnamese('Hoan hô bé Đỗ Minh Hoàng đã đếm đủ năm món quà vào giỏ!');
        confetti({
          particleCount: 35,
          spread: 80,
          origin: { x: 0.5, y: 0.6 },
          colors: ['#F59E0B', '#EF4444', '#10B981'],
        });
      }, 1000);
    }
  };

  const handleReset = () => {
    soundEngine.playPop(1.1);
    setBasket([]);
    soundEngine.speakVietnamese('Bé cùng đếm lại từ một đến năm nhé!');
  };

  return (
    <div className="bg-gradient-to-b from-orange-50 to-amber-50 border-4 border-orange-300 rounded-3xl p-4 sm:p-6 shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl">🧺</span>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Bé Tập Đếm 1 Đến 5 Cùng Quả Ngọt
            </h3>
            <p className="text-xs sm:text-sm font-bold text-orange-900">
              Trọng tâm tuần 5: Đếm bí ngô và kẹo ngọt vào giỏ (Số 4 diệu kỳ)
            </p>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black px-3.5 py-1.5 rounded-2xl border-3 border-amber-500 shadow-md clay-btn cursor-pointer text-sm"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Đếm lại từ đầu</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
        {/* Available Items on the Table */}
        <div className="bg-white/80 border-3 border-orange-200 rounded-3xl p-4 sm:p-5 shadow-sm">
          <span className="block text-sm sm:text-base font-extrabold text-slate-700 mb-3 text-center">
            👇 Chạm vào trái cây hoặc kẹo để bỏ vào giỏ:
          </span>

          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
            {FRUIT_LIST.map((fruit) => (
              <button
                key={fruit.id}
                onClick={() => handlePickItem(fruit)}
                disabled={basket.length >= 5}
                className="bg-amber-50 hover:bg-amber-100 border-3 border-amber-300 rounded-2xl p-3 flex flex-col items-center justify-center gap-1 cursor-pointer clay-btn disabled:opacity-40 transition-all group"
              >
                <span className="text-4xl sm:text-5xl group-hover:scale-125 transition-transform duration-150">
                  {fruit.emoji}
                </span>
                <span className="text-xs font-black text-slate-800 text-center line-clamp-1">
                  {fruit.nameVi}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* The Picnic Basket with Count Badges */}
        <div className="bg-amber-100/80 border-4 border-amber-400 rounded-3xl p-5 shadow-inner flex flex-col items-center justify-center text-center relative min-h-[220px]">
          {/* Big Counter Display */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm font-black text-amber-950 uppercase">Trong giỏ có:</span>
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-b from-amber-400 to-orange-400 border-3 border-orange-500 text-2xl font-black text-amber-950 shadow-md animate-gentle-bounce">
              {basket.length}
            </span>
            <span className="text-sm font-bold text-amber-900">/ 5 món</span>
          </div>

          {/* Basket Visual and Dropped Items */}
          <div className="w-full bg-white/90 border-3 border-dashed border-amber-400 rounded-2xl p-4 min-h-[110px] flex items-center justify-center gap-3 flex-wrap">
            {basket.length === 0 ? (
              <span className="text-sm font-bold text-slate-400 italic">
                Giỏ đang trống, bé hãy chạm vào quả ngọt ở bên cạnh nhé!
              </span>
            ) : (
              basket.map((item) => (
                <div
                  key={item.id}
                  className="w-14 h-14 bg-amber-100 rounded-2xl border-2 border-amber-300 flex items-center justify-center text-3xl shadow animate-bounce"
                  style={{ animationDuration: '0.6s' }}
                >
                  {item.emoji}
                </div>
              ))
            )}
          </div>

          {/* Special Praise for Number 4 */}
          {basket.length === 4 && (
            <div className="mt-3 bg-amber-400 text-amber-950 font-black px-4 py-1.5 rounded-full text-xs sm:text-sm border-2 border-amber-500 shadow-sm animate-pulse flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-950" />
              <span>Đạt số 4 - Đúng bài học tuần 5 của lớp Donald 2!</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-xs sm:text-sm font-bold text-orange-900 bg-white/80 p-3 rounded-2xl border-2 border-orange-200">
        <span className="flex items-center gap-1.5">
          <Volume2 className="w-4 h-4 text-orange-600" /> Bé học đếm tự nhiên qua giọng nói tiếng Việt chuẩn
        </span>
        <span className="bg-orange-100 text-orange-900 px-2.5 py-0.5 rounded-full font-black">
          +1 ⭐ mỗi lần đếm
        </span>
      </div>
    </div>
  );
};
