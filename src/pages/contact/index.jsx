import React from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import ContactForm from './components/ContactForm';
import PageHero from '@/components/ui/PageHero';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact | Mate cu Succes</title>
        <meta 
          name="description" 
          content="Ia legătura cu echipa Mate cu Succes. Întrebări, feedback sau suport — răspundem rapid și cu drag."
        />
        <meta property="og:title" content="Contact | Mate cu Succes" />
        <meta property="og:description" content="Scrie-ne pentru suport și informații despre platforma Mate cu Succes." />
        <link rel="canonical" href="https://matecusucces.ro/contact" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <PageHero title="Contact" subtitle="Suntem aici pentru tine. Scrie-ne și îți vom răspunde în cel mult 24 de ore." />

        <section className="py-12 px-4 lg:px-8">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-7">
              <ContactForm onSubmitSuccess={() => { /* could show toast via Toaster in layout */ }} />
            </div>

            {/* Contact details */}
            <aside className="lg:col-span-5">
              <div className="rounded-2xl border border-background/20 bg-background/60 shadow-lg p-6">
                <h2 className="text-xl font-heading font-semibold text-text-primary mb-4">Detalii de contact</h2>
                <ul className="space-y-4 text-text-secondary">
                  <li className="flex items-start gap-3">
                    <Icon name="Mail" size={18} className="text-primary mt-1" />
                    <div>
                      <p className="text-sm">Email</p>
                      <a href="mailto:contact@matecusucces.ro" className="text-text-primary hover:text-primary">contact@matecusucces.ro</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Phone" size={18} className="text-primary mt-1" />
                    <div>
                      <p className="text-sm">Telefon</p>
                      <a href="tel:+40771080523" className="text-text-primary hover:text-primary">0771080523</a>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Icon name="Clock" size={18} className="text-primary mt-1" />
                    <div>
                      <p className="text-sm">Program</p>
                      <p className="text-text-primary">Luni–Vineri, 09:00–18:00</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-background/20">
                  <p className="text-sm font-medium text-text-primary mb-3">Linkuri utile</p>
                  <ul className="space-y-2 text-sm">
                    <li><a href="/free-resources" className="hover:text-primary">Resurse gratuite</a></li>
                    <li><a href="/parent-resources" className="hover:text-primary">Resurse părinți</a></li>
                    <li><a href="/termeni-si-conditii" className="hover:text-primary">Termeni și condiții</a></li>
                    <li><a href="/politica-confidentialitate" className="hover:text-primary">Politica de confidențialitate</a></li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactPage;