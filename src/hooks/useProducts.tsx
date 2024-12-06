import { ProductResponse } from '@/types';
import { http } from '@/utils/axios';
import { useInfiniteQuery } from '@tanstack/react-query';

interface Props {
  pageParam: number;
}
const getProducts = ({ pageParam }: Props) => {
  return http
    .get<ProductResponse>(`/products?limit=10&skip=${pageParam * 10}`)
    .then((res) => res.data);
};

export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ['projects'],
    queryFn: getProducts,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length;
      return lastPage.skip + lastPage.limit < lastPage.total
        ? nextPage
        : undefined;
    },
  });
};
