import React, { Fragment, useEffect, useRef, useMemo, useState } from 'react';
// Gsap Animation
import { gsap } from 'gsap';

import { CSSPlugin } from 'gsap';
import CSSRulePlugin from 'gsap/CSSRulePlugin';

import './About.scss';
import AboutImg from '../../../assets/images/clay-banks.jpg';
import AboutWebp from '../../../assets/images/about_image_1.jpg';
import EvanImg from '../../../assets/images/reon-01.jpg';

const About = () => {
  gsap.registerPlugin(CSSPlugin, CSSRulePlugin);
  gsap.ticker.fps(-1);

  let aboutLandingCont = useRef(null);
  let line1 = useRef(null);
  let line2 = useRef(null);
  let line3 = useRef(null);
  let contentHero = useRef(null);
  let image = useRef(null);
  let imageReveal = CSSRulePlugin.getRule('.image-container:after');

  let tl = gsap.timeline({});

  useEffect(() => {
    tl.to(aboutLandingCont, 0, { css: { visibility: 'visible' } })
      .to(imageReveal, 1.4, { width: '0%', ease: 'power2.easeInOut' })
      .from(image, 1.4, { scale: 1.6, ease: 'power2.easeInOut', delay: -1 });

    tl.from(
      [line1, line2, line3],
      0.4,
      {
        ease: 'power2.easeInOut',
        y: 80,
        stagger: {
          each: 0.1
        }
      },
      '<=4'
    ).from(
      contentHero,
      1,
      {
        y: 20,
        opacity: 0,
        ease: 'power2.easeOut',
        stagger: { each: 0.2 }
      },
      '<=4'
    );
  }, [line1, line2]);
  return (
    <Fragment>
      <div
        ref={(el) => (aboutLandingCont = el)}
        className="about-container page"
        style={{
          paddingTop: '9.4rem'
        }}
      >
        <section id="about-masthead" className="block_hero container">
          <div className="block_hero-inner">
            <div className="about-hero__text">
              <h1 className="page-title">
                <div className="line-wrap">
                  <div ref={(el) => (line1 = el)} className="a-line">
                    R-o-R
                  </div>
                </div>

                <div className="line-wrap">
                  <div ref={(el) => (line2 = el)} className="a-line">
                    Evangelism Outreach
                  </div>
                </div>

                <div className="line-wrap">
                  <div ref={(el) => (line3 = el)} className="a-line">
                    <span className="h1-desig">Network.</span>
                  </div>
                </div>
              </h1>

              <p className="block-paragraph" ref={(el) => (contentHero = el)}>
                To provide that multifaceted platform that empowers and
                mobilises the global world of youths, giving them an identity
                through training for ministry, leadership and life such that
                they attain their potentials in Christ through the use and
                active distribution of Rhapsody of Realities and other materials
                by Pastor Chris as REON Youth Ambassadors for evangelism and
                outreaches in their spheres of contact.
              </p>
            </div>
            <div className="image-container">
              <img
                ref={(el) => (image = el)}
                className="about-hero__img"
                src={AboutImg}
                alt=""
              />
            </div>
          </div>
        </section>

        {/* <section className="block_hero container">
          <div className="block_hero-inner">
            <div className="ror-desc">
              <h2 className="h2">R-o-R</h2>
              <p className="block-paragraph">
                The REON (Rhapsody Evangelistic Outreach Network) Youth is a
                network of young men and women influencing their world through
                the use of Rhapsody of Realities and other materials by Pastor
                Chris, as evangelical tools for Christianisation of their world
                through outreaches.
              </p>
            </div>
            <div className="block_hero-img-about"></div>
          </div>
        </section>
         */}
        <section className="about-followup" style={{ position: 'relative' }}>
          <div
            className="flex-based"
            style={{ marginTop: '5vw', marginBottom: '5vw' }}
          >
            <div className="column r-one">
              <img className="img-responsive" src={EvanImg} alt="Reon"></img>
            </div>
            <div className="column r-two">
              <div className="text" style={{ width: '100%' }}>
                <h2>Produced with care.</h2>
                <p>
                  Handmade using the highest quality, soft leather, or vegan
                  materials.
                  <br />
                  Our philosophy is based around "slow movement" design and
                  development. We produce a tightly edited collection of simple,
                  timeless styles in a range of colour and material options.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section id="splash" className="call-to">
          <div className="splash-inner full-width">
            <img className="img-responsive" src={AboutWebp} alt="" />
            <div className="splash-content">
              <div
                className="box-letter"
                style={{
                  background: 'none',
                  maxWidth: '730px',
                  padding: '130px 10px 10px'
                }}
              >
                <span>We're sustainable.</span>
                <br />
                <p
                  style={{
                    marginTop: '20px',
                    lineHeight: '28px',
                    fontWeight: '300'
                  }}
                >
                  We're committed to minimizing our environmental impact, and
                  we're so close to being completely virgin plastic-free. <br />
                  <a href="!#" style={{ margin: '0 auto', paddingTop: '20px' }}>
                    More here.
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default About;
