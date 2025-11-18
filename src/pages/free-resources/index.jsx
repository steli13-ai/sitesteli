import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GradeFilter from './components/GradeFilter';
import SubjectFilter from './components/SubjectFilter';
import ResourceGrid from './components/ResourceGrid';
import StatsSection from './components/StatsSection';
import TestimonialCard from './components/TestimonialCard';
import NewsletterSignup from './components/NewsletterSignup';
import PreviewModal from './components/PreviewModal';
import { supabase } from '@/lib/supabase';
import { FREE_RESOURCES_DRIVE_URL } from '@/config/publicLinks';

const FreeResourcesPage = () => {
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [loading, setLoading] = useState(false);
  const [previewResource, setPreviewResource] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [dbResources, setDbResources] = useState(null); // null until we try fetch
  const [useDb, setUseDb] = useState(false);

  // Mock data
  const grades = [
  { value: 'all', label: 'Toate' },
  { value: '5', label: 'Clasa 5' },
  { value: '6', label: 'Clasa 6' },
  { value: '7', label: 'Clasa 7' },
  { value: '8', label: 'Clasa 8' },
  { value: '9', label: 'Clasa 9' },
  { value: '10', label: 'Clasa 10' },
  { value: '11', label: 'Clasa 11' },
  { value: '12', label: 'Clasa 12' }];


  const subjects = [
  { id: 'algebra', name: 'Algebră', icon: 'Calculator' },
  { id: 'geometry', name: 'Geometrie', icon: 'Triangle' },
  { id: 'trigonometry', name: 'Trigonometrie', icon: 'Compass' },
  { id: 'analysis', name: 'Analiză', icon: 'TrendingUp' },
  { id: 'statistics', name: 'Statistică', icon: 'BarChart3' },
  { id: 'probability', name: 'Probabilități', icon: 'Dice6' }];


  const mockResources = [
  {
    id: 1,
    title: `Ecuații de gradul al doilea - Exerciții rezolvate`,
    description: `Colecție completă de exerciții rezolvate pas cu pas pentru ecuațiile de gradul al doilea. Include metode de rezolvare, discriminant și aplicații practice.`,
    type: 'worksheet',
    typeLabel: 'Fișă de lucru',
    grade: '9',
    subject: 'Algebră',
    thumbnail: "https://images.unsplash.com/photo-1675092418398-fb2c7acd8aab",
    thumbnailAlt: 'Mathematical equations and formulas written on white paper with pencil calculations',
    downloads: 2847,
    rating: 4.8,
    pages: 12,
    updatedAt: '2024-10-10T10:00:00Z',
    topics: ['Ecuații de gradul II', 'Discriminant', 'Rezolvare prin factorizare', 'Aplicații practice'],
    previewPages: [
    {
      number: 1,
      image: "https://images.unsplash.com/photo-1511687863516-5efd7f27770a",
      alt: 'First page showing quadratic equation theory with mathematical formulas and examples'
    },
    {
      number: 2,
      image: "https://images.unsplash.com/photo-1645363308298-3a949c8bfd86",
      alt: 'Second page displaying step-by-step solutions to quadratic equations with graphs'
    }]

  },
  {
    id: 2,
    title: `Teorema lui Pitagora - Lecție video interactivă`,
    description: `Învață teorema lui Pitagora prin exemple vizuale și exerciții practice. Video de 25 de minute cu explicații clare și demonstrații.`,
    type: 'video',
    typeLabel: 'Video',
    grade: '8',
    subject: 'Geometrie',
    thumbnail: "https://images.unsplash.com/photo-1631047085941-a29e9730a7e6",
    thumbnailAlt: 'Geometric shapes and triangles drawn on blackboard with chalk showing Pythagorean theorem',
    downloads: 1923,
    rating: 4.9,
    duration: 25,
    updatedAt: '2024-10-08T14:30:00Z',
    topics: ['Teorema lui Pitagora', 'Triunghiuri dreptunghice', 'Aplicații practice', 'Demonstrații geometrice']
  },
  {
    id: 3,
    title: `Funcții liniare - Test de evaluare`,
    description: `Test complet pentru evaluarea cunoștințelor despre funcții liniare. Include 20 de întrebări cu grade diferite de dificultate.`,
    type: 'test',
    typeLabel: 'Test',
    grade: '8',
    subject: 'Algebră',
    thumbnail: "https://images.unsplash.com/photo-1700773427328-e854f6d8e0c5",
    thumbnailAlt: 'Student taking a math test with linear function graphs and equations on paper',
    downloads: 1456,
    rating: 4.6,
    pages: 8,
    updatedAt: '2024-10-05T09:15:00Z',
    topics: ['Funcții liniare', 'Grafice', 'Ecuația dreptei', 'Panta și ordonata la origine']
  },
  {
    id: 4,
    title: `Calculatorul de limite - Instrument interactiv`,
    description: `Instrument interactiv pentru calculul limitelor funcțiilor. Include explicații pas cu pas și vizualizări grafice.`,
    type: 'interactive',
    typeLabel: 'Interactiv',
    grade: '11',
    subject: 'Analiză',
    thumbnail: "https://images.unsplash.com/photo-1629417710389-ffa3d2e953a5",
    thumbnailAlt: 'Computer screen displaying interactive mathematical calculator with limit functions and graphs',
    downloads: 987,
    rating: 4.7,
    updatedAt: '2024-10-12T16:45:00Z',
    topics: ['Limite de funcții', 'Continuitate', 'Forme nedeterminate', 'Regula lui L\'Hôpital']
  },
  {
    id: 5,
    title: `Statistică descriptivă - Exerciții practice`,
    description: `Colecție de exerciții pentru statistică descriptivă cu date reale. Include calcule pentru medie, mediană, mod și dispersie.`,
    type: 'worksheet',
    typeLabel: 'Fișă de lucru',
    grade: '10',
    subject: 'Statistică',
    thumbnail: "https://images.unsplash.com/photo-1582572186057-0e74d3c715ea",
    thumbnailAlt: 'Statistical charts and graphs on paper showing data analysis with calculator and pen',
    downloads: 1234,
    rating: 4.5,
    pages: 15,
    updatedAt: '2024-10-07T11:20:00Z',
    topics: ['Măsuri de tendință centrală', 'Măsuri de dispersie', 'Reprezentări grafice', 'Interpretarea datelor']
  },
  {
    id: 6,
    title: `Probabilități - Lecție video completă`,
    description: `Lecție completă despre probabilități cu exemple din viața reală. Durată: 35 de minute cu exerciții rezolvate.`,
    type: 'video',
    typeLabel: 'Video',
    grade: '9',
    subject: 'Probabilități',
    thumbnail: "https://images.unsplash.com/photo-1596496181871-9681eacf9764",
    thumbnailAlt: 'Dice and probability calculations on whiteboard with mathematical formulas and examples',
    downloads: 1678,
    rating: 4.8,
    duration: 35,
    updatedAt: '2024-10-09T13:10:00Z',
    topics: ['Evenimente elementare', 'Probabilitate clasică', 'Probabilitate condiționată', 'Teorema probabilității totale']
  }];

  // Try to load resources from Supabase if env is configured
  useEffect(() => {
    let mounted = true;
    const fetchResources = async () => {
      try {
        // Minimal probe: if supabase env missing, our client is mock and this will error
        const { data, error } = await supabase
          .from('resources')
          .select('*')
          .eq('published', true)
          .order('created_at', { ascending: false });
        if (!mounted) return;
        if (error) {
          setUseDb(false);
          setDbResources([]);
          return;
        }
        const mapped = (data || []).map(r => ({
          id: r.id,
          title: r.title,
          description: r.description,
          type: r.type,
          typeLabel: r.type === 'worksheet' ? 'Fișă de lucru' : r.type === 'video' ? 'Video' : r.type === 'interactive' ? 'Interactiv' : r.type === 'test' ? 'Test' : 'Resursă',
          grade: r.grade,
          subject: r.subject,
          thumbnail: r.thumbnail_url || 'https://images.unsplash.com/photo-1553877522-43269d4ea984',
          thumbnailAlt: r.title,
          downloads: r.downloads || 0,
          rating: Number(r.rating || 5),
          pages: r.pages || undefined,
          duration: r.duration_minutes || undefined,
          updatedAt: r.updated_at || r.created_at,
          topics: r.topics || [],
          downloadUrl: r.download_url || null,
        }));
        setDbResources(mapped);
        setUseDb(true);
      } catch {
        if (mounted) {
          setUseDb(false);
          setDbResources([]);
        }
      }
    };
    fetchResources();
    return () => { mounted = false; };
  }, []);


  const stats = {
    activeUsers: 12847,
    totalDownloads: 89234,
    totalResources: 456,
    averageRating: 4.7
  };

  const testimonials = [
  {
    id: 1,
    name: 'Maria Popescu',
    role: 'Elevă',
    grade: '9',
    avatar: "https://images.unsplash.com/photo-1652391584869-0408bf759537",
    avatarAlt: 'Professional headshot of young Romanian student with brown hair smiling at camera',
    rating: 5,
    content: `Resursele de aici m-au ajutat enorm să înțeleg ecuațiile de gradul al doilea. Explicațiile sunt foarte clare și exercițiile sunt utile pentru pregătirea la școală.`,
    date: '2024-10-01T10:00:00Z'
  },
  {
    id: 2,
    name: 'Alexandru Ionescu',
    role: 'Părinte',
    grade: '7',
    avatar: "https://images.unsplash.com/photo-1735181094336-7fa757df9622",
    avatarAlt: 'Middle-aged Romanian father with short dark hair in casual shirt smiling warmly',
    rating: 5,
    content: `Fiul meu a început să înțeleagă matematica mult mai bine de când folosim aceste materiale. Sunt foarte bine structurate și ușor de urmărit.`,
    date: '2024-09-28T14:30:00Z'
  },
  {
    id: 3,
    name: 'Elena Dumitrescu',
    role: 'Elevă',
    grade: '11',
    avatar: "https://images.unsplash.com/photo-1648466982925-65dac4ed0814",
    avatarAlt: 'Young Romanian female student with long blonde hair in school uniform smiling confidently',
    rating: 5,
    content: `Videoclipurile sunt fantastice! M-au ajutat să înțeleg limitele și derivatele pentru BAC. Recomand cu încredere!`,
    date: '2024-09-25T16:45:00Z'
  }];


  const resourcesSource = useDb ? (dbResources || []) : mockResources;

  const filteredResources = resourcesSource?.filter((resource) => {
    const gradeMatch = selectedGrade === 'all' || resource?.grade === selectedGrade;
    const subjectMatch = selectedSubjects?.length === 0 || selectedSubjects?.some((subjectId) => {
      const subject = subjects?.find((s) => s?.id === subjectId);
      return subject && resource?.subject?.toLowerCase()?.includes(subject?.name?.toLowerCase());
    });
    const searchMatch = searchQuery === '' ||
    resource?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    resource?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase());

    return gradeMatch && subjectMatch && searchMatch;
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Resurse gratuite matematică',
    description: 'Fișe de lucru, teste și lecții video gratuite pentru clasele 5-12',
    url: 'https://matecusucces.ro/free-resources'
  };

  const sortedResources = [...filteredResources]?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      case 'popular':
        return b?.downloads - a?.downloads;
      case 'rating':
        return b?.rating - a?.rating;
      default:
        return 0;
    }
  });

  const handleDownload = async (resourceId) => {
    // New behavior: always redirect to Drive library
    const target = FREE_RESOURCES_DRIVE_URL || null;
    // Optionally bump counter if we are using DB
    try { if (useDb && resourceId) await supabase.rpc('increment_resource_downloads', { res_id: resourceId }); } catch {}
    if (target) {
      window.open(target, '_blank', 'noopener');
      return;
    }
    // Fallback: open item-specific URL if present, else do nothing
    const list = resourcesSource || [];
    const item = list.find(r => r.id === resourceId);
    if (item?.downloadUrl) window.open(item.downloadUrl, '_blank', 'noopener');
  };

  const handlePreview = (resource) => {
    setPreviewResource(resource);
    setShowPreview(true);
  };

  const handleSearch = (e) => {
    e?.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <>
      <Helmet>
        <title>Resurse Gratuite - Mate cu succes | Materiale educaționale pentru toate clasele</title>
        <meta name="description" content="Descoperă colecția noastră gratuită de resurse matematice pentru clasele 5-12. Fișe de lucru, videoclipuri educative și teste de evaluare." />
        <meta name="keywords" content="resurse matematice gratuite, fișe de lucru matematică, videoclipuri educative, teste matematică, clasa 5-12" />
        <meta property="og:title" content="Resurse Gratuite - Mate cu succes" />
        <meta property="og:description" content="Materiale educaționale gratuite pentru matematică, clasele 5-12" />
        <meta property="og:type" content="website" />
  <link rel="canonical" href="https://matecusucces.ro/free-resources" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
    {/* Header provided by layout */}
        
        {/* Hero Section */}
        <section className="pt-24 pb-16 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full mb-6">
                <Icon name="Gift" size={20} />
                <span className="font-cta font-semibold">Cadouri pentru tine</span>
              </div>
              
              <h1 className="font-headline font-bold text-4xl lg:text-5xl text-text-primary mb-6">
                Resurse <span className="text-primary">Gratuite</span> pentru
                <br />
                <span className="text-secondary">Toate Clasele</span> 🎁
              </h1>
              
              <p className="text-lg text-text-secondary max-w-3xl mx-auto mb-8">
                Descoperă colecția noastră completă de materiale educaționale gratuite. 
                Fișe de lucru, videoclipuri explicative și teste de evaluare pentru clasele 5-12.
              </p>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Icon name="Search" size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" />
                    <input
                      type="text"
                      placeholder="Caută resurse, subiecte sau clase..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e?.target?.value)}
                      className="w-full pl-12 pr-4 py-3 border border-border rounded-lg bg-input text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent" />

                  </div>
                  <Button
                    type="submit"
                    variant="default"
                    iconName="Search"
                    iconPosition="left"
                    className="font-cta font-semibold">

                    Caută
                  </Button>
                </div>
              </form>

              {/* Direct Drive access */}
              {FREE_RESOURCES_DRIVE_URL && (
                <div className="mt-6">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    iconName="FolderOpen"
                    iconPosition="left"
                    className="font-cta font-semibold"
                  >
                    <a href={FREE_RESOURCES_DRIVE_URL} target="_blank" rel="noopener noreferrer">
                      Deschide Biblioteca pe Drive
                    </a>
                  </Button>
                </div>
              )}
            </div>

            {/* Stats Section */}
            <StatsSection stats={stats} />
          </div>
        </section>

        {/* Filters Section */}
        <section className="py-8 px-4 lg:px-6 border-t border-border">
          <div className="max-w-7xl mx-auto space-y-6">
            <GradeFilter
              selectedGrade={selectedGrade}
              onGradeChange={setSelectedGrade}
              grades={grades} />

            
            <SubjectFilter
              selectedSubjects={selectedSubjects}
              onSubjectChange={setSelectedSubjects}
              subjects={subjects} />


            {/* Sort Options */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="font-body font-medium text-text-primary">
                  {sortedResources?.length} resurse găsite
                </span>
                {(selectedGrade !== 'all' || selectedSubjects?.length > 0 || searchQuery) &&
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedGrade('all');
                    setSelectedSubjects([]);
                    setSearchQuery('');
                  }}
                  iconName="X"
                  iconPosition="left"
                  className="text-text-secondary hover:text-text-primary">

                    Resetează filtrele
                  </Button>
                }
              </div>
              
              <div className="flex items-center space-x-3">
                <span className="font-body font-medium text-text-secondary">Sortează după:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="px-3 py-2 border border-border rounded-lg bg-input text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">

                  <option value="newest">Cele mai noi</option>
                  <option value="popular">Cele mai populare</option>
                  <option value="rating">Cel mai bine cotate</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-12 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <ResourceGrid
              resources={sortedResources}
              onDownload={handleDownload}
              onPreview={handlePreview}
              loading={loading} />

          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 px-4 lg:px-6 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-headline font-bold text-3xl text-text-primary mb-4">
                Ce spun elevii și părinții
              </h2>
              <p className="text-text-secondary max-w-2xl mx-auto">
                Mii de familii au descoperit deja bucuria matematicii prin resursele noastre gratuite.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials?.map((testimonial) =>
              <TestimonialCard key={testimonial?.id} testimonial={testimonial} />
              )}
            </div>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <NewsletterSignup />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 lg:px-6 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-headline font-bold text-3xl text-text-primary mb-4">
              Vrei mai multe resurse premium?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Descoperă cursurile noastre complete cu explicații video detaliate, 
              exerciții interactive și suport personalizat.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                variant="default"
                size="lg"
                iconName="BookOpen"
                iconPosition="left"
                className="font-cta font-semibold">
                <a href="/course-catalog">Explorează Cursurile</a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                iconName="Users"
                iconPosition="left"
                className="font-cta font-semibold">
                <a href="/parent-resources">Resurse pentru Părinți</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Preview Modal */}
        <PreviewModal
          resource={previewResource}
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          onDownload={handleDownload} />


        {/* Mathematical Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-10 text-primary/5 text-6xl font-bold math-symbol-float">
            ∫
          </div>
          <div className="absolute top-1/3 right-20 text-secondary/5 text-5xl font-bold math-symbol-float">
            Σ
          </div>
          <div className="absolute bottom-1/4 left-1/4 text-accent/5 text-4xl font-bold math-symbol-float">
            π
          </div>
          <div className="absolute bottom-1/3 right-1/3 text-warning/5 text-5xl font-bold math-symbol-float">
            √
          </div>
        </div>
      </div>
    </>);

};

export default FreeResourcesPage;