import React, { Fragment, useEffect, useContext } from 'react';

import { store } from '../../dashboard/components/context/store';

const Today = () => {
  const { profile, deleteAccount } = useContext(store);

  useEffect(() => {
    console.dir('it got here');
  }, []);
  return (
    <div>
      <h3>Using useState Hook</h3>
    </div>
  );
};

export default Today;
