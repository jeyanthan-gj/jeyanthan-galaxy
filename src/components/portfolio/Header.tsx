import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Linkedin, Github, Facebook, Instagram, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

/**
 * Animated hero header with 3D elements and smooth scroll introduction
 * Features floating animation, glowing text effects, and responsive design
 */
export default function Header() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP animations for text entrance
  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    tl.fromTo(subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    )
      .fromTo(titleRef.current,
        { y: 80, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "back.out(1.7)" },
        "-=0.4"
      );
  }, []);

  // Social media links with hover animations
  const socialLinks = [
    {
      href: "https://www.linkedin.com/in/jeyanthangj/",
      icon: Linkedin,
      label: "LinkedIn Profile",
      color: "hover:text-blue-400"
    },
    {
      href: "https://github.com/jeyanthan-gj",
      icon: Github,
      label: "GitHub Profile",
      color: "hover:text-gray-300"
    },
    {
      href: "https://www.facebook.com/people/Jeyanthan-GJ/pfbid07RhcHPBYBRyC7pMw8SViuyqYrbyiZRkoMvAgyndwdCLfxfBa4Nr31MZ8hPkjfQtDl/?mibextid=ZbWKwL",
      icon: Facebook,
      label: "Facebook Profile",
      color: "hover:text-blue-500"
    },
    {
      href: "https://www.instagram.com/jeyanthan_gj_2004/",
      icon: Instagram,
      label: "Instagram Profile",
      color: "hover:text-pink-400"
    }
  ];

  // Smooth scroll to about section
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/80 z-10" />

      {/* Main content container */}
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">

        {/* Social links floating at the top */}
        <motion.div
          className="flex justify-center gap-6 mb-12"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {socialLinks.map((social, index) => (
            <motion.a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`p-3 rounded-full bg-card/20 backdrop-blur-sm border border-border/30 
                         text-muted-foreground transition-all duration-300 
                         hover:bg-card/40 hover:border-primary/50 hover:shadow-glow-primary
                         transform hover:scale-110 ${social.color}`}
              whileHover={{
                scale: 1.15,
                rotateZ: 5,
                boxShadow: "0 0 25px rgba(59, 130, 246, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <social.icon size={24} />
            </motion.a>
          ))}
        </motion.div>

        {/* Subtitle with floating animation */}
        <motion.h4
          ref={subtitleRef}
          className="text-lg md:text-xl text-muted-foreground mb-4 font-light tracking-wide"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          Hello, I am
        </motion.h4>

        {/* Main title with glow effect and logo */}
        <div className="mb-6">
          <h1
            ref={titleRef}
            className="text-4xl md:text-7xl lg:text-8xl font-bold 
                       bg-gradient-primary bg-clip-text text-transparent
                       animate-glow-pulse relative"
          >
            Jeyanthan GJ
            <div className="absolute inset-0 bg-gradient-primary bg-clip-text text-transparent 
                            blur-sm opacity-50 animate-pulse"
              aria-hidden="true">
              Jeyanthan GJ
            </div>
          </h1>
        </div>

        {/* Description with typewriter effect */}
        <motion.h6
          className="text-xl md:text-2xl text-accent font-medium mb-12 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          AI-focused Electronics & Communication Engineer
        </motion.h6>

        {/* Call to action button with 3D effect */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
        >
          <Button
            onClick={scrollToAbout}
            size="lg"
            className="btn-3d text-lg px-8 py-4 rounded-full font-semibold
                       group relative overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-3">
              <ChevronDown className="w-5 h-5 animate-bounce" />
              Explore My Work
            </span>

            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent 
                            transform scale-x-0 group-hover:scale-x-100 
                            transition-transform duration-500 origin-left" />
          </Button>
        </motion.div>

        {/* Floating scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full 
                          flex justify-center">
            <motion.div
              className="w-1 h-3 bg-primary rounded-full mt-2"
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
    </header>
  );
}