import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Pause,
  Play,
  RotateCcw,
  Star,
  Trophy,
  Sparkles,
  Bomb,
  Sun,
  Flower2,
  Lock,
  CheckCircle2,
  ChevronRight,
  Shuffle,
} from 'lucide-react';
import { COLOR_POP_LEVELS } from '../games/levels';
import {
  createBoard,
  findConnectedCluster,
  resolveClearAndRefill,
  getPowerUpTargets,
} from '../games/colorPopLogic';
import {
  calculateMatchScore,
  calculatePowerUpScore,
  calculateRemainingMovesBonus,
  getStarRating,
  getCheerMessage,
} from '../games/scoring';
import { BUBBLE_COLORS } from '../config/colors';
import { STORAGE_KEYS } from '../config/settings';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { CatIllustration } from '../assets/CatIllustrations';
import { ChafaFlower } from '../assets/ChafaFlowerSVG';
import { PawPrint } from '../assets/SceneDecorations';
import { CelebrationBurst } from '../animations/CelebrationBurst';
import { soundEngine } from '../utils/soundEngine';

const DEFAULT_PROGRESS = {
  bestScore: 0,
  unlockedLevel: 1,
  currentLevel: 1,
  completedLevels: {}, // { [levelId]: { bestScore, stars } }
};

function BubbleInnerIcon({ icon }) {
  switch (icon) {
    case 'sun':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-55" aria-hidden="true">
          <circle cx="12" cy="12" r="5" fill="#FFFFFF" />
        </svg>
      );
    case 'drop':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-55" aria-hidden="true">
          <path d="M12 4 C16 10, 18 13, 18 16 A6 6 0 0 1 6 16 C6 13, 8 10, 12 4 Z" fill="#FFFFFF" />
        </svg>
      );
    case 'leaf':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-55" aria-hidden="true">
          <path d="M6 18 C6 10, 12 6, 19 6 C19 13, 14 18, 6 18 Z" fill="#FFFFFF" />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-55" aria-hidden="true">
          <path d="M12 4 L14.4 9.5 L20 10.2 L15.8 14 L17 19.6 L12 16.8 L7 19.6 L8.2 14 L4 10.2 L9.6 9.5 Z" fill="#FFFFFF" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 sm:w-4 sm:h-4 opacity-55" aria-hidden="true">
          <circle cx="12" cy="14" r="4" fill="#FFFFFF" />
          <circle cx="8" cy="9" r="1.8" fill="#FFFFFF" />
          <circle cx="12" cy="7.5" r="1.8" fill="#FFFFFF" />
          <circle cx="16" cy="9" r="1.8" fill="#FFFFFF" />
        </svg>
      );
  }
}

