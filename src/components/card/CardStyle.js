import { styled } from '@linaria/react';

const DSCard = styled.div``;
const DSTitle = styled.div`
  margin-top: 0.25rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
`;

const DSRate = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export { DSCard, DSTitle, DSRate };
