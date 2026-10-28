// Professional High-Fidelity Audio Engine for Bé Đỗ Minh Hoàng (Bé Ong)
// Plays real authentic MP3 audio for animals, soft warm synthesizer for clicks/pops,
// and strictly protects against broken English-voice text-to-speech.

let audioCtx: AudioContext | null = null;
let isMuted = false;
let isVoiceEnabled = true;
let lastSpeechTime = 0;

// Preload audio elements for instantaneous playback on iPad / mobile
const audioCache: Record<string, HTMLAudioElement> = {};

const ANIMAL_AUDIO_FILES: Record<string, string> = {
  duck: '/audio/duck.mp3',
  cat: '/audio/cat.mp3',
  dog: '/audio/dog.mp3',
  cow: '/audio/cow.mp3',
  elephant: '/audio/elephant.mp3',
  frog: '/audio/frog.mp3',
  lion: '/audio/lion.mp3',
};

// Pre-instantiate audio objects
if (typeof window !== 'undefined') {
  Object.entries(ANIMAL_AUDIO_FILES).forEach(([key, src]) => {
    try {
      const audio = new Audio();
      audio.src = src;
      audio.preload = 'auto';
      audioCache[key] = audio;
    } catch {
      // Audio pre-cache fallback
    }
  });
}

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    audioCtx = new AudioContextClass();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Unlock audio on iOS / iPad Safari touch gesture
export function unlockAudioOnFirstTouch() {
  if (typeof window === 'undefined') return;
  const unlock = () => {
    try {
      const ctx = getAudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      // Play brief silent buffer to unlock iOS Safari Web Audio
      const buffer = ctx.createBuffer(1, 1, 22050);
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.start(0);
    } catch {
      // Silently ignore
    }
    window.removeEventListener('touchstart', unlock);
    window.removeEventListener('click', unlock);
  };
  window.addEventListener('touchstart', unlock, { once: true, passive: true });
  window.addEventListener('click', unlock, { once: true, passive: true });
}

if (typeof window !== 'undefined') {
  unlockAudioOnFirstTouch();
}

