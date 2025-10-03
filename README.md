# 🐴 Horse Racing Game (Vue 3 + Vite + Pinia + Tailwind)

This is a modular rewrite of the original single-file HTML demo into a modern Vue 3 project.

## Tech
- Vue 3 + Vite
- Pinia (state management)
- Tailwind CSS
- TypeScript

## Scripts
```bash
npm install
npm run dev
npm run build
npm run preview
```

## Notes
- Logic formerly in Vuex actions/mutations is rewritten as Pinia actions.
- UI is split into components: `HorseList`, `RaceSchedule`, `RaceTrack`, `RaceResults`.
- Types live in `src/types.d.ts`.
