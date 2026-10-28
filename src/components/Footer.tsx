import React from 'react';
import { Heart, Shield, ArrowUp } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

interface FooterProps {
  fullName: string;
  nickname: string;
  className: string;
  onOpenParentModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  fullName,
  nickname,
  className,
  onOpenParentModal,
}) => {
  const scrollToTop = () => {
    soundEngine.playPop(1.5);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mt-16 bg-gradient-to-b from-amber-100 to-amber-200 border-t-6 border-amber-300 py-12 px-4 relative overflow-hidden text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Animated Bee Mascot */}
        <div
          className="w-16 h-16 rounded-3xl bg-amber-400 border-3 border-amber-500 flex items-center justify-center text-3xl shadow-lg mb-4 animate-gentle-bounce cursor-pointer clay-btn"
          onClick={() => {
            soundEngine.playBeeBuzz();
            soundEngine.speakVietnamese(`Bé ${fullName} là niềm tự hào của cả gia đình!`);
          }}
        >
          🐝
        </div>

        {/* Personalized Message */}
        <h3 className="text-xl sm:text-2xl font-black text-amber-950 mb-2">
          Dành tặng riêng bé yêu {fullName} ({nickname}) 💛
        </h3>
        <p className="text-sm sm:text-base font-bold text-amber-900 max-w-xl mx-auto mb-6 leading-relaxed">
          Không gian số an toàn, lành mạnh, bám sát giáo trình lớp {className} mầm non. Chúc bé luôn vui khỏe, thông minh và tràn ngập tiếng cười!
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap mb-8">
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-white hover:bg-amber-50 text-amber-950 font-black px-5 py-2.5 rounded-2xl border-3 border-amber-400 shadow-md clay-btn cursor-pointer text-sm"
          >
            <ArrowUp className="w-4 h-4 text-amber-700" />
            <span>Lên Đầu Trang</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playPop(1.1);
              onOpenParentModal();
            }}
            className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black px-5 py-2.5 rounded-2xl border-3 border-amber-500 shadow-md clay-btn cursor-pointer text-sm"
          >
            <Shield className="w-4 h-4 text-amber-900" />
            <span>Khu Vực Phụ Huynh</span>
          </button>
        </div>

        {/* Credits */}
        <div className="text-xs font-bold text-amber-800 border-t border-amber-300/80 pt-6 w-full flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Giáo viên chủ nhiệm: Cô Thơm & Cô Hằng (Donald 2)</span>
          <span className="flex items-center gap-1">
            Yêu thương bé Đỗ Minh Hoàng vô bờ bến <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </span>
        </div>
      </div>
    </footer>
  );
};
