import { BUBBLE_COLOR_KEYS } from '../config/colors.js';

let nextTileId = 1;
function makeId() {
  nextTileId += 1;
  return `t-${nextTileId}-${Math.random().toString(36).slice(2, 6)}`;
}

export function randomColor(colorCount) {
  const palette = BUBBLE_COLOR_KEYS.slice(0, Math.min(colorCount, BUBBLE_COLOR_KEYS.length));
  return palette[Math.floor(Math.random() * palette.length)];
}

/**
 * Generates an initial playable board with level obstacles and guarantees at least one valid 3+ match.
 */
export function createBoard(level) {
  const { rows, cols, colorCount, obstacles = [] } = level;
  const obstacleMap = new Map();
  obstacles.forEach((o) => {
    obstacleMap.set(`${o.r},${o.c}`, o.type);
  });

  const buildAttempt = () => {
    const grid = [];
    for (let r = 0; r < rows; r += 1) {
      const row = [];
      for (let c = 0; c < cols; c += 1) {
        const obs = obstacleMap.get(`${r},${c}`);
        if (obs === 'stone') {
          row.push({ id: makeId(), type: 'stone', color: null, isNew: false });
        } else if (obs === 'frost') {
          row.push({
            id: makeId(),
            type: 'frost',
            color: randomColor(colorCount),
            isNew: false,
          });
        } else {
          // Slight clustering bias for natural fun combos
          let color = randomColor(colorCount);
          if (r > 0 && row[c - 1]?.type === 'bubble' && Math.random() < 0.24) {
            color = row[c - 1].color;
          }
          row.push({
            id: makeId(),
            type: 'bubble',
            color,
            special: null,
            isNew: false,
          });
        }
      }
      grid.push(row);
    }
    return grid;
  };

  for (let attempt = 0; attempt < 25; attempt += 1) {
    const grid = buildAttempt();
    if (hasValidMoves(grid)) return grid;
  }

  // Fallback guarantee: force a 3-in-a-row match
  const fallbackGrid = buildAttempt();
  const guaranteedColor = randomColor(colorCount);
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c <= cols - 3; c += 1) {
      if (
        fallbackGrid[r][c].type === 'bubble' &&
        fallbackGrid[r][c + 1].type === 'bubble' &&
        fallbackGrid[r][c + 2].type === 'bubble'
      ) {
        fallbackGrid[r][c].color = guaranteedColor;
        fallbackGrid[r][c + 1].color = guaranteedColor;
        fallbackGrid[r][c + 2].color = guaranteedColor;
        return fallbackGrid;
      }
    }
  }
  return fallbackGrid;
}

const DIRS = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

/**
 * Flood-fill (BFS) to find all orthogonally connected bubbles of the same color.
 */
export function findConnectedCluster(grid, startR, startC) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  const startCell = grid[startR]?.[startC];

  if (!startCell || startCell.type !== 'bubble') return [];

  const targetColor = startCell.color;
  const visited = new Set([`${startR},${startC}`]);
  const queue = [[startR, startC]];
  const cluster = [];

  while (queue.length > 0) {
    const [r, c] = queue.shift();
    cluster.push({ r, c });

    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      const key = `${nr},${nc}`;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited.has(key)) {
        const neighbor = grid[nr][nc];
        if (neighbor && neighbor.type === 'bubble' && neighbor.color === targetColor) {
          visited.add(key);
          queue.push([nr, nc]);
        }
      }
    }
  }

  return cluster;
}

/**
 * Checks if any valid 3+ bubble cluster exists on the board.
 */
export function hasValidMoves(grid) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  const seen = new Set();

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      const key = `${r},${c}`;
      if (seen.has(key)) continue;
      if (grid[r][c]?.type !== 'bubble') continue;

      const cluster = findConnectedCluster(grid, r, c);
      cluster.forEach((cell) => seen.add(`${cell.r},${cell.c}`));
      if (cluster.length >= 3) return true;
    }
  }
  return false;
}

/**
 * Shuffles only normal bubble colors in-place (preserving stones & frost) until a valid move exists.
 */
export function shuffleBoard(grid, colorCount) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  const clone = grid.map((row) => row.map((cell) => ({ ...cell, isNew: false })));

  const bubblePositions = [];
  const colors = [];

  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c < cols; c += 1) {
      if (clone[r][c].type === 'bubble') {
        bubblePositions.push([r, c]);
        colors.push(clone[r][c].color);
      }
    }
  }

  for (let tries = 0; tries < 20; tries += 1) {
    for (let i = colors.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [colors[i], colors[j]] = [colors[j], colors[i]];
    }
    bubblePositions.forEach(([r, c], idx) => {
      clone[r][c].color = colors[idx];
      clone[r][c].id = makeId();
      clone[r][c].isNew = true;
    });
    if (hasValidMoves(clone)) return clone;
  }

  // Guarantee at least one 3-cluster
  const forcedColor = randomColor(colorCount);
  for (let r = 0; r < rows; r += 1) {
    for (let c = 0; c <= cols - 3; c += 1) {
      if (
        clone[r][c].type === 'bubble' &&
        clone[r][c + 1].type === 'bubble' &&
        clone[r][c + 2].type === 'bubble'
      ) {
        clone[r][c].color = forcedColor;
        clone[r][c + 1].color = forcedColor;
        clone[r][c + 2].color = forcedColor;
        return clone;
      }
    }
  }
  return clone;
}

