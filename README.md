## Do You Want to Become a Millionaire?

This is a quiz-style web game inspired by "Who Wants to Be a Millionaire?".
You answer a sequence of increasingly difficult questions to climb the virtual money ladder and see how much you can "win".

The implementation is built with **Next.js (App Router)**, **TypeScript**, **CSS Modules**, and **JSON-driven configuration**.

---

### Live demo

The app is deployed on Vercel:

- **Production URL**: `https://become-a-millionaire-test.vercel.app/`

Replace the placeholder above with your actual deployment link.

---

### Features

- **Linear quiz flow**: one question at a time with a fixed number of quiz levels.
- **Configurable questions and rewards** via JSON files.
- **Multiple correct answers** are supported (some questions require selecting several options).
- **Game ladder** showing your current level and potential rewards.
- **Result summary page** with the final virtual reward and a "Try again" action.
- **Navigation guards** to prevent skipping directly to game/summary routes.
- **Responsive layout** from mobile (iPhone 8) to large desktop screens.

---

### Tech stack

- **Framework**: Next.js `app/` router
- **Language**: TypeScript
- **Styling**: CSS Modules + global root styles
- **State**: lightweight React context store (`StoreProvider`) + custom hooks
- **Linting**: ESLint with `eslint-config-next` (core web vitals + TypeScript)
- **Testing**: Jest + React Testing Library (for pure helpers and UI state logic)

---

### Project structure (high level)

- `app/`
  - `page.tsx` – home route, renders `views/HomePage`.
  - `game/page.tsx` – game route, loads game data and renders `views/GamesPage`.
  - `summary/page.tsx` – final summary route, renders `views/SummaryPage`.
- `views/`
  - `HomePage/` – landing screen and "Start" CTA.
  - `GamesPage/` – main game UI, question + options + ladder.
  - `SummaryPage/` – final result screen and "Try again" button.
- `app/game/helpers.ts` – pure functions to prepare game data from JSON configs.
- `app/game/helpers.spec.ts` – unit tests for game data helpers.
- `configs/`
  - `game-config.json` – quiz levels, reward amounts, and complexity ranges.
  - `questions.json` – questions, answer options, and correctness flags.
- `shared/types/game.ts` – shared TypeScript types for game config and questions.
- `shared/context/StoreProvider/` – small global store for reward and game-in-progress state.
- `shared/hooks/useAppStore.ts` – convenience hook to access the store.

---

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

Node.js 18+ is recommended (Next.js App Router requirement).

---

### Running the app locally

Start the development server:

```bash
npm run dev
```

Then open `http://localhost:3000` in your browser.

---

### Linting

Run ESLint over the project:

```bash
npm run lint
```

The configuration is based on `eslint-config-next` with TypeScript and core web vitals enabled.

---

### Tests

Run the test suite:

```bash
npm test
```

This uses Jest to test:

- Game configuration helpers (`app/game/helpers.ts`).
- Option visual state logic (`views/GamesPage/utils/getOptionState.ts`).

---

### Game configuration

All game rules and content are driven by JSON:

- `configs/game-config.json`
  - Defines the **quiz ladder**: each quiz level has:
    - `reward` – prize amount for that level.
    - `complexityRange` – `{ min, max }` complexity range used to pick questions for this level.
- `configs/questions.json`
  - Contains an array of `questions`:
    - `id` – numeric identifier.
    - `text` – question text.
    - `complexity` – numeric complexity score used for matching against quiz levels.
    - `options` – array of answer options:
      - `id` – option label (e.g. `"A"`, `"B"`).
      - `text` – answer text.
      - `isCorrect` – boolean flag; **multiple options can be correct**.

The game engine:

- Groups questions into ranges based on `complexityRange`.
- Randomly picks one question per quiz level without repeating IDs.
- Enforces that the user must select all correct options to fully answer a question correctly.

To change the game, you can:

- Adjust rewards and ranges in `configs/game-config.json`.
- Add, remove, or edit questions and their options in `configs/questions.json`.

---

### Implementation notes

- The main game logic is encapsulated in:
  - `app/game/helpers.ts` – preparing rewards and question groups.
  - `views/GamesPage/useGameEngine.ts` – UI-focused game engine (current question, answer evaluation, navigation).
- Global state (`userReward`, `gameInProgress`) is handled via a minimal React context in `shared/context/StoreProvider`.
- The UI uses CSS Modules for component-scoped styles and is built mobile-first, with enhancements for larger screens via media queries.
