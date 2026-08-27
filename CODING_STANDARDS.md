# Coding Standards — EDVANZ Learning Portal

This document outlines mandatory coding standards for developers and AI agents working on this project.

---

## 1. Naming & Folder Conventions
- **Component & Page Files**: Use `PascalCase.tsx` (e.g., `DashboardPage.tsx`, `CourseCard.tsx`, `AppSidebar.tsx`).
- **Hooks & Utility Files**: Use `camelCase.ts` or `kebab-case.ts` (e.g., `app-state.tsx`, `meta.ts`, `utils.ts`).
- **Data & Mock Files**: Use `camelCase.ts` in `src/data/` (e.g., `portal.ts`, `support.ts`).
- **Imports**: Always use `@/` path alias for absolute imports from `src/`.

---

## 2. TypeScript Conventions
- **Strict Configuration**: The project uses TypeScript 5.8.3 with `exactOptionalPropertyTypes: true` and `noPropertyAccessFromIndexSignature: true`.
- **Index Signatures**: Access index signatures using bracket notation (e.g., `errors["name"]` instead of `errors.name`).
- **Optional Props**: Declare optional properties with explicit undefined unions when necessary (e.g., `progress?: number | undefined`).
- **Type Exporting**: Define explicit types in `src/data/` files (e.g., `export type Course`, `export type Ticket`).

---

## 3. React Component Architecture
- **Named Functional Components**: Always export components as named functions (`export function CourseCard(...)`). Avoid anonymous default exports.
- **Single Responsibility**: Keep page components focused on layout assembly and state delegation. Separate UI primitives into `src/components/ui/`.
- **Prop Typing**: Pass destructured typed props to child components.

---

## 4. Hooks Conventions
- Custom hooks must start with `use` (e.g., `useAppState`, `useDocumentMeta`, `useSidebar`).
- `useAppState()` must only be called inside components wrapped by `<AppStateProvider />`.
- `useDocumentMeta(title, description)` must be placed at the top of every page component to automatically update document `<title>` and `<meta name="description">`.

---

## 5. Form Handling & Validation
- Use **React Hook Form** + **Zod** schema validation for input forms (see `NewTicketPage.tsx` or `ProfilePage.tsx`).
- Display inline error messages below invalid inputs using `errors["fieldName"]`.
- Show feedback toasts via `sonner` (`toast.success(...)`, `toast.error(...)`).

---

## 6. Error Handling & Verification
- **No Swallowing Errors**: Wrap storage operations or async tasks in try/catch blocks with log output or user feedback.
- **Empirical Typechecking**: Every feature change must be verified by running `npx tsc --noEmit` with zero errors before completion.
