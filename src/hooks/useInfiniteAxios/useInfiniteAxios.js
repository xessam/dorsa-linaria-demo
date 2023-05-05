import {useEffect, useReducer, useMemo} from 'react';
import {merge} from 'lodash';

import useAxios from '@hooks/useAxios/useAxios';
import useDeepCompareMemoize from '@hooks/useDeepCompareMemoize';
import {configToObject} from '../useAxios/utils';
import reducer, {createInitialState, actions} from './infiniteReducer';
import {useUpdateEffect} from '@hooks/useUpdateEffect';

function getNextPageParam(options, pages = []) {
  return options.getNextPageParam?.(pages[pages.length - 1], pages);
}

function hasNextPage(options, pages) {
  if (options.getNextPageParam && Array.isArray(pages)) {
    const nextPageParam = getNextPageParam(options, pages);
    return (
      typeof nextPageParam !== 'undefined' && nextPageParam !== null && nextPageParam !== false
    );
  }
}

function useInfiniteAxios(_config, _options) {
  const config = useMemo(() => configToObject(_config), useDeepCompareMemoize(_config));
  const options = useMemo(() => _options, useDeepCompareMemoize(_options));
  const [state, dispatch] = useReducer(reducer, createInitialState(options));
  const {data, isLoading, error, mutate} = useAxios(_config, _options);

  const oldPages = state.data?.pages || [];
  const oldPageParams = state.data?.pageParams || [];
  let newPageParams = oldPageParams;

  const buildNewPages = (pages = [], param, page) => {
    newPageParams = [...newPageParams, param];
    return [...pages, page];
  };

  const mutatePage = (pages, manualParam, param, initialData) => {
    // No more pages left
    if (typeof param === 'undefined' && !manualParam && pages.length) {
      return;
    }

    dispatch({type: actions.IS_LOADING});

    // initailData
    if (!pages.length && initialData) {
      dispatch({
        type: actions.SUCCESS,
        payload: {pages: buildNewPages(pages, param, initialData), pageParams: newPageParams}
      });
      return;
    }

    return mutate(
      {params: param || {}},
      {
        onSuccess: (data) => {
          if (options?.selectData) {
            data = options.selectData(pages, data) || data;
          }

          dispatch({
            type: actions.SUCCESS,
            payload: {pages: buildNewPages(pages, param, data), pageParams: newPageParams}
          });
        }
      }
    );
  };

  useUpdateEffect(() => {
    if (oldPages?.length && !isLoading) dispatch({type: actions?.RESET});
  }, [config, options?.manual]);

  useEffect(() => {
    // Fetch first page?
    if (data && !oldPages.length) {
      const newData = options?.selectData ? options.selectData(oldPages, data) : data;
      mutatePage([], undefined, undefined, newData);
    }

    // Set initial data
    if (!data && options.initialData) {
      mutatePage([], undefined, undefined, options.initialData);
    }
  }, [data]);

  const fetchNextPage = (configOverride, optionsOverride) => {
    configOverride = merge({}, config, configOverride);

    const manualParam = typeof optionsOverride?.pageParam !== 'undefined';
    const param = manualParam ? optionsOverride?.pageParam : getNextPageParam(options, oldPages);

    mutatePage(oldPages, manualParam, param);
  };

  return {
    ...state,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage: hasNextPage(options, oldPages)
  };
}

export default useInfiniteAxios;
