import { Navigate, RouteObject } from "react-router-dom";
import Login from "pages/login";
import DashboardLayout from "layout/dashboard";
import PostPage, { postRouteName } from "pages/post/index.page";

const protectedRoutes: RouteObject[] = [
  { path: "*", element: <Navigate to="/not-found" /> },
];

const publicRoutes: RouteObject[] = [
  { path: "", element: <Login /> },
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      { path: "not-found", element: <>Page Not Found</> },
      { path: postRouteName, element: <PostPage /> },
    ],
  },
  { path: "404", element: <div>Not Found</div> },
  { path: "*", element: <Navigate to="/" /> },
];

export { publicRoutes, protectedRoutes };
