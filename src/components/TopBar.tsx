import { Bell, Search, Flame, Sparkles, Coins, Check } from "lucide-react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

function Pill({
  icon: Icon,
  value,
  tint,
  label,
  to,
}: {
  icon: typeof Flame;
  value: string;
  tint: string;
  label: string;
  to: "/achievements" | "/leaderboard" | "/profile";
}) {
  return (
    <Link
      to={to}
      aria-label={label}
      title={label}
      className={`hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold transition-transform hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none sm:inline-flex ${tint}`}
    >
      <Icon className="size-4" />
      {value}
    </Link>
  );
}

const initialNotifications = [
  { id: "n1", emoji: "🔥", text: "17-day streak — keep it going!", to: "/achievements" as const },
  { id: "n2", emoji: "🎥", text: "Fractions Face-Off starts in 2h", to: "/live-classes" as const },
  { id: "n3", emoji: "🎫", text: "Riya replied to your support ticket", to: "/support/tickets" as const },
];

export function TopBar() {
  const navigate = useNavigate();
  const { profile } = useAppState();
  const [query, setQuery] = useState("");
  const [unread, setUnread] = useState(initialNotifications.map((n) => n.id));

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim().slice(0, 80);
    if (!q) {
      toast.error("Type something to search first");
      return;
    }
    navigate({ to: "/explore", search: { q, subject: "All" } });
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-3 backdrop-blur-md sm:px-6">
      <SidebarTrigger className="rounded-xl" />

      <form onSubmit={submitSearch} className="relative w-full max-w-sm" role="search">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          maxLength={80}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search courses, subjects, teachers…"
          className="h-10 rounded-full border-border bg-muted/60 pl-9"
          aria-label="Search courses"
        />
        <button type="submit" className="sr-only">
          Search
        </button>
      </form>

      <div className="ml-auto flex items-center gap-2">
        <Pill
          icon={Flame}
          value={`${learner.streak}`}
          tint="bg-primary-soft text-accent-foreground"
          label="Streak — view achievements"
          to="/achievements"
        />
        <Pill
          icon={Sparkles}
          value={`${learner.xp} XP`}
          tint="bg-sky/25 text-sky-foreground"
          label="XP — view leaderboard"
          to="/leaderboard"
        />
        <Pill
          icon={Coins}
          value={`${learner.coins}`}
          tint="bg-sun/30 text-sun-foreground"
          label="Coins — view profile"
          to="/profile"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="relative grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-label={`Notifications (${unread.length} unread)`}
            >
              <Bell className="size-5" />
              {unread.length > 0 && (
                <span className="absolute right-1.5 top-1.5 grid size-4 place-items-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {unread.length}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel className="flex items-center justify-between gap-2">
              Notifications
              <Button
                variant="ghost"
                size="sm"
                className="h-7 rounded-full text-xs font-bold"
                disabled={unread.length === 0}
                onClick={() => {
                  setUnread([]);
                  toast.success("All notifications marked as read");
                }}
              >
                <Check className="size-3" /> Mark all read
              </Button>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {initialNotifications.map((n) => (
              <DropdownMenuItem
                key={n.id}
                onSelect={() => {
                  setUnread((u) => u.filter((id) => id !== n.id));
                  navigate({ to: n.to });
                }}
                className="cursor-pointer gap-2"
              >
                <span>{n.emoji}</span>
                <span className={unread.includes(n.id) ? "font-semibold" : "text-muted-foreground"}>
                  {n.text}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="grid size-10 place-items-center rounded-full bg-hero-gradient text-lg shadow-pop transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              aria-label="Account menu"
            >
              {profile.avatar}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>{profile.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">My profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/my-learning">My learning</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/certificates">Certificates</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/support">Help centre</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={() => toast.success("You've been signed out (demo)")}>
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
