import { motion } from "framer-motion";

export default function FooterSection() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="text-center mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700/30">
      <p className="text-gray-500 text-xs md:text-sm">All comments are moderated. Spam and inappropriate content will be removed.</p>
      <p className="text-gray-400 mt-1 text-xs md:text-sm">
        Powered by <span className="text-purple-400">Next.js + Supabase</span>
      </p>
    </motion.div>
  );
}
