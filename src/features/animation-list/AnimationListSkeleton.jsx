import React from 'react';

import { CardSkeleton } from '@components/card';

import { DSRow, DSCol } from './AnimationListStyle';

export default function AnimationListSkeleton({ count = 8 }) {
  return (
    <DSRow>
      {Array(count)
        .fill(1)
        .map((key) => (
          <DSCol key={key}>
            <CardSkeleton />
          </DSCol>
        ))}
    </DSRow>
  );
}
