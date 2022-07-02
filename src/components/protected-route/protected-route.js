import React,{useEffect} from 'react';
import {Redirect,Route,useHistory,useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {main} from "../../redux/main/selectors";
import {getCookie} from "../../utils/cookies";

const ProtectedRoute = ({onlUnyAuth ,...props}) => {
  const {authorizationSuccess, name, isToken} = useSelector(main);
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

  return <Route {...props}/>
};

export default ProtectedRoute;