export function ColorPopGame() {
  const [progress, setProgress] = useState(() => ({
    ...DEFAULT_PROGRESS,
    ...loadFromStorage(STORAGE_KEYS.COLOR_POP_PROGRESS, DEFAULT_PROGRESS),
  }));

  const currentLevelObj = useMemo(
    () => COLOR_POP_LEVELS.find((l) => l.id === progress.currentLevel) || COLOR_POP_LEVELS[0],
    [progress.currentLevel]
  );

  const [board, setBoard] = useState(() => createBoard(currentLevelObj));
  const [score, setScore] = useState(0);
  const [movesLeft, setMovesLeft] = useState(currentLevelObj.moves);
  const [streak, setStreak] = useState(0);
  const [powerUps, setPowerUps] = useState({ ...currentLevelObj.starterPowerUps });
  const [armedPowerUp, setArmedPowerUp] = useState(null); // 'pawBomb' | 'sunshineBlast' | 'chafaBloom' | null

  const [status, setStatus] = useState('playing'); // 'playing' | 'paused' | 'won' | 'lost'
  const [poppingKeys, setPoppingKeys] = useState(new Set());
  const [hoveredKeys, setHoveredKeys] = useState(new Set());
  const [floatingPopup, setFloatingPopup] = useState(null);
  const [cheerText, setCheerText] = useState('Tap 3 or more matching bubbles, MM!');
  const [catCheering, setCatCheering] = useState(false);
  const [shuffleNotice, setShuffleNotice] = useState(false);
  const [bloomOverlay, setBloomOverlay] = useState(false);
  const [celebrationKey, setCelebrationKey] = useState(0);
  const [showLevelPicker, setShowLevelPicker] = useState(false);
  const [isBusy, setIsBusy] = useState(false);

  // Persist progress whenever it updates
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.COLOR_POP_PROGRESS, progress);
  }, [progress]);

  const startLevel = useCallback((levelId) => {
    const lvl = COLOR_POP_LEVELS.find((l) => l.id === levelId) || COLOR_POP_LEVELS[0];
    setProgress((prev) => ({ ...prev, currentLevel: lvl.id }));
    setBoard(createBoard(lvl));
    setScore(0);
    setMovesLeft(lvl.moves);
    setStreak(0);
    setPowerUps({ ...lvl.starterPowerUps });
    setArmedPowerUp(null);
    setStatus('playing');
    setPoppingKeys(new Set());
    setHoveredKeys(new Set());
    setFloatingPopup(null);
    setCheerText(lvl.subtitle);
    setIsBusy(false);
    setShowLevelPicker(false);
    soundEngine.playSoftClick();
  }, []);

  const triggerWin = useCallback(
    (finalScore, remainingMoves) => {
      const moveBonus = calculateRemainingMovesBonus(remainingMoves);
      const totalScore = finalScore + moveBonus;
      const stars = getStarRating(totalScore, currentLevelObj.starThresholds);

      setScore(totalScore);
      setStatus('won');
      setCelebrationKey((k) => k + 1);
      setCheerText(`Level ${currentLevelObj.id} Cleared! Amazing job, MM!`);
      setCatCheering(true);
      soundEngine.playCelebration();

      setProgress((prev) => {
        const prevEntry = prev.completedLevels[currentLevelObj.id];
        const bestLevelScore = Math.max(prevEntry?.bestScore || 0, totalScore);
        const bestStars = Math.max(prevEntry?.stars || 0, stars);
        return {
          ...prev,
          bestScore: Math.max(prev.bestScore, totalScore),
          unlockedLevel: Math.min(
            COLOR_POP_LEVELS.length,
            Math.max(prev.unlockedLevel, currentLevelObj.id + 1)
          ),
          completedLevels: {
            ...prev.completedLevels,
            [currentLevelObj.id]: { bestScore: bestLevelScore, stars: bestStars },
          },
        };
      });
    },
    [currentLevelObj]
  );

  const handleCellHover = (r, c) => {
    if (status !== 'playing' || isBusy) {
      setHoveredKeys(new Set());
      return;
    }
    if (armedPowerUp) {
      const targets = getPowerUpTargets(board, armedPowerUp, r, c);
      setHoveredKeys(new Set(targets.map((t) => `${t.r},${t.c}`)));
      return;
    }
    const cluster = findConnectedCluster(board, r, c);
    if (cluster.length >= 3) {
      setHoveredKeys(new Set(cluster.map((t) => `${t.r},${t.c}`)));
    } else {
      setHoveredKeys(new Set());
    }
  };

  const handleCellClick = (r, c) => {
    if (status !== 'playing' || isBusy) return;

    const clickedCell = board[r]?.[c];
    if (!clickedCell || clickedCell.type === 'stone') return;

    // 1. Power-Up Execution
    if (armedPowerUp) {
      const targets = getPowerUpTargets(board, armedPowerUp, r, c);
      if (targets.length === 0) {
        setCheerText('Pick a bubble for that power-up, MM!');
        return;
      }

      const activeType = armedPowerUp;
      setIsBusy(true);
      setArmedPowerUp(null);
      setHoveredKeys(new Set());
      setPoppingKeys(new Set(targets.map((t) => `${t.r},${t.c}`)));
      setPowerUps((prev) => ({ ...prev, [activeType]: Math.max(0, prev[activeType] - 1) }));

      if (activeType === 'chafaBloom') {
        setBloomOverlay(true);
        setTimeout(() => setBloomOverlay(false), 750);
      }
      soundEngine.playPowerUp();

      setTimeout(() => {
        const { grid: nextGrid, frostCleared, didShuffle } = resolveClearAndRefill(
          board,
          targets,
          currentLevelObj.colorCount
        );
        const gained = calculatePowerUpScore(targets.length, frostCleared);
        const newScore = score + gained;

        setBoard(nextGrid);
        setScore(newScore);
        setPoppingKeys(new Set());
        setCatCheering(true);
        setTimeout(() => setCatCheering(false), 750);

        const label =
          activeType === 'pawBomb'
            ? 'PAW BOMB BOOM!'
            : activeType === 'sunshineBlast'
            ? 'SUNSHINE BLAST!'
            : 'CHAFA BLOOM!';
        setCheerText(`${label} +${gained} pts!`);
        setFloatingPopup({ id: Date.now(), text: `+${gained}`, sub: label });

        if (didShuffle) {
          setShuffleNotice(true);
          setTimeout(() => setShuffleNotice(false), 1800);
        }

        // Update best score live
        setProgress((prev) => ({
          ...prev,
          bestScore: Math.max(prev.bestScore, newScore),
        }));

        if (newScore >= currentLevelObj.targetScore) {
          triggerWin(newScore, movesLeft);
        }
        setIsBusy(false);
      }, 240);

      return;
    }

    // 2. Standard 3+ Color Match
    if (clickedCell.type !== 'bubble') {
      setCheerText('Pop matching bubbles next to misty clouds to free them!');
      return;
    }

    const cluster = findConnectedCluster(board, r, c);
    if (cluster.length < 3) {
      setCheerText('Need 3 or more connected bubbles of the same color!');
      soundEngine.playSoftClick();
      return;
    }

    setIsBusy(true);
    setHoveredKeys(new Set());
    setPoppingKeys(new Set(cluster.map((t) => `${t.r},${t.c}`)));

    const nextStreak = streak + 1;
    soundEngine.playPop(nextStreak);

    setTimeout(() => {
      const { grid: nextGrid, frostCleared, didShuffle } = resolveClearAndRefill(
        board,
        cluster,
        currentLevelObj.colorCount
      );
      const gained = calculateMatchScore(cluster.length, frostCleared, nextStreak);
      const newScore = score + gained;
      const nextMoves = movesLeft - 1;

      setBoard(nextGrid);
      setScore(newScore);
      setMovesLeft(nextMoves);
      setStreak(nextStreak);
      setPoppingKeys(new Set());

      // Earn a free bonus power-up on 6+ cluster!
      let bonusText = '';
      if (cluster.length >= 6) {
        const types = ['pawBomb', 'sunshineBlast', 'chafaBloom'];
        const chosen = types[Math.floor(Math.random() * types.length)];
        setPowerUps((prev) => ({ ...prev, [chosen]: prev[chosen] + 1 }));
        bonusText = ' +1 Bonus Power-Up!';
      }

      const cheer = getCheerMessage(cluster.length);
      setCheerText(`${cheer}${bonusText}`);
      setFloatingPopup({ id: Date.now(), text: `+${gained}`, sub: cluster.length >= 5 ? `${cluster.length}x Combo!` : '' });
      setCatCheering(true);
      setTimeout(() => setCatCheering(false), 700);

      if (didShuffle) {
        setShuffleNotice(true);
        setTimeout(() => setShuffleNotice(false), 1800);
      }

      setProgress((prev) => ({
        ...prev,
        bestScore: Math.max(prev.bestScore, newScore),
      }));

      if (newScore >= currentLevelObj.targetScore) {
        triggerWin(newScore, nextMoves);
      } else if (nextMoves <= 0) {
        setStatus('lost');
        setCheerText('So close, MM! Give it one more cheerful try!');
      }

      setIsBusy(false);
    }, 230);
  };

  const progressPct = Math.min(100, Math.round((score / currentLevelObj.targetScore) * 100));
  const earnedStars = getStarRating(score, currentLevelObj.starThresholds);
  const completedCount = Object.keys(progress.completedLevels).length;

  return (
    <section
      id="color-pop"
      className="relative py-16 sm:py-24 px-4 bg-gradient-to-b from-[#FFFDF3] via-[#D9F0FF]/55 to-[#FFF3B0]/45"
    >
      <div className="max-w-5xl mx-auto">
        {/* Title Banner */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="inline-block px-4 py-1 rounded-full bg-[#FFD95A] text-[#5C410A] text-xs font-extrabold uppercase tracking-wider mb-3">
            10 Playable Puzzle Levels
          </span>
          <h2 className="font-storybook text-3xl sm:text-4xl font-bold text-[#2A3B4C] mb-2">
            Color Pop with MM
          </h2>
          <p className="text-base text-[#536A7E] font-semibold">
            Match 3 or more connected bubbles of the same color, unleash power-ups, and cheer on with our studio cat!
          </p>
        </div>

        {/* Main Game Card */}
        <div className="relative bg-[#FFFDF3] rounded-[2.2rem] border-4 border-white shadow-xl p-4 sm:p-6 md:p-8 overflow-hidden">
          {/* Decorative background paw prints & Chafa corners */}
          <div className="pointer-events-none absolute -top-4 -left-4 opacity-40">
            <ChafaFlower size={74} withStem={false} sway={false} />
          </div>
          <div className="pointer-events-none absolute -bottom-3 -right-3 opacity-35">
            <PawPrint className="w-16 h-16" color="#A9DDF5" rotate={-20} />
          </div>

          <CelebrationBurst active={status === 'won'} burstKey={celebrationKey} />

          {/* Top HUD Row */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="rounded-2xl bg-white border-2 border-[#FFF3B0] px-3.5 py-2.5 text-center shadow-2xs">
              <span className="block text-[11px] font-extrabold uppercase tracking-wide text-[#536A7E]">
                Score
              </span>
              <span className="font-storybook text-xl sm:text-2xl font-bold text-[#2A3B4C]">
                {score}
              </span>
            </div>

            <div className="rounded-2xl bg-white border-2 border-[#A9DDF5] px-3.5 py-2.5 text-center shadow-2xs">
              <span className="block text-[11px] font-extrabold uppercase tracking-wide text-[#536A7E]">
                Best Score
              </span>
              <span className="font-storybook text-xl sm:text-2xl font-bold text-[#2F6F97] inline-flex items-center gap-1">
                <Trophy className="w-4 h-4 text-[#E6B84A]" />
                {progress.bestScore}
              </span>
            </div>

            <div className="rounded-2xl bg-white border-2 border-[#FFD95A] px-3.5 py-2.5 text-center shadow-2xs">
              <span className="block text-[11px] font-extrabold uppercase tracking-wide text-[#536A7E]">
                Level
              </span>
              <button
                type="button"
                onClick={() => setShowLevelPicker((v) => !v)}
                className="font-storybook text-xl sm:text-2xl font-bold text-[#2A3B4C] hover:text-[#3A7CA5] transition-colors cursor-pointer"
                aria-label="Open level selector"
              >
                {currentLevelObj.id} / 10 ▾
              </button>
            </div>

            <div
              className={`rounded-2xl border-2 px-3.5 py-2.5 text-center shadow-2xs transition-colors ${
                movesLeft <= 3 && status === 'playing'
                  ? 'bg-[#FFF3B0] border-[#E6B84A]'
                  : 'bg-white border-[#D9F0FF]'
              }`}
            >
              <span className="block text-[11px] font-extrabold uppercase tracking-wide text-[#536A7E]">
                Moves Left
              </span>
              <span className="font-storybook text-xl sm:text-2xl font-bold text-[#2A3B4C]">
                {movesLeft}
              </span>
            </div>
          </div>

          {/* Level Progress & Controls Bar */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/90 rounded-2xl border border-[#D9F0FF] px-4 py-3 mb-5">
            <div className="w-full sm:flex-1">
              <div className="flex items-center justify-between text-xs font-extrabold text-[#2A3B4C] mb-1">
                <span>
                  Lv.{currentLevelObj.id}: {currentLevelObj.name}
                </span>
                <span className="text-[#2F6F97]">
                  Goal: {score} / {currentLevelObj.targetScore}
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-[#D9F0FF]/70 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#A9DDF5] via-[#FFD95A] to-[#E6B84A] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowLevelPicker((v) => !v)}
                className="px-3 py-1.5 rounded-full bg-[#D9F0FF]/80 hover:bg-[#A9DDF5] text-[#2A3B4C] text-xs font-extrabold cursor-pointer transition-colors"
              >
                Levels ({completedCount}/10)
              </button>
              <button
                type="button"
                onClick={() => {
                  soundEngine.playSoftClick();
                  setStatus((s) => (s === 'paused' ? 'playing' : s === 'playing' ? 'paused' : s));
                }}
                disabled={status === 'won' || status === 'lost'}
                aria-label={status === 'paused' ? 'Resume game' : 'Pause game'}
                className="p-2 rounded-full bg-[#FFF3B0] hover:bg-[#FFD95A] text-[#2A3B4C] disabled:opacity-45 cursor-pointer transition-colors"
              >
                {status === 'paused' ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={() => startLevel(currentLevelObj.id)}
                aria-label="Restart current level"
                className="p-2 rounded-full bg-[#D9F0FF] hover:bg-[#A9DDF5] text-[#2A3B4C] cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Collapsible 10-Level Selector */}
          {showLevelPicker && (
            <div className="relative z-20 mb-5 rounded-3xl bg-white border-2 border-[#A9DDF5] p-4 shadow-md">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-storybook text-base font-bold text-[#2A3B4C]">
                  Choose a Level (10 Progressive Stages)
                </h3>
                <button
                  type="button"
                  onClick={() => setShowLevelPicker(false)}
                  className="text-xs font-bold text-[#3A7CA5] hover:underline cursor-pointer"
                >
                  Close
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {COLOR_POP_LEVELS.map((lvl) => {
                  const unlocked = lvl.id <= progress.unlockedLevel;
                  const record = progress.completedLevels[lvl.id];
                  const isCurrent = lvl.id === currentLevelObj.id;
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
                      <p className="text-[11px] font-bold text-[#536A7E] truncate">{lvl.name}</p>
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

          {/* Main Gameplay Split: Board + Side Mascot & Power-ups */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Game Board Area */}
            <div className="lg:col-span-8 flex flex-col items-center">
              <div className="relative w-full max-w-[440px] rounded-[1.8rem] p-3 sm:p-4 bg-gradient-to-br from-[#D9F0FF]/80 via-[#FFFDF3] to-[#FFF3B0]/70 border-2 border-[#A9DDF5] shadow-inner">
                {/* Chafa Bloom visual flash */}
                {bloomOverlay && (
                  <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center bg-[#FFF3B0]/45 rounded-[1.6rem] animate-bloom">
                    <ChafaFlower size={140} withStem={false} sway={false} />
                  </div>
                )}

                {/* Floating score popup */}
                {floatingPopup && (
                  <div
                    key={floatingPopup.id}
                    className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 z-30 text-center animate-score-up"
                  >
                    <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFD95A] text-[#2A3B4C] font-storybook text-xl font-extrabold border-2 border-white shadow-md">
                      {floatingPopup.text}
                    </span>
                    {floatingPopup.sub && (
                      <span className="block text-xs font-extrabold text-[#2F6F97] mt-0.5 drop-shadow-xs">
                        {floatingPopup.sub}
                      </span>
                    )}
                  </div>
                )}

                {/* Auto-shuffle notice */}
                {shuffleNotice && (
                  <div className="pointer-events-none absolute top-3 left-1/2 -translate-x-1/2 z-30 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2F6F97] text-white text-xs font-bold shadow-md">
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>No moves left — fresh shuffle!</span>
                  </div>
                )}

                {/* Bubble Grid */}
                <div
                  className="grid gap-1.5 sm:gap-2 touch-manipulation"
                  style={{
                    gridTemplateColumns: `repeat(${currentLevelObj.cols}, minmax(0, 1fr))`,
                  }}
                  onMouseLeave={() => setHoveredKeys(new Set())}
                  role="grid"
                  aria-label={`Color Pop game board, level ${currentLevelObj.id}`}
                >
                  {board.map((row, r) =>
                    row.map((cell, c) => {
                      const key = `${r},${c}`;
                      const isPopping = poppingKeys.has(key);
                      const isHovered = hoveredKeys.has(key);

                      if (cell.type === 'stone') {
                        return (
                          <div
                            key={cell.id}
                            aria-label="Garden stone obstacle"
                            className="aspect-square rounded-2xl bg-gradient-to-br from-[#C5D8E6] to-[#8EA8BC] border-2 border-[#7592A8] flex items-center justify-center shadow-inner select-none"
                          >
                            <PawPrint className="w-5 h-5 opacity-55" color="#FFFDF3" />
                          </div>
                        );
                      }

                      const colorDef = BUBBLE_COLORS[cell.color] || BUBBLE_COLORS.yellow;
                      const isFrost = cell.type === 'frost';

                      return (
                        <button
                          key={cell.id}
                          type="button"
                          onClick={() => handleCellClick(r, c)}
                          onMouseEnter={() => handleCellHover(r, c)}
                          aria-label={
                            isFrost
                              ? `Misty cloud locked ${colorDef.label} bubble at row ${r + 1}, column ${c + 1}`
                              : `${colorDef.label} bubble at row ${r + 1}, column ${c + 1}`
                          }
                          className={`relative aspect-square rounded-full flex items-center justify-center transition-transform duration-150 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2A3B4C] ${
                            isPopping
                              ? 'animate-bubble-pop'
                              : cell.isNew
                              ? 'animate-bubble-drop'
                              : ''
                          } ${isHovered ? 'scale-108 ring-3 ring-white shadow-md z-10' : 'hover:scale-105 active:scale-92'}`}
                          style={{
                            background: colorDef.bg,
                            border: `2px solid ${colorDef.border}`,
                            boxShadow: isHovered
                              ? `0 0 14px ${colorDef.glow}`
                              : 'inset 0 -3px 6px rgba(0,0,0,0.12), 0 2px 4px rgba(42,59,76,0.12)',
                          }}
                        >
                          {/* Glossy balloon highlight */}
                          <span
                            className="pointer-events-none absolute top-[14%] left-[18%] w-[28%] h-[20%] rounded-full bg-white/70 rotate-[-25deg]"
                            aria-hidden="true"
                          />
                          <BubbleInnerIcon icon={colorDef.icon} />

                          {/* Frost / Misty Cloud Lock Overlay */}
                          {isFrost && (
                            <span
                              className="pointer-events-none absolute inset-0 rounded-full bg-[#E8F6FF]/78 border-2 border-dashed border-[#5FA8D3] flex items-center justify-center"
                              title="Pop adjacent bubbles to clear this cloud!"
                            >
                              <span className="text-xs font-extrabold text-[#2F6F97]">☁</span>
                            </span>
                          )}
                        </button>
                      );
                    })
                  )}
                </div>

                {/* Pause Overlay */}
                {status === 'paused' && (
                  <div className="absolute inset-0 z-30 rounded-[1.7rem] bg-[#FFFDF3]/95 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center">
                    <CatIllustration type="sleeping" className="w-28 h-28 mb-2" />
                    <h3 className="font-storybook text-2xl font-bold text-[#2A3B4C] mb-1">
                      Little Cat Nap Break
                    </h3>
                    <p className="text-sm font-semibold text-[#536A7E] mb-5">
                      Game paused — jump right back in whenever you’re ready, MM!
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('playing')}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] text-[#2A3B4C] font-storybook font-bold border-2 border-[#E6B84A] shadow-md cursor-pointer"
                    >
                      <Play className="w-4 h-4" />
                      <span>Resume Playing</span>
                    </button>
                  </div>
                )}

                {/* Level Complete Overlay */}
                {status === 'won' && (
                  <div className="absolute inset-0 z-30 rounded-[1.7rem] bg-[#FFFDF3]/96 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-bloom">
                    <div className="animate-cat-jump mb-1">
                      <CatIllustration type="cheering" className="w-28 h-28" />
                    </div>
                    <h3 className="font-storybook text-2xl sm:text-3xl font-bold text-[#2A3B4C] mb-1">
                      Level {currentLevelObj.id} Complete!
                    </h3>
                    <p className="text-sm font-bold text-[#3A7CA5] mb-3">
                      Way to go, MM! Sunshine score earned:
                    </p>
                    <div className="flex items-center gap-1.5 mb-2">
                      {[1, 2, 3].map((s) => (
                        <Star
                          key={s}
                          className={`w-8 h-8 ${
                            earnedStars >= s
                              ? 'text-[#E6B84A] fill-[#FFD95A] drop-shadow-xs'
                              : 'text-[#D9F0FF]'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="font-storybook text-3xl font-extrabold text-[#2A3B4C] mb-5">
                      {score} pts
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => startLevel(currentLevelObj.id)}
                        className="px-5 py-2.5 rounded-full bg-[#D9F0FF] hover:bg-[#A9DDF5] text-[#2A3B4C] font-storybook font-bold cursor-pointer"
                      >
                        Replay
                      </button>
                      {currentLevelObj.id < COLOR_POP_LEVELS.length ? (
                        <button
                          type="button"
                          onClick={() => startLevel(currentLevelObj.id + 1)}
                          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] text-[#2A3B4C] font-storybook font-bold border-2 border-[#E6B84A] shadow-md cursor-pointer"
                        >
                          <span>Next Level</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startLevel(1)}
                          className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] text-[#2A3B4C] font-storybook font-bold border-2 border-[#E6B84A] shadow-md cursor-pointer"
                        >
                          <Sparkles className="w-4 h-4" />
                          <span>All 10 Cleared! Play Again</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Encouraging Retry Overlay */}
                {status === 'lost' && (
                  <div className="absolute inset-0 z-30 rounded-[1.7rem] bg-[#FFFDF3]/96 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center animate-bloom">
                    <CatIllustration type="waving" className="w-26 h-26 mb-2" />
                    <h3 className="font-storybook text-2xl font-bold text-[#2A3B4C] mb-1">
                      So Close, MM!
                    </h3>
                    <p className="text-sm font-semibold text-[#536A7E] max-w-xs mb-4">
                      You scored <strong className="text-[#2A3B4C]">{score}</strong> out of{' '}
                      <strong className="text-[#2F6F97]">{currentLevelObj.targetScore}</strong>!
                      Save power-ups for big clusters — you’ve totally got this!
                    </p>
                    <button
                      type="button"
                      onClick={() => startLevel(currentLevelObj.id)}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FFD95A] hover:bg-[#FFE37D] text-[#2A3B4C] font-storybook font-bold border-2 border-[#E6B84A] shadow-md cursor-pointer"
                    >
                      <RotateCcw className="w-4 h-4" />
                      <span>Try Level {currentLevelObj.id} Again</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Side Panel: Cheering Cat Mascot + 3 Power-Ups */}
            <div className="lg:col-span-4 flex flex-col gap-4">
              {/* Cheering Cat Box */}
              <div className="rounded-3xl bg-white border-2 border-[#FFF3B0] p-4 text-center shadow-xs">
                <div className={`inline-block ${catCheering ? 'animate-cat-jump' : 'animate-float-slow'}`}>
                  <CatIllustration type={catCheering ? 'cheering' : 'playful'} className="w-24 h-24 mx-auto" />
                </div>
                <div className="mt-2 rounded-2xl bg-[#FFFDF3] border border-[#FFD95A]/70 px-3 py-2">
                  <p className="font-storybook text-sm font-bold text-[#2A3B4C]">{cheerText}</p>
                </div>
              </div>

              {/* Power-Ups Panel */}
              <div className="rounded-3xl bg-white border-2 border-[#A9DDF5] p-4 shadow-xs">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-storybook text-base font-bold text-[#2A3B4C]">
                    Power-Ups
                  </h3>
                  {armedPowerUp && (
                    <button
                      type="button"
                      onClick={() => setArmedPowerUp(null)}
                      className="text-xs font-bold text-[#3A7CA5] hover:underline cursor-pointer"
                    >
                      Cancel
                    </button>
                  )}
                </div>

                <div className="space-y-2.5">
                  {[
                    {
                      id: 'pawBomb',
                      name: 'Paw Bomb',
                      desc: 'Clears a 3×3 area around any tile',
                      icon: Bomb,
                      badgeBg: 'bg-[#FFF3B0]',
                    },
                    {
                      id: 'sunshineBlast',
                      name: 'Sunshine Blast',
                      desc: 'Clears ALL bubbles of one color',
                      icon: Sun,
                      badgeBg: 'bg-[#FFD95A]',
                    },
                    {
                      id: 'chafaBloom',
                      name: 'Chafa Bloom',
                      desc: 'Flower-burst clears a big petal cross',
                      icon: Flower2,
                      badgeBg: 'bg-[#D9F0FF]',
                    },
                  ].map((pu) => {
                    const Icon = pu.icon;
                    const count = powerUps[pu.id] || 0;
                    const isArmed = armedPowerUp === pu.id;
                    return (
                      <button
                        key={pu.id}
                        type="button"
                        disabled={count <= 0 || status !== 'playing'}
                        onClick={() => {
                          soundEngine.playSoftClick();
                          setArmedPowerUp(isArmed ? null : pu.id);
                          setCheerText(
                            isArmed
                              ? 'Power-up put away!'
                              : `${pu.name} ready! Tap any bubble on the board!`
                          );
                        }}
                        className={`w-full flex items-center gap-3 p-2.5 rounded-2xl border-2 text-left transition-all ${
                          isArmed
                            ? 'bg-[#FFD95A]/40 border-[#E6B84A] shadow-sm scale-[1.02] cursor-pointer'
                            : count > 0 && status === 'playing'
                            ? 'bg-[#FFFDF3] border-[#D9F0FF] hover:border-[#A9DDF5] cursor-pointer'
                            : 'bg-slate-50 border-slate-200 opacity-55 cursor-not-allowed'
                        }`}
                      >
                        <span
                          className={`w-10 h-10 rounded-xl ${pu.badgeBg} flex items-center justify-center shrink-0 text-[#2A3B4C]`}
                        >
                          <Icon className="w-5 h-5" />
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-storybook text-sm font-bold text-[#2A3B4C]">
                              {pu.name}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-white border border-[#A9DDF5] text-xs font-extrabold text-[#2F6F97]">
                              ×{count}
                            </span>
                          </div>
                          <p className="text-[11px] font-semibold text-[#536A7E] leading-tight mt-0.5">
                            {pu.desc}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <p className="text-[11px] font-bold text-[#3A7CA5] mt-3 text-center">
                  Tip: Match 6+ bubbles at once to earn a free bonus power-up!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
