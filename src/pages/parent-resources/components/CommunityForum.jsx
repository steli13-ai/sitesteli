import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunityForum = () => {
  const [activeTab, setActiveTab] = useState('recent');
  const [searchQuery, setSearchQuery] = useState('');

  const forumCategories = [
  { id: 'recent', label: 'Discuții Recente', icon: 'MessageSquare', count: 24 },
  { id: 'popular', label: 'Populare', icon: 'TrendingUp', count: 12 },
  { id: 'questions', label: 'Întrebări', icon: 'HelpCircle', count: 18 },
  { id: 'success', label: 'Povești de Succes', icon: 'Trophy', count: 8 }];


  const forumPosts = {
    recent: [
    {
      id: 1,
      title: "Cum să gestionez anxietatea copilului înainte de teste?",
      content: "Fiica mea de 12 ani devine foarte anxioasă înainte de testele de matematică. Are note bune în general, dar stresul o blochează. Ce strategii ați folosit cu succes?",
      author: {
        name: "Maria Ionescu",
        avatar: "https://images.unsplash.com/photo-1592155309727-60fde6f7d12c",
        avatarAlt: "Professional woman with brown hair smiling warmly at camera",
        role: "Mamă, Clasa 7",
        joinDate: "Membru din Martie 2024"
      },
      timestamp: "Acum 2 ore",
      replies: 15,
      likes: 23,
      category: "Suport Emoțional",
      tags: ["Anxietate", "Teste", "Clasa 7"],
      isAnswered: false,
      lastReply: {
        author: "Dr. Elena Popescu",
        time: "Acum 30 min"
      }
    },
    {
      id: 2,
      title: "Recomandări pentru aplicații de matematică pentru clasa 5",
      content: "Caut aplicații interactive care să îl ajute pe fiul meu să exerseze matematica într-un mod distractiv. Ce aplicații recomandați pentru clasa 5?",
      author: {
        name: "Andrei Popescu",
        avatar: "https://images.unsplash.com/photo-1705645930353-0e335311ef20",
        avatarAlt: "Professional man with short dark hair wearing blue shirt and friendly smile",
        role: "Tată, Clasa 5",
        joinDate: "Membru din Ianuarie 2024"
      },
      timestamp: "Acum 4 ore",
      replies: 8,
      likes: 12,
      category: "Resurse Digitale",
      tags: ["Aplicații", "Clasa 5", "Tehnologie"],
      isAnswered: true,
      lastReply: {
        author: "Prof. Mihai Georgescu",
        time: "Acum 1 oră"
      }
    },
    {
      id: 3,
  title: "Experiența noastră cu Mate cu succes - rezultate după 3 luni",
  content: "Vreau să împărtășesc experiența noastră pozitivă cu Mate cu succes. După 3 luni, fiul meu și-a îmbunătățit semnificativ notele și, mai important, și-a recăpătat încrederea în matematică.",
      author: {
        name: "Carmen Dumitrescu",
        avatar: "https://images.unsplash.com/photo-1612439289738-15a4cba74d9f",
        avatarAlt: "Professional woman with curly hair wearing glasses and warm smile",
        role: "Mamă, Clasa 9",
        joinDate: "Membru din August 2024"
      },
      timestamp: "Acum 6 ore",
      replies: 22,
      likes: 45,
      category: "Povești de Succes",
      tags: ["Succes", "Progres", "Încredere"],
      isAnswered: false,
      lastReply: {
        author: "Ana Marinescu",
        time: "Acum 2 ore"
      }
    }],

    popular: [
    {
      id: 4,
      title: "Ghidul complet pentru pregătirea Evaluării Naționale",
      content: "Am compilat toate resursele și strategiile care ne-au ajutat să trecem cu bine de Evaluarea Națională. Sper să fie util și pentru alți părinți.",
      author: {
        name: "Ioana Radu",
        avatar: "https://images.unsplash.com/photo-1644611150048-1931bd6dfb3d",
        avatarAlt: "Professional woman teacher with glasses and brown hair in formal attire",
        role: "Mamă, Absolventă EN",
        joinDate: "Membru din Februarie 2024"
      },
      timestamp: "Acum 2 zile",
      replies: 67,
      likes: 128,
      category: "Ghiduri",
      tags: ["Evaluare Națională", "Pregătire", "Resurse"],
      isAnswered: false,
      isPinned: true
    }],

    questions: [
    {
      id: 5,
      title: "Cum să comunic eficient cu profesorul de matematică?",
      content: "Am încercat să discut cu profesorul despre dificultățile copilului, dar nu pare să înțeleagă situația. Cum să abordez această conversație?",
      author: {
        name: "Mihai Constantinescu",
        avatar: "https://images.unsplash.com/photo-1657873308741-a1a2b208d555",
        avatarAlt: "Professional man with friendly smile wearing casual shirt",
        role: "Tată, Clasa 6",
        joinDate: "Membru din Septembrie 2024"
      },
      timestamp: "Acum 1 zi",
      replies: 11,
      likes: 18,
      category: "Comunicare",
      tags: ["Profesori", "Comunicare", "Colaborare"],
      isAnswered: true
    }],

    success: [
    {
      id: 6,
      title: "De la note mici la olimpiadă - povestea fiului meu",
      content: "Acum 2 ani, fiul meu avea note de 5-6 la matematică. Astăzi a câștigat premiul III la olimpiada județeană. Vreau să vă povestesc cum am reușit această transformare.",
      author: {
        name: "Elena Georgescu",
        avatar: "https://images.unsplash.com/photo-1604525241109-c3b7eecf4add",
        avatarAlt: "Professional woman educator with short blonde hair in academic setting",
        role: "Mamă, Clasa 10",
        joinDate: "Membru din Mai 2024"
      },
      timestamp: "Acum 3 zile",
      replies: 34,
      likes: 89,
      category: "Povești de Succes",
      tags: ["Olimpiadă", "Transformare", "Perseverență"],
      isAnswered: false
    }]

  };

  const currentPosts = forumPosts?.[activeTab] || [];

  const topContributors = [
  {
    name: "Dr. Elena Popescu",
    avatar: "https://images.unsplash.com/photo-1552859951-676c58ffcc46",
    avatarAlt: "Professional woman psychologist with glasses and brown hair in formal attire",
    role: "Psiholog Educațional",
    posts: 156,
    helpfulAnswers: 89
  },
  {
    name: "Prof. Mihai Georgescu",
    avatar: "https://images.unsplash.com/photo-1703627441916-6ce9929ccf60",
    avatarAlt: "Professional male educator with friendly smile wearing casual shirt",
    role: "Profesor Matematică",
    posts: 134,
    helpfulAnswers: 78
  },
  {
    name: "Carmen Dumitrescu",
    avatar: "https://images.unsplash.com/photo-1612439289738-15a4cba74d9f",
    avatarAlt: "Professional woman with curly hair wearing glasses and warm smile",
    role: "Părinte Experimentat",
    posts: 89,
    helpfulAnswers: 45
  }];


  return (
    <div className="bg-card rounded-xl warm-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-headline font-bold text-primary">
          Forum Comunitate Părinți
        </h2>
        <Button variant="default" iconName="Plus" iconPosition="left">
          Postează Întrebare
        </Button>
      </div>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Caută în forum..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full" />

        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" iconName="Filter">
            Filtrează
          </Button>
          <Button variant="outline" size="sm" iconName="SortDesc">
            Sortează
          </Button>
        </div>
      </div>
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {forumCategories?.map((category) =>
        <button
          key={category?.id}
          onClick={() => setActiveTab(category?.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-body font-medium transition-all duration-200 ${
          activeTab === category?.id ?
          'bg-primary text-primary-foreground' :
          'bg-muted text-text-secondary hover:text-primary hover:bg-primary/10'}`
          }>

            <Icon name={category?.icon} size={16} />
            <span>{category?.label}</span>
            <span className={`px-2 py-1 text-xs rounded-full ${
          activeTab === category?.id ?
          'bg-primary-foreground/20 text-primary-foreground' :
          'bg-text-secondary/20 text-text-secondary'}`
          }>
              {category?.count}
            </span>
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forum Posts */}
        <div className="lg:col-span-2 space-y-4">
          {currentPosts?.map((post) =>
          <div key={post?.id} className={`p-4 border rounded-lg hover:warm-shadow transition-all duration-200 ${
          post?.isPinned ? 'border-warning bg-warning/5' : 'border-border hover:border-primary/50'}`
          }>
              {post?.isPinned &&
            <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Pin" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-warning">Postare Fixată</span>
                </div>
            }

              <div className="flex items-start space-x-3 mb-3">
                <Image
                src={post?.author?.avatar}
                alt={post?.author?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <h4 className="font-body font-semibold text-text-primary">
                        {post?.author?.name}
                      </h4>
                      <p className="text-sm text-text-secondary">
                        {post?.author?.role} • {post?.timestamp}
                      </p>
                    </div>
                    {post?.isAnswered &&
                  <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded">
                        Răspuns
                      </span>
                  }
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-headline font-semibold text-text-primary mb-2">
                {post?.title}
              </h3>
              
              <p className="text-text-secondary mb-3 line-clamp-3">
                {post?.content}
              </p>

              <div className="flex flex-wrap gap-2 mb-3">
                {post?.tags?.map((tag, index) =>
              <span
                key={index}
                className="px-2 py-1 bg-muted text-text-secondary text-xs rounded">

                    #{tag}
                  </span>
              )}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="MessageSquare" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">{post?.replies}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary">{post?.likes}</span>
                  </div>
                  {post?.lastReply &&
                <div className="text-xs text-text-secondary">
                      Ultimul răspuns: {post?.lastReply?.author}, {post?.lastReply?.time}
                    </div>
                }
                </div>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" iconName="Share2">
                    Distribuie
                  </Button>
                  <Button variant="outline" size="sm">
                    Răspunde
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Top Contributors */}
          <div className="bg-background rounded-lg border border-border p-4">
            <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">
              Contributori Activi
            </h3>
            <div className="space-y-3">
              {topContributors?.map((contributor, index) =>
              <div key={index} className="flex items-center space-x-3">
                  <div className="relative">
                    <Image
                    src={contributor?.avatar}
                    alt={contributor?.avatarAlt}
                    className="w-10 h-10 rounded-full object-cover" />

                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                  index === 0 ? 'bg-warning' : index === 1 ? 'bg-text-secondary' : 'bg-accent'}`
                  }>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-body font-medium text-text-primary truncate">
                      {contributor?.name}
                    </h4>
                    <p className="text-xs text-text-secondary">
                      {contributor?.role}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {contributor?.posts} postări • {contributor?.helpfulAnswers} răspunsuri utile
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Forum Guidelines */}
          <div className="bg-primary/5 rounded-lg border border-primary/20 p-4">
            <div className="flex items-center space-x-2 mb-3">
              <Icon name="Info" size={20} className="text-primary" />
              <h3 className="text-lg font-headline font-semibold text-primary">
                Ghidul Comunității
              </h3>
            </div>
            <ul className="space-y-2 text-sm text-text-secondary">
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5" />
                <span>Fiți respectuoși și constructivi</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5" />
                <span>Căutați înainte să postați</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5" />
                <span>Folosiți titluri descriptive</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5" />
                <span>Marcați răspunsurile utile</span>
              </li>
            </ul>
          </div>

          {/* Quick Actions */}
          <div className="bg-background rounded-lg border border-border p-4">
            <h3 className="text-lg font-headline font-semibold text-text-primary mb-4">
              Acțiuni Rapide
            </h3>
            <div className="space-y-2">
              <Button variant="outline" size="sm" iconName="HelpCircle" fullWidth>
                Întreabă Expertul
              </Button>
              <Button variant="outline" size="sm" iconName="Users" fullWidth>
                Găsește Părinți
              </Button>
              <Button variant="outline" size="sm" iconName="Calendar" fullWidth>
                Evenimente Locale
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default CommunityForum;