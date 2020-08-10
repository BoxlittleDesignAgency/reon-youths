import React, { Fragment } from 'react';

const Meetings = () => {
  return (
    <Fragment>
      <div className="task">
        <input
          className="task-item"
          name="task"
          type="checkbox"
          id="item-1"
          defaultChecked
        />
        <label htmlFor="item-1">
          <span className="label-text">Dashboard Designs Implementation</span>
        </label>
        <span className="tag approved">Approved</span>
      </div>
      <div className="task">
        <input
          className="task-item"
          name="task"
          type="checkbox"
          id="item-2"
          defaultChecked
        />
        <label htmlFor="item-2">
          <span className="label-text">Create a userflow</span>
        </label>
        <span className="tag progress">In Progress</span>
      </div>
      <div className="task">
        <input className="task-item" name="task" type="checkbox" id="item-3" />
        <label htmlFor="item-3">
          <span className="label-text">Application Implementation</span>
        </label>
        <span className="tag review">In Review</span>
      </div>
      <div className="task">
        <input className="task-item" name="task" type="checkbox" id="item-4" />
        <label htmlFor="item-4">
          <span className="label-text">Create a Dashboard Design</span>
        </label>
        <span className="tag progress">In Progress</span>
      </div>
      <div className="task">
        <input className="task-item" name="task" type="checkbox" id="item-5" />
        <label htmlFor="item-5">
          <span className="label-text">Create a Web Application Design</span>
        </label>
        <span className="tag approved">Approved</span>
      </div>
      <div className="task">
        <input className="task-item" name="task" type="checkbox" id="item-6" />
        <label htmlFor="item-6">
          <span className="label-text">Interactive Design</span>
        </label>
        <span className="tag review">In Review</span>
      </div>
      <div className="header upcoming">Upcoming Tasks</div>
      <div className="task">
        <input className="task-item" name="task" type="checkbox" id="item-7" />
        <label htmlFor="item-7">
          <span className="label-text">Dashboard Design Implementation</span>
        </label>
        <span className="tag waiting">Waiting</span>
      </div>
      <div className="task">
        <input className="task-item" name="task" type="checkbox" id="item-8" />
        <label htmlFor="item-8">
          <span className="label-text">Create a userflow</span>
        </label>
        <span className="tag waiting">Waiting</span>
      </div>
      <div className="task">
        <input className="task-item" name="task" type="checkbox" id="item-9" />
        <label htmlFor="item-9">
          <span className="label-text">Application Implementation</span>
        </label>
        <span className="tag waiting">Waiting</span>
      </div>
      <div className="task">
        <input className="task-item" name="task" type="checkbox" id="item-10" />
        <label htmlFor="item-10">
          <span className="label-text">Create a Dashboard Design</span>
        </label>
        <span className="tag waiting">Waiting</span>
      </div>
    </Fragment>
  );
};

export default Meetings;
