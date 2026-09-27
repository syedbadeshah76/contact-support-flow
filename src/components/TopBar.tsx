import { Bell, Search, Flame, Zap, Check, Trash2, Video, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { learner } from "@/data/portal";
import { useAppState } from "@/lib/app-state";

const initialNotifications = [
  { id: "n1", icon: Flame, text: "17-day streak - keep it going!", to: "/achievements" as const },
  { id: "n2", icon: Video, text: "Fractions Face-Off starts in 2h", to: "/live-classes" as const },
  { id: "n3", icon: MessageCircle, text: "Riya replied to your support ticket", to: "/support/tickets" as const },
];

export function TopBar() {
  const navigate = useNavigate();
  const {
    profile,
    readNotifications,
    dismissedNotifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
  } = useAppState();
  const [query, setQuery] = useState("");
  const notifications = initialNotifications.filter((n) => !dismissedNotifications.includes(n.id));
  const unread = notifications.filter((n) => !readNotifications.includes(n.id));

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().slice(0, 80);
    if (!q) {
      toast.error("Type something to search first");
      return;
    }
    navigate(`/explore?q=${encodeURIComponent(q)}&subject=All`);
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b border-slate-100 bg-white/95 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <SidebarTrigger className="rounded-xl text-slate-600 hover:bg-slate-100" />

        <form onSubmit={submitSearch} className="relative w-full" role="search">
          <Input
            value={query}
            maxLength={80}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Courses, Teachers, Subjects"
            className="h-10 rounded-full border-slate-200 bg-slate-50/80 pr-10 text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:bg-white"
            aria-label="Search courses"
          />
          <button type="submit" aria-label="Submit search" className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            <Search className="size-4" />
          </button>
        </form>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Streak Pill */}
        <Link
          to="/achievements"
          title="17 Day Streak"
          className="flex items-center gap-1.5 rounded-full bg-purple-100 px-3 py-1.5 text-xs font-bold text-purple-700 transition-transform hover:scale-105"
        >
          <Flame className="size-4 fill-purple-600 text-purple-600" />
          <span>{learner.streak}</span>
        </Link>

        {/* XP Pill */}
        <Link
          to="/leaderboard"
          title="4820 XP"
          className="flex items-center gap-1.5 rounded-full bg-sky-100 px-3 py-1.5 text-xs font-bold text-sky-700 transition-transform hover:scale-105"
        >
          <Zap className="size-4 fill-sky-500 text-sky-500" />
          <span>{learner.xp}</span>
        </Link>

        {/* Bell Notification Button */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="relative grid size-9 place-items-center rounded-full bg-mint/15 text-mint-foreground transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`Notifications (${unread.length} unread)`}
            >
              <Bell className="size-4" />
              {unread.length > 0 && (
                <span className="absolute right-1 top-1 size-2 rounded-full bg-destructive ring-2 ring-popover" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8} className="w-[min(22rem,calc(100vw-1rem))] rounded-lg border-border bg-popover p-2 text-popover-foreground shadow-lg">
            <DropdownMenuLabel className="flex items-center justify-between gap-2 px-2 py-2">
              <span className="text-sm font-bold">Notifications{unread.length > 0 ? ` (${unread.length})` : ""}</span>
              {notifications.length > 0 && (
                <div className="flex items-center gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    title="Mark all as read"
                    aria-label="Mark all as read"
                    className="size-8 p-0"
                    disabled={unread.length === 0}
                    onClick={() => {
                      markAllNotificationsRead(notifications.map((n) => n.id));
                      toast.success("All notifications marked as read");
                    }}
                  >
                    <Check className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    title="Clear all notifications"
                    aria-label="Clear all notifications"
                    className="size-8 p-0 text-muted-foreground hover:text-destructive"
                    onClick={() => {
                      clearNotifications(notifications.map((n) => n.id));
                      toast.success("Notifications cleared");
                    }}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              )}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.length === 0 && (
              <div className="flex flex-col items-center gap-2 px-4 py-8 text-center text-muted-foreground">
                <Bell className="size-5" />
                <p className="text-sm">You're all caught up</p>
              </div>
            )}
            {notifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                onSelect={() => {
                  markNotificationRead(n.id);
                  navigate(n.to);
                }}
                className="cursor-pointer gap-3 rounded-md px-3 py-3 focus:bg-accent"
              >
                <n.icon className="size-4 shrink-0 text-primary" aria-hidden="true" />
                <span className={`min-w-0 flex-1 text-sm ${readNotifications.includes(n.id) ? "text-muted-foreground" : "font-semibold"}`}>
                  {n.text}
                </span>
                {!readNotifications.includes(n.id) && <span className="size-2 shrink-0 rounded-full bg-primary" aria-label="Unread" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User Profile Pill */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-full bg-orange-100 py-1 pl-1 pr-3 text-xs font-bold text-orange-800 transition-transform hover:scale-105 focus-visible:outline-none"
              aria-label="Account menu"
            >
              <span className="grid size-7 place-items-center rounded-full bg-orange-200 text-sm">
                {profile.avatar}
              </span>
              <span>{profile.name}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-2xl">
            <DropdownMenuLabel>{profile.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="rounded-xl">
              <Link to="/profile">My Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl">
              <Link to="/my-learning">My Learning</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl">
              <Link to="/certificates">Certificates</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-xl">
              <Link to="/support">Help Centre</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="rounded-xl text-red-600"
              onSelect={() => toast.success("You've been signed out (demo)")}
            >
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
