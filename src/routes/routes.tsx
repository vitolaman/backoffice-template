import { Navigate, RouteObject } from "react-router-dom";
import Login from "pages/login";
import EventCalendarPage from "pages/event-calendar/index.pages";
import DashboardLayout from "layout/dashboard";

const protectedRoutes: RouteObject[] = [
  { path: "*", element: <Navigate to="/not-found" /> },
];

const publicRoutes: RouteObject[] = [
  { path: "", element: <Login /> },
  { path: "404", element: <div>Not Found</div> },
  { path: "*", element: <Navigate to="/" /> },
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      { path: "/event-calendar", element: <EventCalendarPage /> },
    ],
  },
];

export { publicRoutes, protectedRoutes };
