import React, { useState, useEffect } from 'react'
import type { MainCategory } from '../page'
import { useCreateMainCategoryMutation, useUpdateMainCategoryMutation } from '@/lib/redux/apiSlice'

interface MainCategoryFormProps {
  onSubmit?: (mainCategory: MainCategory) => void
  onCancel: () => void
  isSuccess: (success: boolean) => void
  initialValues?: MainCategory // Include id for updates
}

export function MainCategoryForm({ onSubmit, onCancel, initialValues, isSuccess }: MainCategoryFormProps) {
  const [name, setName] = useState(initialValues?.name || '')
  const [image, setImage] = useState<File>()
  const [imagePreview, setImagePreview] = useState(initialValues?.image || '')
  const [banner, setBanner] = useState<File>()
  const [bannerPreview, setBannerPreview] = useState(initialValues?.banner || '')
  const [error, setError] = useState<string | null>(null)
  const [createMainCategory, { isLoading: createLoading, error: createError }] = useCreateMainCategoryMutation()
  const [updateMainCategory, { isLoading: updateLoading, error: updateError }] = useUpdateMainCategoryMutation()

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name)
      setImagePreview(initialValues.image)
      setBannerPreview(initialValues.banner)
    }
  }, [initialValues])

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setError('Image must be less than 2MB.')
      return
    }
    setImage(file)
    setError(null)
    const reader = new FileReader()
    reader.onload = e => setImagePreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  function handleBannerChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      setError('Banner must be less than 2MB.')
      return
    }
    setBanner(file)
    setError(null)
    const reader = new FileReader()
    reader.onload = e => setBannerPreview(e.target?.result as string)
    reader.readAsDataURL(file)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Name is required.')
      return
    }
    if (!image && !imagePreview) {
      setError('Image is required.')
      return
    }
    if (!banner && !bannerPreview) {
      setError('Banner is required.')
      return
    }
    setError(null)
    try {
      console.log('maincategory image', image)
      console.log('maincategory banner', banner)
      
      if (initialValues?.id) {
        // Update existing category
        const formData = new FormData()
        formData.append('name', name)
        if (image) {
          formData.append('image', image)
        }
        if (banner) {
          formData.append('banner', banner)
        }
        const response = await updateMainCategory({ id: initialValues.id, data: formData }).unwrap()
        if (response.success) {
          isSuccess(true)
          onCancel()
        }
      } else {
        // Create new category
        const formData = new FormData()
        formData.append('name', name)
        if (image) {
          formData.append('image', image)
        }
        if (banner) {
          formData.append('banner', banner)
        }
        const response = await createMainCategory(formData).unwrap()
        if (response.success) {
          isSuccess(true)
          onCancel()
        }
      }
    } catch (err) {
      // error handled by mutationError
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-xs">
      <h2 className="text-xl font-bold mb-2">{initialValues ? 'Edit Main Category' : 'Add Main Category'}</h2>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      {createError && <div className="text-red-600 text-sm mb-2">{(createError as any)?.data?.error || 'Failed to create category'}</div>}
      {updateError && <div className="text-red-600 text-sm mb-2">{(updateError as any)?.data?.error || 'Failed to update category'}</div>}
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Image</label>
        <input
          className="w-full border rounded px-3 py-2"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded mt-2" />
        )}
      </div>
      <div>
        <label className="block font-medium mb-1">Banner</label>
        <input
          className="w-full border rounded px-3 py-2"
          type="file"
          accept="image/*"
          onChange={handleBannerChange}
        />
        {bannerPreview && (
          <img src={bannerPreview} alt="Banner Preview" className="w-20 h-20 object-cover rounded mt-2" />
        )}
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="px-4 py-2 rounded border" onClick={onCancel}>Cancel</button>
        <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white" disabled={createLoading || updateLoading}>
          {initialValues ? (updateLoading ? 'Updating...' : 'Update') : (createLoading ? 'Adding...' : 'Add')}
        </button>
      </div>
    </form>
  )
} 