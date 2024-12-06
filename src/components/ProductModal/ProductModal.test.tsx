import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProductModal } from './ProductModal'; // Adjust the import path as necessary
import { Product } from '@/types';

// Mock the next/image component for testing purposes
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
}));

describe('ProductModal Component', () => {
  const product: Product = {
    id: 34,
    title: 'Nescafe Coffee',
    description:
      'Quality coffee from Nescafe, available in various blends for a rich and satisfying cup.',
    category: 'groceries',
    price: 7.99,
    discountPercentage: 11.65,
    rating: 2.54,
    stock: 22,
    tags: ['beverages', 'coffee'],
    sku: 'FP5H3065',
    weight: 9,
    dimensions: {
      width: 11.21,
      height: 24.54,
      depth: 15.05,
    },
    warrantyInformation: 'No warranty',
    shippingInformation: 'Ships in 3-5 business days',
    availabilityStatus: 'In Stock',
    reviews: [
      {
        rating: 4,
        comment: 'Great product!',
        date: '2024-05-23T08:56:21.621Z',
        reviewerName: 'Nolan Gonzalez',
        reviewerEmail: 'nolan.gonzalez@x.dummyjson.com',
      },
      {
        rating: 4,
        comment: 'Very pleased!',
        date: '2024-05-23T08:56:21.621Z',
        reviewerName: 'Carter Baker',
        reviewerEmail: 'carter.baker@x.dummyjson.com',
      },
      {
        rating: 4,
        comment: 'Highly impressed!',
        date: '2024-05-23T08:56:21.621Z',
        reviewerName: 'Emily Johnson',
        reviewerEmail: 'emily.johnson@x.dummyjson.com',
      },
    ],
    returnPolicy: '30 days return policy',
    minimumOrderQuantity: 8,
    meta: {
      createdAt: '2024-05-23T08:56:21.621Z',
      updatedAt: '2024-05-23T08:56:21.621Z',
      barcode: '8923332839320',
      qrCode: 'https://assets.dummyjson.com/public/qr-code.png',
    },
    images: [
      'https://cdn.dummyjson.com/products/images/groceries/Nescafe%20Coffee/1.png',
    ],
    thumbnail:
      'https://cdn.dummyjson.com/products/images/groceries/Nescafe%20Coffee/thumbnail.png',
  };

  test('renders product title correctly', () => {
    render(<ProductModal product={product} />);
    expect(screen.getByText(product.title)).toBeInTheDocument();
  });

  test('renders product image correctly', () => {
    render(<ProductModal product={product} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', product.images[0]);
    expect(image).toHaveAttribute('alt', product.title);
  });

  test('renders product description correctly', () => {
    render(<ProductModal product={product} />);
    expect(screen.getByText(product.description)).toBeInTheDocument();
  });

  test('renders product price correctly', () => {
    render(<ProductModal product={product} />);
    expect(
      screen.getByText(`$${product.price.toFixed(2)}`)
    ).toBeInTheDocument();
  });

  test('renders product category correctly', () => {
    render(<ProductModal product={product} />);
    expect(
      screen.getByText(`Category: ${product.category}`)
    ).toBeInTheDocument();
  });

  test('renders product availability status correctly', () => {
    render(<ProductModal product={product} />);
    expect(
      screen.getByText(`Availability: ${product.availabilityStatus}`)
    ).toBeInTheDocument();
  });

  test('does not render when product is null', () => {
    render(<ProductModal product={null} />);
    expect(screen.queryByText('Sample Product')).not.toBeInTheDocument();
  });
});
