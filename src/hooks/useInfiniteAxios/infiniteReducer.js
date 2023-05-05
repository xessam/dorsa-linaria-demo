export const actions = {
  IS_LOADING: 'isLoading',
  SUCCESS: 'success',
  RESET: 'reset'
};

export const initialState = {
  hasNextPage: false,
  data: null
};

export function createInitialState(options) {
  return {
    ...initialState,
    hasNextPage: !!options.initialData
  };
}

export default function reducer(state, action) {
  switch (action.type) {
    case actions.IS_LOADING:
      return {
        ...state
      };
    case actions.SUCCESS:
      return {
        ...state,
        data: action.payload
      };
    case actions.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
}
