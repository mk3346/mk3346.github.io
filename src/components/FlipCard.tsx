import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface FlipCardProps {
  title: string;
  punchline: string;
  description: string;
  features: string[];
  backgroundImage: string;
}

const FlipCard = ({ title, punchline, description, features, backgroundImage }: FlipCardProps) => {
  const [isClickFlipped, setIsClickFlipped] = useState(false);

  const handleFlip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClickFlipped(!isClickFlipped);
  };

  return (
    <div 
      className="relative h-80 w-full"
      style={{ perspective: "1000px" }}
    >
      <div 
        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-out ${
          isClickFlipped ? 'rotate-y-180' : ''
        }`}
        style={{ 
          transformStyle: "preserve-3d",
          transform: isClickFlipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl p-8 flex flex-col justify-center items-center text-center overflow-hidden"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(0deg)"
          }}
        >
          {/* Light overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/30 to-white/40 rounded-3xl" />
          
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-2xl font-semibold mb-4 text-foreground">{title}</h3>
            <p className="text-lg text-foreground font-medium leading-relaxed max-w-xs">
              {punchline}
            </p>
          </div>
          
          {/* Flip arrow */}
          <button
            onClick={handleFlip}
            className="absolute bottom-4 right-4 z-20 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors duration-200 backdrop-blur-sm"
            aria-label="Flip card"
          >
            <ChevronRight className="w-4 h-4 text-foreground" />
          </button>
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 w-full h-full rounded-3xl p-8 bg-secondary border border-border overflow-hidden"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <div className="flex flex-col h-full justify-center">
            <h3 className="text-xl font-semibold text-foreground mb-4 text-center">{title}</h3>
            
            <p className="text-sm text-muted-foreground leading-relaxed mb-4 text-center">
              {description}
            </p>
            
            <ul className="space-y-3 pl-6">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3 text-sm text-black dark:text-white">
                  <div className="w-2 h-2 bg-black dark:bg-white rounded-full flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Flip arrow */}
          <button
            onClick={handleFlip}
            className="absolute bottom-4 right-4 z-20 w-8 h-8 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center transition-colors duration-200"
            aria-label="Flip card back"
          >
            <ChevronRight className="w-4 h-4 text-foreground rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;