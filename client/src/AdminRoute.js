import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from './pages/components/auth/helpers';

const AdminRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() && isAuthenticated().role === 'admin' ? (
        <Layout className="container">
          <Component {...props} />
        </Layout>
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

export default AdminRoute;