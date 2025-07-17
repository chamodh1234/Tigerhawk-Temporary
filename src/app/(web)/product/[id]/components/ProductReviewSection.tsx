"use client"
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { toast } from 'react-toastify'

// Types
interface Review {
  id: number
  user: string
  title: string
  rating: number
  date: string
  comment: string
  badge: string
  verified: boolean
  condition: string
  seller: string
}

interface Breakdown {
  [key: number]: number
}

// Mock summary and reviews data
const reviewSummary = {
  average: 4.8,
  total: 43,
  breakdown: { 5: 38, 4: 4, 3: 0, 2: 0, 1: 1 },
  attributes: [
    { label: 'Easy to use', percent: 100 },
    { label: 'Reliable', percent: 100 },
    { label: 'Easy to empty', percent: 100 },
  ],
}

// Mock data generator for infinite scrolling
const generateMockReviews = (startId: number, count: number): Review[] => {
  const mockUsers = ['jkliger293', 'genjuu', 'diaaus5755', 'techlover99vacuumpro', 'homecleaner,reviewer2024, producttester', 'buyer123', 'customer456']
  const mockTitles = [
    'Lifes Little Surprises',
    'Great vacuum. No cord!',
    'This vacuum cleaner looks brand new',
    'Excellent performance',
    'Highly recommended',
    'Best purchase ever',
    'Amazing quality',
    'Worth every penny',
    'Fantastic product',
    'Exceeds expectations'
  ]
  const mockComments = [
    'The only issue I have is after 5 minutes of vacuuming. The display indicates the filter needs to be washed. This is a reoccurring issue. I have bought additional filters, so I change out frequently. Otherwise, I really like the product and all attachments',
    'I can\'t believe how much easier it is to vacuum with no cord! The price was great and it works very well. I can\'t even tell that it was refurbished at all.',
    'This vacuum cleaner looks brand new, I would not have been able to tell a new one from this one. I\'m extremely happy with my purchase.',
    'Excellent performance and build quality. The battery life is impressive and it handles all types of debris very well.',
    'Highly recommended for anyone looking for a powerful cordless vacuum. The attachments are versatile and easy to use.',
    'Best purchase I\'ve made this year. The suction power is incredible and it\'s so much more convenient than a corded vacuum.',
    'Amazing quality for the price. The build feels solid and it performs better than some more expensive models I\'ve tried.',
    'Worth every penny. The convenience of cordless operation combined with powerful suction makes cleaning much more enjoyable.',
    'Fantastic product that has exceeded all my expectations. The battery life is great and it\'s very easy to maneuver.',
    'Exceeds expectations in every way. The design is thoughtful and the performance is outstanding.'
  ]

  return Array.from({ length: count }, (_, index) => ({
    id: startId + index,
    user: mockUsers[Math.floor(Math.random() * mockUsers.length)],
    title: mockTitles[Math.floor(Math.random() * mockTitles.length)],
    rating: Math.floor(Math.random() * 2) + 4, //45rs mostly
    date: new Date(Date.now() - Math.random() * 365 * 24* 60* 60 *1000).toISOString().slice(0, 10),
    comment: mockComments[Math.floor(Math.random() * mockComments.length)],
    badge: Math.random() > 0.8 ? 'TOP FAVORABLE REVIEW' : '',
    verified: Math.random() > 0.1,
    condition: Math.random() > 0.3 ? 'Refurbished' : 'New',
    seller: 'dysonofficial',
  }))
}

const initialReviews = generateMockReviews(1, 10)

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

