import { Product } from '@/types'; // Import the Product type definition for type safety
import { useState } from 'react'; // Import useState hook from React for managing state

// Custom hook to manage the state of a product modal
export function useProductModal() {
  // State to hold the current product; initialized to null
  const [product, setProduct] = useState<null | Product>(null);

  // Return an object containing:
  // - isOpen: A boolean indicating if the modal should be open (true if product is not null)
  // - product: The current product object
  // - setProduct: Function to update the product state
  return {
    isOpen: product !== null, // Modal is open if a product is set
    product, // The current product being viewed or edited
    setProduct, // Function to set the current product
  };
}
