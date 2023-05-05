import { styled } from '@linaria/react';

const DSContainer = styled.div`
  margin: 1rem 0;
`;

const DSRow = styled.div`
  display: flex;
  flex-flow: row wrap;
  min-width: 0px;
  justify-content: flex-start;
  align-items: flex-start;
  margin: -0.5rem;
`;

const DSCol = styled.div`
  position: relative;
  display: block;
  flex: 0 0 calc(6 / 12 * 100%);
  max-width: calc(6 / 12 * 100%);
  min-height: 1px;
  padding: 0.5rem;
`;

export { DSContainer, DSRow, DSCol };
