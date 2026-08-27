# Technology Stack — EDVANZ Learning Portal

This document outlines the complete, verified technology stack used in the project.

---

## 1. Core Framework & Language
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `^19.2.0` | UI component library & view layer |
| **React DOM** | `^19.2.0` | DOM rendering package for React |
| **TypeScript** | `^5.8.3` | Type-safe programming language |
| **Vite** | `^8.2.0` | Lightning-fast build tool and dev server |

---

## 2. Routing & Navigation
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React Router DOM** | `^7.3.0` | Client-side SPA routing (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `useParams`, `useNavigate`) |

---

## 3. Styling & UI Components
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Tailwind CSS** | `^4.2.1` | Utility-first CSS framework (v4 engine with `@tailwindcss/vite`) |
| **Radix UI Primitives** | Various (`^1.x`–`^2.x`) | Accessible headless UI components (Dialog, Tabs, Switch, Slider, Progress, Sidebar, Accordion, Dropdown Menu, Tooltip) |
| **Lucide React** | `^0.575.0` | Modern vector icon set |
| **Class Variance Authority (cva)** | `^0.7.1` | Component variant styling composer |
| **clsx & tailwind-merge** | `^2.1.1` / `^3.5.0` | Classname concatenation & Tailwind merge utility (`cn`) |
| **Sonner** | `^2.0.7` | Toast notification system |

---

## 4. State Management & Form Validation
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React Context API** | Built-in | Global portal state (`AppStateProvider` + `useAppState`) |
| **LocalStorage** | Native Browser API | Client-side state persistence key `kidzy-app-state-v1` |
| **Zod** | `^3.24.2` | Schema validation library for forms |
| **React Hook Form** | `^7.71.2` | Performance-focused form management |
| **@hookform/resolvers** | `^5.2.2` | Integrates Zod schemas with React Hook Form |

---

## 5. Development Tools & Quality Assurance
| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **ESLint** | `^9.32.0` | Static code analysis and linting |
| **Prettier** | `^3.7.3` | Code formatting engine |
| **vite-tsconfig-paths** | `^6.0.2` | Resolves TypeScript `@/` path alias in Vite |
