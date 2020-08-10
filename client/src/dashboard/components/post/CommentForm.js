import React, { Fragment, useState, useEffect, useContext } from 'react';
import { postStore } from '../context/postStore';

const initialState = {
  text: ''
};

const CommentForm = ({ postId }) => {
  const [formData, setFormData] = useState(initialState);

  const { addComment } = useContext(postStore);

  const { text } = formData;

  const handleChange = (name) => (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [name]: event.target.value
    });
  };

  const clickCommentSubmit = (event) => {
    event.preventDefault();
    console.log('Comment Submitted');
    addComment(postId, formData);
    setFormData(initialState);
  };

  return (
    <Fragment>
      <div className="comment-form">
        <div className="comment-h4">
          <h4 className="light-bold h4-cont">Leave a Comment</h4>
        </div>

        <form className="">
          <textarea
            className="form-control"
            name="text"
            type="text"
            placeholder="Add a comment"
            value={text}
            onChange={handleChange('text')}
          ></textarea>
          <button className="send-button" onClick={clickCommentSubmit}>
            <a className="btn-send">
              <ion-icon name="send"></ion-icon> send
            </a>
          </button>
        </form>
      </div>
    </Fragment>
  );
};

export default CommentForm;
