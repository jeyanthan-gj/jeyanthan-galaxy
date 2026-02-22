import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Award, Code, Wrench, BookOpen, Cpu, Wifi, Settings, Monitor, Database, Globe, Github, Terminal, FileCode, Zap, CircuitBoard, Radio, Microchip, Search, GraduationCap, Shield, Layers, Brain, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import gsap from 'gsap';

/**
 * Professional profiles section with interactive 3D card switching
 * Features hardware and software profile views with animated transitions
 */
export default function Profiles() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Unified profile data from resume
  const profile = {
    projects: [
      {
        title: "Hybrid Lightweight YOLO Model for Real-Time based Target Detection",
        description: "Developed a lightweight AI model to detect small vehicles in drone images using GhostNet architecture and knowledge distillation for Raspberry Pi edge devices.",
        link: "https://github.com/jeyanthan-gj",
        icon: <Brain className="w-5 h-5" />
      },
      {
        title: "Engineering Drawings Data Extraction",
        description: "AI pipeline to automate extraction from engineering drawings using YOLOv8, VLM, and FLAN-T5 LLM for structured technical summaries.",
        link: "https://github.com/jeyanthan-gj",
        icon: <Layers className="w-5 h-5" />
      },
      {
        title: "Secure IT Company Network",
        description: "Designed and simulated a secure enterprise network in Cisco Packet Tracer with IDS and IPS to detect/prevent malicious activity.",
        link: "https://github.com/jeyanthan-gj/Secure-IT-Company-Network-with-IDS-IPS",
        icon: <Shield className="w-5 h-5" />
      },
      {
        title: "Restaurant Menu Ordering System",
        description: "IoT table-side ordering via LCD/keypad, Zigbee to kitchen, and a web interface for inventory/billing.",
        link: "https://github.com/jeyanthan-gj/Restuarant-Menu-Ordering-System",
        icon: <Code className="w-5 h-5" />
      },
      {
        title: "College Management System in C++",
        description: "OOP-based system for managing student/faculty data with file handling for persistence.",
        link: "https://github.com/jeyanthan-gj/College-management-system-using-oops",
        icon: <FileCode className="w-5 h-5" />
      },
      {
        title: "Education Institution Management System",
        description: "Responsive web interface using HTML, CSS, PHP, and MySQL for secure institutional record management.",
        link: "https://github.com/jeyanthan-gj/Education-Institution-Management-System",
        icon: <Globe className="w-5 h-5" />
      },
      {
        title: "Audio Mixer Circuit",
        description: "Designed an analog circuit using resistors and transistors to mix multiple audio signals into a single output.",
        link: "https://www.linkedin.com/posts/jeyanthangj_electroniccircuitlab-ece-audiomixer-activity-7188358374550388736-XNYA",
        icon: <Wrench className="w-5 h-5" />
      }
    ],
    skills: [
      {
        category: "Artificial Intelligence",
        items: [
          { name: "Generative AI (LLM & RAG)", icon: <Brain className="w-4 h-4" /> },
          { name: "Computer Vision (YOLOv8)", icon: <Search className="w-4 h-4" /> },
          { name: "Edge AI & Optimization", icon: <Cpu className="w-4 h-4" /> }
        ]
      },
      {
        category: "Engineering & IoT",
        items: [
          { name: "IoT & Embedded Systems", icon: <Microchip className="w-4 h-4" /> },
          { name: "Network Security", icon: <Shield className="w-4 h-4" /> },
          { name: "Circuit Design", icon: <CircuitBoard className="w-4 h-4" /> }
        ]
      },
      {
        category: "Software & Tools",
        items: [
          { name: "Python, C, C++", icon: <FileCode className="w-4 h-4" /> },
          { name: "Linux & Git", icon: <Terminal className="w-4 h-4" /> },
          { name: "FastAPI & Gradio", icon: <Monitor className="w-4 h-4" /> }
        ]
      }
    ],
    awards: [
      { title: "Best Mini Project (Restaurant System)", date: "Nov 2024", href: "https://www.linkedin.com/posts/jeyanthangj_award-engineeringprojects-miniproject-activity-7338889712117395456-PTb4" },
      { title: "2nd Prize in Coders Crusade", date: "Apr 2024, CIT", href: "https://www.linkedin.com/posts/jeyanthangj_mepcoece-mepco-symposium-activity-7217735582947450881-3pH7" },
      { title: "Presented Paper on 'Big Data'", date: "Apr 2024, CIT", href: "https://www.linkedin.com/posts/jeyanthangj_mechanicalengineering-mechnotron2k24-technicalsymposium-activity-7198628874757287936-zZFK" },
      { title: "Best Mini Project (Audio Mixer)", date: "Dec 2023", href: "https://www.linkedin.com/posts/jeyanthangj_electroniccircuitlab-ece-audiomixer-activity-7188358374550388736-XNYA" },
      { title: "HackerRank Achievement (5★ C++)", date: "Problem Solving & C++", href: "https://www.hackerrank.com/profile/jeyanthangJ2004" }
    ],
    certificates: [
      { name: "IoT Fundamentals", provider: "Cisco Networking Academy", icon: <Microchip className="w-4 h-4" />, href: "https://www.linkedin.com/posts/jeyanthangj_iot-cisco-digitaltransformation-activity-7337050858410385410-v8vc" },
      { name: "Industry 4.0 & IIoT", provider: "NPTEL", icon: <Layers className="w-4 h-4" />, href: "https://www.linkedin.com/posts/jeyanthangj_industry4-iot-digitaltransformation-activity-7271460455481511936-MIU7" },
      { name: "Joy of Computing using Python", provider: "NPTEL", icon: <FileCode className="w-4 h-4" />, href: "https://www.linkedin.com/posts/jeyanthangj_python-nptel-achievementunlocked-activity-7198624597498368000-KSTS" },
      { name: "Digital Logic Circuits", provider: "Great Learning", icon: <CircuitBoard className="w-4 h-4" />, href: "https://www.linkedin.com/posts/jeyanthangj_digitallogic-computerarchitecture-learningjourney-activity-7230528911393054720-MwB7" },
      { name: "Arduino vs Raspberry Pi", provider: "Great Learning", icon: <Cpu className="w-4 h-4" />, href: "https://www.linkedin.com/posts/jeyanthangj_arduino-raspberrypi-greatlearning-activity-7220364427986886656-oQk4" },
      { name: "Introduction to IoT", provider: "NPTEL", icon: <Wifi className="w-4 h-4" />, href: "https://www.linkedin.com/posts/jeyanthangj_iot-nptel-achievementunlocked-activity-7195036882743828480-Q8Zh" },
      { name: "Problem Solving Through C", provider: "NPTEL", icon: <Terminal className="w-4 h-4" />, href: "https://www.linkedin.com/posts/jeyanthangj_nptel-cprogramming-problemsolving-activity-7198630519247413248-s1BQ" },
      { name: "OOPs in Python", provider: "Great Learning", icon: <Code className="w-4 h-4" />, href: "https://www.linkedin.com/posts/jeyanthangj_python-oop-greatlearningacademy-activity-7222153694337802241-QiNw" },
      { name: "English for Technical Professionals", provider: "IEEE", icon: <GraduationCap className="w-4 h-4" /> }
    ]
  };

  // Animate cards on mount
  useEffect(() => {
    if (cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { opacity: 0, y: 50, rotationX: -15 },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out"
        }
      );
    }
  }, []);

  // Card animation variants
  const cardVariants = {
    initial: { scale: 1, rotateY: 0 },
    hover: {
      scale: 1.02,
      rotateY: 2,
      transition: { duration: 0.3 }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="profiles"
      className="py-20 px-4 bg-secondary/30"
    >
      <div className="container mx-auto max-w-7xl">

        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-primary">Profile</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-8" />
        </motion.div>

        {/* Profile content */}
        <div ref={cardsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Projects card - Spans 2 columns on tablet and desktop */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            className="md:col-span-2 lg:col-span-2"
          >
            <Card className="floating-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-6 h-6 text-primary" />
                  Key Projects
                </CardTitle>
                <div className="w-16 h-1 bg-gradient-primary rounded-full" />
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {profile.projects.map((project, index) => (
                    <motion.div
                      key={index}
                      className="space-y-2 p-4 rounded-lg bg-secondary/10 hover:bg-secondary/40 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 flex-shrink-0 mt-1">
                          {project.icon}
                        </div>
                        <div className="flex-1">
                          <h6 className="font-semibold text-primary flex items-center gap-2">
                            {project.title}
                            {project.link && (
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-primary-glow transition-colors"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </h6>
                          <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills card */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            className="md:col-span-1 lg:col-span-1"
          >
            <Card className="floating-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Core Skills
                </CardTitle>
                <div className="w-16 h-1 bg-gradient-primary rounded-full" />
              </CardHeader>
              <CardContent className="space-y-6">
                {profile.skills.map((skillGroup, index) => (
                  <motion.div
                    key={index}
                    className="space-y-3"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h6 className="font-semibold text-primary">
                      {skillGroup.category}
                    </h6>
                    <div className="flex flex-wrap gap-2">
                      {skillGroup.items.map((skill, skillIndex) => (
                        <Badge
                          key={skillIndex}
                          variant="secondary"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-default hover-scale flex items-center gap-2 py-2 px-3"
                        >
                          <span className="text-primary">{skill.icon}</span>
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                    {index < profile.skills.length - 1 && (
                      <hr className="border-border/50" />
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Awards card */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            className="md:col-span-1 lg:col-span-1"
          >
            <Card className="floating-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-6 h-6 text-primary" />
                  Awards & Achievement
                </CardTitle>
                <div className="w-16 h-1 bg-gradient-primary rounded-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                {profile.awards.map((award, index) => {
                  const AwardContent = (
                    <>
                      <div className="p-2 rounded-full bg-accent/20 flex-shrink-0">
                        <Award className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h6 className="font-semibold text-foreground text-sm flex items-center gap-2">
                          {award.title}
                          {award.href && (
                            <ExternalLink className="w-3 h-3 text-primary" />
                          )}
                        </h6>
                        <p className="text-xs text-muted-foreground">
                          {award.date}
                        </p>
                      </div>
                    </>
                  );

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {award.href ? (
                        <a
                          href={award.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer block"
                        >
                          {AwardContent}
                        </a>
                      ) : (
                        <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                          {AwardContent}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>


          {/* Certificates card - spans 2 columns on tablet and desktop */}
          <motion.div
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
            className="md:col-span-2 lg:col-span-2"
          >
            <Card className="floating-card h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-primary" />
                  Professional Certificates
                </CardTitle>
                <div className="w-16 h-1 bg-gradient-primary rounded-full" />
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {profile.certificates.map((certificate, index) => {
                    const CertificateContent = (
                      <>
                        <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                          <span className="text-primary">{certificate.icon}</span>
                        </div>
                        <div className="flex-1">
                          <h6 className="font-semibold text-foreground text-sm flex items-center gap-2">
                            {certificate.name}
                            {certificate.href && (
                              <ExternalLink className="w-3 h-3 text-primary" />
                            )}
                          </h6>
                          <p className="text-xs text-muted-foreground">
                            {certificate.provider}
                          </p>
                        </div>
                      </>
                    );

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        {certificate.href ? (
                          <a
                            href={certificate.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer block"
                          >
                            {CertificateContent}
                          </a>
                        ) : (
                          <div className="flex items-center gap-3 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                            {CertificateContent}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}