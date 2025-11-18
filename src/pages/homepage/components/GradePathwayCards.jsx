import React from 'react';
import { Link } from 'react-router-dom';
import { MotionWrapper } from '@/lib/motionLazy';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { homepagePremiumPrograms } from '../../../content/premiumPrograms';
import { triggerConfetti } from '@/utils/confetti';

const GradePathwayCards = () => {
  // Map canonical premium programs to the card props used on the homepage
  const colorTokens = ['primary', 'secondary', 'warning'];
  const gradePathways = homepagePremiumPrograms.map((p, idx) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    description: p.description,
    color: colorTokens[idx % colorTokens.length],
    bgGradient: `from-${colorTokens[idx % colorTokens.length]}/10 to-${colorTokens[idx % colorTokens.length]}/5`,
    borderColor: `border-${colorTokens[idx % colorTokens.length]}/20`,
    icon: idx === 0 ? 'Target' : idx === 1 ? 'BookOpen' : 'Video',
    topics: (p.features || []).slice(0, 4),
    studentCount: undefined,
    successRate: undefined,
    difficulty: undefined,
    estimatedTime: p.duration || undefined,
    link: `/premium-programs?plan=${encodeURIComponent(p.type)}`,
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-background animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <MotionWrapper fallback={<div className="text-center mb-16" />}> {(mod) => (
          <mod.motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-6">
              Descoperă <span className="text-primary">varianta</span> potrivită pentru tine
            </h2>
            <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto leading-relaxed">
              Fiecare elev are un ritm propriu de învățare. Descoperă programul creat pentru nivelul și obiectivul tău.
            </p>
          </mod.motion.div>
          )}
          </MotionWrapper>

          {/* Grade Pathway Cards */}
          <MotionWrapper fallback={<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" />}> {(mod) => (
          <mod.motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
            {[...gradePathways,
              // New option card: counseling
              {
                id: 'counseling',
                title: 'De vorbit cu consilieri școlari sau cu studenți',
                subtitle: 'fără obligații',
                description: 'Discută 15 minute cu un consilier sau student mentor și află ce ți se potrivește.',
                color: 'success',
                bgGradient: 'from-success/10 to-success/5',
                borderColor: 'border-success/20',
                icon: 'BookOpen',
                topics: ['Orientare rapidă', 'Recomandări personalizate', 'Plan de învățare'],
                estimatedTime: '15 minute',
                link: '/consiliere'
              }
            ]?.map((pathway) => (
              <mod.motion.div
                key={pathway?.id}
                variants={cardVariants}
                whileHover={{ y: -8, rotate: -0.25, scale: 1.01, transition: { duration: 0.25 } }}
                className={`relative bg-gradient-to-br ${pathway?.bgGradient} border ${pathway?.borderColor} rounded-2xl p-8 warm-shadow hover:warm-shadow-lg transition-all duration-300 group focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`}
                tabIndex={0}
                role="group"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 bg-${pathway?.color} rounded-xl flex items-center justify-center warm-shadow group-hover:scale-110 transition-transform duration-300`}>
                    <Icon name={'BookOpen'} size={24} className="text-white" />
                  </div>
                  <div className={`bg-${pathway?.color}/20 text-${pathway?.color} px-3 py-1 rounded-full text-sm font-medium`}>
                    {pathway?.difficulty}
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 mb-8">
                  <div>
                    <h3 className="text-2xl font-headline font-bold text-foreground mb-2">
                      {pathway?.title}
                    </h3>
                    <p className={`text-${pathway?.color} font-medium text-lg`}>
                      {pathway?.subtitle}
                    </p>
                  </div>

                  <p className="text-text-secondary font-body leading-relaxed">
                    {pathway?.description}
                  </p>

                  {/* Topics */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-foreground">Subiecte principale:</p>
                    <div className="flex flex-wrap gap-2">
                      {pathway?.topics?.map((topic, index) => (
                        <span
                          key={index}
                          className="bg-muted text-text-secondary px-2 py-1 rounded-md text-xs font-medium"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Stats (optional) */}
                {pathway?.estimatedTime && (
                  <div className="grid grid-cols-1 gap-4 mb-6 p-4 bg-card/50 rounded-xl text-center">
                    <div>
                      <p className={`text-sm text-text-secondary`}>Durată recomandată</p>
                      <p className={`text-xl font-bold text-${pathway?.color}`}>{pathway?.estimatedTime}</p>
                    </div>
                  </div>
                )}

                {/* Time Estimate */}
                {pathway?.estimatedTime && (
                  <div className="flex items-center justify-between mb-6 text-sm text-text-secondary">
                    <div className="flex items-center space-x-2">
                      <Icon name="Clock" size={16} />
                      <span>Durată estimată: {pathway?.estimatedTime}</span>
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <Button
                  asChild
                  variant="default"
                  fullWidth
                  className={`bg-${pathway?.color} text-white hover:bg-${pathway?.color}/90 font-cta font-semibold group-hover:scale-105 transition-transform duration-300`}
                  iconName="ArrowRight"
                  iconPosition="right"
                >
                  <a href={pathway?.link}>Explorează Programul</a>
                </Button>

                {/* Decorative Elements removed as requested */}
              </mod.motion.div>
            ))}
          </mod.motion.div>
          )}
          </MotionWrapper>

          {/* Bottom CTA */}
          <MotionWrapper fallback={<div className="text-center mt-16" />}> {(mod) => (
          <mod.motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center mt-16"
            >
            <div className="bg-card rounded-2xl p-8 warm-shadow">
              <div className="grid md:grid-cols-3 gap-6 items-center">
                {/* Test paper image */}
                <div className="md:col-span-1">
                  <img
                    src="https://images.unsplash.com/photo-1518133835875-2ed246d1f7e2"
                    alt="Foaie de test cu creion și calcule matematice"
                    className="w-full h-40 object-cover rounded-xl shadow-sm"
                    loading="lazy"
                  />
                </div>
                <div className="md:col-span-2 text-left md:text-left">
                  <h3 className="text-2xl font-headline font-bold text-foreground mb-4">
                    Nu știi pe unde să începi?
                  </h3>
                  <p className="text-text-secondary font-body mb-6 max-w-2xl">
                    În 2 minute primești o recomandare personalizată. Simplu, rapid, fără obligații.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 md:justify-start">
                    <Button
                      asChild
                      variant="default"
                      size="lg"
                      className="bg-primary text-primary-foreground font-cta font-semibold"
                      iconName="Compass"
                      iconPosition="left"
                    >
                      <Link
                        to="/test-orientare"
                        onClick={() => {
                          // celebratory micro-interaction to delight the user starting the test
                          try { triggerConfetti({ particles: 70, spread: 80 }); } catch (_) {}
                        }}
                      >
                        Fă Testul de Orientare
                      </Link>
                    </Button>
                    <div className="flex items-center text-sm text-text-secondary">fără obligații</div>
                  </div>
                </div>
              </div>
            </div>
          </mod.motion.div>
          )}
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
};

export default GradePathwayCards;