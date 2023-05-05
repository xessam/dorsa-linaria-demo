import { styled } from '@linaria/react';

import { StoreProvider } from '@store/animationStore';
import AnimationList from '@features/animation-list';
import AnimationListToolsbar from '@features/animation-list-toolsbar';

const DSContainer = styled.div`
  padding: 0 1rem 1rem;
`;

export default function Home() {
  return (
    <StoreProvider>
      <DSContainer>
        <AnimationListToolsbar />
        <AnimationList />
      </DSContainer>
    </StoreProvider>
  );
}
