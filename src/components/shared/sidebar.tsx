import { Link, NavLink, useLocation } from "react-router-dom";
import { menuItems } from "data/sidebar-menu";
import { Button, Modal } from "react-daisyui";
import { FiLogOut } from "react-icons/fi";
import { ForwardRefRenderFunction, useCallback, useRef, useState } from "react";
import { forwardRef } from "react";
import imageLogo from "assets/images/logo.png";
import { useAppDispatch } from "store";
import { deleteTokenAuth } from "store/auth";

interface SidebarProps {
  active: boolean;
  toggleSidebar: () => void;
}

interface ModalLogoutProps {
  ref: React.DialogHTMLAttributes<HTMLDialogElement>;
  handleClose: () => void;
  handleLogout: () => void;
}

const menuStyles = {
  active:
    "transition-all duration-100 p-4 bg-white cursor-pointer rounded-l-full ml-2",
  inactive:
    "hover:bg-slate-100 hover:bg-opacity-20 transition-all duration-100 p-4 cursor-pointer ml-2 rounded-l-full text-white",
};

const LogoutModal: ForwardRefRenderFunction<
  HTMLDialogElement,
  ModalLogoutProps
> = ({ handleClose, handleLogout }, ref) => {
  return (
    <div className="font-sans">
      <Modal backdrop={true} ref={ref} className="bg-white">
        <Modal.Header className="font-bold">
          Are you sure want to log out?
        </Modal.Header>
        <Modal.Body>
          Press ESC key or click the button below to close
        </Modal.Body>
        <Modal.Actions>
          <Button onClick={handleLogout} className="text-white bg-red-500">
            Yes, sure
          </Button>
          <Button onClick={handleClose}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

const ForwardedRefLogoutModal = forwardRef(LogoutModal);

const Sidebar: React.FC<SidebarProps> = ({ active }): JSX.Element => {
  const [menus, setMenus] = useState(menuItems);

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
    <aside
      className={`z-[999] max-h-screen h-screen overflow-auto relative top-0 bg-san-juan transition-all ${
        active ? "left-0 w-[20%]" : "-left-[20%] w-[0%]"
      }`}
    >
      <div className="pl-4 pr-2">
        <div className="w-full flex-col flex justify-center items-center gap-2 py-4">
          <img src={imageLogo} width={80} />
        </div>
      </div>

      <div className="select-none mt-4 px-4 mb-20">
        <ul className="flex flex-col">
          {menus.map((item, index) => {
            return (
              <>
                <NavLink
                  key={index}
                  to={item.path}
                  className={({ isActive }) =>
                    isActive && item.path !== "#"
                      ? "bg-san-juan-700 rounded-xl"
                      : "rounded-xl"
                  }
                  onClick={() => {
                    if (item.child) {
                      setMenus((prev) => {
                        let temp = [...prev];
                        temp[index].expand =
                          temp[index].expand === undefined
                            ? true
                            : !temp[index].expand;
                        return temp;
                      });
                    }
                  }}
                >
                  <li className="hover:bg-spix hover:bg-opacity-20 transition-all duration-100 p-4 cursor-pointer ml-2 rounded-l-full text-white">
                    {item.name}
                  </li>
                </NavLink>
                {item.expand && (
                  <ul className="whitespace-nowrap list-disc pl-10">
                    {item.child &&
                      item.child.map((child, i) => (
                        <NavLink
                          key={i}
                          to={child.path}
                          className={({ isActive }) => {
                            return isActive
                              ? "bg-spix rounded-xl"
                              : "rounded-xl";
                          }}
                        >
                          <li className="hover:bg-spix hover:bg-opacity-20 transition-all duration-100 p-4 cursor-pointer ml-2 rounded-l-full text-white">
                            {child.name}
                          </li>
                        </NavLink>
                      ))}
                  </ul>
                )}
              </>
            );
          })}
          <div
            className={`${
              active ? "left-0 w-[20%] fixed" : "-left-[20%] w-[0%]"
            } bottom-5 px-4 left-0 transition-all`}
          >
            <Button
              onClick={handleShowDialog}
              className="w-full bg-red-500 hover:bg-red-400 border-0 text-white"
              shape="circle"
            >
              <FiLogOut size={20} />
              Log out
            </Button>
          </div>
        </ul>
      </div>

      <ForwardedRefLogoutModal
        ref={modalRef}
        handleLogout={handleLogout}
        handleClose={handleCloseDialog}
      />
    </aside>
  );
};

export default Sidebar;
