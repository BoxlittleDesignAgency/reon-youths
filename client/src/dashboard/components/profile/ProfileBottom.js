import React, { Fragment, useContext } from 'react';

import { store } from '../../../dashboard/components/context/store';

import { Link, withRouter } from 'react-router-dom';

import { isAuthenticated } from '../../../pages/components/auth/helpers';

const ProfileBottom = ({
  profile: {
    user: { name },
    bio,
    skills,
    social
  }
}) => {
  const { loading } = useContext(store);

  return (
    <Fragment>
      {bio && (
        <Fragment>
          <div className="neu-card-bio">
            <h4 className="light-bold">{name.trim().split(' ')[0]}s Bio</h4>
            <p className="">{bio}</p>
          </div>
        </Fragment>
      )}
      <div className="line"></div>
      <div className="neu-card-skills">
        <span>Skill Set</span>
        {skills.map((skill, index) => (
          <div key={index}>
            <ion-icon name="checkmark"></ion-icon>
            <span>{skill}</span>
          </div>
        ))}
      </div>
      <div className="neu-card-inf">
        <div className="neu-card-inf__item">
          <div className="neu-card-inf__title">1598</div>
          <div className="neu-card-inf__txt">Followers</div>
        </div>
        <div className="neu-card-inf__item">
          <div className="neu-card-inf__title">65</div>
          <div className="neu-card-inf__txt">Following</div>
        </div>
      </div>
      <div className="neu-card-social">
        {social && social.youtube && (
          <a
            href={social.youtube}
            target="_blank"
            className="neu circle"
            rel="noopener noreferrer"
          >
            <ion-icon name="logo-youtube"></ion-icon>
          </a>
        )}
        {social && social.facebook && (
          <a
            href={social.facebook}
            target="_blank"
            className="neu circle"
            rel="noopener noreferrer"
          >
            <ion-icon name="logo-facebook"></ion-icon>
          </a>
        )}
        {social && social.linkedin && (
          <a
            href={social.linkedin}
            target="_blank"
            className="neu circle"
            rel="noopener noreferrer"
          >
            <ion-icon name="logo-linkedin"></ion-icon>
          </a>
        )}
        {social && social.kingschat && (
          <a
            href={social.kingschat}
            target="_blank"
            className="neu circle"
            rel="noopener noreferrer"
          >
            <ion-icon name="home"></ion-icon>
          </a>
        )}
      </div>
      <div className="neu-card-ctr">
        <div className="flex-ctrl">
          <Link
            to="/profiles/all"
            className="dash-btn dash-btn__secondary dash-btn--pill"
          >
            <p>Back To Profiles</p>
          </Link>
          {isAuthenticated() &&
            loading === false &&
            isAuthenticated().role === 'admin' && (
              <Link
                to="/edit/user/profile"
                className="dash-btn  dash-btn__secondary dash-btn--pill btn-color-3"
              >
                <p>Edit</p>
              </Link>
            )}
        </div>
        <div className="flex-ctrl">
          <Link
            to="!#"
            className="dash-btn  dash-btn__secondary dash-btn--pill btn-color-4"
          >
            <p>Delete</p>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default ProfileBottom;
