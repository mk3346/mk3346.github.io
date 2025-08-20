import redcareLogo from "@/assets/redcare-logo.png";
import withloveandDataLogo from "@/assets/withloveanddata-logo.png";
import neocomLogo from "@/assets/neocom-logo.png";
import tapeitLogo from "@/assets/tapeit-logo.png";
const ClientLogos = () => {
  const clients = [{
    name: "Redcare Pharmacy",
    url: "https://www.redcare-pharmacy.com/",
    logo: "/lovable-uploads/121a944d-f74d-4790-a7b4-645c0a9f1ef3.png"
  }, {
    name: "With Love and Data",
    url: "https://withloveanddata.com/",
    logo: "/lovable-uploads/aa8395e4-bf8e-4072-bd3b-ced535dda6a5.png"
  }, {
    name: "Neocom",
    url: "https://neocom.ai/",
    logo: "/lovable-uploads/6c54247f-fcc9-445b-9c44-5dcda2ce15fb.png"
  }, {
    name: "Tape it Music",
    url: "https://tape.it/",
    logo: "/lovable-uploads/a272e2b1-f830-407c-8e1a-169b64b87062.png"
  }];
  return <section className="py-8">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs text-muted-foreground mb-8 uppercase tracking-wider">TRUSTED BY ENTERPRISES AND STARTUPS</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {clients.map((client, index) => <a key={index} href={client.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center transition-smooth">
              <img src={client.logo} alt={`${client.name} logo`} className={`${client.name === "With Love and Data" ? "h-7" : "h-6"} w-auto object-contain opacity-40 group-hover:opacity-60 transition-smooth grayscale`} />
            </a>)}
        </div>
      </div>
    </section>;
};
export default ClientLogos;