import React, { useCallback, useEffect, useMemo, useState } from 'react';

import Card from '@components/card';
import AnimationListSkeleton from './AnimationListSkeleton';
import ProductApi from '@api/product';
import useInfiniteScroll from '@hooks/useInfiniteScroll';
import { useStore } from '@store/animationStore';

import { DSContainer, DSRow, DSCol } from './AnimationListStyle';

export default function AnimationList() {
  const { sortBy } = useStore();
  const { data, isLoading, hasNextPage, fetchNextPage } = ProductApi.getAnimationList(sortBy);
  const loadMore = useCallback(() => {
    if (hasNextPage && !isLoading) fetchNextPage();
  }, [hasNextPage, isLoading, fetchNextPage]);
  const [isFetching, setIsFetching] = useInfiniteScroll(loadMore);
  const animations = useMemo(
    () => [].concat(...(data?.pages.map((page) => page?.data) || [])),
    [data]
  );

  useEffect(() => {
    if (isFetching && !isLoading) {
      //reset infinite scroll
      setIsFetching(false);
    }
  }, [isFetching, isLoading, setIsFetching, data]);

  return (
    <DSContainer>
      {!data && isLoading ? (
        <AnimationListSkeleton />
      ) : (
        <>
          <DSRow>
            {animations.map(({ id, reviewsThumbnailUrl, reviewsTitle, reviewsRate }) => (
              <DSCol key={id}>
                <Card cover={reviewsThumbnailUrl} title={reviewsTitle} rate={reviewsRate} />
              </DSCol>
            ))}
          </DSRow>
          {/* style added to stable Skeleton in its place */}
          {!isLoading && <AnimationListSkeleton count={4} style={{ paddingTop: '0.5rem' }} />}
        </>
      )}
    </DSContainer>
  );
}
