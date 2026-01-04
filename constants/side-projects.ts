import { SideProject } from "@/types/side-projects";

export const SIDE_PROJECT_STATUS_COLORS: Record<SideProject["status"], string> = {
  experimental: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300",
  fun: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300",
  weird: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300",
  nostalgic: "from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-300",
  educational: "from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-indigo-300",
  useful: "from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-300",
};

// export const SIDE_PROJECT_STATUS_LABELS: Record<SideProject["status"], string> = {
//   experimental: "Experimental",
//   fun: "Just For Fun",
//   weird: "Weird & Wonderful",
//   nostalgic: "Nostalgic",
//   educational: "Educational",
//   useful: "Useful Tool",
// };

// export const CATEGORY_ICONS: Record<string, string> = {
//   "Design Tools": "🎨",
//   "WebGL Experiments": "✨",
//   "AI Playground": "🧠",
//   Games: "🎮",
//   "Learning Tools": "📚",
//   "Browser Extensions": "🔧",
//   "Web APIs": "🌐",
//   "CSS Experiments": "💅",
//   "Backend Tools": "⚙️",
// };

// export const SIDE_PROJECT_SORT_OPTIONS = [
//   { value: "newest", label: "Newest First" },
//   { value: "oldest", label: "Oldest First" },
//   { value: "name-asc", label: "Name (A-Z)" },
//   { value: "name-desc", label: "Name (Z-A)" },
//   { value: "category", label: "By Category" },
// ];
