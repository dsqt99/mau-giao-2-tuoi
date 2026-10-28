import React, { useState, useEffect } from 'react';
import { Shield, Clock, Printer, X } from 'lucide-react';
import { soundEngine } from '../services/soundEngine';

interface ParentModalProps {
  fullName: string;
  nickname: string;
  className: string;
  stars: number;
  isOpen: boolean;
  onClose: () => void;
  onTriggerBedtime: () => void;
}

export const ParentModal: React.FC<ParentModalProps> = ({
  fullName,
  nickname,
  className,
  stars,
  isOpen,
  onClose,
  onTriggerBedtime,
}) => {
  const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  // Simple toddler gate question (2 + 1 = ?)
  const [gateAnswer, setGateAnswer] = useState<number | null>(null);
  const isGatePassed = gateAnswer === 3;

  useEffect(() => {
    if (!remainingSeconds || remainingSeconds <= 0) return;

    const interval = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev && prev > 1) {
          return prev - 1;
        } else {
          clearInterval(interval);
          onTriggerBedtime();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [remainingSeconds, onTriggerBedtime]);

  if (!isOpen) return null;

  const handleSetTimer = (minutes: number) => {
    setRemainingSeconds(minutes * 60);
    soundEngine.playPop(1.2);
  };

  const handleCancelTimer = () => {
    setRemainingSeconds(null);
    soundEngine.playPop(0.9);
  };

  const formatRemaining = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} phút ${secs < 10 ? '0' : ''}${secs} giây`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white border-6 border-slate-300 rounded-[2.5rem] p-5 sm:p-8 max-w-2xl w-full shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playPop(1.1);
            onClose();
          }}
          className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-slate-700 hover:bg-slate-800 text-white border-3 border-white shadow-lg flex items-center justify-center font-black cursor-pointer clay-btn"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Safety Gate Check (Toddler lock) */}
        {!isGatePassed ? (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-3xl bg-amber-100 border-3 border-amber-400 text-amber-700 flex items-center justify-center mx-auto mb-4 text-3xl">
              🔒
            </div>
            <h3 className="text-2xl font-black text-slate-900 mb-2">
              Khóa An Toàn Cho Ba Mẹ
            </h3>
            <p className="text-sm font-bold text-slate-600 mb-6">
              Để bé không vô tình thay đổi cài đặt, ba mẹ vui lòng chọn đáp án đúng:
              <br />
              <span className="text-lg text-amber-600 font-black">2 + 1 = ?</span>
            </p>

            <div className="flex items-center justify-center gap-4">
              {[2, 3, 4].map((ans) => (
                <button
                  key={ans}
                  onClick={() => {
                    if (ans === 3) {
                      soundEngine.playPop(1.4);
                      setGateAnswer(3);
                    } else {
                      soundEngine.playPop(0.7);
                    }
                  }}
                  className="w-16 h-16 rounded-2xl bg-slate-100 hover:bg-amber-100 border-3 border-slate-300 hover:border-amber-400 text-xl font-black text-slate-800 cursor-pointer clay-btn"
                >
                  {ans}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div>
            {/* Modal Header */}
            <div className="flex items-center gap-3 border-b-2 border-slate-200 pb-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 border-2 border-sky-400 text-sky-700 flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-slate-900">
                  Góc Ba Mẹ & Quản Lý Thời Gian
                </h3>
                <p className="text-xs sm:text-sm font-bold text-slate-500">
                  Hồ sơ học tập của bé: {fullName} ({nickname}) - {className}
                </p>
              </div>
            </div>

            {/* Screen-Time Timer Setting */}
            <div className="bg-slate-50 border-3 border-slate-200 rounded-3xl p-5 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5 text-sky-600" />
                <h4 className="font-black text-base text-slate-900">
                  Hẹn Giờ Sử Dụng Màn Hình Cho Bé
                </h4>
              </div>

              {remainingSeconds !== null && remainingSeconds > 0 ? (
                <div className="bg-emerald-100 border-2 border-emerald-400 rounded-2xl p-4 text-center">
                  <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">
                    Đang đếm ngược thời gian chơi:
                  </span>
                  <span className="text-2xl sm:text-3xl font-black text-emerald-950 block">
                    {formatRemaining(remainingSeconds)}
                  </span>
                  <button
                    onClick={handleCancelTimer}
                    className="mt-3 text-xs font-bold text-rose-700 hover:text-rose-900 underline"
                  >
                    Hủy hẹn giờ
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3">
                  {[15, 30, 45].map((mins) => (
                    <button
                      key={mins}
                      onClick={() => handleSetTimer(mins)}
                      className="p-3 rounded-2xl bg-white hover:bg-sky-50 border-3 border-slate-300 hover:border-sky-400 text-slate-800 font-black cursor-pointer clay-btn text-center"
                    >
                      <span className="block text-lg sm:text-xl text-sky-700">{mins}</span>
                      <span className="text-xs text-slate-500">phút</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bedtime Quick Action */}
            <div className="bg-indigo-50 border-3 border-indigo-200 rounded-3xl p-5 mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-indigo-200 text-indigo-800 flex items-center justify-center text-2xl">
                  🌙
                </div>
                <div>
                  <h4 className="font-black text-base text-indigo-950">
                    Chế Độ Ru Ngủ (Bedtime)
                  </h4>
                  <p className="text-xs font-bold text-indigo-800">
                    Bật ngay màn hình êm dịu với bài hát ru để bé đi ngủ ngoan
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onTriggerBedtime();
                  onClose();
                }}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-4 py-2.5 rounded-2xl text-xs sm:text-sm clay-btn shrink-0 cursor-pointer"
              >
                Bật Ru Ngủ
              </button>
            </div>

            {/* Certificate Generator */}
            <div className="bg-amber-50 border-3 border-amber-300 rounded-3xl p-5 mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-200 text-amber-900 flex items-center justify-center text-2xl">
                  📜
                </div>
                <div>
                  <h4 className="font-black text-base text-amber-950">
                    Giấy Chứng Nhận Bé Ngoan
                  </h4>
                  <p className="text-xs font-bold text-amber-800">
                    Xem và in giấy khen thành tích {stars} ⭐ của bé Đỗ Minh Hoàng
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCertificate(true)}
                className="bg-amber-400 hover:bg-amber-300 text-amber-950 border-2 border-amber-500 font-black px-4 py-2.5 rounded-2xl text-xs sm:text-sm clay-btn shrink-0 cursor-pointer"
              >
                Xem Giấy Khen
              </button>
            </div>

            {/* Printable Certificate Preview Modal */}
            {showCertificate && (
              <div className="fixed inset-0 z-60 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
                <div className="bg-amber-50 border-8 border-amber-400 rounded-3xl p-6 sm:p-10 max-w-xl w-full shadow-2xl relative text-center">
                  <button
                    onClick={() => setShowCertificate(false)}
                    className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 font-black"
                  >
                    ✕
                  </button>

                  <span className="text-6xl mb-2 block">🐝 ⭐ 🏆</span>
                  <span className="text-xs font-black text-amber-700 tracking-widest uppercase">
                    TRƯỜNG MẦM NON - LỚP DONALD 2
                  </span>
                  <h2 className="text-3xl font-black text-slate-900 my-2">
                    GIẤY KHEN BÉ NGOAN
                  </h2>
                  <p className="text-sm font-bold text-slate-600 mb-4">
                    Khen tặng bé yêu:
                  </p>

                  <div className="bg-white border-4 border-dashed border-amber-400 rounded-2xl py-3 px-6 inline-block my-2">
                    <span className="text-2xl sm:text-3xl font-black text-amber-600">
                      {fullName} ({nickname})
                    </span>
                  </div>

                  <p className="text-sm font-bold text-slate-700 max-w-md mx-auto my-4 leading-relaxed">
                    Đã chăm chỉ học tập, hoàn thành xuất sắc các trò chơi đếm số, nhận biết màu sắc, hình khối và đạt được{' '}
                    <span className="text-amber-600 font-black">{stars} Ngôi Sao Vàng</span>!
                  </p>

                  <div className="flex items-center justify-around text-xs font-bold text-slate-500 border-t-2 border-amber-200 pt-4 mt-6">
                    <div>
                      <span>Cô giáo chủ nhiệm</span>
                      <p className="font-black text-slate-800 mt-1">Cô Thơm & Cô Hằng</p>
                    </div>
                    <div>
                      <span>Ngày khen thưởng</span>
                      <p className="font-black text-slate-800 mt-1">Tuần 5 - Tháng 10/2026</p>
                    </div>
                  </div>

                  <button
                    onClick={() => window.print()}
                    className="mt-6 bg-amber-400 text-amber-950 font-black px-6 py-3 rounded-2xl border-3 border-amber-500 shadow clay-btn inline-flex items-center gap-2 cursor-pointer"
                  >
                    <Printer className="w-5 h-5" />
                    <span>In Giấy Khen Cho Bé</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
