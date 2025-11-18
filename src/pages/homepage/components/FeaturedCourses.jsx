import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { MotionWrapper } from '@/lib/motionLazy';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const FeaturedCourses = () => {
  const fallbackCourses = [
  {
    id: 1,
    title: 'Ecuații și Inecuații',
    subtitle: 'Clasa a 8-a • Algebră',
    description: 'Stăpânește ecuațiile liniare și pătratice cu metode pas cu pas și exerciții interactive.',
  image: "https://images.unsplash.com/photo-1581090124321-d19ad6d7cd5a?auto=format&fit=crop&w=1200&q=70&fm=webp",
    imageAlt: 'Student solving mathematical equations on whiteboard with colorful markers',
    instructor: 'Prof. Maria Popescu',
  instructorAvatar: "https://images.unsplash.com/photo-1694034035030-b6eaa0845e6e?auto=format&fit=crop&w=256&q=60&fm=webp",
    instructorAvatarAlt: 'Professional headshot of female teacher with brown hair and glasses smiling',
    rating: 4.9,
    studentsCount: 2847,
    lessonsCount: 24,
    duration: '6 săptămâni',
    level: 'Intermediar',
    price: 'Gratuit',
    progress: 0,
    category: 'Algebră',
    categoryColor: 'primary',
    features: ['Video lecții HD', 'Exerciții interactive', 'Teste de evaluare', 'Certificat de absolvire'],
    nextLesson: 'Ecuații cu o necunoscută',
    completionRate: 94
  },
  {
    id: 2,
    title: 'Geometrie în Spațiu',
    subtitle: 'Clasa a 11-a • Geometrie',
    description: 'Explorează lumea tridimensională a geometriei cu modele 3D și vizualizări interactive.',
  image: "https://images.unsplash.com/photo-1563520239648-a24e51d4b570?auto=format&fit=crop&w=1200&q=70&fm=webp",
    imageAlt: 'Geometric 3D shapes and mathematical models displayed on modern desk with calculator',
    instructor: 'Prof. Alexandru Ionescu',
  instructorAvatar: "https://images.unsplash.com/photo-1734434570358-21badf4ba1c6?auto=format&fit=crop&w=256&q=60&fm=webp",
    instructorAvatarAlt: 'Professional headshot of male teacher with short dark hair in blue shirt',
    rating: 4.8,
    studentsCount: 1923,
    lessonsCount: 32,
    duration: '8 săptămâni',
    level: 'Avansat',
    price: '149 RON',
    progress: 0,
    category: 'Geometrie',
    categoryColor: 'secondary',
    features: ['Modele 3D interactive', 'Simulări vizuale', 'Probleme rezolvate', 'Suport personalizat'],
    nextLesson: 'Volumul piramidei',
    completionRate: 89
  },
  {
    id: 3,
    title: 'Pregătire BAC Matematică',
    subtitle: 'Clasa a 12-a • Examen',
    description: 'Pregătire completă pentru Bacalaureatul la matematică cu teste practice și strategii de rezolvare.',
  image: "https://images.unsplash.com/photo-1680634658753-d7ad8fadac7f?auto=format&fit=crop&w=1200&q=70&fm=webp",
    imageAlt: 'Students taking exam in classroom with focused concentration and mathematical formulas on blackboard',
    instructor: 'Prof. Elena Dumitrescu',
  instructorAvatar: "https://images.unsplash.com/photo-1624484631620-9e53e4aed980?auto=format&fit=crop&w=256&q=60&fm=webp",
    instructorAvatarAlt: 'Professional headshot of female teacher with blonde hair and warm smile',
    rating: 4.9,
    studentsCount: 3456,
    lessonsCount: 48,
    duration: '12 săptămâni',
    level: 'Expert',
    price: '299 RON',
    progress: 0,
    category: 'Examene',
    categoryColor: 'warning',
    features: ['Simulări BAC complete', 'Bareme de notare', 'Strategii de timp', 'Sesiuni Q&A live'],
    nextLesson: 'Funcții și limite',
    completionRate: 96
  }];

  const [featuredCourses, setFeaturedCourses] = useState(fallbackCourses);

  // Optional: fetch weekly-updated courses from a JSON endpoint
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('/assets/featured-courses.json', { cache: 'no-cache' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length) setFeaturedCourses(data);
        }
      } catch (e) {
        // Fallback to bundled list
        console.info('Using fallback featured courses.');
      }
    };
    fetchCourses();
  }, []);


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
    <section className="py-20 bg-muted/30 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <Helmet>
            <title>Cursuri populare săptămâna aceasta | Mate cu Succes</title>
            <meta name="description" content="Descoperă cursurile populare și începe să înveți matematică eficient. Conținut actualizat săptămânal." />
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Cursuri populare | Mate cu Succes" />
            <meta property="og:description" content="Cursuri actualizate săptămânal pentru rezultate reale la matematică." />
          </Helmet>
          {/* Section Header */}
          <MotionWrapper fallback={<div className="text-center mb-16" />}> {(mod) => (
          <mod.motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16">

            <h2 className="text-4xl md:text-5xl font-headline font-bold text-foreground mb-6">
              Cursuri <span className="text-primary">populare</span> această săptămână
            </h2>
            <p className="text-xl text-text-secondary font-body max-w-3xl mx-auto leading-relaxed">
              Descoperă cursurile preferate de elevii noștri și începe să înveți astăzi.
            </p>
            <p className="mt-3 text-success font-medium">
              Cursurile se actualizează automat săptămânal
            </p>
          </mod.motion.div>
          )}
          </MotionWrapper>

          {/* Featured Courses Grid */}
          <MotionWrapper fallback={<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" />}> {(mod) => (
          <mod.motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {featuredCourses?.map((course) =>
            <mod.motion.div
              key={course?.id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-card rounded-2xl overflow-hidden warm-shadow hover:warm-shadow-lg transition-all duration-300 group">

                {/* Course Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                  src={course?.image}
                  alt={course?.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className={`absolute top-4 left-4 bg-${course?.categoryColor} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                    {course?.category}
                  </div>

                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-card text-foreground px-3 py-1 rounded-full text-sm font-bold warm-shadow">
                    {course?.price}
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center warm-shadow">
                      <Icon name="Play" size={24} className="text-primary ml-1" />
                    </div>
                  </div>
                </div>

                {/* Course Content */}
                <div className="p-6 space-y-4">
                  {/* Header */}
                  <div>
                    <h3 className="text-xl font-headline font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {course?.title}
                    </h3>
                    <p className="text-text-secondary text-sm font-medium">
                      {course?.subtitle}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-text-secondary font-body text-sm leading-relaxed">
                    {course?.description}
                  </p>

                  {/* Instructor */}
                  <div className="flex items-center space-x-3">
                    <img
                    src={course?.instructorAvatar}
                    alt={course?.instructorAvatarAlt}
                    loading="lazy"
                    className="w-8 h-8 rounded-full object-cover" />

                    <span className="text-sm font-medium text-foreground">
                      {course?.instructor}
                    </span>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-warning fill-current" />
                      <span className="font-medium">{course?.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Users" size={14} />
                      <span>{course?.studentsCount?.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="BookOpen" size={14} />
                      <span>{course?.lessonsCount} lecții</span>
                    </div>
                  </div>

                  {/* Course Details */}
                  <div className="grid grid-cols-2 gap-4 py-3 border-t border-border">
                    <div>
                      <p className="text-xs text-text-secondary">Durată</p>
                      <p className="text-sm font-medium text-foreground">{course?.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-secondary">Nivel</p>
                      <p className="text-sm font-medium text-foreground">{course?.level}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-foreground">Include:</p>
                    <div className="grid grid-cols-2 gap-1">
                      {course?.features?.slice(0, 4)?.map((feature, index) =>
                    <div key={index} className="flex items-center space-x-1">
                          <Icon name="Check" size={12} className="text-success" />
                          <span className="text-xs text-text-secondary">{feature}</span>
                        </div>
                    )}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <Button
                    asChild
                    variant="default"
                    fullWidth
                    className={`bg-${course?.categoryColor} text-white hover:bg-${course?.categoryColor}/90 font-cta font-semibold mt-4`}
                    iconName="ArrowRight"
                    iconPosition="right"
                  >
                    <Link to="/course-catalog">
                      {course?.price === 'Gratuit' ? 'Începe Acum' : 'Vezi Detalii'}
                    </Link>
                  </Button>
                </div>

                {/* Progress Bar (if enrolled) */}
                {course?.progress > 0 &&
              <div className="px-6 pb-4">
                    <div className="flex justify-between text-xs text-text-secondary mb-1">
                      <span>Progres</span>
                      <span>{course?.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                    className={`bg-${course?.categoryColor} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${course?.progress}%` }} />

                    </div>
                  </div>
              }
              </mod.motion.div>
            )}
          </mod.motion.div>
          )}
          </MotionWrapper>

          {/* JSON-LD for courses */}
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": (featuredCourses || []).slice(0,3).map((c, i) => ({
              "@type": "ListItem",
              "position": i + 1,
              "item": {
                "@type": "Course",
                "name": c.title,
                "description": c.description,
                "provider": { "@type": "Organization", "name": "Mate cu Succes" }
              }
            }))
          }) }} />

          {/* View All Courses CTA */}
          <MotionWrapper fallback={<div className="text-center mt-16" />}> {(mod) => (
          <mod.motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-16">

            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-cta font-semibold"
              iconName="Library"
              iconPosition="left"
            >
              <Link to="/course-catalog">Vezi Toate Cursurile</Link>
            </Button>
          </mod.motion.div>
          )}
          </MotionWrapper>
        </div>
      </div>
    </section>);

};

export default FeaturedCourses;