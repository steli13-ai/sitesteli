import React, { useEffect, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import HeroSection from './components/HeroSection';
import LazyOnVisible from '@/components/LazyOnVisible';
const GradePathwayCards = React.lazy(() => import('./components/GradePathwayCards'));
const FeaturedCourses = React.lazy(() => import('./components/FeaturedCourses'));
const TestimonialCarousel = React.lazy(() => import('./components/TestimonialCarousel'));
const StatsSection = React.lazy(() => import('./components/StatsSection'));
const CTASection = React.lazy(() => import('./components/CTASection'));
import { LOGO_URL } from '@/config/publicLinks';
import StructuredData from '@/components/StructuredData';
import { buildOrganization, buildWebSite, buildCourse } from '@/utils/structuredData';

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Mate cu Succes - Învață matematică fără frică | Platformă educațională #1 România</title>
        <meta 
          name="description" 
          content="Transformă anxietatea matematică în încredere cu Mate cu Succes. Lecții pas cu pas, exerciții interactive și sprijin constant pentru clasele 5-12. Peste 50,000 elevi mulțumiți, 95% rata de succes la examene." 
        />
        <meta name="keywords" content="matematică, educație, România, elevi, examene, BAC, Evaluare Națională, lecții online, exerciții matematică" />
        <meta property="og:title" content="Mate cu Succes - Învață matematică fără frică" />
        <meta property="og:description" content="Platformă educațională #1 în România pentru matematică. Transformă frica în încredere cu lecții interactive și sprijin constant." />
        <meta property="og:type" content="website" />
  <meta property="og:url" content="https://matecusucces.ro/" />
  <link rel="canonical" href="https://matecusucces.ro/" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="ro" />
        <meta name="geo.region" content="RO" />
        <meta name="geo.country" content="Romania" />
        <StructuredData data={buildOrganization({})} />
        <StructuredData data={buildWebSite({})} />
        <StructuredData data={buildCourse({
          name: 'Matematică Bacalaureat – Pregătire intensivă',
          description: 'Program structurat pentru pregătirea examenului de Bacalaureat la matematică: simulări, planuri de studiu și feedback.',
        })} />
      </Helmet>
      <div className="min-h-screen bg-background relative">
        {/* Pastel background elements */}
        <div className="pastel-shapes">
          <div className="floating-shape w-20 h-20 bg-blue-100 top-32 left-16"></div>
          <div className="floating-shape w-16 h-16 bg-pink-100 top-64 right-24"></div>
          <div className="floating-star top-80 left-1/3">
            <svg className="w-12 h-12 text-yellow-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
            </svg>
          </div>
          <div className="floating-cube w-18 h-18 bg-green-100 top-96 right-1/4 rounded-lg"></div>
          <div className="floating-shape w-14 h-14 bg-purple-100 top-48 right-1/3"></div>
          <div className="floating-cube w-10 h-10 bg-indigo-100 top-40 left-1/4 rounded"></div>
          <div className="floating-star top-20 right-16">
            <svg className="w-8 h-8 text-pink-200" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
            </svg>
          </div>
          <div className="floating-shape w-12 h-12 bg-teal-100 top-72 left-20"></div>
        </div>

  {/* Header provided by DefaultLayout */}

        {/* Main Content */}
        <main className="pt-16">
          {/* Hero Section */}
          <HeroSection />

          {/* Grade Pathway Cards */}
          <LazyOnVisible>
            <Suspense fallback={null}>
              <GradePathwayCards />
            </Suspense>
          </LazyOnVisible>

          {/* Featured Courses */}
          <LazyOnVisible>
            <Suspense fallback={null}>
              <FeaturedCourses />
            </Suspense>
          </LazyOnVisible>

          {/* Stats Section */}
          <LazyOnVisible>
            <Suspense fallback={null}>
              <StatsSection />
            </Suspense>
          </LazyOnVisible>

          {/* Testimonial Carousel */}
          <LazyOnVisible>
            <Suspense fallback={null}>
              <TestimonialCarousel />
            </Suspense>
          </LazyOnVisible>

          {/* Final CTA Section */}
          <LazyOnVisible>
            <Suspense fallback={null}>
              <CTASection />
            </Suspense>
          </LazyOnVisible>
        </main>

        {/* Footer */}
        <footer className="bg-foreground text-background py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8">
                {/* Brand Column */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={LOGO_URL}
                      alt="Mate cu succes logo"
                      className="w-10 h-10 rounded-xl object-cover warm-shadow"
                      width="40"
                      height="40"
                      decoding="async"
                      loading="lazy"
                    />
                    <div className="font-headline font-bold text-xl text-primary">
                      Mate cu <span className="text-secondary">Succes</span>
                    </div>
                  </div>
                  <p className="text-background/80 font-body">
                    Transformăm frica de matematică în încredere și succes pentru elevii din România.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-background/60 hover:text-primary transition-colors">
                      <span className="sr-only">Facebook</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-background/60 hover:text-secondary transition-colors">
                      <span className="sr-only">Instagram</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C3.85 14.81 3.85 12.939 4.126 11.987c.276-.952.952-1.628 1.904-1.904.952-.276 1.823-.276 2.775 0 .952.276 1.628.952 1.904 1.904.276.952.276 1.823 0 2.775-.276.952-.952 1.628-1.904 1.904-.476.138-.952.207-1.428.207-.476 0-.952-.069-1.428-.207z"/>
                      </svg>
                    </a>
                    <a href="#" className="text-background/60 hover:text-accent transition-colors">
                      <span className="sr-only">YouTube</span>
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-4">Navigare Rapidă</h3>
                  <ul className="space-y-2 font-body">
                    <li><a href="/homepage" className="text-background/80 hover:text-primary transition-colors">Acasă</a></li>
                    <li><a href="/free-resources" className="text-background/80 hover:text-primary transition-colors">Resurse Gratuite</a></li>
                    <li><a href="/exam-preparation" className="text-background/80 hover:text-primary transition-colors">Pregătire Examene</a></li>
                    <li><a href="/course-catalog" className="text-background/80 hover:text-primary transition-colors">Catalog Cursuri</a></li>
                    <li><a href="/parent-resources" className="text-background/80 hover:text-primary transition-colors">Resurse Părinți</a></li>
                  </ul>
                </div>

                {/* Support */}
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-4">Suport</h3>
                  <ul className="space-y-2 font-body">
                    <li><Link to="/centru-de-ajutor" className="text-background/80 hover:text-primary transition-colors">Centru de Ajutor</Link></li>
                    <li><Link to="/intrebari-frecvente" className="text-background/80 hover:text-primary transition-colors">Întrebări Frecvente</Link></li>
                    <li><a href="/contact" className="text-background/80 hover:text-primary transition-colors">Contact</a></li>
                    <li><Link to="/feedback" className="text-background/80 hover:text-primary transition-colors">Feedback</Link></li>
                    <li><Link to="/raporteaza-o-problema" className="text-background/80 hover:text-primary transition-colors">Raportează o Problemă</Link></li>
                  </ul>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-headline font-semibold text-lg mb-4">Contact</h3>
                  <div className="space-y-3 font-body">
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                      <span className="text-background/80">contact@matecusucces.ro</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                      </svg>
                      <span className="text-background/80">București, România</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                      </svg>
                      <span className="text-background/80">0771080523</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p className="text-background/60 font-body text-sm">
                  © {new Date()?.getFullYear()} Mate cu Succes. Toate drepturile rezervate.
                </p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                  <Link to="/termeni-si-conditii" className="text-background/60 hover:text-primary transition-colors text-sm">
                    Termeni și Condiții
                  </Link>
                  <Link to="/politica-confidentialitate" className="text-background/60 hover:text-primary transition-colors text-sm">
                    Politica de Confidențialitate
                  </Link>
                  <Link to="/cookies" className="text-background/60 hover:text-primary transition-colors text-sm">
                    Cookies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Homepage;