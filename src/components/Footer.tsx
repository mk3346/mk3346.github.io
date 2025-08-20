import { Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="py-8" style={{ backgroundColor: '#F5F5F7' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/60 text-sm">
            © 2025 Marco Krebs Consulting. All rights reserved.
          </p>
          
          <div className="flex items-center gap-6 text-sm">
            <a 
              href="/imprint" 
              target="_blank"
              className="text-foreground/60 hover:text-foreground transition-smooth"
            >
              Imprint
            </a>
            <a 
              href="/privacy" 
              target="_blank"
              className="text-foreground/60 hover:text-foreground transition-smooth"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.linkedin.com/in/marcokrebs/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-6 h-6 hover:opacity-70 transition-smooth"
              aria-label="LinkedIn Profile"
            >
              <img src="/lovable-uploads/bd0d8d83-82de-448f-ba42-0edeea88bd92.png" alt="LinkedIn" className="w-full h-full" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;