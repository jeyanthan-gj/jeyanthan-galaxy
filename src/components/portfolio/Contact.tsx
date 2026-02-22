import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Phone, Mail, Github, Linkedin, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

/**
 * Contact section with 3D form animation and WhatsApp integration
 * Features floating contact cards and interactive form validation
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const { toast } = useToast();

  // Contact information
  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+91 9976719167",
      href: "tel:+919976719167",
      color: "text-green-400",
      bgColor: "bg-green-400/10"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "jeyanthangj2004@gmail.com",
      href: "mailto:jeyanthangj2004@gmail.com",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    }
  ];

  // Social links
  const socialLinks = [
    {
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jeyanthangj/",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      href: "https://github.com/jeyanthan-gj",
      color: "text-gray-400",
      bgColor: "bg-gray-400/10"
    },
    {
      icon: <Instagram className="w-6 h-6" />,
      label: "Instagram",
      href: "https://www.instagram.com/jeyanthan_gj_2004/",
      color: "text-pink-400",
      bgColor: "bg-pink-400/10"
    },
    {
      icon: <Facebook className="w-6 h-6" />,
      label: "Facebook",
      href: "https://www.facebook.com/people/Jeyanthan-GJ/pfbid07RhcHPBYBRyC7pMw8SViuyqYrbyiZRkoMvAgyndwdCLfxfBa4Nr31MZ8hPkjfQtDl/?mibextid=ZbWKwL",
      color: "text-blue-400",
      bgColor: "bg-blue-400/10"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      label: "WhatsApp",
      href: "https://wa.me/9976719167",
      color: "text-green-400",
      bgColor: "bg-green-400/10"
    }
  ];

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  // Handle form submission via WhatsApp
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields before sending.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format message for WhatsApp
      const formattedMessage = `New Inquiry from Portfolio:

Name: ${formData.name}
Email: ${formData.email}
Message: ${formData.message}`;

      const phoneNumber = "9976719167";
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(formattedMessage)}`;

      // Open WhatsApp in new tab
      window.open(whatsappLink, "_blank");

      // Show success toast
      toast({
        title: "Message Prepared!",
        description: "Your message has been formatted and WhatsApp is opening.",
      });

      // Reset form
      setFormData({ name: '', email: '', message: '' });

    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
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
      id="contact"
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-bl from-primary/5 via-transparent to-accent/5" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />

      <div className="container mx-auto max-w-6xl relative z-10">

        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Get In <span className="text-primary">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-primary mx-auto rounded-full mb-6" />
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Contact form */}
          <motion.div
            className="md:col-span-2 lg:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
            >
              <Card className="floating-card transform-3d">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 md:gap-3 text-xl md:text-2xl">
                    <MessageCircle className="w-6 h-6 md:w-7 md:h-7 text-primary" />
                    Send a Message
                  </CardTitle>
                  <div className="w-16 h-1 bg-gradient-primary rounded-full" />
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.4 }}
                    >
                      <Input
                        id="name"
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.5 }}
                    >
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your Email *"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.6 }}
                    >
                      <Textarea
                        id="message"
                        placeholder="Your Message *"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={6}
                        className="bg-secondary/50 border-border/50 focus:border-primary transition-all duration-300 resize-none"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.7 }}
                    >
                      <Button
                        type="submit"
                        size="lg"
                        disabled={isSubmitting}
                        className="w-full btn-3d group"
                      >
                        <span className="flex items-center gap-2">
                          {isSubmitting ? (
                            <>
                              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                              Preparing Message...
                            </>
                          ) : (
                            <>
                              <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                              Send Message via WhatsApp
                            </>
                          )}
                        </span>
                      </Button>
                    </motion.div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          {/* Contact info sidebar */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >

            {/* Contact information */}
            <motion.div
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
            >
              <Card className="floating-card transform-3d">
                <CardHeader>
                  <CardTitle>Contact Info</CardTitle>
                  <div className="w-16 h-1 bg-gradient-primary rounded-full" />
                </CardHeader>
                <CardContent className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.href}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-all duration-300 group"
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className={`p-3 rounded-full ${info.bgColor} ${info.color} group-hover:scale-110 transition-transform`}>
                        {info.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">{info.label}</p>
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors text-sm md:text-base break-all">
                          {info.value}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Social links */}
            <motion.div
              variants={cardVariants}
              initial="initial"
              whileHover="hover"
            >
              <Card className="floating-card transform-3d">
                <CardHeader>
                  <CardTitle>Follow Me</CardTitle>
                  <div className="w-16 h-1 bg-gradient-primary rounded-full" />
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-full ${social.bgColor} ${social.color} hover:scale-110 transition-all duration-300`}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}