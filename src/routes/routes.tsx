import { Navigate, RouteObject } from "react-router-dom";
import Login from "pages/login";
import DashboardLayout from "layout/dashboard";
import PostPage, { postRouteName } from "pages/post/index.page";
import DetailPostPage, { detailPostRouteName } from "pages/post/detail.page";
import CreatePost, { createPostRouteName } from "pages/post/create.page";
import CreateComment, {
  createCommentRouteName,
} from "pages/comment/create.page";
import EventCalendarPage from "pages/event-calendar/index.pages";
import DetailEventPage, {
  detailEventRouteName,
} from "pages/event-calendar/detail.pages";
import UpdatePost, { editPostRouteName } from "pages/post/update.page";
import UserPage, { userRouteName } from "pages/user-management/index.pages";
import DetailUserPage, {
  detailUserRouteName,
} from "pages/user-management/detail.pages";
import ForumPage, { forumRouteName } from "pages/forum/index.page";
import DetailForumPage, { detailForumRouteName } from "pages/forum/detail.page";
import CreateForum, { createForumRouteName } from "pages/forum/create.page";
import UpdateForum, { updateForumRouteName } from "pages/forum/update.page";
import ReportPage, { reportPageRoutename } from "pages/report/index.page";

const protectedRoutes: RouteObject[] = [
  { path: "*", element: <Navigate to="/post" /> },
  {
    path: "",
    element: <DashboardLayout />,
    children: [
      { path: "not-found", element: <>Page Not Found</> },
      { path: postRouteName, element: <PostPage /> },
      { path: detailPostRouteName, element: <DetailPostPage /> },
      { path: createPostRouteName, element: <CreatePost /> },
      { path: editPostRouteName, element: <UpdatePost /> },
      { path: createCommentRouteName, element: <CreateComment /> },
      { path: "/event", element: <EventCalendarPage /> },
      { path: detailEventRouteName, element: <DetailEventPage /> },
      { path: userRouteName, element: <UserPage /> },
      { path: detailUserRouteName, element: <DetailUserPage /> },
      { path: forumRouteName, element: <ForumPage /> },
      { path: detailForumRouteName, element: <DetailForumPage /> },
      { path: createForumRouteName, element: <CreateForum /> },
      { path: updateForumRouteName, element: <UpdateForum /> },
      { path: reportPageRoutename, element: <ReportPage /> },
    ],
  },
];

const publicRoutes: RouteObject[] = [
  { path: "", element: <Login /> },
  { path: "404", element: <div>Not Found</div> },
  { path: "*", element: <Navigate to="/" /> },
];

export { publicRoutes, protectedRoutes };
