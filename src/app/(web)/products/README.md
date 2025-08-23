# Products Page Implementation

This directory contains the products page implementation with RTK Query mutations for cart and favourites functionality.

## Features

### Products Page (`page.tsx`)
- **Search Functionality**: Real-time search through product names and descriptions
- **Category Filtering**: Filter by main categories and sub-categories
- **Sorting**: Sort products by name, price, or discount (ascending/descending)
- **Pagination**: Display 12 products per page with navigation
- **Responsive Design**: Grid layout that adapts to different screen sizes
- **Loading States**: Proper loading indicators while fetching data
- **Error Handling**: User-friendly error messages

### Product Card Component (`components/ProductCard.tsx`)
- **RTK Query Mutations**: Uses RTK Query for all cart and favourites operations
- **Add/Remove Cart**: Toggle products in/out of cart with API calls
- **Add/Remove Favourites**: Toggle products in/out of favourites with API calls
- **Buy Now**: Add to cart and redirect to checkout page
- **View Details**: Navigate to individual product page
- **Real-time State**: Shows current cart/favourites status
- **Loading States**: Disabled buttons during API calls
- **Toast Notifications**: Success/error feedback for user actions

## API Integration

### Cart Operations
- `useAddToCartMutation()`: Add products to cart
- `useRemoveFromCartMutation()`: Remove products from cart
- `useGetCartQuery()`: Fetch current cart items

### Favourites Operations
- `useCreateFavouriteMutation()`: Add products to favourites
- `useRemoveFromFavouritesMutation()`: Remove products from favourites
- `useGetFavouritesQuery()`: Fetch current favourites

### Product Data
- `useGetProductsQuery()`: Fetch all products
- `useGetMainCategoriesQuery()`: Fetch main categories for filtering
- `useGetSubCategoriesQuery()`: Fetch sub categories for filtering

## State Management

The implementation uses RTK Query for server state management, which provides:
- Automatic caching and invalidation
- Loading and error states
- Optimistic updates
- Background refetching

## UI/UX Features

- **Responsive Grid**: Adapts from 1 column on mobile to 4 columns on desktop
- **Hover Effects**: Smooth transitions and visual feedback
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Toast Notifications**: User feedback for all actions
- **Loading Indicators**: Spinners during API calls
- **Empty States**: Helpful messages when no products are found

## Dependencies

- `@reduxjs/toolkit/query/react`: RTK Query for API calls
- `react-toastify`: Toast notifications
- `react-icons`: Icons for UI elements
- `next/navigation`: Client-side navigation
- `tailwindcss`: Styling

## Usage

The products page is accessible at `/products` and provides a complete e-commerce browsing experience with filtering, search, and cart/favourites functionality. 