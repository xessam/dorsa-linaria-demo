import {styled} from '@linaria/react';

const DSContainer = styled.div`
  position: sticky;
  top: 0;
  z-index:20;

  display: flex;
  height: 3rem;
  padding: 0 1rem;

  background-color: var(--background);
`;

const DSNavLink = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--secondary-text-color);
`;

export {DSContainer, DSNavLink};
