import React, { Fragment, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

import './Contact.scss';

import ContactImg from '../../../assets/images/offices.png';
import leftArrow from '../../../assets/images/arrow-left.svg';
import rightArrow from '../../../assets/images/arrow-right.svg';

const slides = [
  {
    tagLine: `Only God Matters`,
    slideImg: `../../../assets/images/photo-1-evan.jpeg`
  },
  {
    tagLine: 'Contact word 2',
    slideImg: '../../../assets/images/austin.jpg'
  },
  {
    tagLine: 'Contact word 333',
    slideImg: '../../../assets/images/sanfrancisco.jpg'
  }
];

const initialState = {
  fromName: '',
  fromEmail: '',
  fromMessage: '',
  buttonText: 'Send Message'
};

const Contact = () => {
  const [formData, setFormData] = useState(initialState);

  useEffect(() => {}, []);

  const handleChange = (name) => (event) => {
    event.preventDefault();
    setFormData({
      ...formData,
      [name]: event.target.value,
      buttonText: 'Send Message'
    });
  };

  const { fromName, fromEmail, fromMessage } = formData;

  const submitRequest = async (e) => {
    e.preventDefault();

    console.log({ fromName, fromEmail, fromMessage });

    const response = await fetch('/access', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ fromName, fromEmail, fromMessage })
    });

    const resData = await response.json();
    if (resData.status === 'success') {
      alert('Message Sent.');
      setFormData({
        ...formData,
        fromName: '',
        fromEmail: '',
        fromMessage: '',
        buttonText: 'Send Message'
      });
    } else if (resData.status === 'fail') {
      alert('Message failed to send.');
    }
  };

  const contactForm = () => (
    <form>
      <div className="contact-form-field">
        <label htmlFor="from-name">Full name</label>
        <input
          id="from-name"
          type="text"
          name="fromName"
          value={fromName}
          placeholder="Type here"
          onChange={handleChange('fromName')}
          required
        />
      </div>
      <div className="contact-form-field">
        <label htmlFor="from-email">Email address</label>
        <input
          id="from-email"
          type="text"
          value={fromEmail}
          name="fromEmail"
          placeholder="Type here"
          onChange={handleChange('fromEmail')}
          required
        />
      </div>
      <div className="contact-form-field contact-form-textarea">
        <label htmlFor="message">
          The more detail you can give us the better
        </label>
        <textarea
          rows="10"
          cols="40"
          id="message"
          name="fromMessage"
          value={fromMessage}
          onChange={handleChange('fromMessage')}
        ></textarea>
      </div>
      <div className="contact-form-field">
        <button
          className="cta-btn orange"
          type="submit"
          onClick={submitRequest}
        >
          Send
        </button>
      </div>
    </form>
  );
  return (
    <Fragment>
      <div
        className="container contact-container page"
        style={{ paddingTop: '9rem', paddingBottom: '6rem', display: 'block' }}
      >
        <section id="contact-masthead" className="contact-inner">
          <div className="slides-container full-width">
            <div className="slides-inner">
              <div className="slide hero-image1">
                <div className="contact-word">
                  <span>Only God Matters</span>
                </div>
              </div>
              <div className="slide hero-image2">
                <div className="contact-word">
                  <span>Contact word 2</span>
                </div>
              </div>
            </div>
            <div className="controls">
              <button type="button" className="arrows prev">
                <img src={leftArrow} alt="left arrow" />
              </button>
              <button type="button" className="arrows next">
                <img src={rightArrow} alt="left arrow" />
              </button>
            </div>
          </div>
        </section>
        <section
          className="full-width"
          style={{ position: 'relative', display: 'block', marginTop: '50px' }}
        >
          <div className="container flex-based" style={{}}>
            <div className="cnt-column cnt-half-one">
              <div className="cnt-block">Contact us</div>

              <img
                src="//cdn.shopify.com/s/files/1/1211/5920/t/45/assets/about_section_4_image_2.jpg?v=5122455654466978303"
                alt="Hobes"
              ></img>
            </div>
            <div
              className="cnt-column cnt-half-two"
              style={{ alignItems: 'flex-end' }}
            >
              <div className="contact-form-section">
                <div className="contact-form-inner">{contactForm()}</div>
              </div>
            </div>
          </div>
        </section>

        <section className="contact-followup">
          <div className="row">
            <div className="cf-visual full-width">
              <div className="cf-visual-inner">
                <img
                  className="img-responsive"
                  src={ContactImg}
                  alt="contact page"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Contact;
