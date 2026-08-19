import { Button } from "@/components/ui/button";
import FlipCard from "./FlipCard";

const Offering = () => {
  const services = [
    {
      title: "Fractional Executive Roles",
      punchline: "Embedded part-time, accountable in full.",
      description: "Growth and commercial leadership (CGO-level) for technology companies and scale-up programs, embedded part-time at full accountability.",
      features: ["CGO-Level Growth Leadership", "Commercial Strategy", "Scale-up Programs"],
      backgroundImage: "/lovable-uploads/add7f079-fc7d-49dc-8e16-f7614860f3e2.png"
    },
    {
      title: "Board-Level Advisory",
      punchline: "Independent judgment where it matters most.",
      description: "Market entry, post-merger integration, and growth programs for listed and late-stage companies.",
      features: ["Market Entry", "Post-Merger Integration", "Growth Programs"],
      backgroundImage: "/lovable-uploads/f87dd0c3-de4a-4a43-9783-32e6f8ab7caf.png"
    },
    {
      title: "Startup Advisory",
      punchline: "Hands-on support to sharpen, refine, and grow.",
      description: "Go-to-market and fundraising support for AI and deep-tech startups from Seed to Series B.",
      features: ["Go-to-Market", "Fundraising Support & IR", "Seed to Series B"],
      backgroundImage: "/lovable-uploads/7de7117e-f548-4a60-9312-619b1e1a02a4.png"
    }
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="offering" className="py-24 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Services That Drive
            <span className="text-gradient block">
              Real Results
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leveraging 15+ years of experience in venture building, strategic consulting, 
            and digital transformation to accelerate your business growth.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <FlipCard
              key={index}
              title={service.title}
              punchline={service.punchline}
              description={service.description}
              features={service.features}
              backgroundImage={service.backgroundImage}
            />
          ))}
        </div>

        <div className="text-center">
          <Button
            variant="premium"
            size="lg"
            onClick={() => scrollToSection("contact")}
            className="px-12 py-6 text-lg"
          >
            Start Your Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Offering;