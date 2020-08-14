import React, { Fragment, useContext, useState } from 'react';

import { postStore } from '../context/postStore';

const initialState = {
  title: '',
  text: ''
};

const PostForm = () => {
  const [formData, setFormData] = useState(initialState);

  const { addPost } = useContext(postStore);

  const { title, text } = formData;

  const handleChange = (name) => (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [name]: event.target.value
    });
  };

  const clickPostSubmit = (event) => {
    event.preventDefault();
    console.log('Submitted');
    addPost(formData);
    setFormData({ ...formData, title: '', text: '' });
  };

  return (
    <Fragment>
      <div className="post-form">
        <form className="form my-post">
          <div className="post-input">
            <input
              value={title}
              className="post-title"
              type="text"
              name="title"
              placeholder="Title"
              autoComplete="off"
              onChange={handleChange('title')}
            />
            <span className="focus-input"></span>
          </div>
          <div className="post-input">
            <textarea
              className="textarea-input"
              name="text"
              cols="30"
              rows="5"
              value={text}
              onChange={handleChange('text')}
              placeholder="Your Message"
              required
            ></textarea>
            <span className="focus-input"></span>
          </div>
          <button className="send-button" onClick={clickPostSubmit}>
            <a className="btn-send">
              <ion-icon name="send"></ion-icon>send
            </a>
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default PostForm;
