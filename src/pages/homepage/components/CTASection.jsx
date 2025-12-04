import React from 'react';
import { MotionWrapper } from '@/lib/motionLazy';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';
import { DEMO_VIDEO_URL } from '../../../config/publicLinks';

const CTASection = () => {
  const benefits = [
  {
    icon: 'Zap',
    title: 'Start Instant',
    description: 'Începi să înveți imediat, fără așteptare'
  },
  {
    icon: 'Shield',
    title: 'Fără Risc',
    description: 'Garanție de rambursare 30 de zile'
  },
  {
    icon: 'Users',
    title: 'Suport Complet',
    description: 'Echipa noastră te ajută 24/7'
  }];


  const urgencyFactors = [
  {
    icon: 'Clock',
    text: 'Oferta limitată - doar pentru primii 1000 de elevi'
  },
  {
    icon: 'TrendingUp',
    text: 'Locurile se ocupă rapid - 847 elevi înscriși săptămâna aceasta'
  },
  {
    icon: 'Calendar',
    text: 'Anul școlar a început - nu pierde timpul prețios'
  }];


  return (
    <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10 relative overflow-hidden">
      {/* Background Mathematical Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-primary/5 text-8xl font-bold">∑</div>
        <div className="absolute top-20 right-20 text-secondary/5 text-6xl font-bold">π</div>
        <div className="absolute bottom-20 left-1/4 text-accent/5 text-7xl font-bold">√</div>
        <div className="absolute bottom-10 right-10 text-warning/5 text-5xl font-bold">∞</div>
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA Content */}
          <MotionWrapper fallback={<div className="text-center mb-12" />}> {(mod) => (
          <mod.motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12">

            <h2 className="text-4xl md:text-6xl font-headline font-bold text-foreground mb-6 leading-tight">
              Transformă-ți <span className="text-primary">frica</span> de matematică în{' '}
              <span className="text-secondary">încredere</span> astăzi!
            </h2>
            <p className="text-xl md:text-2xl text-text-secondary font-body leading-relaxed mb-8">
              Alătură-te celor peste 50,000 de elevi care au descoperit că matematica poate fi{' '}
              <span className="text-warning font-semibold">ușoară și distractivă</span>
            </p>
          </mod.motion.div>
          )}
          </MotionWrapper>

          {/* Urgency Indicators */}
          <MotionWrapper fallback={<div className="bg-card rounded-2xl p-6 warm-shadow mb-12" />}> {(mod) => (
          <mod.motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-2xl p-6 warm-shadow mb-12">

            <div className="grid md:grid-cols-3 gap-4">
              {urgencyFactors?.map((factor, index) =>
              <div key={index} className="flex items-center space-x-3 text-sm">
                  <div className="w-8 h-8 bg-warning/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={factor?.icon} size={16} className="text-warning" />
                  </div>
                  <span className="text-text-secondary">{factor?.text}</span>
                </div>
              )}
            </div>
          </mod.motion.div>
          )}
          </MotionWrapper>

          {/* Main CTA Buttons */}
          <MotionWrapper fallback={<div className="text-center mb-12" />}> {(mod) => (
          <mod.motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center mb-12">

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button
                asChild
                variant="default"
                size="xl"
                className="bg-warning text-warning-foreground hover:bg-warning/90 font-cta font-bold text-xl px-12 py-6 warm-shadow-lg hover:warm-shadow celebration-bounce"
                iconName="Rocket"
                iconPosition="right"
              >
                <Link to="/free-resources">ÎNCEPE GRATUIT ACUM</Link>
              </Button>
              <div className="text-center">
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-cta text-lg px-8 py-4 mb-2"
                  iconName="Play"
                  iconPosition="left">
                  <a href={DEMO_VIDEO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    Vezi Demo (2 min)
                  </a>
                </Button>
                <p className="text-sm text-text-secondary">
                  Fără card de credit • Acces instant
                </p>
              </div>
            </div>
          </mod.motion.div>
          )}
          </MotionWrapper>

          {/* Benefits Grid */}
          <MotionWrapper fallback={<div className="grid md:grid-cols-3 gap-8 mb-12" />}> {(mod) => (
          <mod.motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-8 mb-12">

            {benefits?.map((benefit, index) =>
            <div key={index} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={benefit?.icon} size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-headline font-semibold text-foreground mb-2">
                  {benefit?.title}
                </h3>
                <p className="text-text-secondary font-body">
                  {benefit?.description}
                </p>
              </div>
            )}
          </mod.motion.div>
          )}
          </MotionWrapper>

          {/* Social Proof */}
          <MotionWrapper fallback={<div className="text-center mb-12" />}> {(mod) => (
          <mod.motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-center mb-12">

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              {/* Student Avatars */}
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <img
                    src="https://images.unsplash.com/photo-1568743296270-9cc798164b3b?w=80&h=80&fit=crop&auto=format&q=60"
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    width="40"
                    height="40"
                    decoding="async"
                    loading="lazy" />

                  <img
                    src="https://images.unsplash.com/photo-1595653819970-33d3338dcb03?w=80&h=80&fit=crop&auto=format&q=60"
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    width="40"
                    height="40"
                    decoding="async"
                    loading="lazy" />

                  <img
                    src="https://images.unsplash.com/flagged/photo-1556845694-824a68654417?w=80&h=80&fit=crop&auto=format&q=60"
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    width="40"
                    height="40"
                    decoding="async"
                    loading="lazy" />

                  <img
                    src="https://images.unsplash.com/flagged/photo-1572863048049-72e630660b0d?w=80&h=80&fit=crop&auto=format&q=60"
                    alt=""
                    className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    width="40"
                    height="40"
                    decoding="async"
                    loading="lazy" />

                  <div className="w-10 h-10 rounded-full border-2 border-white bg-primary flex items-center justify-center text-white text-sm font-bold">
                    +50k
                  </div>
                </div>
                <div className="ml-4 text-left">
                  <p className="text-sm font-medium text-foreground">
                    Peste 50,000 de elevi mulțumiți
                  </p>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)]?.map((_, i) =>
                    <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
                    )}
                    <span className="text-sm text-text-secondary ml-1">4.9/5</span>
                  </div>
                </div>
              </div>

              {/* Separator */}
              <div className="hidden sm:block w-px h-12 bg-border" />

              {/* Recent Activity */}
              <div className="text-center sm:text-left">
                <p className="text-sm font-medium text-foreground">
                  🔥 847 elevi s-au înscris săptămâna aceasta
                </p>
                <p className="text-sm text-text-secondary">
                  ⚡ Ultimul elev înscris acum 3 minute
                </p>
              </div>
            </div>
          </mod.motion.div>
          )}
          </MotionWrapper>

          {/* Final Guarantee */}
          <MotionWrapper fallback={<div className="text-center" />}> {(mod) => (
          <mod.motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center">

            <div className="bg-success/10 border border-success/20 rounded-2xl p-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Icon name="Shield" size={24} className="text-success" />
                <h3 className="text-lg font-headline font-semibold text-success">
                  Garanție 100% Satisfacție
                </h3>
              </div>
              <p className="text-text-secondary font-body">
                Dacă în primele 30 de zile nu ești complet mulțumit de progresul tău,{' '}
                <span className="font-semibold text-foreground">îți returnăm toți banii</span> - fără întrebări!
              </p>
            </div>
          </mod.motion.div>
          )}
          </MotionWrapper>
        </div>
      </div>
      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 lg:hidden">
        <Button
          asChild
          variant="default"
          size="lg"
          className="bg-warning text-warning-foreground hover:bg-warning/90 font-cta font-bold warm-shadow-lg px-8 py-4"
          iconName="Rocket"
          iconPosition="right"
        >
          <Link to="/free-resources">ÎNCEPE ACUM</Link>
        </Button>
      </div>
    </section>);

};

export default CTASection;