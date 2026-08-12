import { Bell, Search, Flame, Sparkles, Coins } from "lucide-react";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { learner } from "@/data/portal";

function Pill({
  icon: Icon,
  value,
  tint,
}: {
  icon: typeof Flame;
  value: string;
  tint: string;
}) {
  return (
    <span
      className={`hidden items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-semibold sm:inline-flex ${tint}`}
    >
      <Icon className="size-4" />
      {value}
    </span>
  );
}

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/85 px-3 backdrop-blur-md sm:px-6">
      <SidebarTrigger className="rounded-xl" />

      <div className="relative w-full max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search courses, subjects, teachers…"
          className="h-10 rounded-full border-border bg-muted/60 pl-9"
          aria-label="Search courses"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Pill icon={Flame} value={`${learner.streak}`} tint="bg-primary-soft text-accent-foreground" />
        <Pill icon={Sparkles} value={`${learner.xp} XP`} tint="bg-sky/25 text-sky-foreground" />
        <Pill icon={Coins} value={`${learner.coins}`} tint="bg-sun/30 text-sun-foreground" />

        <button
          className="grid size-10 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
        </button>

        <span className="grid size-10 place-items-center rounded-full bg-hero-gradient text-lg shadow-pop">
          {learner.avatar}
        </span>
      </div>
    </header>
  );
}
