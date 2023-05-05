import React from 'react';
import { cx } from '@linaria/core';

import { DSSkeleton } from './SkeletonStyle';
export default function Skeleton({
  variant = 'text',
  component = 'span',
  className,
  height,
  width,
  style,
  borderRadius, // in Px
  ...rest
}) {
  return (
    <DSSkeleton
      className={cx(className)}
      style={{
        width,
        height,
        ...style
      }}
      {...rest}
    />
  );
}
