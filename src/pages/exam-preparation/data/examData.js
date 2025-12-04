// Centralized data & helpers for exam preparation page
// Extracted from original monolithic index.jsx for maintainability.

export const examTypes = [
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

export function getExamQuestions(examType) {
  if (examType === 'evaluare') {
    return [
      { id: 1, question: 'Calculați valoarea expresiei: 2x + 3y, pentru x = 4 și y = 2.', options: ['14', '16', '18', '20'], correctAnswer: '14' },
      { id: 2, question: 'Care este soluția ecuației: 3x - 7 = 8?', options: ['x = 3', 'x = 5', 'x = 7', 'x = 15'], correctAnswer: 'x = 5' },
      { id: 3, question: 'Aria unui triunghi cu baza de 8 cm și înălțimea de 6 cm este:', options: ['24 cm²', '28 cm²', '32 cm²', '48 cm²'], correctAnswer: '24 cm²' }
    ];
  }
  return [
    { id: 1, question: 'Calculați limita: lim(x→∞) (3x² + 2x - 1)/(x² + 1)', options: ['0', '1', '3', '∞'], correctAnswer: '3' },
    { id: 2, question: 'Derivata funcției f(x) = ln(x² + 1) este:', options: ['2x/(x² + 1)', '1/(x² + 1)', '2x', 'x/(x² + 1)'], correctAnswer: '2x/(x² + 1)' },
    { id: 3, question: 'Integrala ∫x·e^x dx este:', options: ['e^x(x-1) + C', 'e^x(x+1) + C', 'x·e^x + C', 'e^x + C'], correctAnswer: 'e^x(x-1) + C' }
  ];
}

export function getProgressData(examType) {
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
      strengths: ['Ecuații de gradul I', 'Operații cu fracții', 'Calculul ariilor'],
      weaknesses: ['Funcții de gradul II', 'Geometrie în spațiu', 'Probabilități condiționate']
    };
  }
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
    strengths: ['Limite și continuitate', 'Derivate', 'Ecuații diferențiale'],
    weaknesses: ['Integrale complexe', 'Geometrie analitică', 'Progresii matematice']
  };
}

export function getSuccessStories(examType) {
  const allStories = [
    {
      name: 'Alexandru Ionescu',
      examType: 'Evaluarea Națională',
      year: '2024',
      avatar: 'https://images.unsplash.com/photo-1628479104885-c21cbb899f54',
      avatarAlt: 'Professional headshot of young man with brown hair wearing blue shirt',
      gradeBefore: 6.2,
      gradeAfter: 9.1,
      testimonial: 'Înainte să încep cursurile Mate cu succes, matematica era coșmarul meu. Acum am obținut 9.1 la Evaluarea Națională și mă pregătesc pentru liceu cu încredere!',
      studyDuration: '4 luni',
      coursesCompleted: 3,
      subjects: ['Algebră', 'Geometrie']
    },
    {
      name: 'Elena Marinescu',
      examType: 'Bacalaureat',
      year: '2024',
      avatar: 'https://images.unsplash.com/photo-1668911240686-fe09797b3043',
      avatarAlt: 'Professional headshot of young woman with long brown hair wearing white blouse',
      gradeBefore: 5.8,
      gradeAfter: 8.7,
      testimonial: 'Metodologia Mate cu succes m-a ajutat să înțeleg conceptele pe care le evitam de ani de zile. Bacul nu mai pare imposibil!',
      studyDuration: '6 luni',
      coursesCompleted: 5,
      subjects: ['Matematică M1', 'Matematică M2']
    },
    {
      name: 'Andrei Constantinescu',
      examType: 'Evaluarea Națională',
      year: '2024',
      avatar: 'https://images.unsplash.com/photo-1669390581296-0ff052a38e31',
      avatarAlt: 'Professional headshot of teenage boy with short dark hair wearing gray sweater',
      gradeBefore: 7.1,
      gradeAfter: 9.5,
      testimonial: 'Simulările și feedback-ul constant m-au pregătit perfect pentru examen. Am depășit toate așteptările!',
      studyDuration: '3 luni',
      coursesCompleted: 2,
      subjects: ['Algebră', 'Funcții']
    }
  ];
  if (!examType) return allStories;
  return allStories.filter(story => story.examType.toLowerCase().includes(examType === 'evaluare' ? 'națională' : 'bacalaureat'));
}
