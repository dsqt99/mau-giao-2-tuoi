import React, { useState } from 'react';
import { Tv, Play, Volume2, Sparkles, Music } from 'lucide-react';
import { VIDEO_SONGS_LIST } from '../data/curriculumData';
import { soundEngine } from '../services/soundEngine';
import { SongVideoItem } from '../types';

export const VideoStation: React.FC = () => {
  const [currentSong, setCurrentSong] = useState<SongVideoItem>(VIDEO_SONGS_LIST[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleSelectSong = (song: SongVideoItem) => {
    soundEngine.playPop(1.2);
    setCurrentSong(song);
    setIsPlaying(true);
    soundEngine.speakVietnamese(`Bé cùng hát bài ${song.title} nhé!`);
  };

  return (
    <section id="video-am-nhac" className="max-w-5xl mx-auto px-4 my-12">
      {/* Section Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 bg-sky-100 border-2 border-sky-300 px-4 py-1.5 rounded-full shadow-sm mb-2">
          <Tv className="w-4 h-4 text-sky-600" />
          <span className="text-xs sm:text-sm font-black text-sky-950 uppercase">
            Rạp Chiếu TV Đồ Chơi Của Bé Ong
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Video & Bài Hát Chọn Lọc Cho Bé 2 Tuổi
        </h2>
        <p className="text-sm sm:text-base font-bold text-slate-600 max-w-xl mx-auto mt-1">
          Bám sát giáo trình lớp Donald 2: Xe hơi cầu vồng, Bánh xe buýt, Một con vịt và Chú voi con
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Retro Toy TV Frame (Left/Top 8 cols) */}
        <div className="lg:col-span-8 bg-sky-400 border-4 sm:border-6 border-sky-600 rounded-[2.5rem] p-4 sm:p-6 shadow-2xl relative">
          {/* TV Antennas */}
          <div className="absolute -top-7 left-1/2 -translate-x-1/2 flex items-center gap-6 pointer-events-none">
            <div className="w-1.5 h-8 bg-slate-800 rotate-[-25deg] origin-bottom rounded-full"></div>
            <div className="w-1.5 h-8 bg-slate-800 rotate-[25deg] origin-bottom rounded-full"></div>
          </div>

          {/* TV Screen Container */}
          <div className="relative w-full aspect-video bg-slate-950 rounded-3xl overflow-hidden border-4 border-slate-900 shadow-inner flex items-center justify-center">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${currentSong.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={currentSong.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="relative w-full h-full bg-gradient-to-tr from-sky-900 via-indigo-900 to-slate-900 flex flex-col items-center justify-center text-center p-4">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-amber-400 text-amber-950 border-4 border-white flex items-center justify-center text-4xl shadow-xl animate-pulse cursor-pointer clay-btn"
                  onClick={() => setIsPlaying(true)}
                >
                  <Play className="w-10 h-10 fill-amber-950 ml-1" />
                </div>
                <h4 className="text-white text-lg sm:text-2xl font-black mt-4 drop-shadow">
                  {currentSong.title}
                </h4>
                <p className="text-amber-200 text-xs sm:text-sm font-bold mt-1">
                  Chạm nút Play để xem cùng bé Ong!
                </p>
              </div>
            )}
          </div>

          {/* TV Control Knobs and Brand */}
          <div className="mt-4 flex items-center justify-between px-2 pt-2 border-t-2 border-sky-500/80">
            <div className="flex items-center gap-2">
              <span className="font-black text-xs sm:text-sm text-sky-950 bg-sky-300 px-3 py-1 rounded-xl border border-sky-500">
                ONG-TV 🐝
              </span>
              <span className="text-xs font-bold text-sky-950 line-clamp-1">
                Kênh đang phát: {currentSong.title}
              </span>
            </div>

            {/* Knobs */}
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 shadow cursor-pointer"></div>
              <div className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-600 shadow cursor-pointer"></div>
            </div>
          </div>
        </div>

        {/* Channel Selector & Lyrics (Right 4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          {/* Channels List */}
          <div className="bg-white border-4 border-amber-300 rounded-3xl p-4 shadow-lg">
            <div className="flex items-center gap-2 font-black text-sm text-amber-950 mb-3 uppercase tracking-wide">
              <Music className="w-4 h-4 text-amber-600" />
              <span>Chọn Kênh Bài Hát Bé Yêu:</span>
            </div>

            <div className="flex flex-col gap-2">
              {VIDEO_SONGS_LIST.map((song) => {
                const isSelected = song.id === currentSong.id;

                return (
                  <button
                    key={song.id}
                    onClick={() => handleSelectSong(song)}
                    className={`w-full p-3 rounded-2xl border-3 text-left transition-all flex items-center justify-between gap-2 cursor-pointer clay-btn ${
                      isSelected
                        ? 'bg-amber-100 border-amber-500 scale-[1.02] shadow-md'
                        : 'bg-slate-50 border-slate-200 hover:bg-amber-50'
                    }`}
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="font-black text-xs sm:text-sm text-slate-900 truncate">
                        {song.title}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 truncate">
                        {song.englishTitle}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${song.badgeColor}`}
                    >
                      {song.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Karaoke Lyrics Highlight Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-4 border-orange-200 rounded-3xl p-4 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-black text-orange-950 uppercase flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-orange-600" /> Lời bài hát vui nhộn
              </span>
              <button
                onClick={() =>
                  soundEngine.speakVietnamese(currentSong.lyricsHighlight.join('. '))
                }
                className="text-[11px] font-bold bg-white border border-orange-300 text-orange-800 px-2 py-0.5 rounded-lg flex items-center gap-1 hover:bg-orange-100"
              >
                <Volume2 className="w-3 h-3" /> Đọc lời
              </button>
            </div>

            <div className="space-y-1.5 text-xs sm:text-sm font-extrabold text-slate-700 bg-white/70 p-3 rounded-2xl border border-orange-200">
              {currentSong.lyricsHighlight.map((line, idx) => (
                <p key={idx} className="flex items-start gap-1.5 text-orange-950">
                  <span className="text-amber-500">🎵</span>
                  <span>{line}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
