import { postRouteName } from "pages/post/index.page";

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
    name: "Home",
    path: "/home",
  },
  {
    name: "Post",
    path: postRouteName,
  },
];

export { menuItems };
export type { MenuItem };
