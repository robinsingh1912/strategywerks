interface Review {
  rating: number;
  comment: string;
  date: string; // ISO date string
  reviewerName: string;
  reviewerEmail: string;
}

// Interface for product dimensions
interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

// Interface for product metadata
interface Meta {
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  barcode: string;
  qrCode: string;
}

type Category =
  | 'beauty'
  | 'fragrances'
  | 'furniture'
  | 'groceries'
  | 'home-decoration'
  | 'kitchen-accessories'
  | 'laptops'
  | 'mens-shirts'
  | 'mens-shoes'
  | 'mens-watches'
  | 'mobile-accessories'
  | 'motorcycle'
  | 'skin-care'
  | 'smartphones'
  | 'sports-accessories'
  | 'sunglasses'
  | 'tablets'
  | 'tops'
  | 'vehicle'
  | 'womens-bags'
  | 'womens-dresses'
  | 'womens-jewellery'
  | 'womens-shoes'
  | 'womens-watches';

export interface Product {
  id: number;
  availabilityStatus: string;
  brand?: string;
  category: Category;
  description: string;
  dimensions: Dimensions;
  discountPercentage: number;
  images: string[];
  meta: Meta;
  minimumOrderQuantity: number;
  price: number;
  rating: number;
  returnPolicy: string;
  reviews: Review[];
  shippingInformation: string;
  sku: string;
  stock: number;
  tags: string[];
  thumbnail: string;
  title: string;
  warrantyInformation: string;
  weight: number;
}

// Define the type for the API response
export interface ProductResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}
