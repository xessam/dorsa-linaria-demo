import { styled } from '@linaria/react';

const DSButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  background-color: transparent;
  border: 0;
  font-size: 0.875rem;
`;

const DSModal = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background: var(--background);
  border-radius: var(--border-radius) var(--border-radius) 0 0;

  :before {
    content: '';
    position: absolute;
    top: 0.325rem;
    left: 50%;
    transform: translateX(-50%);
    width: 20%;
    height: 0.325rem;
    background-color: rgba(234, 241, 246, 1);
    border-radius: var(--border-radius);
  }
`;

const DSContainer = styled.div`
  padding: 2.625rem 1rem;
`;
const DSTitle = styled.div`
  font-size: 1.25rem;
`;
const DSOptions = styled.div`
  margin: 1.25rem 0;
`;
const DSOption = styled.div`
  display: flex;
  gap: 0.25rem;
  padding: 0.75rem 0;
`;

export { DSModal, DSButton, DSContainer, DSTitle, DSOptions, DSOption };
