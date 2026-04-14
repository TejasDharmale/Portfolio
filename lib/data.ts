import { BriefcaseBusiness, BrainCircuit, ChartNoAxesCombined, Cloud, Cpu, Database, FlaskConical, GraduationCap, Layers, MonitorSmartphone, Presentation, SearchCode, ShieldCheck, Sparkles, Workflow, Wrench } from "lucide-react";

export type EducationItem = {
  institution: string;
  degree: string;
  location: string;
  period: string;
  highlights: string[];
};

export type ExperienceItem = {
  role: string;
  org: string;
  period: string;
  summary: string;
  highlights: string[];
  image: string;
};

export type ProjectItem = {
  name: string;
  url: string;
  description: string;
  tech: string[];
  impact: string;
  category: string;
  image: string;
  featured?: boolean;
};

export type PublicationItem = {
  title: string;
  venue: string;
  year: number;
  authors: string[];
  kind: string;
  url?: string;
};

export const profile = {
  name: "Srushti Dharmale",
  title: "PhD Researcher and AI Engineer",
  subtitle: "UMBC - NASA GESTAR II - IEEE Published",
  location: "Baltimore, Maryland, USA",
  email: "srushtidharmale@umbc.edu",
  linkedin: "https://www.linkedin.com/in/srushti-dharmale-93438a248/",
  github: "https://github.com/srushtidharmale",
  scholar: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C5&q=srushti+dharmale",
  tagline:
    "I build research-grade AI systems and production-ready software for education, geospatial intelligence, and applied machine learning.",
};

export const quickStats = [
  { label: "Research Publications", value: "3+" },
  { label: "Internships", value: "5+" },
  { label: "GitHub Repositories", value: "23" },
  { label: "Pipeline Efficiency Gain", value: "40%" },
];

export const education: EducationItem[] = [
  {
    institution: "University of Maryland, Baltimore County",
    degree: "PhD in Computer Science",
    location: "Baltimore, Maryland",
    period: "2026 - Present",
    highlights: [],
  },
  {
    institution: "University of Maryland, Baltimore County",
    degree: "MS in Computer Science",
    location: "Baltimore, Maryland",
    period: "2024 - 2026",
    highlights: [],
  },
  {
    institution: "Trinity Academy of Engineering (SPPU)",
    degree: "Bachelor of Engineering in Computer Science",
    location: "Pune, India",
    period: "2019 - 2023",
    highlights: [
      "Published first research paper at age 20",
      "Built projects across AI, web, and mobile engineering",
    ],
  },
  {
    institution: "Marathwada Mitra Mandal's Polytechnic",
    degree: "Diploma in Computer Engineering",
    location: "Pune, India",
    period: "2017 - 2019",
    highlights: ["Strong systems and programming foundation"],
  },
];

export const experience: ExperienceItem[] = [
  {
    role: "Software Developer",
    org: "Warrior's Legacy Care · Internship",
    period: "May 2025 - Oct 2025",
    summary: "6 mos · Washington, United States · On-site · Developed and maintained software solutions for a veteran care platform.",
    highlights: [],
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    role: "Research Assistant",
    org: "UMBC - NASA GESTAR II Lab",
    period: "2023 - Present",
    summary:
      "Designed geospatial and AI workflows that reduced manual preprocessing and improved analysis speed for environmental data programs.",
    highlights: [
      "Built automation pipeline that cut manual preparation time by 40%",
      "Identified environmental anomalies valued at $14K from satellite imagery",
      "Contributed to LLM label-adherence and AI education research",
    ],
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1400&q=80",
  },
  {
    role: "Graduate Teaching Assistant",
    org: "University of Maryland, Baltimore County",
    period: "2023 - Present",
    summary:
      "Supported undergraduate and graduate students in programming, cloud, and data mining with practical labs and technical reviews.",
    highlights: [
      "Led lab problem-solving sessions for multiple cohorts",
      "Provided assignment feedback focused on production coding quality",
      "Improved student delivery speed in cloud and scripting modules",
    ],
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1400&q=80",
  },
  {
    role: "Research and Solution Architect",
    org: "Orb Connect · Full-time",
    period: "May 2022 - Jul 2024",
    summary: "2 yrs 3 mos · Architected AI-enabled routing and analytics solutions with microservices and geospatial modeling.",
    highlights: [
      "Designed AI postal-code routing platform",
      "Integrated Flask services with geospatial intelligence",
      "Worked across networking and application layers",
    ],
    image:
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1400&q=80",
  },
];

