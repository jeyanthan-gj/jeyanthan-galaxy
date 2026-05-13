// Central data store for all portfolio content
// Admin page reads from and writes to localStorage with this as the default

export interface SocialLink {
  platform: string;
  href: string;
  label: string;
}

export interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  socials: SocialLink[];
}

export interface PersonalInfo {
  email: string;
  phone: string;
  dob: string;
  address: string;
}

export interface Education {
  degree: string;
  specialization?: string;
  institution: string;
  website: string;
  period: string;
  grade?: string;
}

export interface AboutData {
  summary: string;
  personalInfo: PersonalInfo;
  education: Education[];
}

export interface Project {
  title: string;
  description: string;
  link: string;
}

export interface SkillItem {
  name: string;
}

export interface SkillGroup {
  category: string;
  items: SkillItem[];
}

export interface Award {
  title: string;
  date: string;
  href: string;
}

export interface Certificate {
  name: string;
  provider: string;
  href: string;
}

export interface ProfilesData {
  projects: Project[];
  skills: SkillGroup[];
  awards: Award[];
  certificates: Certificate[];
}

export interface LeadershipRole {
  role: string;
  organization: string;
  period: string;
  description: string;
}

export interface IndustrialVisit {
  company: string;
  location: string;
  date: string;
  description: string;
}

export interface ExperienceData {
  leadership: LeadershipRole[];
  industrialVisits: IndustrialVisit[];
}

export interface ContactData {
  phone: string;
  email: string;
  whatsapp: string;
  socials: SocialLink[];
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  profiles: ProfilesData;
  experience: ExperienceData;
  contact: ContactData;
}

