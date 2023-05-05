import { useEffect, useCallback, useRef, useReducer, useMemo } from 'react';
import { merge } from 'lodash';

import useDeepCompareMemoize from '@hooks/useDeepCompareMemoize';
import AxiosClient, { CancelToken } from '@lib/axios-client';
import reducer, { actions } from './reducer';
import { createInitialState, configToObject } from './utils';

const DEFAULT_OPTIONS = {
  manual: false
};

async function executeRequest(config, options, dispatch) {
  dispatch({ type: actions.IS_LOADING });
  try {
    const response = await AxiosClient(config)
      .then(
        (success) => {
          const { body, errors } = success;
          // TODO: clean data and decorate request response with status and error;
          options.onSuccess?.(body ?? success);

          if (errors) {
            dispatch({ type: actions.ERROR, payload: errors });
          } else {
            dispatch({ type: actions.SUCCESS, payload: body ?? success });
          }
        },
        (err) => {
          options.onError?.(err);

          console.log(err);
          dispatch({ type: actions.ERROR, payload: err });
        }
      )
      .catch((err) => {
        options.onError?.(err);
        console.log(err);

        dispatch({ type: actions.ERROR, payload: err });
      });

    return response;
  } catch (err) {
    dispatch({ type: actions.FAILED, payload: err });
    throw err;
  }
}

function useAxios(_config, _options) {
  const config = useMemo(() => configToObject(_config), useDeepCompareMemoize(_config));
  const options = useMemo(
    () => ({ ...DEFAULT_OPTIONS, ..._options }),
    useDeepCompareMemoize(_options)
  );
  const cancelRef = useRef();
  const [state, dispatch] = useReducer(reducer, createInitialState(options));

  const cancelRequest = useCallback(() => {
    if (cancelRef.current) {
      cancelRef.current.cancel();
    }
  }, []);

  const withCancelToken = useCallback(
    (config) => {
      config.cancelToken = new CancelToken((source) => {
        cancelRef.current = source;
      });
      return config;
    },
    [config]
  );

  useEffect(() => {
    if (!options.manual) {
      executeRequest(withCancelToken(config), options, dispatch).catch(() => {});
    }
    return () => cancelRequest;
  }, [config]);

  const mutate = useCallback((configOverride, optionsOverride) => {
    configOverride = configToObject(configOverride);
    configOverride = merge({}, config, configOverride);

    return executeRequest(
      withCancelToken({
        ...config,
        ...configOverride
      }),
      {
        ...options,
        ...optionsOverride
      },
      dispatch
    );
  }, []);

  return { ...state, mutate };
}

export default useAxios;
