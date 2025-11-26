import React, { useEffect, useState } from "react";
import useApi from "../../hooks/useApi";
import { PlusCircle, Tag, Image as ImgIcon, Trash2, DollarSign, Package, Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminShopPanel() {
    const api = useApi();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [name, setName] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [img, setImg] = useState("");

    const [deleting, setDeleting] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const refresh = () => {
        setLoading(true);
        api("/shop/items")
            .then((data) => setItems(data || []))
            .finally(() => setLoading(false));
    };

    useEffect(() => { refresh(); }, []);

    const addItem = async () => {
        if (!name || !category || !price || !img) return;

        await api("/shop/items", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                description: desc,
                category,
                price: Number(price),
                image: img,
                available: true
            })
        });

        setName("");
        setDesc("");
        setCategory("");
        setPrice("");
        setImg("");
        refresh();
    };

    const removeItem = async id => {
        await api(`/shop/items/${id}`, { method: "DELETE" });
        setDeleting(null);
        refresh();
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-6xl mx-auto p-6">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Shop Management</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage inventory and eco-friendly products.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* ADD ITEM FORM */}
                <div className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-lg p-6 sticky top-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                            <PlusCircle className="w-5 h-5 text-green-600" />
                            Add New Item
                        </h3>

                        <div className="space-y-4">
                            <InputField icon={<Package size={18} />} value={name} setValue={setName} placeholder="Product Name" />
                            <InputField icon={<Tag size={18} />} value={category} setValue={setCategory} placeholder="Category" />
                            <InputField icon={<DollarSign size={18} />} value={price} setValue={setPrice} type="number" placeholder="Price (₹)" />
                            <InputField icon={<ImgIcon size={18} />} value={img} setValue={setImg} placeholder="Image URL" />

                            <div className="relative">
                                <textarea
                                    value={desc}
                                    onChange={e => setDesc(e.target.value)}
                                    placeholder="Product Description"
                                    rows={3}
                                    className="w-full border border-gray-200 dark:border-gray-600 rounded-xl p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white resize-none"
                                />
                            </div>

                            <button
                                onClick={addItem}
                                disabled={!name || !price}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-xl font-bold shadow-lg shadow-green-600/20 transition-all hover:-translate-y-0.5"
                            >
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>

                {/* ITEMS LIST */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                        />
                    </div>

                    {loading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                        </div>
                    ) : filteredItems.length === 0 ? (
                        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                            <Package size={48} className="mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                            <p className="text-gray-500 dark:text-gray-400">No products found.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <AnimatePresence>
                                {filteredItems.map(item => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        key={item._id}
                                        className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl shadow-sm p-4 hover:shadow-md transition-shadow flex flex-col"
                                    >
                                        <div className="relative h-40 bg-gray-50 dark:bg-gray-900/50 rounded-xl mb-4 overflow-hidden group">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute top-2 right-2">
                                                <span className="px-2 py-1 bg-white/90 dark:bg-gray-800/90 backdrop-blur text-xs font-bold rounded-lg shadow-sm text-gray-600 dark:text-gray-300">
                                                    {item.category}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="font-bold text-gray-900 dark:text-white line-clamp-1">{item.name}</h4>
                                                <span className="font-bold text-green-600 dark:text-green-400">₹{item.price}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mb-4 h-8">{item.description}</p>
                                        </div>

                                        <button
                                            onClick={() => setDeleting(item)}
                                            className="w-full py-2 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* DELETE CONFIRMATION MODAL */}
            <AnimatePresence>
                {deleting && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl w-full max-w-sm border border-gray-100 dark:border-gray-700"
                        >
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Delete Product?</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                Are you sure you want to delete <span className="font-bold text-gray-900 dark:text-white">{deleting.name}</span>? This action cannot be undone.
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setDeleting(null)}
                                    className="flex-1 py-2.5 rounded-xl font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => removeItem(deleting._id)}
                                    className="flex-1 py-2.5 rounded-xl font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-600/20"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}


/* -------- REUSABLE INPUT FIELD COMPONENT ---------- */
function InputField({ icon, value, setValue, placeholder, type = "text" }) {
    return (
        <div className="relative">
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                {icon}
            </div>
            <input
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={placeholder}
                className="w-full border border-gray-200 dark:border-gray-600 rounded-xl pl-10 p-3 text-sm focus:ring-2 focus:ring-green-500 outline-none bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white transition-all"
            />
        </div>
    );
}