export const soundEngine = {
  isMuted() {
    return isMuted;
  },

  setMuted(muted: boolean) {
    isMuted = muted;
    if (muted && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  },

  toggleMute() {
    this.setMuted(!isMuted);
    return isMuted;
  },

  isVoiceEnabled() {
    return isVoiceEnabled;
  },

  toggleVoice() {
    isVoiceEnabled = !isVoiceEnabled;
    if (!isVoiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    return isVoiceEnabled;
  },

  // Soft, Warm, Juicy Bubble Pop (No harsh high-pitched clicks)
  playPop(freqFactor = 1) {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const startTime = ctx.currentTime;
      const baseFreq = 380 * freqFactor;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(baseFreq, startTime);
      osc.frequency.exponentialRampToValueAtTime(110, startTime + 0.09);

      // Lowpass filter to ensure sound is warm, soft, and gentle on toddlers' ears
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, startTime);

      gain.gain.setValueAtTime(0.45, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.1);
    } catch {
      // Fallback
    }
  },

  // Crystal Clear Toy Xylophone / Glockenspiel Note (C4 to C5)
  playXylophone(frequency: number, duration = 0.65) {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const startTime = ctx.currentTime;

      // Pure fundamental tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency, startTime);

      // Soft bell harmonic (gentle chime resonance)
      const harmonic = ctx.createOscillator();
      const harmonicGain = ctx.createGain();
      harmonic.type = 'sine';
      harmonic.frequency.setValueAtTime(frequency * 2, startTime);

      gain.gain.setValueAtTime(0.5, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      harmonicGain.gain.setValueAtTime(0.12, startTime);
      harmonicGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.4);

      osc.connect(gain);
      harmonic.connect(harmonicGain);
      gain.connect(ctx.destination);
      harmonicGain.connect(ctx.destination);

      osc.start(startTime);
      harmonic.start(startTime);
      osc.stop(startTime + duration + 0.05);
      harmonic.stop(startTime + duration + 0.05);
    } catch {
      // Fallback
    }
  },

  // Celebratory Melodic Chime / Fanfare
  playFanfare() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      // Cheerful major pentatonic sparkle (C5, D5, E5, G5, A5, C6)
      const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
      const now = ctx.currentTime;

      notes.forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + index * 0.09;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.28, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.45);
      });
    } catch {
      // Fallback
    }
  },

  // Cute Little Bee Buzz (warm, friendly melody, not a harsh alarm)
  playBeeBuzz() {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;

      // Friendly ascending two-note cheerful bounce
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.linearRampToValueAtTime(390, now + 0.18);
      osc.frequency.linearRampToValueAtTime(520, now + 0.35);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.42);
    } catch {
      // Fallback
    }
  },

  // Real Authentic Animal Sounds from local MP3 files
  playAnimalSound(type: string) {
    if (isMuted) return;

    // First try real authentic local MP3 audio
    const cached = audioCache[type];
    if (cached) {
      try {
        cached.currentTime = 0;
        cached.volume = 0.85;
        const playPromise = cached.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // If browser autoplay restriction, fallback to soft musical cue
            this.playSweetAnimalChime(type);
          });
        }
        return;
      } catch {
        // Fallback
      }
    }

    // Direct new audio fallback
    const directSrc = ANIMAL_AUDIO_FILES[type];
    if (directSrc) {
      try {
        const audio = new Audio(directSrc);
        audio.volume = 0.85;
        audio.play().catch(() => {
          this.playSweetAnimalChime(type);
        });
        return;
      } catch {
        // Fallback
      }
    }

    this.playSweetAnimalChime(type);
  },

  // Soft cartoon melodic cue for each animal (100% bug-free, musical, zero harsh noises)
  playSweetAnimalChime(type: string) {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      const pitches: Record<string, number[]> = {
        duck: [392, 349.2, 392], // Sol - Fa - Sol bouncy
        cat: [523.2, 659.2, 587.3], // High sweet meow
        dog: [293.6, 261.6], // Playful double bark
        elephant: [261.6, 329.6, 392, 523.2], // Majestic trumpet
        cow: [196, 220, 196], // Deep gentle moo
        frog: [261.6, 329.6], // Waterdrop jump
      };

      const notes = pitches[type] || [392, 523.2];
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const start = now + idx * 0.12;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.3, start);
        gain.gain.exponentialRampToValueAtTime(0.001, start + 0.22);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + 0.25);
      });
    } catch {
      // Audio fallback
    }
  },

  // Soft Bedtime Music Box Lullaby Note
  playLullabyNote(freq: number) {
    if (isMuted) return;
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.3);
    } catch {
      // Fallback
    }
  },

  // Natural Vietnamese Voice Praise:
  // CRITICAL FIX: Only speak if a genuine Vietnamese voice is present on the OS!
  // If no Vietnamese voice exists, NEVER let an English robotic voice read Vietnamese words!
  speakVietnamese(text: string) {
    if (isMuted || !isVoiceEnabled) return;
    if (!('speechSynthesis' in window)) return;

    const now = Date.now();
    // Debounce speech by 1.2s to prevent stutter and queue choke when toddler taps rapidly
    if (now - lastSpeechTime < 1200) {
      return;
    }
    lastSpeechTime = now;

    try {
      const voices = window.speechSynthesis.getVoices();
      // Look for a verified Vietnamese voice
      const viVoice = voices.find((v) => {
        const lang = (v.lang || '').toLowerCase().replace('_', '-');
        return lang.startsWith('vi');
      });

      // IF NO VIETNAMESE VOICE EXISTS ON THE MACHINE, DO NOT SPEAK!
      // This eliminates the robotic, distorted English accent reading Vietnamese words!
      if (!viVoice) {
        // Play a sweet, pleasant chime instead of broken robot audio
        this.playPop(1.4);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.voice = viVoice;
      utterance.lang = 'vi-VN';
      utterance.rate = 0.9;
      utterance.pitch = 1.15;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Fallback silently
    }
  },
};
