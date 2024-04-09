import { Navigate, RouteObject } from "react-router-dom";
import Login from "pages/login";
import EventCalendarPage from "pages/event-calendar/index.pages";
import DashboardLayout from "layout/dashboard";

const protectedRoutes: RouteObject[] = [
  { path: "*", element: <Navigate to="/event" /> },
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      { path: "not-found", element: <>Page Not Found</> },
      { path: "/event", element: <EventCalendarPage /> },
    ],
  },
];

const publicRoutes: RouteObject[] = [
  { path: "", element: <Login /> },
  { path: "404", element: <div>Not Found</div> },
  { path: "*", element: <Navigate to="/" /> },
];

export { publicRoutes, protectedRoutes };
