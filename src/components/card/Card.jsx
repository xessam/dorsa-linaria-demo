import React from 'react';

import Image from '@components/image';
import Ratio from '@components/ratio';
import { Star } from '@components/icon';

import { DSCard, DSTitle, DSRate } from './CardStyle';

export default function Card({ cover, title, rate }) {
  return (
    <DSCard>
      <Ratio ratio={0.65}>
        <Image src={cover} alt={title} />
      </Ratio>
      <DSTitle>{title}</DSTitle>
      <DSRate>
        <Star /> {rate}
      </DSRate>
    </DSCard>
  );
}
