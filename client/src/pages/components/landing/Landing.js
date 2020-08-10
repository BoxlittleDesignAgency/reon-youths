import React, { Fragment, useEffect, useRef, useState } from 'react';

import { Link } from 'react-router-dom';

// Gsap Animation
import { gsap } from 'gsap';

import { CSSPlugin } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CSSRulePlugin from 'gsap/CSSRulePlugin';
// import CSSPlugin from 'gsap/CSSPlugin';
import './Landing.scss';

import heroImg from '../../../assets/images/company-video.jpg';
import introImg from '../../../assets/images/nathana-reboucas-b0-Kp69nXOo-unsplash.jpg';
import svgStream from '../../../assets/images/blue-play.png';

gsap.registerPlugin(CSSPlugin, CSSRulePlugin, ScrollTrigger);

const Landing = () => {
  let landingCont = useRef(null);
  let imgContainer = useRef(null);
  let imgHero = useRef(null);
  let content = useRef(null);

  let tl = gsap.timeline({});
  let imageReveal = CSSRulePlugin.getRule('.section-twox-inner:after');
  let smallRule = CSSRulePlugin.getRule('.idx-big-txt::after');

  gsap.ticker.fps(-1);

  const fadeIn = (element) => {
    gsap.to(element, 1, {
      opacity: 1,
      y: -60,
      ease: 'power4.out',
      stagger: {
        amount: 0.2
      }
    });
  };

  const fadeOut = (element) => {
    gsap.to(element, 1, {
      opacity: 0,
      y: -20,
      ease: 'power4.out'
    });
  };

  useEffect(() => {
    //Hero Content vars
    const tagline = content.children[0];
    const headlineFirst = tagline.nextSibling;
    const contentP = content.children[2].children;
    // const contentP2 = contentP1.nextSibling;
    console.log(tagline);
    console.log(headlineFirst);
    console.log(smallRule);

    tl.to(landingCont, 0, { css: { visibility: 'visible' } })
      .to(imageReveal, 1.4, { width: '0%', ease: 'power2.easeInOut' })
      .from(imgHero, 1.4, { scale: 1.6, ease: 'power2.easeInOut', delay: -1 });

    //Content Animation
    tl
      // .from(
      //   tagline.children,
      //   {
      //     y: 44
      //   },
      //   '<=4'
      // )
      .from(
        [tagline.children, headlineFirst.children],
        {
          y: 80,
          stagger: { each: 0.1 }
        },
        '<=4'
      )
      .from(
        contentP,
        1,
        { y: 40, opacity: 0, ease: 'power3.easeOut', stagger: { each: 0.2 } },
        '<=4'
      );
  }, []);

  return (
    <Fragment>
      <div
        ref={(el) => (landingCont = el)}
        className="home-comp page"
        style={{
          paddingTop: '9.4rem',
          paddingBottom: '6rem',
          display: 'block',
          position: 'relative'
        }}
      >
        {/* <section id="hero" className="hero hero-banner--img container">
        <div className="hero__inner">
          <div className="hero__content">
            <div className="hero__content-inner">
              <h2 className="hero__subtitle">Push past impossible</h2>
              <h1 className="hero__title">
                Rhapsody Evangelistic Outreach Network
              </h1>
            </div>
          </div>
          <div className="hero__img">
            <div className="img-container"></div>
          </div>
        </div>
      </section> */}

        <section className="block_hero container">
          <div className="idx-middle ground-zero" ref={(el) => (content = el)}>
            <div className="idx-small-txt idx-animated idx-block bold">
              <div className="idx-block-inner">we craft</div>
            </div>
            <div className="idx-big-txt idx-animated idx-block">
              <div className="idx-block-inner">R-o-R Envangelism Outreach</div>
            </div>
            <div className="txt-formatted idx-body-txt flex">
              <p>
                Since the very first prototype built, our products have been
                designed with one goal, to combine high-quality craftsmanship
                with the latest innovative technology. It began with trailers,
                transformed into Trolleys and food trucks, then expanded into
                buses.
              </p>
              <p>
                Transportation is the core of Hometown Manufacturing. From small
                private tours to everyday mass transit to National Park
                shuttling, each Hometown Manufactured product is hand-crafted to
                meet your specific needs and budget.
              </p>
              <p>&nbsp;</p>
            </div>
          </div>
        </section>
        <section ref={(el) => (imgContainer = el)} id="section-twox">
          <div className="section-twox-inner">
            <img
              ref={(el) => (imgHero = el)}
              className="img-hero"
              src={heroImg}
              alt="hero image"
            />
          </div>
        </section>
        <section id="section-one" className="section section-one  panel">
          <div className="block_demo">
            <div className="container">
              <div className="flex flex-spaced">
                <div className="intro__section intro__section--left">
                  <figure className="intro__img">
                    <img className="img-full" src={introImg} alt="" />
                  </figure>
                  <div className="intro__cta">
                    <h3 className="txt-alt">
                      We win them,
                      <br />
                      We build them,
                      <br />
                      And send them out.
                    </h3>
                    <p className="margin-micro-top">
                      RoR follows the footsteps of early adventurers, immersing
                      you in the raw, untouched wilderness that few humans will
                      ever experience
                    </p>
                    <Link className="btn btn--dark margin-mini-top" to="/about">
                      Learn More
                    </Link>
                  </div>
                </div>
                <div className="intro__section intro__section--right">
                  <h2 className="intro__title">Immerse yourself in the word</h2>
                  <div className="idx-big-txt2">
                    <span className="fadeIn">It doesn't matter whats</span>
                    <br />
                    <span className="fadeIn">going on around you.</span>
                  </div>
                  <div className="txt-formatted idx-body-txt idx-block txt-align-center">
                    <p className="fadeIn">
                      ...dwell in the land which I shall tell thee of: Sojourn
                      in this land, and I will be with thee, and will bless
                      thee; for unto thee, and unto thy seed, I will give all
                      these countries, and I will perform the oath which I sware
                      unto Abraham thy father.
                      <br /> - <span className="bold">Gen 26:2-3</span>
                    </p>
                  </div>
                </div>
                <h3 className="h3-desig fadeIn">About</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="section section-two">
          <div className="block_demo">
            <div className="container">
              <div className="" style={{ padding: '50px 0px 60px' }}>
                <div className="div-block-6">
                  <h2 className="h2---small">Work with us</h2>
                  <h3 className="h3_expanded left">
                    <span className="text-span-4">
                      Rhapsody, Evangelism and Outreach Network
                    </span>
                    <span className="text-span-3">— all in one place</span>
                  </h3>
                  <div className="r-col">
                    <div className="col-4">
                      <div className="large-number">01</div>
                      <h4 className="h4">We win them</h4>
                      <p className="paragraph-seven">
                        Set up a project in less than two minutes, add products
                        from our catalogue or from any website with the Clip
                        Tool and organise them visually on your board.
                      </p>
                    </div>
                    <div className="col-4">
                      <div className="large-number">02</div>
                      <h4 className="h4">We build them</h4>
                      <p className="paragraph-seven">
                        Build specifications for various budget or style options
                        with your team. Comment on products added by a colleague
                        or reach out to our experts for alternatives.
                      </p>
                    </div>
                    <div className="col-4">
                      <div className="large-number">03</div>
                      <h4 className="h4">We send them </h4>
                      <p className="paragraph-seven">
                        Our team manages every supplier while you can track each
                        item on the platform. We can also consolidate your
                        delivery and organise on-site installation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section dashed-line block_demo">
          <div className="block_link-inner">
            <Link className="live-link" to="/live-stream">
              <img src={svgStream} alt="" />
            </Link>
          </div>
        </section>
        <section className="section dashed-line block_demo">
          <h2 className="intro__title">want to join us?</h2>
          <div className="block_demo-inner">
            <h2 className="h3---center fadeIn">Become a Reon Minister</h2>
            <p className="center-paragraph fadeIn">
              As a REON Minister, you are a vital stakeholder in the
              evangelization of the world. This means that you share the same
              passion of investing in the spread of the Gospel to every man.
              Increase your relevance and the impact of your Ministry in global
              evangelization with Rhapsody of Realities daily devotional.
              <br />
            </p>
            <div className="centre-cta fadeIn">
              <a href="!#" className="reonBtn">
                Join us
              </a>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Landing;
