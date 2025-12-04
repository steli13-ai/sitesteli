import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ExamContent from './sections/ExamContent';
// New modular sections & data
import HeroSection from './sections/HeroSection';
import ExamTypeSelector from './sections/ExamTypeSelector';
import { examTypes, getExamQuestions, getProgressData, getSuccessStories } from './data/examData';

const ExamPreparation = () => {
  const [selectedExamType, setSelectedExamType] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('ro');
  const [showExamContent, setShowExamContent] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ro';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Data & helpers now imported from examData.js

  const selectedExam = examTypes?.find((exam) => exam?.id === selectedExamType);
  const examDate = selectedExamType === 'evaluare' ? '2025-06-15' : '2025-06-20';

  const handleExamTypeSelection = (examId) => {
    setSelectedExamType(examId);
    setShowExamContent(true);
    // Scroll to exam content
    setTimeout(() => {
      document.getElementById('exam-content')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleStartPreparation = (examId) => {
    setSelectedExamType(examId);
    // Scroll to study plan section
    document.getElementById('study-plan')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMockExamComplete = (results) => {
    if (import.meta.env.DEV) console.log('Mock exam completed:', results);
    // Handle exam completion logic here
  };

  return (
    <>
      <Helmet>
        <title>Pregătire Examene - Evaluare Națională & BAC | Mate cu Succes</title>
        <meta name="description" content="Pregătește-te eficient pentru Evaluarea Națională și Bacalaureat la matematică. Simulări cronometrate, planuri de studiu și feedback detaliat." />
        <link rel="canonical" href="https://matecusucces.ro/exam-preparation" />
        <meta property="og:title" content="Pregătire Examene - Mate cu Succes" />
        <meta property="og:description" content="Program structurat pentru examene: simulări, statistici, planuri de studiu și povești de succes." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matecusucces.ro/exam-preparation" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Pregătire examene',
            description: 'Resurse și programe de pregătire pentru Evaluarea Națională și Bacalaureat',
            url: 'https://matecusucces.ro/exam-preparation'
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
  {/* Header provided by layout */}
      {/* Pastel background elements */}
      <div className="pastel-shapes">
        <div className="floating-shape w-16 h-16 bg-purple-100 top-20 left-10"></div>
        <div className="floating-shape w-12 h-12 bg-blue-100 top-40 right-20"></div>
        <div className="floating-star top-60 left-1/4">
          <svg className="w-8 h-8 text-pink-200" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
          </svg>
        </div>
        <div className="floating-cube w-14 h-14 bg-green-100 top-80 right-1/3 rounded-lg"></div>
        <div className="floating-shape w-10 h-10 bg-yellow-100 top-32 right-1/4"></div>
        <div className="floating-cube w-8 h-8 bg-indigo-100 top-96 left-1/3 rounded"></div>
  </div>
  {/* Hero Section */}
      <HeroSection />
      <ExamTypeSelector
        examTypes={examTypes}
        selectedExamType={selectedExamType}
        onSelect={handleExamTypeSelection}
      />
      {/* Exam Content - Only show when exam type is selected */}
      {selectedExamType && showExamContent && (
        <ExamContent
          selectedExamType={selectedExamType}
          selectedExam={selectedExam}
          examDate={examDate}
          onStartPreparation={handleStartPreparation}
          onMockExamComplete={handleMockExamComplete}
        />
      )}
      {/* CTA Section */}
      <section className="py-16 px-4 lg:px-6 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline font-semibold text-3xl text-text-primary mb-4">
              Începe pregătirea astăzi!
            </h2>
            <p className="text-text-secondary mb-8 text-lg">
              Nu lăsa examenele să-ți creeze anxietate. Cu Mate cu succes, 
              fiecare pas te apropie de succesul dorit.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="default"
                size="lg"
                className="bg-warning text-warning-foreground hover:bg-warning/90 font-cta font-semibold"
              >
                <Link to="/free-resources">
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Începe Gratuit
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-cta"
              >
                <Link to="/consiliere">
                  <Icon name="Phone" size={20} className="mr-2" />
                  Vorbește cu un Consultant
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Donate Section */}
      <section className="py-16 px-4 lg:px-6 bg-card">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-headline font-semibold text-2xl text-text-primary mb-6">
              Învață & Donează 💙
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="text-text-secondary mb-6 leading-relaxed">
                Vrei să susții acest proiect care oferă și resurse gratuite elevilor? Donează acum! 
                (În viitor: opțiune pentru a susține rechizitele unui copil cu posibilități reduse.)
              </p>
              <Button
                variant="default"
                size="lg"
                className="bg-blue-500 hover:bg-blue-600 text-white font-cta font-semibold"
                asChild
              >
                <a href="/doneaza">
                  <Icon name="Heart" size={20} className="mr-2" />
                  Donează Acum
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer intentionally omitted on this page */}
    </div>
    </>
  );
};

export default ExamPreparation;