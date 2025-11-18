import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const TestimonialShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);

  const categories = [
  { id: 'all', label: 'Toate Poveștile', count: 24 },
  { id: 'anxiety', label: 'Depășirea Anxietății', count: 8 },
  { id: 'grades', label: 'Îmbunătățirea Notelor', count: 12 },
  { id: 'confidence', label: 'Creșterea Încrederii', count: 9 },
  { id: 'exams', label: 'Succese la Examene', count: 6 }];


  const testimonials = [
  {
    id: 1,
    category: 'anxiety',
    parent: {
      name: "Maria Ionescu",
      avatar: "https://images.unsplash.com/photo-1592155309727-60fde6f7d12c",
      avatarAlt: "Professional woman with brown hair smiling warmly at camera",
      location: "București",
      childGrade: "Clasa 8"
    },
    child: {
      name: "Ana Maria",
      beforeGrade: 6.2,
      afterGrade: 8.7,
      improvement: "+2.5"
    },
  story: `Înainte de Mate cu succes, Ana Maria plângea în fiecare seară când trebuia să facă temele la matematică. Avea atacuri de panică înainte de teste și refuza să meargă la școală în zilele cu matematică.\n\nDupă doar 2 luni cu Mate cu succes, totul s-a schimbat. Metodele lor blânde și progresive au ajutat-o să înțeleagă că matematica nu este dușmanul ei. Acum își face temele cu zâmbetul pe buze și chiar a cerut să se înscrie la cercul de matematică de la școală!\n\nCa părinte, am văzut cum stresul din casa noastră a dispărut complet. Seara nu mai este un coșmar, ci un moment de învățare împreună.`,
    beforeImage: "https://images.unsplash.com/photo-1593356319045-c99b8165b5a0",
    beforeImageAlt: "Stressed student looking overwhelmed with math homework and books scattered on desk",
    afterImage: "https://images.unsplash.com/photo-1691535119089-be366342e07d",
    afterImageAlt: "Happy confident student smiling while solving math problems with organized study materials",
    timeframe: "3 luni",
    keyResults: [
    "Eliminarea completă a anxietății matematice",
    "Creșterea notei medii cu 2.5 puncte",
    "Dezvoltarea unei atitudini pozitive față de matematică",
    "Îmbunătățirea relațiilor familiale"],

    date: "Septembrie 2024",
    verified: true
  },
  {
    id: 2,
    category: 'grades',
    parent: {
      name: "Andrei Popescu",
      avatar: "https://images.unsplash.com/photo-1705645930353-0e335311ef20",
      avatarAlt: "Professional man with short dark hair wearing blue shirt and friendly smile",
      location: "Cluj-Napoca",
      childGrade: "Clasa 11"
    },
    child: {
      name: "Mihai Alexandru",
      beforeGrade: 7.1,
      afterGrade: 9.3,
      improvement: "+2.2"
    },
  story: `Mihai era un elev mediu la matematică, cu note între 6 și 7. Deși înțelegea conceptele de bază, nu reușea să facă conexiunile necesare pentru problemele mai complexe, mai ales cele de la BAC.\n\nCu Mate cu succes, a început să vadă matematica ca pe un puzzle logic, nu ca pe o colecție de formule de memorat. Profesorii au identificat exact unde avea lacune și au construit pas cu pas o înțelegere solidă.\n\nAcum, la simularea BAC, a luat 9.2! Este pregătit să aplice la facultatea de inginerie pe care și-a dorit-o mereu. Încrederea lui în sine s-a transformat complet.`,
    beforeImage: "https://images.unsplash.com/photo-1614374541663-9d83c00f8fd7",
    beforeImageAlt: "Student looking confused while studying complex math equations with scattered papers",
    afterImage: "https://images.unsplash.com/photo-1691535119089-be366342e07d",
    afterImageAlt: "Confident male student proudly showing excellent test results with organized study setup",
    timeframe: "6 luni",
    keyResults: [
    "Creșterea notei medii cu 2.2 puncte",
    "Nota 9.2 la simularea BAC",
    "Dezvoltarea gândirii logice",
    "Pregătire completă pentru facultate"],

    date: "Octombrie 2024",
    verified: true
  },
  {
    id: 3,
    category: 'confidence',
    parent: {
      name: "Carmen Dumitrescu",
      avatar: "https://images.unsplash.com/photo-1612439289738-15a4cba74d9f",
      avatarAlt: "Professional woman with curly hair wearing glasses and warm smile",
      location: "Timișoara",
      childGrade: "Clasa 6"
    },
    child: {
      name: "Sofia Elena",
      beforeGrade: 5.8,
      afterGrade: 8.4,
      improvement: "+2.6"
    },
  story: `Sofia se considera 'proastă la matematică' și refuza să încerce să rezolve problemele, spunând că oricum nu va reuși. Această atitudine o afecta și la alte materii.\n\nEchipa Mate cu succes a lucrat nu doar cu cunoștințele matematice, ci și cu încrederea ei în sine. Au început cu probleme foarte simple pe care le putea rezolva, construind treptat complexitatea.\n\nAstăzi, Sofia este prima care își ridică mâna la ora de matematică! A descoperit că îi place să rezolve probleme și chiar ajută colegii care au dificultăți. Transformarea ei a fost incredibilă.`,
    beforeImage: "https://images.unsplash.com/photo-1613272976530-ebe48380591c",
    beforeImageAlt: "Young girl looking discouraged and avoiding eye contact while sitting at study desk",
    afterImage: "https://images.unsplash.com/photo-1687335586693-22f19aa3d084",
    afterImageAlt: "Confident young girl raising hand enthusiastically in classroom with bright smile",
    timeframe: "4 luni",
    keyResults: [
    "Transformarea completă a atitudinii față de matematică",
    "Creșterea notei medii cu 2.6 puncte",
    "Dezvoltarea spiritului de ajutorare",
    "Îmbunătățirea performanțelor la toate materiile"],

    date: "August 2024",
    verified: true
  }];


  const filteredTestimonials = selectedCategory === 'all' ?
  testimonials :
  testimonials?.filter((t) => t?.category === selectedCategory);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredTestimonials?.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredTestimonials?.length) % filteredTestimonials?.length);
  };

  const currentTestimonial = filteredTestimonials?.[currentSlide];

  return (
    <div className="bg-card rounded-xl warm-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-headline font-bold text-primary">
          Povești de Transformare
        </h2>
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={20} className="text-success" />
          <span className="text-sm text-success font-medium">Verificate</span>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) =>
        <button
          key={category?.id}
          onClick={() => {
            setSelectedCategory(category?.id);
            setCurrentSlide(0);
          }}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-all duration-200 ${
          selectedCategory === category?.id ?
          'bg-primary text-primary-foreground' :
          'bg-muted text-text-secondary hover:text-primary hover:bg-primary/10'}`
          }>

            <span>{category?.label}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${
          selectedCategory === category?.id ?
          'bg-primary-foreground/20 text-primary-foreground' :
          'bg-text-secondary/20 text-text-secondary'}`
          }>
              {category?.count}
            </span>
          </button>
        )}
      </div>
      {currentTestimonial &&
      <div className="relative">
          {/* Navigation */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-text-secondary">
                {currentSlide + 1} din {filteredTestimonials?.length}
              </span>
              <div className="flex space-x-1">
                {filteredTestimonials?.map((_, index) =>
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                index === currentSlide ? 'bg-primary' : 'bg-muted'}`
                } />

              )}
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={filteredTestimonials?.length <= 1}
              iconName="ChevronLeft" />

              <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={filteredTestimonials?.length <= 1}
              iconName="ChevronRight" />

            </div>
          </div>

          {/* Testimonial Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Parent & Child Info */}
            <div className="space-y-6">
              {/* Parent Info */}
              <div className="bg-background rounded-lg border border-border p-4">
                <div className="flex items-center space-x-3 mb-4">
                  <Image
                  src={currentTestimonial?.parent?.avatar}
                  alt={currentTestimonial?.parent?.avatarAlt}
                  className="w-16 h-16 rounded-full object-cover" />

                  <div>
                    <h3 className="font-headline font-semibold text-text-primary">
                      {currentTestimonial?.parent?.name}
                    </h3>
                    <p className="text-sm text-text-secondary">
                      {currentTestimonial?.parent?.location}
                    </p>
                    <p className="text-sm text-text-secondary">
                      Părinte - {currentTestimonial?.parent?.childGrade}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Verificat</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="CheckCircle" size={16} className="text-success" />
                    <span className="text-sm text-success font-medium">
                      {currentTestimonial?.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Child Progress */}
              <div className="bg-gradient-to-r from-success/10 to-primary/10 rounded-lg border border-success/20 p-4">
                <h4 className="font-headline font-semibold text-text-primary mb-3">
                  Progresul lui {currentTestimonial?.child?.name}
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Nota inițială:</span>
                    <span className="font-bold text-text-primary">
                      {currentTestimonial?.child?.beforeGrade}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Nota actuală:</span>
                    <span className="font-bold text-success">
                      {currentTestimonial?.child?.afterGrade}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-success/20 pt-2">
                    <span className="text-sm font-medium text-text-primary">Îmbunătățire:</span>
                    <span className="font-bold text-success text-lg">
                      {currentTestimonial?.child?.improvement}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">Perioada:</span>
                    <span className="font-medium text-text-primary">
                      {currentTestimonial?.timeframe}
                    </span>
                  </div>
                </div>
              </div>

              {/* Key Results */}
              <div className="bg-background rounded-lg border border-border p-4">
                <h4 className="font-headline font-semibold text-text-primary mb-3">
                  Rezultate Cheie
                </h4>
                <ul className="space-y-2">
                  {currentTestimonial?.keyResults?.map((result, index) =>
                <li key={index} className="flex items-start space-x-2">
                      <Icon name="Check" size={16} className="text-success mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-text-secondary">{result}</span>
                    </li>
                )}
                </ul>
              </div>
            </div>

            {/* Story Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Before/After Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <Image
                  src={currentTestimonial?.beforeImage}
                  alt={currentTestimonial?.beforeImageAlt}
                  className="w-full h-48 object-cover rounded-lg" />

                  <div className="absolute top-3 left-3 px-3 py-1 bg-error text-error-foreground text-sm font-medium rounded">
                    Înainte
                  </div>
                </div>
                <div className="relative">
                  <Image
                  src={currentTestimonial?.afterImage}
                  alt={currentTestimonial?.afterImageAlt}
                  className="w-full h-48 object-cover rounded-lg" />

                  <div className="absolute top-3 left-3 px-3 py-1 bg-success text-success-foreground text-sm font-medium rounded">
                    După
                  </div>
                </div>
              </div>

              {/* Story Text */}
              <div className="bg-background rounded-lg border border-border p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Icon name="Quote" size={24} className="text-primary" />
                  <h3 className="text-lg font-headline font-semibold text-text-primary">
                    Povestea Transformării
                  </h3>
                </div>
                
                <div className="prose prose-sm max-w-none">
                  {currentTestimonial?.story?.split('\n\n')?.map((paragraph, index) =>
                <p key={index} className="text-text-secondary mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                )}
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <div className="flex items-center space-x-2">
                    <Icon name="Heart" size={16} className="text-secondary" />
                    <span className="text-sm text-text-secondary">
                      Această poveste a inspirat 127 de părinți
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm" iconName="Share2">
                      Distribuie
                    </Button>
                    <Button variant="outline" size="sm" iconName="MessageCircle">
                      Comentează
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      {/* Call to Action */}
      <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
        <div className="text-center">
          <Icon name="Sparkles" size={32} className="text-primary mx-auto mb-3" />
          <h3 className="text-xl font-headline font-bold text-text-primary mb-2">
            Și Copilul Tău Poate Avea O Astfel de Transformare!
          </h3>
          <p className="text-text-secondary mb-4">
            Alătură-te comunității de părinți care au ales să transforme relația copiilor lor cu matematica.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="default" iconName="Play" iconPosition="left">
              Începe Gratuit Astăzi
            </Button>
            <Button variant="outline" iconName="MessageSquare" iconPosition="left">
              Vorbește cu un Părinte
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default TestimonialShowcase;