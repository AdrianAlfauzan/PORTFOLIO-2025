// components/admin/Modals.tsx
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Check, Star, Edit, X } from "lucide-react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

// Base Modal Component
export function BaseModal({ isOpen, onClose, title, children }: BaseModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gray-800/95 backdrop-blur-xl rounded-xl md:rounded-2xl border border-gray-700/50 w-full max-w-md shadow-2xl shadow-black/50"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{title}</h3>
                <motion.button whileHover={{ rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-700/50 transition-all">
                  <X size={20} className="text-gray-400" />
                </motion.button>
              </div>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Delete Confirmation Modal
interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  commentName: string;
}

export function DeleteModal({ isOpen, onClose, onConfirm, commentName }: DeleteModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Delete Comment">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-500/20">
            <AlertCircle size={24} className="text-red-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Confirm Deletion</h4>
            <p className="text-gray-400 text-sm">Are you sure you want to delete this comment?</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gray-700/30 border border-gray-600/50">
          <p className="text-gray-300">
            Comment by <span className="font-semibold text-white">{commentName}</span>
          </p>
          <p className="text-gray-400 text-sm mt-1">This action cannot be undone.</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition-all font-medium">
            Delete Comment
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

// Approve Modal
interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  commentName: string;
}

export function ApproveModal({ isOpen, onClose, onConfirm, commentName }: ApproveModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Approve Comment">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/20">
            <Check size={24} className="text-emerald-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Approve Comment</h4>
            <p className="text-gray-400 text-sm">This comment will be visible to all users.</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gray-700/30 border border-gray-600/50">
          <p className="text-gray-300">
            Approve comment by <span className="font-semibold text-white">{commentName}</span>
          </p>
          <p className="text-gray-400 text-sm mt-1">The comment will appear in the &quot;Approved&quot; section.</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-all font-medium flex items-center justify-center gap-2">
            <Check size={18} />
            Approve Comment
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

// Feature Modal
interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  commentName: string;
}

export function FeatureModal({ isOpen, onClose, onConfirm, commentName }: FeatureModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Feature Comment">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-yellow-500/20">
            <Star size={24} className="text-yellow-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Feature Comment</h4>
            <p className="text-gray-400 text-sm">This comment will be highlighted as featured.</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gray-700/30 border border-gray-600/50">
          <p className="text-gray-300">
            Feature comment by <span className="font-semibold text-white">{commentName}</span>
          </p>
          <p className="text-gray-400 text-sm mt-1">Featured comments appear with a star badge and special styling.</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-700 transition-all font-medium flex items-center justify-center gap-2">
            <Star size={18} />
            Feature Comment
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

// Needs Revision Modal
interface NeedsRevisionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  commentName: string;
}

export function NeedsRevisionModal({ isOpen, onClose, onConfirm, commentName }: NeedsRevisionModalProps) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Request Revision">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-orange-500/20">
            <Edit size={24} className="text-orange-400" />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Request Revision</h4>
            <p className="text-gray-400 text-sm">Ask the user to improve their comment.</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-gray-700/30 border border-gray-600/50">
          <p className="text-gray-300">
            Request revision from <span className="font-semibold text-white">{commentName}</span>
          </p>
          <p className="text-gray-400 text-sm mt-1">The comment will be moved to &quot;Request Edit&quot; section.</p>
        </div>

        <div className="flex gap-3 pt-2">
          <button onClick={onClose} className="flex-1 py-3 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 border border-gray-600/50 transition-all">
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-3 rounded-lg bg-orange-600 hover:bg-orange-700 transition-all font-medium flex items-center justify-center gap-2">
            <Edit size={18} />
            Request Revision
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
