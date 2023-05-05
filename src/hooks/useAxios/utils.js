import {initialState} from './reducer';

function createInitialState(options) {
  return {
    ...initialState,
    isLoading: !options.manual
  };
}

function configToObject(config) {
  if (typeof config === 'string') {
    return {
      url: config
    };
  }

  return Object.assign({}, config);
}

export {createInitialState, configToObject};
