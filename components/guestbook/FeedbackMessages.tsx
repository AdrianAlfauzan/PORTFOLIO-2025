import { motion, AnimatePresence } from "framer-motion";
import { Check, X, AlertCircle, Sparkles } from "lucide-react";

interface FeedbackMessagesProps {
  success: string | null;
  error: string | null;
  alreadyReacted: string | null;
  reactionSuccess: string | null;
  reactionError: string | null;
}

export default function FeedbackMessages({ success, error, alreadyReacted, reactionSuccess, reactionError }: FeedbackMessagesProps) {
  return (
    <AnimatePresence>
      {/* Success Message */}
      {success && <FeedbackMessage type="success" message={success} icon={Check} gradient="from-emerald-600 to-green-600" subMessage="It will be reviewed and published soon." />}

      {/* Error Message */}
      {error && <FeedbackMessage type="error" message="Submission Failed" icon={AlertCircle} gradient="from-red-600 to-rose-600" subMessage="Please try again later." />}

      {/* Already Reacted */}
      {alreadyReacted && <FeedbackMessage type="warning" message="Already Reacted" icon={AlertCircle} gradient="from-orange-600 to-amber-600" subMessage="You can only react once per comment." top="top-20 md:top-4" />}

      {/* Reaction Success */}
      {reactionSuccess && <FeedbackMessage type="reaction-success" message="Reaction Recorded" icon={Sparkles} gradient="from-purple-600 to-pink-600" subMessage="Thanks for your feedback!" top="top-20 md:top-4" />}

      {/* Reaction Error */}
      {reactionError && <FeedbackMessage type="error" message="Reaction Failed" icon={AlertCircle} gradient="from-red-600 to-rose-600" subMessage="Please try again." top="top-20 md:top-4" />}
    </AnimatePresence>
  );
}

interface FeedbackMessageProps {
  type: string;
  message: string;
  icon: React.ComponentType<{ size: number; className?: string }>;
  gradient: string;
  subMessage: string;
  top?: string;
}

function FeedbackMessage({ message, icon: Icon, gradient, subMessage, top = "top-4" }: FeedbackMessageProps) {
  return (
    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`fixed ${top} right-4 left-4 md:left-auto md:right-4 z-50`}>
      <div className={`bg-gradient-to-r ${gradient} text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2`}>
        <div className="flex-shrink-0">
          <Icon size={24} />
        </div>
        <div className="flex-1">
          <p className="font-medium">{message}</p>
          <p className="text-sm opacity-90">{subMessage}</p>
        </div>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => {}} className="p-1 hover:bg-white/20 rounded-lg transition-colors">
          <X size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
}
