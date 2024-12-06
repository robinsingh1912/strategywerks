import { Product } from '@/types';
import Image from 'next/image';

interface Props {
  product: Product | null;
}
export function ProductModal({ product }: Props) {
  if (!product) return;

  return (
    <div>
      <h2 className='text-2xl font-bold mt-4'>{product.title}</h2>
      <div className='relative w-full h-48'>
        <Image
          src={product.images[0]}
          alt={product.title}
          fill={true}
          objectFit='contain'
        />
      </div>
      <p className='text-gray-700 mt-2'>{product.description}</p>
      <p className='text-gray-900 font-semibold mt-4'>
        ${product.price.toFixed(2)}
      </p>
      <p className='text-gray-600 mt-1'>Category: {product.category}</p>
      <p className='text-green-600 mt-1'>
        Availability: {product.availabilityStatus}
      </p>
    </div>
  );
}
