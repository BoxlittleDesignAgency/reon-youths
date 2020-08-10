import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { isAuthenticated } from '../../../pages/components/auth/helpers';
import CreateProfile from '../CreateProfile';
import EditProfile from '../EditProfile';
import TaskLanding from '../TaskLanding';
import Settings from '../Settings';
import Today from '../Today';
import Post from '../post/Post';
import Posts from '../posts/Posts';
import Distribute from '../Distribute';
import Books from '../Books';
import Sponsor from '../Sponsor';
import Meetings from '../Meetings';
import AddEducation from '../AddEducation';
import AddExperience from '../AddExperience';
import CurrentUserProfile from '../profile/CurrentUserProfile';

const actions = [
  {
    path: '/user/dashboard',
    name: 'Home',
    exact: true,
    main: () => <TaskLanding />
  },
  {
    path: '/user/dashboard/news/today',
    name: 'News Today',
    exact: true,
    main: () => <Today />
  },
  {
    path: '/posts',
    name: 'Posts',
    exact: true,
    main: () => <Posts />
  },
  {
    path: '/post/:id',
    name: 'Post',
    exact: true,
    main: () => <Post />
  },
  {
    path: '/user/dashboard/books',
    name: 'Books',
    exact: true,
    main: () => <Books />
  },
  {
    path: '/user/dashboard/distribute',
    name: 'Distribute Rhapsody',
    exact: true,
    main: () => <Distribute />
  },
  {
    path: '/user/dashboard/give',
    name: 'Give',
    exact: true,
    main: () => <Sponsor />
  },
  {
    path: '/user/dashboard/settings',
    name: 'settings',
    exact: true,
    main: () => <Settings />
  },
  {
    path: '/create/user/profile',
    name: 'Create Profile',
    exact: true,
    main: () => <CreateProfile />
  },
  {
    path: '/edit/user/profile',
    name: 'Edit Profile',
    exact: true,
    main: () => <EditProfile />
  },
  {
    path: '/add/user/experience',
    name: 'Add Experience',
    exact: true,
    main: () => <AddExperience />
  },
  {
    path: '/add/user/education',
    name: 'Add Education',
    exact: true,
    main: () => <AddEducation />
  },
  {
    path: '/profile/me',
    name: 'My Profile',
    exact: true,
    main: () => <CurrentUserProfile />
  }
];

const UserDashboard = () => {
  const { role } = isAuthenticated();

  return (
    <Fragment>
      <div className="header">
        {role === 'admin' ? 'Admin' : 'Registered User'} Main Dashboard
      </div>
      <div className="content-categories">
        <div className="label-wrapper">
          <Link to="/create/user/profile">
            <input
              className="nav-item"
              name="nav"
              type="radio"
              id="opt-1"
              defaultChecked
            />
            <label className="category" htmlFor="opt-1">
              Create Profile
            </label>
          </Link>
        </div>
        <div className="label-wrapper">
          <Link to="/edit/user/profile">
            <input className="nav-item" name="nav" type="radio" id="opt-4" />
            <label className="category" htmlFor="opt-4">
              Edit Profile
            </label>
          </Link>
        </div>
        <div className="label-wrapper">
          <Link to="/add/user/experience">
            <input className="nav-item" name="nav" type="radio" id="opt-2" />
            <label className="category" htmlFor="opt-2">
              Add Experience
            </label>
          </Link>
        </div>
        <div className="label-wrapper">
          <Link to="/add/user/education">
            <input className="nav-item" name="nav" type="radio" id="opt-3" />
            <label className="category" htmlFor="opt-3">
              Add Education
            </label>
          </Link>
        </div>
      </div>
      <div className="tasks-wrapper">
        <Switch>
          {actions.map((action, index) => (
            <Route
              key={index}
              path={action.path}
              exact={action.exact}
              children={<action.main />}
            />
          ))}
          <Route>
            <Redirect to="/user/dashboard" />
          </Route>
        </Switch>
      </div>
    </Fragment>
  );
};

export default UserDashboard;
