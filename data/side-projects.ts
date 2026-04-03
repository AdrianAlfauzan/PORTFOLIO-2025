import { SideProject } from "@/types/side-projects";
import { Zap, BookOpen, Cloud, UserCheck, Globe, Heart, Shield } from "lucide-react";

export const sideProjects: SideProject[] = [
  {
    id: 1,
    name: "The End of 2025",
    tagline: "Interactive Digital Gift and Memories",
    description: "A highly sentimental and interactive web application featuring a secret garden of memories, digital love letters, and mini games",
    tech: ["Next js", "Framer Motion", "Tailwind CSS", "Lucide React"],
    icon: Heart,
    category: "Web Dev",
    status: "useful",
    githubUrl: null,
    demoUrl: "https://the-end-2025.netlify.app/",
    features: ["Interactive heart particle system", "Memory matching game", "Digital love letters", "Custom music player integration"],
    note: "Built as a personal digital gift for my partner",
  },
  {
    id: 2,
    name: "Zenith Guestbook",
    tagline: "Digital Recording and Comment Management",
    description: "A digital guestbook system for managing comments and visitor logs with a professional interface",
    tech: ["Next js", "Tailwind CSS", "Firebase"],
    icon: BookOpen,
    category: "Web Dev",
    status: "useful",
    githubUrl: "https://github.com/AdrianAlfauzan/zenith-guestbook",
    demoUrl: "https://ian-portfolio-25.netlify.app/guestbook",
    features: ["Show portfolio guestbook", "Comment management system", "Visitor log tracking", "Responsive design"],
    note: "Built to digitize traditional guestbook systems",
  },
  {
    id: 3,
    name: "BMKG Quality Assurance Hub",
    tagline: "Software Testing and Bug Documentation",
    description: "Conducted functional and UAT testing for MetFlight Radar, Digital Guest Book, and Earthquake Database systems",
    tech: ["Manual Testing", "Regression Testing", "Bug Magnet", "UAT"],
    icon: Zap,
    category: "QA Tools",
    status: "useful",
    githubUrl: null,
    demoUrl: null,
    features: ["Meteorology radar functionality testing", "Seismological data visualization verification", "Input validation for guest records", "Bug reporting and documentation"],
    note: "Professional QA work across three BMKG stations",
  },
  {
    id: 4,
    name: "Personal Portfolio 2025",
    tagline: "Interactive Professional Showcase",
    description: "A modern and responsive portfolio website to showcase software engineering projects and technical skills",
    tech: ["React", "Netlify", "Tailwind CSS", "Framer Motion"],
    icon: Globe,
    category: "Design Tools",
    status: "useful",
    githubUrl: "https://github.com/AdrianAlfauzan/ian-portfolio",
    demoUrl: "https://ian-portfolio-25.netlify.app/",
    features: ["Responsive web interface", "Project showcase", "Interactive UI UX", "Smooth animations"],
    note: "Constantly updated with new projects",
  },
  {
    id: 5,
    name: "Cloud Computing Deployment",
    tagline: "Infrastructure and Automation",
    description: "Deployment of web applications on Hostinger VPS with automated pipelines and server configuration",
    tech: ["Hostinger VPS", "GitHub Actions", "DNS Management", "CI CD"],
    icon: Cloud,
    category: "DevOps",
    status: "educational",
    githubUrl: null,
    demoUrl: null,
    features: ["CI CD pipeline implementation", "Server configuration", "Domain management", "Automation for build and deployment"],
    note: "Practicum project for Cloud Computing course",
  },
  {
    id: 6,
    name: "Web Development Teaching Assistant",
    tagline: "Mentoring and Code Evaluation",
    description: "Assisting university students in learning web programming and evaluating technical assignments",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    icon: UserCheck,
    category: "Learning Tools",
    status: "educational",
    githubUrl: null,
    demoUrl: null,
    features: ["Technical feedback provision", "Project evaluation", "Code quality improvement", "Mentoring students"],
    note: "University academic assistant role at Unjani",
  },
  {
    id: 7,
    name: "PTSP BMKG - User Panel Pentest",
    tagline: "Security Testing on Public User Interface",
    description: "Performed security assessment on the public-facing PTSP BMKG system, focusing on input validation, authentication flows, and common web vulnerabilities",
    tech: ["Kali Linux", "Burp Suite", "OWASP ZAP", "Manual Testing"],
    icon: Shield,
    category: "Cyber Security",
    status: "educational",
    githubUrl: null,
    demoUrl: null,
    features: ["Input validation testing", "Authentication flow analysis", "Basic vulnerability scanning", "Security issue documentation"],
    note: "Focused on identifying vulnerabilities in user-accessible features",
  },
  {
    id: 8,
    name: "PTSP BMKG - Admin Panel Pentest",
    tagline: "Privilege and Access Control Testing",
    description: "Security testing on admin panel to identify access control weaknesses and privilege escalation risks",
    tech: ["Kali Linux", "Burp Suite", "OWASP Top 10"],
    icon: Shield,
    category: "Cyber Security",
    status: "educational",
    githubUrl: null,
    demoUrl: null,
    features: ["Role-based access testing", "Privilege escalation checks", "Session management analysis", "Admin endpoint protection testing"],
    note: "Focused on backend/admin-level security risks",
  },
  {
    id: 9,
    name: "Freelance Security Testing - Tekno Indo Kreatif",
    tagline: "Independent Web Security Assessment",
    description: "Conducted freelance penetration testing on company web applications, identifying potential vulnerabilities and providing recommendations",
    tech: ["Kali Linux", "Burp Suite", "Nmap", "Manual Testing"],
    icon: Shield,
    category: "Cyber Security",
    status: "useful",
    githubUrl: null,
    demoUrl: null,
    features: ["Reconnaissance and scanning", "Vulnerability identification", "Manual exploit testing", "Security recommendation report"],
    note: "Freelance project focused on real-world security improvements",
  },
  {
    id: 10,
    name: "BASARNAS Web Security Assessment",
    tagline: "Government System Security Testing",
    description: "Performed security testing on BASARNAS-related systems to evaluate vulnerabilities and strengthen system resilience",
    tech: ["Kali Linux", "OWASP ZAP", "Manual Testing"],
    icon: Shield,
    category: "Cyber Security",
    status: "educational",
    githubUrl: null,
    demoUrl: null,
    features: ["Web vulnerability testing", "Security misconfiguration checks", "Input validation testing", "Basic penetration testing"],
    note: "Focused on improving system security awareness",
  },
  {
    id: 11,
    name: "MetFlight Radar Security Testing",
    tagline: "Aviation Data System Security Analysis",
    description: "Security analysis on radar-related system interfaces, focusing on data integrity and system exposure risks",
    tech: ["Kali Linux", "Burp Suite", "Network Analysis"],
    icon: Shield,
    category: "Cyber Security",
    status: "educational",
    githubUrl: null,
    demoUrl: null,
    features: ["Data flow inspection", "Endpoint testing", "Network-level observation", "Security risk documentation"],
    note: "Focused on system exposure and data integrity risks",
  },
];

// Helper functions (Tetap sama seperti kode Anda sebelumnya)
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

export const DEFAULT_ITEMS_PER_PAGE = 6;
