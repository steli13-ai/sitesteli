import React, { useEffect, useState } from 'react';
import { useIsIdle } from '@/hooks/useIsIdle';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { Link } from 'react-router-dom';
import { DEMO_VIDEO_URL } from '../../../config/publicLinks';

const fadeUp = { hidden: { opacity: 0, y: 6 }, visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } } };

const HeroSection = () => {
  const isIdle = useIsIdle(600);
  const [FM, setFM] = useState(null);
  useEffect(() => {
    if (!isIdle || FM) return;
    let mounted = true;
    import('framer-motion').then((mod) => {
      if (!mounted) return;
      setFM({ LazyMotion: mod.LazyMotion, m: mod.m, domAnimation: mod.domAnimation });
    }).catch(() => {});
    return () => { mounted = false; };
  }, [isIdle, FM]);
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 lg:px-6 overflow-hidden">
      {/* Background Elements - switched to green palette */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-green-100 to-emerald-50" />
      {/* Mathematical symbols floating */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 text-primary/30 text-8xl font-bold math-symbol-float">
          ∑
        </div>
        <div className="absolute top-40 right-20 text-green-400/40 text-6xl font-bold math-symbol-float animate-math-float-slow">
          π
        </div>
        <div className="absolute bottom-20 left-1/4 text-accent/30 text-7xl font-bold math-symbol-float animate-math-float-slower">
          √
        </div>
        <div className="absolute bottom-32 right-1/3 text-trust/30 text-5xl font-bold math-symbol-float">
          ∫
        </div>
        <div className="absolute top-1/3 left-16 text-emerald-400/40 text-4xl font-bold math-symbol-float animate-math-float-slow">
          α
        </div>
        <div className="absolute top-2/3 right-16 text-green-500/40 text-6xl font-bold math-symbol-float animate-math-float-slower">
          Δ
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto text-center relative z-10">
        {FM ? (
          <FM.LazyMotion features={FM.domAnimation} strict>
          <FM.m.div
            initial={isIdle ? 'hidden' : undefined}
            animate={isIdle ? 'visible' : undefined}
            variants={fadeUp}
          >
          {/* Hero Title - updated copy (marked as potential LCP) */}
          <h1 data-lcp className="font-headline font-bold text-5xl lg:text-7xl text-text-primary mb-6 leading-tight">
            Descoperă cum poți scăpa de problemele la matematică
            <span className="text-green-600 relative">
              {' '}
              ușor și sigur
              <FM.m.div
                className="absolute -bottom-2 left-0 right-0 h-2 bg-gradient-to-r from-green-300/50 to-emerald-300/50 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>
            .
          </h1>

          {/* Hero Subtitle */}
          <FM.m.p
            initial={isIdle ? 'hidden' : undefined}
            animate={isIdle ? 'visible' : undefined}
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-xl lg:text-2xl text-text-secondary max-w-4xl mx-auto mb-8 leading-relaxed"
          >
            Transformă anxietatea matematică în <span className="text-green-700 font-semibold">încredere</span> și 
            <span className="text-green-700 font-semibold"> rezultate excelente</span>. 
            Lecții pas cu pas, exerciții interactive și sprijin constant pentru clasele 5-12.
          </FM.m.p>

          {/* Statistics */}
          <FM.m.div
            initial={isIdle ? 'hidden' : undefined}
            animate={isIdle ? 'visible' : undefined}
            variants={fadeUp}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 mb-12 text-center"
          >
            <div className="flex flex-col items-center">
              <div className="text-3xl font-headline font-bold text-green-600 mb-1">1000+</div>
              <div className="text-text-secondary font-body">elevi mulțumiți</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-headline font-bold text-secondary mb-1">95%</div>
              <div className="text-text-secondary font-body">Rata de succes</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-headline font-bold text-accent mb-1">4.9/5</div>
              <div className="text-text-secondary font-body">Rating elevi</div>
            </div>
          </FM.m.div>

          {/* CTA Buttons */}
          <FM.m.div
            initial={isIdle ? 'hidden' : undefined}
            animate={isIdle ? 'visible' : undefined}
            variants={fadeUp}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
          >
            <Button
              asChild
              variant="default"
              size="lg"
              className="bg-warning text-warning-foreground hover:bg-warning/90 font-cta font-semibold px-8 py-4 text-lg warm-shadow confidence-hover"
            >
              <Link to="/free-resources">
                <span className="inline-flex items-center">
                  <Icon name="Rocket" size={24} className="mr-3" />
                  Începe Gratuit Acum
                </span>
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-cta px-8 py-4 text-lg confidence-hover border-2"
            >
              <a href={DEMO_VIDEO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                <Icon name="Play" size={24} className="mr-3" />
                Vezi Demo
              </a>
            </Button>
          </FM.m.div>

          {/* Subtitle with student count under CTAs */}
          <FM.m.p
            initial={isIdle ? 'hidden' : undefined}
            animate={isIdle ? 'visible' : undefined}
            variants={fadeUp}
            transition={{ delay: 0.7 }}
            className="text-lg text-success font-semibold mb-8"
          >
            1000+ elevi mulțumiți
          </FM.m.p>

          {/* Trust Indicators */}
          <FM.m.div
            initial={isIdle ? 'hidden' : undefined}
            animate={isIdle ? 'visible' : undefined}
            variants={fadeUp}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-6 text-text-secondary"
          >
            <div className="flex items-center space-x-2">
              <Icon name="Shield" size={20} className="text-trust" />
              <span className="font-body text-sm">Platformă securizată</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} className="text-success" />
              <span className="font-body text-sm">Comunitate activă</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="TrendingUp" size={20} className="text-warning" />
              <span className="font-body text-sm">Progres garantat</span>
            </div>
          </FM.m.div>
        </FM.m.div>
        </FM.LazyMotion>
        ) : (
          // Static fallback before motion library is loaded
          <div>
            {/* Title, subtitle and CTA already rendered above; only dynamic wrappers omitted while loading */}
          </div>
        )}
      </div>
      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-24 text-background"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="currentColor"
        >
          <path d="M0,120 L0,60 Q300,0 600,60 T1200,60 L1200,120 Z" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;