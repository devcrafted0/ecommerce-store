'use client'
import React, { useState, ChangeEvent, DragEvent, useEffect } from 'react';
import { X, Upload, Check } from 'lucide-react';
import axios from 'axios';
import { type Response } from '@/context/authContext';
import FormStatus from '@/components/main/FormStatus';
import Loader from '@/components/main/Loader';

interface ProductImage {
  id: number;
  url: string;
  file: File;
}

interface ProductFormData {
  name: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  taxable: boolean;
  regularPrice: string;
  salePrice: string;
  hasSalePrice: boolean;
  sku: string;
  inStock: boolean;
  stockUnit: string;
  weight: string;
  dimensions: string;
  brand : string,
  images : [],
}

type FormField = keyof ProductFormData;

const initialFormData: ProductFormData = {
  name: '',
  shortDescription: '',
  fullDescription: '',
  category: '',
  taxable: false,
  regularPrice: '',
  salePrice: '',
  hasSalePrice: false,
  sku: '',
  inStock: true,
  stockUnit: '',
  weight: '',
  dimensions: '',
  brand : '',
  images : [],
};

export default function AddProductForm() {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [response , setResponse] = useState<Response>({});
  const [loading , setLoading] = useState<boolean>(false);

  const handleChange = <K extends FormField>(field: K, value: ProductFormData[K]): void => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const processFiles = (files: File[]): void => {
    const remainingSlots = 5 - images.length;
    
    if (files.length > remainingSlots) {
      alert(`You can only upload ${remainingSlots} more image(s). Maximum 5 images allowed.`);
      return;
    }

    const newImages: ProductImage[] = files.map(file => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const files = e.target.files;
    if (files) {
      processFiles(Array.from(files));
    }
  };

  const removeImage = (id: number): void => {
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const imageFiles = files.filter(file => file.type.startsWith('image/'));
    processFiles(imageFiles);
  };

  const handleSubmit = async () => {
 
    const formDataAll = new FormData();

    // Append all object fields (like spreading)
    Object.entries(formData).forEach(([key, value]) => {
      formDataAll.append(key, value);
    });

    // Append image array
    images.forEach((image) => {
      formDataAll.append("images", image.file);
    })

    try {
      setLoading(true);
      const res = await axios.post('/api/v1/product/publishProduct', formDataAll);
      setResponse(res.data);
      setFormData(initialFormData);
      setImages([]);
      window.scrollTo({ top: 0, behavior: 'smooth' })

    } catch (err : unknown) {
        if (axios.isAxiosError(err)) {
          setResponse(err.response?.data);
          window.scrollTo({ top: 0, behavior: 'smooth' })
        } else {
          setResponse({message : 'Something went wrong', success : false})
        }
    } finally{
      setLoading(false);
    }
  };

  const handleCancel = (): void => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      setFormData(initialFormData);
      setImages([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4 md:p-6 lg:p-8 w-screen">
      {loading && <Loader/>}
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Add New Product
          </h1>
          <p className="text-gray-500 mt-2">Fill in the details to add a new product to your inventory</p>
          <div className='my-3'>
            {response.success ? <FormStatus success={true} text='Product Successfully Published'/> : <FormStatus success={false} text={response.message!}/>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
                Basic Information
              </h2>
              
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
                    placeholder="Enter product name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Brand *</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('brand', e.target.value)}
                    placeholder="Enter product Brand"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Short Description</label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange('shortDescription', e.target.value)}
                    placeholder="Brief description of the product"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Description</label>
                  <textarea
                    value={formData.fullDescription}
                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) => handleChange('fullDescription', e.target.value)}
                    placeholder="Detailed description with specifications and features"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all resize-none"
                    rows={5}
                  />
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></div>
                Pricing & Category
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) => handleChange('category', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all bg-white"
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="clothing">Clothing</option>
                    <option value="food">Food & Beverages</option>
                    <option value="books">Books</option>
                    <option value="health">Health & Beauty</option>
                    <option value="home">Home & Garden</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Taxable Product</label>
                  <div className="flex items-center h-12 px-4 border border-gray-200 rounded-xl bg-gray-50">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.taxable}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('taxable', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-pink-500 peer-checked:to-pink-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {formData.taxable ? 'Yes' : 'No'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Regular Price *</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.regularPrice}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('regularPrice', e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sale Price</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="number"
                      value={formData.salePrice}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('salePrice', e.target.value)}
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      disabled={!formData.hasSalePrice}
                      className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={formData.hasSalePrice}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('hasSalePrice', e.target.checked)}
                    className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500 accent-primary"
                  />
                  <span className="ml-2 text-sm text-gray-600 group-hover:text-gray-800">Enable sale price</span>
                </label>
              </div>
            </div>

            {/* Inventory Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
                Inventory
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">SKU (Stock Keeping Unit)</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('sku', e.target.value)}
                    placeholder="e.g., PROD-001"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Status</label>
                  <div className="flex items-center h-12 px-4 border border-gray-200 rounded-xl bg-gray-50">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('inStock', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-pink-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-green-500 peer-checked:to-green-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-700">
                        {formData.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Info Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-purple-500 to-purple-600 rounded-full"></div>
                Shipping Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('weight', e.target.value)}
                    placeholder="0.0"
                    step="0.1"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dimensions (cm)</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('dimensions', e.target.value)}
                    placeholder="L x W x H"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Stock Unit</label>
                  <input
                    type="text"
                    value={formData.stockUnit}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('stockUnit', e.target.value)}
                    placeholder="pcs, box, kg"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Images */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-6 hover:shadow-md transition-shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <div className="w-1 h-6 bg-gradient-to-b from-orange-500 to-orange-600 rounded-full"></div>
                Product Images
              </h2>
              <p className="text-sm text-gray-500 mb-5">Upload up to 5 high-quality images</p>

              {/* Image Upload Area */}
              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                  images.length >= 5
                    ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                    : 'border-gray-300 hover:border-pink-400 hover:bg-pink-50/30 cursor-pointer'
                }`}
              >
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                  disabled={images.length >= 5}
                />
                <label htmlFor="image-upload" className={images.length >= 5 ? 'cursor-not-allowed' : 'cursor-pointer'}>
                  <div className="flex flex-col items-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                      images.length >= 5 ? 'bg-gray-100' : 'bg-gradient-to-br from-pink-100 to-pink-50'
                    }`}>
                      <Upload className={`w-8 h-8 ${images.length >= 5 ? 'text-gray-400' : 'text-pink-500'}`} />
                    </div>
                    <p className={`text-sm font-medium mb-1 ${images.length >= 5 ? 'text-gray-400' : 'text-gray-700'}`}>
                      {images.length >= 5 ? 'Maximum limit reached' : 'Drag & Drop or Click to Upload'}
                    </p>
                    <p className="text-xs text-gray-500">
                      {images.length}/5 images uploaded
                    </p>
                  </div>
                </label>
              </div>

              {/* Image Preview Grid */}
              {images.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Uploaded Images</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {images.map((img: ProductImage, idx: number) => (
                      <div key={img.id} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border-2 border-gray-100">
                          <img
                            src={img.url}
                            alt={`Product ${idx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <button
                          onClick={() => removeImage(img.id)}
                          type="button"
                          className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-all shadow-lg hover:scale-110"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                        {idx === 0 && (
                          <div className="absolute bottom-2 left-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-xs px-2 py-1 rounded-md shadow-lg flex items-center gap-1">
                            <Check className="w-3 h-3" />
                            Primary
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-end gap-4">
          <button
            onClick={handleCancel}
            type="button"
            className="px-8 py-3.5 border-2 border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            type="button"
            disabled={loading}
            className={`px-8 py-3.5 bg-gradient-to-r text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5
              ${loading ? "bg-gray-300 cursor-not-allowed text-black" : "from-pink-500 via-pink-600 to-pink-500 cursor-pointer hover:from-pink-600 hover:via-pink-700 hover:to-pink-600"}
              
              `}
          >
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}