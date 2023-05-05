import {useState, useEffect} from 'react';

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (!isFetching) return;
    callback();
  }, [isFetching]);

  function isScrolling() {
    if (window.innerHeight + window.scrollY + 50 >= document.body.offsetHeight) {
      if (!isFetching) {
        setIsFetching(true);
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', isScrolling);
    return () => window.removeEventListener('scroll', isScrolling);
  }, []);

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
