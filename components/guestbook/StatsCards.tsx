import { motion } from "framer-motion";
import { ThumbsUp, Heart, Sparkles, Zap, ThumbsDown } from "lucide-react";
import { StatCard, ReactionOption } from "@/types/guestbook";
import { StatsType } from "@/types/guestbook";

interface StatsCardsProps {
  stats: StatsType;
  statCards: StatCard[];
  mostPopularReaction: {
    type: string;
    count: number;
  };
  reactionOptions: ReactionOption[];
}

export default function StatsCards({ stats, statCards, mostPopularReaction }: StatsCardsProps) {
  const reactionIcons: Record<string, React.ComponentType<{ size: number; className?: string }>> = {
    like: ThumbsUp,
    love: Heart,
    thanks: Sparkles,
    insightful: Zap,
    dislike: ThumbsDown,
  };

  const reactionColors: Record<string, string> = {
    like: "text-blue-400 bg-blue-500/20",
    love: "text-pink-400 bg-pink-500/20",
    thanks: "text-yellow-400 bg-yellow-500/20",
    insightful: "text-purple-400 bg-purple-500/20",
    dislike: "text-red-400 bg-red-500/20",
  };

  const ReactionIcon = reactionIcons[mostPopularReaction.type] || ThumbsUp;
  const reactionColor = reactionColors[mostPopularReaction.type] || "text-blue-400 bg-blue-500/20";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-2 lg:grid-cols-6 gap-3 md:gap-4 mb-6 md:mb-8">
      {statCards.map((stat, index) => {
        const IconComponent = stat.icon;
        const value = stat.label === "Total Comments" ? stats.total : stat.label === "Approved" ? stats.approved : stat.label === "Featured" ? stats.featured : stat.label === "Pending" ? stats.pending : stats.needs_revision;

        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -3 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 border border-gray-700/50"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <div className={`p-2 md:p-3 rounded-lg md:rounded-xl bg-gradient-to-br ${stat.color}/20`}>
                <IconComponent size={20} className="md:size-6" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xl md:text-2xl font-bold truncate">{value}</div>
                <div className="text-xs md:text-sm text-gray-400 truncate">{stat.label}</div>
              </div>
            </div>
          </motion.div>
        );
      })}

      {/* Most Popular Reaction Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} whileHover={{ y: -3 }} className="bg-gray-800/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 border border-gray-700/50">
        <div className="flex items-center gap-3 md:gap-4">
          <div className={`p-2 md:p-3 rounded-lg md:rounded-xl ${reactionColor.split(" ")[1]}`}>
            <ReactionIcon size={20} className={`md:size-6 ${reactionColor.split(" ")[0]}`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xl md:text-2xl font-bold truncate">{mostPopularReaction.count}</div>
            <div className="text-xs md:text-sm text-gray-400 truncate">
              {mostPopularReaction.type === "like" ? "Likes" : mostPopularReaction.type === "love" ? "Loves" : mostPopularReaction.type === "thanks" ? "Thanks" : mostPopularReaction.type === "insightful" ? "Insightful" : "Dislikes"}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
