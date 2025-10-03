import type { Horse } from '../types';

export function selectRandomHorses(horses: Horse[], count: number): Horse[] {
  return [...horses].sort(() => Math.random() - 0.5).slice(0, count);
}
