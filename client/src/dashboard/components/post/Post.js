import React, { Fragment, useEffect, useContext, useState } from 'react';

import { Link, withRouter } from 'react-router-dom';
import { postStore } from '../context/postStore';

import PostItem from '../posts/PostItem';
import CommentForm from './CommentForm';
import CommentItem from './CommentItem';
import Loader from '../../../pages/shared/loading/Loader';
import Log from '../../../pages/shared/Log';

const Post = ({ match }) => {
  const { getPost, post, loading } = useContext(postStore);
  useEffect(() => {
    getPost(match.params.id);
  }, []);
  return loading || post === null ? (
    <Loader />
  ) : (
    <Fragment>
      <Link to="/posts">Back To Posts</Link>
      <PostItem post={post} showActions={false} />
      <ul className="comments-list reply-list">
        {post.comments.map((comment) => (
          <CommentItem key={comment._id} comment={comment} postId={post._id} />
        ))}
      </ul>

      <CommentForm postId={post._id} />
      <Log value={post.comments} />
    </Fragment>
  );
};

export default withRouter(Post);
