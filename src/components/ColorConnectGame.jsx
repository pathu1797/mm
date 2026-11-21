import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  RotateCcw,
  Undo2,
  Lightbulb,
  Star,
  CheckCircle2,
  Lock,
  ChevronRight,
  Sparkles,
  Waypoints,
} from 'lucide-react';
import { CONNECT_LEVELS } from '../games/connectLevels';
import { CONNECT_COLORS } from '../config/colors';
import { STORAGE_KEYS } from '../config/settings';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { CatIllustration } from '../assets/CatIllustrations';
import { ChafaFlower } from '../assets/ChafaFlowerSVG';
import { PawPrint } from '../assets/SceneDecorations';
import { CelebrationBurst } from '../animations/CelebrationBurst';
import { soundEngine } from '../utils/soundEngine';

const DEFAULT_CONNECT_PROGRESS = {
  unlockedLevel: 1,
  currentLevel: 1,
  completedLevels: {}, // { [id]: { bestMoves, stars } }
};

function sameCell(a, b) {
  return a && b && a[0] === b[0] && a[1] === b[1];
}

function isAdjacent(a, b) {
  return Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) === 1;
}

function isColorComplete(path, pair) {
  if (!path || path.length < 2) return false;
  const first = path[0];
  const last = path[path.length - 1];
  return (
    (sameCell(first, pair.start) && sameCell(last, pair.end)) ||
    (sameCell(first, pair.end) && sameCell(last, pair.start))
  );
}

