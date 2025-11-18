import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';


const ExpertEndorsements = () => {
  const [activeCategory, setActiveCategory] = useState('educators');

  const categories = [
  { id: 'educators', label: 'Educatori', icon: 'GraduationCap' },
  { id: 'psychologists', label: 'Psihologi', icon: 'Brain' },
  { id: 'parents', label: 'Părinți', icon: 'Users' },
  { id: 'institutions', label: 'Instituții', icon: 'Building' }];


  const endorsements = {
    educators: [
    {
      id: 1,
      name: "Prof. Dr. Maria Constantinescu",
      title: "Profesor Universitar, Universitatea București",
      specialization: "Didactica Matematicii",
      experience: "25 ani",
      avatar: "https://images.unsplash.com/photo-1654727169791-7f46d0dfc1a3",
      avatarAlt: "Professional woman with gray hair wearing glasses and navy blazer, warm smile in academic setting",
  quote: `Mate cu succes reprezintă o revoluție în educația matematică românească. Abordarea lor pas cu pas și focusul pe reducerea anxietății matematice sunt exact ce avea nevoie sistemul nostru educațional. Am recomandat platforma la peste 200 de profesori din rețeaua mea.`,
      credentials: [
      "Autor a 15 cărți de didactică matematică",
      "Consultant Ministerul Educației",
      "Președinte Asociația Profesorilor de Matematică"],

      rating: 5,
      studentsImpacted: "3,500+"
    },
    {
      id: 2,
      name: "Prof. Andrei Popescu",
      title: "Inspector Școlar Județean",
      specialization: "Evaluare și Curriculum",
      experience: "18 ani",
      avatar: "https://images.unsplash.com/photo-1727041380998-1130803bd8f6",
      avatarAlt: "Middle-aged man with glasses wearing formal suit and tie, confident professional expression",
  quote: `Rezultatele elevilor care folosesc Mate cu succes sunt remarcabile. Am observat o îmbunătățire medie de 2.3 puncte la evaluările naționale. Metodologia lor este științific fundamentată și practic aplicabilă.`,
      credentials: [
      "Coordonator Evaluare Națională",
      "Formator național în educație",
      "Doctor în Științele Educației"],

      rating: 5,
      studentsImpacted: "8,200+"
    },
    {
      id: 3,
      name: "Prof. Elena Dumitrescu",
      title: "Profesor Metodist, Colegiul Național",
      specialization: "Pregătire Olimpiade",
      experience: "22 ani",
      avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      avatarAlt: "Professional woman with short blonde hair wearing white blouse, confident smile in classroom setting",
  quote: `Elevii mei care participă la programele Mate cu succes au câștigat 15 medalii la olimpiadele naționale în ultimii 2 ani. Calitatea materialelor și suportul oferit sunt excepționale.`,
      credentials: [
      "Antrenor olimpici naționali",
      "Autor manuale școlare",
      "Evaluator BAC Matematică"],

      rating: 5,
      studentsImpacted: "1,200+"
    }],

    psychologists: [
    {
      id: 4,
      name: "Dr. Ioana Marinescu",
      title: "Psiholog Clinician",
      specialization: "Anxietate Academică",
      experience: "12 ani",
      avatar: "https://images.unsplash.com/photo-1734821375517-ca34fbe8089d",
      avatarAlt: "Professional woman with dark hair in bun wearing white medical coat, compassionate expression",
  quote: `Mate cu succes abordează brilliant aspectul emoțional al învățării matematicii. Tehnicile lor de gestionare a anxietății sunt validate științific și extrem de eficiente. Am văzut transformări incredibile la pacienții mei.`,
      credentials: [
      "Specialist în anxietate academică",
      "Cercetător în psihologia educației",
      "Autor studii despre stresul școlar"],

      rating: 5,
      studentsImpacted: "800+"
    },
    {
      id: 5,
      name: "Dr. Radu Gheorghe",
      title: "Psiholog Școlar",
      specialization: "Dezvoltare Cognitivă",
      experience: "15 ani",
      avatar: "https://images.unsplash.com/photo-1616478159178-b5b3874d5e6d",
      avatarAlt: "Professional man with beard wearing casual shirt, warm smile in office environment",
  quote: `Programele Mate cu succes sunt construite pe principii psihopedagogice solide. Progresul pas cu pas și sistemul de recompense motivează elevii și construiesc încrederea în sine de o manieră durabilă.`,
      credentials: [
      "Specialist în motivație școlară",
      "Formator în psihologie educațională",
      "Consultant pentru școli"],

      rating: 5,
      studentsImpacted: "2,100+"
    }],

    parents: [
    {
      id: 6,
      name: "Ana și Mihai Stoica",
      title: "Părinți",
      specialization: "Părinți ai Mariei (clasa a XII-a)",
  experience: "Utilizatori Mate cu succes - 2 ani",
      avatar: "https://images.unsplash.com/photo-1708329222664-610cd703f29b",
      avatarAlt: "Happy middle-aged couple smiling together, man in blue shirt and woman in white blouse",
  quote: `Maria era în lacrimi în fiecare seară din cauza matematicii. Acum, după 2 ani cu Mate cu succes, a luat 9.4 la BAC și studiază la Politehnică. Nu doar că a învățat matematică, și-a recăpătat încrederea în sine.`,
  credentials: [
  "Părinți activi în comunitatea Mate cu succes",
      "Voluntari în programul de mentorat",
      "Ambasadori ai platformei"],

      rating: 5,
      studentsImpacted: "Familie transformată"
    },
    {
      id: 7,
      name: "Carmen Ionescu",
      title: "Mamă singură",
      specialization: "Mama lui Andrei (clasa a VIII-a)",
  experience: "Utilizator Mate cu succes - 1 an",
      avatar: "https://images.unsplash.com/photo-1676083192960-2a4873858487",
      avatarAlt: "Single mother with warm smile wearing casual sweater, confident and caring expression",
  quote: `Ca mamă singură, nu îmi permiteam meditații private. Mate cu succes ne-a oferit educația de calitate la un preț accesibil. Andrei a luat 9.8 la Evaluarea Națională și a primit bursă la liceu.`,
      credentials: [
      "Beneficiară program de burse",
      "Participantă în atelierele pentru părinți",
      "Susținătoare a inițiativelor sociale"],

      rating: 5,
      studentsImpacted: "Viitor asigurat pentru copil"
    }],

    institutions: [
    {
      id: 8,
      name: "Ministerul Educației",
      title: "Instituție Națională",
      specialization: "Politici Educaționale",
      experience: "Parteneriat oficial",
      avatar: "https://images.unsplash.com/photo-1612556442320-cd922209b80c",
      avatarAlt: "Government building with Romanian flag, official institutional setting",
  quote: `Mate cu succes este recunoscut oficial ca platformă educațională de excelență. Metodologia lor se aliniază perfect cu obiectivele curriculare naționale și contribuie semnificativ la îmbunătățirea performanțelor școlare.`,
      credentials: [
      "Certificare oficială MEN",
      "Partener în programele naționale",
      "Recunoaștere pentru inovație educațională"],

      rating: 5,
      studentsImpacted: "Nivel național"
    },
    {
      id: 9,
      name: "Universitatea București",
      title: "Instituție de Învățământ Superior",
      specialization: "Cercetare în Educație",
      experience: "Colaborare de 3 ani",
      avatar: "https://images.unsplash.com/photo-1517727384071-c930a28ff05d",
      avatarAlt: "Historic university building with classical architecture, academic institutional setting",
  quote: `Studiile noastre demonstrează că elevii care folosesc Mate cu succes au o rată de succes cu 40% mai mare la admiterea în facultățile tehnice. Platforma este un model de bună practică în educația digitală.`,
      credentials: [
      "Studii de impact validate științific",
      "Colaborare în cercetarea educațională",
      "Recomandare oficială pentru studenți"],

      rating: 5,
      studentsImpacted: "Mii de studenți"
    }]

  };

  const currentEndorsements = endorsements?.[activeCategory] || [];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) =>
    <Icon
      key={index}
      name="Star"
      size={16}
      className={index < rating ? "text-warning fill-current" : "text-text-secondary/30"} />

    );
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Recunoaștere și Încredere
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            Mate cu succes este recunoscut și recomandat de experți în educație, psihologi, părinți și instituții de prestigiu.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories?.map((category) =>
          <button
            key={category?.id}
            onClick={() => setActiveCategory(category?.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-body font-medium transition-all duration-200 ${
            activeCategory === category?.id ?
            'bg-primary text-primary-foreground warm-shadow' :
            'bg-card text-text-secondary hover:bg-primary/10 hover:text-primary border border-border'}`
            }>

              <Icon name={category?.icon} size={18} />
              <span>{category?.label}</span>
            </button>
          )}
        </div>

        {/* Endorsements Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {currentEndorsements?.map((endorsement) =>
          <div
            key={endorsement?.id}
            className="bg-card border border-border rounded-2xl p-8 warm-shadow hover:warm-shadow-lg transition-all duration-300">

              {/* Header */}
              <div className="flex items-start space-x-4 mb-6">
                <Image
                src={endorsement?.avatar}
                alt={endorsement?.avatarAlt}
                className="w-16 h-16 rounded-full object-cover flex-shrink-0" />

                <div className="flex-1">
                  <h3 className="font-headline text-lg font-bold text-text-primary mb-1">
                    {endorsement?.name}
                  </h3>
                  <p className="text-sm text-text-secondary mb-1">
                    {endorsement?.title}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-text-secondary">
                    <span>{endorsement?.specialization}</span>
                    <span>•</span>
                    <span>{endorsement?.experience}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex items-center space-x-1">
                  {renderStars(endorsement?.rating)}
                </div>
                <span className="text-sm text-text-secondary">
                  ({endorsement?.rating}/5)
                </span>
              </div>

              {/* Quote */}
              <blockquote className="text-text-secondary font-body leading-relaxed mb-6 italic">
                "{endorsement?.quote}"
              </blockquote>

              {/* Credentials */}
              <div className="mb-4">
                <h4 className="font-body font-semibold text-text-primary mb-2 text-sm">
                  Credențiale:
                </h4>
                <ul className="space-y-1">
                  {endorsement?.credentials?.map((credential, index) =>
                <li key={index} className="flex items-start space-x-2 text-xs text-text-secondary">
                      <Icon name="Check" size={12} className="text-accent mt-0.5 flex-shrink-0" />
                      <span>{credential}</span>
                    </li>
                )}
                </ul>
              </div>

              {/* Impact */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={16} className="text-accent" />
                  <div>
                    <span className="text-sm font-semibold text-accent">Impact: </span>
                    <span className="text-sm text-text-secondary">{endorsement?.studentsImpacted}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Awards & Recognition section removed per request */}

        {/* Statistics */}
        <div className="mt-16 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-primary/20 rounded-2xl p-8">
          <h3 className="font-headline text-2xl font-bold text-text-primary text-center mb-8">
            Încrederea Comunității în Cifre
          </h3>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
            { number: "98%", label: "Rata de satisfacție", icon: "ThumbsUp" },
            { number: "15,000+", label: "Familii mulțumite", icon: "Users" },
            { number: "250+", label: "Profesori parteneri", icon: "GraduationCap" },
            { number: "50+", label: "Școli colaboratoare", icon: "Building" }]?.
            map((stat, index) =>
            <div key={index} className="text-center">
                <Icon name={stat?.icon} size={24} className="text-primary mx-auto mb-2" />
                <div className="text-2xl lg:text-3xl font-bold text-primary mb-1">
                  {stat?.number}
                </div>
                <div className="text-sm text-text-secondary font-body">
                  {stat?.label}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="font-body text-text-secondary mb-6">
            Alătură-te comunității de elevi, părinți și educatori care au ales Mate cu succes pentru transformarea lor matematică.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button asChild variant="default" size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 font-cta font-semibold px-8">
              <a href="/course-catalog">
                <Icon name="Sparkles" size={20} className="mr-2" />
                Începe Transformarea Ta
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-cta font-semibold px-8">
              <a href="/consiliere">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Vorbește cu un Expert
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>);

};

export default ExpertEndorsements;