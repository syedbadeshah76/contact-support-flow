# UI/UX Guidelines — EDVANZ Learning Portal

This document outlines the visual design system, aesthetic principles, component guidelines, and responsive behavior for the EDVANZ Learning Portal.

---

## 1. Design System & Aesthetics
- **Visual Identity**: High-energy, gamified, clean educational portal for teens.
- **Card Aesthetics**: Rounded cards (`rounded-3xl`) with soft pastel gradients (`bg-[#ede9fe]/80 border-[#ddd6fe]`).
- **Brand Logo**: High-resolution `edvanz-logo.png` rendered inside an `overflow-hidden` container with `scale-[2.5]` CSS zoom to prevent canvas clipping or aspect ratio distortion.

---

## 2. Color Palette & Typography
- **Primary Brand Color**: Vibrant Blue (`#2563eb` / `bg-blue-600` / `text-blue-600`).
- **Soft Backgrounds**: Pastel Lavender (`#ede9fe`), Soft Blue (`#e0e7ff`), Soft Mint (`#dcfce7`), Soft Yellow (`#fef9c3`).
- **Typography**: Clean sans-serif system font stack with heavy font weights (`font-black`, `font-extrabold`, `font-bold`) for headings and action tags.

---

## 3. Core Component Layouts

### 3.1 Sidebar & Navigation Header
- **Sidebar**: White background (`bg-white`), collapsible icon mode (`collapsible="icon"`).
- **Logo Sizing**:
  - Expanded: `h-14 w-44 overflow-hidden relative`, containing logo with `scale-[2.5]`.
  - Collapsed: `size-9 overflow-hidden rounded-xl`, containing zoomed badge logo.

### 3.2 Top Bar
- Pill badges for streak (`🔥 17`), XP (`⚡ 4820`), notifications bell (with red unread indicator dot), and user avatar (`Emma`).
- Search input bar with search icon.

### 3.3 Course Cards
- **Header Thumbnail**: `h-44 overflow-hidden rounded-t-3xl` with top left Free/Premium badge and top right heart favorite button.
- **Card Body**: `p-6 border border-slate-200 border-t-0 rounded-b-3xl` with age category tag, title, instructor name, rating/learner metrics, progress bar, and "Resume" / "Enroll Now" pill button.

### 3.4 Modals & Dialogs
- `DialogContent` with `rounded-3xl`, back link button, header title, interactive body, and action buttons (`"Unlock Now"`, `"Save Changes"`).

---

## 4. Responsive Behavior
- **Desktop (1024px+)**: Expanded sidebar, multi-column grid layouts (3 columns for course cards and quizzes).
- **Tablet (768px - 1023px)**: Collapsed/icon sidebar mode, 2-column card grids.
- **Mobile (< 768px)**: Single column layouts, sheet sidebar navigation, scrollable filter chips.
