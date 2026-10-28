import React, { useState } from 'react';
import { Sparkles, Volume2, Music } from 'lucide-react';
import { ANIMAL_LIST } from '../../data/curriculumData';
import { soundEngine } from '../../services/soundEngine';
import { AnimalItem } from '../../types';

interface AnimalFarmGameProps {
  onAddStar: () => void;
}

export const AnimalFarmGame: React.FC<AnimalFarmGameProps> = ({ onAddStar }) => {
  const [activeAnimalId, setActiveAnimalId] = useState<string | null>(null);

  const handleAnimalClick = (animal: AnimalItem) => {
    setActiveAnimalId(animal.id);

    // Play synthesized sound
    soundEngine.playAnimalSound(animal.soundType);

    // Vietnamese Speech
    soundEngine.speakVietnamese(
      `Đây là ${animal.nameVi}! ${animal.nameVi} kêu: ${animal.soundTextVi}`
    );

    onAddStar();

    setTimeout(() => {
      setActiveAnimalId(null);
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-b from-emerald-50 to-amber-50 border-4 border-emerald-300 rounded-3xl p-4 sm:p-6 shadow-xl">
      {/* Game Header */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <div className="flex items-center gap-3">
          <span className="text-3xl sm:text-4xl">🐮</span>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
              Nông Trại Ú Òa Động Vật
            </h3>
            <p className="text-xs sm:text-sm font-bold text-emerald-800">
              Bé chạm vào con vật để nghe tiếng kêu vui tai và xem bạn ấy cử động nhé!
            </p>
          </div>
        </div>

        <div className="bg-emerald-100 text-emerald-900 border-2 border-emerald-300 px-3.5 py-1.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-1.5 shadow-sm">
          <Sparkles className="w-4 h-4 text-emerald-600 fill-emerald-600" />
          <span>Khám phá 6 bạn thú</span>
        </div>
      </div>

      {/* Animal Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {ANIMAL_LIST.map((animal) => {
          const isActive = activeAnimalId === animal.id;

          return (
            <button
              key={animal.id}
              onClick={() => handleAnimalClick(animal)}
              style={{ backgroundColor: animal.bgColor }}
              className={`p-4 sm:p-5 rounded-3xl border-4 transition-all flex flex-col items-center justify-between cursor-pointer min-h-[160px] sm:min-h-[190px] clay-btn text-center relative overflow-hidden group ${
                isActive
                  ? 'border-amber-400 scale-105 shadow-2xl ring-4 ring-amber-300'
                  : 'border-white shadow-md hover:border-emerald-200'
              }`}
            >
              {/* Sound Ring Badge */}
              <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1.5 border border-slate-200 shadow-sm">
                <Volume2 className="w-4 h-4 text-emerald-600" />
              </div>

              {/* Big Animal Emoji & Mascot */}
              <div
                className={`text-5xl sm:text-6xl my-1 transition-transform ${
                  isActive ? 'scale-125 animate-bounce' : 'group-hover:scale-110'
                }`}
              >
                {animal.emoji}
              </div>

              {/* Name and Bilingual Tag */}
              <div className="w-full">
                <span className="block text-base sm:text-lg font-black text-slate-900">
                  {animal.nameVi}
                </span>
                <span className="inline-block text-[11px] sm:text-xs font-bold text-slate-500 bg-white/80 px-2 py-0.5 rounded-full border border-slate-200 mt-0.5">
                  English: {animal.nameEn}
                </span>
              </div>

              {/* Speech Sound Bubble */}
              <div
                className={`mt-1.5 text-xs font-black px-2.5 py-1 rounded-xl transition-all ${
                  isActive
                    ? 'bg-amber-400 text-amber-950 scale-105 shadow'
                    : 'bg-white/70 text-emerald-900'
                }`}
              >
                {animal.soundTextVi}
              </div>
            </button>
          );
        })}
      </div>

      {/* Encouragement Footer */}
      <div className="mt-4 bg-white/80 rounded-2xl p-3 border-2 border-emerald-200 flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm font-bold text-emerald-900">
        <span className="flex items-center gap-1.5">
          <Music className="w-4 h-4 text-emerald-600" /> Bé hãy bắt chước tiếng kêu của các bạn nhé!
        </span>
        <span className="text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full font-black">
          +1 ⭐ khi khám phá bạn mới
        </span>
      </div>
    </div>
  );
};
