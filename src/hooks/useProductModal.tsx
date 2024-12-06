import { Product } from '@/types';
import { useState } from 'react';

export function useProductModal() {
  const [product, setProduct] = useState<null | Product>(null);

  return {
    isOpen: product !== null,
    product,
    setProduct,
  };
}
