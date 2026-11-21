export const PALETTE = {
  sunshineYellow: '#FFD95A',
  pastelYellow: '#FFF3B0',
  skyBlue: '#A9DDF5',
  pastelBlue: '#D9F0FF',
  warmCream: '#FFFDF3',
  white: '#FFFFFF',
  goldenAccent: '#E6B84A',
  deepGolden: '#C48F1D',
  deepSky: '#3A7CA5',
  inkText: '#2A3B4C',
  mutedText: '#536A7E',
  leafGreen: '#5C9E63',
  softLeaf: '#8BC48E',
};

// Color Pop bubble palette — vivid, joyful, zero red/pink!
export const BUBBLE_COLORS = {
  yellow: {
    id: 'yellow',
    label: 'Sunshine',
    bg: 'radial-gradient(circle at 32% 28%, #FFF7CC 0%, #FFD95A 48%, #E6B84A 100%)',
    border: '#D9A426',
    glow: 'rgba(255, 217, 90, 0.7)',
    particle: '#FFD95A',
    icon: 'sun',
  },
  blue: {
    id: 'blue',
    label: 'Sky',
    bg: 'radial-gradient(circle at 32% 28%, #EBF8FF 0%, #7CC8F2 48%, #3B95D1 100%)',
    border: '#2D7DB5',
    glow: 'rgba(124, 200, 242, 0.7)',
    particle: '#7CC8F2',
    icon: 'drop',
  },
  green: {
    id: 'green',
    label: 'Meadow',
    bg: 'radial-gradient(circle at 32% 28%, #E7FBE9 0%, #6DD47E 48%, #3FA657 100%)',
    border: '#2F8844',
    glow: 'rgba(109, 212, 126, 0.7)',
    particle: '#6DD47E',
    icon: 'leaf',
  },
  purple: {
    id: 'purple',
    label: 'Lavender',
    bg: 'radial-gradient(circle at 32% 28%, #F4EEFF 0%, #B392F0 48%, #7E57C2 100%)',
    border: '#6440A8',
    glow: 'rgba(179, 146, 240, 0.7)',
    particle: '#B392F0',
    icon: 'star',
  },
  orange: {
    id: 'orange',
    label: 'Apricot',
    bg: 'radial-gradient(circle at 32% 28%, #FFF0D9 0%, #FFA94D 48%, #E87D1E 100%)',
    border: '#C96610',
    glow: 'rgba(255, 169, 77, 0.7)',
    particle: '#FFA94D',
    icon: 'paw',
  },
};

export const BUBBLE_COLOR_KEYS = ['yellow', 'blue', 'green', 'purple', 'orange'];

// Connect puzzle pipe & node palette — vivid, glossy, zero red/pink!
export const CONNECT_COLORS = {
  yellow: {
    id: 'yellow',
    label: 'Sunshine',
    stroke: '#FFD95A',
    highlight: '#FFF6C4',
    dark: '#C9961A',
    cellBg: 'rgba(255, 217, 90, 0.22)',
  },
  blue: {
    id: 'blue',
    label: 'Sky',
    stroke: '#4CC2FF',
    highlight: '#C9EEFF',
    dark: '#2283BF',
    cellBg: 'rgba(76, 194, 255, 0.22)',
  },
  green: {
    id: 'green',
    label: 'Meadow',
    stroke: '#5ED674',
    highlight: '#CCF7D3',
    dark: '#2B9442',
    cellBg: 'rgba(94, 214, 116, 0.22)',
  },
  purple: {
    id: 'purple',
    label: 'Lavender',
    stroke: '#B388FF',
    highlight: '#E7D8FF',
    dark: '#6F42C1',
    cellBg: 'rgba(179, 136, 255, 0.22)',
  },
  orange: {
    id: 'orange',
    label: 'Apricot',
    stroke: '#FFA742',
    highlight: '#FFE1BD',
    dark: '#CC6D0C',
    cellBg: 'rgba(255, 167, 66, 0.22)',
  },
  teal: {
    id: 'teal',
    label: 'Lagoon',
    stroke: '#3ED1C5',
    highlight: '#C2F7F2',
    dark: '#1C8F87',
    cellBg: 'rgba(62, 209, 197, 0.22)',
  },
};
