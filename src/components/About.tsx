const About = () => {
  return <section id="about" className="relative py-16 md:py-24" style={{
    backgroundImage: `url('/lovable-uploads/61517786-a197-48f0-aca1-13dd32204189.png')`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  }}>
      <div className="absolute inset-0 bg-background/60"></div>
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">
            Entrepreneur.
            <span className="text-gradient block">
              Advisor. Leader.
            </span>
          </h2>
          
          <div className="bg-card rounded-3xl pt-8 md:pt-12 px-6 md:px-12 pb-6 md:pb-8 transition-smooth md:hover:scale-105 cursor-pointer overflow-hidden max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-12 mb-8">
              <div className="md:flex-shrink-0">
                <div className="relative">
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <clipPath id="torn-edge" clipPathUnits="objectBoundingBox">
                        <path d="M0.05,0.02 C0.12,0.01 0.18,0.03 0.25,0.01 C0.35,0.02 0.42,0.05 0.52,0.03 C0.65,0.04 0.72,0.01 0.85,0.02 C0.92,0.05 0.96,0.08 0.98,0.15 C0.99,0.25 0.97,0.35 0.95,0.45 C0.96,0.55 0.98,0.65 0.96,0.75 C0.94,0.82 0.91,0.88 0.85,0.92 C0.75,0.95 0.65,0.93 0.55,0.94 C0.45,0.96 0.35,0.98 0.25,0.96 C0.15,0.94 0.08,0.91 0.05,0.85 C0.02,0.75 0.04,0.65 0.03,0.55 C0.01,0.45 0.02,0.35 0.04,0.25 C0.02,0.15 0.03,0.08 0.05,0.02 Z" />
                      </clipPath>
                    </defs>
                  </svg>
                  <div className="relative w-52 h-60 md:w-72 md:h-80 hover-scale group">
                    <div className="absolute -inset-2 bg-gradient-to-br from-primary/10 to-accent/5 blur-lg opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-300" aria-hidden="true"></div>
                    <div className="absolute -inset-3 bg-gradient-to-br from-primary/15 to-accent/10 blur-xl opacity-0 group-hover:opacity-30 transition-all duration-300" aria-hidden="true"></div>
                    <img src="/lovable-uploads/e1ed53a4-556d-4c20-be9c-eebe38ff3f8a.png" alt="Marco Krebs drinking coffee" loading="lazy" className="relative z-10 w-full h-full object-cover object-center shadow-lg group-hover:shadow-2xl transition-shadow duration-300" style={{
                    clipPath: "url(#torn-edge)"
                  }} />
                    <div className="absolute -bottom-2 -right-2 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-md z-20">
                      ☕ Coffee fuels innovation!
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed text-center md:text-left md:flex-1 mt-6 md:mt-0">
                <p className="text-justify">I'm an entrepreneur and strategic advisor with a track record of building and scaling AI-driven startups. I began in management consulting, guiding enterprises through digital transformation. Later, I moved into innovation leadership in a global organization. Over the past decade, I co-founded one AI venture and helped scale another, leading fundraising, product strategy, and achieving a successful exit. Today, I help startups and established companies shape strategy, drive digital innovation and scale growth by leveraging new technologies.</p>
              </div>
            </div>
            
            {/* Company Experience Logos */}
            <div className="mt-2 pt-2 border-t border-border/20">
              <div className="flex flex-wrap gap-6 md:gap-0 items-center justify-center md:justify-between w-full">
                  <img src="/lovable-uploads/6da2db52-bf35-46ae-8154-e9f6b2fa4e94.png" alt="Deutsche Telekom" loading="lazy" className="h-6 w-auto object-contain opacity-40 hover:opacity-60 transition-smooth grayscale md:ml-4" />
                  <img src="/lovable-uploads/d5ee3b67-c125-4f63-a193-3f5356ad3391.png" alt="Detecon Consulting" loading="lazy" className="h-10 md:h-12 w-auto object-contain opacity-40 hover:opacity-60 transition-smooth grayscale" />
                  <img src="/lovable-uploads/281c58db-0215-49bb-ba69-da1982f665b9.png" alt="FTI Group" loading="lazy" className="h-6 md:h-7 w-auto object-contain opacity-40 hover:opacity-60 transition-smooth grayscale" />
                  <img src="/lovable-uploads/e06fe036-9e12-451a-a82b-558203653c68.png" alt="Fineway" loading="lazy" className="h-8 md:h-10 w-auto object-contain opacity-40 hover:opacity-60 transition-smooth grayscale" />
                  <img src="/lovable-uploads/19117524-8b19-457a-87c7-7e8d0429528b.png" alt="Laya" loading="lazy" className="h-3 md:h-2.5 w-auto object-contain opacity-40 hover:opacity-60 transition-smooth grayscale md:mr-4" />
                </div>
              </div>
            </div>
          </div>
      </div>
    </section>;
};
export default About;