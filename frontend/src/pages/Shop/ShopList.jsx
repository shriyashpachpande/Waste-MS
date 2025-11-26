import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Package } from "lucide-react";

export default function ShopList() {
  const api = useApi();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api("/shop/items")
      .then((data) => setItems(data || []))
      .finally(() => setLoading(false));
  }, []);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="max-w-7xl mx-auto px-4 py-10"
    >

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 mb-4">
          <ShoppingBag size={32} />
        </div>
        <h2 className="font-bold text-3xl md:text-4xl text-gray-900 dark:text-white mb-3 tracking-tight">
          Eco Shop
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-lg">
          Redeem your points for eco-friendly products and tools.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map(product => (
          <motion.div
            variants={item}
            key={product._id}
            className="group bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-xl hover:border-green-200 dark:hover:border-green-900 transition-all duration-300 flex flex-col overflow-hidden"
          >
            {/* Image Area */}
            <div className="relative h-48 bg-gray-50 dark:bg-gray-900/50 p-6 flex items-center justify-center group-hover:bg-green-50 dark:group-hover:bg-green-900/10 transition-colors">
              <img
                src={product.image || "https://via.placeholder.com/150?text=No+Image"}
                alt={product.name}
                className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
              />
              {product.category && (
                <span className="absolute top-3 right-3 px-2 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur text-xs font-bold text-gray-600 dark:text-gray-300 rounded-lg shadow-sm">
                  {product.category}
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 line-clamp-1" title={product.name}>
                {product.name}
              </h3>

              <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-1">
                {product.description || "No description available."}
              </p>

              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-semibold">Price</span>
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    ₹{product.price}
                  </span>
                </div>

                <Link
                  to={`/shop/order?item=${product._id}`}
                  className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-xl font-semibold text-sm hover:bg-green-600 dark:hover:bg-green-400 hover:text-white dark:hover:text-gray-900 transition-colors"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </motion.div>
        ))}

        {!items.length && (
          <div className="col-span-full text-center py-16 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
            <Package size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">No items available</h3>
            <p className="text-gray-500 dark:text-gray-400 mt-1">The shop is currently empty.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
