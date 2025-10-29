'use client'
import React, { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { useUser } from '@/context/userContext';
import { type Product } from '@/assets/assets';
import Loader from '@/components/main/Loader';
import { useDashboard } from '@/context/dashboardContext';
import { useRouter } from 'next/navigation';
import DeleteConfirmationDialog from '@/components/main/DeleteConfirmationDialog';

const Page = () => {
  const a = {
  "_id":  "68f485505f6420ca49177e7f",
  "owner": "68edc7e10a275cd9f1a646f3",
  "name": "Hash Bubbie White Sneakers for Women",
  "category": "apparel-accessories",
  "regularPrice": 12,
  "salePrice": 8,
  "hasSalePrice": true,
  "taxable": false,
  "sku": "PRODUCT-02",
  "shortDescription": "Comfortable and Breathable , Classic Style , Anti-Slip Shoes",
  "fullDescription": "【Comfortable and Breathable】women's canvas shoes are made of canvas upper,which makes you feel breathable when you wear them.The classic canvas shoes reinforce and soften the heel, they don't grind your feet,and not tired when walking or running.\r\n【Classic Style】The lace up canvas sneakers are timeless,they feature younger and livelier, Free and cute.suitable for all year round.It's a good choice for back-to-school .\r\n【Anti-Slip】Canvas low top sneaker for women are anti-slip and soft thanks to the durable rubber sole,so that you will feel confidence even though walking in a rainy day.Individual stripe design at the bottom for enhanced friction and grip.\r\n【Occasion】Casual fashion canvas shoes fit for outdoor actives,dacing,tennis,standing work,walking,casual,floorshoes,plantar,fasciitis,fishing,gardening,dress,shopping,travel,driving,jazz,zumba,athletic,workout.\r\n【hash bubbie Size Tips】：Classic Canvas Shoes are designed for USA womens ,If you can check the size before ordering, maybe you will get a more fit and comfortable shoes.",
  "brand": "No Brand",
  "images": [
    {
      "url": "https://res.cloudinary.com/djtkhrf2b/image/upload/v1760855376/qw3du7pjuiewarlbkzdp.jpg",
      "public_id": "qw3du7pjuiewarlbkzdp",
      "_id" : "68f485505f6420ca49177e80"
    },
    {
      "url": "https://res.cloudinary.com/djtkhrf2b/image/upload/v1760855376/bywfj2hl5yiusxghlans.jpg",
      "public_id": "bywfj2hl5yiusxghlans",
      "_id":"68f485505f6420ca49177e81"
    },
    {
      "url": "https://res.cloudinary.com/djtkhrf2b/image/upload/v1760855376/ouzjmykcpbouni5gtqfe.jpg",
      "public_id": "ouzjmykcpbouni5gtqfe",
      "_id":"68f485505f6420ca49177e82"
    },
    {
      "url": "https://res.cloudinary.com/djtkhrf2b/image/upload/v1760855376/z86vlvj0wfphx31iyau7.jpg",
      "public_id": "z86vlvj0wfphx31iyau7",
      "_id": "68f485505f6420ca49177e83"
    },
    {
      "url": "https://res.cloudinary.com/djtkhrf2b/image/upload/v1760855376/a4bnly9qdw0cakswbpj0.jpg",
      "public_id": "a4bnly9qdw0cakswbpj0",
      "_id": "68f485505f6420ca49177e84"
    }
  ],
  "inStock": true,
  "stockUnit": "pcs",
  "weight": "12",
  "dimensions": "12",
  createdAt : '2025-10-19T06:29:36.218+00:00',
  updatedAt : '2025-10-19T06:29:36.218+00:00'
  }
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading , setLoading] = useState<boolean>(false);
  const {user} = useUser();

  const [deletePopup , setDeletePopup] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string>('');

  const {setEditId} = useDashboard();

  const fetchProducts = async() => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/v1/product?userId=${user?._id}`);
      // For directly getting the products
      setProducts(res.data.data);
    } catch (err) {
      if(err instanceof AxiosError){
        console.error(`Axios Error : ${err.message}`);
      } else {
        console.error(`Unknown Error : ${err}`)
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    if(user){
      fetchProducts();
    }
  }, [user])

  if(loading) {
   return <Loader />
  }

  const editButtonHandeler = (id : string) => {
    setEditId(id);
    router.push('/users/dashboard/my-products/edit');
  }

  const handleDelete = (id : string) => {
    setDeleteId(id);
    setDeletePopup(true);
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: '#B6349A' }}>
              Product Management
            </h1>
            <p className="text-gray-600 text-sm mt-1">Manage your product inventory</p>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product?._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 overflow-hidden">
              <div className="flex flex-col sm:flex-row items-stretch">
                {/* Product Image */}
                <div className="w-full sm:w-32 md:w-40 h-48 sm:h-auto flex-shrink-0">
                  <img 
                    src={product.images[0].url} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between">
                  <div className="grid grid-cols-1 1440:grid-cols-12 gap-4 items-center">
                    {/* Info Section */}
                    <div className="lg:col-span-5">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold px-2 py-1 rounded" style={{ backgroundColor: '#B6349A20', color: '#B6349A' }}>
                          {product.brand}
                        </span>
                        <span className="text-xs text-gray-500">
                          {product.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-2 mb-2">
                        {product.name}
                      </h3>
                      {/* <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < Math.floor(product?.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">
                          {product.rating} ({product.reviews})
                        </span>
                      </div> */}
                    </div>

                    {/* Price Section */}
                    <div className="lg:col-span-2">
                      <div className="flex flex-col">
                        <span className="text-lg sm:text-xl font-bold" style={{ color: '#B6349A' }}>
                          ${product.hasSalePrice && product?.salePrice.toFixed(2)}
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          ${product.regularPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    {/* Stock Toggle */}
                    <div className="lg:col-span-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600 font-medium">Stock:</span>
                        <button
                          // onClick={() => toggleStock(product.id)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            product.inStock ? 'bg-green-500' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              product.inStock ? 'translate-x-6' : 'translate-x-1'
                            }`}
                          />
                        </button>
                        <span className={`text-xs font-medium ${product.inStock ? 'text-green-600' : 'text-gray-500'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="lg:col-span-3 flex items-center gap-2 justify-start lg:justify-end">
                      <button
                        // onClick={() => handleEdit(product.id)}
                        className="flex items-center gap-1 px-3 py-2 rounded-lg border-2 font-medium text-sm hover:bg-opacity-10 transition-colors"
                        style={{ 
                          borderColor: '#B6349A',
                          color: '#B6349A',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#B6349A10'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        onClick={()=>editButtonHandeler(product._id)}
                      >
                        <Edit2 size={16} />
                        <span className="hidden sm:inline">Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="flex items-center gap-1 px-3 py-2 bg-red-500 text-white rounded-lg font-medium text-sm hover:bg-red-600 transition-colors"
                      >
                        <Trash2 size={16} />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <DeleteConfirmationDialog isOpen={deletePopup} setIsOpen={setDeletePopup} id={deleteId} setDeleteId={setDeleteId}/>

        {/* Empty State */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            <button 
              className="mt-4 px-6 py-2 rounded-lg text-white font-medium"
              style={{ backgroundColor: '#B6349A' }}
            >
              Add Your First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;