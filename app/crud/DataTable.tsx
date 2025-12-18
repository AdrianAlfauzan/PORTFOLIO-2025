"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Edit2, Trash2, CheckCircle, XCircle, User, Check } from "lucide-react";
import { DataItem } from "./types";

interface DataTableProps {
  data: DataItem[];
  onEdit: (item: DataItem) => void;
  onDelete: (id: string) => void;
  onBulkDelete: (ids: string[]) => void; // <--- Tambah prop baru
  onSelectionChange: (selectedIds: string[]) => void; // <--- Tambah prop baru
  isLoading: boolean;
  selectedItems?: Set<string>; // <--- Tambah prop
}

export default function DataTable({ data, onEdit, onDelete, onBulkDelete, onSelectionChange, isLoading, selectedItems = new Set() }: DataTableProps) {
  const [localSelected, setLocalSelected] = useState<Set<string>>(selectedItems);
  const [isAllSelected, setIsAllSelected] = useState(false);

  // Sync with parent
  useEffect(() => {
    setLocalSelected(selectedItems);
    setIsAllSelected(selectedItems.size === data.length && data.length > 0);
  }, [selectedItems, data]);

  // Handle individual checkbox
  const handleSelectItem = (id: string, checked: boolean) => {
    const newSelected = new Set(localSelected);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setLocalSelected(newSelected);
    onSelectionChange(Array.from(newSelected));
    setIsAllSelected(newSelected.size === data.length && data.length > 0);
  };

  // Handle select all
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = data.map((item) => item.id);
      const newSelected = new Set(allIds);
      setLocalSelected(newSelected);
      onSelectionChange(Array.from(newSelected));
    } else {
      setLocalSelected(new Set());
      onSelectionChange([]);
    }
    setIsAllSelected(checked);
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    if (localSelected.size === 0) return;

    if (confirm(`Are you sure you want to delete ${localSelected.size} user(s)?`)) {
      onBulkDelete(Array.from(localSelected));
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
      },
    },
  };

  return (
    <div className="overflow-x-auto">
      {/* Bulk Actions Bar */}
      {localSelected.size > 0 && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-t-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-blue-500/20 border border-blue-500/30 flex items-center justify-center">
                <Check size={14} className="text-blue-400" />
              </div>
              <span className="text-blue-300 font-medium">
                {localSelected.size} user{localSelected.size > 1 ? "s" : ""} selected
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleSelectAll(false)} className="px-3 py-1.5 text-sm text-blue-300 hover:text-blue-200 hover:bg-blue-500/10 rounded-lg transition-colors">
              Deselect All
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBulkDelete}
              className="px-4 py-1.5 text-sm bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-lg transition-all flex items-center gap-2"
            >
              <Trash2 size={14} />
              Delete Selected ({localSelected.size})
            </motion.button>
          </div>
        </motion.div>
      )}

      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-700/50">
            {/* Checkbox Header */}
            <th className="text-left p-4 text-gray-400 font-medium w-12">
              <div className="flex items-center">
                <input type="checkbox" checked={isAllSelected} onChange={(e) => handleSelectAll(e.target.checked)} className="w-4 h-4 rounded bg-gray-800/50 border-gray-600 text-blue-500 focus:ring-blue-500/30" />
              </div>
            </th>

            <th className="text-left p-4 text-gray-400 font-medium">User</th>
            <th className="text-left p-4 text-gray-400 font-medium">Role</th>
            <th className="text-left p-4 text-gray-400 font-medium">Status</th>
            <th className="text-left p-4 text-gray-400 font-medium">Created</th>
            <th className="text-left p-4 text-gray-400 font-medium">Actions</th>
          </tr>
        </thead>

        <motion.tbody variants={containerVariants} initial="hidden" animate="visible" className="divide-y divide-gray-700/30">
          {data.map((item) => (
            <motion.tr
              key={item.id}
              variants={itemVariants}
              whileHover={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                transition: { duration: 0.2 },
              }}
              className={`cursor-pointer hover:bg-gray-800/30 ${localSelected.has(item.id) ? "bg-blue-500/5" : ""}`}
            >
              {/* Checkbox Cell */}
              <td className="p-4">
                <div className="flex items-center">
                  <input type="checkbox" checked={localSelected.has(item.id)} onChange={(e) => handleSelectItem(item.id, e.target.checked)} className="w-4 h-4 rounded bg-gray-800/50 border-gray-600 text-blue-500 focus:ring-blue-500/30" />
                </div>
              </td>

              {/* User Info */}
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className={`p-2 rounded-full ${localSelected.has(item.id) ? "bg-gradient-to-br from-blue-500/30 to-purple-500/30" : "bg-gradient-to-br from-blue-500/20 to-purple-500/20"}`}
                  >
                    <User size={20} className="text-blue-400" />
                  </motion.div>
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-400">{item.email}</div>
                  </div>
                </div>
              </td>

              {/* Role */}
              <td className="p-4">
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${item.role === "Admin" ? "bg-purple-500/20 text-purple-300" : item.role === "Editor" ? "bg-blue-500/20 text-blue-300" : "bg-gray-500/20 text-gray-300"}`}
                >
                  {item.role}
                </motion.span>
              </td>

              {/* Status */}
              <td className="p-4">
                <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
                  {item.status === "active" ? (
                    <>
                      <CheckCircle size={16} className="text-emerald-400" />
                      <span className="text-emerald-400">Active</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={16} className="text-amber-400" />
                      <span className="text-amber-400">Inactive</span>
                    </>
                  )}
                </motion.div>
              </td>

              {/* Created Date */}
              <td className="p-4 text-gray-400 text-sm">{new Date(item.created_at).toLocaleDateString()}</td>

              {/* Actions */}
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(item);
                    }}
                    className="p-2 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 transition-colors"
                    title="Edit"
                  >
                    <Edit2 size={16} />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(item.id);
                    }}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </motion.button>
                </div>
              </td>
            </motion.tr>
          ))}
        </motion.tbody>
      </table>

      {/* Empty State */}
      {data.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
          <div className="text-gray-500 mb-4">No users found</div>
          <div className="text-sm text-gray-600">Try changing your search or filter criteria</div>
        </motion.div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full" />
        </motion.div>
      )}
    </div>
  );
}
