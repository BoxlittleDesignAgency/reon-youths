import React, { Fragment } from 'react';
import ReactPlayer from 'react-player';

import bgVideo from '../../../assets/videos/video-01.mp4';
import bgClip from '../../../assets/images/company-video.jpg';

import './LiveStream.css';

const Livestream = () => {
  return (
    <Fragment>
      <div
        className="home-comp "
        style={{
          paddingTop: '9.4rem',
          paddingBottom: '6rem',
          display: 'block',
          visibility: 'visible',
          position: 'relative'
        }}
      >
        <section className="lst-evan">
          <div className="lst-middle ground-zero container">
            <div className="lst-small-txt idx-block">
              third gen family industry
            </div>
            <div className="lst-big-txt idx-block lst-block-ext">God owned</div>
            <div className="lst-block lst-body-txt txt-formatted">
              <p className="txt-align-center">
                Bringing a nostalgic or modern presence to the world of
                transportation, our beautiful vehicles do more than turn heads.
                Experience a unique, yet comparably productive vehicle. Complete
                customization, increased ridership, higher satisfaction and
                superior fuel efficiency are just a few reasons why our vehicles
                provide real value for your transportation needs.
              </p>
            </div>
          </div>
        </section>

        <section className="lst-video">
          <div className="lst-video-inner">
            <div className="layout__region">
              <div className="video-field">
                <ReactPlayer
                  url="https://cdn.internetmultimediaonline.org/241F21/prayerlive/PCPrayerLive2019.m3u8"
                  controls
                  width="100%"
                  height="100%"
                />
              </div>
            </div>
          </div>
        </section> 

        <section className="lst-row-bleed">
          <div className="lst-row-bleed-inner">
          
          <div className="grped-header">
              <div className="lst-background-video lst-block lst-field-item full-width">
                <video autoPlay loop muted poster={bgClip}>
                  <source src={bgVideo} type="video/mp4" />
                  <source src={bgVideo} type="video/ogg" />
                </video>
              </div>
            </div>

          <div className="grped-middle">
              <div className="container flex lst-summary">
                <div className="lst-column lst-body-txt">
                  <h3>100% american made</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    excepturi repellendus fugiat distinctio, assumenda fugit
                    ullam pariatur minus nemo, quas nulla! Impedit saepe modi
                    facere in dolore quibusdam laboriosam porro. Nisi, soluta
                    dolor sit, amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="lst-column lst-body-txt">
                  <h3>100% american made</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    excepturi repellendus fugiat distinctio, assumenda fugit
                    ullam pariatur minus nemo, quas nulla! Impedit saepe modi
                    facere in dolore quibusdam laboriosam porro. Nisi, soluta
                    dolor sit, amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="lst-column lst-body-txt">
                  <h3>100% american made</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut
                    excepturi repellendus fugiat distinctio, assumenda fugit
                    ullam pariatur minus nemo, quas nulla! Impedit saepe modi
                    facere in dolore quibusdam laboriosam porro. Nisi, soluta
                    dolor sit, amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="lst-ad full-width">
          <div className="container">
            <div className="lst-ad-mid">
              <div className="lst-small-txt lst-block">Click the button below To join</div>
              <div className="lst-ad-mid-h4">
                the Pastor Chris Live Prayer Network, and receive prayer posts
                from Pastor Chris
              </div>
              <div className="lst-ad-bottom">
                
                <a
                  className="btn btn--dark margin-mini-top"
                  href="https://www.pastorchrislive.org/v2/index.php?r=site/FollowPastorChris&pf=reon"
                >
                  Prayer Network
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Fragment>
  );
};

export default Livestream;
