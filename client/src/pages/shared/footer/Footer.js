import React from 'react';

import { Link } from 'react-router-dom';

import './Footer.scss';

export const Footer = ({ children, ...restProps }) => {
  return (
    <div className="footer-container" {...restProps}>
      {children}
    </div>
  );
};

export const FooterWrapper = ({ children, ...restProps }) => {
  return (
    <div className="footer-wrapper" {...restProps}>
      {children}
    </div>
  );
};

export const FooterRow = ({ children, ...restProps }) => {
  return (
    <div className="footer-row" {...restProps}>
      {children}
    </div>
  );
};

export const FooterBottomRow = ({ children, ...restProps }) => {
  return (
    <div className="footer-bottom-row" {...restProps}>
      {children}
    </div>
  );
};

export const FooterColumn = ({ children, ...restProps }) => {
  return (
    <div className="footer-column" {...restProps}>
      {children}
    </div>
  );
};

export const FooterBottomColumn = ({ children, ...restProps }) => {
  return (
    <div className="footer-bottom-column" {...restProps}>
      {children}
    </div>
  );
};

export const FooterLink = ({ children, href, ...restProps }) => {
  return (
    <Link to={`${href}`} className="footer-link" {...restProps}>
      {children}
    </Link>
  );
};

export const FooterOuterLink = ({ children, href, ...restProps }) => {
  return (
    <a href={`${href}`} className="footer-link" {...restProps}>
      {children}
    </a>
  );
};

export const FooterTitle = ({ children, ...restProps }) => {
  return (
    <p className="footer-title" {...restProps}>
      {children}
    </p>
  );
};

export const Icons = ({ className }) => {
  return <i className={className} />;
};
