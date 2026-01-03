export interface Project {
  id: number;
  name: string;
  tagline: string;
  description: string;
  category: string;

  // Tech stack
  techStack: string[];

  // Features
  features: string[];

  // Links
  liveDemoUrl?: string;
  githubUrl?: string;
  figmaUrl?: string;

  // Media
  imageUrl?: string;
  videoUrl?: string;

  // Status & dates
  status: "completed" | "in-progress" | "planned" | "archived";
  year: number;
  featured: boolean;

  // Additional info
  challenges?: string[];
  learnings?: string[];
  role?: string;
  teamSize?: number;
}
