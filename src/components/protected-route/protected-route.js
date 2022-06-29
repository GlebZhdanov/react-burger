import React,{useEffect} from 'react';
import {Redirect,Route,useHistory,useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {main} from "../../redux/main/selectors";

const ProtectedRoute = ({onlUnyAuth ,...props}) => {
  const {authorizationSuccess} = useSelector(main);
  const location = useLocation();

  if (onlUnyAuth && authorizationSuccess) {
    return (
      <Redirect to={{
        pathname: '/'
      }}/>
    )
  }

  if(!onlUnyAuth && !authorizationSuccess) {
    return (
      <Redirect to={{
        pathname: '/login',
        state: {from: location}
      }}/>
    )
  }

  return <Route {...props}/>
};

export default ProtectedRoute;
