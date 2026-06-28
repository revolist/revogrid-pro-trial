### Pro Trial Example Switcher

**Goal:** Turn the Vite pro trial into a compact examples browser for Tree, Pivot, Gantt, and Scheduler.

**Non-goals:** Do not add a framework, routing library, Tailwind, or a full shadcn install to this minimal TypeScript trial.

**Expected behavior:** A header switch at the top changes between examples without a page reload. Each example mounts a RevoGrid instance with trial plugins and local sample data. The source is decomposed so a first-time user can open one example file and understand that example without reading the full app. The Tree owner and status columns use the Pro dropdown column type and render the same user chip or badge styling in cells and dropdown options. Scheduler shows the Enterprise event scheduler in full-week view with bookings, working hours, availability blocks, conflict marking, and local callback updates.

**API/config/data model:** Uses the existing `@revolist/rv-pro-trial` and `@revolist/rv-enterprise-trial` exports. Shared RevoGrid defaults live in `src/shared/grid.ts`; each example owns its data/config in `src/examples/*`.

**Interactions/lifecycle:** Switching examples clears the previous mount container before rendering the next grid. Tree exposes expand/collapse actions. Pivot exposes row grouping. Gantt exposes a simplified toolbar and basic dependency timeline without smart blocking or advanced scheduling policies. Scheduler exposes local event scheduler callbacks without remote persistence. `src/main.ts` owns only shell rendering, hash routing, and cleanup.

**Rendering/performance notes:** The app shell uses shadcn-inspired CSS variables, bordered surfaces, compact buttons, and stable grid panel sizing.

**Edge cases:** Unknown URL hashes fall back to the Tree example. Gantt uses a small, basic project snapshot so the trial stays fast and readable. Scheduler keeps all mutations local and does not persist changes across tab switches or page reloads.

**Tests:**
- Unit: Not applicable; this is example composition around packaged plugin APIs.
- E2E: `npm run test:e2e` starts the Vite trial app, verifies the Tree owner/status dropdown menus, and checks the Pivot, Gantt, and Scheduler examples render through the header switch.
