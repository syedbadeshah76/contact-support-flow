import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  BookOpenCheck,
  Compass,
  Shapes,
  Route as RouteIcon,
  Video,
  Brain,
  Trophy,
  Medal,
  ScrollText,
  UserRound,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const learnItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "My Learning", url: "/my-learning", icon: BookOpenCheck },
  { title: "Explore Courses", url: "/explore", icon: Compass },
  { title: "Subjects", url: "/subjects", icon: Shapes },
  { title: "Learning Path", url: "/learning-path", icon: RouteIcon },
  { title: "Live Classes", url: "/live-classes", icon: Video },
];

const playItems = [
  { title: "Quizzes", url: "/quizzes", icon: Brain },
  { title: "Achievements", url: "/achievements", icon: Trophy },
  { title: "Leaderboard", url: "/leaderboard", icon: Medal },
  { title: "Certificates", url: "/certificates", icon: ScrollText },
  { title: "Profile", url: "/profile", icon: UserRound },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const currentPath = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (path: string) => currentPath === path;

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="px-3 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-hero-gradient text-lg shadow-pop">
            🚀
          </span>
          {!collapsed && (
            <span className="font-display text-xl font-extrabold tracking-tight">
              Kidzy
            </span>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-1">
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Learn</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {learnItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                    className="rounded-xl"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="size-4.5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Play & progress</SidebarGroupLabel>}
          <SidebarGroupContent>
            <SidebarMenu>
              {playItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.url)}
                    tooltip={item.title}
                    className="rounded-xl"
                  >
                    <Link to={item.url} className="flex items-center gap-3">
                      <item.icon className="size-4.5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
