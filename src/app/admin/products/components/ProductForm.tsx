import React, { useState, useEffect } from 'react'
import { useCreateProductMutation, useUpdateProductMutation, useRemoveProductFeatureMutation, useRemoveAdditionalFeatureMutation, useRemoveProductImageMutation } from '@/lib/redux/apiSlice'
import type { Product, ProductFeature } from '@/lib/types/product'
import type { MainCategory, SubCategory } from '../page'
import RichTextEditor from './RichTextEditor'

interface ProductFormProps {
  onCancel: () => void
  isSuccess: (success: boolean) => void
  mainCategories: MainCategory[]
  subCategories: SubCategory[]
  initialValues?: any
  isUpdate?: boolean
}

export function ProductForm({ onCancel, isSuccess, mainCategories, subCategories, initialValues, isUpdate }: ProductFormProps) {
  const [productID, setProductID] = useState(initialValues?.product_id  || '')
  const [name, setName] = useState(initialValues?.name || '')
  const [description, setDescription] = useState(initialValues?.description || '')
  const [Price, setPrice] = useState<number>(initialValues?.price || 0)
  const [mainCategory, setMainCategory] = useState<string>(initialValues?.main_category?.id.toString() || '')
  const [subCategory, setSubCategory] = useState<string>(initialValues?.subCategory?.toString() || '')
    const [newImages, setNewImages] = useState<File[]>([])
  const [existingImages, setExistingImages] = useState<any[]>(initialValues?.images?.filter((img:any) => typeof img.url === 'string') || [])
  const [imagePreviews, setImagePreviews] = useState<any[]>(initialValues?.images?.map((img:any) => typeof img.url === 'string' ?{url:img.url,id:img.id} : '') || [])
  const [discount, setDiscount] = useState<number>(initialValues?.discount || 0)
  const [productFeatures, setProductFeatures] = useState<ProductFeature[]>(
    initialValues?.product_features?.length ? initialValues.product_features : [{ specification: '', tiger_hawk: '', typical_torch: '' }]
  )
  const [additionalFeatures, setAdditionalFeatures] = useState<any>(
    initialValues?.additional_features?.length ? initialValues.additional_features : ['']
  )
  const [error, setError] = useState<string | null>(null)
  const [filteredSubCategories, setFilteredSubCategories] = useState<SubCategory[]>([])
  
  const [createProduct, { isLoading: createLoading, error: createError }] = useCreateProductMutation()
  const [updateProduct, { isLoading: updateLoading, error: updateError }] = useUpdateProductMutation()
  const [removeFeature, { isLoading: removeLoading, error: removeError }] = useRemoveProductFeatureMutation()
  const [removeAdditional, { isLoading: removeAdditionalLoading, error: removeAdditionalError }] = useRemoveAdditionalFeatureMutation()
  const [removeImage, { isLoading: removeImageLoading, error: removeImageError }] = useRemoveProductImageMutation()

  const isLoading = createLoading || updateLoading || removeLoading || removeAdditionalLoading || removeImageLoading
  const mutationError = createError || updateError || removeError || removeAdditionalError || removeImageError

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length > 11) {
      setError('Maximum 11 images allowed.')
      return
    }
    
    const validFiles = files.filter(file => file.size <= 2 * 1024 * 1024)
    if (validFiles.length !== files.length) {
      setError('Some images were too large (max 2MB each).')
    }
    
    // Append new images to existing newImages array
    setNewImages(prev => [...prev, ...validFiles])
    setError(null)
    
    // Create previews for new files with proper structure and combine with existing
    const newPreviews = validFiles.map(file => ({
      url: URL.createObjectURL(file),
      id: `new_${Date.now()}_${Math.random()}`, // Generate temporary ID for new images
      isNew: true // Flag to identify new images
    }))
    setImagePreviews(prev => [...prev, ...newPreviews])
  }

  // Combine existing and new images for display
  //const allImages = [...existingImages, ...newImages.map(file => URL.createObjectURL(file))]

  const addProductFeature = () => {
    setProductFeatures([...productFeatures, { specification: '', tiger_hawk: '', typical_torch: '' }])
  }

  const removeProductFeature = (index: number) => {
    if (productFeatures.length > 1) {
      setProductFeatures(productFeatures.filter((_, i) => i !== index))
    }
  }

  const updateProductFeature = (index: number, field: keyof ProductFeature, value: string) => {
    const updated = [...productFeatures]
    updated[index] = { ...updated[index], [field]: value }
    setProductFeatures(updated)
  }

  const addAdditionalFeature = () => {
    setAdditionalFeatures([...additionalFeatures, ''])
  }

  const removeAdditionalFeature = (index: number) => {
    if (additionalFeatures.length > 1) {
      setAdditionalFeatures(additionalFeatures.filter((_: any, i: number) => i !== index))
    }
  }

  const updateAdditionalFeature = (index: number, value: string) => {
    const updated = [...additionalFeatures]
    updated[index] = value
    setAdditionalFeatures(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   
    if (!productID.trim()) {
      setError('Product ID is required.')
      return
    } 
    if (!name.trim()) {
      setError('Product name is required.')
      return
    }
    if (!mainCategory) {
      setError('Main category is required.')
      return
    }
    if (!subCategory) {
      setError('Sub category is required.')
      return
    }
    // if (imagePreviews.length === 0) {
      //   setError('At least one image is required.')
      //   return
      // }
      if (Price <= 0) {
        setError('Price must be greater than 0.')
        return
      }
      if (discount < 0 || discount > 100) {
        setError('Discount must be between 0 and 100.')
        return
      }
      
      setError(null)
      
      try { 
        console.log("working",productFeatures)

        const productData = {
          productID,
          name,
          description,
          Price,
          mainCategory,
          subCategory,
          image: newImages, // Only send new images (Files) to backend
          discount,
          productFeatures: productFeatures.filter(f => f.specification.trim() || f.tiger_hawk.trim() || f.typical_torch.trim()),
          AditionalFeatures: additionalFeatures.filter((f: any) => {
            // Handle both string (create mode) and object (edit mode) structures
            const featureValue = typeof f === 'string' ? f : f.feature
            return featureValue && featureValue.trim()
          })
        }
        
       
      console.log("isupdate" , isUpdate)
      
      if (isUpdate && initialValues?.id) {
        // Update existing product
        console.log("product data update function triggered" , productData)
        const response = await updateProduct({ id: initialValues.id, data: productData }).unwrap()
        if (response.success) {
          isSuccess(true)
          onCancel()
        }
      
    } else {

        const response = await createProduct(productData).unwrap()
        if (response.success) {
          isSuccess(true)
          onCancel()
        }
      }
    } catch (err) {
      // error handled by mutationError
      console.log("error" , err)
    }
  }

  const handleRemoveFeature = async (featureIndex: number) => {
    if (!isUpdate || !initialValues?.id) return
    
    try {
      const response = await removeFeature({ 
        productId: initialValues.id, 
        featureIndex 
      }).unwrap()
      
      console.log("product feature response",response)
      if (response.success) {
        // Update productFeatures with the remaining features from response
        if (response.message) {
          const remainingFeatures = response.data
          setProductFeatures(remainingFeatures)
        }
      }
    } catch (err) {
      // error handled by mutationError
    }
  }

  const removeProductFeatureRow = (index: number) => {
    if (productFeatures.length > 1) {
      setProductFeatures(productFeatures.filter((_, i) => i !== index))
    }
  }

  const handleRemoveAdditionalFeature = async (featureIndex: number) => {
    if (!isUpdate || !initialValues?.id) return
    
    try {
      const response = await removeAdditional({ 
        productId: initialValues.id, 
        featureIndex 
      }).unwrap()
      
      console.log("additional feature response", response)
      if (response.success) {
        // Update additionalFeatures with the remaining features from response
        if (response.data) {
          setAdditionalFeatures(response.data)
        }
      }
    } catch (err) {
      // error handled by mutationError
    }
  }

  const removeAdditionalFeatureRow = (index: number) => {
    if (additionalFeatures.length > 1) {
      setAdditionalFeatures(additionalFeatures.filter((_: any, i: number) => i !== index))
    }
  }

  // const filteredSubCategories = subCategories.filter(sub => sub.main_category_id === mainCategory)
  useEffect(() => {
   const filterdSubCategories = subCategories.filter(sub => sub.main_category_id.toString() === mainCategory)
   setFilteredSubCategories(filterdSubCategories)
    setSubCategory(filterdSubCategories[0]?.id)
  }, [mainCategory])

  console.log(additionalFeatures)

  const handleRemoveImage = async (imageId: number) => {
    if (!isUpdate || !initialValues?.id) return
    
    // Find the image in imagePreviews to check if it's new or existing
    const imageIndex = imagePreviews.findIndex(img => img.id === imageId)
    if (imageIndex === -1) return
    
    const imageToRemove = imagePreviews[imageIndex]
    
    if (imageToRemove.isNew) {
      // Remove new image from local arrays only
      setImagePreviews(prev => prev.filter((_, i) => i !== imageIndex))
      setNewImages(prev => prev.filter((_, i) => i !== (imageIndex - existingImages.length)))
    } else {
      // Remove existing image via API
      try { 
        console.log("working")
        const response = await removeImage({ 
          productId: initialValues.id, 
          imageIndex: imageId
        }).unwrap()
        
        console.log("image remove response", response)
        if (response.success) {
          // Update existingImages with the remaining images from response
          if (response.data) {
            setExistingImages(response.data.remaining_images)
            setImagePreviews(response.data.remaining_images)
            isSuccess(true)
          }
        }
      } catch (err) {
        // error handled by mutationError
      }
    }
  }

  const removeImageRow = (index: number) => {
    if (imagePreviews.length > 1) {
      const imageToRemove = imagePreviews[index]
      
      if (imageToRemove.isNew) {
        // Remove new image from both arrays
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
        // Calculate the correct new image index
        const newImageIndex = index - existingImages.length
        if (newImageIndex >= 0) {
          setNewImages(prev => prev.filter((_, i) => i !== newImageIndex))
        }
      } else {
        // Remove existing image from previews only (existing images are managed by API)
        setImagePreviews(prev => prev.filter((_, i) => i !== index))
      }
    }
  }


  console.log("initial product" , initialValues)

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-2xl">
      <h2 className="text-xl font-bold mb-4">{isUpdate ? 'Edit Product' : 'Add New Product'}</h2>
      
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      {mutationError && <div className="text-red-600 text-sm mb-2">{(mutationError as any)?.data?.error || `Failed to ${isUpdate ? 'update' : 'create'} product`}</div>}
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Product ID *</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={productID}
            onChange={e => setProductID(e.target.value)}
            required
          />
        </div>
        
        <div>
          <label className="block font-medium mb-1">Product Name *</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Description</label>
        <RichTextEditor content={description} onChange={setDescription} />
        {/* <textarea
          className="w-full border rounded px-3 py-2 h-20"
          value={description}
          onChange={e => setDescription(e.target.value)}
        /> */}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block font-medium mb-1">Price *</label>
          <input
            type="number"
            step="0.01"
            className="w-full border rounded px-3 py-2"
            value={Price}
            onChange={e => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        
        <div>
          <label className="block font-medium mb-1">Discount (%)</label>
          <input
            type="number"
            min="0"
            max="100"
            className="w-full border rounded px-3 py-2"
            value={discount}
            onChange={e => setDiscount(parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-medium mb-1">Main Category *</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={mainCategory}
            onChange={e => {
              setMainCategory(e.target.value)
              setSubCategory('') // Reset sub category when main category changes
            }}
            required
          >
            <option value="">Select main category</option>
            {mainCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block font-medium mb-1">Sub Category *</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={subCategory}
            onChange={e => setSubCategory(e.target.value)}
            required
            disabled={!mainCategory}
          >
            <option value="">Select sub category</option>
            {filteredSubCategories.map(sub => (
              <option key={sub.id} value={sub.id}>{sub.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block font-medium mb-1">Images * (Max 11)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full border rounded px-3 py-2"
          onChange={handleImageChange}
        />
        {imagePreviews.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {imagePreviews.map((preview:any, index) => (
              <div key={index} className="relative">
                
                <img src={preview.url} alt={`Preview ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                
                <button
                  type="button"
                  onClick={() => isUpdate ? handleRemoveImage(preview.id) : removeImageRow(index)}
                  disabled={removeImageLoading}
                  className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Product Features Table */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block font-medium">Product Features</label>
          <button
            type="button"
            onClick={addProductFeature}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            Add Feature
          </button>
        </div>
        <div className="border rounded overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left text-sm font-medium">Specification</th>
                <th className="px-3 py-2 text-left text-sm font-medium">TigerHawk</th>
                <th className="px-3 py-2 text-left text-sm font-medium">TypicalTorch</th>
                <th className="px-3 py-2 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {productFeatures.map((feature, index) => (
                <tr key={index} className="border-t">
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 text-sm"
                      value={feature.specification}
                      onChange={e => updateProductFeature(index, 'specification', e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 text-sm"
                      value={feature.tiger_hawk }
                      onChange={e => updateProductFeature(index, 'tiger_hawk', e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-2">
                    <input
                      type="text"
                      className="w-full border rounded px-2 py-1 text-sm"
                      value={feature.typical_torch}
                      onChange={e => updateProductFeature(index, 'typical_torch', e.target.value)}
                    />
                  </td>
                  <td className="px-3 py-2">
                    {/* {productFeatures.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeProductFeatureRow(index)}
                        className="px-2 py-1 bg-red-600 text-white rounded text-sm"
                      >
                        Remove
                      </button>
                    )} */}
                   
                      <button
                        type="button"
                        onClick={() => isUpdate ? handleRemoveFeature(Number(feature?.id)) : removeProductFeatureRow(index)}
                        disabled={removeLoading}
                        className="px-2 py-1 bg-orange-600 text-white rounded text-sm ml-1"
                      >
                        {removeLoading ? 'Removing...' : 'Delete'}
                      </button>
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Features */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block font-medium">Additional Features</label>
          <button
            type="button"
            onClick={addAdditionalFeature}
            className="px-3 py-1 bg-green-600 text-white rounded text-sm"
          >
            Add Feature
          </button>
        </div>
        <div className="space-y-2">
          {additionalFeatures.map((feature:any, index:number) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                className="flex-1 border rounded px-3 py-2"
                value={feature.feature}
                onChange={e => updateAdditionalFeature(index, e.target.value)}
                placeholder="Enter additional feature"
              />
              
              
                <button
                  type="button"
                  onClick={() => isUpdate ? handleRemoveAdditionalFeature(feature.id) : removeAdditionalFeatureRow(index)}
                  disabled={removeAdditionalLoading}
                  className="px-3 py-2 bg-orange-600 text-white rounded ml-1"
                >
                  {removeAdditionalLoading ? 'Removing...' : 'Delete'}
                </button>
             
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button type="button" className="px-4 py-2 rounded border" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white" disabled={isLoading}>
          {isLoading ? (isUpdate ? 'Updating...' : 'Creating...') : (isUpdate ? 'Update Product' : 'Create Product')}
        </button>
      </div>
    </form>
  )
} 