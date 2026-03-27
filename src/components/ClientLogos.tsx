const ClientLogos = () => {
  const clients = [{
    name: "Ignite Next",
    url: "https://ignitenext.com",
    logo: "/lovable-uploads/ignite-next-logo.svg",
    height: "h-9"
  }, {
    name: "Redcare Pharmacy",
    url: "https://www.redcare-pharmacy.com/",
    logo: "/lovable-uploads/121a944d-f74d-4790-a7b4-645c0a9f1ef3.png",
    height: "h-6"
  }, {
    name: "With Love and Data",
    url: "https://withloveanddata.com/",
    logo: "/lovable-uploads/aa8395e4-bf8e-4072-bd3b-ced535dda6a5.png",
    height: "h-7"
  }, {
    name: "Neocom",
    url: "https://neocom.ai/",
    logo: "/lovable-uploads/6c54247f-fcc9-445b-9c44-5dcda2ce15fb.png",
    height: "h-6"
  }, {
    name: "Tape it Music",
    url: "https://tape.it/",
    logo: "/lovable-uploads/a272e2b1-f830-407c-8e1a-169b64b87062.png",
    height: "h-6"
  }];
  return <section className="py-8">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-xs text-muted-foreground mb-8 uppercase tracking-wider">TRUSTED BY ENTERPRISES AND STARTUPS</p>

        <div className="flex flex-wrap justify-center md:justify-between gap-y-8 items-center">
          {clients.map((client, index) => <a key={index} href={client.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center transition-smooth px-4 md:px-0">
              <img src={client.logo} alt={`${client.name} logo`} className={`${client.height} w-auto object-contain opacity-40 group-hover:opacity-60 transition-smooth grayscale`} />
            </a>)}
        </div>
      </div>
    </section>;
};
export default ClientLogos;
