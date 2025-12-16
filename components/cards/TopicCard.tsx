import { Sparkles } from "lucide-react";

interface Props {
  title: string;
  description: string;
}

export default function TopicCard({ title, description }: Props) {
  return (
    <div
      className="
        relative z-10
        h-full
        rounded-2xl
        p-6
        flex flex-col gap-4
      "
    >
      {/* Icon */}
      <div
        className="
          w-12 h-12
          rounded-xl
          flex items-center justify-center
          bg-[#1DB954]/15
          border border-[#1DB954]/25
          text-[#1DB954]
        "
      >
        <Sparkles size={22} strokeWidth={2.2} />
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold tracking-tight text-white">{title}</h3>

      {/* Description */}
      <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
    </div>
  );
}
