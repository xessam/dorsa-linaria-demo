import React from 'react';

import {DSRatio, DSContent} from './RatioStyle';

export default function Ratio({children, ratio = 1, ...props}) {
  const ratioStyle = {
    paddingTop: `${ratio === 0 ? 100 : 100 / ratio}%`
  };

  return (
    <DSRatio
      style={{
        ...ratioStyle
      }}
      {...props}>
      <DSContent>{children}</DSContent>
    </DSRatio>
  );
}
