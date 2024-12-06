import { Product } from '@/types'; // Import the Product type definition
import Image from 'next/image'; // Import the Image component from Next.js for optimized image handling

interface Props {
  product: Product; // Define the Props interface with a product of type Product
}

// Define the ProductCard component
export const ProductCard = ({ product }: Props) => {
  return (
    <div className='max-w-sm overflow-hidden shadow-sm bg-white border-2 rounded-md'>
      {/* Container for the product image */}
      <div className='relative w-full h-48'>
        {/* Next.js Image component for optimized image loading */}
        <Image
          src={product.thumbnail} // Source URL for the product image
          alt={product.title} // Alt text for accessibility
          fill={true} // Ensures the image fills the container
          objectFit='contain' // Maintains aspect ratio while fitting the image within the container
        />
      </div>
      {/* Container for the product details */}
      <div className='px-6 py-4'>
        {/* Product title */}
        <div className='font-bold text-xl mb-2'>{product.title}</div>
        {/* Product category */}
        <p className='text-gray-700 text-base'>{product.category}</p>
        {/* Product price, formatted to two decimal places */}
        <p className='text-gray-900 text-lg font-semibold'>
          ${product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
