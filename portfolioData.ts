import resumeUrl from './Chirag_Resume (1).pdf?url';
import profileAvatar from './profile.jpg';

export interface PortfolioProject {
  id: number;
  title: string;
  category: string;
  image: string;
  year: string;
  description: string;
  tech: string[];
  repoUrl: string;
  primaryUrl: string;
  primaryLabel: string;
}

export const profile = {
  name: "Chirag Mishra",
  role: "Full Stack Developer",
  email: "chiragmishra2511@gmail.com",
  phone: "+91 63759 60815",
  phoneHref: "tel:+916375960815",
  location: "Kishangarh, Rajasthan, India",
  education: "Integrated M.Sc.",
  university: "Central University of Rajasthan",
  availability: "Available for full-time opportunities",
  githubUrl: "https://github.com/Code-Game-Ninja",
  avatar: profileAvatar,
  githubAvatar: profileAvatar,
  linkedinUrl: "https://linkedin.com/in/chirag-mishra-14b128337",
  resumeUrl,
  contactFormEndpoint: "https://formspree.io/f/xoeevvzp",
};

export const projects: PortfolioProject[] = [
  {
    id: 1,
    title: "Teal Carbon",
    category: "Climate Research Platform",
    image: "https://raw.githubusercontent.com/Code-Game-Ninja/teal-carbon/main/public/hero.png",
    year: "2026",
    description: "A multi-page research platform for inland and coastal wetland carbon science. It combines interactive research, project, impact, and map experiences with scientific editorial design, smooth motion, and environmental data storytelling.",
    tech: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS 4", "GSAP", "Leaflet"],
    repoUrl: "https://github.com/Code-Game-Ninja/teal-carbon",
    primaryUrl: "https://teal-carbon.vercel.app",
    primaryLabel: "Open Live Site",
  },
  {
    id: 2,
    title: "CampusSphere",
    category: "Campus Mobile Ecosystem",
    image: "https://raw.githubusercontent.com/Code-Game-Ninja/campus/master/prototype/assets/app-logo.png",
    year: "2026",
    description: "An Expo mobile app with a React administration dashboard and protected Node.js API. It uses Supabase for authentication, Postgres data, storage, role enforcement, administration controls, notifications, and APK release delivery.",
    tech: ["Expo", "React Native", "React", "Node.js", "TypeScript", "Supabase"],
    repoUrl: "https://github.com/Code-Game-Ninja/campus",
    primaryUrl: "https://github.com/Code-Game-Ninja/campus/releases/latest",
    primaryLabel: "View Latest Release",
  },
  {
    id: 3,
    title: "StadiumMind AI",
    category: "AI Sports Platform",
    image: "https://raw.githubusercontent.com/Code-Game-Ninja/Stadium-Mind/main/apps/web/public/images/stadium-login.png",
    year: "2026",
    description: "An AI-assisted sports platform that combines a Next.js experience with real-time services, Gemini intelligence, Firebase, live socket communication, sports data, and weather-aware match context.",
    tech: ["Next.js", "Node.js", "TypeScript", "Gemini", "Firebase", "Socket.IO"],
    repoUrl: "https://github.com/Code-Game-Ninja/Stadium-Mind",
    primaryUrl: "https://stadium-mind-web.vercel.app",
    primaryLabel: "Open Live Site",
  },
  {
    id: 4,
    title: "Expense Tracker",
    category: "Personal Finance App",
    image: "https://raw.githubusercontent.com/Code-Game-Ninja/expense_tracker_app/main/assets/images/icon.png",
    year: "2026",
    description: "A mobile-first personal finance application for recording and organizing everyday expenses with a fast local experience, persistent SQLite storage, predictable state management, and a responsive NativeWind interface.",
    tech: ["Expo", "React Native", "TypeScript", "SQLite", "Zustand", "NativeWind"],
    repoUrl: "https://github.com/Code-Game-Ninja/expense_tracker_app",
    primaryUrl: "https://github.com/Code-Game-Ninja/expense_tracker_app",
    primaryLabel: "View Source",
  },
  {
    id: 5,
    title: "AppMart",
    category: "GitHub Explorer App",
    image: "https://raw.githubusercontent.com/Code-Game-Ninja/Open_Mart_APP/main/appmart/assets/images/icon.png",
    year: "2026",
    description: "A React Native and Expo GitHub repository explorer with repository search, trending categories, favorites, theme support, and direct GitHub API integration in a polished mobile interface.",
    tech: ["Expo", "React Native", "TypeScript", "GitHub API", "NativeWind"],
    repoUrl: "https://github.com/Code-Game-Ninja/Open_Mart_APP",
    primaryUrl: "https://raw.githubusercontent.com/Code-Game-Ninja/Open_Mart_APP/main/application-97d39fd3-136e-47eb-93a2-669adfac373a.apk",
    primaryLabel: "Download APK",
  },
  {
    id: 6,
    title: "AlumniConnect",
    category: "SIH Community Platform",
    image: "https://raw.githubusercontent.com/Code-Game-Ninja/SIH/main/screenshot/admin%201.png",
    year: "2025",
    description: "A role-based alumni, student, and administrator platform created for SIH. It supports mentorship, job opportunities, messaging, profiles, and community administration through integrated Firebase services.",
    tech: ["React", "TypeScript", "Firebase", "Authentication", "Realtime Data"],
    repoUrl: "https://github.com/Code-Game-Ninja/SIH",
    primaryUrl: "https://sih-opal-phi.vercel.app",
    primaryLabel: "Open Live Site",
  },
];
