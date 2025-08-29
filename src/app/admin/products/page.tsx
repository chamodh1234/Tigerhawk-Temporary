'use client'
import React, { useEffect, useState } from 'react'
import { Modal } from '@/components/ui/Modal'
import { ProductList } from './components/ProductList'
import { ProductForm } from './components/ProductForm'
import { MainCategoryForm } from './components/MainCategoryForm'
import { SubCategoryForm } from './components/SubCategoryForm'
import { useGetMainCategoriesQuery, useGetSubCategoriesQuery, useCreateMainCategoryMutation, useDeleteMainCategoryMutation, useDeleteSubCategoryMutation, useGetProductsQuery } from '@/lib/redux/apiSlice'
import Image from 'next/image'
//import { base64ToImgSrc } from '@/lib/utils'
import { useDispatch, useSelector } from 'react-redux'
import { setMainCategories, setSubCategories } from '@/lib/redux/slices/categorySlice'
import type { RootState } from '@/lib/redux/store'
import type { Product } from '@/lib/types/product'

export interface MainCategory {
  id: string
  name: string
  image: string
  banner: string  
}

export interface SubCategory {
  id: string
  main_category_id: string
  name: string
  image: File
}

export default function AdminProductsPage () {
	const dispatch = useDispatch()
	const mainCategories = useSelector(
		(state: RootState) => state.category.mainCategories
	)
	const subCategories = useSelector(
		(state: RootState) => state.category.subCategories
	)

	const {
		data: mainCategoriesData = [],
		isLoading: mainLoading,
		refetch: mainCategoryRefetch,
	} = useGetMainCategoriesQuery({})
	const {
		data: subCategoriesData = [],
		isLoading: subLoading,
		refetch: subCategoryRefetch,
	} = useGetSubCategoriesQuery({})
	const {
		data: productsData = [],
		isLoading: productsLoading,
		refetch: productsRefetch,
	} = useGetProductsQuery({})
  
  // Store categories in slice when data is fetched
  useEffect(() => {
    if (mainCategoriesData?.data) {
      dispatch(setMainCategories(mainCategoriesData.data))
    }
  }, [mainCategoriesData, dispatch])
  
  useEffect(() => {
    if (subCategoriesData?.data) {
      dispatch(setSubCategories(subCategoriesData.data))
    }
  }, [subCategoriesData, dispatch])
  
  const [modalOpen, setModalOpen] = useState(false)
  // Remove isUpdate state since we use selectedProduct
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [mainCatModalOpen, setMainCatModalOpen] = useState(false)
  const [subCatModalOpen, setSubCatModalOpen] = useState(false)
  const [editMainCat, setEditMainCat] = useState<MainCategory | null>(null)
  const [editSubCat, setEditSubCat] = useState<SubCategory | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'main' | 'sub'; id: string; name: string } | null>(null)
  const [createMainCategory, { isLoading: createLoading, error: createError }] = useCreateMainCategoryMutation()
  const [isMainCategorySuccess, setIsMainCategorySuccess] = useState(false)
  const [deleteMainCategory, { isLoading: deleteLoading, error: deleteError }] = useDeleteMainCategoryMutation()
  const [deleteSubCategory, { isLoading: deleteSubLoading, error: deleteSubError }] = useDeleteSubCategoryMutation()
  // Add state for sub category success
  const [isSubCategorySuccess, setIsSubCategorySuccess] = useState(false)
  // Add state for product success
  const [isProductSuccess, setIsProductSuccess] = useState(false)

  function handleAddClick() {
    setModalOpen(true)
  }

  function handleEdit(product: Product) {
    setSelectedProduct(product)
    setModalOpen(true)
  }

  function handleDelete(productId: string) {
    // This function is no longer needed as products are fetched
  }

  function handleFormSubmit(product: Product) {
    if (selectedProduct) {
      // This logic is no longer needed as products are fetched
    } else {
      // This logic is no longer needed as products are fetched
    }
    setModalOpen(false)
  }

  function handleAddMainCategory(mainCategory: MainCategory) {
   
    setMainCatModalOpen(false)
  }

  function handleAddSubCategory(subCategory: SubCategory) {
    // This function is no longer needed as categories are fetched
    setSubCatModalOpen(false)
  }

  function handleEditMainCategory(mainCategory: MainCategory) {
    setEditMainCat(mainCategory)
    setMainCatModalOpen(true)
  }

  function handleEditSubCategory(subCategory: SubCategory) {
    setEditSubCat(subCategory)
    setSubCatModalOpen(true)
  }

  async function handleDeleteMainCategory(id: string) {
    try {
      await deleteMainCategory(id).unwrap()
      mainCategoryRefetch && mainCategoryRefetch()
    } catch (err) {
      // Optionally handle error
    }
  }

  async function handleDeleteSubCategory(subCategoryId: string, name: string) {
    try {
      await deleteSubCategory(subCategoryId).unwrap()
      subCategoryRefetch && subCategoryRefetch()
    } catch (err) {
      // Optionally handle error
    }
  }

  function confirmDelete() {
    if (!deleteConfirm) return
    if (deleteConfirm.type === 'main') {
      // This logic is no longer needed as categories are fetched
    } else {
      // This logic is no longer needed as categories are fetched
    }
    setDeleteConfirm(null)
  }

  function cancelDelete() {
    setDeleteConfirm(null)
  }

  // async function handleMainCategoryFormSubmit(mainCategory: Omit<MainCategory, 'id'>) {
  //   try {
  //     await createMainCategory(mainCategory).unwrap()
  //     setMainCatModalOpen(false)
  //   } catch (err) {
  //     // error handled by createError
  //   }
  // }


  useEffect(() => {
   mainCategoryRefetch()
   subCategoryRefetch()
   productsRefetch()
   setIsMainCategorySuccess(false)
   setIsSubCategorySuccess(false)
  }, [isMainCategorySuccess, isSubCategorySuccess,isProductSuccess])


  function handleSubCategoryFormSubmit(subCategory: Omit<SubCategory, 'id'>) {
    if (editSubCat) {
      // This logic is no longer needed as categories are fetched
      setEditSubCat(null)
    } else {
      // This logic is no longer needed as categories are fetched
    }
    setSubCatModalOpen(false)
  }

  // SVG icons
  const EditIcon = () => (
    <svg width="16" height="16" fill="none" viewBox="0 0 20 20" className="inline align-middle"><path d="M4 13.5V16h2.5l7.06-7.06-2.5-2.5L4 13.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M14.06 6.44a1.5 1.5 0 1 0-2.12-2.12l-1.06 1.06 2.12 2.12 1.06-1.06z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )
  const DeleteIcon = () => (
    <svg width="16" height="16" fill="none" viewBox="0 0 20 20" className="inline align-middle"><path d="M6 7v7a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 10v3m3-3v3M4 7h12M8 7V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
  )

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <div className="flex gap-2">
          <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={() => { setEditMainCat(null); setMainCatModalOpen(true) }}>Add Main Category</button>
          <button className="bg-yellow-600 text-white px-4 py-2 rounded" onClick={() => { setEditSubCat(null); setSubCatModalOpen(true) }} disabled={mainCategories.length === 0}>Add Subcategory</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleAddClick}>Add Product</button>
        </div>
      </div>
      {/* Main Categories List */}
      <div className="mb-4">
        <h2 className="font-semibold mb-2">Main Categories</h2>
        <div className="flex gap-4 flex-wrap">
          {mainCategories?.map((cat:any) => (
            <div key={cat.id} className="flex flex-col items-center border rounded p-2 w-32 relative group">
              <img src={cat.image} alt={cat.name} className="w-16 h-16 object-cover rounded mb-1" />
              <span className="text-sm font-medium">{cat.name}</span>
              <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                <button aria-label="Edit" className="p-1 rounded hover:bg-blue-100 focus:bg-blue-200 text-blue-600" onClick={() => handleEditMainCategory(cat)}>
                  <EditIcon />
                </button>
                <button aria-label="Delete" className="p-1 rounded hover:bg-red-100 focus:bg-red-200 text-red-600" onClick={() => handleDeleteMainCategory(cat.id)}>
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Subcategories List */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Subcategories</h2>
        {mainCategories?.map((cat:any) => (
          <div key={cat.id} className="mb-2">
            <div className="font-medium text-gray-700 mb-1">{cat.name}</div>
            <div className="flex gap-2 flex-wrap">
              {subCategories?.filter((sub:any) => sub.main_category_id === cat.id).map((sub:any) => (
                <div key={sub.id} className="flex flex-col items-center border rounded p-2 w-28 relative group">
                  <img src={sub.image} alt={sub.name} width={48} height={48} className="w-12 h-12 object-cover rounded mb-1"/>
                  <span className="text-xs">{sub.name}</span>
                  <div className="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition">
                    <button aria-label="Edit" className="p-1 rounded hover:bg-blue-100 focus:bg-blue-200 text-blue-600" onClick={() => handleEditSubCategory(sub)}>
                      <EditIcon />
                    </button>
                    <button aria-label="Delete" className="p-1 rounded hover:bg-red-100 focus:bg-red-200 text-red-600" onClick={() => handleDeleteSubCategory(sub.id, sub.name)}>
                      <DeleteIcon />
                    </button>
                  </div>
                </div>
              ))}
              {subCategories?.filter((sub:any) => sub.main_category_id === cat.id).length === 0 && (
                <span className="text-xs text-gray-400">No subcategories</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <ProductList 
        products={productsData?.data || []} 
        onEdit={handleEdit} 
        onDelete={handleDelete} 
      />
      {/* Product Modal */}
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setSelectedProduct(null) }}>
        <ProductForm
          onCancel={() => { setModalOpen(false); setSelectedProduct(null) }}
          isSuccess={setIsProductSuccess}
          mainCategories={mainCategories || []}
          subCategories={subCategories || []}
          isUpdate={!!selectedProduct}
          initialValues={selectedProduct || undefined}
        />
      </Modal>
      {/* Main Category Modal */}
      <Modal open={mainCatModalOpen} onClose={() => { setMainCatModalOpen(false); setEditMainCat(null) }}>
        <MainCategoryForm
          isSuccess={setIsMainCategorySuccess}
          onCancel={() => { setMainCatModalOpen(false); setEditMainCat(null) }}
          initialValues={editMainCat || undefined}
        />
      </Modal>
      {/* Subcategory Modal */}
      <Modal open={subCatModalOpen} onClose={() => { setSubCatModalOpen(false); setEditSubCat(null) }}>
        <SubCategoryForm
          mainCategories={mainCategories}
          onSubmit={handleSubCategoryFormSubmit}
          onCancel={() => setSubCatModalOpen(false)}
          isSuccess={setIsSubCategorySuccess}
          initialValues={editSubCat ?? undefined}
        />
      </Modal>
      {/* Confirmation Modal */}
      {deleteConfirm && typeof window !== 'undefined' && (() => {
        const confirmMsg = `Are you sure you want to delete ${deleteConfirm.name} ${deleteConfirm.type === 'main' ? 'main category' : 'subcategory'}?`
        if (window.confirm(confirmMsg)) {
          confirmDelete()
        } else {
          cancelDelete()
        }
        return null
      })()}
    </div>
  )
} 