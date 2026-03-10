# 🕹️ Frontend Engineering Kata - Pokémon Explorer

Welcome to the **Pokémon Explorer**, a frontend engineering kata built with React and the powerful [PokeAPI](https://pokeapi.co/).

---

## 📸 Live Demo & Screenshots

**🔗 Live Link:** [https://incubyte-frontend-kata.vercel.app/](https://incubyte-frontend-kata.vercel.app/)

Screenshots:



---

## 🛠️ Setup Instructions

Follow these simple steps to run the project locally.

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd incubyte-frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm start
   ```
   > The application will open automatically at [http://localhost:3000](http://localhost:3000).

4. **Run the test suite (TDD workflow):**
   ```bash
   CI=true npm test
   ```

---

## 🏗️ Architectural Decisions

*   🧩 **Component-Based Architecture:** 
    The frontend is strictly divided into small, reusable components (`PokemonCard`, `FilterBar`, `DetailPanel`, `TypeBadge`, `StatBar`) to enhance maintainability and organizational clarity.
*   ⚡ **Data Fetching & State:** 
    Leveraging natural `useState` and `useEffect` hooks for data fetches. The app initiates a primary request for a list of 50 Pokémon and smoothly fires parallel data requests using `Promise.all`. This gathers detailed metadata without crippling sequential blockers.
*   🎨 **CSS Architecture:** 
    Extensive use of CSS custom properties (variables) to enable **dynamic theming** based on a Pokémon's primary type. Mapping CSS tokens directly to component states centrally avoids cluttering JSX with heavy inline styles.
*   🧪 **Test-Driven Focus:** 
    Core app flows are iteratively verified using Jest/React Testing Library setup. Tests like the ones found in `App.test.js` validate the user experience rather than implementation guts, maintaining green builds through refactors.

---

## ⚖️ Trade-offs Made

*   📡 **Fetching Strategy:** 
    Because PokeAPI forces detail stats onto individual sub-endpoints, filling a grid with numerous highly detailed Pokémon necessitates multiple web requests. 
    > *Trade-off:* While `Promise.all` easily handles 50 concurrent requests locally, scaling to thousands would throttle connection limits. GraphQL would normally consolidate requests nicely, but a standard REST setup was preferred to keep the raw dependency footprint and initial complexity low for this kata.
*   ⏳ **Loading Patterns vs. Progressive Rendering:** 
    The entire grid remains masked behind elegant Skeleton loader components until *all* initial 50 records resolve.
    > *Trade-off:* Displaying partial items early could theoretically reduce perceived wait times, but an atomic bulk paint prevents harsh flashes of unstyled frames and offers a cleaner unified UX entry.
*   📦 **State Management:** 
    A conscious decision was made to *avoid* robust overhead tools like Redux, Toolkit, or React Query.
    > *Trade-off:* This sacrifices immediate out-of-the-box caching, robust auto-retries, or polished optimistic states. However, the result is a beautifully simple architecture operating with just native React Context/State—making it exceptionally easy to read and scale up as true needs arise.

---

## 🤖 AI Usage Details

Transparent AI assistance was integrated systematically to move quickly while maintaining deep quality:

1.  **Scaffolding & Boilerplate:** Used AI tools to rapidly scaffold React file structures and spin up robust boilerplate CSS styling systems (like the responsive glass-morphism skeleton loaders).
2.  **Refactoring & Cleanup:** AI directly assisted with CSS separation routines—specifically lifting bulky inline JSX structures from files like `SkeletonCard.js` into modular `SkeletonCard.css` sheets.
3.  **API Integration:** Dynamic replacement of static, hardcoded mocks to live PokeAPI endpoints was executed by AI logic. It dynamically negotiated JSON structures—safely falling back down tree-paths if high-res artwork wasn't present.
4.  **Test Resilience:** When core UI text was overhauled (e.g., changing filler text to the actual "Pokémon Explorer" title), AI agents adapted the overarching suite configurations to keep the TDD cycle unbroken.
5.  **Documentation Drafting:** This very README outline was generated alongside an AI agent to ensure narrative flow, detailed covering of architectural mandates, and candidly tracking these very steps.
