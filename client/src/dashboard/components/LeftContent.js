import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import { isAuthenticated } from '../../pages/components/auth/helpers';
const adminRoutes = [
  {
    path: '/admin/dashboard',
    name: 'home',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="feather feather-inbox"
        viewBox="0 0 24 24"
      >
        <path d="M22 12h-6l-2 3h-4l-2-3H2" />
        <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
      </svg>
    ),
    exact: true,
    sidebar: <span>Home</span>
  },
  {
    path: '/admin/dashboard/news/today',
    name: 'today',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-star"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    exact: true,
    sidebar: <span>Today's News</span>
  },
  {
    path: '/posts',
    name: 'posts',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="feather feather-calendar"
        viewBox="0 0 24 24"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <path d="M16 2v4M8 2v4m-5 4h18" />
      </svg>
    ),
    exact: true,
    sidebar: <span>Posts</span>
  },
  {
    path: '/admin/dashboard/books',
    name: 'books',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-hash"
      >
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
      </svg>
    ),
    exact: true,
    sidebar: <span>Books</span>
  },
  {
    path: '/admin/dashboard/distribute',
    name: 'rhapsody',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-users"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    exact: true,
    sidebar: <span>Distribute Rhapsody</span>
  },
  {
    path: '/admin/dashboard/give',
    name: 'Give',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="feather feather-trash"
        viewBox="0 0 24 24"
      >
        <path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      </svg>
    ),
    exact: true,
    sidebar: <span>Give / Sponsor</span>
  }
];

const privateRoutes = [
  {
    path: '/user/dashboard',
    name: 'home',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-star"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    exact: true,
    sidebar: <span>Home</span>
  },
  {
    path: '/user/dashboard/news/today',
    name: 'news today',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-star"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
    exact: true,
    sidebar: <span>Today's News</span>
  },
  {
    path: '/posts',
    name: 'posts',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="feather feather-calendar"
        viewBox="0 0 24 24"
      >
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
        <path d="M16 2v4M8 2v4m-5 4h18" />
      </svg>
    ),
    exact: true,
    sidebar: <span>Posts</span>
  },
  {
    path: '/profile/me',
    name: 'My Profile',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-users"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    exact: true,
    sidebar: <span>My Profile</span>
  },
  {
    path: '/user/dashboard/books',
    name: 'books',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-hash"
      >
        <line x1="4" y1="9" x2="20" y2="9" />
        <line x1="4" y1="15" x2="20" y2="15" />
        <line x1="10" y1="3" x2="8" y2="21" />
        <line x1="16" y1="3" x2="14" y2="21" />
      </svg>
    ),
    exact: true,
    sidebar: <span>Books</span>
  },
  {
    path: '/user/dashboard/distribute',
    name: 'distribute',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-users"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    exact: true,
    sidebar: <span>Distribute Rhapsody</span>
  },
  {
    path: '/user/dashboard/give',
    name: 'Give',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-users"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    exact: true,
    sidebar: <span>Give / Sponsor</span>
  }
];

const bottomRoutes = [
  {
    path: '/profiles/all',
    name: 'profiles',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-users"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    exact: false,
    sidebar: <span>Profiles</span>
  },
  {
    path: '/admin/dashboard/vacation',
    name: 'vacation',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className="feather feather-sun"
        viewBox="0 0 24 24"
      >
        <circle cx="12" cy="12" r="5" />
        <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    exact: false,
    sidebar: <span>Vacation</span>
  },
  {
    path: '/admin/dashboard/manage',
    name: 'festival',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-trending-up"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    exact: false,
    sidebar: <span>Manage Site</span>
  },
  {
    path: '/user/dashboard/settings',
    name: 'settings',
    svg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="feather feather-zap"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    exact: false,
    sidebar: <span>Settings</span>
  }
];

const SidebarItem = (props) => <li className="item" {...props} />;

const SidebarLink = ({ path, svg, sidebar }) => (
  <Link to={`${path}`}>
    {svg}
    {sidebar}
  </Link>
);

const PrivateSidebarNav = (props) => (
  <Fragment>
    {privateRoutes.map((route, i) => (
      <SidebarItem key={i}>
        <SidebarLink {...route} />
      </SidebarItem>
    ))}
  </Fragment>
);

const AdminSidebarNav = (props) => (
  <Fragment>
    {adminRoutes.map((route, i) => (
      <SidebarItem key={i}>
        <SidebarLink {...route} />
      </SidebarItem>
    ))}
  </Fragment>
);

const SidebarNavBottom = () => (
  <Fragment>
    {bottomRoutes.map((route, i) => (
      <SidebarItemBottom key={i}>
        <SidebarLinkBottom {...route} />
      </SidebarItemBottom>
    ))}
  </Fragment>
);

const SidebarItemBottom = (props) => <li className="item" {...props} />;

const SidebarLinkBottom = ({ path, svg, sidebar }) => (
  <Link to={`${path}`}>
    {svg}
    {sidebar}
  </Link>
);

const LeftContent = () => (
  <Fragment>
    <div className="left-content">
      <ul className="action-list">
        {isAuthenticated() && isAuthenticated().role === 'admin' ? (
          <AdminSidebarNav />
        ) : (
          <PrivateSidebarNav />
        )}
      </ul>
      <ul className="category-list">
        {isAuthenticated() && isAuthenticated().role === 'admin' ? (
          <SidebarNavBottom />
        ) : (
          ''
        )}
      </ul>
    </div>
  </Fragment>
);

export default LeftContent;
