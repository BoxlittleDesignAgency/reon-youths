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

const Contact = () => {
  const [autoplay, setAutoplay] = useState(true);

  let slideDelay = 1.5;
  let slideDuration = 0.3;

  let slidesList = useRef(null);

  let numSlides = slides.length;
  console.log('number of slides', numSlides);

  let proxy = document.createElement('div');
  gsap.set(proxy, { x: '+=0' });

  let slideAnimation = gsap.to({}, 0.1, {});
  let transform;
  transform = proxy._gsTransform;
  let slideWidth = 0;
  let wrapWidth = 0;

  useEffect(() => {
    animateSlides(-1)
  }, [gsap]);

  const wrapPartial = (min, max) => {
    let r = max - min;
    return function (value) {
      var v = value - min;
      return ((r + (v % r)) % r) + min;
    };
  };

  const autoPlay = () => {};

  let updateProgress = () => {
    animation.progress(transform.x / wrapWidth);
  };

  let snapX = (xdir) => {
    return Math.round(xdir / slideWidth) * slideWidth;
  };

  let wrap = wrapPartial(-100, (numSlides - 1) * 100);

  let timer = gsap.delayedCall(slideDelay, autoPlay);

  let animation = gsap.to(slides, 1, {
    xPercent: '+=' + numSlides.length * 100,
    ease: 'linear.easeNone',
    paused: true,
    repeat: -1,
    modifiers: {
      xPercent: wrap
    }
  });

  const prevSlide = () => {
    animateSlides(1);
  };

  const nextSlide = () => {
    animateSlides(-1);
  };

  const renderSlides = () => {
    slides.map((item, index) => (
      <div className="slide" key={index}>
        <img className="hero-image" src={item.slideImg} />
        <div className="contact-word">
          <span>{item.tagLine}</span>
        </div>
      </div>
    ));
  };

  const animateSlides = (direction) => {
    timer.restart(true);
    slideAnimation.kill();
    console.log(transform);
    //let xDirection = snapX(transform.x + direction * slideWidth);

    // slideAnimation = gsap.to(proxy, slideDuration, {
    //   x: xDirection,
    //   onUpdate: updateProgress
    // });
  };

  return (
    <Fragment>
      <div
        className="container contact-container page"
        style={{ paddingTop: '9rem', paddingBottom: '6rem', display: 'block' }}
      >
        <section id="contact-masthead" className="contact-inner">
          <div className="slides-container full-width">
            <div ref={(el) => (slidesList = el)} className="slides-inner">
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
              <button type="button" className="arrows prev" onClick={prevSlide}>
                <img src={leftArrow} alt="left arrow" />
              </button>
              <button type="button" className="arrows next" onClick={nextSlide}>
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
                <div className="contact-form-inner">
                  <div className="contact-form-field">
                    <label htmlFor="from-name">Full name</label>
                    <input
                      id="from-name"
                      type="text"
                      name="fromName"
                      placeholder="Type here"
                      required
                    />
                  </div>
                  <div className="contact-form-field">
                    <label htmlFor="from-email">Email address</label>
                    <input
                      id="from-email"
                      type="text"
                      name="fromEmail"
                      placeholder="Type here"
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
                      name="message"
                    ></textarea>
                  </div>
                  <div className="contact-form-field">
                    <button className="cta-btn orange" type="submit">
                      Send
                    </button>
                  </div>
                </div>
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
