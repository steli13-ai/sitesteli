import React from 'react';
import { Helmet } from 'react-helmet';
import PageHero from '@/components/ui/PageHero';

const CookiesPolicy = () => {
  return (
    <div className="min-h-[70vh] bg-background">
      <Helmet>
        <title>Politica de Cookies | Mate cu Succes</title>
        <meta name="description" content="Află cum folosim cookie-urile pentru a îmbunătăți experiența pe Mate cu Succes." />
      </Helmet>

      <PageHero
        title="Politica de Cookies"
        subtitle="Cum folosim cookie-urile pentru funcționalitate, analiză și personalizare."
      />

      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* TOC */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-24 rounded-xl border border-background/20 bg-background/60 p-4">
                <p className="text-sm font-medium text-text-primary mb-3">Cuprins</p>
                <nav className="space-y-2 text-sm">
                  <a className="block text-text-secondary hover:text-primary" href="#ce-sunt">1. Ce sunt cookie-urile</a>
                  <a className="block text-text-secondary hover:text-primary" href="#tipuri">2. Tipuri de cookie-uri</a>
                  <a className="block text-text-secondary hover:text-primary" href="#gestionare">3. Gestionarea cookie-urilor</a>
                  <a className="block text-text-secondary hover:text-primary" href="#contact">4. Contact</a>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <div className="rounded-2xl border border-background/20 bg-background/60 shadow-lg p-6 sm:p-8">
                <p className="text-sm text-text-secondary mb-6">Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}</p>

                <div className="prose prose-invert max-w-none prose-headings:text-text-primary prose-p:text-text-secondary">
                  <p>
                    Folosim cookie-uri și tehnologii similare pentru a oferi funcționalitate, pentru a analiza traficul
                    și pentru a personaliza conținutul. Poți controla preferințele tale de cookie-uri din setările
                    browserului sau prin instrumentele noastre dedicate (dacă sunt disponibile).
                  </p>

                  <h2 id="ce-sunt">1. Ce sunt cookie-urile</h2>
                  <p>
                    Cookie-urile sunt fișiere mici stocate pe dispozitivul tău atunci când vizitezi un website. Ele ajută
                    la recunoașterea dispozitivului și la reținerea preferințelor.
                  </p>

                  <h2 id="tipuri">2. Tipuri de cookie-uri pe care le folosim</h2>
                  <ul>
                    <li>Cookie-uri strict necesare: esențiale pentru funcționarea Platformei.</li>
                    <li>Cookie-uri de performanță și analiză: ne ajută să înțelegem cum este utilizată Platforma.</li>
                    <li>Cookie-uri de funcționalitate: rețin preferințe precum limbă sau setări de afișare.</li>
                    <li>Cookie-uri de marketing: utilizate pentru conținut și oferte relevante (doar cu consimțământ).</li>
                  </ul>

                  <h2 id="gestionare">3. Gestionarea cookie-urilor</h2>
                  <p>
                    Poți bloca sau șterge cookie-urile din setările browserului. Reține că anumite părți ale Platformei
                    pot să nu funcționeze corect dacă dezactivezi anumite cookie-uri.
                  </p>

                  <h2 id="contact">4. Contact</h2>
                  <p>
                    Pentru detalii despre cookie-uri, ne poți scrie la
                    <a href="mailto:contact@matecusucces.ro" className="text-primary"> contact@matecusucces.ro</a>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CookiesPolicy;
