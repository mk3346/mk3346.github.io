import { Button } from "@/components/ui/button";
import ClientLogos from "@/components/ClientLogos";
const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth"
      });
    }
  };
  return <section id="hero" className="relative min-h-screen flex flex-col justify-center bg-gradient-subtle overflow-hidden" style={{
    backgroundImage: `url('/lovable-uploads/61517786-a197-48f0-aca1-13dd32204189.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
      <div className="absolute inset-0 bg-background/60"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center pt-20">
        <h1 className="text-4xl md:text-6xl font-semibold mb-6 leading-tight relative z-10 text-foreground">
          Transform Your
          <span className="text-gradient block leading-tight">
            Digital Future
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">Strategic consulting, interim management, and startup advisory for ambitious companies navigating digital and AI-driven growth.</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button variant="hero" size="lg" onClick={() => scrollToSection("offering")} className="px-12 py-6 text-lg">
            Explore Services
          </Button>
          <Button variant="outline" size="lg" onClick={() => scrollToSection("contact")} className="px-12 py-6 text-lg">
            Get in Touch
          </Button>
        </div>
      </div>

      <div className="relative z-10 mt-16">
        <ClientLogos />
      </div>
    </section>;
};
export default Hero;