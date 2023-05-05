import {styled} from '@linaria/react';

const DSContainer = styled.div`
  background-color: var(--fallback-background);
  min-height:100vh;
`;

const DSContent = styled.div`
  background-color: var(--background);
  max-width: var(--max-width);
  margin: auto;
  min-height:100vh;
`;

export {DSContainer, DSContent};
