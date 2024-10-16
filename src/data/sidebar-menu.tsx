import { forumRouteName } from "pages/forum/index.page";
import { postRouteName } from "pages/post/index.page";
import { reportPageRoutename } from "pages/report/index.page";
import { userRouteName } from "pages/user-management/index.pages";

interface SubMenuItem {
  name: string;
  path: string;
}
interface MenuItem {
  name: string;
  path: string;
  child?: SubMenuItem[];
  expand?: boolean;
}

const menuItems: MenuItem[] = [
  {
    name: "Post",
    path: postRouteName,
  },
  {
    name: "Event Calendar",
    path: "/event",
  },
  {
    name: "Discussion Forum",
    path: forumRouteName,
  },
  {
    name: "User",
    path: userRouteName,
  },
  {
    name: "Report",
    path: reportPageRoutename,
  },
];

export { menuItems };
export type { MenuItem };
