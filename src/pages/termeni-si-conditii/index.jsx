import React from 'react';
import { Helmet } from 'react-helmet';
import PageHero from '@/components/ui/PageHero';

const TermsAndConditions = () => {
  return (
    <div className="min-h-[70vh] bg-background">
      <Helmet>
        <title>Termeni și Condiții | Mate cu Succes</title>
        <meta name="description" content="Citește termenii și condițiile de utilizare ale platformei Mate cu Succes." />
      </Helmet>

      <PageHero
        title="Termeni și Condiții"
        subtitle="Regulile de utilizare ale platformei Mate cu Succes. Citește cu atenție înainte de a utiliza serviciile noastre."
      />

      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* TOC */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-24 rounded-xl border border-background/20 bg-background/60 p-4">
                <p className="text-sm font-medium text-text-primary mb-3">Cuprins</p>
                <nav className="space-y-2 text-sm">
                  <a className="block text-text-secondary hover:text-primary" href="#definitii">1. Definiții</a>
                  <a className="block text-text-secondary hover:text-primary" href="#acces">2. Acces și utilizare</a>
                  <a className="block text-text-secondary hover:text-primary" href="#drepturi">3. Drepturi de proprietate</a>
                  <a className="block text-text-secondary hover:text-primary" href="#plati">4. Plăți și abonamente</a>
                  <a className="block text-text-secondary hover:text-primary" href="#limitare">5. Limitarea răspunderii</a>
                  <a className="block text-text-secondary hover:text-primary" href="#suspendare">6. Suspendare/încetare</a>
                  <a className="block text-text-secondary hover:text-primary" href="#modificari">7. Modificări</a>
                  <a className="block text-text-secondary hover:text-primary" href="#contact">8. Contact</a>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <div className="rounded-2xl border border-background/20 bg-background/60 shadow-lg p-6 sm:p-8">
                <p className="text-sm text-text-secondary mb-6">Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}</p>

                <div className="prose prose-invert max-w-none prose-headings:text-text-primary prose-p:text-text-secondary">
                  <p>
                    Prin accesarea și utilizarea website-ului Mate cu Succes ("Platforma"), sunteți de acord cu
                    termenii și condițiile de mai jos. Vă rugăm să le citiți cu atenție. Dacă nu sunteți de acord,
                    vă rugăm să nu utilizați Platforma.
                  </p>

                  <h2 id="definitii">1. Definiții</h2>
                  <p>
                    "Platforma" – website-ul și aplicațiile Mate cu Succes; "Utilizator" – orice persoană care accesează
                    sau folosește Platforma; "Conținut" – materialele publicate (texte, imagini, video, fișiere, cursuri),
                    indiferent de format.
                  </p>

                  <h2 id="acces">2. Acces și utilizare</h2>
                  <ul>
                    <li>Accesul la anumite resurse poate necesita înregistrare și autentificare.</li>
                    <li>Utilizatorul este responsabil pentru confidențialitatea credențialelor de acces.</li>
                    <li>Este interzisă utilizarea abuzivă, reproducerea sau distribuirea neautorizată a conținutului.</li>
                  </ul>

                  <h2 id="drepturi">3. Drepturi de proprietate intelectuală</h2>
                  <p>
                    Toate materialele de pe Platformă sunt protejate de drepturile de autor și alte drepturi de
                    proprietate intelectuală. Reproducerea este permisă numai cu acordul scris al Mate cu Succes.
                  </p>

                  <h2 id="plati">4. Plăți și abonamente</h2>
                  <p>
                    Pentru programele premium, plata se realizează prin procesatori autorizați. Sumele achitate nu sunt
                    rambursabile decât în situațiile prevăzute expres de lege sau de politica noastră comercială.
                  </p>

                  <h2 id="limitare">5. Limitarea răspunderii</h2>
                  <p>
                    Platforma este furnizată „ca atare”. Depunem eforturi rezonabile pentru acuratețe și disponibilitate,
                    însă nu garantăm lipsa erorilor sau funcționarea neîntreruptă.
                  </p>

                  <h2 id="suspendare">6. Suspendarea sau încetarea accesului</h2>
                  <p>
                    Ne rezervăm dreptul de a suspenda sau înceta accesul unui cont care încalcă acești termeni sau
                    legislația aplicabilă, cu sau fără notificare prealabilă.
                  </p>

                  <h2 id="modificari">7. Modificarea termenilor</h2>
                  <p>
                    Putem actualiza periodic acești termeni. Versiunea curentă va fi disponibilă pe această pagină,
                    împreună cu data ultimei actualizări.
                  </p>

                  <h2 id="contact">8. Contact</h2>
                  <p>
                    Pentru întrebări legate de acești termeni, ne puteți contacta la adresa
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

export default TermsAndConditions;
