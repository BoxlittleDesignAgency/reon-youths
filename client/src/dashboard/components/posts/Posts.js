import React, { Fragment, useEffect, useContext, useState } from 'react';
import PostItem from './PostItem';
import { postStore } from '../context/postStore';

import PostForm from './PostForm';
import Loader from '../../../pages/shared/loading/Loader';
import Log from '../../../pages/shared/Log';
// import { getPosts } from '../actions/post';

import './Posts.scss';

const Posts = () => {
  //const [loading, setLoading] = useState(true)
  const { posts, loading, dispatch, getPosts } = useContext(postStore);

  useEffect(() => {
    getPosts();
    // setLoading(false)
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Fragment>
      <h1>Posts</h1>
      <h4>
        <ion-icon name="git-network-outline"></ion-icon> Welcome to the
        community
      </h4>
      <PostForm />
      <ul id="posts-list" className="posts-list">
        {posts && posts.map((post) => <PostItem key={post._id} post={post} />)}
      </ul>
      {/* <Log value={posts} /> */}
    </Fragment>
  );
};

export default Posts;
