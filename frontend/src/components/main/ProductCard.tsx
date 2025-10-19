import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, TrendingDown, Eye } from 'lucide-react';
import { type Product } from '@/assets/assets';


const ProductCard = ({ product }: { product?: Product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Calculate discount percentage
  const discountPercentage = product?.hasSalePrice
    ? Math.round(((product.regularPrice - product.salePrice) / product.regularPrice) * 100)
    : 0;

  // Mock rating
  const rating = 4.5;
  const reviewCount = 128;

  const handleAddToCart = () => {
    console.log('Added to cart:', product?._id);
  };

  const handleQuickView = () => {
    console.log('Quick view:', product?._id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group relative w-full max-w-[320px] overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:shadow-[#B6349A]/20"
    >
      {/* Image Section */}
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.img
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          src={product?.images[currentImageIndex].url || product?.images[0].url}
          alt={product?.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute left-2 top-2 flex flex-col gap-1.5">
          {product?.hasSalePrice && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#B6349A] to-[#D87BC0] px-2 py-0.5 text-xs font-bold text-white shadow-lg"
            >
              <TrendingDown size={10} />
              {discountPercentage}%
            </motion.div>
          )}
          {!product?.inStock && (
            <div className="rounded-full bg-gray-900/90 px-2 py-0.5 text-xs font-semibold text-white">
              Out of Stock
            </div>
          )}
        </div>

        {/* Image Indicators */}
        {product?.images.length! > 1 && (
          <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
            {product?.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`h-1 rounded-full transition-all ${
                  currentImageIndex === index
                    ? 'w-4 bg-[#B6349A]'
                    : 'w-1 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-3">
        {/* Brand & Category */}
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[10px] font-semibold uppercase tracking-wide text-[#B6349A]">
            {product?.brand}
          </span>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-600">
            {product?.category.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
          </span>
        </div>

        {/* Product Name */}
        <h3 className="mb-1.5 line-clamp-1 text-base font-bold text-gray-900 transition-colors group-hover:text-[#B6349A]">
          {product?.name}
        </h3>

        {/* Rating */}
        <div className="mb-2 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={
                  i < Math.floor(rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-gray-200 text-gray-200'
                }
              />
            ))}
          </div>
          <span className="text-xs text-gray-600">
            {rating} <span className="text-gray-400">({reviewCount})</span>
          </span>
        </div>

        {/* Price & Cart */}
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col">
            {product?.hasSalePrice ? (
              <>
                <span className="text-xs text-gray-400 line-through">
                  ${product?.regularPrice.toFixed(2)}
                </span>
                <span className="text-xl font-bold text-[#B6349A]">
                  ${product?.salePrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold text-gray-900">
                ${product?.regularPrice.toFixed(2)}
              </span>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!product?.inStock}
            className={`flex items-center gap-1.5 rounded-xl px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all ${
              product?.inStock
                ? 'bg-gradient-to-r from-[#B6349A] to-[#D87BC0] hover:shadow-xl hover:shadow-[#B6349A]/30'
                : 'cursor-not-allowed bg-gray-400'
            }`}
          >
            <ShoppingCart size={16} />
            Add
          </motion.button>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        className="h-1 w-full bg-gradient-to-r from-[#B6349A] via-[#D87BC0] to-[#B6349A]"
      />
    </motion.div>
  );
};

export default ProductCard;

// // Demo Component
// export default function App() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-8">
//       <div className="mx-auto max-w-7xl">
//         <div className="mb-8 text-center">
//           <h1 className="mb-2 text-3xl sm:text-4xl font-bold text-gray-900">
//             Product Showcase
//           </h1>
//           <p className="text-sm sm:text-base text-gray-600">Professional e-commerce product card</p>
//         </div>
        
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
//           <ProductCard />
//           <ProductCard />
//           <ProductCard />
//           <ProductCard />
//         </div>
//       </div>
//     </div>
//   );
// }