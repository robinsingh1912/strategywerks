# Project Name

Strategy werks

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on github pages

[Github Pages Link]("robinsingh1912.github.io/strategywerks/")

## Overview

This project is a comprehensive web application built using Next.js, React, and TypeScript. It features a product catalog with filtering, sorting, and detailed views, leveraging modern web development practices and tools.

## Design Decisions

- **Next.js Framework**: Chosen for its robust server-side rendering capabilities and ease of integration with React. It enhances SEO and performance by pre-rendering pages.
- **TypeScript**: Used for type safety and improved developer experience, reducing runtime errors and enhancing code maintainability.

- **Component-Based Architecture**: Utilizes React's component-based design to promote reusability and modularity. Each component is self-contained with its own logic and styles.

## Patterns Used

- **Custom Hooks**: Implemented custom hooks like `useOutsideClick` and `useElementOnScreen` to encapsulate reusable logic, improving code readability and maintainability.

- **Lazy Loading**: Utilized React's `React.lazy` and `Suspense` for lazy loading components, optimizing initial load times by deferring the loading of non-critical components.

- **Intersection Observer**: Used in `useElementOnScreen` to efficiently detect when elements enter or leave the viewport, enhancing user experience with infinite scrolling.

## Optimizations Applied

- **Code Splitting**: Employed code splitting to load only the necessary code for each page, reducing initial load times and improving performance.

- **Caching**: Implemented caching strategies with `@tanstack/react-query` to minimize redundant network requests and improve data retrieval times.

- **Responsive Design**: Ensured the application is fully responsive, providing an optimal user experience across a range of devices and screen sizes.

## Known Limitations

- **Scalability**: The current architecture may face challenges when scaling to a large number of users or data. Future iterations could explore more scalable solutions such as microservices or serverless architecture.

- **Testing Coverage**: While unit tests are implemented, integration and end-to-end testing coverage could be improved to ensure robustness across all application layers.

## Future Enhancements

- **Internationalization**: Add support for multiple languages to cater to a broader audience.

- **Accessibility Improvements**: Enhance accessibility features to ensure the application is usable by individuals with disabilities, following WCAG guidelines.

- **Improved Error Messaging**: Enhance the user experience by implementing user-friendly error messages that provide clear and actionable guidance. Instead of generic error codes, display messages that explain the issue in simple terms and suggest possible solutions or next steps. For example, replace "Error 500" with "We're experiencing technical difficulties. Please try refreshing the page or contact support if the issue persists."

- **Error Boundary Integration**: Utilize React's Error Boundaries to gracefully handle JavaScript errors in the component tree. This approach prevents the entire application from crashing and allows for a fallback UI to be displayed. Implementing an error boundary involves wrapping critical components or the entire application with a boundary component that catches errors and displays a user-friendly message. This not only improves the robustness of the application but also enhances the user experience by maintaining a consistent interface even in the face of errors.

  Example Implementation:

  ```typescript
  import React from 'react';

  class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError(error: Error) {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error('Error caught by ErrorBoundary:', error, errorInfo);
      // Optionally log error to an external service
    }

    render() {
      if (this.state.hasError) {
        return <h1>Something went wrong. Please try again later.</h1>;
      }

      return this.props.children;
    }
  }

  export default ErrorBoundary;
  ```

## Installation

To get started with the project, follow these steps:

```bash
# Clone the repository
git clone https://github.com/robinsingh1912/strategywerks.git

# Navigate into the project directory
cd strategywerks

# Install dependencies
npm install --legacy-peer-deps

# Run the development server
npm run dev
```
