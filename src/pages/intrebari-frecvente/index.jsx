import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet';
import PageHero from '@/components/ui/PageHero';

const faqs = [
  {
    category: 'Cont și autentificare',
    items: [
      {
        q: 'Cum îmi creez un cont pe Mate cu Succes?',
        a: 'Apasă pe Autentificare din meniu și alege Creează cont. Completează numele, emailul și o parolă. Vei primi un email de confirmare pentru activare.'
      },
      {
        q: 'Am uitat parola. Ce fac?',
        a: 'Mergi la Autentificare și apasă pe Ai uitat parola?. Introdu adresa de email și urmează pașii din mesajul primit pentru a o reseta.'
      }
    ]
  },
  {
    category: 'Plăți și abonamente',
    items: [
      {
        q: 'Ce metode de plată acceptați?',
        a: 'Plățile sunt procesate securizat prin Netopia. Acceptăm carduri bancare Visa și Mastercard.'
      },
      {
        q: 'Pot anula sau modifica abonamentul?',
        a: 'Da. Din Contul meu > Abonament poți vedea statusul, factura și poți anula oricând. Accesul rămâne activ până la finalul perioadei plătite.'
      }
    ]
  },
  {
    category: 'Cursuri și conținut',
    items: [
      {
        q: 'Ce clase și programe acoperiți?',
        a: 'Acoperim clasele 5–12, inclusiv pregătire pentru Evaluare Națională și Bacalaureat, plus programe premium cu mentorat.'
      },
      {
        q: 'Pot descărca materialele?',
        a: 'Resursele gratuite pot fi descărcate acolo unde este marcat. Materialele premium sunt disponibile în platformă, accesibile de pe orice dispozitiv.'
      }
    ]
  },
  {
    category: 'Probleme tehnice',
    items: [
      {
        q: 'Pagina nu se încarcă sau primesc o eroare.',
        a: 'Încearcă o reîmprospătare hard (Ctrl+F5) sau deschide într-o fereastră privată. Dacă problema persistă, contactează-ne la contact@matecusucces.ro.'
      },
      {
        q: 'Videourile se încarcă greu.',
        a: 'Verifică conexiunea la internet. Încearcă să reduci calitatea video sau să închizi alte aplicații care consumă lățime de bandă.'
      }
    ]
  }
];

function FAQItem({ q, a, defaultOpen = false }) {
  return (
    <details className="group rounded-xl border border-border/60 bg-card p-4 sm:p-5 open:bg-card/90 open:border-primary/40 transition-all" open={defaultOpen}>
      <summary className="cursor-pointer list-none select-none">
        <div className="flex items-start gap-3">
          <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary">?</span>
          <h4 className="font-heading text-base sm:text-lg text-text-primary group-open:text-primary">{q}</h4>
        </div>
      </summary>
      <div className="mt-3 pl-8 text-sm sm:text-base text-text-secondary">
        {a}
      </div>
    </details>
  );
}

export default function FAQPage() {
  const items = useMemo(() => faqs, []);

  return (
    <>
      <Helmet>
        <title>Întrebări Frecvente | Mate cu Succes</title>
        <meta name="description" content="Răspunsuri la cele mai frecvente întrebări despre cont, plăți, cursuri și suport tehnic în platforma Mate cu Succes." />
        <link rel="canonical" href="https://matecusucces.ro/intrebari-frecvente" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.flatMap(cat => cat.items.map(it => ({
              '@type': 'Question',
              name: it.q,
              acceptedAnswer: { '@type': 'Answer', text: it.a }
            })))
          })}
        </script>
      </Helmet>

      <PageHero
        title="Întrebări Frecvente"
        subtitle="Găsește rapid răspunsuri la cele mai comune întrebări despre platformă, cont și abonamente."
      />

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
          {/* Sidebar categories */}
          <aside className="hidden lg:block sticky top-20 h-fit space-y-2">
            {items.map((block, idx) => (
              <a key={idx} href={`#cat-${idx}`} className="block rounded-lg border border-border/60 bg-background px-4 py-2 text-sm text-text-secondary hover:text-primary hover:border-primary/40 transition-colors">
                {block.category}
              </a>
            ))}
          </aside>

          {/* Content */}
          <div className="space-y-10">
            {items.map((block, idx) => (
              <section key={idx} id={`cat-${idx}`} className="scroll-mt-24">
                <h3 className="mb-4 font-heading text-xl text-text-primary">{block.category}</h3>
                <div className="space-y-3">
                  {block.items.map((it, i) => (
                    <FAQItem key={i} q={it.q} a={it.a} defaultOpen={i === 0 && idx === 0} />
                  ))}
                </div>
              </section>
            ))}

            {/* Still need help */}
            <div className="mt-6 rounded-xl border border-border/60 bg-card p-5">
              <h4 className="font-heading text-lg text-text-primary mb-1">Încă ai întrebări?</h4>
              <p className="text-text-secondary">Scrie-ne pe <a className="text-primary underline" href="/contact">pagina de contact</a> și îți răspundem în cel mai scurt timp.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
