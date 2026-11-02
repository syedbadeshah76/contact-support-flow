# Achievements System — Backend Specification

> Audience: backend team. This document describes the achievement/XP system exactly as the
> frontend (`/achievements`) renders it today, so the API can be implemented to match 1:1.
> The frontend mirror of every rule below lives in `src/lib/achievements.ts` (pure functions,
> no UI) and `src/data/achievements.ts` (config data). The backend is the source of truth —
> the frontend module exists only so the UI can show progress instantly.

---

## 1. Concepts

| Concept | What it is | Where it lives |
|---|---|---|
| **XP event** | One append-only row per XP-earning action. Balances are always derived from this ledger, never stored as a mutable counter. | `xp_events` |
| **Level ladder** | Static config: cumulative XP required to reach each level. Editing the ladder never requires code changes. | `levels` |
| **Badge definition** | Catalog of badges, each with exactly one numeric unlock criterion and its rewards. | `badges` |
| **Badge unlock** | Recorded when a learner first meets a badge's criterion. Grants XP + coin rewards. | `user_badges` |
| **Learner stats** | The handful of counters badge criteria read. | `learner_stats` (or derived) |

**Unlock rule (the only rule):** a badge is earned the moment `current_stat >= criteria_target`.
Evaluate after every XP event / stat change; insert into `user_badges` on first meet (unique per
user + badge). Idempotent — re-evaluation never duplicates.

**Level rule:** `level = max(n) where xp_total >= levels[n].xp_required`.
`xpToNext = levels[level + 1].xp_required - xp_total`.

---

## 2. Tables

```sql
create table public.levels (
  level        int primary key,
  xp_required  int not null            -- cumulative XP to REACH this level
);

create table public.badges (
  code            text primary key,    -- e.g. 'streak-star'
  name            text not null,
  emoji           text not null,
  tier            text not null check (tier in ('Bronze','Silver','Gold')),
  description     text not null,
  criteria_type   text not null check (criteria_type in (
                    'xp_total','lessons_completed','courses_completed','quizzes_passed',
                    'quiz_best_score','streak_days','subjects_explored','live_classes_attended')),
  criteria_target int not null,
  xp_reward       int not null default 0,
  coins_reward    int not null default 0,
  sort_order      int not null default 0
);

create table public.user_badges (
  user_id      uuid not null,
  badge_code   text not null references public.badges(code),
  unlocked_at  timestamptz not null default now(),
  primary key (user_id, badge_code)
);

create table public.xp_events (
  id         bigint generated always as identity primary key,
  user_id    uuid not null,
  source     text not null,            -- see §4
  source_id  text,                     -- lesson/quiz/course id, nullable
  label      text not null,
  amount     int not null,             -- positive XP granted
  created_at timestamptz not null default now()
);

create table public.learner_stats (
  user_id               uuid primary key,
  lessons_completed     int not null default 0,
  courses_completed     int not null default 0,
  quizzes_passed        int not null default 0,   -- score >= 80
  quiz_best_score       int not null default 0,   -- best single quiz %
  subjects_explored     int not null default 0,   -- distinct subjects with activity
  live_classes_attended int not null default 0,
  streak_days           int not null default 0,
  updated_at            timestamptz not null default now()
);
```

### Seed data (mirrors the frontend exactly)

**`levels`** (cumulative XP to reach the level):

| Level | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 |
|---|---|---|---|---|---|---|---|---|---|----|----|----|----|----|----|----|----|----|----|----|
| XP | 0 | 200 | 450 | 750 | 1100 | 1500 | 1950 | 2450 | 3000 | 3600 | 4100 | 4600 | 6000 | 7500 | 9100 | 10800 | 12600 | 14500 | 16500 | 18600 |

Levels 1–12 are quick wins (~200–600 XP apart); from Level 13 gaps grow so late levels feel like
milestones. Values are editable config.

**`badges`** (8 rows — codes, criteria and rewards exactly as shown on screen):

