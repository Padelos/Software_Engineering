import { Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {Navigate, Outlet} from 'react-router-dom';
import ForbiddenPage from "../views/fobriddenPage";

const AdminRoute = ({ children, ...rest }) => {
  let { user } = useContext(AuthContext);
  
  return user.is_superuser ? <Outlet /> : <ForbiddenPage />
  
};
//
export default AdminRoute;