import React, { useState, useEffect } from 'react'
import type { SubCategory, MainCategory } from '../page'
import { useCreateSubCategoryMutation, useUpdateSubCategoryMutation } from '@/lib/redux/apiSlice'

interface SubCategoryFormProps {
  onSubmit?: (subCategory: SubCategory) => void
  onCancel: () => void
  isSuccess: (success: boolean) => void
  initialValues?: SubCategory
  mainCategories: MainCategory[]
}

export function SubCategoryForm({ onSubmit, onCancel, initialValues, isSuccess, mainCategories }: SubCategoryFormProps) {
  const [name, setName] = useState(initialValues?.name || '')
  const [mainCategoryId, setMainCategoryId] = useState(initialValues?.main_category_id || '')
  const [image, setImage] = useState<File>()
  const [imagePreview, setImagePreview] = useState(initialValues?.image || '')
  const [error, setError] = useState<string | null>(null)
  const [createSubCategory, { isLoading: createLoading, error: createError }] = useCreateSubCategoryMutation()
  const [updateSubCategory, { isLoading: updateLoading, error: updateError }] = useUpdateSubCategoryMutation()

  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name)
      setMainCategoryId(initialValues.main_category_id)
      setImagePreview(initialValues.image)
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) {
      setError('Name is required.')
      return
    }
    if (!mainCategoryId) {
      setError('Main category is required.')
      return
    }
    if (!image && !imagePreview) {
      setError('Image is required.')
      return
    }
    setError(null)
    try {
      if (initialValues?.id) {
        // Update existing sub category
        const formData = new FormData()
        formData.append('name', name)
        formData.append('mainCategoryId', mainCategoryId)
        if (image) {
          formData.append('image', image)
        }
        const response = await updateSubCategory({ id: initialValues.id, data: {name, main_category_id: mainCategoryId, image: image} as SubCategory}).unwrap()
        if (response.success) {
          isSuccess(true)
          onCancel()
        }
      } else {
        // Create new sub category
        const response = await createSubCategory({ name, image: image!, mainCategoryId }).unwrap()
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
      <h2 className="text-xl font-bold mb-2">{initialValues ? 'Edit Sub Category' : 'Add Sub Category'}</h2>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      {createError && <div className="text-red-600 text-sm mb-2">{(createError as any)?.data?.error || 'Failed to create sub category'}</div>}
      {updateError && <div className="text-red-600 text-sm mb-2">{(updateError as any)?.data?.error || 'Failed to update sub category'}</div>}
      
      <div>
        <label className="block font-medium mb-1">Main Category</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={mainCategoryId}
          onChange={e => setMainCategoryId(e.target.value)}
          required
        >
          <option value="">Select main category</option>
          {mainCategories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

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

      <div className="flex justify-end gap-2 mt-4">
        <button type="button" className="px-4 py-2 rounded border" onClick={onCancel}>Cancel</button>
        <button type="submit" className="px-4 py-2 rounded bg-green-600 text-white" disabled={createLoading || updateLoading}>
          {initialValues ? (updateLoading ? 'Updating...' : 'Update') : (createLoading ? 'Adding...' : 'Add')}
        </button>
      </div>
    </form>
  )
} 