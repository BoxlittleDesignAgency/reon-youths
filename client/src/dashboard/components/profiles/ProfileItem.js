import React, { Fragment, useContext, useEffect } from 'react';

import { Link } from 'react-router-dom';

import { store } from '../../../dashboard/components/context/store';

import Log from '../../../pages/shared/Log.js';

const ProfileItem = ({ profile }) => {
  const {
    _id,
    status,
    location,
    handle,
    user: { name, email },
    skills
  } = profile;

  return (
    <div className="">
      <div className="task">
        <input
          className="task-item"
          name="task"
          type="checkbox"
          id={`item-${_id}`}
        />
        <label htmlFor={`item-${_id}`}>
          <span className="label-text">{name}</span>
        </label>

        <span className="label-text">
          {location && <span>{location}</span>}
        </span>
        <ul>
          {skills.slice(0, 1).map((skill, index) => (
            <li key={index} className="">
              <ion-icon name="checkmark-outline"></ion-icon>
              {skill}
            </li>
          ))}
        </ul>
        <Link to={`/profile/${_id}`}>
          <span className="tag progress">View</span>
        </Link>

        <span className="tag approved">Approved</span>
      </div>
    </div>
  );
};

export default ProfileItem;
