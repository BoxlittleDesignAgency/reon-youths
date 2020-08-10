import React, { Fragment, useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Moment from 'react-moment';
import { postStore } from '../context/postStore';

import Log from '../../../pages/shared/Log';
import { isAuthenticated } from '../../../pages/components/auth/helpers';
// import { addLikes, removeLikes } from '../actions/post';
import { UPDATE_LIKES } from '../actions/types';

const PostItem = ({
  post: { _id, title, text, name, user, postedBy, likes, comments, created },
  showActions = true
}) => {
  const { addLikes, removeLikes, deletePost } = useContext(postStore);

  const [displayCommentInput, toggleCommentInput] = useState(false);
  // const [showActions, setShowActions] = useState(true)

  return (
    <Fragment>
      <li className="posts-list-item">
        <div className="post-main-level">
          <div className="post-avatar">
            <img src="http://dummyimage.com/60" alt="" />
          </div>
          <div className="post-box">
            <div className="post-head">
              <h6 className="post-name by-author">
                <a href="#">{name}</a>
              </h6>
              <div className="date-posted">
                Posted on <Moment format="DD/MM/YYYY">{created}</Moment>
              </div>

              {showActions && (
                <Fragment>
                  <button
                    onClick={(e) => addLikes(_id)}
                    type="button"
                    className="thumbs"
                  >
                    <ion-icon name="thumbs-up"></ion-icon>{' '}
                    {likes.length > 0 && <span>{likes.length}</span>}
                  </button>
                  <button
                    onClick={(e) => removeLikes(_id)}
                    type="button"
                    className="thumbs"
                  >
                    <ion-icon name="thumbs-down"></ion-icon>
                  </button>
                </Fragment>
              )}
            </div>
            <div className="post-content">
              <h4 className="light-bold">{title}</h4>
              <p>{text}</p>
              {showActions && (
                <Fragment>
                  <div className="post-open">
                    <Link to={`/post/${_id}`}>
                      Discussion{' '}
                      {comments.length > 0 && (
                        <span className="comment-count">{comments.length}</span>
                      )}
                    </Link>
                    <a
                      className="btn-reply"
                      onClick={() => toggleCommentInput(!displayCommentInput)}
                    >
                      <ion-icon name="return-up-back"></ion-icon>
                    </a>
                    {isAuthenticated().role === 'subscriber' &&
                      user === isAuthenticated()._id && (
                        <a
                          onClick={(e) => deletePost(_id)}
                          className="btn-delete"
                        >
                          <ion-icon name="trash"></ion-icon>
                        </a>
                      )}
                    {isAuthenticated() && isAuthenticated().role === 'admin' && (
                      <a
                        onClick={(e) => deletePost(_id)}
                        className="btn-delete"
                      >
                        <ion-icon name="trash"></ion-icon>
                      </a>
                    )}
                  </div>
                </Fragment>
              )}
            </div>
            <div className="post-footer">
              {displayCommentInput && (
                <div className="comment-form">
                  <textarea
                    className="sm-comment"
                    name="sm-comment-text"
                    placeholder="Leave a comment"
                  ></textarea>
                  <div className="send-button">
                    <a className="btn-send">
                      <ion-icon name="send"></ion-icon>send
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <ul className="comments-list reply-list">
          <li className="comment-list-item">
            <div className="comment-avatar">
              <img src="http://dummyimage.com/60" alt="" />
            </div>

            <div className="comment-box">
              <div className="comment-head">
                <h6 className="comment-name">
                  <a href="#">Lorena Rojero</a>
                </h6>
                <span className="posted-time">Posted on DD-MM-YYYY HH:MM</span>
              </div>
              <div className="comment-content">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
                omnis animi et iure laudantium vitae, praesentium optio,
                sapiente distinctio illo?
                <div className="comment-open">
                  <a className="btn-reply">
                    <i className="fa fa-reply"></i>
                  </a>
                </div>
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
        </ul> */}
      </li>

      {/* <Log value={posts} /> */}
    </Fragment>
  );
};

export default PostItem;
