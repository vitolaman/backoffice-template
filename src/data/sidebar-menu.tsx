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
    name: "Event Calendar",
    path: "/event",
  },
];

export { menuItems };
export type { MenuItem };
