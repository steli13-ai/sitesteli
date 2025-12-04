import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Import components
import CourseCard from './components/CourseCard';
import CourseFilters from './components/CourseFilters';
import CoursePreviewModal from './components/CoursePreviewModal';
import CourseSortOptions from './components/CourseSortOptions';
import CourseListView from './components/CourseListView';
import RecommendedCourses from './components/RecommendedCourses';
import CourseStats from './components/CourseStats';
import { DEMO_VIDEO_URL } from '../../config/publicLinks';
import StructuredData from '@/components/StructuredData';
import { buildOrganization, buildItemList, buildCourse } from '@/utils/structuredData';

const CourseCatalog = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [filters, setFilters] = useState({
    search: '',
    grade: 'all',
    category: 'all',
    difficulty: 'all',
    price: 'all',
    isNew: false,
    isBestseller: false,
    hasPreview: false
  });

  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;

  // Mock courses data
  const mockCourses = [
  {
    id: 1,
    title: "Algebră pentru Clasa 9 - Fundamente Solide",
    description: "Învață conceptele fundamentale de algebră cu explicații pas cu pas și exerciții practice adaptate pentru clasa a 9-a.",
    fullDescription: `Acest curs comprehensive de algebră pentru clasa a 9-a îți oferă o bază solidă în matematică prin explicații clare și exerciții practice. Vei învăța să rezolvi ecuații, să lucrezi cu funcții și să înțelegi conceptele fundamentale care îți vor fi utile pe tot parcursul liceului.\n\nCursul este structurat progresiv, începând cu concepte simple și avansând treptat către probleme mai complexe. Fiecare lecție include exemple practice și exerciții pentru consolidarea cunoștințelor.`,
    image: "https://images.unsplash.com/photo-1596496181871-9681eacf9764",
    imageAlt: "Student solving algebraic equations on whiteboard with colorful mathematical formulas",
    grade: 9,
    category: 'algebra',
    difficulty: 'Începător',
    duration: '8 săptămâni',
    lessonsCount: 24,
    studentsCount: '1,245',
    rating: 4.8,
    reviewsCount: 156,
    price: 89,
    originalPrice: 129,
    isNew: true,
    isBestseller: false,
    isPopular: true,
    hasPreview: true,
    prerequisites: ['Matematică clasa 8', 'Operații cu numere reale'],
    outcomes: [
    'Rezolvarea ecuațiilor de gradul I și II',
    'Lucrul cu funcții liniare și pătratice',
    'Înțelegerea sistemelor de ecuații',
    'Aplicarea teoremelor fundamentale',
    'Rezolvarea problemelor practice'],

    instructor: {
      name: 'Prof. Maria Popescu',
      title: 'Profesor de matematică, 15 ani experiență',
      avatar: "https://images.unsplash.com/photo-1600567422104-25b72f7035cc",
      avatarAlt: 'Professional headshot of middle-aged woman with brown hair in blue blazer',
      experience: '15 ani',
      studentsCount: '3,200',
      rating: 4.9,
      bio: 'Profesor cu experiență vastă în predarea matematicii la nivel liceal. Specializată în algebră și geometrie, cu o pasiune pentru a face matematica accesibilă tuturor elevilor.',
      qualifications: [
      'Licență în Matematică - Universitatea București',
      'Master în Didactica Matematicii',
      'Certificare în Tehnologii Educaționale',
      'Autor a 3 manuale de matematică']

    },
    curriculum: [
    {
      title: 'Introducere în Algebră',
      description: 'Concepte fundamentale și notații algebrice',
      duration: '1 săptămână',
      lessons: [
      { title: 'Ce este algebra?', duration: '15 min' },
      { title: 'Notații și simboluri', duration: '20 min' },
      { title: 'Operații de bază', duration: '25 min' }]

    },
    {
      title: 'Ecuații Liniare',
      description: 'Rezolvarea ecuațiilor de gradul întâi',
      duration: '2 săptămâni',
      lessons: [
      { title: 'Ecuații simple', duration: '20 min' },
      { title: 'Ecuații cu paranteze', duration: '25 min' },
      { title: 'Probleme practice', duration: '30 min' }]

    }],

    reviews: [
    {
      name: 'Ana Gheorghe',
      avatar: "https://images.unsplash.com/photo-1629148874711-0367d3495c91",
      avatarAlt: 'Young woman with long blonde hair smiling at camera',
      rating: 5,
      date: '15 octombrie 2025',
      comment: 'Cursul este foarte bine structurat și explicațiile sunt clare. M-a ajutat enorm să înțeleg algebra!',
      verified: true
    },
    {
      name: 'Mihai Ionescu',
      avatar: "https://images.unsplash.com/photo-1595653819970-33d3338dcb03",
      avatarAlt: 'Young man with short dark hair in casual shirt',
      rating: 4,
      date: '12 octombrie 2025',
      comment: 'Foarte util pentru pregătirea la examene. Recomand!',
      verified: true
    }],

    progress: 65
  },
  {
    id: 2,
    title: "Geometrie Plană - Clasa 10",
    description: "Explorează lumea geometriei plane cu demonstrații interactive și probleme rezolvate pas cu pas.",
    fullDescription: `Cursul de geometrie plană pentru clasa a 10-a te introduce în fascinanta lume a formelor geometrice și a relațiilor spațiale. Vei învăța să demonstrezi teoreme, să calculezi arii și perimetri, și să rezolvi probleme complexe de geometrie.\n\nPrin exerciții interactive și vizualizări 3D, conceptele abstracte devin ușor de înțeles și de aplicat în situații practice.`,
    image: "https://images.unsplash.com/photo-1684175890099-f0507537103a",
    imageAlt: "Geometric shapes and mathematical instruments on desk with compass and ruler",
    grade: 10,
    category: 'geometry',
    difficulty: 'Intermediar',
    duration: '10 săptămâni',
    lessonsCount: 32,
    studentsCount: '987',
    rating: 4.7,
    reviewsCount: 89,
    price: 0,
    isNew: false,
    isBestseller: true,
    isPopular: false,
    hasPreview: true,
    prerequisites: ['Geometrie clasa 9', 'Trigonometrie de bază'],
    outcomes: [
    'Demonstrarea teoremelor geometrice',
    'Calculul ariilor și perimetrilor',
    'Rezolvarea problemelor de construcții',
    'Aplicarea teoremei lui Pitagora',
    'Lucrul cu cercuri și poligoane'],

    instructor: {
      name: 'Prof. Alexandru Radu',
      title: 'Specialist în geometrie, 12 ani experiență',
      avatar: "https://images.unsplash.com/photo-1585066047759-3438c34cf676",
      avatarAlt: 'Professional headshot of middle-aged man with beard in dark suit',
      experience: '12 ani',
      studentsCount: '2,800',
      rating: 4.8,
      bio: 'Profesor pasionat de geometrie cu o abordare inovatoare în predare. Utilizează tehnologii moderne pentru a face geometria accesibilă și interesantă.',
      qualifications: [
      'Licență în Matematică - Universitatea Babeș-Bolyai',
      'Doctorat în Geometrie Diferențială',
      'Certificare în Educație Digitală',
      'Premiul pentru Excelență în Predare 2023']

    },
    curriculum: [
    {
      title: 'Puncte, Drepte și Plane',
      description: 'Elementele fundamentale ale geometriei',
      duration: '1.5 săptămâni',
      lessons: [
      { title: 'Axiomele geometriei', duration: '18 min' },
      { title: 'Relații între drepte', duration: '22 min' },
      { title: 'Unghiuri și măsurarea lor', duration: '25 min' }]

    }],

    reviews: [
    {
      name: 'Elena Vasile',
      avatar: "https://images.unsplash.com/photo-1679340587871-52c2ed017076",
      avatarAlt: 'Young woman with curly brown hair wearing glasses',
      rating: 5,
      date: '14 octombrie 2025',
      comment: 'Explicațiile vizuale m-au ajutat să înțeleg geometria mult mai bine!',
      verified: true
    }]

  },
  {
    id: 3,
    title: "Analiză Matematică - Clasa 12",
    description: "Pregătește-te pentru BAC cu concepte avansate de analiză matematică și calcul diferențial.",
    fullDescription: `Cursul de analiză matematică pentru clasa a 12-a te pregătește complet pentru examenul de bacalaureat. Vei învăța limite, derivate, integrale și aplicațiile lor practice.\n\nCursul include numeroase exerciții rezolvate din examene anterioare și strategii de rezolvare pentru problemele complexe de la BAC.`,
    image: "https://images.unsplash.com/photo-1631047085941-a29e9730a7e6",
    imageAlt: "Advanced mathematical formulas and calculus equations written on blackboard",
    grade: 12,
    category: 'analysis',
    difficulty: 'Avansat',
    duration: '12 săptămâni',
    lessonsCount: 40,
    studentsCount: '756',
    rating: 4.9,
    reviewsCount: 124,
    price: 149,
    originalPrice: 199,
    isNew: false,
    isBestseller: true,
    isPopular: true,
    hasPreview: true,
    prerequisites: ['Funcții clasa 11', 'Trigonometrie avansată', 'Algebră solidă'],
    outcomes: [
    'Calculul limitelor și continuității',
    'Derivarea funcțiilor complexe',
    'Integrarea și aplicațiile ei',
    'Rezolvarea problemelor de la BAC',
    'Studiul funcțiilor complete'],

    instructor: {
      name: 'Prof. Dr. Cristina Marin',
      title: 'Doctor în matematică, specialist BAC',
      avatar: "https://images.unsplash.com/photo-1680431975062-498123a530dd",
      avatarAlt: 'Professional headshot of woman with short dark hair in academic setting',
      experience: '18 ani',
      studentsCount: '4,500',
      rating: 4.9,
      bio: 'Doctor în matematică cu specializare în analiză matematică. Expert în pregătirea pentru examenul de bacalaureat cu o rată de promovabilitate de 98%.',
      qualifications: [
      'Doctorat în Analiză Matematică - Universitatea București',
      'Autor a 5 cărți de matematică pentru liceu',
      'Evaluator oficial la examenul de bacalaureat',
      'Premiul pentru Excelență Academică 2024']

    },
    curriculum: [
    {
      title: 'Limite și Continuitate',
      description: 'Concepte fundamentale de analiză',
      duration: '2 săptămâni',
      lessons: [
      { title: 'Definiția limitei', duration: '25 min' },
      { title: 'Calculul limitelor', duration: '30 min' },
      { title: 'Continuitatea funcțiilor', duration: '28 min' }]

    }],

    reviews: [
    {
      name: 'Andrei Stoica',
      avatar: "https://images.unsplash.com/photo-1723189520204-0716614de54a",
      avatarAlt: 'Young man with short brown hair in casual blue shirt',
      rating: 5,
      date: '13 octombrie 2025',
      comment: 'Cel mai bun curs pentru pregătirea la BAC! Am luat nota 10!',
      verified: true
    }]

  },
  {
    id: 4,
    title: "Statistică și Probabilități - Clasa 11",
    description: "Înțelege conceptele de statistică și probabilitate prin exemple practice și aplicații reale.",
    fullDescription: `Cursul de statistică și probabilități pentru clasa a 11-a îți oferă instrumentele necesare pentru a înțelege și analiza datele din lumea reală. Vei învăța să calculezi probabilități, să interpretezi grafice și să faci predicții bazate pe date.\n\nPrin exerciții practice și studii de caz, vei vedea cum se aplică aceste concepte în viața de zi cu zi, de la sondaje de opinie la analize de piață.`,
    image: "https://images.unsplash.com/photo-1663780852957-0e1f8bda3d0d",
    imageAlt: "Statistical charts and graphs displayed on computer screen with data analysis",
    grade: 11,
    category: 'statistics',
    difficulty: 'Intermediar',
    duration: '6 săptămâni',
    lessonsCount: 20,
    studentsCount: '543',
    rating: 4.6,
    reviewsCount: 67,
    price: 75,
    originalPrice: 95,
    isNew: true,
    isBestseller: false,
    isPopular: false,
    hasPreview: true,
    prerequisites: ['Matematică clasa 10', 'Noțiuni de algebră'],
    outcomes: [
    'Calculul probabilităților simple și compuse',
    'Interpretarea datelor statistice',
    'Crearea și citirea graficelor',
    'Aplicarea teoremelor de probabilitate',
    'Analiza studiilor de caz reale'],

    instructor: {
      name: 'Prof. Ioana Dobre',
      title: 'Specialist în statistică aplicată',
      avatar: "https://images.unsplash.com/photo-1648466982925-65dac4ed0814",
      avatarAlt: 'Professional headshot of young woman with blonde hair in business attire',
      experience: '8 ani',
      studentsCount: '1,800',
      rating: 4.7,
      bio: 'Profesor cu experiență în statistică aplicată și analiză de date. Pasionată de a face statisticile accesibile și relevante pentru elevi.',
      qualifications: [
      'Master în Statistică Aplicată',
      'Certificare în Analiză de Date',
      'Experiență în consultanță statistică',
      'Autor de articole în reviste de specialitate']

    },
    curriculum: [
    {
      title: 'Introducere în Statistică',
      description: 'Concepte de bază și terminologie',
      duration: '1 săptămână',
      lessons: [
      { title: 'Ce este statisticile?', duration: '15 min' },
      { title: 'Tipuri de date', duration: '18 min' },
      { title: 'Colectarea datelor', duration: '20 min' }]

    }],

    reviews: [
    {
      name: 'Radu Popa',
      avatar: "https://images.unsplash.com/photo-1671818238700-02e165240692",
      avatarAlt: 'Young man with glasses and dark hair in casual shirt',
      rating: 4,
      date: '11 octombrie 2025',
      comment: 'Foarte practic și ușor de înțeles. Recomand!',
      verified: true
    }]

  },
  {
    id: 5,
    title: "Trigonometrie Avansată - Clasa 11",
    description: "Stăpânește funcțiile trigonometrice și aplicațiile lor în rezolvarea problemelor complexe.",
    fullDescription: `Cursul de trigonometrie avansată pentru clasa a 11-a te introduce în lumea fascinantă a funcțiilor trigonometrice și a aplicațiilor lor practice. Vei învăța să rezolvi ecuații trigonometrice complexe și să aplici aceste cunoștințe în probleme de geometrie și fizică.\n\nCursul include numeroase exemple practice și aplicații din viața reală, de la calculul înălțimilor la analiza undelor sonore.`,
    image: "https://images.unsplash.com/photo-1563087582-afdc8b38018e",
    imageAlt: "Trigonometric circle and sine cosine functions drawn on whiteboard with colored markers",
    grade: 11,
    category: 'trigonometry',
    difficulty: 'Avansat',
    duration: '8 săptămâni',
    lessonsCount: 28,
    studentsCount: '432',
    rating: 4.8,
    reviewsCount: 54,
    price: 95,
    originalPrice: 125,
    isNew: false,
    isBestseller: false,
    isPopular: true,
    hasPreview: true,
    prerequisites: ['Geometrie clasa 10', 'Funcții de bază', 'Algebră solidă'],
    outcomes: [
    'Înțelegerea funcțiilor trigonometrice',
    'Rezolvarea ecuațiilor trigonometrice',
    'Aplicarea identităților trigonometrice',
    'Calculul în triunghiuri oarecare',
    'Aplicații practice în fizică'],

    instructor: {
      name: 'Prof. Mihai Georgescu',
      title: 'Expert în trigonometrie și geometrie',
      avatar: "https://images.unsplash.com/photo-1602872246746-7578684cfc96",
      avatarAlt: 'Professional headshot of middle-aged man with gray hair in formal attire',
      experience: '20 ani',
      studentsCount: '3,500',
      rating: 4.8,
      bio: 'Profesor cu experiență vastă în predarea trigonometriei și geometriei. Cunoscut pentru abordarea sa practică și pentru capacitatea de a face conceptele complexe ușor de înțeles.',
      qualifications: [
      'Licență în Matematică - Universitatea Politehnica',
      'Master în Geometrie și Trigonometrie',
      'Autor a 2 manuale de trigonometrie',
      'Consultant pentru olimpiade de matematică']

    },
    curriculum: [
    {
      title: 'Funcții Trigonometrice',
      description: 'Sinus, cosinus, tangentă și aplicațiile lor',
      duration: '2 săptămâni',
      lessons: [
      { title: 'Cercul trigonometric', duration: '22 min' },
      { title: 'Funcțiile sin, cos, tg', duration: '25 min' },
      { title: 'Graficele funcțiilor', duration: '28 min' }]

    }],

    reviews: [
    {
      name: 'Mara Constantinescu',
      avatar: "https://images.unsplash.com/photo-1564581335312-88ba5f1ae29f",
      avatarAlt: 'Young woman with long dark hair smiling at camera',
      rating: 5,
      date: '10 octombrie 2025',
      comment: 'Explicațiile sunt foarte clare și exercițiile sunt foarte utile!',
      verified: true
    }]

  },
  {
    id: 6,
    title: "Matematică pentru Evaluarea Națională - Clasa 8",
    description: "Pregătire completă pentru Evaluarea Națională cu exerciții din examene anterioare și strategii de rezolvare.",
    fullDescription: `Cursul de pregătire pentru Evaluarea Națională la matematică îți oferă toate instrumentele necesare pentru a obține o notă excelentă. Vei exersa cu subiecte din anii anteriori și vei învăța strategii eficiente de rezolvare.\n\nCursul acoperă toate capitolele din programa de clasa a 8-a și include simulări complete de examen pentru a te obișnui cu formatul și timpul alocat.`,
    image: "https://images.unsplash.com/photo-1575380067530-f9011a5af3ec",
    imageAlt: "Student taking exam with mathematical problems and answer sheets on desk",
    grade: 8,
    category: 'algebra',
    difficulty: 'Intermediar',
    duration: '10 săptămâni',
    lessonsCount: 35,
    studentsCount: '1,876',
    rating: 4.9,
    reviewsCount: 234,
    price: 120,
    originalPrice: 150,
    isNew: false,
    isBestseller: true,
    isPopular: true,
    hasPreview: true,
    prerequisites: ['Matematică clasele 5-7', 'Operații cu fracții'],
    outcomes: [
    'Rezolvarea tuturor tipurilor de exerciții de la EN',
    'Strategii de gestionare a timpului la examen',
    'Tehnici de verificare a rezultatelor',
    'Pregătire psihologică pentru examen',
    'Simulări complete de examen'],

    instructor: {
      name: 'Prof. Carmen Ionescu',
      title: 'Specialist Evaluare Națională, 25 ani experiență',
      avatar: "https://images.unsplash.com/photo-1604953973394-2ca0f800a011",
      avatarAlt: 'Professional headshot of experienced female teacher with gray hair in formal attire',
      experience: '25 ani',
      studentsCount: '8,500',
      rating: 4.9,
      bio: 'Profesor cu experiență vastă în pregătirea elevilor pentru Evaluarea Națională. Rata de promovabilitate a elevilor săi este de 99%, cu o medie de 9.2.',
      qualifications: [
      'Licență în Matematică - Universitatea București',
      'Evaluator oficial la Evaluarea Națională',
      'Autor a 4 culegeri pentru EN',
      'Premiul pentru Excelență în Educație 2023']

    },
    curriculum: [
    {
      title: 'Recapitulare Algebră',
      description: 'Toate conceptele de algebră pentru EN',
      duration: '3 săptămâni',
      lessons: [
      { title: 'Operații cu numere', duration: '20 min' },
      { title: 'Ecuații și sisteme', duration: '25 min' },
      { title: 'Funcții liniare', duration: '22 min' }]

    }],

    reviews: [
    {
      name: 'Alexia Popescu',
      avatar: "https://images.unsplash.com/photo-1566631267991-65e87613d424",
      avatarAlt: 'Young teenage girl with long brown hair smiling confidently',
      rating: 5,
      date: '9 octombrie 2025',
      comment: 'Am luat 9.85 la EN datorită acestui curs! Mulțumesc!',
      verified: true
    }]

  }];


  // Recommended courses data
  const recommendedCourses = [
  {
    id: 101,
    title: "Ecuații de gradul II - Metode rapide",
    image: "https://images.unsplash.com/photo-1631047085941-a29e9730a7e6",
    imageAlt: "Mathematical equations and formulas written on chalkboard with colorful chalk",
    grade: 9,
    category: 'algebra',
    duration: '3 săptămâni',
    rating: 4.7,
    price: 45,
    matchPercentage: 95,
    recommendationReason: "Bazat pe progresul tău în algebră"
  },
  {
    id: 102,
    title: "Geometrie în spațiu - Vizualizare 3D",
    image: "https://images.unsplash.com/photo-1563520239648-a24e51d4b570",
    imageAlt: "3D geometric shapes and models displayed on modern desk setup",
    grade: 11,
    category: 'geometry',
    duration: '4 săptămâni',
    rating: 4.8,
    price: 0,
    matchPercentage: 88,
    recommendationReason: "Complementar cu cursurile tale actuale"
  },
  {
    id: 103,
    title: "Funcții exponențiale și logaritmice",
    image: "https://images.unsplash.com/photo-1586448317606-cb1ec00298fc",
    imageAlt: "Exponential and logarithmic function graphs plotted on coordinate system",
    grade: 12,
    category: 'analysis',
    duration: '5 săptămâni',
    rating: 4.9,
    price: 85,
    matchPercentage: 92,
    recommendationReason: "Pregătire pentru BAC"
  }];


  // Filter and sort courses
  const filteredAndSortedCourses = useMemo(() => {
    let filtered = mockCourses?.filter((course) => {
      // Search filter
      if (filters?.search && !course?.title?.toLowerCase()?.includes(filters?.search?.toLowerCase()) &&
      !course?.description?.toLowerCase()?.includes(filters?.search?.toLowerCase())) {
        return false;
      }

      // Grade filter
      if (filters?.grade !== 'all' && course?.grade?.toString() !== filters?.grade) {
        return false;
      }

      // Category filter
      if (filters?.category !== 'all' && course?.category !== filters?.category) {
        return false;
      }

      // Difficulty filter
      if (filters?.difficulty !== 'all' && course?.difficulty !== filters?.difficulty) {
        return false;
      }

      // Price filter
      if (filters?.price !== 'all') {
        if (filters?.price === 'free' && course?.price !== 0) return false;
        if (filters?.price === '0-50' && (course?.price === 0 || course?.price > 50)) return false;
        if (filters?.price === '50-100' && (course?.price < 50 || course?.price > 100)) return false;
        if (filters?.price === '100+' && course?.price < 100) return false;
      }

      // Special filters
      if (filters?.isNew && !course?.isNew) return false;
      if (filters?.isBestseller && !course?.isBestseller) return false;
      if (filters?.hasPreview && !course?.hasPreview) return false;

      return true;
    });

    // Sort courses
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return parseInt(b?.studentsCount?.replace(',', '')) - parseInt(a?.studentsCount?.replace(',', ''));
        case 'rating':
          return b?.rating - a?.rating;
        case 'newest':
          return b?.isNew - a?.isNew;
        case 'price-low':
          return a?.price - b?.price;
        case 'price-high':
          return b?.price - a?.price;
        case 'alphabetical':
          return a?.title?.localeCompare(b?.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [filters, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedCourses?.length / coursesPerPage);
  const paginatedCourses = filteredAndSortedCourses?.slice(
    (currentPage - 1) * coursesPerPage,
    currentPage * coursesPerPage
  );

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      grade: 'all',
      category: 'all',
      difficulty: 'all',
      price: 'all',
      isNew: false,
      isBestseller: false,
      hasPreview: false
    });
    setCurrentPage(1);
  };

  const handleEnroll = (course) => {
    // Build a checkout path using the premium_cursuri plan with course overrides
    const params = new URLSearchParams();
    params.set('plan', 'premium_cursuri');
    // Pass course context so checkout can render correctly
    if (course?.id != null) params.set('courseId', String(course.id));
    if (course?.title) params.set('courseTitle', course.title);
    if (course?.duration) params.set('duration', course.duration);
    if (course?.price != null) params.set('price', String(course.price));

    const checkoutPath = `/checkout?${params.toString()}`;

    if (!authLoading && !user) {
      // Redirect to account login and back to checkout afterwards
      navigate(`/account?auth=login&redirect=${encodeURIComponent(checkoutPath)}`);
      return;
    }

    navigate(checkoutPath);
  };

  const handlePreview = (course) => {
    setSelectedCourse(course);
    setIsPreviewOpen(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Catalog Cursuri - Mate cu Succes | Alege-ți aventura matematică</title>
        <meta name="description" content="Descoperă catalogul complet de cursuri Mate cu Succes: algebră, geometrie, analiză, statistica, pregătire Evaluare Națională și BAC. Progresează structurat cu profesori experimentați." />
        <meta name="keywords" content="catalog cursuri matematică, pregătire BAC, pregătire Evaluare Națională, curs algebră, curs geometrie, curs analiză" />
        <link rel="canonical" href="https://matecusucces.ro/course-catalog" />
        <meta property="og:title" content="Catalog Cursuri - Mate cu Succes" />
        <meta property="og:description" content="Alege cursul perfect pentru obiectivul tău: peste 100 de lecții structurate și simulări de examen." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://matecusucces.ro/course-catalog" />
      </Helmet>
      <StructuredData data={buildOrganization({})} />
      <StructuredData data={buildItemList({
        items: (mockCourses || []).map(c => buildCourse({ name: c.title, description: c.description }))
      })} />
      <div className="min-h-screen bg-background">
  {/* Header provided by layout */}
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5 relative overflow-hidden">
          <div className="container mx-auto px-4 lg:px-6">
            <motion.div
              className="text-center max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}>

              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Icon name="BookOpen" size={16} />
                <span style={{ color: '#98FB98' }}>Alege-ți aventura matematică</span>
              </div>
              
              <h1 className="font-headline font-bold text-4xl lg:text-6xl text-text-primary mb-6">
                Catalog <span className="text-primary">Cursuri</span>
              </h1>
              
              <p className="text-text-secondary text-lg lg:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
                Descoperă cursurile noastre comprehensive de matematică pentru clasele 5-12. 
                De la concepte fundamentale la pregătirea pentru examene, avem cursul perfect pentru tine.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-cta font-semibold">

                  <Icon name="Search" size={20} className="mr-2" />
                  Explorează cursurile
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="font-cta">
                  <a href={DEMO_VIDEO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center">
                    <Icon name="Play" size={20} className="mr-2" />
                    Vezi demo gratuit
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>

          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 text-primary/10 text-6xl font-bold math-symbol-float">
              ∫
            </div>
            <div className="absolute top-32 right-20 text-secondary/10 text-5xl font-bold math-symbol-float">
              Σ
            </div>
            <div className="absolute bottom-20 left-1/4 text-accent/10 text-4xl font-bold math-symbol-float">
              π
            </div>
            <div className="absolute bottom-32 right-1/3 text-trust/10 text-5xl font-bold math-symbol-float">
              √
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 lg:px-6">
            {/* Course Stats */}
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}>

              <CourseStats
                totalCourses={mockCourses?.length}
                filteredCount={filteredAndSortedCourses?.length}
                filters={filters} />

            </motion.div>

            {/* Recommended Courses */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}>

              <RecommendedCourses
                courses={recommendedCourses}
                onEnroll={handleEnroll}
                onPreview={handlePreview} />

            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Filters Sidebar */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}>

                <CourseFilters
                  filters={filters}
                  onFiltersChange={handleFiltersChange}
                  onClearFilters={handleClearFilters} />

              </motion.div>

              {/* Courses Content */}
              <div className="lg:col-span-3">
                {/* Sort Options */}
                <motion.div
                  className="mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}>

                  <CourseSortOptions
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    viewMode={viewMode}
                    onViewModeChange={setViewMode} />

                </motion.div>

                {/* Courses Grid/List */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}>

                  {paginatedCourses?.length > 0 ?
                  <>
                      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8' : 'space-y-6 mb-8'
                    }>
                        {paginatedCourses?.map((course, index) =>
                      <motion.div
                        key={course?.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}>

                            {viewMode === 'grid' ?
                        <CourseCard
                          course={course}
                          onEnroll={handleEnroll}
                          onPreview={handlePreview} /> :


                        <CourseListView
                          course={course}
                          onEnroll={handleEnroll}
                          onPreview={handlePreview} />

                        }
                          </motion.div>
                      )}
                      </div>

                      {/* Pagination */}
                      {totalPages > 1 &&
                    <div className="flex items-center justify-center space-x-2">
                          <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}>

                            <Icon name="ChevronLeft" size={16} />
                          </Button>
                          
                          {[...Array(totalPages)]?.map((_, index) => {
                        const page = index + 1;
                        return (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="sm"
                            onClick={() => handlePageChange(page)}
                            className={currentPage === page ? "bg-primary text-primary-foreground" : ""}>

                                {page}
                              </Button>);

                      })}
                          
                          <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}>

                            <Icon name="ChevronRight" size={16} />
                          </Button>
                        </div>
                    }
                    </> :

                  <div className="text-center py-12">
                      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="Search" size={32} className="text-muted-foreground" />
                      </div>
                      <h3 className="font-headline font-bold text-xl text-text-primary mb-2">
                        Nu am găsit cursuri
                      </h3>
                      <p className="text-text-secondary mb-6">
                        Încearcă să modifici filtrele pentru a găsi cursuri potrivite.
                      </p>
                      <Button
                      variant="outline"
                      onClick={handleClearFilters}>

                        <Icon name="RotateCcw" size={16} className="mr-2" />
                        Resetează filtrele
                      </Button>
                    </div>
                  }
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Course Preview Modal */}
        <CoursePreviewModal
          course={selectedCourse}
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
          onEnroll={handleEnroll} />


        {/* Floating Help Button */}
        <motion.div
          className="fixed bottom-6 right-6 z-40"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: "spring" }}>

          <Button
            variant="default"
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-full w-14 h-14 p-0 warm-shadow-lg"
            title="Ajutor">

            <Icon name="HelpCircle" size={24} />
          </Button>
        </motion.div>
      </div>
    </>
  );

};

export default CourseCatalog;