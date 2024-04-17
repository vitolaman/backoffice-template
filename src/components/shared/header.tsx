import { useCallback, useRef, useState } from "react";
import { Avatar, Menu } from "react-daisyui";
import { FiLogOut, FiMenu, FiSettings, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ForwardedRefLogoutModal } from "./sidebar";
import { deleteTokenAuth } from "store/auth";
import { useAppDispatch } from "store";

interface HeaderProps {
  toggleSidebar: () => void;
  className?: string;
}

interface HeaderMenuProps {
  handleClickLogout: () => void;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({handleClickLogout}): JSX.Element => {
  return (
    <Menu className="z-[999] fixed top-[60px] right-[20px] bg-white w-56">
      <Menu.Item>
        <Link
          to="#"
          className="flex items-center gap-2"
        >
          <FiSettings size={20} />
          <span className="font-bold">Settings</span>
        </Link>
      </Menu.Item>
      <Menu.Item>
        <div
          onClick={handleClickLogout}
          className="flex items-center gap-2"
        >
          <FiLogOut size={20} />
          <span className="font-bold">Logout</span>
        </div>
      </Menu.Item>
    </Menu>
  );
};

const Header: React.FC<HeaderProps> = ({
  toggleSidebar,
  className,
}): JSX.Element => {
  const [toolbarMenuVisible, setToolbarMenuVisible] = useState<boolean>(false);
  const toggleToolbarMenuVisible = () => setToolbarMenuVisible((prev) => !prev);
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleShowDialog = useCallback(() => {
    modalRef.current?.showModal();
  }, [modalRef]);

  const handleCloseDialog = useCallback(() => {
    modalRef.current?.close();
  }, [modalRef]);

  const handleLogout = () => {
    dispatch(deleteTokenAuth());
  };

  return (
    <>
      <nav
        className={`z-[998] select-none w-[80%] h-[60px] bg-white py-4 px-8 fixed right-0 top-0 flex justify-between items-center ${className}`}
      >
        <div
          onClick={toggleSidebar}
          className="cursor-pointer p-2 hover:bg-slate-500 hover:bg-opacity-50 transition-all duration-200 rounded-full"
        >
          <FiMenu
            color="black"
            size={20}
          />
        </div>
        <div
          onClick={toggleToolbarMenuVisible}
          className="flex items-center gap-2 cursor-pointer p-2"
        >
          <Avatar
            size="xs"
            shape="circle"
            src="https://avatars.githubusercontent.com/u/2?v=4"
          />
        </div>

        {toolbarMenuVisible && <HeaderMenu handleClickLogout={handleShowDialog} />}
      </nav>
      <ForwardedRefLogoutModal
        ref={modalRef}
        handleLogout={handleLogout}
        handleClose={handleCloseDialog}
      />
    </>
  );
};

export default Header;
