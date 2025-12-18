"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Code, Coffee, CheckCircle, AlertCircle, ChevronDown, Check, Trash2, X, AlertTriangle } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { supabase } from "@/lib/supabase";
import CreateForm from "./CreateForm";
import EditForm from "./EditForm";
import DataTable from "./DataTable";
import { DataItem } from "./types";

export default function CRUDPage() {
  const [data, setData] = useState<DataItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingItem, setEditingItem] = useState<DataItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [connectionError, setConnectionError] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null; name: string }>({
    isOpen: false,
    id: null,
    name: "",
  });
  const [bulkDeleteModal, setBulkDeleteModal] = useState<{ isOpen: boolean; ids: string[]; count: number }>({
    isOpen: false,
    ids: [],
    count: 0,
  });
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toast notification
  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch data dari Supabase
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        setConnectionError(false);

        console.log("🔄 Fetching users from Supabase...");

        const { data: users, error } = await supabase.from("users").select("*").order("created_at", { ascending: false });

        if (error) {
          console.error("❌ Supabase error:", error.message);
          throw error;
        }

        console.log("✅ Users fetched:", users?.length || 0);

        // Transform data dari Supabase
        const formattedData: DataItem[] = (users || []).map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          created_at: user.created_at,
          updated_at: user.updated_at,
        }));

        setData(formattedData);
      } catch (error) {
        console.error("❌ Error fetching users:", error);
        setConnectionError(true);
        showNotification("Failed to connect to database", "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Filter data
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

  // Options untuk dropdown status
  const statusOptions = [
    { value: "all", label: "All Status", color: "text-gray-300", bgColor: "bg-gray-500/20" },
    { value: "active", label: "Active", color: "text-emerald-300", bgColor: "bg-emerald-500/20" },
    { value: "inactive", label: "Inactive", color: "text-amber-300", bgColor: "bg-amber-500/20" },
  ];

  const getCurrentStatus = () => {
    return statusOptions.find((option) => option.value === statusFilter) || statusOptions[0];
  };

  // CREATE - Insert ke Supabase
  const handleCreate = async (formData: Omit<DataItem, "id" | "created_at" | "updated_at">) => {
    setIsLoading(true);

    try {
      console.log("🆕 Creating user:", formData);

      const { data: newUser, error } = await supabase
        .from("users")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            role: formData.role,
            status: formData.status,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("❌ Create error:", error.message);
        throw error;
      }

      console.log("✅ User created:", newUser);

      const formattedItem: DataItem = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
        created_at: newUser.created_at,
        updated_at: newUser.updated_at,
      };

      setData((prev) => [formattedItem, ...prev]);
      setShowCreateForm(false);
      showNotification("User created successfully!", "success");
    } catch (error) {
      console.error("❌ Error creating user:", error);
      showNotification("Failed to create user", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // UPDATE - Update di Supabase
  const handleUpdate = async (id: string, updatedData: Partial<DataItem>) => {
    setIsLoading(true);

    try {
      console.log("✏️ Updating user:", id, updatedData);

      const updatePayload: {
        name?: string;
        email?: string;
        role?: string;
        status?: "active" | "inactive";
      } = {};

      if (updatedData.name !== undefined) updatePayload.name = updatedData.name;
      if (updatedData.email !== undefined) updatePayload.email = updatedData.email;
      if (updatedData.role !== undefined) updatePayload.role = updatedData.role;
      if (updatedData.status !== undefined) updatePayload.status = updatedData.status;

      const { data: updatedUser, error } = await supabase.from("users").update(updatePayload).eq("id", id).select().single();

      if (error) {
        console.error("❌ Update error:", error.message);
        throw error;
      }

      console.log("✅ User updated:", updatedUser);

      setData((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                ...updatedData,
                updated_at: updatedUser.updated_at,
              }
            : item
        )
      );
      setEditingItem(null);
      showNotification("User updated successfully!", "success");
    } catch (error) {
      console.error("❌ Error updating user:", error);
      showNotification("Failed to update user", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // DELETE - Single Delete
  const handleDelete = async (id: string) => {
    // Find the user to show name in modal
    const user = data.find((item) => item.id === id);
    if (user) {
      setDeleteModal({
        isOpen: true,
        id,
        name: user.name,
      });
    }
  };

  // Confirm Single Delete
  const confirmDelete = async () => {
    if (!deleteModal.id) return;

    setIsLoading(true);

    try {
      console.log("🗑️ Deleting user:", deleteModal.id);

      const { error } = await supabase.from("users").delete().eq("id", deleteModal.id);

      if (error) {
        console.error("❌ Delete error:", error.message);
        throw error;
      }

      console.log("✅ User deleted:", deleteModal.id);

      setData((prev) => prev.filter((item) => item.id !== deleteModal.id));
      showNotification("User deleted successfully!", "success");
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      showNotification("Failed to delete user", "error");
    } finally {
      setIsLoading(false);
      setDeleteModal({ isOpen: false, id: null, name: "" });
    }
  };

  // BULK DELETE - Open modal
  const handleBulkDelete = async (ids: string[]) => {
    setBulkDeleteModal({
      isOpen: true,
      ids,
      count: ids.length,
    });
  };

  // Confirm Bulk Delete
  const confirmBulkDelete = async () => {
    if (bulkDeleteModal.ids.length === 0) return;

    setIsLoading(true);

    try {
      // Delete multiple users
      const { error } = await supabase.from("users").delete().in("id", bulkDeleteModal.ids);

      if (error) {
        console.error("❌ Bulk delete error:", error.message);
        throw error;
      }

      console.log(`✅ ${bulkDeleteModal.ids.length} users deleted`);

      // Update local state
      setData((prev) => prev.filter((item) => !bulkDeleteModal.ids.includes(item.id)));
      setSelectedItems(new Set()); // Clear selection
      showNotification(`${bulkDeleteModal.ids.length} user(s) deleted successfully!`, "success");
    } catch (error) {
      console.error("❌ Error in bulk delete:", error);
      showNotification("Failed to delete users", "error");
    } finally {
      setIsLoading(false);
      setBulkDeleteModal({ isOpen: false, ids: [], count: 0 });
    }
  };

  return (
    <div className="min-h-screen my-20 bg-gradient-to-br from-gray-900 to-black text-white p-4 md:p-8">
      {/* Notification Toast */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`fixed top-24 right-6 z-50 px-4 py-3 rounded-xl backdrop-blur-sm border ${notification.type === "success" ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-300" : "bg-red-500/20 border-red-500/30 text-red-300"}`}
        >
          <div className="flex items-center gap-2">
            {notification.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            {notification.message}
          </div>
        </motion.div>
      )}

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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">User Management Dashboard</h1>
              <p className="text-gray-400 mt-2">{connectionError ? "Connection issue - working offline" : "Real-time CRUD with Supabase Database"}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateForm(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
            >
              <Code size={20} />
              Add New User
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[
              { label: "Total Users", value: stats.total, color: "from-blue-500 to-cyan-500" },
              { label: "Active Users", value: stats.active, color: "from-emerald-500 to-green-500" },
              { label: "Admins", value: stats.admins, color: "from-purple-500 to-pink-500" },
              { label: "Inactive", value: stats.inactive, color: "from-amber-500 to-orange-500" },
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
                    <Coffee className="w-5 h-5" />
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
              <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search users by name, email, or role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
              />
            </div>

            {/* Custom Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center justify-between w-full md:w-48 px-4 py-3 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${getCurrentStatus().bgColor}`} />
                  <span className={getCurrentStatus().color}>{getCurrentStatus().label}</span>
                </div>
                <motion.div animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown size={20} className="text-gray-400" />
                </motion.div>
              </motion.button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full mt-2 w-full md:w-48 bg-gray-800/90 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                  >
                    {statusOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
                        onClick={() => {
                          setStatusFilter(option.value);
                          setDropdownOpen(false);
                        }}
                        className="flex items-center justify-between w-full px-4 py-3 text-left transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${option.bgColor}`} />
                          <span className={option.color}>{option.label}</span>
                        </div>
                        {statusFilter === option.value && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Check size={18} className="text-blue-400" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4" />
            <p className="text-gray-400">Loading users from database...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold mb-2">No Users Found</h3>
            <p className="text-gray-400 mb-6">Your database is empty. Create your first user!</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setShowCreateForm(true)} className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold">
              Create First User
            </motion.button>
          </div>
        ) : (
          /* Main Content */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="bg-gray-900/30 backdrop-blur-lg rounded-2xl border border-gray-700/50 overflow-hidden">
            <DataTable data={filteredData} onEdit={setEditingItem} onDelete={handleDelete} onBulkDelete={handleBulkDelete} onSelectionChange={(ids) => setSelectedItems(new Set(ids))} selectedItems={selectedItems} isLoading={isLoading} />
          </motion.div>
        )}

        {/* Create Form Modal */}
        <AnimatePresence>{showCreateForm && <CreateForm key="create-form" onSubmit={handleCreate} onClose={() => setShowCreateForm(false)} isLoading={isLoading} />}</AnimatePresence>

        {/* Edit Form Modal */}
        <AnimatePresence>{editingItem && <EditForm key={editingItem.id} item={editingItem} onSubmit={handleUpdate} onClose={() => setEditingItem(null)} isLoading={isLoading} />}</AnimatePresence>

        {/* Single Delete Modal */}
        <AnimatePresence>{deleteModal.isOpen && <DeleteModal name={deleteModal.name} onConfirm={confirmDelete} onCancel={() => setDeleteModal({ isOpen: false, id: null, name: "" })} isLoading={isLoading} />}</AnimatePresence>

        {/* Bulk Delete Modal */}
        <AnimatePresence>
          {bulkDeleteModal.isOpen && <BulkDeleteModal count={bulkDeleteModal.count} onConfirm={confirmBulkDelete} onCancel={() => setBulkDeleteModal({ isOpen: false, ids: [], count: 0 })} isLoading={isLoading} />}
        </AnimatePresence>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mt-8 text-center text-gray-500 text-sm">
          <p>
            Showing {filteredData.length} of {data.length} users
            {connectionError && " (offline mode)"}
          </p>
          <p className="mt-1">Powered by Next.js + Supabase + Framer Motion</p>
        </motion.div>
      </div>
    </div>
  );
}

// Delete Modal Component
function DeleteModal({ name, onConfirm, onCancel, isLoading }: { name: string; onConfirm: () => void; onCancel: () => void; isLoading: boolean }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[200]" onClick={onCancel}>
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 w-full max-w-md shadow-2xl shadow-red-900/20"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/20">
                <AlertTriangle size={24} className="text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Delete User</h2>
                <p className="text-gray-400 text-sm">This action cannot be undone</p>
              </div>
            </div>
            <motion.button whileHover={{ rotate: 90, backgroundColor: "rgba(255, 255, 255, 0.1)" }} whileTap={{ scale: 0.9 }} onClick={onCancel} className="p-2 rounded-lg transition-all duration-300">
              <X size={20} className="text-gray-400" />
            </motion.button>
          </div>

          {/* Warning Message */}
          <div className="mb-6 p-4 bg-red-900/20 rounded-xl border border-red-500/20">
            <p className="text-red-300 font-medium mb-2">⚠️ Warning: You are about to delete a user</p>
            <p className="text-gray-300">
              Are you sure you want to delete <span className="font-bold text-white">{name}</span>? This will permanently remove all user data from the database.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCancel}
              className="flex-1 px-6 py-3.5 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 font-medium"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 size={20} />
                  Delete User
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Bulk Delete Modal Component
function BulkDeleteModal({ count, onConfirm, onCancel, isLoading }: { count: number; onConfirm: () => void; onCancel: () => void; isLoading: boolean }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-[200]" onClick={onCancel}>
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-red-500/30 w-full max-w-md shadow-2xl shadow-red-900/20"
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-red-500/20">
                <AlertTriangle size={28} className="text-red-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Delete Multiple Users</h2>
                <p className="text-gray-400 text-sm">This will affect {count} user(s)</p>
              </div>
            </div>
            <motion.button whileHover={{ rotate: 90, backgroundColor: "rgba(255, 255, 255, 0.1)" }} whileTap={{ scale: 0.9 }} onClick={onCancel} className="p-2 rounded-lg transition-all duration-300">
              <X size={20} className="text-gray-400" />
            </motion.button>
          </div>

          {/* Warning Message */}
          <div className="mb-6 p-4 bg-red-900/20 rounded-xl border border-red-500/20">
            <p className="text-red-300 font-medium mb-2">⚠️ Critical Action</p>
            <p className="text-gray-300">
              You are about to delete <span className="font-bold text-white">{count} user(s)</span> permanently. This action cannot be undone and will remove all selected data from the database.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onCancel}
              className="flex-1 px-6 py-3.5 rounded-xl bg-gray-800/50 border border-gray-700/50 hover:bg-gray-700/50 transition-all duration-300 font-medium"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                  Deleting {count} users...
                </>
              ) : (
                <>
                  <Trash2 size={20} />
                  Delete {count} Users
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
