import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { AppSidebar } from "@/components/AppSidebar";
import { TopBar } from "@/components/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/sonner";
import { AppStateProvider } from "@/lib/app-state";
import { AchievementsPage } from "@/pages/AchievementsPage";
import { CertificatesPage } from "@/pages/CertificatesPage";
import { CourseDetailPage } from "@/pages/CourseDetailPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { ExplorePage } from "@/pages/ExplorePage";
import { LeaderboardPage } from "@/pages/LeaderboardPage";
import { LearningPathPage } from "@/pages/LearningPathPage";
import { LiveClassesPage } from "@/pages/LiveClassesPage";
import { MyLearningPage } from "@/pages/MyLearningPage";
import { NewTicketPage } from "@/pages/NewTicketPage";
import { ProfilePage } from "@/pages/ProfilePage";
import { QuizzesPage } from "@/pages/QuizzesPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { SubjectsPage } from "@/pages/SubjectsPage";
import { SupportChatPage } from "@/pages/SupportChatPage";
import { SupportHomePage } from "@/pages/SupportHomePage";
import { SupportLayout } from "@/pages/SupportLayout";
import { TicketListPage } from "@/pages/TicketListPage";
import { TicketThreadPage } from "@/pages/TicketThreadPage";

function AppShell() {
  return (
    <AppStateProvider>
      <SidebarProvider>
        <div className="flex min-h-screen w-full bg-background">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <TopBar />
            <main className="flex-1 px-4 py-6 sm:px-8">
              <Outlet />
            </main>
          </div>
        </div>
        <Toaster />
      </SidebarProvider>
    </AppStateProvider>
  );
}

export function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/my-learning" element={<MyLearningPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/subjects" element={<SubjectsPage />} />
          <Route path="/learning-path" element={<LearningPathPage />} />
          <Route path="/live-classes" element={<LiveClassesPage />} />
          <Route path="/quizzes" element={<QuizzesPage />} />
          <Route path="/achievements" element={<AchievementsPage />} />
          <Route path="/leaderboard" element={<LeaderboardPage />} />
          <Route path="/certificates" element={<CertificatesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/courses/:courseId" element={<CourseDetailPage />} />
          <Route path="/support" element={<SupportLayout />}>
            <Route index element={<SupportHomePage />} />
            <Route path="new" element={<NewTicketPage />} />
            <Route path="chat" element={<SupportChatPage />} />
            <Route path="tickets" element={<TicketListPage />} />
            <Route path="tickets/:ticketId" element={<TicketThreadPage />} />
          </Route>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
