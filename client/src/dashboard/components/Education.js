import React, { Fragment, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';

import { store } from '../../dashboard/components/context/store';
import Moment from 'react-moment';

import './table.css';

const Education = ({ education, history }) => {

  const { deleteEducation } = useContext(store);

  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td>{edu.degree}</td>
      <td>
        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          ' Now'
        ) : (
          <Moment format="YYYY/MM/DD">{edu.to}</Moment>
        )}
      </td>
      <td>
        {/* <Link to="/add/user/education" >
          <button className="t-btn t-btn1">update</button>
        </Link>  */}
      </td>
      <td>
        <button  className="t-btn t-btn2" onClick={() => {
          deleteEducation(edu._id);
          history.push('/admin/dashboard')
          }}>delete</button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2>Education Credentials</h2>
      <div className="responsiveTb">
      <table className="exp-table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
            <th />
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
      </div>
    </Fragment>
  );
};

export default withRouter(Education);
