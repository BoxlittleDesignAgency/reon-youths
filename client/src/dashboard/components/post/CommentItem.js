import React, { Fragment, useContext, useState, useEffect } from 'react';

import Log from '../../../pages/shared/Log';
import { isAuthenticated } from '../../../pages/components/auth/helpers';
import Moment from 'react-moment';
import { postStore } from '../context/postStore';

const CommentItem = ({
  postId,
  comment: { _id, text, name, user, created }
}) => {
  const { loading, deleteComment } = useContext(postStore);

  return (
    <Fragment>
      <li className="comment-list-item">
        <div className="comment-avatar">
          <img src="http://dummyimage.com/60" alt="" />
        </div>

        <div className="comment-box">
          <div className="comment-head">
            <h6 className="comment-name">
              <a href="#">{name}</a>
            </h6>
            <span className="posted-time">
              Posted on <Moment format="DD/MM/YYYY">{created}</Moment>
            </span>
          </div>
          <div className="comment-content">
            <p>{text}</p>

            {!loading &&
              isAuthenticated() &&
              isAuthenticated().role === 'subscriber' &&
              user === isAuthenticated()._id && (
                <button
                  className="send-button"
                  type="button"
                  onClick={(e) => deleteComment(postId, _id)}
                >
                  <a className="delete-btn light-bold">
                    <ion-icon name="trash-outline"></ion-icon>
                  </a>
                </button>
              )}

            {!loading &&
              isAuthenticated() &&
              isAuthenticated().role === 'admin' && (
                <button
                  className="send-button"
                  type="button"
                  onClick={(e) => deleteComment(postId, _id)}
                >
                  <a className="delete-btn">
                    <ion-icon name="trash-outline"></ion-icon>
                  </a>
                </button>
              )}
          </div>
          <div className="comment-footer">
            <div className="comment-form">
              <textarea
                className="sm-comment"
                name="sm-comment-text"
                placeholder="Leave a comment"
              ></textarea>
              <div className="pull-right send-button">
                <a className="btn-send">
                  <ion-icon name="send"></ion-icon>send
                </a>
              </div>
            </div>
          </div>
        </div>
      </li>

      <Log value={name} />
    </Fragment>
  );
};

export default CommentItem;
