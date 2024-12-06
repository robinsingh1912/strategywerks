import { ProductResponse } from '@/types'; // Import the ProductResponse type for type safety
import { http } from '@/utils/axios'; // Import a pre-configured Axios instance for HTTP requests
import { useInfiniteQuery } from '@tanstack/react-query'; // Import the useInfiniteQuery hook for data fetching

interface Props {
  pageParam: number; // Define the Props interface with a pageParam for pagination
}

// Function to fetch products from the API
const getProducts = ({ pageParam }: Props) => {
  return http
    .get<ProductResponse>(`/products?limit=10&skip=${pageParam * 10}`) // Fetch products with pagination
    .then((res) => res.data); // Return the data from the response
};

// Custom hook to manage infinite scrolling of products
export const useProducts = () => {
  return useInfiniteQuery({
    queryKey: ['projects'], // Unique key for caching and identifying the query
    queryFn: getProducts, // Function to fetch data
    initialPageParam: 0, // Initial page parameter for pagination
    getNextPageParam: (lastPage, allPages) => {
      // Calculate the next page parameter for pagination
      const nextPage = allPages.length; // Determine the next page based on the number of pages already fetched
      // Check if there are more pages to fetch
      return lastPage.skip + lastPage.limit < lastPage.total
        ? nextPage // If more pages are available, return the next page number
        : undefined; // If no more pages, return undefined to stop fetching
    },
  });
};
