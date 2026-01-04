import { SideProject } from "@/types/side-projects";
import { Palette, Sparkles, Brain, Gamepad2, Zap, Terminal } from "lucide-react";

export const sideProjects: SideProject[] = [
  {
    id: 1,
    name: "CSS Art Generator",
    tagline: "Generate CSS art from text prompts",
    description: "AI-powered tool that converts text descriptions into pure CSS artwork. Built just for fun to explore CSS capabilities.",
    tech: ["React", "OpenAI API", "CSS-in-JS", "Vercel AI SDK"],
    icon: Palette,
    category: "Design Tools",
    status: "experimental",
    githubUrl: "https://github.com/yourusername/css-art-generator",
    demoUrl: "https://css-art.vercel.app",
    features: ["Text-to-CSS conversion", "Real-time preview", "CSS code export", "Art style selection"],
    note: "Built in 2 days over a weekend",
  },
  {
    id: 2,
    name: "3D Mouse Trail",
    tagline: "Interactive mouse following effect",
    description: "Three.js experiment creating immersive 3D mouse trail effects with particle systems and physics simulations.",
    tech: ["Three.js", "React Three Fiber", "GLSL", "Vite"],
    icon: Sparkles,
    category: "WebGL Experiments",
    status: "fun",
    githubUrl: "https://github.com/yourusername/3d-mouse-trail",
    demoUrl: "https://mouse-trail.vercel.app",
    features: ["Real-time physics simulation", "Customizable particle effects", "Performance optimized", "Mobile touch support"],
    note: "Just wanted to see cool particles",
  },
  {
    id: 3,
    name: "AI Meme Generator",
    tagline: "Generate memes with AI humor",
    description: "Combining GPT-4 with meme templates to create context-aware humorous memes. Sometimes works, sometimes weird!",
    tech: ["Next.js", "GPT-4", "Cloudinary", "Tailwind"],
    icon: Brain,
    category: "AI Playground",
    status: "weird",
    githubUrl: "https://github.com/yourusername/ai-meme-generator",
    demoUrl: "https://ai-memes.vercel.app",
    features: ["Context-aware meme generation", "Template library", "Share to social media", "Meme history"],
    note: "The AI's sense of humor is... interesting",
  },
  {
    id: 4,
    name: "Browser Game Collection",
    tagline: "Classic games recreated in browser",
    description: "Collection of classic games (Snake, Tetris, Space Invaders) built with vanilla JavaScript. Nostalgia coding session!",
    tech: ["Vanilla JS", "HTML Canvas", "CSS Grid", "PWA"],
    icon: Gamepad2,
    category: "Games",
    status: "nostalgic",
    githubUrl: "https://github.com/yourusername/browser-games",
    demoUrl: "https://classic-games.vercel.app",
    features: ["5 classic games in one", "Local high scores", "Offline PWA support", "Retro pixel art"],
    note: "Built while reminiscing about childhood games",
  },
  {
    id: 5,
    name: "API Rate Limiter Simulator",
    tagline: "Visualize rate limiting algorithms",
    description: "Educational tool to visualize different rate limiting algorithms (Token Bucket, Leaky Bucket, Fixed Window).",
    tech: ["TypeScript", "D3.js", "Express", "Socket.io"],
    icon: Zap,
    category: "Learning Tools",
    status: "educational",
    githubUrl: "https://github.com/yourusername/rate-limiter-viz",
    demoUrl: "https://rate-limiter-viz.vercel.app",
    features: ["Real-time algorithm visualization", "Customizable parameters", "Request simulation", "Performance comparison"],
    note: "Built to understand rate limiting better",
  },
  {
    id: 6,
    name: "Dev Toolbox Chrome Extension",
    tagline: "Swiss army knife for developers",
    description: "Chrome extension with various dev tools: JSON formatter, color picker, base64 encoder, regex tester, etc.",
    tech: ["Chrome APIs", "React", "TypeScript", "Webpack"],
    icon: Terminal,
    category: "Browser Extensions",
    status: "useful",
    githubUrl: "https://github.com/yourusername/dev-toolbox-extension",
    demoUrl: null,
    features: ["10+ developer tools", "Keyboard shortcuts", "Custom theme support", "Export/import settings"],
    note: "Made because I was tired of switching tabs",
  },
  {
    id: 7,
    name: "Dev Toolbox Chrome Extension",
    tagline: "Swiss army knife for developers",
    description: "Chrome extension with various dev tools: JSON formatter, color picker, base64 encoder, regex tester, etc.",
    tech: ["Chrome APIs", "React", "TypeScript", "Webpack"],
    icon: Terminal,
    category: "Browser Extensions",
    status: "useful",
    githubUrl: "https://github.com/yourusername/dev-toolbox-extension",
    demoUrl: null,
    features: ["10+ developer tools", "Keyboard shortcuts", "Custom theme support", "Export/import settings"],
    note: "Made because I was tired of switching tabs",
  },
];

// Helper functions
export const getAllSideProjects = (): SideProject[] => {
  return sideProjects;
};

export const getSideProjectsByCategory = (category: string): SideProject[] => {
  if (category === "all") return sideProjects;
  return sideProjects.filter((project) => project.category === category);
};

export const getSideProjectsByStatus = (status: SideProject["status"]): SideProject[] => {
  return sideProjects.filter((project) => project.status === status);
};

export const getUniqueCategories = (): string[] => {
  const categories = sideProjects.map((project) => project.category);
  return ["all", ...Array.from(new Set(categories))];
};

export const getSideProjectById = (id: number): SideProject | undefined => {
  return sideProjects.find((project) => project.id === id);
};

// Default pagination settings
export const DEFAULT_ITEMS_PER_PAGE = 6;
