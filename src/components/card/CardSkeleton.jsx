import React from 'react';
import Skeleton from '@components/skeleton';
import Ratio from '@components/ratio';
import { styled } from '@linaria/react';
import { css } from '@linaria/core';
import { DSCard, DSTitle, DSRate } from './CardStyle';

const TextSkeleton = styled(Skeleton)`
  border-radius: 0.5rem;
  margin: 0.328125rem 0;
`;

export default function CardSkeleton() {
  return (
    <DSCard>
      <Ratio ratio={0.65}>
        <Skeleton height="100%"></Skeleton>
      </Ratio>
      <DSTitle>
        <TextSkeleton width="50%" height="0.75rem" />
      </DSTitle>
      <DSRate>
        <TextSkeleton width="20%" height="0.75rem" />
      </DSRate>
    </DSCard>
  );
}
