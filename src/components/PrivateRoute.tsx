import React, { useContext } from 'react';
import { GlobalContext } from '@/context';
import { Route, Redirect, RouteProps } from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
  children: React.ReactChild;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (
  props: PrivateRouteProps
) => {
  const { children, ...rest } = props;
  const {
    state: { isAdmin }
  } = useContext(GlobalContext);

  return <Route {...rest}>{isAdmin ? children : <Redirect to="/" />}</Route>;
};

export default PrivateRoute;
