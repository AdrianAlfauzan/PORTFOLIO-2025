import { motion } from "framer-motion";
import { Globe, Trophy, Crown, Award, Sparkles, Flame } from "lucide-react";
import { GuestbookComment, ReactionOption, ReactionType } from "@/types/guestbook";

interface ChampionCardProps {
  comment: GuestbookComment;
  reactionTotal: number;
  reactionOptions: ReactionOption[];
  onReaction: (commentId: string, reactionType: ReactionType) => void;
  isReacting: boolean;
}

export default function ChampionCard({ comment, reactionTotal, reactionOptions, onReaction, isReacting }: ChampionCardProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8 }} className="mb-8 md:mb-10">
      <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border-2 border-transparent bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-orange-500/20 p-0.5">
        {/* Animated gradient border */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 opacity-30 animate-pulse"></div>

        {/* Inner content */}
        <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-2xl md:rounded-3xl p-4 md:p-6 backdrop-blur-sm">
          {/* Champion badge */}
          <div className="absolute -top-3 -right-3 md:-top-4 md:-right-4 z-20">
            <div className="relative">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full blur-md" />
              <div className="relative bg-gradient-to-r from-yellow-500 to-amber-500 p-2 md:p-3 rounded-full shadow-2xl">
                <Crown className="size-6 md:size-8 text-white" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative">
                <div className="size-12 md:size-16 rounded-full bg-gradient-to-br from-yellow-500/30 to-amber-500/30 flex items-center justify-center border-2 border-yellow-500/50">
                  <span className="text-xl md:text-2xl font-bold text-yellow-300">{comment.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full p-1">
                  <Trophy className="size-4 md:size-5 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                  <span>🏆 Champion Comment</span>
                </h3>
                <p className="text-yellow-300 text-sm md:text-base font-semibold">Most Loved by Community</p>
              </div>
            </div>

            {/* Reaction stats */}
            <div className="ml-auto flex items-center gap-4 md:gap-6">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-amber-400 bg-clip-text text-transparent">{reactionTotal}</div>
                <div className="text-xs md:text-sm text-yellow-300/80">Positive Reactions</div>
              </div>
              <div className="hidden md:block h-8 w-px bg-gradient-to-b from-transparent via-yellow-500/30 to-transparent"></div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-white">#1</div>
                <div className="text-xs md:text-sm text-gray-400">Rank</div>
              </div>
            </div>
          </div>

          {/* Comment content */}
          <div className="mb-4 md:mb-6">
            <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white text-base md:text-lg truncate flex items-center gap-2">
                  {comment.name}
                  {comment.profession && <span className="text-sm text-yellow-300 font-normal">• {comment.profession}</span>}
                </h4>
                {comment.website && (
                  <a href={comment.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs md:text-sm text-blue-400 hover:text-blue-300 transition-colors truncate">
                    <Globe size={12} className="md:size-4" />
                    <span className="truncate">{comment.website.replace(/^https?:\/\//, "")}</span>
                  </a>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-500 to-amber-500 rounded-full"></div>
              <p className="text-gray-200 text-sm md:text-base pl-4 line-clamp-2 md:line-clamp-3">{comment.message}</p>
            </div>
          </div>

          {/* Reaction breakdown */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-yellow-500/20">
            <div className="flex items-center gap-2 md:gap-3">
              {reactionOptions
                .filter((r) => r.type !== "dislike")
                .map((reaction) => {
                  const ReactionIcon = reaction.icon;
                  const count = comment.reactions[reaction.type as keyof typeof comment.reactions];
                  return count > 0 ? (
                    <div key={reaction.type} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-800/50">
                      <ReactionIcon size={16} className={reaction.color} />
                      <span className="text-sm font-medium text-gray-300">{count}</span>
                      <span className="text-xs text-gray-400">{reaction.label}</span>
                    </div>
                  ) : null;
                })}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-amber-500/20">
                <Flame className="size-4 text-orange-400" />
                <span className="text-sm text-yellow-300 font-medium">Community Favorite</span>
              </div>
              <button
                onClick={() => onReaction(comment.id, "like")}
                disabled={isReacting}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-yellow-600 to-amber-600 hover:from-yellow-700 hover:to-amber-700 text-white font-medium transition-all disabled:opacity-50"
              >
                Vote for Champion
              </button>
            </div>
          </div>

          {/* Sparkle effects */}
          <div className="absolute top-4 left-4 opacity-30">
            <Sparkles className="size-6 text-yellow-400" />
          </div>
          <div className="absolute bottom-4 right-4 opacity-30">
            <Award className="size-6 text-amber-400" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
