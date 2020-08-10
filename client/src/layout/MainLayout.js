import React, { Fragment } from 'react';

import {
  useGlobalStateContext,
  useGlobalDispatchContext
} from '../globalcontext/Cursor';

import Cursor from '../globalcontext/Cursor';
import ManageSite from '../globalcontext/manageSite';

import GlobalHeader from '../pages/shared/header/GlobalHeader';
import FooterContainer from '../pages/shared/footer/FooterContainer';

const MainLayout = ({ children, className, ...rest }) => {
  // const { cursorType, cursorStyles } = useGlobalStateContext();
  // const setDispatch = useGlobalDispatchContext();

  // const onCursor = (cursorType) => {
  //   cursorType = (cursorStyles.includes(cursorType) && cursorType) || false;

  //   setDispatch({ type: 'CURSOR_TYPE', cursorType: cursorType });
  // };

  return (
    <Fragment>
      <Cursor>
        <ManageSite>
          <GlobalHeader />
          <main>{children}</main>
          <FooterContainer />
        </ManageSite>
      </Cursor>
    </Fragment>
  );
};

export default MainLayout;