const ProductReviewSection = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [form, setForm] = useState({
    user: '',
    title: '',
    rating: 0,
    comment: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const observerRef = useRef<IntersectionObserver | undefined>(undefined)
  const loadingRef = useRef<HTMLDivElement>(null)

  // Calculate new summary
  const allRatings = [
    ...reviews.map(r => r.rating),
    // If a new review is being added, include it in the summary
    form.rating && form.comment && form.user && form.title ? form.rating : null,
  ].filter(Boolean) as number[]
  const avg = allRatings.length ? (allRatings.reduce((a, b) => a + b, 0) / allRatings.length) : 0
  const breakdown: Breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  allRatings.forEach(r => breakdown[r]++)

  // Mock API call for fetching more reviews
  const fetchMoreReviews = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800))
    const newReviews = generateMockReviews(reviews.length + 10, 10)
    // Simulate end of data after 5 pages
    if (page >= 5) {
      setHasMore(false)
    }
    
    setReviews(prev => [...prev, ...newReviews])
    setPage(prev => prev + 1)
    setLoading(false)
  }, [loading, hasMore, page, reviews.length])

  // Intersection Observer for infinite scrolling
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchMoreReviews()
        }
      },
      { threshold: 0.1 }
    )

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    observerRef.current = observer

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [fetchMoreReviews, hasMore, loading])

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  
  function handleStarClick(star: number) {
    setForm(f => ({ ...f, rating: star }))
  }
  
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.user.trim() || !form.title.trim() || !form.comment.trim() || form.rating === 0) {
      toast.error('Please fill all fields and select a rating.')
      return
    }
    setSubmitting(true)
    setTimeout(() => {
      setReviews([
        {
          id: Date.now(),
          user: form.user,
          title: form.title,
          rating: form.rating,
          date: new Date().toISOString().slice(0, 10),
          comment: form.comment,
          badge: '',
          verified: true,
          condition: 'Refurbished',
          seller: 'dysonofficial',
        },
        ...reviews,
      ])
      setForm({ user: '', title: '', rating: 0, comment: '' })
      setSubmitting(false)
      toast.success('Review submitted!')
    }, 800)
  }

  return (
    <section className="bg-white border-t border-gray-100 pt-8 sm:pt-10 lg:pt-12">
      <div className=" w-full">
        {/* Summary */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8 border-b border-gray-200 pb-8 mb-8">
          <div className="flex flex-col items-center md:items-start gap-2 min-w-[120px]">
            <span className="text-4xl font-black">{avg.toFixed(1)}</span>
            <div className="flex items-center gap-1">
              {[1,2,3,4,5].map(star => (
                <svg key={star} className={`w-5 h-5 ${star <= Math.round(avg) ? 'text-yellow-400' : 'text-gray-300'}`} fill={star <= Math.round(avg) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-600">{allRatings.length} product ratings</span>
          </div>
          {/* Star breakdown */}
          <div className="flex-1 flex flex-col gap-1 min-w-[180px]">
            {[5,4,3,2,1].map(star => (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-gray-700 w-4">{star}★</span>
                <div className="flex-1 bg-gray-200 rounded h-2 overflow-hidden">
                  <div className={`bg-yellow-400 h-2 rounded`} style={{ width: `${(breakdown[star] / allRatings.length) * 100 || 0}%` }} />
                </div>
                <span className="text-xs text-gray-500 w-6 text-right">{breakdown[star]}</span>
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
          <div className="flex flex-col items-end justify-between min-w-[120px]">
            <a href="#" className="text-sm text-blue-700 hover:underline">See all {allRatings.length} reviews</a>
          </div>
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
                  <span className="text-xs text-gray-500">by <a href="#" className="underline hover:text-blue-700">{review.user}</a></span>
                  <span className="text-xs text-gray-400">{formatDate(review.date)}</span>
                  {review.badge && (
                    <span className="mt-1 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">{review.badge}</span>
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-base mb-1">{review.title}</h4>
                  <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                  <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                    <span>Verified purchase: {review.verified ? 'Yes' : 'No'}</span>
                    <span>Condition: {review.condition}</span>
                    <span>Sold by: {review.seller}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Loading indicator for infinite scroll */}
            <div ref={loadingRef} className="flex justify-center py-4">
              {loading && (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                  <span className="text-sm">Loading more reviews...</span>
                </div>
              )}
              {!hasMore && reviews.length > 0 && (
                <div className="text-center text-gray-500">
                  No more reviews to load
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Review Form - Now below reviews */}
        <div className="border-t w-2/3 border-gray-200 pt-8">
          <h3 className="text-lg sm:text-xl font-bold mb-2">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex items-center gap-2">
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
              <input
                type="text"
                name="user"
                placeholder="Your Name"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                value={form.user}
                onChange={handleFormChange}
                disabled={submitting}
                required
              />
              <input
                type="text"
                name="title"
                placeholder="Review Title"
                className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-200"
                value={form.title}
                onChange={handleFormChange}
                disabled={submitting}
                required
              />
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