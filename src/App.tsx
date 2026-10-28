import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CurriculumBanner } from './components/CurriculumBanner';
import { GamesSection } from './components/GamesSection';
import { VideoStation } from './components/VideoStation';
import { Footer } from './components/Footer';
import { StickerAlbum } from './components/StickerAlbum';
import { ParentModal } from './components/ParentModal';
import { BedtimeScreen } from './components/BedtimeScreen';
import { INITIAL_CHILD_PROFILE } from './data/curriculumData';

export const App: React.FC = () => {
  const [childProfile, setChildProfile] = useState(INITIAL_CHILD_PROFILE);
  const [isStickersOpen, setIsStickersOpen] = useState(false);
  const [isParentModalOpen, setIsParentModalOpen] = useState(false);
  const [isBedtime, setIsBedtime] = useState(false);

  const handleAddStar = () => {
    setChildProfile((prev) => ({
      ...prev,
      stars: prev.stars + 1,
    }));
  };

  const handleExploreGames = () => {
    const el = document.getElementById('tro-choi');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreVideos = () => {
    const el = document.getElementById('video-am-nhac');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="overflow-x-hidden w-full max-w-full min-h-screen bg-gradient-to-b from-amber-50 via-sky-50/40 to-amber-50 text-slate-800">
      {/* Bedtime Fullscreen Mode */}
      {isBedtime ? (
        <BedtimeScreen
          fullName={childProfile.fullName}
          nickname={childProfile.nickname}
          onExit={() => setIsBedtime(false)}
        />
      ) : (
        <>
          {/* Top Sticky Navigation */}
          <Navbar
            fullName={childProfile.fullName}
            nickname={childProfile.nickname}
            className={childProfile.className}
            stars={childProfile.stars}
            onOpenParentModal={() => setIsParentModalOpen(true)}
            onOpenStickers={() => setIsStickersOpen(true)}
          />

          {/* Welcoming Attention Hero */}
          <Hero
            fullName={childProfile.fullName}
            nickname={childProfile.nickname}
            stars={childProfile.stars}
            onExploreGames={handleExploreGames}
            onExploreVideos={handleExploreVideos}
          />

          {/* Real Donald 2 Weekly Curriculum Highlight */}
          <CurriculumBanner />

          {/* 5 Interactive Micro-Games (Interest) */}
          <GamesSection onAddStar={handleAddStar} />

          {/* Curated Music and Video Station (Desire) */}
          <VideoStation />

          {/* Footer & Loving Family Message (Action) */}
          <Footer
            fullName={childProfile.fullName}
            nickname={childProfile.nickname}
            className={childProfile.className}
            onOpenParentModal={() => setIsParentModalOpen(true)}
          />

          {/* Modals */}
          <StickerAlbum
            stars={childProfile.stars}
            fullName={childProfile.fullName}
            nickname={childProfile.nickname}
            isOpen={isStickersOpen}
            onClose={() => setIsStickersOpen(false)}
          />

          <ParentModal
            fullName={childProfile.fullName}
            nickname={childProfile.nickname}
            className={childProfile.className}
            stars={childProfile.stars}
            isOpen={isParentModalOpen}
            onClose={() => setIsParentModalOpen(false)}
            onTriggerBedtime={() => setIsBedtime(true)}
          />
        </>
      )}
    </main>
  );
};

export default App;
