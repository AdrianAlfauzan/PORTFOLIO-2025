import { motion } from "framer-motion";
import { TabOption, FilterType } from "@/types/guestbook";

interface FilterTabsProps {
  filter: FilterType;
  onFilterChange: (value: FilterType) => void;
  filterTabs: TabOption[];
}

export default function FilterTabs({ filter, onFilterChange, filterTabs }: FilterTabsProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8 justify-center">
      {filterTabs.map((tab) => {
        const TabIcon = tab.icon;
        return (
          <motion.button
            key={tab.value}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => onFilterChange(tab.value)}
            className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-3 rounded-lg md:rounded-xl border transition-all duration-300 text-sm md:text-base flex-1 md:flex-none min-w-[120px] md:min-w-0 ${
              filter === tab.value ? "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50 text-purple-300" : "bg-gray-800/30 border-gray-700/50 text-gray-400 hover:border-gray-600/50"
            }`}
          >
            <TabIcon size={16} className="md:size-[18px]" />
            <span className="truncate">{tab.label}</span>
          </motion.button>
        );
      })}
    </motion.div>
  );
}
