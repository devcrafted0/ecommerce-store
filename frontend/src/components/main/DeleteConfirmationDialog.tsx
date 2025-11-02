import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import ButtonLoader from './ButtonLoader';

type DeleteConfirmationDialogTypes = {
  isOpen : boolean;
  setIsOpen : React.Dispatch<React.SetStateAction<boolean>>;
  id : string;
  setDeleteId : React.Dispatch<React.SetStateAction<string>>
}

export default function DeleteConfirmationDialog({isOpen , setIsOpen , id , setDeleteId}:DeleteConfirmationDialogTypes) {
  
  const [loading , setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      setLoading(true)
      const res = await axios.delete(`/api/v1/product/delete-product/${id}`);
       window.location.reload();
    } catch (err) {
      // console.log(err);
    } finally {
      setLoading(false);
      router.push('/users/dashboard/my-products');
    }

    setIsOpen(false);
    setDeleteId('')
  };

  const handleCancel = () => {
    setIsOpen(false);
    setDeleteId('')
  };

  return (   
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
              onClick={handleCancel}
            />

            {/* Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: "spring", 
                damping: 25, 
                stiffness: 300,
                duration: 0.3 
              }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <motion.div
                className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-700/50"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Animated gradient border effect */}
                <div className="absolute inset-0 rounded-2xl opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B6349A] via-purple-600 to-pink-500 blur-xl" />
                </div>

                <div className="relative p-8">
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleCancel}
                    className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
                  >
                    <X size={24} />
                  </motion.button>

                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 0.1, 
                      type: "spring", 
                      stiffness: 200 
                    }}
                    className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/50"
                  >
                    <motion.div
                      animate={{ 
                        rotate: [0, -10, 10, -10, 0],
                      }}
                      transition={{ 
                        delay: 0.3,
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      <AlertTriangle size={32} className="text-white" />
                    </motion.div>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-2xl font-bold text-white text-center mb-3"
                  >
                    Confirm Deletion
                  </motion.h2>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-slate-300 text-center mb-8 leading-relaxed"
                  >
                    Are you sure you want to delete this item? This action cannot be undone and all associated data will be permanently removed.
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="flex gap-4"
                  >
                    {/* Cancel Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCancel}
                      className="flex-1 px-6 py-3.5 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-xl transition-colors border border-slate-600 shadow-lg"
                    >
                      Cancel
                    </motion.button>

                    {/* Confirm Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleConfirm}
                      disabled={loading}
                      className={`flex-1 px-6 py-3.5 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-500/50 hover:shadow-red-500/70 flex items-center justify-center ${loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400'}`}
                    >
                      <span className='flex-1'>
                      Delete
                      </span>
                      {loading && <span className='ml-3'><ButtonLoader/></span>}
                    </motion.button>
                  </motion.div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  className="h-1 bg-gradient-to-r from-[#B6349A] via-purple-600 to-pink-500"
                />
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
  );
}