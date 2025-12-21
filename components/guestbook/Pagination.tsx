import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  indexOfFirstItem: number;
  indexOfLastItem: number;
  onPageChange: (page: number) => void;
  onNext: () => void;
  onPrev: () => void;
  getPaginationNumbers: () => (number | string)[];
}

export default function Pagination({ currentPage, totalPages, totalItems, indexOfFirstItem, indexOfLastItem, onPageChange, onNext, onPrev, getPaginationNumbers }: PaginationProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center gap-3 md:gap-4 mb-10 md:mb-12">
      {/* Pagination Info */}
      <div className="text-gray-400 text-xs md:text-sm text-center px-4">
        Page {currentPage} of {totalPages} • Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, totalItems)} of {totalItems} comments
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-1 md:gap-2">
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onPrev}
          disabled={currentPage === 1}
          className={`p-2 md:p-3 rounded-lg md:rounded-xl border transition-all duration-300 flex items-center gap-1 md:gap-2 ${
            currentPage === 1 ? "bg-gray-800/30 border-gray-700/50 text-gray-600 cursor-not-allowed" : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/20 hover:text-purple-300"
          }`}
        >
          <ChevronLeft size={18} className="md:size-5" />
          <span className="hidden sm:inline text-sm md:text-base">Previous</span>
        </motion.button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1 md:gap-2 mx-2 md:mx-4">
          {getPaginationNumbers().map((pageNum, index) =>
            pageNum === "..." ? (
              <span key={`dots-${index}`} className="px-2 md:px-3 py-1 text-gray-500 text-sm md:text-base">
                •••
              </span>
            ) : (
              <motion.button
                key={pageNum}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(pageNum as number)}
                className={`px-2.5 md:px-3.5 py-1.5 md:py-2 rounded-lg border transition-all duration-300 min-w-[32px] md:min-w-[40px] text-sm md:text-base ${
                  currentPage === pageNum
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500/50 text-white shadow-lg shadow-purple-500/25"
                    : "bg-gray-800/30 border-gray-700/50 text-gray-300 hover:border-purple-500/30 hover:bg-purple-500/10"
                }`}
              >
                {pageNum}
              </motion.button>
            )
          )}
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onNext}
          disabled={currentPage === totalPages}
          className={`p-2 md:p-3 rounded-lg md:rounded-xl border transition-all duration-300 flex items-center gap-1 md:gap-2 ${
            currentPage === totalPages ? "bg-gray-800/30 border-gray-700/50 text-gray-600 cursor-not-allowed" : "bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/20 hover:text-purple-300"
          }`}
        >
          <span className="hidden sm:inline text-sm md:text-base">Next</span>
          <ChevronRight size={18} className="md:size-5" />
        </motion.button>
      </div>

      {/* Page Indicator Dots (Mobile) */}
      <div className="flex items-center gap-1 sm:hidden mt-2">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`size-1.5 rounded-full transition-all ${currentPage === index + 1 ? "bg-purple-500 w-3" : "bg-gray-700 hover:bg-gray-600"}`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
}
