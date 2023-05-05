import React from 'react';

import SortAnimations from '@features/sort-animations';

import {
  DSContainer,
  DSRightSection,
  DSLeftSection,
  DSTitle,
  DSCaption
} from './AnimationListToolsbarStyle';

const TEXT = {
  seeWhat: 'چیارو ببینه؟',
  suitableFor: 'مناسب برای سن ۳ تا ۷ سال'
};

export default function AnimationListToolsbar() {
  return (
    <DSContainer>
      <DSRightSection>
        <DSTitle>{TEXT.seeWhat}</DSTitle>
        <DSCaption>{TEXT.suitableFor}</DSCaption>
      </DSRightSection>
      <DSLeftSection>
        <SortAnimations />
      </DSLeftSection>
    </DSContainer>
  );
}
