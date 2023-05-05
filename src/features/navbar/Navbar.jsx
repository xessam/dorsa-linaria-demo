import React from 'react';

import {ArrowRight} from '@components/icon';

import {DSContainer, DSNavLink} from './NavbarStyle';

const TEXT = {
  return: 'بازگشت'
};

export default function Navbar() {
  return (
    <DSContainer>
      <DSNavLink>
        <ArrowRight />
        {TEXT.return}
      </DSNavLink>
    </DSContainer>
  );
}
