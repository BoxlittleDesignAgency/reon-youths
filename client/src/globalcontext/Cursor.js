import React, { Fragment, useContext, useReducer } from 'react';

//Define the context
export const GlobalCursorStateContext = React.createContext();
export const GlobalCursorDispatchContext = React.createContext();

//custom hooks for when we want to use our global state
export const useGlobalStateContext = () => {
  return useContext(GlobalCursorStateContext);
};

export const useGlobalDispatchContext = () => {
  return useContext(GlobalCursorDispatchContext);
};

const initialState = {
  cursorType: false,
  cursorStyles: ['pointer', 'hovered']
};

//Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'CURSOR_TYPE':
      return {
        ...state,
        cursorType: action.cursorType
      };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const Cursor = ({ children }) => {
  const [state, setDispatch] = useReducer(reducer, initialState);

  console.log('FROM GLOBAL STATE: ====', setDispatch);

  return (
    <Fragment>
      <GlobalCursorStateContext.Provider value={state}>
        <GlobalCursorDispatchContext.Provider value={setDispatch}>
          {children}
        </GlobalCursorDispatchContext.Provider>
      </GlobalCursorStateContext.Provider>
    </Fragment>
  );
};

export default Cursor;
