/**
 * Scoring & Star Calculation for Color Pop with MM
 */

export function calculateMatchScore(matchedCount, frostCleared = 0, streak = 1) {
  if (matchedCount <= 0) return 0;
  // Base 30 points per bubble + escalating bonus for 4+ matches
  const base = matchedCount * 30;
  const bigMatchBonus =
    matchedCount >= 8
      ? (matchedCount - 3) * 45
      : matchedCount >= 5
      ? (matchedCount - 3) * 30
      : matchedCount === 4
      ? 25
      : 0;
  const frostBonus = frostCleared * 60;
  const streakMultiplier = 1 + Math.min(streak - 1, 5) * 0.12;
  return Math.round((base + bigMatchBonus + frostBonus) * streakMultiplier);
}

export function calculatePowerUpScore(clearedCount, frostCleared = 0) {
  return clearedCount * 40 + frostCleared * 70 + 60;
}

export function calculateRemainingMovesBonus(movesLeft) {
  return Math.max(0, movesLeft) * 35;
}

export function getStarRating(score, starThresholds) {
  if (!starThresholds || starThresholds.length < 3) return 1;
  if (score >= starThresholds[2]) return 3;
  if (score >= starThresholds[1]) return 2;
  if (score >= starThresholds[0]) return 1;
  return 0;
}

export function getCheerMessage(matchedCount) {
  if (matchedCount >= 9) return 'MEGA CHAMPAK POP!!';
  if (matchedCount >= 7) return 'SUNSHINE SUPERSTAR, MM!';
  if (matchedCount >= 5) return 'PAW-SOME COMBO!';
  if (matchedCount === 4) return 'SUNNY POP!';
  return 'NICE MATCH!';
}
