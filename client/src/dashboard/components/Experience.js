import React, { Fragment, useContext } from 'react';


import Moment from 'react-moment';

import { store } from '../../dashboard/components/context/store';

import './table.css';

const Experience = ({ experience }) => {
  const { deleteExperience } = useContext(store);

  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td>{exp.title}</td>
      <td>
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{exp.to}</Moment>
        )}
      </td>
      <td>
        {/* <Link to="/add/user/experience" >
          <button className="t-btn t-btn1">update</button>
        </Link> */}
      </td>
      <td>
        <button
          className="t-btn t-btn2"
          onClick={() => deleteExperience(exp._id)}
        >
          delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2>Experience Credentials</h2>
      <div className="responsiveTb">
        <table className="exp-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Title</th>
              <th>Years</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>{experiences}</tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default Experience;
