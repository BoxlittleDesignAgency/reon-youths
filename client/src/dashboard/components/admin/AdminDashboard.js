import React, { Fragment, useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Link,
  Redirect,
  Route,
  Switch,
  withRouter
} from 'react-router-dom';
import { isAuthenticated } from '../../../pages/components/auth/helpers';

import CurrentUserProfile from '../profile/CurrentUserProfile';
import CreateProfile from '../CreateProfile';
import EditProfile from '../EditProfile';
import TaskLanding from '../TaskLanding';
import Settings from '../Settings';
import Today from '../Today';
import Post from '../../components/post/Post';
import Posts from '../../components/posts/Posts';
import Pages from '../Pages';
import Sponsor from '../Sponsor';
import Books from '../Books';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Vacation from '../Vacation';
import ManageSite from './ManageSite';
import Distribute from '../Distribute';
import AddExperience from '../AddExperience';
import AddEducation from '../AddEducation';

import { GET_PROFILE, PROFILE_ERROR } from '../actions/types';

import { store } from '../context/store';
import { getCurrentProfile } from '../actions/profile';
import profileReducer from '../reducers/profile';
import Log from '../../../pages/shared/Log';

const actions = [
  {
    path: '/admin/dashboard',
    name: 'Home',
    exact: true,
    main: () => <TaskLanding />
  },
  {
    path: '/admin/dashboard/news/today',
    name: 'News Today',
    exact: false,
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
    path: '/admin/dashboard/pages',
    name: 'Pages',
    exact: true,
    main: () => <Pages />
  },
  {
    path: '/admin/dashboard/distribute',
    name: 'Distribute Rhapsody',
    exact: true,
    main: () => <Distribute />
  },
  {
    path: '/admin/dashboard/give',
    name: 'Give',
    exact: true,
    main: () => <Sponsor />
  },
  {
    path: '/admin/dashboard/books',
    name: 'Books',
    exact: true,
    main: () => <Books />
  },
  {
    path: '/profiles/all',
    name: 'Profiles',
    exact: true,
    main: () => <Profiles />
  },
  {
    path: '/admin/dashboard/vacation',
    name: 'Vacation',
    exact: true,
    main: () => <Vacation />
  },
  {
    path: '/admin/dashboard/manage',
    name: 'Manage Site',
    exact: true,
    main: () => <ManageSite />
  },
  {
    path: '/user/dashboard/settings',
    name: 'Settings',
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
  },
  {
    path: '/profile/:id',
    name: 'Get Profile By Id',
    exact: true,
    main: () => <Profile />
  }
];

const AdminDashboard = () => {
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
          {/* <Route>
            <Redirect to="/admin/dashboard" />
          </Route> */}
        </Switch>
      </div>
    </Fragment>
  );
};

export default AdminDashboard;