export const projects: ProjectItem[] = [
  {
    name: "NeuroForge - Multi-Modal AI Platform",
    url: "https://github.com/srushtidharmale/GPT",
    description:
      "A multi-modal AI platform with text, vision, and audio pipelines, optimized transformer blocks, and streaming responses.",
    tech: ["Python", "FastAPI", "Next.js", "PostgreSQL", "Redis", "Docker", "Kubernetes"],
    impact: "Designed for scalable real-time inference and experimentation.",
    category: "AI Systems",
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=80",
    featured: true,
  },
  {
    name: "RegimeAI Trading Research",
    url: "https://github.com/srushtidharmale/RegimeAI-Trading",
    description:
      "Research-driven algorithmic trading system to detect market regimes earlier and adapt strategy behavior.",
    tech: ["Python", "ML", "Time Series", "Dashboards"],
    impact: "Sharpe +28%, Calmar +39%, lower drawdown profile in backtests.",
    category: "Quant Research",
    image:
      "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=1400&q=80",
    featured: true,
  },
  {
    name: "macOS Performance Analyzer",
    url: "https://github.com/srushtidharmale/macOS-Device-Performance-Analyzer-Tool",
    description:
      "Cross-stack desktop diagnostics tool using SwiftUI front-end and Python + Flask backend analysis modules.",
    tech: ["SwiftUI", "Python", "Flask", "SQLite"],
    impact: "Improved monitoring visibility with anomaly thresholds and diagnostics history.",
    category: "Systems",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=80",
    featured: true,
  },
  {
    name: "AI Gmail Assistant",
    url: "https://github.com/srushtidharmale/Gmail-Assistant",
    description:
      "Automated Gmail triage and contextual response generation with calendar and contact integration.",
    tech: ["Python", "OpenAI API", "Gmail API", "OAuth"],
    impact: "Reduced manual email classification and repetitive reply drafting.",
    category: "AI Automation",
    image:
      "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=1400&q=80",
  },
  {
    name: "Smart Grid Anomaly Detection",
    url: "https://github.com/srushtidharmale/CMSC678_Project",
    description:
      "Electricity theft detection using ensemble ML and sequential models for robust utility security analysis.",
    tech: ["TensorFlow", "LSTM", "XGBoost", "Scikit-learn"],
    impact: "Reached up to 91% accuracy for fraud pattern detection.",
    category: "ML Security",
    image:
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1400&q=80",
  },
];

export const publications: PublicationItem[] = [
  {
    title:
      "Exploring the Impact of ChatGPT on Early Information Systems Majors: Opportunities and Challenges in Learning to Program",
    venue: "IEEE Frontiers in Education Conference",
    year: 2025,
    authors: ["U. Hasan", "O.N. Owoeye", "S.R. Dharmale"],
    kind: "Conference Paper",
    url: "https://ieeexplore.ieee.org/abstract/document/11328626",
  },
  {
    title:
      "Do LLMs Adhere to Label Definitions? Examining Their Receptivity to External Label Definitions",
    venue: "COEIT Research Day, UMBC",
    year: 2025,
    authors: [
      "S. Mohammadi",
      "B.H. Vedula",
      "S.R. Dharmale",
      "H. Lamba",
      "E. Raff",
      "P. Kumaraguru",
      "F. Ferraro",
      "M. Gaur",
    ],
    kind: "Conference Presentation",
    url: "https://coeit.umbc.edu/2025-talks-poster-sessions/",
  },
  {
    title: "Advanced Driver Assistance System: A Comprehensive Review of Lane Detection",
    venue: "International Journal for Research in Applied Science and Engineering Technology",
    year: 2023,
    authors: ["P. Shivale", "N. Sonawane", "S. Dharmale", "T. Lokhandwala", "M.B. Wagh"],
    kind: "Journal Paper",
    url: "https://www.ijraset.com/research-paper/advanced-driver-assistance-system",
  },
];

