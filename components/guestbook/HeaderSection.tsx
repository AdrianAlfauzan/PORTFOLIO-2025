import { motion } from "framer-motion";
import { MessageSquare } from "lucide-react";

export default function HeaderSection() {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-8">
      <div className="flex-1 text-center md:text-left">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-block">
          <div className="inline-flex items-center justify-center p-2 md:p-3 rounded-xl md:rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-3 md:mb-4">
            <MessageSquare size={32} className="md:size-10 text-purple-300" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 md:mb-4">Guestbook & Testimonials</h1>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto md:mx-0">Leave your thoughts, feedback, or just say hello! Your comments make this portfolio better.</p>
        </motion.div>
      </div>
    </div>
  );
}
