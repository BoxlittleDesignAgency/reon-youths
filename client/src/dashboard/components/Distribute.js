import React, { Fragment, useContext, useReducer } from 'react';

import { store } from './context/store';

const Distribute = () => {
  const { getUsers } = useContext(store);
  useReducer(() => {
    getUsers();
  }, []);

  return (
    <div>
      <h2>Distribute Rhapsody</h2>
    </div>
  );
};

export default Distribute;
