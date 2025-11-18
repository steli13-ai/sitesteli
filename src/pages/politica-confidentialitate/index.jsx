import React from 'react';
import { Helmet } from 'react-helmet';
import PageHero from '@/components/ui/PageHero';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-[70vh] bg-background">
      <Helmet>
        <title>Politica de Confidențialitate | Mate cu Succes</title>
        <meta name="description" content="Află cum colectăm, folosim și protejăm datele tale personale pe Mate cu Succes." />
      </Helmet>

      <PageHero
        title="Politica de Confidențialitate"
        subtitle="Cum colectăm, folosim și protejăm datele tale în conformitate cu GDPR."
      />

      <section className="relative">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* TOC */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="sticky top-24 rounded-xl border border-background/20 bg-background/60 p-4">
                <p className="text-sm font-medium text-text-primary mb-3">Cuprins</p>
                <nav className="space-y-2 text-sm">
                  <a className="block text-text-secondary hover:text-primary" href="#date">1. Ce date colectăm</a>
                  <a className="block text-text-secondary hover:text-primary" href="#scopuri">2. De ce procesăm datele</a>
                  <a className="block text-text-secondary hover:text-primary" href="#temeiuri">3. Temeiuri legale</a>
                  <a className="block text-text-secondary hover:text-primary" href="#securitate">4. Stocare și securitate</a>
                  <a className="block text-text-secondary hover:text-primary" href="#drepturi">5. Drepturile tale</a>
                  <a className="block text-text-secondary hover:text-primary" href="#destinatari">6. Destinatari și transferuri</a>
                  <a className="block text-text-secondary hover:text-primary" href="#contact">7. Contact</a>
                </nav>
              </div>
            </aside>

            {/* Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <div className="rounded-2xl border border-background/20 bg-background/60 shadow-lg p-6 sm:p-8">
                <p className="text-sm text-text-secondary mb-6">Ultima actualizare: {new Date().toLocaleDateString('ro-RO')}</p>

                <div className="prose prose-invert max-w-none prose-headings:text-text-primary prose-p:text-text-secondary">
                  <p>
                    Respectăm confidențialitatea datelor tale și le procesăm în conformitate cu Regulamentul (UE)
                    2016/679 (GDPR) și legislația națională aplicabilă. Această politică explică ce date colectăm,
                    de ce, pe ce temei legal, și cum le protejăm.
                  </p>

                  <h2 id="date">1. Ce date colectăm</h2>
                  <ul>
                    <li>Date de identificare și contact (de ex. nume, e-mail) atunci când creezi un cont sau ne contactezi.</li>
                    <li>Date de utilizare (pagini vizitate, preferințe, interacțiuni) pentru îmbunătățirea experienței.</li>
                    <li>Date de plată procesate securizat prin furnizori terți autorizați. Nu stocăm detalii complete ale cardului.</li>
                  </ul>

                  <h2 id="scopuri">2. De ce procesăm datele</h2>
                  <ul>
                    <li>Furnizarea serviciilor educaționale și administrarea contului tău.</li>
                    <li>Suport clienți și comunicări legate de serviciu.</li>
                    <li>Îmbunătățirea produsului, securitate și prevenirea fraudei.</li>
                    <li>Marketing doar cu consimțământul tău explicit, cu opțiune de dezabonare oricând.</li>
                  </ul>

                  <h2 id="temeiuri">3. Temeiuri legale</h2>
                  <p>
                    Executarea contractului, obligații legale, interes legitim și consimțământ acolo unde este necesar.
                  </p>

                  <h2 id="securitate">4. Stocare și securitate</h2>
                  <p>
                    Implementăm măsuri tehnice și organizatorice adecvate (criptare, control acces, audit) pentru a
                    proteja datele. Păstrăm datele doar atât timp cât este necesar pentru scopurile pentru care au fost
                    colectate sau conform obligațiilor legale.
                  </p>

                  <h2 id="drepturi">5. Drepturile tale</h2>
                  <ul>
                    <li>Dreptul de acces, rectificare, ștergere, restricționare, portabilitate și opoziție.</li>
                    <li>Retragerea consimțământului în orice moment, fără a afecta legalitatea prelucrării anterioare.</li>
                    <li>Plângere la ANSPDCP dacă consideri că drepturile ți-au fost încălcate.</li>
                  </ul>

                  <h2 id="destinatari">6. Destinatari și transferuri</h2>
                  <p>
                    Putem partaja date cu furnizori care ne ajută să operăm Platforma (hosting, procesare plăți, e-mail),
                    conform acordurilor de prelucrare. Nu vindem datele tale. Transferurile în afara SEE se fac cu
                    garanții adecvate (clauze contractuale standard).
                  </p>

                  <h2 id="contact">7. Contact</h2>
                  <p>
                    Pentru întrebări sau cereri privind datele personale, scrie-ne la
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

export default PrivacyPolicy;
