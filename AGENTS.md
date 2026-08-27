<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

# AI Coding Agent Instructions — EDVANZ Learning Portal

This document serves as the primary operational guideline for AI coding agents working on the EDVANZ Learning Portal codebase.

---

## 1. Primary Directives & Codebase Understanding
- **Inspect Before Modifying**: Never guess component structure, state hooks, or route locations. Always inspect authoritative files (`src/App.tsx`, `src/lib/app-state.tsx`, `src/data/portal.ts`, `src/components/AppSidebar.tsx`) before making edits.
- **Preserve Existing Architecture**: The project uses **Vite + React 19 + React Router v7 (BrowserRouter) + TailwindCSS v4 + Radix UI + Lucide React**. TanStack Router has been completely removed. Do NOT re-introduce TanStack packages or file-based routing.
- **Git History Integrity**: Never force push (`git push -f`), rebase, or squash commits on pushed branches due to Lovable synchronization requirements.

---

## 2. Mandatory Pre-Implementation Inspection Checklist
Before starting any feature or fix, inspect:
1. `src/App.tsx`: Route definitions and layout structure (`AppShell`).
2. `src/lib/app-state.tsx`: Global reactive context, local storage keys (`kidzy-app-state-v1`), and provider methods.
3. `src/data/portal.ts` & `src/data/support.ts`: Data types and mock data arrays.
4. `src/components/AppSidebar.tsx` & `src/components/TopBar.tsx`: Shell layouts and navigation paths.
5. Target page/component file in `src/pages/` or `src/components/`.

---

## 3. Coding & Component Conventions
- **Functional Components**: All React components must be functional components exported as named exports (e.g., `export function DashboardPage()`).
- **Path Aliases**: Always use `@/` path alias for imports (`@/components/...`, `@/pages/...`, `@/lib/...`, `@/assets/...`).
- **Lucide Icons**: Import icons directly from `lucide-react`. Use `size-4` / `size-5` sizing classes.
- **Strict Optional Properties**: TypeScript is configured with `exactOptionalPropertyTypes: true` and `noPropertyAccessFromIndexSignature: true`. Use explicit `| undefined` or bracket indexing (`errors["name"]`) when accessing index signatures.

---

## 4. UI/UX & Design Guidelines
- **Brand Consistency**: Brand name is **EDVANZ** ("Beyond Learning.").
- **Color Palette**: Primary action buttons use vibrant blue (`bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold`). Card backgrounds for subjects/quizzes/live classes use soft pastel lavender gradients (`bg-[#ede9fe]/80 border-[#ddd6fe] rounded-3xl`).
- **Assets**: Use pristine assets stored in `src/assets/`. When displaying `edvanz-logo.png` in the sidebar, wrap in a container with `overflow-hidden` and CSS scale zoom (`scale-[2.5]`) to prevent image aspect ratio distortion.

---

## 5. State & Persistence Conventions
- All persistent client state (enrolled courses, favorites, completed daily challenges, quiz scores, profile info) must be managed through `useAppState()` in `src/lib/app-state.tsx`.
- LocalStorage updates must be handled via `persist()` inside `AppStateProvider` using `kidzy-app-state-v1`.

---

## 6. Rules Against Unnecessary Changes & Dependencies
- **No Unnecessary Refactoring**: Do not rearchitect working pages or components unless requested by the user.
- **No Unnecessary Dependencies**: Use existing Radix UI primitives, Lucide React, and Tailwind CSS. Do not install additional UI libraries without explicit request.

---

## 7. Mandatory Task Completion Verification
Before declaring any task finished:
1. Run `npx tsc --noEmit` and ensure **0 errors**.
2. Verify all affected paths/routes render without errors.
3. Update `walkthrough.md` with a summary of changes and verification results.
