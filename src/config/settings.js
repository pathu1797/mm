export const STORAGE_KEYS = {
  GARDEN_FLOWERS: 'mm_place_garden_flowers_v1',
  COLOR_POP_PROGRESS: 'mm_place_color_pop_v1',
  SOUND_ENABLED: 'mm_place_sound_enabled_v1',
  WELCOME_OPENED: 'mm_place_welcome_opened_v1',
};

export const DEFAULT_SETTINGS = {
  soundEnabled: false, // Always disabled by default
  letterTypingSpeedMs: 22,
  maxGardenFlowers: 36,
};

export const NAV_SECTIONS = [
  { id: 'home', label: 'Home' },
  { id: 'little-note', label: 'Little Note' },
  { id: 'cat-universe', label: 'Cat Universe' },
  { id: 'flower-garden', label: 'Flower Garden' },
  { id: 'color-pop', label: 'Color Pop' },
  { id: 'surprises', label: 'Surprises' },
];
