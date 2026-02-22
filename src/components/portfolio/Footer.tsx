import { Heart } from 'lucide-react';

/**
 * Footer component with animated heart and year display
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 px-4 bg-card/50 backdrop-blur-sm border-t border-border/50">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground">
          © {currentYear} Created with{' '}
          <Heart className="inline w-4 h-4 text-red-500 animate-pulse mx-1" />
          by{' '}
          <a 
            href="https://www.linkedin.com/in/jeyanthangj/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-glow transition-colors font-medium"
          >
            Jeyanthan GJ
          </a>
        </p>
      </div>
    </footer>
  );
}