export const skills = [
  {
    title: "AI and Machine Learning",
    icon: BrainCircuit,
    items: ["PyTorch", "TensorFlow", "Scikit-learn", "LLMs", "Transformers", "Computer Vision"],
  },
  {
    title: "Languages",
    icon: Cpu,
    items: ["Python", "TypeScript", "JavaScript", "Swift", "R", "Java", "C++"],
  },
  {
    title: "Web and APIs",
    icon: Workflow,
    items: ["FastAPI", "Flask", "Next.js", "React", "REST APIs", "WebSockets"],
  },
  {
    title: "Cloud and Data",
    icon: Cloud,
    items: ["Docker", "Kubernetes", "PostgreSQL", "Redis", "SQLite", "Grafana"],
  },
];

export const highlightBlocks = [
  {
    title: "Research Execution",
    text: "From hypothesis to experiments to publication-ready artifacts.",
    icon: SearchCode,
  },
  {
    title: "Production Engineering",
    text: "Architecting practical systems that survive real usage and scale.",
    icon: Wrench,
  },
  {
    title: "Applied Intelligence",
    text: "Converting data into measurable outcomes for users and teams.",
    icon: Sparkles,
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/education", label: "Education" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/research", label: "Research" },
  { href: "/skills", label: "Skills" },
  { href: "/contact", label: "Contact" },
];

export const homepageCards = [
  {
    title: "Experience",
    href: "/experience",
    text: "Deep dive into internships, research, and delivery impact.",
    icon: BriefcaseBusiness,
  },
  {
    title: "Projects",
    href: "/projects",
    text: "A critical portfolio section with flagship and strategic builds.",
    icon: Layers,
  },
  {
    title: "Research",
    href: "/research",
    text: "Publications and presentations across AI and education.",
    icon: Presentation,
  },
  {
    title: "Skills",
    href: "/skills",
    text: "Technical toolkit across AI, cloud, and software systems.",
    icon: Database,
  },
  {
    title: "Education",
    href: "/education",
    text: "Academic foundation and current PhD trajectory.",
    icon: GraduationCap,
  },
  {
    title: "Contact",
    href: "/contact",
    text: "Direct channels for research and engineering opportunities.",
    icon: MonitorSmartphone,
  },
];

export const recommendation = {
  recommender: "Hao Fu",
  title: "Technology Lead at Orb Connect",
  relationship: "February 7, 2025 - Hao managed Srushti directly",
  body: "I've worked with Srushti for over a year. She was hired as a research associate on an interactive dashboard design project and moved on to another gateway project after completing the first one. During the internship, Srushti was diligent and sincere. She researched effectively and was responsive to feedback. Our working time together also broadened my knowledge. She is a true team player, and I would recommend her to any potential employers.",
  note: "Recommendation provided by previous working manager.",
  profileImage: "/hao-fu.jpg",
};

export const pageBanners = {
  home:
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1800&q=80",
  projects:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1800&q=80",
  experience:
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
};

export const projectHighlights = [
  {
    title: "AI Platform Engineering",
    detail: "Designed multi-modal architecture with deployable inference pathways.",
    icon: FlaskConical,
  },
  {
    title: "Quant Modeling",
    detail: "Built regime detection workflows with measurable risk-adjusted outcomes.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Reliability and Security",
    detail: "Applied anomaly detection for infrastructure and smart-grid abuse patterns.",
    icon: ShieldCheck,
  },
];
