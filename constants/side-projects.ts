import { SideProject } from "@/types/side-projects";

export const SIDE_PROJECT_STATUS_COLORS: Record<SideProject["status"], string> = {
  experimental: "from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-300",
  fun: "from-blue-500/20 to-cyan-500/20 border-blue-500/30 text-blue-300",
  weird: "from-amber-500/20 to-orange-500/20 border-amber-500/30 text-amber-300",
  nostalgic: "from-emerald-500/20 to-green-500/20 border-emerald-500/30 text-emerald-300",
  educational: "from-indigo-500/20 to-violet-500/20 border-indigo-500/30 text-indigo-300",
  useful: "from-rose-500/20 to-red-500/20 border-rose-500/30 text-rose-300",
};

