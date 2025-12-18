"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Filter, RefreshCw, Database, Users, Activity, Shield } from "lucide-react";
import CreateForm from "@/app/crud/CreateForm";
import EditForm from "@/app/crud/EditForm";
import DataTable from "@/app/crud/DataTable";
import { DataItem } from "@/app/crud/types";

// Initial sample data
const initialData: DataItem[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "Admin", status: "active", createdAt: new Date("2024-01-15") },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "User", status: "active", createdAt: new Date("2024-01-16") },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "Editor", status: "inactive", createdAt: new Date("2024-01-17") },
  { id: "4", name: "Alice Brown", email: "alice@example.com", role: "Viewer", status: "active", createdAt: new Date("2024-01-18") },
];

export default function CRUDPage() {
  const [data, setData] = useState<DataItem[]>(initialData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Filter data based on search and filter
  const filteredData = data.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || item.email.toLowerCase().includes(searchTerm.toLowerCase()) || item.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Stats calculation
  const stats = {
    total: data.length,
    active: data.filter((item) => item.status === "active").length,
    admins: data.filter((item) => item.role === "Admin").length,
    inactive: data.filter((item) => item.status === "inactive").length,
  };

  // CRUD Operations
  const handleCreate = (formData: Omit<DataItem, "id" | "createdAt">) => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newItem: DataItem = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
      };

      setData((prev) => [newItem, ...prev]);
      setShowCreateForm(false);
      setIsLoading(false);

      // Show success notification
      showNotification("Item created successfully!", "success");
    }, 800);
  };

  const handleUpdate = (id: string, updatedData: Partial<DataItem>) => {
    setIsLoading(true);

    setTimeout(() => {
      setData((prev) => prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item)));
      setEditingItem(null);
      setIsLoading(false);
      showNotification("Item updated successfully!", "success");
    }, 800);
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    setIsLoading(true);

    setTimeout(() => {
      setData((prev) => prev.filter((item) => item.id !== id));
      setIsLoading(false);
      showNotification("Item deleted successfully!", "error");
    }, 600);
  };

  const showNotification = (message: string, type: "success" | "error") => {
    // You can implement a proper notification system here
    console.log(`${type.toUpperCase()}: ${message}`);
  };

  return (
    <div className="min-h-screen mt-20 bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 40, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: 1 }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">User Management Dashboard</h1>
              <p className="text-gray-400 mt-2">Manage your users with powerful CRUD operations</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              <Plus size={20} />
              Add New User
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { icon: Database, label: "Total Users", value: stats.total, color: "from-blue-500 to-cyan-500" },
              { icon: Users, label: "Active Users", value: stats.active, color: "from-emerald-500 to-green-500" },
              { icon: Shield, label: "Admins", value: stats.admins, color: "from-purple-500 to-pink-500" },
              { icon: Activity, label: "Inactive", value: stats.inactive, color: "from-amber-500 to-orange-500" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}/20`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{stat.value}</div>
                    <div className="text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Search and Filter */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            <div className="flex gap-2">
              <motion.select
                whileFocus={{ scale: 1.02 }}
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:outline-none focus:border-purple-500/50"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </motion.select>

              <motion.button
                whileHover={{ rotate: 180 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                }}
                className="px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-colors"
              >
                <RefreshCw size={20} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-gray-900/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 overflow-hidden">
          <DataTable data={filteredData} onEdit={setEditingItem} onDelete={handleDelete} isLoading={isLoading} />
        </motion.div>

        {/* Create Form Modal */}
        <AnimatePresence>{showCreateForm && <CreateForm onSubmit={handleCreate} onClose={() => setShowCreateForm(false)} isLoading={isLoading} />}</AnimatePresence>

        {/* Edit Form Modal */}
        <AnimatePresence>{editingItem && <EditForm item={editingItem} onSubmit={handleUpdate} onClose={() => setEditingItem(null)} isLoading={isLoading} />}</AnimatePresence>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 text-center text-gray-500 text-sm">
          <p>Total of {filteredData.length} users displayed • Click on any row to edit</p>
          <p className="mt-1">Built with Next.js, Framer Motion, and Tailwind CSS</p>
        </motion.div>
      </div>
    </div>
  );
}
