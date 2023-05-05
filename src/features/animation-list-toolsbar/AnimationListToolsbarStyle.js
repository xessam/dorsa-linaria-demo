import { styled } from '@linaria/react';

const DSContainer = styled.div`
  display: flex;
`;

const DSRightSection = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: column;
  padding: 0.25rem 0;
`;

const DSLeftSection = styled.div`
  flex: 1 1 100%;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
`;

const DSTitle = styled.div`
  font-size: 0.875rem;
  font-weight: bold;
`;

const DSCaption = styled.div`
  font-size: 0.675rem;
  color: var(--secondary-text-color);
`;

export { DSContainer, DSRightSection, DSLeftSection, DSTitle, DSCaption };
