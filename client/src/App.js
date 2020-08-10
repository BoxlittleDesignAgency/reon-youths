import React, { Fragment, lazy, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import Posts from './dashboard/components/posts/Posts';
import Login from './pages/components/auth/Login';
import Register from './pages/components/auth/Register';

import MainLayout from './layout/MainLayout';
import DashboardLayout from './layout/DashboardLayout';

import UserDashboard from './dashboard/components/user-dashboard/UserDashboard';
import AdminDashboard from './dashboard/components/admin/AdminDashboard';

import AppRoute from './AppRoute';
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';

import ToggleMenu from './pages/shared/header/ToggleMenu';

import './App.scss';

const lazyImport = (filename) => lazy(() => import(`${filename}`));

const Landing = lazyImport('./pages/components/landing/Landing');

const About = lazy(() => import('./pages/components/about/About'));

const LiveStream = lazy(() =>
  import('./pages/components/live-stream/LiveStream')
);

const Contact = lazy(() => import('./pages/components/contact/Contact'));

const LoadingMessage = () => "I'm loading...";

const PageTest = () => {
  return (
    <div>
      <h3>Page Test!! wel done.</h3>
      <ToggleMenu />
    </div>
  );
};

const App = () => {
  return (
    <Fragment>
      <Router>
        <Suspense fallback={<LoadingMessage />}>
          <Switch>
            <AppRoute exact path="/" layout={MainLayout} component={Landing} />

            <AppRoute
              exact
              path="/about"
              layout={MainLayout}
              component={About}
            />
            <AppRoute exact path="/be-an-ambassador" />
            <AppRoute
              exact
              path="/live-stream"
              layout={MainLayout}
              component={LiveStream}
            />
            <AppRoute
              exact
              path="/contact"
              layout={MainLayout}
              component={Contact}
            />
            <AppRoute
              exact
              path="/login"
              layout={MainLayout}
              component={Login}
            />
            <AppRoute
              exact
              path="/register"
              layout={MainLayout}
              component={Register}
            />
            <AppRoute
              exact
              path="/navigation"
              layout={MainLayout}
              component={PageTest}
            />
            <Route exact path="/test">
              <PageTest />
            </Route>

            <PrivateRoute
              exact
              path="/user/dashboard"
              layout={DashboardLayout}
              component={UserDashboard}
            />

            <AdminRoute
              exact
              path="/admin/dashboard"
              layout={DashboardLayout}
              component={AdminDashboard}
            />

            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </Fragment>
  );
};

export default App;