/**
 * Given a list of popped coordinates, removes them, unlocks adjacent frost cells,
 * applies gravity around fixed stone obstacles, and refills new bubbles from the top.
 */
export function resolveClearAndRefill(grid, cellsToClear, colorCount) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  const next = grid.map((row) => row.map((cell) => ({ ...cell, isNew: false })));

  const clearedSet = new Set(cellsToClear.map(({ r, c }) => `${r},${c}`));
  let frostCleared = 0;

  // Unlock frost cells directly cleared or adjacent to cleared bubbles
  const frostUnlocked = new Set();
  cellsToClear.forEach(({ r, c }) => {
    const cell = next[r]?.[c];
    if (!cell) return;
    if (cell.type === 'frost') {
      frostUnlocked.add(`${r},${c}`);
    }
    for (const [dr, dc] of DIRS) {
      const nr = r + dr;
      const nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        if (next[nr][nc]?.type === 'frost') {
          frostUnlocked.add(`${nr},${nc}`);
        }
      }
    }
  });

  frostUnlocked.forEach((key) => {
    const [r, c] = key.split(',').map(Number);
    if (next[r][c].type === 'frost') {
      frostCleared += 1;
      // Convert frost into an active bubble or clear it if it was directly targeted by powerup
      if (clearedSet.has(key)) {
        next[r][c] = null;
      } else {
        next[r][c] = {
          id: makeId(),
          type: 'bubble',
          color: next[r][c].color || randomColor(colorCount),
          special: null,
          isNew: true,
        };
      }
    }
  });

  // Remove cleared bubbles
  cellsToClear.forEach(({ r, c }) => {
    if (next[r]?.[c] && next[r][c].type !== 'stone') {
      next[r][c] = null;
    }
  });

  // Apply column-by-column gravity (stones stay anchored in place; bubbles fall around them!)
  for (let c = 0; c < cols; c += 1) {
    // Collect movable cells in this column from bottom to top
    const movableSlots = [];
    const existingMovables = [];

    for (let r = rows - 1; r >= 0; r -= 1) {
      if (next[r][c] === null) {
        movableSlots.push(r);
      } else if (next[r][c].type !== 'stone') {
        movableSlots.push(r);
        existingMovables.push(next[r][c]);
      }
    }

    // Place existing movable cells into lowest available slots, then refill upper slots with fresh bubbles
    movableSlots.forEach((slotRow, idx) => {
      if (idx < existingMovables.length) {
        next[slotRow][c] = existingMovables[idx];
      } else {
        next[slotRow][c] = {
          id: makeId(),
          type: 'bubble',
          color: randomColor(colorCount),
          special: null,
          isNew: true,
        };
      }
    });
  }

  let didShuffle = false;
  let finalGrid = next;
  if (!hasValidMoves(finalGrid)) {
    finalGrid = shuffleBoard(finalGrid, colorCount);
    didShuffle = true;
  }

  return {
    grid: finalGrid,
    frostCleared,
    didShuffle,
  };
}

/**
 * Computes which cells a Power-Up clears when used on (targetR, targetC).
 * - pawBomb: 3x3 surrounding area (clears bubbles & frost, leaves stones intact)
 * - sunshineBlast: ALL bubbles of the selected bubble's color across the entire board
 * - champakBloom: full cross (+) + petal diagonals (radius 2 in cardinal + 1 in diagonal)
 */
export function getPowerUpTargets(grid, powerUpType, targetR, targetC) {
  const rows = grid.length;
  const cols = grid[0]?.length || 0;
  const targetCell = grid[targetR]?.[targetC];
  if (!targetCell) return [];

  const targets = [];
  const added = new Set();
  const push = (r, c) => {
    const key = `${r},${c}`;
    if (r >= 0 && r < rows && c >= 0 && c < cols && !added.has(key)) {
      if (grid[r][c] && grid[r][c].type !== 'stone') {
        added.add(key);
        targets.push({ r, c });
      }
    }
  };

  if (powerUpType === 'pawBomb') {
    for (let dr = -1; dr <= 1; dr += 1) {
      for (let dc = -1; dc <= 1; dc += 1) {
        push(targetR + dr, targetC + dc);
      }
    }
  } else if (powerUpType === 'sunshineBlast') {
    const color = targetCell.color;
    if (!color) return [];
    for (let r = 0; r < rows; r += 1) {
      for (let c = 0; c < cols; c += 1) {
        if (grid[r][c]?.color === color && grid[r][c]?.type !== 'stone') {
          push(r, c);
        }
      }
    }
  } else if (powerUpType === 'champakBloom') {
    // 5-petal flower burst: center + full row/col radius 2 + diagonal petals
    push(targetR, targetC);
    [
      [-1, 0], [-2, 0],
      [1, 0], [2, 0],
      [0, -1], [0, -2],
      [0, 1], [0, 2],
      [-1, -1], [-1, 1],
      [1, -1], [1, 1],
    ].forEach(([dr, dc]) => push(targetR + dr, targetC + dc));
  }

  return targets;
}
