---
name: Intensivo Olímpico de Cibersegurança app
description: Frontend-only React/Vite CTF course app at artifacts/cibersec. Key decisions and gotchas.
---

## Architecture
- Frontend-only: no backend calls, no useGetX hooks, all content is static data
- Routing: wouter with `base={import.meta.env.BASE_URL.replace(/\/$/, "")}`
- Auth: sessionStorage.getItem('admin_auth') === 'true'. Password: '123456'
- Progress: localStorage key `progress_day_${day}` (slide index as string)
- Always dark: `document.documentElement.classList.add("dark")` in App.tsx useEffect

## Key files
- src/data/courseData.ts — all slides + labs (Slide, Lab interfaces)
- src/data/adminData.ts — teacher notes + lab solutions (ONLY used in /admin routes)
- src/components/TerminalBlock.tsx — black bg, green text, copy button
- src/components/CountdownTimer.tsx — MM:SS with Web Audio beep on expiry
- src/components/LabCard.tsx — HTB machine card with optional timer
- src/pages/Home.tsx — day selection landing page
- src/pages/DayView.tsx — slide navigator with keyboard nav (←/→)
- src/pages/Search.tsx — search across all slide content
- src/pages/admin/AdminLogin.tsx, AdminDashboard.tsx, AdminDayView.tsx

## Why
- adminData.ts is NEVER imported outside /admin routes — student pages must not expose teacher content
- CountdownTimer uses Web Audio API not HTML5 audio — no file dependency needed
- Design subagent only scaffolded theme; all pages were built by main agent
