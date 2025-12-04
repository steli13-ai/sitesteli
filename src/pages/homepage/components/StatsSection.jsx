import React, { useEffect, useMemo, useState } from 'react';
import { MotionWrapper } from '@/lib/motionLazy';
import Icon from '../../../components/AppIcon';

function useCountUp(target = 0, duration = 1200) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let raf;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min(1, (now - start) / duration);
      setValue(Math.floor(p * target));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

// Small component wrapper so hooks are not called inside MotionWrapper's
// render-prop function. This prevents the "Rendered more hooks" error.
function CountUpValue({ target = 0, duration = 1200, suffix = '' }) {
  const v = useCountUp(target, duration);
  return (
    <span>
      {v.toLocaleString()}
      <span>{suffix}</span>
    </span>
  );
}

const StatsSection = () => {
  const stats = [
    {
      id: 1,
      icon: 'Users',
      number: '50,000+',
      count: 50000,
      suffix: '+',
      label: 'Elevi Activi',
      description: 'Elevi din toată România învață cu noi zilnic',
      color: 'primary',
      bgGradient: 'from-primary/10 to-primary/5'
    },
    {
      id: 2,
      icon: 'Trophy',
      number: '95%',
      count: 95,
      suffix: '%',
      label: 'Rata de Succes',
      description: 'Dintre elevii noștri trec examenele cu note mari',
      color: 'warning',
      bgGradient: 'from-warning/10 to-warning/5'
    },
    {
      id: 3,
      icon: 'BookOpen',
      number: '1,200+',
      count: 1200,
      suffix: '+',
      label: 'Lecții Video',
      description: 'Ore de conținut educațional de calitate',
      color: 'secondary',
      bgGradient: 'from-secondary/10 to-secondary/5'
    },
    {
      id: 4,
      icon: 'Star',
      number: '4.9/5',
      label: 'Rating Mediu',
      description: 'Evaluarea părinților și elevilor noștri',
      color: 'accent',
      bgGradient: 'from-accent/10 to-accent/5'
    },
    {
      id: 5,
      icon: 'GraduationCap',
      number: '8',
      label: 'Ani Experiență',
      description: 'În educația matematică online din România',
      color: 'trust',
      bgGradient: 'from-trust/10 to-trust/5'
    },
    {
      id: 6,
      icon: 'Clock',
      number: '24/7',
      label: 'Suport Disponibil',
      description: 'Ajutor și răspunsuri oricând ai nevoie',
      color: 'success',
      bgGradient: 'from-success/10 to-success/5'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
          {/* Section Header (motion deferred) */}
          <MotionWrapper fallback={<div className="text-center mb-16" />}>
          {(mod) => (
            <mod.motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
            <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-6">
              Rezultate <span className="text-primary">reale</span> de la elevi ca tine
            </h2>
            <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto leading-relaxed">
              Cifrele noastre reflectă angajamentul față de excelența educațională și succesul fiecărui elev.
            </p>
            </mod.motion.div>
          )}
          </MotionWrapper>

          {/* Stats Grid */}
          <MotionWrapper fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" />}> {(mod) => (
          <mod.motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
            {stats?.map((stat, idx) => (
              <mod.motion.div
                key={stat?.id}
                variants={itemVariants}
                whileHover={{ 
                  y: -8, 
                  transition: { duration: 0.3 } 
                }}
                className={`relative bg-gradient-to-br ${stat?.bgGradient} border border-${stat?.color}/20 rounded-2xl p-8 warm-shadow hover:warm-shadow-lg transition-all duration-300 group`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-${stat?.color} rounded-xl flex items-center justify-center warm-shadow mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={stat?.icon} size={28} className="text-white" />
                </div>

                {/* Number */}
                <div className="mb-4">
                  <mod.motion.h3
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`text-4xl md:text-5xl font-headline font-bold text-${stat?.color} mb-2`}
                  >
                    {typeof stat?.count === 'number' ? (
                      <CountUpValue target={stat.count} duration={1200 + idx * 200} suffix={stat?.suffix || ''} />
                    ) : (
                      stat?.number
                    )}
                  </mod.motion.h3>
                  <h4 className="text-xl font-headline font-semibold text-foreground">
                    {stat?.label}
                  </h4>
                </div>

                {/* Description */}
                <p className="text-text-secondary font-body leading-relaxed">
                  {stat?.description}
                </p>

                {/* Decorative Element */}
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  <Icon name={stat?.icon} size={48} className={`text-${stat?.color}`} />
                </div>

                {/* Hover Effect Border */}
                <div className={`absolute inset-0 rounded-2xl border-2 border-${stat?.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
              </mod.motion.div>
            ))}
          </mod.motion.div>
          )}
          </MotionWrapper>

          {/* Testimonial mini-cards */}
          <MotionWrapper fallback={<div className="mt-16 grid md:grid-cols-3 gap-6" />}> {(mod) => (
          <mod.motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-16 grid md:grid-cols-3 gap-6"
            >
            {[
              { name: 'Ana-Maria', quote: 'Am trecut de la frică la încredere în 3 luni.' },
              { name: 'Mihai', quote: 'Simulările m-au ajutat să iau 9.75 la BAC.' },
              { name: 'Elena (mamă)', quote: 'Temele nu mai sunt o luptă zilnică.' },
            ].map((t, i) => (
              <div key={i} className="bg-card rounded-xl p-5 shadow-sm border border-border">
                <p className="text-foreground font-medium mb-2">“{t.quote}”</p>
                <p className="text-sm text-text-secondary">— {t.name}</p>
              </div>
            ))}
          </mod.motion.div>
          )}
          </MotionWrapper>

          {/* Additional Trust Indicators */}
          <MotionWrapper fallback={<div className="mt-20" />}> {(mod) => (
          <mod.motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-20"
            >
            <div className="bg-card rounded-2xl p-8 warm-shadow">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-headline font-bold text-foreground mb-4">
                  Recunoscut și apreciat în România
                </h3>
                <p className="text-text-secondary font-body">
                  Platformă educațională certificată și recomandată de specialiști
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
                {/* Badge 1: Certificat GDPR */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Shield" size={24} className="text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Certificat GDPR</p>
                  <p className="text-xs text-text-secondary">Protecția datelor</p>
                </div>

                {/* Badge 2: Progres garantat */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="TrendingUp" size={24} className="text-success" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Progres garantat</p>
                  <p className="text-xs text-text-secondary">Metodă testată prin peste 1.000 de ore de practică aplicată</p>
                </div>

                {/* Badge 3: Transparență și etică */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Lock" size={24} className="text-warning" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Transparență și etică</p>
                  <p className="text-xs text-text-secondary">Date protejate, progres monitorizat, rezultate măsurabile</p>
                </div>

                {/* Badge 4: Încrederea părinților */}
                <div className="text-center space-y-2">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Users" size={24} className="text-secondary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">Încrederea părinților</p>
                  <p className="text-xs text-text-secondary">98% recomandă</p>
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

export default StatsSection;