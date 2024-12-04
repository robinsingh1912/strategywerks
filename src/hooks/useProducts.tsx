import { ProductResponse } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
  pageParam: number;
}
const getProducts = ({ pageParam }: Props) => {
  return axios
    .get<ProductResponse>(
      `https://dummyjson.com/products?limit=10&skip=${pageParam * 10}`
    )
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
