import React, {FC} from 'react';
import {Redirect,Route,useLocation} from "react-router-dom";
import {getCookie} from "../../utils/cookies";

type TProtectedRoute = {
  onlUnyAuth: boolean,
  children: React.ReactNode,
  path: string,
}

const ProtectedRoute: FC<TProtectedRoute> = ({onlUnyAuth ,...children}) => {
  const location = useLocation();
  const accessToken = getCookie("accessToken");

  if (onlUnyAuth && accessToken) {
    return (
      <Redirect to={{
        pathname: '/'
      }}/>
    )
  }

  if(!onlUnyAuth && !accessToken) {
    return (
      <Redirect to={{
        pathname: '/login',
        state: {from: location.state}
      }}/>
    )
  }

  return <Route {...children}/>
};

export default ProtectedRoute;
