import React, { ReactNode } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ToastProps {
    children: ReactNode;
}

const Toast: React.FC<ToastProps> = ({ children }) => {
  return (
    <>
      <ToastContainer />
      {children}
    </>
  );
};

export const useToast = () => {
  return {
    success: (message: string) => toast.success(message),
    error: (message: string) => toast.error(message),
    warning: (message: string) => toast.warning(message),
  };
};

export default Toast;
