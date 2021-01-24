import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => {

  return (
    <Route>
      {
        () => props.isLoggedIn ? <Component {...props} /> : <Redirect to={{
          pathname: '/',
          state: {
            redirected: true,
          }
        }} />
      }
    </Route>
  );
}

export default ProtectedRoute;