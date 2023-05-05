import makeStore from './utils/make-store';

const DEFAULT_STATE = {
  sortBy: 'newest'
};

const animationReducer = (state, action) => {
  switch (action.type) {
    case 'set-sortby':
      return {
        ...state,
        sortBy: action.payload
      };
    default:
      throw new Error();
  }
};

const [StoreProvider, useStoreDispatch, useStore] = makeStore(animationReducer, DEFAULT_STATE);

export { StoreProvider, useStoreDispatch, useStore };
