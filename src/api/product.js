import useInfiniteAxios from '@hooks/useInfiniteAxios/useInfiniteAxios';

const ProductApi = {};

ProductApi.getAnimationList = (sortby = 'newest') => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useInfiniteAxios(
    {
      url: '/v2/reviews-category/animations',
      params: {
        sortby: sortby, //newest , rate, view
        page: 1
      }
    },
    {
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage?.paged + 1;
        const isLastPage = nextPage >= lastPage?.max_num_pages;
        return (!isLastPage && { page: nextPage }) || null;
      }
    }
  );
};

export default ProductApi;
