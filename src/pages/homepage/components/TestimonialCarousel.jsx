import React, { useState, useEffect } from 'react';
import { MotionWrapper } from '@/lib/motionLazy';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
  {
    id: 1,
    name: 'Ana-Maria Gheorghe',
    role: 'Elevă clasa a 9-a',
    school: 'Colegiul Național "Mihai Eminescu"',
    avatar: "https://images.unsplash.com/photo-1727446847385-f529dfab462d",
    avatarAlt: 'Teenage girl with long brown hair smiling confidently in school uniform',
    rating: 5,
    beforeGrade: 6.5,
    afterGrade: 9.2,
    examScore: 'Evaluare Națională: 9.45',
  quote: `Înainte de Mate cu succes, matematica era coșmarul meu. Acum înțeleg fiecare pas și chiar îmi place să rezolv probleme! Profesorii explică atât de clar încât pare simplu.`,
    achievement: 'Creștere cu 2.7 puncte în 6 luni',
    courseCompleted: 'Algebră pentru Gimnaziu',
    timeframe: '6 luni',
    videoThumbnail: "https://images.unsplash.com/photo-1630825618310-ce2e1f467389",
    videoThumbnailAlt: 'Student studying mathematics with books and calculator on desk'
  },
  {
    id: 2,
    name: 'Mihai Popescu',
    role: 'Elev clasa a 12-a',
    school: 'Liceul Teoretic "Ion Creangă"',
    avatar: "https://images.unsplash.com/photo-1686144271530-2c77da0887ad",
    avatarAlt: 'Young man with short dark hair wearing casual shirt smiling at camera',
    rating: 5,
    beforeGrade: 7.8,
    afterGrade: 9.6,
    examScore: 'BAC Matematică: 9.75',
  quote: `Grație Mate cu succes am reușit să iau 9.75 la BAC! Simulările și explicațiile pas cu pas m-au pregătit perfect. Acum studiez informatica la Politehnica.`,
    achievement: 'Admis la Politehnica București',
    courseCompleted: 'Pregătire BAC Matematică',
    timeframe: '8 luni',
    videoThumbnail: "https://images.unsplash.com/photo-1665567031505-49c536110178",
    videoThumbnailAlt: 'University students celebrating graduation with caps thrown in air'
  },
  {
    id: 3,
    name: 'Elena Radu',
    role: 'Mamă',
    school: 'Părintele Sofiei (clasa a 7-a)',
    avatar: "https://images.unsplash.com/photo-1648466982925-65dac4ed0814",
    avatarAlt: 'Middle-aged woman with blonde hair smiling warmly in professional attire',
    rating: 5,
    beforeGrade: 'Stres și plâns la teme',
    afterGrade: 'Încredere și independență',
    examScore: 'Atmosfera liniștită acasă',
  quote: `Sofia plângea în fiecare seară la matematică. Acum își face temele singură și chiar mă întreabă probleme în plus! Mate cu succes ne-a salvat nervii.`,
    achievement: 'Transformare completă a atitudinii',
    courseCompleted: 'Matematică pentru Clasa a 7-a',
    timeframe: '4 luni',
    videoThumbnail: "https://images.unsplash.com/photo-1719559519182-698f9bfc4e2f",
    videoThumbnailAlt: 'Happy mother and daughter studying together at home with books and laptop'
  },
  {
    id: 4,
    name: 'David Ionescu',
    role: 'Elev clasa a 10-a',
    school: 'Colegiul Național "Gheorghe Lazăr"',
    avatar: "https://images.unsplash.com/flagged/photo-1556845694-824a68654417",
    avatarAlt: 'Teenage boy with short brown hair wearing school uniform smiling confidently',
    rating: 5,
    beforeGrade: 5.5,
    afterGrade: 8.9,
    examScore: 'Olimpiada Județeană: Locul 3',
  quote: `Eram pe punctul să renunț la matematică. Mate cu succes mi-a arătat că pot să înțeleg orice dacă am explicația potrivită. Acum particip la olimpiade!`,
    achievement: 'De la corigent la olimpiad',
    courseCompleted: 'Funcții și Ecuații Avansate',
    timeframe: '10 luni',
    videoThumbnail: "https://images.unsplash.com/photo-1596628260844-1d6ea5ef15f8",
    videoThumbnailAlt: 'Student receiving award at mathematics competition ceremony'
  }];


  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
      prevIndex === testimonials?.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials?.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? testimonials?.length - 1 : currentIndex - 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === testimonials?.length - 1 ? 0 : currentIndex + 1);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentTestimonial = testimonials?.[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <MotionWrapper fallback={<div className="text-center mb-16" />}> {(mod) => (
          <mod.motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-6">
              Povești de <span className="text-primary">succes</span> reale
            </h2>
            <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto leading-relaxed">
              Descoperă cum Mate cu succes a transformat viețile elevilor și familiilor din toată România.
            </p>
          </mod.motion.div>
          )}
          </MotionWrapper>

          {/* Main Testimonial Display */}
          <div className="relative">
            <MotionWrapper fallback={<div />}> {(mod) => (
              <mod.AnimatePresence mode="wait">
              <mod.motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-card rounded-3xl p-8 md:p-12 warm-shadow-lg">

                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Left Content */}
                  <div className="space-y-6">
                    {/* Quote */}
                    <div className="relative">
                      <Icon
                        name="Quote"
                        size={48}
                        className="text-primary/20 absolute -top-4 -left-4" />

                      <blockquote className="text-xl md:text-2xl font-body leading-relaxed text-foreground relative z-10">
                        "{currentTestimonial?.quote}"
                      </blockquote>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center space-x-1">
                      {[...Array(5)]?.map((_, i) =>
                      <Icon
                        key={i}
                        name="Star"
                        size={20}
                        className="text-warning fill-current" />

                      )}
                      <span className="ml-2 text-text-secondary font-medium">
                        {currentTestimonial?.rating}/5
                      </span>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center space-x-4">
                      <img
                        src={currentTestimonial?.avatar}
                        alt={currentTestimonial?.avatarAlt}
                        className="w-16 h-16 rounded-full object-cover warm-shadow"
                        width="64"
                        height="64"
                        decoding="async"
                        loading="lazy" />

                      <div>
                        <h4 className="text-xl font-headline font-bold text-foreground">
                          {currentTestimonial?.name}
                        </h4>
                        <p className="text-text-secondary font-medium">
                          {currentTestimonial?.role}
                        </p>
                        <p className="text-sm text-text-secondary">
                          {currentTestimonial?.school}
                        </p>
                      </div>
                    </div>

                    {/* Achievement Badges */}
                    <div className="flex flex-wrap gap-3">
                      <div className="bg-success/20 text-success-foreground px-4 py-2 rounded-full text-sm font-medium">
                        {currentTestimonial?.achievement}
                      </div>
                      <div className="bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium">
                        {currentTestimonial?.timeframe}
                      </div>
                    </div>
                  </div>

                  {/* Right Content - Stats & Visual */}
                  <div className="space-y-6">
                    {/* Video Thumbnail */}
                    <div className="relative rounded-2xl overflow-hidden warm-shadow group cursor-pointer">
                      <img
                        src={currentTestimonial?.videoThumbnail}
                        alt={currentTestimonial?.videoThumbnailAlt}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                        decoding="async"
                        loading="lazy" />

                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center warm-shadow group-hover:scale-110 transition-transform duration-300">
                          <Icon name="Play" size={24} className="text-primary ml-1" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        Poveste video
                      </div>
                    </div>

                    {/* Performance Stats */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-xl p-4 text-center">
                        <p className="text-sm text-text-secondary mb-1">Înainte</p>
                        <p className="text-2xl font-bold text-secondary">
                          {typeof currentTestimonial?.beforeGrade === 'number' ?
                          currentTestimonial?.beforeGrade :
                          '😰'
                          }
                        </p>
                        <p className="text-xs text-text-secondary">
                          {typeof currentTestimonial?.beforeGrade === 'string' ?
                          currentTestimonial?.beforeGrade :
                          'Medie'
                          }
                        </p>
                      </div>
                      <div className="bg-success/10 rounded-xl p-4 text-center">
                        <p className="text-sm text-text-secondary mb-1">După</p>
                        <p className="text-2xl font-bold text-success">
                          {typeof currentTestimonial?.afterGrade === 'number' ?
                          currentTestimonial?.afterGrade :
                          '😊'
                          }
                        </p>
                        <p className="text-xs text-text-secondary">
                          {typeof currentTestimonial?.afterGrade === 'string' ?
                          currentTestimonial?.afterGrade :
                          'Medie'
                          }
                        </p>
                      </div>
                    </div>

                    {/* Final Achievement */}
                    <div className="bg-warning/10 rounded-xl p-4 text-center">
                      <p className="text-sm text-text-secondary mb-2">Rezultat Final</p>
                      <p className="text-lg font-bold text-warning">
                        {currentTestimonial?.examScore}
                      </p>
                    </div>
                  </div>
                </div>
              </mod.motion.div>
              </mod.AnimatePresence>
            )}
            </MotionWrapper>

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card rounded-full flex items-center justify-center warm-shadow hover:warm-shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial">

              <Icon name="ChevronLeft" size={24} className="text-primary" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-card rounded-full flex items-center justify-center warm-shadow hover:warm-shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial">

              <Icon name="ChevronRight" size={24} className="text-primary" />
            </button>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials?.map((_, index) =>
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ?
              'bg-primary scale-125' : 'bg-muted hover:bg-primary/50'}`
              }
              aria-label={`Go to testimonial ${index + 1}`} />

            )}
          </div>

          {/* Bottom CTA */}
          <MotionWrapper fallback={<div className="text-center mt-16" />}> {(mod) => (
          <mod.motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16">

            <div className="bg-card rounded-2xl p-8 warm-shadow">
              <h3 className="text-2xl font-headline font-bold text-foreground mb-4">
                Vrei să fii următoarea poveste de succes?
              </h3>
              <p className="text-text-secondary font-body mb-6 max-w-2xl mx-auto">
                Alătură-te celor peste 50,000 de elevi care și-au transformat relația cu matematica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  variant="default"
                  size="lg"
                  className="bg-warning text-warning-foreground hover:bg-warning/90 font-cta font-semibold"
                  iconName="Rocket"
                  iconPosition="right"
                >
                  <Link to="/free-resources">Începe Gratuit Acum</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-cta"
                  iconName="MessageCircle"
                  iconPosition="left"
                >
                  <Link to="/parent-resources">Citește Mai Multe Povești</Link>
                </Button>
              </div>
            </div>
          </mod.motion.div>
          )}
          </MotionWrapper>
        </div>
      </div>
    </section>);

};

export default TestimonialCarousel;