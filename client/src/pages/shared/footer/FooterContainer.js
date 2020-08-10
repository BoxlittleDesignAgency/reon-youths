import React, { lazy, Suspense, useEffect, useState } from 'react';

import {
  Footer,
  FooterWrapper,
  FooterRow,
  FooterBottomRow,
  FooterColumn,
  FooterBottomColumn,
  FooterTitle,
  FooterLink,
  FooterOuterLink,
  Icons
} from './Footer';

//import Types
import {
  GET_SITE_FOOTER_DATA,
  UPDATE_SITE_FOOTER_DATA,
  SITE_FOOTER_DATA_ERROR,
  FETCHING_SITE_DATA,
  FETCHED_SITE_DATA
} from '../../../dashboard/components/actions/types';

//import Actions
// import { getSiteData } from '../../../dashboard/components/actions/site';

import {
  useManageSite,
  useManageSiteUpdate
} from '../../../globalcontext/manageSite';
import Loader from '../loading/Loader';
import Log from '../../../pages/shared/Log';

const FooterContainer = () => {
  const { siteFooterInfo } = useManageSite();
  const { getSiteFooterData } = useManageSiteUpdate();
  const [values, setValues] = useState({
    aboutTitle: '',
    livestreamLink: '',
    aboutReonLink: '',
    usefulLinkTitle: '',
    facebookLink: '',
    followUsTitle: '',
    rhapsodyLink: '',
    prayerNetworkLink: '',
    ambassadorNetworkLink: '',
    aboutTheAuthorLink: '',
    contactUsTitle: '',
    unitedStateLink: '',
    unitedKingdomLink: '',
    nigeriaLink: '',
    supportLink: '',
    youtubeLink: '',
    kingschatLink: '',
    instagramLink: ''
  });

  const {
    aboutTitle,
    livestreamLink,
    aboutReonLink,
    usefulLinkTitle,
    facebookLink,
    followUsTitle,
    rhapsodyLink,
    prayerNetworkLink,
    ambassadorNetworkLink,
    aboutTheAuthorLink,
    contactUsTitle,
    unitedStateLink,
    unitedKingdomLink,
    nigeriaLink,
    supportLink,
    youtubeLink,
    kingschatLink,
    instagramLink
  } = siteFooterInfo;

  console.log('DESTRUCTURING->', siteFooterInfo);
  useEffect(() => {
    let mounted = true;
    const loadData = async () => {
      await getSiteFooterData();
    };

    if (mounted) {
      loadData();
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <Footer>
        <FooterWrapper>
          <FooterRow>
            <FooterColumn>
              <FooterTitle>{aboutTitle}</FooterTitle>
              <FooterLink href="/clients">{livestreamLink}</FooterLink>
              <FooterLink href="/story">{aboutReonLink}</FooterLink>

              {/* <FooterLink href="/testimonials">Testimonials</FooterLink> */}
            </FooterColumn>
            <FooterColumn>
              <FooterTitle>{usefulLinkTitle}</FooterTitle>
              <FooterLink href="/marketting">{rhapsodyLink}</FooterLink>
              <FooterLink href="/consulting">{prayerNetworkLink}</FooterLink>
              <FooterLink href="/development">
                {ambassadorNetworkLink}
              </FooterLink>
              <FooterLink href="/design">{aboutTheAuthorLink}</FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterTitle>{contactUsTitle}</FooterTitle>
              <FooterLink href="/us">{unitedStateLink}</FooterLink>
              <FooterLink href="/uk">{unitedKingdomLink}</FooterLink>
              <FooterLink href="/ng">{nigeriaLink}</FooterLink>
              <FooterLink href="/support">{supportLink}</FooterLink>
            </FooterColumn>
            <FooterColumn>
              <FooterTitle>{followUsTitle}</FooterTitle>
              <FooterOuterLink href="http://www.kingschat.com/reonyouths">
                <Icons className="icons far fa-comments" />
                {kingschatLink}
              </FooterOuterLink>
              <FooterOuterLink href="http://www.facebook.com/reonyouths">
                <Icons className="icons fab fa-facebook-f" />
                {facebookLink}
              </FooterOuterLink>
              <FooterOuterLink href="http://www.instagram.com/reonyouths">
                <Icons className="icons fab fa-instagram" />
                {instagramLink}
              </FooterOuterLink>
              <FooterOuterLink href="http://www.instagram.com/reonyouths">
                <Icons className="icons fab fa-youtube" />
                {youtubeLink}
              </FooterOuterLink>
            </FooterColumn>
          </FooterRow>
          {/* <Log value={state} /> */}
          <FooterBottomRow>
            <FooterBottomColumn>
              <p>© Reon Youths. All Rights Reserved.</p>
            </FooterBottomColumn>
            <FooterBottomColumn></FooterBottomColumn>
            <FooterBottomColumn></FooterBottomColumn>
            <FooterBottomColumn>
              <div className="footer__attr">
                <a
                  href="https://www.boxlittle.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Crafted by Boxlittle
                </a>
              </div>
            </FooterBottomColumn>
          </FooterBottomRow>
        </FooterWrapper>
      </Footer>
    </Suspense>
  );
};

export default FooterContainer;
