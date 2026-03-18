'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react'
import ProductModal from './ProductModal'

interface Product {
  id: string
  name: string
  slug: string
  description: string
  imageUrl?: string | null
  price?: number | null
  unit?: string | null
  inStock: boolean
}

interface Enquiry {
  id: string
  name: string
  email: string
  phone: string
  message?: string | null
  createdAt: string
  product: {
    id: string
    name: string
    slug: string
  } | null
}

export default function AdminDashboard() {
  useSession()
  const [products, setProducts] = useState<Product[]>([])
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [loadingProducts, setLoadingProducts] = useState(true)
  const [loadingEnquiries, setLoadingEnquiries] = useState(true)
  const [activeTab, setActiveTab] = useState<'products' | 'enquiries'>(
    'products'
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

  useEffect(() => {
    fetchProducts()
    fetchEnquiries()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoadingProducts(false)
    }
  }

  const fetchEnquiries = async () => {
    try {
      const response = await fetch('/api/enquiries')
      if (response.ok) {
        const data = await response.json()
        setEnquiries(data)
      }
    } catch (error) {
      console.error('Failed to fetch enquiries:', error)
    } finally {
      setLoadingEnquiries(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return
    }

    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setProducts(products.filter((p) => p.id !== id))
      } else {
        alert('Failed to delete product')
      }
    } catch (error) {
      console.error('Failed to delete product:', error)
      alert('Failed to delete product')
    }
  }

  const handleEdit = (product: Product) => {
    setEditingProduct(product)
    setIsModalOpen(true)
  }

  const handleAdd = () => {
    setEditingProduct(null)
    setIsModalOpen(true)
  }

  const handleModalClose = () => {
    setIsModalOpen(false)
    setEditingProduct(null)
    fetchProducts()
  }

  const loading = loadingProducts || loadingEnquiries

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">
              Manage your products and enquiries
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="inline-flex rounded-lg bg-white shadow-sm border border-gray-200 overflow-hidden">
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 text-sm font-semibold transition ${
                  activeTab === 'products'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Products
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('enquiries')}
                className={`px-4 py-2 text-sm font-semibold transition ${
                  activeTab === 'enquiries'
                    ? 'bg-primary-600 text-white'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                Enquiries
              </button>
            </div>

            {activeTab === 'products' && (
              <button
                onClick={handleAdd}
                className="flex items-center bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition"
              >
                <Plus className="mr-2 w-5 h-5" />
                Add Product
              </button>
            )}
          </div>
        </div>

        {activeTab === 'products' ? (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No products found. Add your first product to get started.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {product.slug}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-md truncate">
                          {product.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.price
                          ? `${product.price} ${product.unit || '/kg'}`
                          : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            product.inStock
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleEdit(product)}
                          className="text-primary-600 hover:text-primary-900 mr-4"
                        >
                          <Edit className="w-5 h-5 inline" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5 inline" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Received
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {enquiries.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No enquiries yet.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr key={enquiry.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {enquiry.product?.name || 'Unknown product'}
                        </div>
                        {enquiry.product?.slug && (
                          <div className="text-sm text-gray-500">
                            {enquiry.product.slug}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {enquiry.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {enquiry.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {enquiry.phone}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-md truncate">
                          {enquiry.message || '—'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(enquiry.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <ProductModal
          product={editingProduct}
          onClose={handleModalClose}
          onSave={fetchProducts}
        />
      )}
    </div>
  )
}
