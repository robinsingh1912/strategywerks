import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductCard } from './ProductCard'; // Adjust the import path as necessary
import { Product } from '@/types';

// Mock the next/image component for testing purposes
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe('ProductCard Component', () => {
  const product: Product = {
    id: 31,
    title: 'Lemon',
    description:
      'Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.',
    category: 'groceries',
    price: 0.79,
    discountPercentage: 17.81,
    rating: 4.25,
    stock: 0,
    tags: ['fruits'],
    sku: 'J074TE3H',
    weight: 10,
    dimensions: {
      width: 25.97,
      height: 27.47,
      depth: 6.31,
    },
    warrantyInformation: '3 year warranty',
    shippingInformation: 'Ships in 1 week',
    availabilityStatus: 'Out of Stock',
    reviews: [
      {
        rating: 4,
        comment: 'Highly recommended!',
        date: '2024-05-23T08:56:21.620Z',
        reviewerName: 'Lucas Gray',
        reviewerEmail: 'lucas.gray@x.dummyjson.com',
      },
      {
        rating: 5,
        comment: 'Great product!',
        date: '2024-05-23T08:56:21.620Z',
        reviewerName: 'Henry Hill',
        reviewerEmail: 'henry.hill@x.dummyjson.com',
      },
      {
        rating: 4,
        comment: 'Awesome product!',
        date: '2024-05-23T08:56:21.620Z',
        reviewerName: 'Elena Long',
        reviewerEmail: 'elena.long@x.dummyjson.com',
      },
    ],
    returnPolicy: '90 days return policy',
    minimumOrderQuantity: 1,
    meta: {
      createdAt: '2024-05-23T08:56:21.620Z',
      updatedAt: '2024-05-23T08:56:21.620Z',
      barcode: '6364178053480',
      qrCode: 'https://assets.dummyjson.com/public/qr-code.png',
    },
    images: ['https://cdn.dummyjson.com/products/images/groceries/Lemon/1.png'],
    thumbnail:
      'https://cdn.dummyjson.com/products/images/groceries/Lemon/thumbnail.png',
    brand: '',
  };

  test('renders product image correctly', () => {
    render(<ProductCard product={product} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', product.thumbnail);
    expect(image).toHaveAttribute('alt', product.title);
  });

  test('renders product title correctly', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(product.title)).toBeInTheDocument();
  });

  test('renders product category correctly', () => {
    render(<ProductCard product={product} />);
    expect(screen.getByText(product.category)).toBeInTheDocument();
  });

  test('renders product price correctly', () => {
    render(<ProductCard product={product} />);
    expect(
      screen.getByText(`$${product.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });
});
