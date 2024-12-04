import { Product } from '@/types';
import Image from 'next/image';

interface Props {
  product: Product;
}

// Define the ProductCard component
export const ProductCard = ({ product }: Props) => {
  return (
    <div className='max-w-sm overflow-hidden shadow-sm bg-white border-2 rounded-md'>
      <div className='relative w-full h-48'>
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill={true}
          objectFit='contain'
        />
      </div>
      <div className='px-6 py-4'>
        <div className='font-bold text-xl mb-2'>{product.title}</div>
        <p className='text-gray-700 text-base'>{product.category}</p>
        <p className='text-gray-900 text-lg font-semibold'>
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
