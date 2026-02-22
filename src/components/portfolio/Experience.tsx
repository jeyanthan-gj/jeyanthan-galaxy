import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Users, Building, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

/**
 * Experience section showcasing leadership roles and industrial visits
 * Features timeline animations and floating card effects
 */
export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // Leadership experience data from resume
  const leadership = [
    {
      role: "Placement Representative",
      organization: "ECE-C (2022-2026) boys batch, Mepco Schlenk",
      period: "2023 – 2026",
      description: "Coordinating placement activities and career guidance for the batch",
      icon: <Users className="w-5 h-5" />
    },
    {
      role: "Convener",
      organization: "Institution of Engineers Student's Chapter",
      period: "2025 – 2026",
      description: "Leading the student chapter and organizing major engineering events",
      icon: <Users className="w-5 h-5" />
    },
    {
      role: "Active Organizer",
      organization: "GYAN MITRA '25",
      period: "2025",
      description: "National-level techno symposium organization and management",
      icon: <Building className="w-5 h-5" />
    },
    {
      role: "Joint Secretary",
      organization: "Institution of Engineers Student's Chapter",
      period: "2024 – 2025",
      description: "Coordinating student engineering initiatives and symposiums",
      icon: <Users className="w-5 h-5" />
    },
    {
      role: "Active Volunteer",
      organization: "GYAN MITRA '24",
      period: "2024",
      description: "National-level techno symposium coordination and support",
      icon: <Building className="w-5 h-5" />
    },
    {
      role: "Executive Member",
      organization: "Institution of Engineers Student's Chapter",
      period: "2023 – 2024",
      description: "Supporting chapter activities and student engagement",
      icon: <Users className="w-5 h-5" />
    }
  ];

  // Industrial visits data
  const industrialVisits = [
    {
      company: "Keltron",
      location: "Thiruvananthapuram",
      date: "January 2025",
      description: "Electronics manufacturing and government sector operations",
      icon: <Building className="w-5 h-5" />
    },
    {
      company: "C-DAC",
      location: "Thiruvananthapuram",
      date: "January 2025",
      description: "Advanced computing development and research center",
      icon: <Building className="w-5 h-5" />
    },
    {
      company: "VeeVee Controls Pvt Ltd",
      location: "Bangalore",
      date: "March 2024",
      description: "Industrial automation and control systems",
      icon: <Building className="w-5 h-5" />
    }
  ];

  // Animation variants for staggered card entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  const hoverVariants = {
    initial: { scale: 1, rotateY: 0 },
    hover: {
      scale: 1.02,
      rotateY: 3,
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
      id="experience"
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/5 via-transparent to-primary/5" />
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <div className="container mx-auto max-w-7xl relative z-10">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full" />
        </motion.div>

        {/* Content grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >

          {/* Leadership & Responsibility */}
          <motion.div variants={cardVariants}>
            <motion.div
              variants={hoverVariants}
              initial="initial"
              whileHover="hover"
            >
              <Card className="floating-card h-full transform-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 md:gap-3 text-xl md:text-2xl">
                    <Users className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    Leadership & Responsibility
                  </CardTitle>
                  <div className="w-16 h-1 bg-gradient-primary rounded-full" />
                </CardHeader>
                <CardContent className="space-y-6">
                  {leadership.map((item, index) => (
                    <motion.div
                      key={index}
                      className="relative p-4 rounded-lg hover:bg-secondary/30 transition-all duration-300 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      {/* Timeline connector */}
                      {index < leadership.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-primary to-transparent hidden sm:block" />
                      )}

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-primary/20 group-hover:bg-primary/30 transition-colors flex-shrink-0">
                          {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h6 className="font-semibold text-foreground group-hover:text-primary transition-colors text-sm md:text-base">
                            {item.role}
                          </h6>
                          <p className="text-sm text-primary mb-1 break-words">
                            {item.organization}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Calendar className="w-3 h-3" />
                            {item.period}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Industrial Visits */}
          <motion.div variants={cardVariants}>
            <motion.div
              variants={hoverVariants}
              initial="initial"
              whileHover="hover"
            >
              <Card className="floating-card h-full transform-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 md:gap-3 text-xl md:text-2xl">
                    <Building className="w-6 h-6 md:w-7 md:h-7 text-accent" />
                    Industrial Visits
                  </CardTitle>
                  <div className="w-16 h-1 bg-gradient-to-r from-accent to-primary rounded-full" />
                </CardHeader>
                <CardContent className="space-y-6">
                  {industrialVisits.map((visit, index) => (
                    <motion.div
                      key={index}
                      className="relative p-4 rounded-lg hover:bg-secondary/30 transition-all duration-300 group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      {/* Timeline connector */}
                      {index < industrialVisits.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gradient-to-b from-accent to-transparent" />
                      )}

                      <div className="flex items-start gap-4">
                        <div className="p-2 rounded-full bg-accent/20 group-hover:bg-accent/30 transition-colors flex-shrink-0">
                          {visit.icon}
                        </div>
                        <div className="flex-1">
                          <h6 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                            {visit.company}
                          </h6>
                          <div className="flex items-center gap-2 text-sm text-accent mb-1">
                            <MapPin className="w-3 h-3" />
                            {visit.location}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                            <Calendar className="w-3 h-3" />
                            {visit.date}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {visit.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}