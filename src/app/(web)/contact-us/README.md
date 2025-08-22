# Contact Us Page

A comprehensive contact page that provides multiple ways for users to get in touch with Tiger Hawk, including a contact form, contact information, and FAQ section.

## Page Structure

### 🎯 Hero Section
- **Gradient Background**: Blue gradient with white text
- **Clear Call-to-Action**: "Get in touch with our team"
- **Professional Messaging**: Emphasizes help and support availability

### 📞 Contact Information Cards
Four key contact methods with color-coded icons:
- **Phone** (Blue) - Multiple phone numbers
- **Email** (Green) - Primary and support email addresses
- **Address** (Purple) - Complete business address
- **Business Hours** (Orange) - Operating hours for each day

### 📝 Contact Form
Comprehensive form with the following fields:
- **Full Name** (required)
- **Email Address** (required)
- **Phone Number** (optional)
- **Subject** (required dropdown with options)
- **Message** (required textarea)
- **Submit Button** with loading state

### 🗺️ Map & Additional Information
Right sidebar containing:
- **Map Placeholder**: Ready for Google Maps integration
- **Social Media Links**: Facebook, Twitter, Instagram, LinkedIn, WhatsApp
- **Quick Contact**: Direct links for phone, email, and WhatsApp

### ❓ FAQ Section
Common questions organized in two columns:
- **Shipping & Returns**: Shipping options, international shipping, return policy
- **Support & Services**: Technical support, bulk discounts, warranty information

### 🎯 Call-to-Action Section
- **Product Exploration**: Link to browse products
- **Direct Calling**: Phone number for immediate contact

## Features

### 📱 Contact Form Functionality
- **Form Validation**: Required field validation
- **API Integration**: Uses RTK Query mutation for form submission
- **Loading States**: Spinner during form submission
- **Success/Error Messages**: Toast notifications with detailed error handling
- **Form Reset**: Clears form after successful submission
- **Subject Categories**: Predefined options for better organization

### 🎨 Visual Design
- **Color-Coded Icons**: Each contact method has unique colors
- **Hover Effects**: Interactive elements with smooth transitions
- **Responsive Layout**: Adapts to all device sizes
- **Professional Styling**: Clean, modern design

### 🔗 Interactive Elements
- **Clickable Phone Numbers**: Direct dialing on mobile devices
- **Email Links**: Opens default email client
- **Social Media**: Opens in new tabs
- **WhatsApp Integration**: Direct messaging link

## Contact Information

### 📞 Phone Numbers
- **Main Line**: +1 234 567 8900
- **Support Line**: +1 234 567 8901

### 📧 Email Addresses
- **General Inquiries**: info@tigerhawk.com
- **Technical Support**: support@tigerhawk.com

### 🏢 Business Address
- **Street**: 123 Adventure St
- **City/State**: Outdoor City, OC 12345
- **Country**: United States

### ⏰ Business Hours
- **Monday - Friday**: 9:00 AM - 6:00 PM
- **Saturday**: 10:00 AM - 4:00 PM
- **Sunday**: Closed

## Social Media Integration

### 📱 Social Platforms
- **Facebook**: Company updates and community
- **Twitter**: News and announcements
- **Instagram**: Product photos and lifestyle content
- **LinkedIn**: Professional networking and business updates
- **WhatsApp**: Direct customer support

## API Integration

### 🔧 Backend Integration
The contact form is fully integrated with the backend API using RTK Query:

```typescript
// API Mutation Hook
const [createMessage, { isLoading: isCreatingMessage }] = useCreateMessageMutation()

// Form Submission
const response = await createMessage({
  name: formData.name,
  email: formData.email,
  phone: formData.phone,
  subject: formData.subject,
  message: formData.message
}).unwrap()
```

### 📤 Data Flow
1. **Form Validation**: Client-side validation of required fields
2. **API Call**: Sends data to `/messages` endpoint
3. **Response Handling**: Processes success/error responses
4. **User Feedback**: Shows appropriate toast notifications
5. **Form Reset**: Clears form on successful submission

### 🛡️ Error Handling
- **Validation Errors**: Shows specific field validation messages
- **Network Errors**: Handles API connection issues
- **Server Errors**: Displays server response error messages
- **Fallback**: Graceful degradation with user-friendly messages

## FAQ Content

### 🚚 Shipping & Delivery
- **Shipping Options**: Standard, express, and overnight
- **International Shipping**: Available to 25+ countries
- **Free Shipping**: Orders over $50

### 🔄 Returns & Warranty
- **Return Policy**: 30-day return window
- **Warranty Coverage**: Minimum 1-year warranty
- **Extended Warranty**: Available for select items

### 💼 Business Services
- **Bulk Orders**: Special pricing for large quantities
- **Technical Support**: 24-hour response time
- **Partnership Opportunities**: Business development inquiries

## Technical Implementation

### 🛠️ Technologies Used
- **Next.js**: React framework with App Router
- **TypeScript**: Type safety and better development
- **Tailwind CSS**: Utility-first styling
- **React Icons**: Consistent iconography
- **React Toastify**: User notifications

### 📦 Component Features
- **State Management**: Form data and submission states
- **Form Handling**: Controlled inputs with validation
- **API Integration**: Ready for backend form submission
- **Error Handling**: Graceful error management

### 🎨 Styling Approach
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Proper labels and ARIA attributes
- **Performance**: Optimized loading and interactions
- **User Experience**: Intuitive navigation and feedback

## Form Submission

### 📤 Current Implementation
- **Simulated API Call**: 1-second delay for demonstration
- **Success Feedback**: Toast notification on completion
- **Form Reset**: Clears all fields after submission
- **Error Handling**: Displays error message on failure

### 🔧 TODO: Backend Integration
To complete the functionality, add API integration:

```typescript
// Add to apiSlice.ts
submitContactForm: builder.mutation({
  query: (formData) => ({
    url: '/contact',
    method: 'POST',
    body: formData,
  }),
}),
```

## User Experience

### 🎯 User Journey
1. **Landing**: Hero section with clear value proposition
2. **Information Discovery**: Contact cards show all options
3. **Form Completion**: Easy-to-use contact form
4. **Additional Resources**: FAQ section for self-service
5. **Next Steps**: Clear calls-to-action

### 📱 Mobile Experience
- **Touch-Friendly**: Large buttons and form fields
- **Responsive Layout**: Optimized for small screens
- **Direct Actions**: One-tap calling and emailing
- **Fast Loading**: Optimized for mobile networks

## Future Enhancements

### 🚀 Potential Improvements
1. **Live Chat Integration**: Real-time customer support
2. **Google Maps**: Interactive map with directions
3. **Contact Form Validation**: Advanced field validation
4. **File Upload**: Attachment support for inquiries
5. **Multi-language Support**: International customer base
6. **Contact Preferences**: User communication preferences

### 📊 Analytics Integration
1. **Form Analytics**: Track form completion rates
2. **Contact Method Usage**: Monitor preferred contact methods
3. **FAQ Performance**: Identify common questions
4. **User Journey Tracking**: Understand customer paths

The Contact Us page provides a comprehensive solution for customer communication, combining multiple contact methods with a user-friendly interface and helpful resources. 