import { Modal } from '@/components/Modal';
import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import { useElementOnScreen, useProductModal } from '@/hooks';
import { useProducts } from '@/hooks/useProducts';
import { lazy, Suspense, useEffect, useState } from 'react';

// Lazy load the ProductModal component to improve performance
const ProductModal = lazy(() =>
  import('@/components/ProductModal').then((module) => ({
    default: module.ProductModal,
  }))
);

export default function Home() {
  // State for filters and sorting options
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    rating: 0,
  });
  const [sortOption, setSortOption] = useState('');

  // Custom hook to manage product modal state
  const { isOpen, setProduct, product } = useProductModal();

  // Fetch products using custom hook with infinite scrolling
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useProducts();

  // Hook to detect when the "Load More" button is visible on screen
  const [elementRef, isVisible] = useElementOnScreen<HTMLButtonElement>({
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });

  // Effect to fetch next page of products when "Load More" button becomes visible
  useEffect(() => {
    if (!isVisible) return;
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isVisible]);

  // Display a loading skeleton while data is being fetched
  if (status === 'pending') return <ProductGridSkeleton />;

  // Display an error message if fetching products fails
  if (status === 'error') return <p>Error: {error.message}</p>;

  // Filter products based on selected filters
  const filteredProducts = data.pages.flatMap((page) =>
    page.products.filter((product) => {
      const { category, priceRange, rating } = filters;
      return (
        (!category || product.category === category) &&
        product.price >= priceRange[0] &&
        product.price <= priceRange[1] &&
        product.rating >= rating
      );
    })
  );

  // Sort filtered products based on selected sorting option
  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    return 0;
  });

  // Handle changes to filter inputs
  const handleFilterChange = (key: string, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <section>
      <div className='mb-6 flex gap-4 justify-between flex-wrap'>
        {/* Category filter dropdown */}
        <select
          onChange={(e) => handleFilterChange('category', e.target.value)}
          value={filters.category}
        >
          <option value=''>All Categories</option>
          <option value='beauty'>Beauty</option>
          <option value='furniture'>Furniture</option>
        </select>

        {/* Price range filter */}
        <div className='grid'>
          <input
            type='range'
            min='0'
            max='1000'
            value={filters.priceRange[1]}
            onChange={(e) =>
              handleFilterChange('priceRange', [0, Number(e.target.value)])
            }
          />
          <span>
            Price: {filters.priceRange[0]} - {filters.priceRange[1]}
          </span>
        </div>

        {/* Rating filter */}
        <div className='grid'>
          <input
            type='number'
            min='0'
            max='5'
            step='1'
            value={filters.rating}
            onChange={(e) =>
              handleFilterChange('rating', Number(e.target.value))
            }
          />
          <span>Rating: {filters.rating}+</span>
        </div>

        {/* Sorting options */}
        <select
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
        >
          <option value='' hidden>
            Sort by
          </option>
          <option value='price-asc'>Price: Low to High</option>
          <option value='price-desc'>Price: High to Low</option>
        </select>
      </div>

      {/* Display sorted products */}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {sortedProducts.map((product) => (
          <div key={product.id} onClick={() => setProduct(product)}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Load More button for infinite scrolling */}
      <div className='flex justify-center'>
        <button
          ref={elementRef}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className={`mt-4 px-6 py-2 rounded-full text-white font-medium transition ${
            !hasNextPage || isFetchingNextPage
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gray-800 hover:bg-gray-900'
          }`}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
            ? 'Load More'
            : 'No more products'}
        </button>
      </div>

      {/* Modal for displaying product details */}
      <Suspense fallback={<div>Loading...</div>}>
        <Modal isOpen={isOpen} onClose={() => setProduct(null)}>
          <ProductModal product={product} />
        </Modal>
      </Suspense>
    </section>
  );
}

// Skeleton component displayed while products are loading
function ProductGridSkeleton() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {[...Array(10)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
