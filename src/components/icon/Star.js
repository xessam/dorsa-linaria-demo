import React from 'react';
import Image from 'next/image';
import Star from '/public/icons/star.svg';

export default function StarIcon() {
  return <Image src={Star} alt="star"/>;
}
