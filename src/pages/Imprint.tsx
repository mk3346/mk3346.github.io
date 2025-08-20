const Imprint = () => {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <a 
            href="/" 
            className="text-accent hover:text-accent/80 transition-smooth"
          >
            ← Back to Home
          </a>
        </div>

        <h1 className="text-4xl font-bold mb-8">Impressum</h1>
        
        <div className="prose prose-lg max-w-none">
          <p>Marco Krebs<br />
          Marco Krebs Consulting<br />
          Urbanstr. 20<br />
          81371 München</p>

          <h2>Kontakt</h2>
          <p>Telefon: +4915679676694<br />
          E-Mail: info@marcokrebs-consulting.de</p>

          <h2>Umsatzsteuer-ID</h2>
          <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
          DE362194651</p>

          <h2>Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
        </div>
      </div>
    </div>
  );
};

export default Imprint;