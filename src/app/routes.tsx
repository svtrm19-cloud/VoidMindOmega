import { createBrowserRouter } from "react-router";
import { VoidLayout } from "./layouts/VoidLayout";
import { VoidDashboard } from "./pages/VoidDashboard";
import { VoidIA } from "./pages/VoidIA";
import { VoidJournal } from "./pages/VoidJournal";
import { VoidStats } from "./pages/VoidStats";
import { VoidProfile } from "./pages/VoidProfile";
import { VoidMode } from "./pages/VoidMode";
import { MissionsPage } from "./pages/MissionsPage";
import { HistoryPage } from "./pages/HistoryPage";
import { SettingsPage } from "./pages/SettingsPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: VoidLayout,
    children: [
      { index: true, Component: VoidDashboard },
      { path: "ai", Component: VoidIA },
      { path: "missions", Component: MissionsPage },
      { path: "journal", Component: VoidJournal },
      { path: "history", Component: HistoryPage },
      { path: "stats", Component: VoidStats },
      { path: "profile", Component: VoidProfile },
      { path: "settings", Component: SettingsPage },
      { path: "void", Component: VoidMode },
    ],
  },
]);
