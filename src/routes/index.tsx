import moment from "moment";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "store";
import "react-toastify/dist/ReactToastify.css";
import { protectedRoutes, publicRoutes } from "./routes";
import { useNavigate, useRoutes } from "react-router-dom";
import { deleteTokenAuth } from "store/auth";

const AppRoutes = () => {
  const { accessToken, expiresAt } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loggingOut = () => {
    dispatch(deleteTokenAuth());
  };

  // useEffect(() => {
  //   if (expiresAt && accessToken) {
  //     const now = moment();
  //     const exp = moment(expiresAt);
  //     console.log(now, exp);
  //     if (exp.isBefore(now)) {
  //       loggingOut();
  //     }
  //   } else {
  //     loggingOut();
  //   }
  // }, [expiresAt, accessToken]);

  const permittedRoutes = accessToken ? protectedRoutes : publicRoutes;
  const element = useRoutes(permittedRoutes);

  return <div>{element}</div>;
};

export default AppRoutes;
