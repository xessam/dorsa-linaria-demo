import { styled } from '@linaria/react';

const DSSkeleton = styled.div`
  display: block;
  background: rgb(0, 0, 0, 0.1);
  height: 1.2em;
  border-radius: var(--border-radius);

  position: relative;
  overflow: hidden;
  /* Fix bug in Safari https://bugs.webkit.org/show_bug.cgi?id=68196 */
  -webkit-mask-image: -webkit-radial-gradient(white, black);
  &::after {
    animation: spin 1.4s linear 0.5s infinite;
    background: linear-gradient(90deg, transparent, rgb(0, 0, 0, 0.05), transparent);
    content: '';
    position: absolute;
    transform: translateX(-100%); /* Avoid flash during server-side hydration */
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  @keyframes spin {
    0% {
      transform: translateX(-100%);
    }
    50% {
      /* +0.5s of delay between each loop */
      transform: translateX(100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`;
export { DSSkeleton };
