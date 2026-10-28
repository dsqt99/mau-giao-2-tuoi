import React, { useState } from 'react';
import { Award, Star, Lock, X } from 'lucide-react';
import { STICKER_COLLECTION } from '../data/curriculumData';
import { soundEngine } from '../services/soundEngine';
import { StickerItem } from '../types';

interface StickerAlbumProps {
  stars: number;
  fullName: string;
  nickname: string;
  isOpen: boolean;
  onClose: () => void;
}

export const StickerAlbum: React.FC<StickerAlbumProps> = ({
  stars,
  fullName,
  nickname,
  isOpen,
  onClose,
}) => {
  const [selectedSticker, setSelectedSticker] = useState<StickerItem | null>(null);

  if (!isOpen) return null;

  const handleSelectSticker = (sticker: StickerItem, isUnlocked: boolean) => {
    if (isUnlocked) {
      soundEngine.playFanfare();
      soundEngine.speakVietnamese(
        `Chúc mừng bé ${fullName}! Huy hiệu ${sticker.name}: ${sticker.titleVi}!`
      );
      setSelectedSticker(sticker);
    } else {
      soundEngine.playPop(0.8);
      soundEngine.speakVietnamese(
        `Bé cần tích lũy thêm sao để mở khóa huy hiệu ${sticker.name} nhé!`
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-6 border-amber-400 rounded-[2.5rem] p-5 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playPop(1.1);
            onClose();
          }}
          className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-rose-500 hover:bg-rose-600 text-white border-3 border-white shadow-lg flex items-center justify-center font-black cursor-pointer clay-btn"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 border-2 border-amber-300 px-3.5 py-1 rounded-full text-xs font-black text-amber-950 mb-2">
            <Award className="w-4 h-4 text-amber-600" />
            <span>TỦ HUY HIỆU DANH DỰ</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
            Tủ Sticker Của {nickname} 🐝
          </h3>
          <p className="text-xs sm:text-sm font-bold text-slate-500 mt-1">
            Bé <span className="text-amber-600">{fullName}</span> đã tích lũy được:
          </p>

          {/* Star Badge Display */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400 to-yellow-300 border-3 border-amber-500 px-5 py-2 rounded-2xl text-amber-950 font-black text-xl shadow-md mt-2">
            <Star className="w-6 h-6 fill-amber-950 animate-bounce" />
            <span>{stars} Ngôi Sao Ngoan</span>
          </div>
        </div>

        {/* Sticker Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {STICKER_COLLECTION.map((sticker) => {
            const isUnlocked = stars >= sticker.unlockedAtStars;

            return (
              <button
                key={sticker.id}
                onClick={() => handleSelectSticker(sticker, isUnlocked)}
                className={`p-4 rounded-3xl border-4 flex flex-col items-center justify-center text-center transition-all cursor-pointer clay-btn min-h-[140px] ${
                  isUnlocked
                    ? 'bg-amber-50 border-amber-300 hover:border-amber-400 shadow-md'
                    : 'bg-slate-100 border-slate-200 opacity-60'
                }`}
              >
                {/* Sticker Emoji or Lock */}
                <div className="text-5xl my-1 relative">
                  {isUnlocked ? (
                    <span className="transform hover:scale-125 transition-transform inline-block">
                      {sticker.icon}
                    </span>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center text-slate-500 mx-auto">
                      <Lock className="w-6 h-6" />
                    </div>
                  )}
                </div>

                <span className="font-black text-sm text-slate-900 mt-1">
                  {sticker.name}
                </span>

                <span className="text-[11px] font-bold mt-0.5">
                  {isUnlocked ? (
                    <span className="text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Đã mở khóa
                    </span>
                  ) : (
                    <span className="text-slate-500">Cần {sticker.unlockedAtStars} ⭐</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Sticker Detail Modal/Popup */}
        {selectedSticker && (
          <div className="mt-6 bg-gradient-to-r from-amber-100 to-yellow-100 border-3 border-amber-400 rounded-3xl p-4 flex items-center gap-4 animate-gentle-bounce">
            <div className="text-5xl">{selectedSticker.icon}</div>
            <div className="flex-1">
              <h5 className="font-black text-base text-amber-950">
                {selectedSticker.name} - Bé {fullName}
              </h5>
              <p className="text-xs font-bold text-amber-800">
                {selectedSticker.titleVi}
              </p>
            </div>
            <button
              onClick={() => setSelectedSticker(null)}
              className="text-amber-900 hover:text-amber-950 font-black text-xs bg-white px-3 py-1.5 rounded-xl border border-amber-300"
            >
              Đóng
            </button>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-6 text-center text-xs font-bold text-slate-500">
          Chơi các trò chơi đập bóng, gõ đàn, đếm số để nhận thêm nhiều huy hiệu đáng yêu nhé!
        </div>
      </div>
    </div>
  );
};
