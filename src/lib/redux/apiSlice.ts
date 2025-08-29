import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { RootState } from './store'
import type { ApiResponse } from '../types/api'
import type { MainCategory, SubCategory } from '../../app/admin/products/page'
import type { Product } from '../types/product'
import type { Order, OrderStatusUpdate } from '../types/order'
import { setCookie } from '../utils/cookie'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ['User', 'Dashboard', 'Auth', 'Favourites', 'Cart', 'Orders', 'EmailSettings', 'Reviews','Messages', 'Products', 'Inquiries', 'Gallery' ],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials,
      }),
      transformResponse: (response: any) => {
        if (response.success) {
          setCookie(response?.data?.token, response?.data?.user?.name, response?.data?.user?.id)
        }
        return response
      },
      invalidatesTags: ['Auth'],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: ['Auth'],
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/logout',
        method: 'POST',
      }),
      invalidatesTags: ['Auth', 'User'],
    }),
    checkValidUser: builder.query({
      query: () => '/check-valid-user',
      providesTags: ['Auth'],
    }),


    // User endpoints
    getUserProfile: builder.query({
      query: () => '/user',
      providesTags: ['User'],
    }),
    updateUserProfile: builder.mutation({
      query: (profileData) => ({
        url: '/user/profile',
        method: 'PUT',
        body: profileData,
      }),
      invalidatesTags: ['User'],
    }),
    updateUserBioData: builder.mutation({
      query: (bioData) => ({
        url: '/users/update-profile',
        method: 'POST',
        body: bioData,
      }),
      invalidatesTags: ['User'],
    }),
    updateUserAddress: builder.mutation({
      query: (addressData) => ({
        url: '/users/update-address',
        method: 'POST',
        body: addressData,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: builder.mutation({
      query: (passwordData) => ({
        url: '/users/update-password',
        method: 'POST',
        body: passwordData,
      }),
      invalidatesTags: ['User'],
    }),
    getUserPreferences: builder.query({
      query: () => '/users/preferences',
      providesTags: ['User'],
    }),
    updateUserPreferences: builder.mutation({
      query: (preferencesData) => ({
        url: '/users/email-preferences',
        method: 'POST',
        body: preferencesData,
      }),
      invalidatesTags: ['User'],
    }),
    getEmailSettings: builder.query({
      query: () => '/mail-settings',
      providesTags: ['EmailSettings'],
    }),
    updateEmailSettings: builder.mutation({
      query: (emailSettings) => ({
        url: '/update-mail-settings',
        method: 'POST',
        body: emailSettings,
      }),
      invalidatesTags: ['EmailSettings'],
    }),
    testEmailSettings: builder.mutation({
      query: (testData) => ({
        url: '/test-mail',
        method: 'POST',
        body: testData,
      }),
    }),
    getProductReviews: builder.query({
      query: (productId) => `/reviews/${productId}`,
      providesTags: (result, error, productId) => [{ type: 'Reviews', id: productId }],
    }),
    createProductReview: builder.mutation({
      query: ({ reviewData }) => ({
        url: `/reviews`,
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: 'Reviews', id: productId }],
    }),
    updateProductReview: builder.mutation({
      query: ({ reviewId, reviewData }) => ({
        url: `/reviews/${reviewId}`,
        method: 'POST',
        body: reviewData,
      }),
      invalidatesTags: (result, error, { productId }) => [{ type: 'Reviews', id: productId }],
    }),
    getProductsForInquiry: builder.query({
      query: () => '/products/inquiry/list',
      providesTags: ['Products'],
    }),
    getInquiries: builder.query({
      query: () => '/inquiry',
      providesTags: ['Inquiries'],
    }),
    submitInquiry: builder.mutation({
      query: (inquiryData) => ({
        url: '/inquiry',
        method: 'POST',
        body: inquiryData,
      }),
    }),
    updateInquiry: builder.mutation({
      query: (inquiryData) => ({
        url: `/inquiry/${inquiryData.id}`,
        method: 'POST',
        body: { marked: inquiryData.marked },
      }),
    }),

    // Main Category endpoints
    createMainCategory: builder.mutation({
      query: (formData: FormData) => {
        return {
          url: '/main-categories',
          method: 'POST',
          body: formData,
          // Do not set Content-Type for FormData; browser will set it with boundary
        }
      },
    }),
    updateMainCategory: builder.mutation<{ success: boolean }, { id: string, data: FormData }>({
      query: ({ id, data }) => ({
        url: `/main-categories/${id}`,
        method: 'POST',
        body: data,
        // Don't set content-type for FormData
      }),
    }),
    getMainCategories: builder.query({
      query: () => '/main-categories',
    }),
    getSubCategories: builder.query({
      query: () => '/sub-categories',
    }),
    deleteMainCategory: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/main-categories/${id}`,
        method: 'DELETE',
      }),
    }),

    // Sub Category endpoints
    createSubCategory: builder.mutation({
      query: (data: { name: string; image: File; mainCategoryId: string }) => {
        const formData = new FormData()
        formData.append('name', data.name)
        formData.append('main_category_id', data.mainCategoryId)
        if (data.image) formData.append('image', data.image)
        return {
          url: '/sub-categories',
          method: 'POST',
          body: formData,
        }
      },
    }),
    updateSubCategory: builder.mutation<{ success: boolean }, { id: string, data: SubCategory }>({
      query: ({ id, data }: { id: string, data: SubCategory }) => {
        const formData = new FormData()
        console.log(data)
        formData.append('name', data?.name)
        formData.append('main_category_id', data?.main_category_id)
        if (data?.image) formData.append('image', data?.image)
        return {
          url: `/sub-categories/${id}`,
          method: 'POST',
          body: formData,
          // Don't set content-type for FormData
        }

      },
    }),
    deleteSubCategory: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/sub-categories/${id}`,
        method: 'DELETE',
      }),
    }),

    // Product endpoints
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProductById: builder.query({
      query: (id: string) => `/products/${id}`,
    }),
    getFavourites: builder.query({
      query: () => '/favourites',
      providesTags: ['Favourites'],
    }),
    removeFromFavourites: builder.mutation({
      query: (favouriteId: string) => ({
        url: `/favourites/${favouriteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Favourites'],
    }),
    createFavourite: builder.mutation({
      query: (productId: string) => ({
        url: '/favourites',
        method: 'POST',
        body: { product_id: productId },
      }),
      invalidatesTags: ['Favourites'],
    }),
    // Cart endpoints
    getCart: builder.query({
      query: () => '/cart',
      providesTags: ['Cart'],
    }),
    addToCart: builder.mutation({
      query: (data: { product_id: string, quantity: number, price_at_time: number }) => ({
        url: '/cart',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeFromCart: builder.mutation({
      query: (cartItemId: string) => ({
        url: `/cart/${cartItemId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
    updateCartItem: builder.mutation({
      query: ({ cartItemId, quantity }: { cartItemId: string, quantity: number }) => ({
        url: `/cart/${cartItemId}`,
        method: 'POST',
        body: { quantity },
      }),
      invalidatesTags: ['Cart'],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }: {
        id: string, data: {
          productID: string
          name: string
          description: string
          Price: number
          mainCategory: string | number
          subCategory: string | number
          image: File[]
          discount: number
          productFeatures: Array<{
            specification: string
            tiger_hawk: string
            typical_torch: string
          }>
          AditionalFeatures: string[]
        }
      }) => {
        const formData = new FormData()
        formData.append('product_id', data.productID)
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.Price.toString())
        formData.append('main_category', data.mainCategory.toString())
        formData.append('sub_category', data.subCategory.toString())
        formData.append('discount', data.discount.toString())
        data.productFeatures.forEach((feature, index) => {
          formData.append(`product_features[${index}][specification]`, feature.specification)
          formData.append(`product_features[${index}][tiger_hawk]`, feature.tiger_hawk)
          formData.append(`product_features[${index}][typical_torch]`, feature.typical_torch)
        })
        data.AditionalFeatures.forEach((feature, index) => {
          formData.append(`additional_features[${index}]`, feature)
        })

        // Handle multiple images
        data.image.forEach((file, index) => {
          formData.append(`images[${index}]`, file)
        })

        return {
          url: `/products/${id}`,
          method: 'POST',
          body: formData,
        }
      },
    }),
    createProduct: builder.mutation({
      query: (data: {
        productID: string
        name: string
        description: string
        Price: number
        mainCategory: string | number
        subCategory: string | number
        image: File[]
        discount: number
        productFeatures: Array<{
          specification: string
          tiger_hawk: string
          typical_torch: string
        }>
        AditionalFeatures: string[]
      }) => {
        const formData = new FormData()
        formData.append('product_id', data.productID)
        formData.append('name', data.name)
        formData.append('description', data.description)
        formData.append('price', data.Price.toString())
        formData.append('main_category', data.mainCategory.toString())
        formData.append('sub_category', data.subCategory.toString())
        formData.append('discount', data.discount.toString())
        data.productFeatures.forEach((feature, index) => {
          formData.append(`product_features[${index}][specification]`, feature.specification)
          formData.append(`product_features[${index}][tiger_hawk]`, feature.tiger_hawk)
          formData.append(`product_features[${index}][typical_torch]`, feature.typical_torch)
        })
        data.AditionalFeatures.forEach((feature, index) => {
          formData.append(`additional_features[${index}]`, feature)
        })

        // Handle multiple images
        // Append images as an array: image[]
        data.image.forEach((file, index) => {
          formData.append(`images[${index}]`, file)
        })
        return {
          url: '/products',
          method: 'POST',
          body: formData,
        }
      },
    }),

    removeProductFeature: builder.mutation<{ success: boolean; data?: any; message?: string }, { productId: string; featureIndex: number }>({
      query: ({ productId, featureIndex }) => ({
        url: `/products/${productId}/features/${featureIndex}`,
        method: 'DELETE',
      }),
    }),

    removeAdditionalFeature: builder.mutation<{ success: boolean; data?: string[] }, { productId: string; featureIndex: number }>({
      query: ({ productId, featureIndex }) => ({
        url: `/products/${productId}/additional-features/${featureIndex}`,
        method: 'DELETE',
      }),
    }),

    removeProductImage: builder.mutation<{ success: boolean; data?: { remaining_images: any[] } }, { productId: string; imageIndex: number }>({
      query: ({ productId, imageIndex }) => ({
        url: `/products/${productId}/images/${imageIndex}`,
        method: 'DELETE',
      }),
    }),

    // Orders endpoints
    getOrders: builder.query<any, void>({
      query: () => '/orders',
      providesTags: ['Orders'],
    }),
    updateOrderStatus: builder.mutation<any, OrderStatusUpdate>({
      query: ({ orderId, status }) => ({
        url: `/orders/${orderId}/status`,
        method: 'POST',
        body: { status },
      }),
      invalidatesTags: ['Orders'],
    }),

    getMessages: builder.query<any, void>({
      query: () => '/messages',
      providesTags: ['Messages'],
    }),
    getMessageById: builder.query({ 
      query: (id: string) => `/messages/${id}`,
    }),
    createMessage: builder.mutation({
      query: (message) => ({
        url: '/messages',
        method: 'POST',
        body: message,
        providesTags: ['Messages'],
      }),
    }),
    replyToMessage: builder.mutation({
      query: (message) => ({
        url: `/messages/${message.id}/reply`,
        method: 'POST',
        body: message,
        providesTags: ['Messages'],
      }),
    }),
    updateMessageStatus: builder.mutation({
      query: (message) => ({
        url: `/messages/${message.id}/mark-as-read`,
        method: 'POST',
        body: message,
        providesTags: ['Messages'],
      }),
    }),
    updateMessage: builder.mutation({
      query: (message) => ({
        url: `/messages/${message.id}`,
        method: 'POST',
        body: message,
        providesTags: ['Messages'],
      }),
    }),
    deleteMessage: builder.mutation({
      query: (id: string) => ({
        url: `/messages/${id}`,
        method: 'DELETE',
        providesTags: ['Messages'],
      }),
    }),
    //Dashboard endpoints
    getDashboardData: builder.query({
      query: () => '/dashboard',
      providesTags: ['Dashboard'],
    }),
    getDashboardResentSales: builder.query({
      query: () => '/dashboard/resent-sales',
      providesTags: ['Dashboard'],
    }),
    getDashboardTopProducts: builder.query({
      query: () => '/dashboard/top-selling-products',
      providesTags: ['Dashboard'],
    }),


    getProductImagesForGallery: builder.query({
      query: () => '/products/images/gallery',
      providesTags: ['Gallery'],
    }), 

    // Message endpoints

  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
  useUpdateUserBioDataMutation,
  useUpdateUserAddressMutation,
  useChangePasswordMutation,
  useGetUserPreferencesQuery,
  useUpdateUserPreferencesMutation,
  useGetEmailSettingsQuery,
  useUpdateEmailSettingsMutation,
  useTestEmailSettingsMutation,
  useGetProductReviewsQuery,
  useCreateProductReviewMutation,
  useUpdateProductReviewMutation,
  useGetProductsForInquiryQuery,
  useSubmitInquiryMutation,
  useUpdateInquiryMutation,
  useCreateMainCategoryMutation,
  useUpdateMainCategoryMutation,
  useGetMainCategoriesQuery,
  useGetSubCategoriesQuery,
  useDeleteMainCategoryMutation,
  useCreateSubCategoryMutation,
  useUpdateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetFavouritesQuery,
  useRemoveFromFavouritesMutation,
  useCreateFavouriteMutation,
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useUpdateCartItemMutation,
  useUpdateProductMutation,
  useCreateProductMutation,
  useRemoveProductFeatureMutation,
  useRemoveAdditionalFeatureMutation,
  useRemoveProductImageMutation,
  useGetOrdersQuery,
  useUpdateOrderStatusMutation,
  useCheckValidUserQuery,
  useGetDashboardDataQuery,
  useGetDashboardResentSalesQuery,
  useGetDashboardTopProductsQuery,
  useGetMessagesQuery,
  useGetMessageByIdQuery,
  useCreateMessageMutation,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
  useUpdateMessageStatusMutation,
  useReplyToMessageMutation,
  useGetInquiriesQuery,
  useGetProductImagesForGalleryQuery,
} = apiSlice 