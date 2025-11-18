import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const WebinarSchedule = () => {
  const [selectedMonth, setSelectedMonth] = useState('octombrie');

  const months = [
  { id: 'octombrie', label: 'Octombrie 2024' },
  { id: 'noiembrie', label: 'Noiembrie 2024' },
  { id: 'decembrie', label: 'Decembrie 2024' }];


  const webinars = {
    octombrie: [
    {
      id: 1,
      title: "Cum să Motivați Copilul pentru Matematică",
      description: "Strategii practice pentru părinții care vor să își inspire copiii să învețe matematica cu plăcere și să depășească blocajele emoționale.",
      date: "22 Octombrie 2024",
      time: "19:00 - 20:30",
      duration: "90 minute",
      speaker: {
        name: "Dr. Maria Popescu",
        title: "Psiholog Educațional",
        avatar: "https://images.unsplash.com/photo-1552859951-676c58ffcc46",
        avatarAlt: "Professional woman psychologist with glasses and brown hair in formal attire"
      },
      participants: 156,
      maxParticipants: 200,
      status: "upcoming",
      topics: ["Motivație intrinsecă", "Depășirea fricii", "Recompense eficiente", "Comunicare pozitivă"],
      price: "Gratuit"
    },
    {
      id: 2,
      title: "Pregătirea pentru Evaluarea Națională",
      description: "Ghid complet pentru părinții elevilor de clasa a VIII-a: cum să sprijiniți copilul în pregătirea pentru acest examen crucial.",
      date: "25 Octombrie 2024",
      time: "18:00 - 19:30",
      duration: "90 minute",
      speaker: {
        name: "Prof. Andrei Marinescu",
        title: "Profesor Matematică, 15 ani experiență",
        avatar: "https://images.unsplash.com/photo-1633512219731-1837801160c0",
        avatarAlt: "Professional male teacher with short dark hair wearing blue shirt and tie"
      },
      participants: 89,
      maxParticipants: 150,
      status: "upcoming",
      topics: ["Planificare timp", "Gestionarea stresului", "Resurse utile", "Ziua examenului"],
      price: "Gratuit"
    },
    {
      id: 3,
      title: "Înțelegerea Stilurilor de Învățare",
      description: "Cum să identificați stilul de învățare al copilului și să adaptați metodele de studiu pentru rezultate optime la matematică.",
      date: "29 Octombrie 2024",
      time: "19:30 - 21:00",
      duration: "90 minute",
      speaker: {
        name: "Dr. Elena Constantinescu",
        title: "Specialist în Educație Diferențiată",
        avatar: "https://images.unsplash.com/photo-1604525241109-c3b7eecf4add",
        avatarAlt: "Professional woman educator with short blonde hair in academic setting"
      },
      participants: 134,
      maxParticipants: 180,
      status: "upcoming",
      topics: ["Stiluri vizuale", "Învățare auditivă", "Metode kinestezice", "Adaptarea metodelor"],
      price: "Gratuit"
    }],

    noiembrie: [
    {
      id: 4,
      title: "Comunicarea Eficientă cu Profesorii",
      description: "Cum să construiți o relație pozitivă cu profesorii de matematică și să colaborați pentru succesul copilului.",
      date: "5 Noiembrie 2024",
      time: "18:30 - 20:00",
      duration: "90 minute",
      speaker: {
        name: "Conf. Dr. Ioana Radu",
        title: "Specialist în Comunicare Educațională",
        avatar: "https://images.unsplash.com/photo-1714976326828-4d138f258170",
        avatarAlt: "Professional woman with curly hair wearing glasses and professional attire"
      },
      participants: 67,
      maxParticipants: 120,
      status: "upcoming",
      topics: ["Primul contact", "Întâlniri productive", "Feedback constructiv", "Rezolvarea conflictelor"],
      price: "Gratuit"
    }],

    decembrie: [
    {
      id: 5,
      title: "Planificarea Vacanței de Iarnă",
      description: "Cum să mențineți progresul la matematică în timpul vacanței fără să stresați copilul.",
      date: "10 Decembrie 2024",
      time: "19:00 - 20:30",
      duration: "90 minute",
      speaker: {
        name: "Prof. Mihai Georgescu",
        title: "Metodist Matematică",
        avatar: "https://images.unsplash.com/photo-1703627441916-6ce9929ccf60",
        avatarAlt: "Professional male educator with friendly smile wearing casual shirt"
      },
      participants: 23,
      maxParticipants: 100,
      status: "upcoming",
      topics: ["Activități distractive", "Rutina de studiu", "Jocuri matematice", "Echilibru odihnă-învățare"],
      price: "Gratuit"
    }]

  };

  const currentWebinars = webinars?.[selectedMonth] || [];

  const pastWebinars = [
  {
    id: 101,
    title: "Depășirea Anxietății Matematice",
    date: "15 Octombrie 2024",
    participants: 245,
    rating: 4.8,
    recordingAvailable: true
  },
  {
    id: 102,
    title: "Tehnologii în Învățarea Matematicii",
    date: "8 Octombrie 2024",
    participants: 189,
    rating: 4.6,
    recordingAvailable: true
  }];


  return (
    <div className="bg-card rounded-xl warm-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-headline font-bold text-primary">
          Webinarii pentru Părinți
        </h2>
        <Button variant="outline" iconName="Calendar" iconPosition="left">
          Adaugă în Calendar
        </Button>
      </div>
      {/* Month Selector */}
      <div className="flex space-x-2 mb-6">
        {months?.map((month) =>
        <button
          key={month?.id}
          onClick={() => setSelectedMonth(month?.id)}
          className={`px-4 py-2 rounded-lg font-body font-medium transition-all duration-200 ${
          selectedMonth === month?.id ?
          'bg-primary text-primary-foreground' :
          'bg-muted text-text-secondary hover:text-primary hover:bg-primary/10'}`
          }>

            {month?.label}
          </button>
        )}
      </div>
      {/* Upcoming Webinars */}
      <div className="space-y-6 mb-8">
        {currentWebinars?.map((webinar) =>
        <div key={webinar?.id} className="border border-border rounded-lg overflow-hidden hover:warm-shadow transition-all duration-200">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="px-2 py-1 bg-success text-success-foreground text-xs font-medium rounded">
                      {webinar?.price}
                    </span>
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                      {webinar?.duration}
                    </span>
                  </div>
                  <h3 className="text-xl font-headline font-bold text-text-primary mb-2">
                    {webinar?.title}
                  </h3>
                  <p className="text-text-secondary mb-4">
                    {webinar?.description}
                  </p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-body font-semibold text-text-primary">
                    {webinar?.date}
                  </p>
                  <p className="text-sm text-text-secondary">
                    {webinar?.time}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-4">
                <Image
                src={webinar?.speaker?.avatar}
                alt={webinar?.speaker?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover" />

                <div>
                  <h4 className="font-body font-semibold text-text-primary">
                    {webinar?.speaker?.name}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {webinar?.speaker?.title}
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h5 className="font-body font-medium text-text-primary mb-2">
                  Subiecte abordate:
                </h5>
                <div className="flex flex-wrap gap-2">
                  {webinar?.topics?.map((topic, index) =>
                <span
                  key={index}
                  className="px-3 py-1 bg-muted text-text-secondary text-sm rounded-full">

                      {topic}
                    </span>
                )}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">
                      {webinar?.participants}/{webinar?.maxParticipants} participanți
                    </span>
                  </div>
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div
                    className="h-2 bg-primary rounded-full"
                    style={{ width: `${webinar?.participants / webinar?.maxParticipants * 100}%` }}>
                  </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" iconName="Share">
                    Distribuie
                  </Button>
                  <Button variant="default" size="sm" iconName="UserPlus">
                    Înscrie-te
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Past Webinars */}
      <div>
        <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">
          Webinarii Anterioare
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pastWebinars?.map((webinar) =>
          <div key={webinar?.id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors duration-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-body font-semibold text-text-primary mb-1">
                    {webinar?.title}
                  </h4>
                  <p className="text-sm text-text-secondary">
                    {webinar?.date}
                  </p>
                </div>
                {webinar?.recordingAvailable &&
              <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-medium rounded">
                    Înregistrare
                  </span>
              }
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon name="Users" size={14} className="text-text-secondary" />
                  <span className="text-sm text-text-secondary">
                    {webinar?.participants} participanți
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={14} className="text-warning fill-current" />
                  <span className="text-sm font-medium text-text-primary">
                    {webinar?.rating}
                  </span>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" size="sm" iconName="Play" fullWidth>
                  Vizionează
                </Button>
                <Button variant="ghost" size="sm" iconName="Download" fullWidth>
                  Descarcă
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Newsletter Signup */}
      <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
        <div className="text-center">
          <Icon name="Bell" size={32} className="text-primary mx-auto mb-3" />
          <h3 className="text-lg font-headline font-bold text-text-primary mb-2">
            Nu Ratați Niciun Webinar!
          </h3>
          <p className="text-text-secondary mb-4">
            Abonați-vă la newsletter-ul nostru pentru a fi anunțați despre toate webinariile viitoare.
          </p>
          <Button variant="default" iconName="Mail" iconPosition="left">
            Abonează-te la Newsletter
          </Button>
        </div>
      </div>
    </div>);

};

export default WebinarSchedule;