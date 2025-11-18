import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ExamCountdown from './components/ExamCountdown';
import ExamTypeCard from './components/ExamTypeCard';
import MockExamSimulator from './components/MockExamSimulator';
import ProgressTracker from './components/ProgressTracker';
import SuccessStories from './components/SuccessStories';
import StudyPlan from './components/StudyPlan';

const ExamPreparation = () => {
  const [selectedExamType, setSelectedExamType] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('ro');
  const [showExamContent, setShowExamContent] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'ro';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock data for exam types - now filtered based on selection
  const examTypes = [
    {
      id: 'evaluare',
      examType: 'Evaluarea Națională',
      grade: 'Clasa a VIII-a',
      subjects: ['Matematică', 'Limba Română'],
      difficulty: 'Mediu',
      successRate: 94,
      studentsCount: 1247,
      description: `Pregătește-te pentru Evaluarea Națională cu încredere! Programul nostru structurat te ajută să stăpânești toate conceptele necesare pentru a obține rezultate excelente.`,
      features: [
        'Plan de studiu personalizat pe 12 săptămâni',
        'Simulări complete de examen cu cronometru',
        'Feedback detaliat pentru fiecare test',
        'Acces la baza de date cu 500+ probleme',
        'Sesiuni de recapitulare săptămânale',
        'Suport individual de la profesori'
      ]
    },
    {
      id: 'bac',
      examType: 'Bacalaureatul',
      grade: 'Clasa a XII-a',
      subjects: ['Matematică M1', 'Matematică M2'],
      difficulty: 'Dificil',
      successRate: 89,
      studentsCount: 892,
      description: `Bacalaureatul nu mai este o provocare imposibilă! Cu metodologia noastră dovedită, vei aborda examenul cu încredere și vei obține nota dorită.`,
      features: [
        'Pregătire intensivă pe 16 săptămâni',
        'Simulări BAC cu subiecte din anii anteriori',
        'Rezolvări pas cu pas pentru toate tipurile de probleme',
        'Strategii de gestionare a timpului la examen',
        'Grupuri de studiu cu colegi motivați',
        'Consultații individuale săptămânale'
      ]
    }
  ];

  // Mock data for mock exam questions - now specific to exam type
  const getExamQuestions = (examType) => {
    if (examType === 'evaluare') {
      return [
        {
          id: 1,
          question: "Calculați valoarea expresiei: 2x + 3y, pentru x = 4 și y = 2.",
          options: ["14", "16", "18", "20"],
          correctAnswer: "14"
        },
        {
          id: 2,
          question: "Care este soluția ecuației: 3x - 7 = 8?",
          options: ["x = 3", "x = 5", "x = 7", "x = 15"],
          correctAnswer: "x = 5"
        },
        {
          id: 3,
          question: "Aria unui triunghi cu baza de 8 cm și înălțimea de 6 cm este:",
          options: ["24 cm²", "28 cm²", "32 cm²", "48 cm²"],
          correctAnswer: "24 cm²"
        }
      ];
    } else {
      return [
        {
          id: 1,
          question: "Calculați limita: lim(x→∞) (3x² + 2x - 1)/(x² + 1)",
          options: ["0", "1", "3", "∞"],
          correctAnswer: "3"
        },
        {
          id: 2,
          question: "Derivata funcției f(x) = ln(x² + 1) este:",
          options: ["2x/(x² + 1)", "1/(x² + 1)", "2x", "x/(x² + 1)"],
          correctAnswer: "2x/(x² + 1)"
        },
        {
          id: 3,
          question: "Integrala ∫x·e^x dx este:",
          options: ["e^x(x-1) + C", "e^x(x+1) + C", "x·e^x + C", "e^x + C"],
          correctAnswer: "e^x(x-1) + C"
        }
      ];
    }
  };

  // Mock data for progress tracking - now exam-specific
  const getProgressData = (examType) => {
    if (examType === 'evaluare') {
      return {
        studentName: 'Maria Popescu',
        examType: 'Evaluarea Națională',
        overallProgress: 67,
        subjectProgress: [
          { name: 'Algebră', progress: 78 },
          { name: 'Geometrie', progress: 65 },
          { name: 'Funcții', progress: 72 },
          { name: 'Probabilități', progress: 58 }
        ],
        recentScores: [
          { score: 65, date: '10 Oct' },
          { score: 72, date: '12 Oct' },
          { score: 78, date: '14 Oct' }
        ],
        strengths: [
          'Ecuații de gradul I',
          'Operații cu fracții',
          'Calculul ariilor'
        ],
        weaknesses: [
          'Funcții de gradul II',
          'Geometrie în spațiu',
          'Probabilități condiționate'
        ]
      };
    } else {
      return {
        studentName: 'Alexandru Mihai',
        examType: 'Bacalaureat',
        overallProgress: 73,
        subjectProgress: [
          { name: 'Analiză Matematică', progress: 81 },
          { name: 'Algebră', progress: 69 },
          { name: 'Geometrie', progress: 76 },
          { name: 'Trigonometrie', progress: 65 }
        ],
        recentScores: [
          { score: 68, date: '8 Oct' },
          { score: 75, date: '11 Oct' },
          { score: 82, date: '13 Oct' }
        ],
        strengths: [
          'Limite și continuitate',
          'Derivate',
          'Ecuații diferențiale'
        ],
        weaknesses: [
          'Integrale complexe',
          'Geometrie analitică',
          'Progresii matematice'
        ]
      };
    }
  };

  // Mock data for success stories - filtered by exam type
  const getSuccessStories = (examType) => {
    const allStories = [
      {
        name: 'Alexandru Ionescu',
        examType: 'Evaluarea Națională',
        year: '2024',
        avatar: "https://images.unsplash.com/photo-1628479104885-c21cbb899f54",
        avatarAlt: 'Professional headshot of young man with brown hair wearing blue shirt',
        gradeBefore: 6.2,
        gradeAfter: 9.1,
  testimonial: `Înainte să încep cursurile Mate cu succes, matematica era coșmarul meu. Acum am obținut 9.1 la Evaluarea Națională și mă pregătesc pentru liceu cu încredere!`,
        studyDuration: '4 luni',
        coursesCompleted: 3,
        subjects: ['Algebră', 'Geometrie']
      },
      {
        name: 'Elena Marinescu',
        examType: 'Bacalaureat',
        year: '2024',
        avatar: "https://images.unsplash.com/photo-1668911240686-fe09797b3043",
        avatarAlt: 'Professional headshot of young woman with long brown hair wearing white blouse',
        gradeBefore: 5.8,
        gradeAfter: 8.7,
  testimonial: `Metodologia Mate cu succes m-a ajutat să înțeleg conceptele pe care le evitam de ani de zile. Bacul nu mai pare imposibil!`,
        studyDuration: '6 luni',
        coursesCompleted: 5,
        subjects: ['Matematică M1', 'Matematică M2']
      },
      {
        name: 'Andrei Constantinescu',
        examType: 'Evaluarea Națională',
        year: '2024',
        avatar: "https://images.unsplash.com/photo-1669390581296-0ff052a38e31",
        avatarAlt: 'Professional headshot of teenage boy with short dark hair wearing gray sweater',
        gradeBefore: 7.1,
        gradeAfter: 9.5,
        testimonial: `Simulările și feedback-ul constant m-au pregătit perfect pentru examen. Am depășit toate așteptările!`,
        studyDuration: '3 luni',
        coursesCompleted: 2,
        subjects: ['Algebră', 'Funcții']
      }
    ];

    return examType ? allStories?.filter(story => story?.examType?.toLowerCase()?.includes(examType === 'evaluare' ? 'națională' : 'bacalaureat')) : allStories;
  };

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
    console.log('Mock exam completed:', results);
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
      <section className="pt-24 pb-16 px-4 lg:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 text-primary/20 text-6xl font-bold math-symbol-float">∫</div>
          <div className="absolute top-40 right-20 text-secondary/20 text-4xl font-bold math-symbol-float">π</div>
          <div className="absolute bottom-20 left-1/4 text-accent/20 text-5xl font-bold math-symbol-float">√</div>
          <div className="absolute bottom-32 right-1/3 text-trust/20 text-3xl font-bold math-symbol-float">∑</div>
        </div>
        
        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="font-headline font-bold text-4xl lg:text-6xl text-text-primary mb-6">
              Examene mari,{' '}
              <span className="text-examene-purple">pași siguri</span> 📘
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Transformă-ți teama de examene în încredere și rezultate excelente. 
              Pregătire structurată pentru Evaluarea Națională și Bacalaureat.
            </p>
          </motion.div>

          {/* Initial Exam Type Selection */}
          {!selectedExamType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-12"
            >
              <div className="bg-card rounded-xl p-8 warm-shadow max-w-2xl">
                <h2 className="font-headline font-semibold text-2xl text-text-primary mb-6 text-center">
                  Alege tipul de examen
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {examTypes?.map((exam) => (
                    <button
                      key={exam?.id}
                      onClick={() => handleExamTypeSelection(exam?.id)}
                      className="p-6 rounded-lg border-2 border-border hover:border-primary transition-all duration-200 hover:warm-shadow text-left group"
                    >
                      <h3 className="font-headline font-semibold text-lg text-text-primary group-hover:text-primary transition-colors">
                        {exam?.examType}
                      </h3>
                      <p className="text-text-secondary mt-2">{exam?.grade}</p>
                      <div className="flex items-center mt-3">
                        <span className="text-sm text-primary font-medium">Selectează →</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Selected Exam Type Display */}
          {selectedExamType && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center mb-12"
            >
              <div className="bg-card rounded-xl p-2 warm-shadow">
                <div className="flex space-x-2">
                  {examTypes?.map((exam) => (
                    <button
                      key={exam?.id}
                      onClick={() => handleExamTypeSelection(exam?.id)}
                      className={`px-6 py-3 rounded-lg font-cta font-semibold transition-all duration-200 ${
                        selectedExamType === exam?.id
                          ? 'bg-primary text-primary-foreground warm-shadow'
                          : 'text-text-secondary hover:text-primary hover:bg-muted'
                      }`}
                    >
                      {exam?.examType}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      {/* Exam Content - Only show when exam type is selected */}
      {selectedExamType && showExamContent && (
        <div id="exam-content">
          {/* Exam Countdown */}
          <section className="py-16 px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ExamCountdown
                  examType={selectedExam?.examType}
                  examDate={examDate}
                  className="max-w-2xl mx-auto"
                />
              </motion.div>
            </div>
          </section>

          {/* Selected Exam Details */}
          <section className="py-16 px-4 lg:px-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-headline font-semibold text-3xl text-text-primary mb-4">
                  Pregătire pentru {selectedExam?.examType}
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Program specializat cu metodologii dovedite și rezultate garantate
                </p>
              </motion.div>

              <div className="flex justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <ExamTypeCard
                    {...selectedExam}
                    onStartPreparation={() => handleStartPreparation(selectedExam?.id)}
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Mock Exam Simulator */}
          <section className="py-16 px-4 lg:px-6">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-headline font-semibold text-3xl text-text-primary mb-4">
                  Simulează examenul real
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Testează-ți cunoștințele în condiții similare cu examenul oficial. 
                  Primește feedback instant și identifică zonele de îmbunătățit.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <MockExamSimulator
                  examType={selectedExam?.examType}
                  questions={getExamQuestions(selectedExamType)}
                  timeLimit={selectedExamType === 'evaluare' ? 90 : 120}
                  onComplete={handleMockExamComplete}
                />
              </motion.div>
            </div>
          </section>

          {/* Progress Tracking & Study Plan */}
          <section id="study-plan" className="py-16 px-4 lg:px-6 bg-muted/30">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mb-12"
              >
                <h2 className="font-headline font-semibold text-3xl text-text-primary mb-4">
                  Urmărește-ți progresul
                </h2>
                <p className="text-text-secondary max-w-2xl mx-auto">
                  Planificare inteligentă și monitorizare constantă pentru rezultate optime
                </p>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <ProgressTracker {...getProgressData(selectedExamType)} />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  <StudyPlan
                    examType={selectedExam?.examType}
                    examDate={examDate}
                    currentLevel="Intermediar"
                    targetGrade="9+"
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* Success Stories */}
          <section className="py-16 px-4 lg:px-6">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <SuccessStories stories={getSuccessStories(selectedExamType)} />
              </motion.div>
            </div>
          </section>
        </div>
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