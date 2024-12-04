import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard';
import { useElementOnScreen } from '@/hooks';
import { useProducts } from '@/hooks/useProducts';
import React, { useEffect, useState } from 'react';

export default function Home() {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: [0, 1000],
    rating: 0,
  });
  const [sortOption, setSortOption] = useState('');

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useProducts();

  const [elementRef, isVisible] = useElementOnScreen<HTMLButtonElement>({
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  });

  useEffect(() => {
    if (!isVisible) return;
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, isVisible]);

  if (status === 'pending') return <ProductGridSkeleton />;
  if (status === 'error') return <p>Error: {error.message}</p>;

  const filteredProducts = data.pages.flatMap((page) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'price-asc') return a.price - b.price;
    if (sortOption === 'price-desc') return b.price - a.price;
    return 0;
  });

  const handleFilterChange = (key: string, value: unknown) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <section>
      <div className='filters gap-4'>
        <select
          onChange={(e) => handleFilterChange('category', e.target.value)}
          value={filters.category}
        >
          <option value=''>All Categories</option>
          <option value='beauty'>Electronics</option>
          <option value='furniture'>Fashion</option>
        </select>

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

        <input
          type='number'
          min='0'
          max='5'
          step='0.1'
          value={filters.rating}
          onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
        />
        <span>Rating: {filters.rating}+</span>

        <select
          onChange={(e) => setSortOption(e.target.value)}
          value={sortOption}
        >
          <option value='' hidden>
            sort by
          </option>
          <option value='price-asc'>Price: Low to High</option>
          <option value='price-desc'>Price: High to Low</option>
        </select>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {sortedProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
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
    </section>
  );
}

function ProductGridSkeleton() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {[...Array(10)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
