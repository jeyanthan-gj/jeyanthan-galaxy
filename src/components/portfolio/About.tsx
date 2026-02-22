import { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Download, Mail, Phone, MapPin, Calendar, ExternalLink, Linkedin, Github, Facebook, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugin
gsap.registerPlugin(ScrollTrigger);

/**
 * About section with 3D card animations and interactive profile switching
 * Features floating cards, animated text, and responsive design
 */
export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Professional summary from resume
  const summary = "AI-focused ECE student specializing in Computer Vision, Generative AI, RAG, and Knowledge Graphs. Experienced in IoT and embedded systems with strong interest in building real-world intelligent applications. Passionate about developing scalable AI solutions integrating hardware and software.";

  // Personal information from resume
  const personalInfo = [
    { icon: Mail, label: 'Email', value: 'jeyanthangj2004@gmail.com', href: 'mailto:jeyanthangj2004@gmail.com' },
    { icon: Phone, label: 'Phone', value: '+91 9976719167', href: 'tel:+919976719167' },
    { icon: Calendar, label: 'Date of Birth', value: 'August 03, 2004' },
    { icon: MapPin, label: 'Address', value: 'Anjugramam, Kanniyakumari, India' }
  ];

  // Education data from resume
  const education = [
    {
      degree: "B.E. (Hons) in Electronics and Communication Engineering",
      specialization: "Specialization in IoT, with additional vertical in Networking and Security",
      institution: "Mepco Schlenk Engineering College",
      website: "https://www.mepcoeng.ac.in/",
      period: "2022 – 2026",
      grade: "CGPA: 7.87 (till 7th sem)"
    },
    {
      degree: "HSC - 91.17%",
      institution: "SAV Balakrishna Matriculation Hr.Sec. School",
      website: "https://savbalakrishna.com/",
      period: "2022"
    },
    {
      degree: "SSLC - 98.4%",
      institution: "S.M Matriculation Hr.Sec. School",
      website: "https://smmhrsscl.com/",
      period: "2020"
    }
  ];

  // GSAP animations for cards on scroll
  useEffect(() => {
    if (isInView) {
      const cards = gsap.utils.toArray('.about-card');

      gsap.fromTo(cards,
        {
          y: 100,
          opacity: 0,
          rotationX: -15
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [isInView]);

  // Card hover animation variants
  const cardVariants = {
    initial: { scale: 1, rotateY: 0 },
    hover: {
      scale: 1.05,
      rotateY: 5,
      transition: {
        type: "spring" as const,
        stiffness: 300,
        damping: 20
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Section title with animation */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Who am I card */}
          <motion.div
            className="about-card"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
          >
            <Card className="floating-card h-full transform-3d">
              <CardHeader>
                <CardTitle className="text-2xl font-light">Who am I?</CardTitle>
                <div className="w-16 h-1 bg-gradient-primary rounded-full" />
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Photo */}
                <motion.div
                  className="flex justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <div className="relative">
                    <img
                      src="/74754.JPG"
                      alt="Jeyanthan GJ - Portfolio Photo"
                      className="w-40 h-48 md:w-48 md:h-56 rounded-[2.5rem] object-cover object-top border-4 border-primary/20 shadow-lg hover:shadow-primary/20 transition-all duration-300"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-0 hover:opacity-10 transition-opacity duration-300" />
                  </div>
                </motion.div>

                <motion.p
                  className="text-muted-foreground leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {summary}
                </motion.p>

                {/* Download CV button */}
                <div className="pt-4">
                  <Button
                    className="w-full btn-3d group"
                    asChild
                  >
                    <a
                      href="/Jeyanthan-GJ-Resume.pdf"
                      download="Jeyanthan-GJ-Resume.pdf"
                      className="flex items-center gap-2"
                    >
                      <Download className="w-4 h-4 group-hover:animate-bounce" />
                      Download Resume
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Personal Info card */}
          <motion.div
            className="about-card"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
          >
            <Card className="floating-card h-full transform-3d">
              <CardHeader>
                <CardTitle className="text-2xl font-light">Personal Info</CardTitle>
                <div className="w-16 h-1 bg-gradient-primary rounded-full" />
              </CardHeader>
              <CardContent className="space-y-4">
                {personalInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  >
                    <div className="p-2 rounded-full bg-primary/10 flex-shrink-0">
                      <info.icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">{info.label}</p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className="text-sm md:text-base text-foreground hover:text-primary transition-colors block truncate hover:text-clip hover:whitespace-normal break-all"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm md:text-base text-foreground break-all">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Social links */}
                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-3">Follow me</p>
                  <div className="flex gap-3">
                    {[
                      { href: "https://www.linkedin.com/in/jeyanthangj/", name: "LinkedIn", icon: Linkedin },
                      { href: "https://github.com/jeyanthan-gj", name: "GitHub", icon: Github },
                      { href: "https://www.facebook.com/people/Jeyanthan-GJ/pfbid07RhcHPBYBRyC7pMw8SViuyqYrbyiZRkoMvAgyndwdCLfxfBa4Nr31MZ8hPkjfQtDl/?mibextid=ZbWKwL", name: "Facebook", icon: Facebook },
                      { href: "https://www.instagram.com/jeyanthan_gj_2004/", name: "Instagram", icon: Instagram }
                    ].map((social) => (
                      <Button
                        key={social.name}
                        variant="ghost"
                        size="sm"
                        asChild
                        className="hover:bg-primary/20 hover:text-primary p-2"
                      >
                        <a href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.name}>
                          <social.icon className="w-4 h-4" />
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education card */}
          <motion.div
            className="about-card"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
          >
            <Card className="floating-card h-full transform-3d">
              <CardHeader>
                <CardTitle className="text-2xl font-light">My Education</CardTitle>
                <div className="w-16 h-1 bg-gradient-primary rounded-full" />
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    className="space-y-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 + index * 0.2 }}
                  >
                    <h6 className="font-semibold text-foreground">
                      {edu.degree}
                    </h6>
                    {edu.specialization && (
                      <p className="text-sm text-muted-foreground">
                        {edu.specialization}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <a
                        href={edu.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary-glow transition-colors flex items-center gap-1"
                      >
                        {edu.institution}
                        {edu.website && <ExternalLink className="w-3 h-3" />}
                      </a>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {edu.period} {edu.grade && `| ${edu.grade}`}
                    </p>
                    {index < education.length - 1 && (
                      <hr className="border-border/50 my-4" />
                    )}
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}