| code | name | tier | criteria_type | target | xp | coins |
|---|---|---|---|---|---|---|
| streak-star | Streak Star 🔥 | Gold | streak_days | 14 | 200 | 50 |
| quiz-whiz | Quiz Whiz 🧠 | Gold | quizzes_passed | 2 | 250 | 60 |
| code-ninja | Code Ninja 🥷 | Silver | quiz_best_score | 100 | 150 | 40 |
| bookworm | Bookworm 📚 | Silver | lessons_completed | 150 | 150 | 40 |
| lab-legend | Lab Legend 🧪 | Bronze | courses_completed | 3 | 120 | 30 |
| art-icon | Art Icon 🎨 | Bronze | subjects_explored | 8 | 120 | 30 |
| polyglot | Polyglot 🌍 | Gold | live_classes_attended | 5 | 250 | 60 |
| bot-builder | Bot Builder 🤖 | Silver | xp_total | 5000 | 200 | 50 |

---

## 3. Endpoints

### `GET /api/v1/achievements`
One call returns everything the screen needs.

```json
{
  "xpTotal": 4820,
  "level": 12,
  "nextLevelXp": 6000,
  "xpIntoLevel": 220,
  "xpForLevel": 1400,
  "xpToNext": 1180,
  "streakDays": 17,
  "coins": 1340,
  "stats": {
    "lessonsCompleted": 184, "coursesCompleted": 1, "quizzesPassed": 2,
    "quizBestScore": 100, "subjectsExplored": 3, "liveClassesAttended": 2,
    "streakDays": 17, "xpTotal": 4820
  },
  "badges": [
    {
      "code": "streak-star", "name": "Streak Star", "emoji": "🔥", "tier": "Gold",
      "description": "Learn something every single day.",
      "criteria": { "type": "streak_days", "target": 14, "unit": "day login streak" },
      "xpReward": 200, "coinsReward": 50,
      "current": 17, "earned": true, "unlockedAt": "2026-10-12T00:00:00Z"
    },
    {
      "code": "bot-builder", "name": "Bot Builder", "emoji": "🤖", "tier": "Silver",
      "criteria": { "type": "xp_total", "target": 5000, "unit": "lifetime XP" },
      "current": 4820, "earned": false, "unlockedAt": null
    }
  ]
}
```

The frontend computes `percent = min(100, round(current / target * 100))` for display only.

### `GET /api/v1/achievements/xp-events?limit=20`
Ledger feed for the "Recent XP activity" card, newest first:
`[{ "id": 1, "source": "quiz_complete", "label": "Quiz: Python Syntax Check", "amount": 60, "createdAt": "..." }]`

### `POST /api/v1/xp-events` *(internal / service role only)*
Game services (quiz grader, lesson player, cron streak job) append events here. Never accept
amounts from the client. After inserting:

1. Upsert `learner_stats` counters for the event's source.
2. Recompute `xp_total = sum(xp_events.amount)`.
3. Evaluate all badge criteria; insert new `user_badges` rows.
4. For each new badge, append a `badge_unlock` XP event with `badges.xp_reward` and credit
   `coins_reward`. **Badge-reward events must not re-trigger badge evaluation** (no recursion).

### Level-up side effects
When `level` increases, emit a notification ("You reached Level 13!") and optionally a
`level_up` XP event of 0 amount, or handle rewards in the `levels` table (`coin_reward` column)
the same way as badge rewards.

---

## 4. XP sources & default amounts

| source | amount | notes |
|---|---|---|
| `lesson_complete` | 25 | per lesson |
| `quiz_complete` | 50 base | + `score % / 2` bonus (e.g. 92% → +46) |
| `daily_challenge` | varies | from the challenge definition (30–60) |
| `live_class_attended` | 40 | on join confirmation |
| `streak_bonus` | 30 | daily, from streak day 7 onward |
| `badge_unlock` | per `badges.xp_reward` | system-generated |
| `course_complete` | 100 | on certificate issue |

"A quiz counts as passed" = final score ≥ **80** (`QUIZ_PASS_SCORE` in `src/lib/achievements.ts`).

---

## 5. Frontend mapping

| Screen element | Data source |
|---|---|
| Level medallion, XP bar, "XP to Level N" | `GET /achievements` top-level fields |
| Streak / coins / badge-count pills | `streakDays`, `coins`, `badges[].earned` count |
| Badge cards + progress bars | `badges[]` (`current`, `target`, `earned`) |
| Badge dialog (rewards, unlock date) | `badges[]` rewards + `unlockedAt` |
| Recent XP activity | `GET /achievements/xp-events` |

While the API is pending, the screen renders the same shapes from
`src/data/achievements.ts` + `src/lib/achievements.ts`; switching to the API only replaces those
two modules' inputs, no UI changes.
