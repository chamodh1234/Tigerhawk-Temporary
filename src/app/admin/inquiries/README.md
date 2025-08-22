# Inquiries Management Page

This page provides a comprehensive interface for managing customer inquiries in the admin panel.

## Features

### 📊 Dashboard Overview
- **Total Inquiries**: Shows the total number of inquiries
- **Pending Inquiries**: Count of inquiries that haven't been responded to
- **Responded Inquiries**: Count of inquiries that have been marked as responded
- **Visual Stats Cards**: Color-coded cards with icons for easy identification

### 🔍 Filtering & Sorting
- **Status Filter**: Filter by All, Pending, or Responded inquiries
- **Date Sorting**: Inquiries are automatically sorted by creation date (newest first)
- **Real-time Updates**: Data refreshes automatically when actions are performed

### 📋 Inquiries List
- **Table View**: Clean, organized table displaying all inquiry information
- **Customer Information**: Name, email, phone number, and product ID
- **Message Preview**: Truncated message preview with full text available in modal
- **Status Indicators**: Color-coded badges showing Pending (yellow) or Responded (green)
- **Action Buttons**: View details and mark as responded

### 👁️ Detailed View Modal
- **Full Inquiry Details**: Complete customer information and message
- **Formatted Dates**: Human-readable creation and update timestamps
- **Status Management**: Mark inquiries as responded directly from the modal
- **Responsive Design**: Works well on all device sizes

## Data Structure

The inquiry object contains the following fields:
```typescript
interface Inquiry {
  id: number
  product_id: number
  name: string
  email: string
  phone: string
  message: string
  created_at: string
  updated_at: string
  deleted_at: string | null
  responded?: boolean
}
```

## API Integration

### Current Implementation
- **Query**: Uses `useGetProductsForInquiryQuery` to fetch inquiries
- **Data Source**: Fetches from `/inquiry` endpoint
- **Real-time Updates**: Refetches data after marking inquiries as responded

### TODO: Add Response Mutation
To complete the functionality, you'll need to add a mutation to mark inquiries as responded:

```typescript
// Add to apiSlice.ts
markInquiryAsResponded: builder.mutation({
  query: (inquiryId: number) => ({
    url: `/inquiry/${inquiryId}/respond`,
    method: 'POST',
  }),
  invalidatesTags: ['Inquiries'],
}),
```

## User Interface

### Color Scheme
- **Blue**: Total inquiries and view actions
- **Yellow**: Pending inquiries and status
- **Green**: Responded inquiries and success actions
- **Gray**: Neutral elements and disabled states

### Icons Used
- **FaComments**: Inquiries and messages
- **FaClock**: Pending status
- **FaCheck**: Responded status and actions
- **FaUser**: Customer information
- **FaEye**: View details action

## Responsive Design

The page is fully responsive and works on:
- **Desktop**: Full table view with all columns
- **Tablet**: Optimized layout with scrollable table
- **Mobile**: Stacked layout with touch-friendly buttons

## Error Handling

- **Loading States**: Spinner while fetching data
- **Error States**: User-friendly error messages
- **Empty States**: Helpful messages when no inquiries are found
- **Toast Notifications**: Success/error feedback for user actions

## Future Enhancements

1. **Bulk Actions**: Select multiple inquiries for batch operations
2. **Search Functionality**: Search inquiries by customer name, email, or message
3. **Export Features**: Export inquiries to CSV/PDF
4. **Email Integration**: Send responses directly from the interface
5. **Advanced Filtering**: Filter by date range, product, or status
6. **Analytics**: Charts and graphs showing inquiry trends

## Usage

1. **View Inquiries**: All inquiries are displayed in a table format
2. **Filter**: Use the status filter to view specific inquiry types
3. **View Details**: Click the eye icon to see full inquiry information
4. **Mark as Responded**: Click the check icon to mark inquiries as responded
5. **Monitor Stats**: Use the dashboard cards to track inquiry status

The page provides a complete solution for managing customer inquiries with an intuitive interface and robust functionality. 