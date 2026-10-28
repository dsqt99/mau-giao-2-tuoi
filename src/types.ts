export interface ChildProfile {
  fullName: string;
  nickname: string;
  age: number;
  className: string;
  teachers: string[];
  stars: number;
  unlockedStickers: string[];
}

export interface StickerItem {
  id: string;
  name: string;
  titleVi: string;
  icon: string;
  color: string;
  unlockedAtStars: number;
}

export interface AnimalItem {
  id: string;
  nameVi: string;
  nameEn: string;
  soundTextVi: string;
  soundType: 'duck' | 'cat' | 'dog' | 'elephant' | 'cow' | 'frog';
  color: string;
  bgColor: string;
  emoji: string;
  descriptionVi: string;
}

export interface ShapeItem {
  id: string;
  nameVi: string;
  nameEn: string;
  color: string;
  borderColor: string;
  bgSoft: string;
  shapeType: 'circle' | 'square' | 'triangle' | 'heart' | 'star' | 'oval';
}

export interface SongVideoItem {
  id: string;
  title: string;
  englishTitle: string;
  youtubeId: string;
  category: 'curriculum' | 'english' | 'vietnamese';
  badge: string;
  badgeColor: string;
  lyricsHighlight: string[];
  description: string;
}

export interface FruitItem {
  id: string;
  nameVi: string;
  emoji: string;
  color: string;
}