export function ColorConnectGame() {
  const [progress, setProgress] = useState(() => ({
    ...DEFAULT_CONNECT_PROGRESS,
    ...loadFromStorage(STORAGE_KEYS.CONNECT_PROGRESS, DEFAULT_CONNECT_PROGRESS),
  }));

  const level = useMemo(
    () => CONNECT_LEVELS.find((l) => l.id === progress.currentLevel) || CONNECT_LEVELS[0],
    [progress.currentLevel]
  );

  const [paths, setPaths] = useState({}); // { [color]: Array<[r, c]> }
  const [history, setHistory] = useState([]);
  const [moves, setMoves] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [activeColor, setActiveColor] = useState(null);
  const [won, setWon] = useState(false);
  const [celebrationKey, setCelebrationKey] = useState(0);
  const [showLevels, setShowLevels] = useState(false);
  const [catCheer, setCatCheer] = useState(level.subtitle);
  const [catJumping, setCatJumping] = useState(false);

  const boardRef = useRef(null);
  const pathsRef = useRef(paths);
  pathsRef.current = paths;

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CONNECT_PROGRESS, progress);
  }, [progress]);

  // Fast endpoint lookup: "r,c" -> color
  const endpointMap = useMemo(() => {
    const map = new Map();
    level.pairs.forEach((p) => {
      map.set(`${p.start[0]},${p.start[1]}`, p.color);
      map.set(`${p.end[0]},${p.end[1]}`, p.color);
    });
    return map;
  }, [level]);

  const pairByColor = useMemo(() => {
    const map = {};
    level.pairs.forEach((p) => {
      map[p.color] = p;
    });
    return map;
  }, [level]);

  // Derived metrics
  const { connectedCount, filledCount, cellColorMap } = useMemo(() => {
    const map = new Map();
    let connected = 0;

    level.pairs.forEach((pair) => {
      const p = paths[pair.color] || [];
      if (isColorComplete(p, pair)) connected += 1;
      p.forEach(([r, c]) => map.set(`${r},${c}`, pair.color));
    });

    // Always include endpoints as occupied cells when filled or drawn
    return {
      connectedCount: connected,
      filledCount: map.size,
      cellColorMap: map,
    };
  }, [level, paths]);

  const fillPercent = Math.round((filledCount / level.totalCells) * 100);
  const allPairsConnected = connectedCount === level.colorCount;

  const startLevel = useCallback((levelId) => {
    const nextLvl = CONNECT_LEVELS.find((l) => l.id === levelId) || CONNECT_LEVELS[0];
    setProgress((prev) => ({ ...prev, currentLevel: nextLvl.id }));
    setPaths({});
    setHistory([]);
    setMoves(0);
    setHintsUsed(0);
    setActiveColor(null);
    setWon(false);
    setShowLevels(false);
    setCatCheer(nextLvl.subtitle);
    soundEngine.playSoftClick();
  }, []);

  // Trigger win when all pairs connected AND 100% of board filled
  useEffect(() => {
    if (won) return;
    if (allPairsConnected && filledCount === level.totalCells) {
      setWon(true);
      setActiveColor(null);
      setCelebrationKey((k) => k + 1);
      setCatJumping(true);
      setCatCheer(`Purr-fect 100% Connection, MM! Level ${level.id} Cleared!`);
      soundEngine.playCelebration();

      const stars = hintsUsed === 0 ? 3 : hintsUsed === 1 ? 2 : 1;
      setProgress((prev) => {
        const old = prev.completedLevels[level.id];
        return {
          ...prev,
          unlockedLevel: Math.min(CONNECT_LEVELS.length, Math.max(prev.unlockedLevel, level.id + 1)),
          completedLevels: {
            ...prev.completedLevels,
            [level.id]: {
              bestMoves: old ? Math.min(old.bestMoves, Math.max(moves, level.colorCount)) : Math.max(moves, level.colorCount),
              stars: Math.max(old?.stars || 0, stars),
            },
          },
        };
      });
    } else if (allPairsConnected && filledCount < level.totalCells) {
      const left = level.totalCells - filledCount;
      setCatCheer(`All dots linked! Fill the last ${left} empty ${left === 1 ? 'tile' : 'tiles'} for 100%!`);
    }
  }, [allPairsConnected, filledCount, level, won, hintsUsed, moves]);

  const getCellFromPointer = (clientX, clientY) => {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    if (x < 0 || y < 0 || x >= rect.width || y >= rect.height) return null;
    const c = Math.min(level.size - 1, Math.max(0, Math.floor((x / rect.width) * level.size)));
    const r = Math.min(level.size - 1, Math.max(0, Math.floor((y / rect.height) * level.size)));
    return [r, c];
  };

  const pushHistory = (snapshot) => {
    setHistory((prev) => [...prev.slice(-24), snapshot]);
  };

  const handlePointerDown = (e) => {
    if (won) return;
    const cell = getCellFromPointer(e.clientX, e.clientY);
    if (!cell) return;

    e.currentTarget.setPointerCapture?.(e.pointerId);

    const key = `${cell[0]},${cell[1]}`;
    const endColor = endpointMap.get(key);

    if (endColor) {
      pushHistory(pathsRef.current);
      setActiveColor(endColor);
      setMoves((m) => m + 1);
      setPaths((prev) => ({ ...prev, [endColor]: [cell] }));
      soundEngine.playSoftClick();
      return;
    }

    // Or pick up from an existing drawn pipe segment
    const existingColor = cellColorMap.get(key);
    if (existingColor) {
      const currentPath = pathsRef.current[existingColor] || [];
      const idx = currentPath.findIndex((p) => sameCell(p, cell));
      if (idx !== -1) {
        pushHistory(pathsRef.current);
        setActiveColor(existingColor);
        setPaths((prev) => ({
          ...prev,
          [existingColor]: currentPath.slice(0, idx + 1),
        }));
        soundEngine.playSoftClick();
      }
    }
  };

  const stepIntoCell = useCallback(
    (color, targetCell) => {
      setPaths((prev) => {
        const curPath = prev[color] || [];
        if (curPath.length === 0) return prev;
        const head = curPath[curPath.length - 1];
        if (sameCell(head, targetCell)) return prev;

        // If backtracking to an earlier cell in our own path, trim back cleanly
        const selfIdx = curPath.findIndex((p) => sameCell(p, targetCell));
        if (selfIdx !== -1) {
          return { ...prev, [color]: curPath.slice(0, selfIdx + 1) };
        }

        // Cannot keep drawing past our own already-completed destination endpoint
        const pair = pairByColor[color];
        if (curPath.length >= 2 && isColorComplete(curPath, pair)) {
          return prev;
        }

        // Only allow strictly orthogonal step
        if (!isAdjacent(head, targetCell)) return prev;

        // Block stepping onto a different color's endpoint dot
        const targetKey = `${targetCell[0]},${targetCell[1]}`;
        const targetEndpointColor = endpointMap.get(targetKey);
        if (targetEndpointColor && targetEndpointColor !== color) {
          return prev;
        }

        // If stepping onto another color's pipe, cleanly cut that pipe before this cell
        const nextPaths = { ...prev };
        Object.keys(nextPaths).forEach((otherColor) => {
          if (otherColor === color) return;
          const otherPath = nextPaths[otherColor];
          if (!otherPath) return;
          const cutIdx = otherPath.findIndex((p) => sameCell(p, targetCell));
          if (cutIdx !== -1) {
            nextPaths[otherColor] = otherPath.slice(0, cutIdx);
          }
        });

        const updatedPath = [...curPath, targetCell];
        nextPaths[color] = updatedPath;

        if (isColorComplete(updatedPath, pair)) {
          soundEngine.playPop(3);
          setCatJumping(true);
          setCatCheer(`${CONNECT_COLORS[color].label} connected! Keep going, MM!`);
          setTimeout(() => setCatJumping(false), 550);
        }

        return nextPaths;
      });
    },
    [endpointMap, pairByColor]
  );

  const handlePointerMove = (e) => {
    if (!activeColor || won) return;
    const cell = getCellFromPointer(e.clientX, e.clientY);
    if (!cell) return;

    const curPath = pathsRef.current[activeColor] || [];
    const head = curPath[curPath.length - 1];
    if (!head || sameCell(head, cell)) return;

    if (isAdjacent(head, cell)) {
      stepIntoCell(activeColor, cell);
    } else {
      // Smooth corner-turn forgiveness if pointer moved slightly diagonally (Manhattan dist = 2)
      const dr = cell[0] - head[0];
      const dc = cell[1] - head[1];
      if (Math.abs(dr) + Math.abs(dc) === 2) {
        const candidates =
          dr !== 0 && dc !== 0
            ? [
                [head[0] + dr, head[1]],
                [head[0], head[1] + dc],
              ]
            : [[head[0] + Math.sign(dr), head[1] + Math.sign(dc)]];

        const validMid = candidates.find(([mr, mc]) => {
          const ep = endpointMap.get(`${mr},${mc}`);
          return !ep || ep === activeColor;
        });

        if (validMid) {
          stepIntoCell(activeColor, validMid);
          stepIntoCell(activeColor, cell);
        }
      }
    }
  };

  const handlePointerUp = () => {
    setActiveColor(null);
  };

  const handleUndo = () => {
    if (history.length === 0 || won) return;
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setPaths(previous);
    soundEngine.playSoftClick();
  };

  const handleHint = () => {
    if (won) return;
    // Find first color whose current path does NOT match its verified solution
    const unsolvedPair = level.pairs.find((pair) => {
      const cur = paths[pair.color] || [];
      const sol = level.solutions[pair.color];
      if (cur.length !== sol.length) return true;
      const forwardMatch = cur.every((c, i) => sameCell(c, sol[i]));
      const reverseMatch = cur.every((c, i) => sameCell(c, sol[sol.length - 1 - i]));
      return !(forwardMatch || reverseMatch);
    });

    if (!unsolvedPair) return;

    pushHistory(paths);
    const solPath = level.solutions[unsolvedPair.color];
    const solKeys = new Set(solPath.map(([r, c]) => `${r},${c}`));

    const nextPaths = { ...paths };
    // Clear any conflicting cells from other player paths
    Object.keys(nextPaths).forEach((otherColor) => {
      if (otherColor === unsolvedPair.color) return;
      const otherPath = nextPaths[otherColor] || [];
      const conflictIdx = otherPath.findIndex(([r, c]) => solKeys.has(`${r},${c}`));
      if (conflictIdx !== -1) {
        nextPaths[otherColor] = otherPath.slice(0, conflictIdx);
      }
    });

    nextPaths[unsolvedPair.color] = solPath.map((c) => [...c]);
    setPaths(nextPaths);
    setHintsUsed((h) => h + 1);
    setCatCheer(`Hint! ${CONNECT_COLORS[unsolvedPair.color].label} pipe snapped right into place!`);
    soundEngine.playBloom();
  };

  const completedCount = Object.keys(progress.completedLevels).length;

  // Build SVG polyline path string for smooth rounded pipes
  const buildSvgPath = (cells) => {
    if (!cells || cells.length < 2) return '';
    return cells
      .map(([r, c], idx) => {
        const x = c * 100 + 50;
        const y = r * 100 + 50;
        return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');
  };

  return (
    <section
      id="color-connect"
      className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#FFF3B0]/45 via-[#FFFDF3] to-[#D9F0FF]/45"
    >
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-4 py-1 rounded-full bg-[#D9F0FF] text-[#2F6F97] text-xs font-extrabold uppercase tracking-wider mb-3">
            10 Flow Connect Puzzles
          </span>
          <h2 className="font-storybook text-3xl sm:text-4xl font-bold text-[#2A3B4C] mb-2">
            Connect with MM
          </h2>
          <p className="text-base text-[#536A7E] font-semibold">
            Draw glowing paths between matching colored dots without crossing pipes — fill 100% of the board to win!
          </p>
        </div>

        {/* Main Card */}
        <div className="relative bg-[#FFFDF3] rounded-[2.2rem] border-4 border-white shadow-xl p-4 sm:p-6 md:p-8 overflow-hidden">
          <div className="pointer-events-none absolute -top-4 -right-4 opacity-40">
            <ChafaFlower size={72} withStem={false} sway={false} />
          </div>
          <div className="pointer-events-none absolute -bottom-3 -left-3 opacity-35">
            <PawPrint className="w-14 h-14" color="#E6B84A" rotate={18} />
          </div>

          <CelebrationBurst active={won} burstKey={celebrationKey} />

          {/* HUD Row */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="rounded-2xl bg-white border-2 border-[#FFD95A] px-3.5 py-2.5 text-center shadow-2xs">
              <span className="block text-[11px] font-extrabold uppercase tracking-wide text-[#536A7E]">
                Level
              </span>
              <button
                type="button"
                onClick={() => setShowLevels((v) => !v)}
                className="font-storybook text-xl sm:text-2xl font-bold text-[#2A3B4C] hover:text-[#3A7CA5] cursor-pointer"
                aria-label="Open Connect level selector"
              >
                {level.id} / 10 ▾
              </button>
            </div>

            <div className="rounded-2xl bg-white border-2 border-[#A9DDF5] px-3.5 py-2.5 text-center shadow-2xs">
              <span className="block text-[11px] font-extrabold uppercase tracking-wide text-[#536A7E]">
                Connected
              </span>
              <span className="font-storybook text-xl sm:text-2xl font-bold text-[#2F6F97]">
                {connectedCount} / {level.colorCount}
              </span>
            </div>

            <div className="rounded-2xl bg-white border-2 border-[#FFF3B0] px-3.5 py-2.5 text-center shadow-2xs">
              <span className="block text-[11px] font-extrabold uppercase tracking-wide text-[#536A7E]">
                Board Fill
              </span>
              <span className="font-storybook text-xl sm:text-2xl font-bold text-[#2A3B4C]">
                {fillPercent}%
              </span>
            </div>

            <div className="rounded-2xl bg-white border-2 border-[#D9F0FF] px-3.5 py-2.5 text-center shadow-2xs">
              <span className="block text-[11px] font-extrabold uppercase tracking-wide text-[#536A7E]">
                Moves
              </span>
              <span className="font-storybook text-xl sm:text-2xl font-bold text-[#2A3B4C]">
                {moves}
              </span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 bg-white/90 rounded-2xl border border-[#D9F0FF] px-4 py-3 mb-5">
            <div className="flex items-center gap-2">
              <Waypoints className="w-4 h-4 text-[#3A7CA5]" />
              <span className="font-storybook text-sm sm:text-base font-bold text-[#2A3B4C]">
                Lv.{level.id}: {level.name} ({level.size}×{level.size})
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => setShowLevels((v) => !v)}
                className="px-3 py-1.5 rounded-full bg-[#D9F0FF]/80 hover:bg-[#A9DDF5] text-[#2A3B4C] text-xs font-extrabold cursor-pointer transition-colors"
              >
                Levels ({completedCount}/10)
              </button>
              <button
                type="button"
                onClick={handleHint}
                disabled={won}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] text-[#2A3B4C] text-xs font-extrabold disabled:opacity-45 cursor-pointer transition-colors"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>Hint</span>
              </button>
              <button
                type="button"
                onClick={handleUndo}
                disabled={history.length === 0 || won}
                aria-label="Undo last move"
                className="p-2 rounded-full bg-[#FFF3B0] hover:bg-[#FFD95A] text-[#2A3B4C] disabled:opacity-45 cursor-pointer transition-colors"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => startLevel(level.id)}
                aria-label="Restart level"
                className="p-2 rounded-full bg-[#D9F0FF] hover:bg-[#A9DDF5] text-[#2A3B4C] cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Level Picker */}
          {showLevels && (
            <div className="relative z-20 mb-5 rounded-3xl bg-white border-2 border-[#A9DDF5] p-4 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-storybook text-base font-bold text-[#2A3B4C]">
                  Choose a Connect Puzzle (10 Stages)
                </h3>
                <button
                  type="button"
                  onClick={() => setShowLevels(false)}
                  className="text-xs font-bold text-[#3A7CA5] hover:underline cursor-pointer"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {CONNECT_LEVELS.map((lvl) => {
                  const unlocked = lvl.id <= progress.unlockedLevel;
                  const record = progress.completedLevels[lvl.id];
                  const isCurrent = lvl.id === level.id;
                  return (
                    <button
                      key={lvl.id}
                      type="button"
                      disabled={!unlocked}
                      onClick={() => startLevel(lvl.id)}
                      className={`rounded-2xl p-2.5 text-left border-2 transition-all ${
                        isCurrent
                          ? 'bg-[#FFD95A]/45 border-[#E6B84A] cursor-pointer'
                          : unlocked
                          ? 'bg-[#FFFDF3] border-[#D9F0FF] hover:border-[#A9DDF5] cursor-pointer'
                          : 'bg-slate-100/80 border-slate-200 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-storybook text-sm font-bold text-[#2A3B4C]">
                          Lv. {lvl.id}
                        </span>
                        {!unlocked ? (
                          <Lock className="w-3.5 h-3.5 text-[#536A7E]" />
                        ) : record ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#3FA657]" />
                        ) : null}
                      </div>
                      <p className="text-[11px] font-bold text-[#536A7E] truncate">
                        {lvl.size}×{lvl.size} · {lvl.name}
                      </p>
                      <div className="flex items-center gap-0.5 mt-1">
                        {[1, 2, 3].map((s) => (
                          <Star
                            key={s}
                            className={`w-3 h-3 ${
                              (record?.stars || 0) >= s
                                ? 'text-[#E6B84A] fill-[#FFD95A]'
                                : 'text-[#D9F0FF]'
                            }`}
                          />
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Board + Mascot Side Panel */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Interactive Pipe Grid */}
            <div className="lg:col-span-8 flex flex-col items-center">
              <div className="relative w-full max-w-[430px] aspect-square rounded-[1.8rem] p-3 bg-gradient-to-br from-[#2B3E52] to-[#1E2E3F] border-4 border-white shadow-xl">
                <div
                  ref={boardRef}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  className="relative w-full h-full rounded-2xl overflow-hidden touch-none select-none cursor-pointer"
                  role="application"
                  aria-label={`Connect puzzle grid, level ${level.id}, ${level.size} by ${level.size}`}
                >
                  {/* Grid cells with colored soft background glow */}
                  <div
                    className="grid w-full h-full"
                    style={{
                      gridTemplateColumns: `repeat(${level.size}, minmax(0, 1fr))`,
                      gridTemplateRows: `repeat(${level.size}, minmax(0, 1fr))`,
                    }}
                  >
                    {Array.from({ length: level.size * level.size }, (_, idx) => {
                      const r = Math.floor(idx / level.size);
                      const c = idx % level.size;
                      const key = `${r},${c}`;
                      const fillColor = cellColorMap.get(key) || endpointMap.get(key);
                      const colorDef = fillColor ? CONNECT_COLORS[fillColor] : null;
                      return (
                        <div
                          key={key}
                          className="border border-white/12 transition-colors duration-150"
                          style={{
                            backgroundColor: colorDef ? colorDef.cellBg : 'rgba(255, 255, 255, 0.03)',
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Crisp Vector Pipes & Glossy Endpoint Dots Overlay */}
                  <svg
                    viewBox={`0 0 ${level.size * 100} ${level.size * 100}`}
                    className="pointer-events-none absolute inset-0 w-full h-full"
                  >
                    {/* Drawn pipes */}
                    {level.pairs.map((pair) => {
                      const p = paths[pair.color];
                      if (!p || p.length < 2) return null;
                      const col = CONNECT_COLORS[pair.color];
                      const d = buildSvgPath(p);
                      return (
                        <g key={`pipe-${pair.color}`}>
                          {/* Outer shadow / rim */}
                          <path
                            d={d}
                            fill="none"
                            stroke={col.dark}
                            strokeWidth="44"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Vibrant pipe body */}
                          <path
                            d={d}
                            fill="none"
                            stroke={col.stroke}
                            strokeWidth="36"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          {/* Glossy inner highlight */}
                          <path
                            d={d}
                            fill="none"
                            stroke={col.highlight}
                            strokeWidth="11"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            opacity="0.55"
                          />
                        </g>
                      );
                    })}

                    {/* Glossy Endpoint Dots */}
                    {level.pairs.map((pair) => {
                      const col = CONNECT_COLORS[pair.color];
                      const isDone = isColorComplete(paths[pair.color], pair);
                      return [pair.start, pair.end].map(([r, c], endIdx) => {
                        const cx = c * 100 + 50;
                        const cy = r * 100 + 50;
                        return (
                          <g key={`dot-${pair.color}-${endIdx}`}>
                            {isDone && (
                              <circle
                                cx={cx}
                                cy={cy}
                                r="39"
                                fill="none"
                                stroke={col.highlight}
                                strokeWidth="4"
                                opacity="0.7"
                              />
                            )}
                            <circle
                              cx={cx}
                              cy={cy}
                              r="33"
                              fill={col.dark}
                            />
                            <circle
                              cx={cx}
                              cy={cy}
                              r="29"
                              fill={col.stroke}
                            />
                            {/* Glossy sheen */}
                            <ellipse
                              cx={cx - 9}
                              cy={cy - 10}
                              rx="10"
                              ry="6.5"
                              transform={`rotate(-25 ${cx - 9} ${cy - 10})`}
                              fill="#FFFFFF"
                              opacity="0.65"
                            />
                          </g>
                        );
                      });
                    })}
                  </svg>
                </div>

                {/* Level Complete Overlay */}
                {won && (
                  <div className="absolute inset-0 z-30 rounded-[1.6rem] bg-[#FFFDF3]/96 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-bloom">
                    <div className="animate-cat-jump mb-1">
                      <CatIllustration type="cheering" className="w-26 h-26" />
                    </div>
                    <h3 className="font-storybook text-2xl sm:text-3xl font-bold text-[#2A3B4C] mb-1">
                      Puzzle {level.id} Connected!
                    </h3>
                    <p className="text-sm font-bold text-[#3A7CA5] mb-3">
                      100% board filled in {Math.max(moves, level.colorCount)} moves!
                    </p>
                    <div className="flex items-center gap-1.5 mb-5">
                      {[1, 2, 3].map((s) => {
                        const earned = hintsUsed === 0 ? 3 : hintsUsed === 1 ? 2 : 1;
                        return (
                          <Star
                            key={s}
                            className={`w-8 h-8 ${
                              earned >= s
                                ? 'text-[#E6B84A] fill-[#FFD95A]'
                                : 'text-[#D9F0FF]'
                            }`}
                          />
                        );
                      })}
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => startLevel(level.id)}
                        className="px-5 py-2.5 rounded-full bg-[#D9F0FF] hover:bg-[#A9DDF5] text-[#2A3B4C] font-storybook font-bold cursor-pointer"
                      >
                        Replay
                      </button>
                      {level.id < CONNECT_LEVELS.length ? (
                        <button
                          type="button"
                          onClick={() => startLevel(level.id + 1)}
                          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] text-[#2A3B4C] font-storybook font-bold border-2 border-[#E6B84A] shadow-md cursor-pointer"
                        >
                          <span>Next Puzzle</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startLevel(1)}
                          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] text-[#2A3B4C] font-storybook font-bold border-2 border-[#E6B84A] shadow-md cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>All 10 Mastered! Play Again</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Side Mascot & Quick Guide */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              <div className="rounded-3xl bg-white border-2 border-[#FFF3B0] p-5 text-center shadow-xs">
                <div className={`inline-block ${catJumping ? 'animate-cat-jump' : 'animate-float-slow'}`}>
                  <CatIllustration type={won ? 'cheering' : 'yarn'} className="w-26 h-26 mx-auto" />
                </div>
                <div className="mt-2 rounded-2xl bg-[#FFFDF3] border border-[#FFD95A]/70 px-3.5 py-2.5">
                  <p className="font-storybook text-sm font-bold text-[#2A3B4C]">{catCheer}</p>
                </div>
              </div>

              <div className="rounded-3xl bg-white border-2 border-[#A9DDF5] p-4 shadow-xs">
                <h3 className="font-storybook text-base font-bold text-[#2A3B4C] mb-2">
                  How to Play
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm font-semibold text-[#536A7E]">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FFD95A] mt-1.5 shrink-0" />
                    <span>Drag from any glowing dot to its matching twin.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#4CC2FF] mt-1.5 shrink-0" />
                    <span>Pipes cannot cross — crossing another pipe neatly trims it.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#5ED674] mt-1.5 shrink-0" />
                    <span>Cover <strong>100%</strong> of the board to complete each stage!</span>
                  </li>
                </ul>

                {/* Color pair status chips */}
                <div className="mt-4 pt-3 border-t border-dashed border-[#D9F0FF] flex flex-wrap gap-1.5">
                  {level.pairs.map((pair) => {
                    const col = CONNECT_COLORS[pair.color];
                    const done = isColorComplete(paths[pair.color], pair);
                    return (
                      <span
                        key={pair.color}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold border transition-all ${
                          done
                            ? 'bg-[#FFFDF3] border-[#E6B84A] text-[#2A3B4C]'
                            : 'bg-slate-50 border-slate-200 text-[#536A7E]'
                        }`}
                      >
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: col.stroke }}
                        />
                        <span>{col.label}</span>
                        {done && <CheckCircle2 className="w-3.5 h-3.5 text-[#3FA657]" />}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
