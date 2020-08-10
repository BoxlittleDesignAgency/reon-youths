import React, { Fragment } from 'react';

import Log from '../../../pages/shared/Log';

const ProfileTop = ({
  profile: {
    status,
    user,
    location,
    city,
    country
  }
}) => (
  <Fragment>
    <div className="neu-card__name">{user.name}</div>
    <div className="neu-card__txt">
      {status}{' '}
      {location && (
        <strong>
          from {location}</strong>  
      )}
    </div>
    <div className="neu-card-loc">
      <ion-icon
        name="location-outline"
        className="neu-card-loc__icon"
      ></ion-icon>
      <span className="neu-card-loc__txt">
        {city}, {country}
      </span>
    </div>
    {/* <Log value={user} /> */}
  </Fragment>
);

export default ProfileTop;
