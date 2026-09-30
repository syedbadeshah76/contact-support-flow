import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { dailyChallenges, learner, subjects } from "@/data/portal";

const STORAGE_KEY = "kidzy-app-state-v1";

type Persisted = {
  favourites: string[];
  enrolled: string[];
  doneChallenges: string[];
  interests: string[];
  profile: {
    name: string;
    avatar: string;
    bio: string;
    age: number;
    email: string;
    preferredSubjects: string[];
    securityAlerts: boolean;
  };
  quizScores: Record<string, number>;
  reminders: string[];
  readNotifications: string[];
  dismissedNotifications: string[];
};

const defaultState: Persisted = {
  favourites: [],
  enrolled: ["python-quest", "algebra-arcade", "story-lab"],
  doneChallenges: dailyChallenges.filter((c) => c.done).map((c) => c.task),
  interests: subjects.slice(0, 6).map((s) => s.name),
  profile: {
    name: learner.name,
    avatar: learner.avatar,
    bio: "Level 12 explorer. Python & art.",
    age: 14,
    email: "emma.watson@example.com",
    preferredSubjects: ["Math", "Coding", "Art"],
    securityAlerts: true,
  },
  quizScores: {},
  reminders: [],
  readNotifications: [],
  dismissedNotifications: [],
};

type AppStateValue = Persisted & {
  toggleFavourite: (id: string) => boolean;
  isFavourite: (id: string) => boolean;
  enroll: (id: string) => void;
  isEnrolled: (id: string) => boolean;
  toggleChallenge: (task: string) => boolean;
  isChallengeDone: (task: string) => boolean;
  toggleInterest: (name: string) => boolean;
  saveProfile: (p: Persisted["profile"]) => void;
  saveProfilePreferences: (p: Persisted["profile"], interests: string[]) => void;
  setQuizScore: (title: string, score: number) => void;
  toggleReminder: (topic: string) => boolean;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: (ids: string[]) => void;
  clearNotifications: (ids: string[]) => void;
};

const AppStateContext = createContext<AppStateValue | null>(null);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Persisted>(defaultState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState((s) => ({ ...s, ...(JSON.parse(raw) as Partial<Persisted>) }));
    } catch {
      /* ignore corrupt storage */
    }
  }, []);

  const persist = useCallback((next: Persisted) => {
    setState(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }, []);

  const value = useMemo<AppStateValue>(() => {
    const toggleList = (list: string[], item: string) =>
      list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

    return {
      ...state,
      isFavourite: (id) => state.favourites.includes(id),
      toggleFavourite: (id) => {
        const next = toggleList(state.favourites, id);
        persist({ ...state, favourites: next });
        return next.includes(id);
      },
      isEnrolled: (id) => state.enrolled.includes(id),
      enroll: (id) => {
        if (state.enrolled.includes(id)) return;
        persist({ ...state, enrolled: [...state.enrolled, id] });
      },
      isChallengeDone: (task) => state.doneChallenges.includes(task),
      toggleChallenge: (task) => {
        const next = toggleList(state.doneChallenges, task);
        persist({ ...state, doneChallenges: next });
        return next.includes(task);
      },
      toggleInterest: (name) => {
        const next = toggleList(state.interests, name);
        persist({ ...state, interests: next });
        return next.includes(name);
      },
      saveProfile: (profile) => persist({ ...state, profile }),
      saveProfilePreferences: (profile, interests) => persist({ ...state, profile, interests }),
      setQuizScore: (title, score) =>
        persist({
          ...state,
          quizScores: {
            ...state.quizScores,
            [title]: Math.max(score, state.quizScores[title] ?? 0),
          },
        }),
      toggleReminder: (topic) => {
        const next = toggleList(state.reminders, topic);
        persist({ ...state, reminders: next });
        return next.includes(topic);
      },
      markNotificationRead: (id) => {
        if (state.readNotifications.includes(id)) return;
        persist({ ...state, readNotifications: [...state.readNotifications, id] });
      },
      markAllNotificationsRead: (ids) =>
        persist({ ...state, readNotifications: [...new Set([...state.readNotifications, ...ids])] }),
      clearNotifications: (ids) =>
        persist({ ...state, dismissedNotifications: [...new Set([...state.dismissedNotifications, ...ids])] }),
    };
  }, [state, persist]);

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useAppState must be used inside AppStateProvider");
  return ctx;
}
