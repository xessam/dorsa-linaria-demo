import React, {createContext, useContext, useReducer} from 'react';

export default function makeStore(reducer, initialState) {
  const dispatchContext = createContext();
  const storeContext = createContext();
  dispatchContext.displayName = 'dispatchContext';
  storeContext.displayName = 'storeContext';

  const StoreProvider = ({children}) => {
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
      </dispatchContext.Provider>
    );
  };

  function useDispatch() {
    return useContext(dispatchContext);
  }

  function useStore() {
    return useContext(storeContext);
  }
  return [StoreProvider, useDispatch, useStore];
}
