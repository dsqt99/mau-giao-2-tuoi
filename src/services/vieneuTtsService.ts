import { Client } from '@gradio/client';

export const VIENEU_SERVER_URL = 'https://vieneu-tts.cahy.io.vn/';
export const DEFAULT_TTS_VOICE = 'Quỳnh Anh — Nữ · Bắc · Phong cách đọc truyện';

// In-memory audio URL cache for instant playback on repeat taps
const audioCache = new Map<string, string>();

let clientPromise: Promise<Client> | null = null;
let currentAudio: HTMLAudioElement | null = null;
let isSynthesizing = false;

/**
 * Returns a singleton connected Gradio client
 */
function getGradioClient(): Promise<Client> {
  if (!clientPromise) {
    clientPromise = Client.connect(VIENEU_SERVER_URL).catch((err) => {
      // Reset so next call can retry
      clientPromise = null;
      throw err;
    });
  }
  return clientPromise;
}

/**
 * Synthesizes Vietnamese speech using VieNeu-TTS (voice Quỳnh Anh)
 * Returns the direct URL of the generated WAV audio file
 */
export async function synthesizeWithVieNeu(text: string): Promise<string> {
  const cleanText = text.trim();
  if (!cleanText) {
    throw new Error('Empty text');
  }

  // Check cache first
  const cachedUrl = audioCache.get(cleanText);
  if (cachedUrl) {
    return cachedUrl;
  }

  const client = await getGradioClient();

  const job = client.submit('/wrapper', [
    cleanText,
    DEFAULT_TTS_VOICE,
    null,
    '',
    'Standard (Một lần)',
    true,
    16,
    0.8,
    256,
    true,
  ]);

  for await (const msg of job) {
    if (msg.type === 'data') {
      const audioData = msg.data?.[0] as { url?: string; path?: string } | undefined;
      if (audioData?.url) {
        audioCache.set(cleanText, audioData.url);
        return audioData.url;
      }
    }
  }

  throw new Error('No audio URL received from VieNeu-TTS');
}

/**
 * High-level player: Stops any currently playing speech, synthesizes or retrieves from cache,
 * and plays audio with iOS / iPad Safari touch compatibility.
 */
export async function playVieNeuSpeech(text: string): Promise<void> {
  try {
    // Stop previously playing speech
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }

    isSynthesizing = true;
    const audioUrl = await synthesizeWithVieNeu(text);
    isSynthesizing = false;

    const audio = new Audio(audioUrl);
    currentAudio = audio;

    audio.onended = () => {
      if (currentAudio === audio) {
        currentAudio = null;
      }
    };

    audio.onerror = () => {
      if (currentAudio === audio) {
        currentAudio = null;
      }
    };

    await audio.play();
  } catch (error) {
    isSynthesizing = false;
    console.warn('VieNeu-TTS playback notice:', error);
    throw error;
  }
}

/**
 * Pre-warms the cache with common phrases during idle time
 */
export function prewarmCommonPhrases(): void {
  const commonPhrases = [
    'Giỏi quá!',
    'Bé Ong ngoan lắm!',
    'Hoan hô bé Đỗ Minh Hoàng!',
    'Màu đỏ!',
    'Màu vàng!',
    'Màu xanh lá!',
    'Màu xanh dương!',
    'Số bốn!',
    'Hình tròn!',
    'Hình vuông!',
    'Hình tam giác!',
  ];

  // Prefetch sequentially on browser idle with small gaps
  let delay = 3000;
  commonPhrases.forEach((phrase) => {
    setTimeout(() => {
      if (!audioCache.has(phrase)) {
        synthesizeWithVieNeu(phrase).catch(() => {});
      }
    }, delay);
    delay += 2500;
  });
}

export function isVieNeuSynthesizing(): boolean {
  return isSynthesizing;
}
