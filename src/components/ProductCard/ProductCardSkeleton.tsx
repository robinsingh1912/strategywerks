export function ProductCardSkeleton() {
  return (
    <div className='max-w-sm overflow-hidden shadow-sm bg-white border-2 rounded-md animate-pulse'>
      <div className='relative w-full h-48 bg-gray-200'></div>
      <div className='px-6 py-4'>
        <div className='h-6 bg-gray-200 rounded w-3/4 mb-2'></div>
        <div className='h-4 bg-gray-200 rounded w-1/2 mb-2'></div>
        <div className='h-5 bg-gray-200 rounded w-1/4'></div>
      </div>
    </div>
  );
}
