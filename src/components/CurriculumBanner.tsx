import React from 'react';
import { Calendar, Volume2, Smile } from 'lucide-react';
import { CURRENT_WEEK_CURRICULUM } from '../data/curriculumData';
import { soundEngine } from '../services/soundEngine';

export const CurriculumBanner: React.FC = () => {
  const handleListenCurriculum = () => {
    soundEngine.playPop(1.3);
    soundEngine.speakVietnamese(
      `Tuần này bé Đỗ Minh Hoàng học chủ đề: Bản thân và gia đình, lễ hội hóa trang vui nhộn, tập đếm số bốn và hát bài xe hơi cầu vồng!`
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 my-8">
      <div className="bg-gradient-to-r from-amber-100 via-orange-100 to-rose-100 border-4 border-amber-300 rounded-3xl p-5 sm:p-7 shadow-lg relative overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-36 h-36 bg-amber-300/30 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 border-3 border-amber-500 flex items-center justify-center text-3xl shadow-md shrink-0 clay-btn">
              🎃
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="bg-amber-400 text-amber-950 text-xs font-black px-2.5 py-0.5 rounded-full flex items-center gap-1 border border-amber-500">
                  <Calendar className="w-3 h-3" /> Tuần {CURRENT_WEEK_CURRICULUM.week} (Donald 2)
                </span>
                <span className="text-xs font-bold text-slate-500">
                  {CURRENT_WEEK_CURRICULUM.dateRange}
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                Chủ đề: {CURRENT_WEEK_CURRICULUM.topicVi}
              </h3>
              <p className="text-sm sm:text-base font-bold text-amber-900 flex items-center gap-1.5 mt-0.5">
                <Smile className="w-4 h-4 text-amber-700" />
                {CURRENT_WEEK_CURRICULUM.subTopicVi}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full md:w-auto">
            <button
              onClick={handleListenCurriculum}
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-white hover:bg-amber-50 text-amber-950 font-black px-5 py-3 rounded-2xl border-3 border-amber-400 shadow-md clay-btn cursor-pointer"
            >
              <Volume2 className="w-5 h-5 text-amber-600 animate-pulse" />
              <span>Nghe cô dặn tuần này</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t-2 border-amber-200/80">
          <div className="bg-white/80 rounded-2xl p-3 border-2 border-amber-200 flex items-center gap-2.5">
            <span className="text-2xl">🔢</span>
            <div className="text-xs">
              <span className="font-extrabold text-slate-800 block">Trọng tâm Toán:</span>
              <span className="font-bold text-amber-700">{CURRENT_WEEK_CURRICULUM.mathFocus}</span>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-3 border-2 border-amber-200 flex items-center gap-2.5">
            <span className="text-2xl">🔷</span>
            <div className="text-xs">
              <span className="font-extrabold text-slate-800 block">Hình khối & Màu sắc:</span>
              <span className="font-bold text-sky-700">Tròn, Vuông, Tam giác, Trái tim</span>
            </div>
          </div>

          <div className="bg-white/80 rounded-2xl p-3 border-2 border-amber-200 flex items-center gap-2.5">
            <span className="text-2xl">🚗</span>
            <div className="text-xs">
              <span className="font-extrabold text-slate-800 block">Genki English:</span>
              <span className="font-bold text-emerald-700">Rainbow Car & Wheels On The Bus</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
