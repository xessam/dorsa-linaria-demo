import React from 'react';
import * as NextImage from 'next/image';
import { cx } from '@linaria/core';

import { DSFallback } from './ImageStyle';
export default function Image({
  
  useSkeleton = false,
  src,
  width = '100%',
  height = '100%',
  alt,
  className,
  imgClassName,
  blurClassName,
  ratio,
  ...rest
}) {
  const [status, setStatus] = React.useState(useSkeleton ? 'loading' : 'complete');
  return (
    <DSFallback>
      <NextImage
        className={cx(imgClassName, status === 'loading' && blurClassName)}
        src={src}
        fill={!0}
        alt={alt}
        onLoadingComplete={() => setStatus('complete')}
        {...rest}
      />
    </DSFallback>
  );
}
