import React, { useEffect } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { ProductCard } from '@/components/ProductCard';
import { useElementOnScreen } from '@/hooks';
import { ProductCardSkeleton } from '@/components/ProductCard';

export default function Home() {
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

  return (
    <section>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {data.pages.map((page, pageIndex) => (
          <React.Fragment key={pageIndex}>
            {page.products.map((product) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </React.Fragment>
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
