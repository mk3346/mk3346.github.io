import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import mkLogo from "@/assets/mk-logo.png";
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleChars, setVisibleChars] = useState<boolean[]>([]);
  const [blueChars, setBlueChars] = useState<boolean[]>([]);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "Marco Krebs Consulting";
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apple-inspired fade-in animation effect
  useEffect(() => {
    const chars = Array(fullText.length).fill(false);
    setVisibleChars(chars);
    setBlueChars(Array(fullText.length).fill(false));
    
    const delays = fullText.split('').map((_, index) => 
      setTimeout(() => {
        setVisibleChars(prev => {
          const newVisible = [...prev];
          newVisible[index] = true;
          
          // Check if this is the last character
          if (index === fullText.length - 1) {
            setTimeout(() => setIsTypingComplete(true), 200);
          }
          
          return newVisible;
        });
      }, index * 60 + 500) // Start after 500ms, then 60ms between chars
    );

    return () => delays.forEach(clearTimeout);
  }, [fullText]);

  // Blue fill effect after typing is complete
  useEffect(() => {
    if (!isTypingComplete) return;

    // Wait a moment before starting blue effect
    const startDelay = setTimeout(() => {
      // Fill with blue
      const blueDelays = fullText.split('').map((_, index) => 
        setTimeout(() => {
          setBlueChars(prev => {
            const newBlue = [...prev];
            newBlue[index] = true;
            return newBlue;
          });
        }, index * 40)
      );

      // Return to normal after blue fill is complete
      const returnDelay = setTimeout(() => {
        const returnDelays = fullText.split('').map((_, index) => 
          setTimeout(() => {
            setBlueChars(prev => {
              const newBlue = [...prev];
              newBlue[index] = false;
              return newBlue;
            });
          }, index * 30)
        );

        return () => returnDelays.forEach(clearTimeout);
      }, fullText.length * 40 + 300);

      return () => {
        blueDelays.forEach(clearTimeout);
        clearTimeout(returnDelay);
      };
    }, 800);

    return () => clearTimeout(startDelay);
  }, [isTypingComplete, fullText]);
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-subtle" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <button onClick={() => scrollToSection("hero")} className="flex items-center gap-2 text-foreground hover:text-accent transition-smooth">
            
            <span className="text-base font-medium">
              {fullText.split('').map((char, index) => (
                <span
                  key={index}
                  className={`inline-block transition-all duration-300 ease-out ${
                    visibleChars[index] 
                      ? 'opacity-100 translate-y-0 blur-0' 
                      : 'opacity-0 translate-y-2 blur-[1px]'
                  } ${blueChars[index] ? 'text-primary' : ''}`}
                  style={{ 
                    transitionDelay: `${index * 30}ms`,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </button>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("offering")} className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              Services
            </button>
            <button onClick={() => scrollToSection("about")} className="text-sm text-muted-foreground hover:text-foreground transition-smooth">
              About
            </button>
            <Button variant="ghost" size="sm" onClick={() => scrollToSection("contact")}>
              Contact
            </Button>
          </div>
        </div>
      </div>
    </nav>;
};
export default Navigation;