/**
 * 10 Mathematically Verified Full-Board Levels for "Connect with MM"
 * Every level covers 100% of grid cells with non-crossing orthogonal paths.
 * Endpoints are automatically derived from the first & last cell of each solution path.
 */

const RAW_LEVELS = [
  {
    id: 1,
    name: 'Sunny Weave',
    subtitle: 'Drag between matching dots to connect them and fill every tile!',
    size: 4,
    solutions: {
      blue: [[0, 1], [0, 0], [1, 0], [2, 0], [3, 0], [3, 1], [3, 2]],
      purple: [[0, 2], [0, 3], [1, 3], [2, 3], [3, 3]],
      yellow: [[1, 2], [1, 1], [2, 1], [2, 2]],
    },
  },
  {
    id: 2,
    name: 'Chafa Corners',
    subtitle: 'Four cozy colors — keep pipes from crossing!',
    size: 4,
    solutions: {
      blue: [[0, 0], [0, 1], [0, 2], [1, 2], [2, 2]],
      purple: [[0, 3], [1, 3], [2, 3], [3, 3]],
      yellow: [[1, 1], [1, 0], [2, 0], [3, 0]],
      green: [[2, 1], [3, 1], [3, 2]],
    },
  },
  {
    id: 3,
    name: 'Meadow Curves',
    subtitle: 'Stepping up to a 5×5 sunshine board!',
    size: 5,
    solutions: {
      blue: [[2, 0], [1, 0], [0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [2, 3]],
      yellow: [[1, 2], [1, 1], [2, 1], [3, 1], [3, 0], [4, 0]],
      green: [[2, 2], [3, 2], [4, 2], [4, 1]],
      purple: [[0, 4], [1, 4], [2, 4], [3, 4], [3, 3], [4, 3], [4, 4]],
    },
  },
  {
    id: 4,
    name: 'Kitten Trails',
    subtitle: 'Five joyful paths weaving side by side.',
    size: 5,
    solutions: {
      blue: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [4, 1]],
      yellow: [[0, 1], [0, 2], [0, 3], [1, 3], [1, 2]],
      green: [[1, 1], [2, 1], [3, 1], [3, 2], [2, 2]],
      purple: [[0, 4], [1, 4], [2, 4], [2, 3]],
      orange: [[3, 3], [3, 4], [4, 4], [4, 3], [4, 2]],
    },
  },
  {
    id: 5,
    name: 'Cloudy Loop',
    subtitle: 'Look around the corners before connecting the middle!',
    size: 5,
    solutions: {
      yellow: [[1, 0], [0, 0], [0, 1], [0, 2], [0, 3]],
      blue: [[0, 4], [1, 4], [1, 3], [1, 2], [2, 2]],
      green: [[1, 1], [2, 1], [3, 1], [3, 2], [3, 3]],
      orange: [[2, 0], [3, 0], [4, 0], [4, 1], [4, 2]],
      purple: [[2, 3], [2, 4], [3, 4], [4, 4], [4, 3]],
    },
  },
  {
    id: 6,
    name: 'Sunshine Bridges',
    subtitle: 'Welcome to 6×6! Long sweeping paths ahead.',
    size: 6,
    solutions: {
      yellow: [[0, 2], [0, 1], [0, 0], [1, 0], [2, 0], [3, 0], [3, 1], [2, 1]],
      blue: [[1, 1], [1, 2], [1, 3], [0, 3], [0, 4], [0, 5], [1, 5], [2, 5]],
      green: [[2, 2], [2, 3], [2, 4], [1, 4]],
      purple: [[4, 0], [5, 0], [5, 1], [4, 1], [4, 2], [3, 2], [3, 3], [3, 4]],
      orange: [[3, 5], [4, 5], [5, 5], [5, 4], [4, 4], [4, 3], [5, 3], [5, 2]],
    },
  },
  {
    id: 7,
    name: 'Butterfly Paths',
    subtitle: 'Six bright colors fluttering across the board!',
    size: 6,
    solutions: {
      yellow: [[0, 0], [0, 1], [0, 2], [1, 2], [1, 1]],
      blue: [[1, 0], [2, 0], [3, 0], [4, 0], [4, 1], [3, 1], [2, 1]],
      green: [[0, 3], [0, 4], [0, 5], [1, 5], [1, 4], [1, 3]],
      purple: [[2, 2], [2, 3], [2, 4], [2, 5], [3, 5], [3, 4]],
      orange: [[5, 0], [5, 1], [5, 2], [4, 2], [3, 2], [3, 3]],
      teal: [[4, 3], [4, 4], [4, 5], [5, 5], [5, 4], [5, 3]],
    },
  },
  {
    id: 8,
    name: 'Golden Spiral',
    subtitle: 'Hug the outer walls to unlock the center!',
    size: 6,
    solutions: {
      yellow: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [5, 1]],
      blue: [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [1, 5], [2, 5]],
      green: [[1, 1], [2, 1], [3, 1], [4, 1], [4, 2]],
      purple: [[1, 2], [1, 3], [1, 4], [2, 4], [2, 3]],
      orange: [[2, 2], [3, 2], [3, 3], [3, 4], [3, 5], [4, 5]],
      teal: [[5, 2], [5, 3], [4, 3], [4, 4], [5, 4], [5, 5]],
    },
  },
  {
    id: 9,
    name: 'Starlight Maze',
    subtitle: '7×7 puzzle — take your time, MM!',
    size: 7,
    solutions: {
      yellow: [[0, 0], [0, 1], [0, 2], [0, 3], [1, 3], [1, 2], [1, 1], [1, 0]],
      blue: [[0, 4], [0, 5], [0, 6], [1, 6], [2, 6], [2, 5], [1, 5], [1, 4]],
      green: [[2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [6, 1], [5, 1], [4, 1], [3, 1]],
      purple: [[2, 1], [2, 2], [2, 3], [2, 4], [3, 4], [3, 3], [3, 2]],
      orange: [[3, 5], [3, 6], [4, 6], [5, 6], [6, 6], [6, 5], [5, 5], [4, 5], [4, 4]],
      teal: [[4, 2], [4, 3], [5, 3], [5, 2], [6, 2], [6, 3], [6, 4], [5, 4]],
    },
  },
  {
    id: 10,
    name: 'Grand Chafa Connect',
    subtitle: 'The ultimate 7×7 pipe master challenge for MM!',
    size: 7,
    solutions: {
      yellow: [[3, 3], [2, 3], [2, 2], [2, 1], [1, 1], [1, 2], [1, 3], [1, 4], [2, 4]],
      blue: [[0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 6], [1, 5]],
      green: [[1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [6, 1], [5, 1], [4, 1]],
      purple: [[3, 1], [3, 2], [4, 2], [5, 2], [6, 2], [6, 3], [5, 3], [4, 3]],
      orange: [[2, 5], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [6, 5], [6, 4]],
      teal: [[3, 4], [3, 5], [4, 5], [5, 5], [5, 4], [4, 4]],
    },
  },
];

export const CONNECT_LEVELS = RAW_LEVELS.map((lvl) => {
  const pairs = Object.entries(lvl.solutions).map(([color, path]) => ({
    color,
    start: path[0],
    end: path[path.length - 1],
  }));
  return {
    ...lvl,
    pairs,
    colorCount: pairs.length,
    totalCells: lvl.size * lvl.size,
  };
});
