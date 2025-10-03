import { defineStore } from "pinia";
import type { Horse, Round, RoundResult } from "../types";
import { selectRandomHorses } from "../utils/selectRandomHorses";

export const useRaceStore = defineStore("race", {
  state: () => ({
    horses: [] as Horse[],
    schedule: [] as Round[],
    currentRound: 0,
    isRacing: false,
    results: [] as RoundResult[],
    raceProgress: {} as Record<number, number>,
  }),

  getters: {
    currentRoundData(state): Round | null {
      return state.schedule[state.currentRound - 1] ?? null;
    },
  },

  actions: {
    generateHorses() {
      const colors = [
        "#FF6B6B", "#4ECDC4", "#45B7D1", "#FFA07A", "#98D8C8",
        "#F7DC6F", "#BB8FCE", "#85C1E2", "#F8B739", "#52B788",
        "#E63946", "#A8DADC", "#457B9D", "#F1FAEE", "#E09F3E",
        "#9D4EDD", "#06FFA5", "#FF006E", "#8338EC", "#3A86FF",
      ];
      this.horses = Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `${i + 1}. At`,
        color: colors[i],
        condition: Math.floor(Math.random() * 100) + 1,
      }));
    },

    generateSchedule() {
      const distances = [1200, 1400, 1600, 1800, 2000, 2200];
      this.schedule = distances.map((d, i) => ({
        round: i + 1,
        distance: d,
        horses: selectRandomHorses(this.horses, 10),
      }));
      this.results = [];
      this.currentRound = 0;
    },

    async startRace() {
      if (this.schedule.length === 0) return;
      this.isRacing = true;
      this.currentRound = 0;

      for (let i = 0; i < this.schedule.length; i++) {
        this.currentRound = i + 1;
        await this.runRound(this.schedule[i]);
      }

      this.isRacing = false;
      this.currentRound = 0;
    },

    async runRound(round: Round) {
      const horses = round.horses;
      this.raceProgress = Object.fromEntries(horses.map(h => [h.id, 0]));
      const raceDuration = 3000;
      const frameRate = 60;
      const totalFrames = (raceDuration / 1000) * frameRate;

      let frame = 0;
      await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
          frame++;
          for (const horse of horses) {
            const speed = (horse.condition / 100) * (0.8 + Math.random() * 0.4);
            const current = this.raceProgress[horse.id] ?? 0;
            const next = Math.min(100, current + (100 / totalFrames) * speed);
            this.raceProgress[horse.id] = next;
          }
          if (frame >= totalFrames) {
            clearInterval(interval);
            const finishOrder = horses.map(h => ({
              id: h.id,
              name: h.name,
              color: h.color,
              condition: h.condition,
              finalProgress: this.raceProgress[h.id],
            })).sort((a, b) => b.finalProgress - a.finalProgress);

            const positions = finishOrder.map((f, idx) => ({
              position: idx + 1,
              horse: f.name,
              color: f.color,
              condition: f.condition,
            }));

            this.results.push({
              round: round.round,
              distance: round.distance,
              positions,
            });

            setTimeout(() => resolve(), 1000);
          }
        }, 1000 / frameRate);
      });
    },

    reset() {
      this.horses = [];
      this.schedule = [];
      this.currentRound = 0;
      this.isRacing = false;
      this.results = [];
      this.raceProgress = {};
      this.generateHorses();
    },
  },
});
