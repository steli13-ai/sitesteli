import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ScholarshipProgram = () => {
  const [selectedScholarship, setSelectedScholarship] = useState(null);
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    scholarshipType: '',
    motivation: ''
  });

  const scholarships = [
  {
    id: 1,
    title: "Bursa Excelență Academică",
    description: "Pentru elevii cu performanțe excepționale dar cu posibilități financiare limitate",
    coverage: "100%",
    duration: "1 an academic",
    requirements: [
    "Media generală minimum 9.0",
    "Situație financiară precară dovedită",
    "Scrisoare de motivație",
    "Recomandare de la profesor"],

    available: 25,
    deadline: "15 Septembrie 2024",
    color: "primary",
    icon: "Trophy"
  },
  {
    id: 2,
    title: "Bursa Mediu Rural",
    description: "Sprijin special pentru elevii din zonele rurale cu acces limitat la educație",
    coverage: "75%",
    duration: "1 an academic",
    requirements: [
    "Domiciliu în mediul rural",
    "Media generală minimum 8.0",
    "Dovada veniturilor familiei",
    "Angajament de mentorat"],

    available: 50,
    deadline: "30 Septembrie 2024",
    color: "accent",
    icon: "Home"
  },
  {
    id: 3,
    title: "Bursa Familii Monoparentale",
    description: "Suport pentru elevii din familii cu un singur părinte",
    coverage: "60%",
    duration: "6 luni",
    requirements: [
    "Certificat familie monoparentală",
    "Media generală minimum 7.5",
    "Interviu cu consilierul școlar",
    "Plan de studiu personalizat"],

    available: 30,
    deadline: "10 Octombrie 2024",
    color: "secondary",
    icon: "Heart"
  },
  {
    id: 4,
    title: "Bursa Talent Matematic",
    description: "Pentru elevii cu aptitudini deosebite la matematică",
    coverage: "50%",
    duration: "1 an academic",
    requirements: [
    "Participare la olimpiade/concursuri",
    "Test de aptitudini matematice",
    "Portofoliu cu realizări",
    "Angajament de participare la comunitate"],

    available: 15,
    deadline: "5 Octombrie 2024",
    color: "warning",
    icon: "Brain"
  }];


  const impactStats = [
  {
    number: "1,250",
    label: "Burse oferite până acum",
    icon: "GraduationCap",
    color: "text-primary"
  },
  {
    number: "89%",
    label: "Rata de succes la examene",
    icon: "TrendingUp",
    color: "text-accent"
  },
  {
    number: "450",
    label: "Elevi activi cu burse",
    icon: "Users",
    color: "text-secondary"
  },
  {
    number: "2.8M",
    label: "RON investiți în educație",
    icon: "DollarSign",
    color: "text-warning"
  }];


  const testimonials = [
  {
    name: "Ana Marin",
    age: 16,
    scholarship: "Bursa Mediu Rural",
    quote: "Fără această bursă, nu aș fi putut accesa educația de calitate. Acum sunt în top 3 la clasă!",
    avatar: "https://images.unsplash.com/photo-1574013452070-94fa88bc5ddd",
    avatarAlt: "Teenage girl with brown hair in rural setting, wearing simple blue sweater and genuine smile"
  },
  {
    name: "Mihai Stoica",
    age: 14,
    scholarship: "Bursa Familii Monoparentale",
    quote: "Mama mea lucrează în două locuri. Această bursă ne-a dat speranța că pot avea un viitor mai bun.",
    avatar: "https://images.unsplash.com/photo-1727798450911-4f99a48cd03b",
    avatarAlt: "Young teenage boy with short dark hair wearing white shirt, determined expression"
  },
  {
    name: "Ioana Popescu",
    age: 17,
    scholarship: "Bursa Excelență Academică",
    quote: "Am câștigat olimpiada națională! Bursa mi-a oferit accesul la cei mai buni profesori.",
    avatar: "https://images.unsplash.com/photo-1673179328704-4151577247f1",
    avatarAlt: "Confident teenage girl with long brown hair holding mathematics trophy, bright smile"
  }];


  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setApplicationForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleApplicationSubmit = (e) => {
    e?.preventDefault();
    // Mock form submission
    alert('Aplicația ta a fost trimisă cu succes! Vei primi un răspuns în maxim 5 zile lucrătoare.');
    setApplicationForm({
      name: '',
      email: '',
      phone: '',
      grade: '',
      scholarshipType: '',
      motivation: ''
    });
    setSelectedScholarship(null);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent/20 text-accent-foreground px-4 py-2 rounded-full mb-6">
            <Icon name="Heart" size={16} className="text-accent" />
            <span className="font-cta font-semibold text-sm">Program de Burse</span>
          </div>
          
          <h2 className="font-headline text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Educația de Calitate Pentru Toți
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto mb-8">
            Credem că fiecare elev merită acces la educația matematică de cea mai înaltă calitate, 
            indiferent de situația financiară. Programul nostru de burse face acest lucru posibil.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {impactStats?.map((stat, index) =>
          <div key={index} className="text-center">
              <div className="bg-card border border-border rounded-xl p-6 warm-shadow hover:warm-shadow-lg transition-all duration-300">
                <Icon name={stat?.icon} size={32} className={`${stat?.color} mx-auto mb-3`} />
                <div className={`text-2xl lg:text-3xl font-bold ${stat?.color} mb-1`}>
                  {stat?.number}
                </div>
                <div className="text-sm text-text-secondary font-body">
                  {stat?.label}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Scholarship Types - removed per request */}
        {/* (Section hidden) */}

        {/* Testimonials - removed per request */}

        {/* Application Form Modal */}
        {selectedScholarship &&
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-headline text-2xl font-bold text-text-primary">
                      Aplică pentru Bursă
                    </h3>
                    <p className="text-text-secondary font-body">
                      {selectedScholarship?.title}
                    </p>
                  </div>
                  <button
                  onClick={() => setSelectedScholarship(null)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors duration-200">

                    <Icon name="X" size={24} className="text-text-secondary" />
                  </button>
                </div>

                {/* Form */}
                <form onSubmit={handleApplicationSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                    label="Nume complet"
                    type="text"
                    name="name"
                    value={applicationForm?.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Introdu numele complet" />

                    <Input
                    label="Clasa"
                    type="text"
                    name="grade"
                    value={applicationForm?.grade}
                    onChange={handleInputChange}
                    required
                    placeholder="ex: a VIII-a" />

                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={applicationForm?.email}
                    onChange={handleInputChange}
                    required
                    placeholder="adresa@email.com" />

                    <Input
                    label="Telefon"
                    type="tel"
                    name="phone"
                    value={applicationForm?.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="0712345678" />

                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-text-primary mb-2">
                      Scrisoare de motivație *
                    </label>
                    <textarea
                    name="motivation"
                    value={applicationForm?.motivation}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    placeholder="Explică de ce meriti această bursă și cum te va ajuta în parcursul tău educațional..." />

                  </div>

                  <div className="bg-muted/50 rounded-lg p-4">
                    <h4 className="font-body font-semibold text-text-primary mb-2">
                      Documentele necesare:
                    </h4>
                    <ul className="text-sm text-text-secondary space-y-1">
                      {selectedScholarship?.requirements?.map((req, index) =>
                    <li key={index} className="flex items-start space-x-2">
                          <Icon name="FileText" size={14} className="mt-0.5 flex-shrink-0" />
                          <span>{req}</span>
                        </li>
                    )}
                    </ul>
                    <p className="text-xs text-text-secondary mt-3">
                      * Documentele vor fi solicitate după evaluarea inițială a aplicației.
                    </p>
                  </div>

                  <div className="flex space-x-4">
                    <Button
                    type="button"
                    variant="outline"
                    onClick={() => setSelectedScholarship(null)}
                    className="flex-1">

                      Anulează
                    </Button>
                    <Button
                    type="submit"
                    variant="default"
                    className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-cta font-semibold">

                      <Icon name="Send" size={16} className="mr-2" />
                      Trimite Aplicația
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        }

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-primary/20 rounded-2xl p-8 max-w-3xl mx-auto">
            <Icon name="Heart" size={32} className="text-primary mx-auto mb-4" />
            <h3 className="font-headline text-2xl font-bold text-text-primary mb-4">
              Fii Parte din Schimbare
            </h3>
            <p className="font-body text-text-secondary mb-6">
              Fiecare abonament Premium contribuie direct la fondul de burse. 
              Împreună construim o comunitate în care educația matematică de calitate este accesibilă tuturor.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Button
                variant="default"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-cta font-semibold">

                <Icon name="Sparkles" size={16} className="mr-2" />
                Susține Programul de Burse
              </Button>
              <Button variant="outline" className="font-cta">
                <Icon name="Info" size={16} className="mr-2" />
                Află Mai Multe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default ScholarshipProgram;