export const defaultPortfolioData: PortfolioData = {
  hero: {
    name: "Jeyanthan GJ",
    title: "AI-focused Electronics & Communication Engineer",
    subtitle: "Hello, I am",
    socials: [
      { platform: "LinkedIn", href: "https://www.linkedin.com/in/jeyanthangj/", label: "LinkedIn Profile" },
      { platform: "GitHub", href: "https://github.com/jeyanthan-gj", label: "GitHub Profile" },
      { platform: "Facebook", href: "https://www.facebook.com/people/Jeyanthan-GJ/pfbid07RhcHPBYBRyC7pMw8SViuyqYrbyiZRkoMvAgyndwdCLfxfBa4Nr31MZ8hPkjfQtDl/?mibextid=ZbWKwL", label: "Facebook Profile" },
      { platform: "Instagram", href: "https://www.instagram.com/jeyanthan_gj_2004/", label: "Instagram Profile" },
    ],
  },
  about: {
    summary: "AI-focused ECE student specializing in Computer Vision, Generative AI, RAG, and Knowledge Graphs. Experienced in IoT and embedded systems with strong interest in building real-world intelligent applications. Passionate about developing scalable AI solutions integrating hardware and software.",
    personalInfo: {
      email: "jeyanthangj2004@gmail.com",
      phone: "+91 9976719167",
      dob: "August 03, 2004",
      address: "Anjugramam, Kanniyakumari, India",
    },
    education: [
      {
        degree: "B.E. (Hons) in Electronics and Communication Engineering",
        specialization: "Specialization in IoT, with additional vertical in Networking and Security",
        institution: "Mepco Schlenk Engineering College",
        website: "https://www.mepcoeng.ac.in/",
        period: "2022 – 2026",
        grade: "CGPA: 7.87 (till 7th sem)",
      },
      {
        degree: "HSC - 91.17%",
        institution: "SAV Balakrishna Matriculation Hr.Sec. School",
        website: "https://savbalakrishna.com/",
        period: "2022",
      },
      {
        degree: "SSLC - 98.4%",
        institution: "S.M Matriculation Hr.Sec. School",
        website: "https://smmhrsscl.com/",
        period: "2020",
      },
    ],
  },
  profiles: {
    projects: [
      {
        title: "Hybrid Lightweight YOLO Model for Real-Time based Target Detection",
        description: "Developed a lightweight AI model to detect small vehicles in drone images using GhostNet architecture and knowledge distillation for Raspberry Pi edge devices.",
        link: "https://github.com/jeyanthan-gj",
      },
      {
        title: "Engineering Drawings Data Extraction",
        description: "AI pipeline to automate extraction from engineering drawings using YOLOv8, VLM, and FLAN-T5 LLM for structured technical summaries.",
        link: "https://github.com/jeyanthan-gj",
      },
      {
        title: "Secure IT Company Network",
        description: "Designed and simulated a secure enterprise network in Cisco Packet Tracer with IDS and IPS to detect/prevent malicious activity.",
        link: "https://github.com/jeyanthan-gj/Secure-IT-Company-Network-with-IDS-IPS",
      },
      {
        title: "Restaurant Menu Ordering System",
        description: "IoT table-side ordering via LCD/keypad, Zigbee to kitchen, and a web interface for inventory/billing.",
        link: "https://github.com/jeyanthan-gj/Restuarant-Menu-Ordering-System",
      },
      {
        title: "College Management System in C++",
        description: "OOP-based system for managing student/faculty data with file handling for persistence.",
        link: "https://github.com/jeyanthan-gj/College-management-system-using-oops",
      },
      {
        title: "Education Institution Management System",
        description: "Responsive web interface using HTML, CSS, PHP, and MySQL for secure institutional record management.",
        link: "https://github.com/jeyanthan-gj/Education-Institution-Management-System",
      },
      {
        title: "Audio Mixer Circuit",
        description: "Designed an analog circuit using resistors and transistors to mix multiple audio signals into a single output.",
        link: "https://www.linkedin.com/posts/jeyanthangj_electroniccircuitlab-ece-audiomixer-activity-7188358374550388736-XNYA",
      },
    ],
    skills: [
      {
        category: "Artificial Intelligence",
        items: [
          { name: "Generative AI (LLM & RAG)" },
          { name: "Computer Vision (YOLOv8)" },
          { name: "Edge AI & Optimization" },
        ],
      },
      {
        category: "Engineering & IoT",
        items: [
          { name: "IoT & Embedded Systems" },
          { name: "Network Security" },
          { name: "Circuit Design" },
        ],
      },
      {
        category: "Software & Tools",
        items: [
          { name: "Python, C, C++" },
          { name: "Linux & Git" },
          { name: "FastAPI & Gradio" },
        ],
      },
    ],
    awards: [
      { title: "Best Mini Project (Restaurant System)", date: "Nov 2024", href: "https://www.linkedin.com/posts/jeyanthangj_award-engineeringprojects-miniproject-activity-7338889712117395456-PTb4" },
      { title: "2nd Prize in Coders Crusade", date: "Apr 2024, CIT", href: "https://www.linkedin.com/posts/jeyanthangj_mepcoece-mepco-symposium-activity-7217735582947450881-3pH7" },
      { title: "Presented Paper on 'Big Data'", date: "Apr 2024, CIT", href: "https://www.linkedin.com/posts/jeyanthangj_mechanicalengineering-mechnotron2k24-technicalsymposium-activity-7198628874757287936-zZFK" },
      { title: "Best Mini Project (Audio Mixer)", date: "Dec 2023", href: "https://www.linkedin.com/posts/jeyanthangj_electroniccircuitlab-ece-audiomixer-activity-7188358374550388736-XNYA" },
      { title: "HackerRank Achievement (5★ C++)", date: "Problem Solving & C++", href: "https://www.hackerrank.com/profile/jeyanthangJ2004" },
    ],
    certificates: [
      { name: "IoT Fundamentals", provider: "Cisco Networking Academy", href: "https://www.linkedin.com/posts/jeyanthangj_iot-cisco-digitaltransformation-activity-7337050858410385410-v8vc" },
      { name: "Industry 4.0 & IIoT", provider: "NPTEL", href: "https://www.linkedin.com/posts/jeyanthangj_industry4-iot-digitaltransformation-activity-7271460455481511936-MIU7" },
      { name: "Joy of Computing using Python", provider: "NPTEL", href: "https://www.linkedin.com/posts/jeyanthangj_python-nptel-achievementunlocked-activity-7198624597498368000-KSTS" },
      { name: "Digital Logic Circuits", provider: "Great Learning", href: "https://www.linkedin.com/posts/jeyanthangj_digitallogic-computerarchitecture-learningjourney-activity-7230528911393054720-MwB7" },
      { name: "Arduino vs Raspberry Pi", provider: "Great Learning", href: "https://www.linkedin.com/posts/jeyanthangj_arduino-raspberrypi-greatlearning-activity-7220364427986886656-oQk4" },
      { name: "Introduction to IoT", provider: "NPTEL", href: "https://www.linkedin.com/posts/jeyanthangj_iot-nptel-achievementunlocked-activity-7195036882743828480-Q8Zh" },
      { name: "Problem Solving Through C", provider: "NPTEL", href: "https://www.linkedin.com/posts/jeyanthangj_nptel-cprogramming-problemsolving-activity-7198630519247413248-s1BQ" },
      { name: "OOPs in Python", provider: "Great Learning", href: "https://www.linkedin.com/posts/jeyanthangj_python-oop-greatlearningacademy-activity-7222153694337802241-QiNw" },
      { name: "English for Technical Professionals", provider: "IEEE", href: "" },
    ],
  },
  experience: {
    leadership: [
      { role: "Placement Representative", organization: "ECE-C (2022-2026) boys batch, Mepco Schlenk", period: "2023 – 2026", description: "Coordinating placement activities and career guidance for the batch" },
      { role: "Convener", organization: "Institution of Engineers Student's Chapter", period: "2025 – 2026", description: "Leading the student chapter and organizing major engineering events" },
      { role: "Active Organizer", organization: "GYAN MITRA '25", period: "2025", description: "National-level techno symposium organization and management" },
      { role: "Joint Secretary", organization: "Institution of Engineers Student's Chapter", period: "2024 – 2025", description: "Coordinating student engineering initiatives and symposiums" },
      { role: "Active Volunteer", organization: "GYAN MITRA '24", period: "2024", description: "National-level techno symposium coordination and support" },
      { role: "Executive Member", organization: "Institution of Engineers Student's Chapter", period: "2023 – 2024", description: "Supporting chapter activities and student engagement" },
    ],
    industrialVisits: [
      { company: "Keltron", location: "Thiruvananthapuram", date: "January 2025", description: "Electronics manufacturing and government sector operations" },
      { company: "C-DAC", location: "Thiruvananthapuram", date: "January 2025", description: "Advanced computing development and research center" },
      { company: "VeeVee Controls Pvt Ltd", location: "Bangalore", date: "March 2024", description: "Industrial automation and control systems" },
    ],
  },
  contact: {
    phone: "+91 9976719167",
    email: "jeyanthangj2004@gmail.com",
    whatsapp: "9976719167",
    socials: [
      { platform: "LinkedIn", href: "https://www.linkedin.com/in/jeyanthangj/", label: "LinkedIn" },
      { platform: "GitHub", href: "https://github.com/jeyanthan-gj", label: "GitHub" },
      { platform: "Instagram", href: "https://www.instagram.com/jeyanthan_gj_2004/", label: "Instagram" },
      { platform: "Facebook", href: "https://www.facebook.com/people/Jeyanthan-GJ/pfbid07RhcHPBYBRyC7pMw8SViuyqYrbyiZRkoMvAgyndwdCLfxfBa4Nr31MZ8hPkjfQtDl/?mibextid=ZbWKwL", label: "Facebook" },
      { platform: "WhatsApp", href: "https://wa.me/9976719167", label: "WhatsApp" },
    ],
  },
};

const STORAGE_KEY = "jeyanthan_portfolio_data";

export function loadPortfolioData(): PortfolioData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as PortfolioData;
    }
  } catch {
    // fallback to default
  }
  return defaultPortfolioData;
}

export function savePortfolioData(data: PortfolioData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetPortfolioData(): PortfolioData {
  localStorage.removeItem(STORAGE_KEY);
  return defaultPortfolioData;
}
