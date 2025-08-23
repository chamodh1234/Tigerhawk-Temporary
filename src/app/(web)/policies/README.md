# Policies Dynamic Page

This directory contains the dynamic policy pages that render different policy content based on the URL parameter.

## Available Policy Routes

The dynamic page supports the following policy types based on the `[id]` parameter:

### 1. Privacy Policy
- **Route**: `/policies/privacy-policy`
- **Icon**: User Shield (Blue)
- **Content**: Information collection, usage, sharing, security, and user rights

### 2. Terms & Conditions
- **Route**: `/policies/terms-conditions`
- **Icon**: File Contract (Green)
- **Content**: Acceptance of terms, use license, product information, pricing, liability, and governing law

### 3. Shipping Policy
- **Route**: `/policies/shipping-policy`
- **Icon**: Truck (Orange)
- **Content**: Processing time, shipping methods, destinations, tracking, and delivery issues

### 4. Return Policy
- **Route**: `/policies/return-policy`
- **Icon**: Undo (Red)
- **Content**: Return window, process, non-returnable items, refund information, and exchanges

### 5. Payment Policy
- **Route**: `/policies/payment-policy`
- **Icon**: Credit Card (Purple)
- **Content**: Accepted payment methods, security, billing information, processing, and currency

## Features

### Dynamic Content Rendering
- **URL-based routing**: Content changes based on the `[id]` parameter
- **TypeScript interfaces**: Proper typing for policy content structure
- **Icon mapping**: Each policy has a unique icon and color scheme
- **Last updated dates**: Shows when each policy was last modified

### User Experience
- **Clean layout**: Professional design with proper spacing and typography
- **Responsive design**: Works well on all device sizes
- **Error handling**: Shows 404 page for invalid policy IDs
- **Contact information**: Footer with support email for questions

### Content Structure
Each policy includes:
- **Title**: Clear policy name
- **Icon**: Visual representation with color coding
- **Last updated**: Date of last modification
- **Sections**: Organized content with headings and lists
- **Contact info**: Support email for questions

## Usage Examples

```typescript
// Navigate to privacy policy
router.push('/policies/privacy-policy')

// Navigate to terms & conditions
router.push('/policies/terms-conditions')

// Navigate to shipping policy
router.push('/policies/shipping-policy')

// Navigate to return policy
router.push('/policies/return-policy')

// Navigate to payment policy
router.push('/policies/payment-policy')
```

## Adding New Policies

To add a new policy:

1. **Add to policies object** in the component
2. **Define the content structure** with title, icon, lastUpdated, and content
3. **Create the route** by accessing `/policies/[new-policy-id]`

Example:
```typescript
'new-policy': {
  title: 'New Policy',
  icon: <FaIcon className="text-color" />,
  lastUpdated: 'December 15, 2024',
  content: (
    <div className="space-y-6">
      <section>
        <h3 className="text-xl font-semibold text-gray-900 mb-3">Section Title</h3>
        <p className="text-gray-700">Content here...</p>
      </section>
    </div>
  )
}
```

## Styling

The page uses Tailwind CSS classes for consistent styling:
- **Background**: Gray-50 background with white content cards
- **Typography**: Proper heading hierarchy and readable text
- **Spacing**: Consistent padding and margins
- **Shadows**: Subtle shadows for depth
- **Colors**: Semantic color coding for different policy types

## Error Handling

- **Invalid routes**: Shows 404 page with helpful message
- **Missing content**: Graceful fallback for undefined policies
- **Navigation**: Easy return to home page from error state 