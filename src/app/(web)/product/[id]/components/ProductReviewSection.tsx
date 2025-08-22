"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'
import { useGetProductReviewsQuery, useCreateProductReviewMutation, useUpdateProductReviewMutation } from '@/lib/redux/apiSlice'
import type { Review, CreateReviewRequest, UpdateReviewRequest } from '@/lib/types/review'

interface Breakdown {
  [key: number]: number
}

interface Product {
  id: string
  name: string
  rating: number
  reviewCount: number
}

interface ProductReviewSectionProps {
  product: Product
}

// Default review summary structure
const defaultReviewSummary = {
  average: 0,
  total: 0,
  breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  stars: [
    {star: 5, count: 0},
    {star: 4, count: 0},
    {star: 3, count: 0},
    {star: 2, count: 0},
    {star: 1, count: 0},
  ]
}

// Helper function to format date
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const ProductReviewSection = ({ product }: ProductReviewSectionProps) => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [form, setForm] = useState({
    user_name: '',
    rating: 0,
    comment: '',
  })
  const [submitting, setSubmitting] = useState(false)

  // API hooks
  const { data: reviewsData, isLoading: reviewsLoading, error: reviewsError } = useGetProductReviewsQuery(product.id)
  const [createReview, { isLoading: creatingReview }] = useCreateProductReviewMutation()
  const [updateReview, { isLoading: updatingReview }] = useUpdateProductReviewMutation()
  const [userId, setUserId] = useState<string | null>(null)
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState({
    title: '',
    rating: 0,
    comment: ''
  })

  // Update reviews when API data is fetched
  useEffect(() => {
    if (reviewsData?.data) {
      setReviews(reviewsData.data)
    }
  }, [reviewsData])

  useEffect(() => {
    const user = localStorage?.getItem('uid')
    if (user) {
      setUserId(user)
    }
  }, [])

  // Calculate review summary from API data or use defaults
  const reviewSummary = reviewsData?.summary ? {
    average: reviewsData.summary.average_rating || product.rating,
    total: reviewsData.summary.total_reviews || 0,
    stars: [
      {star: 5, count: reviewsData.summary.rating_distribution.star_5 || 0},
      {star: 4, count: reviewsData.summary.rating_distribution.star_4 || 0},
      {star: 3, count: reviewsData.summary.rating_distribution.star_3 || 0},
      {star: 2, count: reviewsData.summary.rating_distribution.star_2 || 0},
      {star: 1, count: reviewsData.summary.rating_distribution.star_1 || 0},
    ],
    breakdown: reviewsData.summary.rating_breakdown || defaultReviewSummary.breakdown,
  } : defaultReviewSummary

  // Remove infinite scrolling since we're using API

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleEditFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
  }

  function handleEditStarClick(star: number) {
    setEditForm(f => ({
        ...f,
        rating: f.rating === star ? star - 1 : star
      }))
  }

  function handleEditClick(review: Review) {
    setEditingReviewId(review.id)
    setEditForm({
      title: review.title,
      rating: review.rating,
      comment: review.comment
    })
  }

  function handleCancelEdit() {
    setEditingReviewId(null)
    setEditForm({ title: '', rating: 0, comment: '' })
  }

  async function handleSaveEdit() {
    if (!editingReviewId || !editForm.comment.trim() || editForm.rating < 1) {
      toast.error('Please fill all fields and select a rating.')
      return
    }

    try {
      const reviewData: UpdateReviewRequest = {
        title: editForm.title,
        rating: editForm.rating,
        comment: editForm.comment,
      }
      
      const result = await updateReview({ reviewId: editingReviewId, reviewData }).unwrap()
      
      if (result.success) {
        setEditingReviewId(null)
        setEditForm({ title: '', rating: 0, comment: '' })
        toast.success('Review updated successfully!')
      } else {
        toast.error(result.message || 'Failed to update review')
      }
    } catch (error: any) {
      console.error('Failed to update review:', error)
      toast.error(error?.data?.message || 'Failed to update review. Please try again.')
    }
  }
  
  function handleStarClick(star: number) {
    setForm(f => ({ 
      ...f, 
      rating: f.rating === star ? star - 1 : star 
    }))
  }
  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    console.log(form.rating)
    if (!form.comment.trim() || form.rating < 1) {
      toast.error('Please fill all fields and select a rating.')
      return
    }
    
    setSubmitting(true)
    
    try {
      const reviewData: CreateReviewRequest = {
        rating: form.rating,
        comment: form.comment,
        username: form.user_name,
        product_id: Number(product.id),
      }
      
      
      const result = await createReview({  reviewData }).unwrap()
      
      if (result.success) {
        setForm({ user_name: '', rating: 0, comment: '' })
        toast.success('Review submitted successfully!')
      } else {
        toast.error(result.message || 'Failed to submit review')
      }
    } catch (error: any) {
      console.error('Failed to submit review:', error)
      toast.error(error?.data?.message || 'Failed to submit review. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // Show loading state while fetching reviews
  if (reviewsLoading) {
    return (
      <section className="bg-white border-t border-gray-100 pt-8 sm:pt-10 lg:pt-12">
        <div className="w-full">
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading reviews...</span>
          </div>
        </div>
      </section>
    )
  }

  // Show error state if reviews failed to load
  if (reviewsError) {
    return (
      <section className="bg-white border-t border-gray-100 pt-8 sm:pt-10 lg:pt-12">
        <div className="w-full">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> Failed to load reviews. Please try again later.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-white border-t border-gray-100 pt-8 sm:pt-10 lg:pt-12">
      <div className="w-full">
        {/* Summary */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-b border-gray-200 pb-8 mb-8">
          <div className="flex flex-col items-center md:items-start gap-2 min-w-[120px]">
            <span className="text-4xl font-black">{reviewSummary.average.toFixed(1)}</span>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(star => (
                <svg key={star} className={`w-5 h-5 ${star <= Math.round(reviewSummary.average) ? 'text-yellow-400' : 'text-gray-300'}`} fill={star <= Math.round(reviewSummary.average) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">{reviewSummary.total} product ratings</span>
          </div>
                      {/* Star breakdown */}
            <div className="flex-1 flex flex-col gap-1 min-w-[180px]">
              {reviewSummary?.stars.map((star,i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-xs text-gray-700 w-4">{star.star}★</span>
                  <div className="flex-1 bg-gray-200 rounded h-2 overflow-hidden">
                    <div className={`bg-yellow-400 h-2 rounded`} style={{ width: `${(star.count / reviewSummary.total) * 100 || 0}%` }} />
                  </div>
                  <span className="text-xs text-gray-500 w-6 text-right">{star.count}</span>
                </div>
              ))}
            </div>
          {/* Attributes */}
          {/* <div className="flex flex-row md:flex-col gap-4 md:gap-2 min-w-[120px]">
            {reviewSummary.attributes.map(attr => (
              <div key={attr.label} className="flex flex-col items-center">
                <div className="w-14 h-14 rounded-full border-4 border-black flex items-center justify-center text-xl font-bold">
                  {attr.percent}%
                </div>
                <span className="text-xs text-center mt-1">{attr.label}</span>
              </div>
            ))}
          </div> */}
          {/* <div className="flex flex-col items-end justify-between min-w-[120px]">
            <a href="#" className="text-sm text-blue-700 hover:underline">See all {reviewSummary.total} reviews</a>
          </div> */}
        </div>

        {/* Reviews List - Now on top */}
        <div className="mb-10">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Most relevant reviews</h3>
          <div className="max-h-[600px] overflow-y-auto pr-2 space-y-8">
            {reviews.map((review) => (
              <div key={review.id} className="flex flex-col sm:flex-row gap-4 border-b border-gray-100 pb-6">
                <div className="flex flex-col items-center min-w-[120px]">
                  <div className="flex gap-1 mb-1">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} className={`w-4 h-4 ${star <= review.rating ? 'text-black' : 'text-gray-300'}`} fill={star <= review.rating ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="font-bold text-lg">{review.rating}</span>
                  <span className="text-xs text-gray-500">by <a href="#" className="underline hover:text-blue-700">{review.username ? review.username : review.user?.name}</a></span>
                  <span className="text-xs text-gray-400">{formatDate(review.created_at)}</span>
                  {review.verified && (
                    <span className="mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs font-semibold rounded-full">Verified Purchase</span>
                  )}
                  {/* Edit button - only show if user is the review author */}
                  {userId && review.user_id?.toString() === userId && (
                    <button
                      onClick={() => handleEditClick(review)}
                      className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                      disabled={editingReviewId === review.id}
                    >
                      {editingReviewId === review.id ? 'Editing...' : 'Edit'}
                    </button>
                  )}
                </div>
                <div className="flex-1">
                  {editingReviewId === review.id ? (
                    // Edit form
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Your Rating:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => handleEditStarClick(star)}
                            className="focus:outline-none"
                            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                          >
                            <svg
                              className={`w-5 h-5 ${star <= editForm.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill={star <= editForm.rating ? 'currentColor' : 'none'}
                              stroke="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          </button>
                        ))}
                      </div>
                      {/* <input
                        type="text"
                        name="title"
                        placeholder="Review Title"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                        value={editForm.title}
                        onChange={handleEditFormChange}
                        disabled={updatingReview}
                        required
                      /> */}
                      <textarea
                        name="comment"
                        placeholder="Your Review"
                        className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 min-h-[80px]"
                        value={editForm.comment}
                        onChange={handleEditFormChange}
                        disabled={updatingReview}
                        required
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 text-sm disabled:opacity-60"
                          disabled={updatingReview}
                        >
                          {updatingReview ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200 text-sm disabled:opacity-60"
                          disabled={updatingReview}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Normal review display
                    <>
                      <h4 className="font-bold text-base mb-1">{review.title}</h4>
                      <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                      {/* <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                        <span>Verified purchase: {review.verified ? 'Yes' : 'No'}</span>
                      </div> */}
                    </>
                  )}
                </div>
              </div>
            ))}
            
            {/* No more reviews message */}
            {reviews.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No reviews yet. Be the first to review this product!
              </div>
            )}
          </div>
        </div>

        {/* Review Form - Now below reviews */}
        <div className="border-t w-2/3 border-gray-200 pt-8">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm font-medium">Your Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className="focus:outline-none"
                  aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                  <svg
                    className={`w-6 h-6 ${star <= form.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill={star <= form.rating ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
            {!userId && (
              <input
                type="text"
                name="user_name"
                placeholder="Your Name"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                value={form.user_name}
                onChange={handleFormChange}
                disabled={submitting}
                required
              />
            )}
              {/* <input
                type="text"
                name="title"
                placeholder="Review Title"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                value={form.title}
                onChange={handleFormChange}
                disabled={submitting}
                required
              /> */}
            </div>
            <textarea
              name="comment"
              placeholder="Your Review"
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200 min-h-[80px]"
              value={form.comment}
              onChange={handleFormChange}
              disabled={submitting}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-colors duration-200 text-sm disabled:opacity-60"
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ProductReviewSection 