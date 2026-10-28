import React, { useState } from 'react';
import { BalloonPopGame } from './games/BalloonPopGame';
import { AnimalFarmGame } from './games/AnimalFarmGame';
import { RainbowXylophone } from './games/RainbowXylophone';
import { ShapeMatchGame } from './games/ShapeMatchGame';
import { FruitCountGame } from './games/FruitCountGame';
import { Gamepad2, Sparkles } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

interface GamesSectionProps {
  onAddStar: () => void;
}

type GameTab = 'balloon' | 'animal' | 'xylophone' | 'shape' | 'fruit';

export const GamesSection: React.FC<GamesSectionProps> = ({ onAddStar }) => {
  const [activeTab, setActiveTab] = useState<GameTab>('balloon');

  const gameTabs = [
    { id: 'balloon', nameVi: 'Đập Bóng Bay', icon: '🎈', color: 'from-sky-400 to-sky-500', border: 'border-sky-600' },
    { id: 'animal', nameVi: 'Nông Trại Thú', icon: '🐮', color: 'from-emerald-400 to-emerald-500', border: 'border-emerald-600' },
    { id: 'xylophone', nameVi: 'Đàn Cầu Vồng', icon: '🎹', color: 'from-purple-400 to-purple-500', border: 'border-purple-600' },
    { id: 'shape', nameVi: 'Đố Hình Khối', icon: '🔷', color: 'from-rose-400 to-rose-500', border: 'border-rose-600' },
    { id: 'fruit', nameVi: 'Bé Tập Đếm 1-5', icon: '🧺', color: 'from-orange-400 to-orange-500', border: 'border-orange-600' },
  ];

  const handleSelectTab = (tabId: GameTab) => {
    soundEngine.playPop(1.3);
    setActiveTab(tabId);
  };

  return (
    <section id="tro-choi" className="max-w-5xl mx-auto px-4 my-10">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-amber-100 border-2 border-amber-300 px-4 py-1.5 rounded-full shadow-sm mb-2">
          <Gamepad2 className="w-4 h-4 text-amber-700" />
          <span className="text-xs sm:text-sm font-black text-amber-950 uppercase">
            Khu Trò Chơi Trí Tuệ & Vận Động Tinh
          </span>
          <Sparkles className="w-4 h-4 text-amber-500" />
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Bé Ong Chơi Trò Gì Hôm Nay Nào?
        </h2>
        <p className="text-sm sm:text-base font-bold text-slate-600 max-w-xl mx-auto mt-1">
          Các trò chơi thiết kế chuẩn công thái học cho ngón tay bé 2 tuổi, chạm là vui!
        </p>
      </div>

      {/* Toddler Big Game Selector Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3 mb-6">
        {gameTabs.map((tab) => {
          const isSelected = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleSelectTab(tab.id as GameTab)}
              className={`p-3 sm:p-4 rounded-3xl border-4 flex flex-col sm:flex-row items-center justify-center gap-2 text-center transition-all cursor-pointer clay-btn ${
                isSelected
                  ? `bg-gradient-to-b ${tab.color} ${tab.border} text-white shadow-xl scale-105 ring-4 ring-amber-300 font-black`
                  : 'bg-white border-slate-200 text-slate-800 hover:border-amber-300 font-extrabold shadow-sm'
              }`}
            >
              <span className="text-3xl sm:text-2xl">{tab.icon}</span>
              <span className="text-xs sm:text-sm tracking-tight">{tab.nameVi}</span>
            </button>
          );
        })}
      </div>

      {/* Active Game Display */}
      <div className="transition-all duration-300">
        {activeTab === 'balloon' && <BalloonPopGame onAddStar={onAddStar} />}
        {activeTab === 'animal' && <AnimalFarmGame onAddStar={onAddStar} />}
        {activeTab === 'xylophone' && <RainbowXylophone onAddStar={onAddStar} />}
        {activeTab === 'shape' && <ShapeMatchGame onAddStar={onAddStar} />}
        {activeTab === 'fruit' && <FruitCountGame onAddStar={onAddStar} />}
      </div>
    </section>
  );
};
