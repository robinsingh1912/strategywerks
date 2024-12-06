import { Product } from '@/types'; // Import the Product type definition for type safety
import Image from 'next/image'; // Import Next.js Image component for optimized image handling

interface Props {
  product: Product | null; // Define the Props interface with a nullable product of type Product
}

// Define the ProductModal component
export function ProductModal({ product }: Props) {
  // If no product is provided, return null to render nothing
  if (!product) return null;

  return (
    <div>
      {/* Display the product title */}
      <h2 className='text-2xl font-bold mt-4'>{product.title}</h2>

      {/* Container for the product image */}
      <div className='relative w-full h-48'>
        {/* Next.js Image component for optimized image loading */}
        <Image
          src={product.images[0]} // Source URL for the first product image
          alt={product.title} // Alt text for accessibility
          fill={true} // Ensures the image fills the container
          objectFit='contain' // Maintains aspect ratio while fitting the image within the container
        />
      </div>

      {/* Display the product description */}
      <p className='text-gray-700 mt-2'>{product.description}</p>

      {/* Display the product price, formatted to two decimal places */}
      <p className='text-gray-900 font-semibold mt-4'>
        ${product.price.toFixed(2)}
      </p>

      {/* Display the product category */}
      <p className='text-gray-600 mt-1'>Category: {product.category}</p>

      {/* Display the product availability status */}
      <p className='text-green-600 mt-1'>
        Availability: {product.availabilityStatus}
      </p>
    </div>
  );
}
