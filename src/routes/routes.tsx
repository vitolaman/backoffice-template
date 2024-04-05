import { Navigate, RouteObject } from "react-router-dom";
import Login from "pages/login";
import DashboardLayout from "layout/dashboard";
import PostPage, { postRouteName } from "pages/post/index.page";
import DetailPostPage, { detailPostRouteName } from "pages/post/detail.page";
import CreatePost, { createPostRouteName } from "pages/post/create.page";
import CreateComment, {
  createCommentRouteName,
} from "pages/comment/create.page";

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
      { path: detailPostRouteName, element: <DetailPostPage /> },
      { path: createPostRouteName, element: <CreatePost /> },
      { path: createCommentRouteName, element: <CreateComment /> },
    ],
  },
  { path: "404", element: <div>Not Found</div> },
  { path: "*", element: <Navigate to="/" /> },
];

export { publicRoutes, protectedRoutes };
