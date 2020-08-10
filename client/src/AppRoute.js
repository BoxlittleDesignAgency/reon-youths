import React from 'react';

import { Route } from 'react-router-dom';

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
  <Route
    {...rest}
    render={(matchProps) => (
      <Layout className="container">
        <Component {...matchProps} />
      </Layout>
    )}
  />
);

export default AppRoute;
