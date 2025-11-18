import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CommunicationTools = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [newMessage, setNewMessage] = useState('');

  const teachers = [
  {
    id: 1,
    name: "Prof. Elena Marinescu",
    subject: "Matematică - Clasa 8",
    avatar: "https://images.unsplash.com/photo-1644611150048-1931bd6dfb3d",
    avatarAlt: "Professional woman teacher with glasses and brown hair in formal attire",
    status: "online",
    lastMessage: "Ana Maria face progrese excelente la algebra!",
    lastMessageTime: "Azi, 15:30"
  },
  {
    id: 2,
    name: "Prof. Andrei Constantinescu",
    subject: "Matematică - Clasa 11",
    avatar: "https://images.unsplash.com/photo-1633512219731-1837801160c0",
    avatarAlt: "Professional male teacher with short dark hair wearing blue shirt and tie",
    status: "away",
    lastMessage: "Mihai este pregătit pentru simularea BAC",
    lastMessageTime: "Ieri, 18:45"
  }];


  const recentMessages = [
  {
    id: 1,
    from: "Prof. Elena Marinescu",
    subject: "Progresul Anei la Geometrie",
    preview: "Bună ziua! Vreau să vă informez că Ana Maria a avut rezultate foarte bune la testul de geometrie...",
    time: "Azi, 15:30",
    unread: true,
    avatar: "https://images.unsplash.com/photo-1644611150048-1931bd6dfb3d",
    avatarAlt: "Professional woman teacher with glasses and brown hair in formal attire"
  },
  {
    id: 2,
    from: "Prof. Andrei Constantinescu",
    subject: "Pregătire Examen BAC",
    preview: "Mihai Alexandru arată o pregătire foarte bună pentru BAC. Recomand să continue cu exercițiile...",
    time: "Ieri, 18:45",
    unread: false,
    avatar: "https://images.unsplash.com/photo-1633512219731-1837801160c0",
    avatarAlt: "Professional male teacher with short dark hair wearing blue shirt and tie"
  },
  {
    id: 3,
    from: "Echipa Mate cu succes",
    subject: "Raport Lunar de Progres",
    preview: "Raportul lunar pentru copiii dumneavoastră este disponibil. Vedeți progresele realizate...",
    time: "14 Oct, 10:00",
    unread: false,
    avatar: "https://images.unsplash.com/photo-1580927535210-7bfbb904c1af",
    avatarAlt: "Mate cu succes logo with mathematical symbols and warm colors"
  }];


  const upcomingMeetings = [
  {
    id: 1,
    title: "Întâlnire Părinți - Prof. Marinescu",
    date: "20 Octombrie 2024",
    time: "17:00 - 17:30",
    type: "video",
    teacher: "Prof. Elena Marinescu",
    subject: "Discuție progres Ana Maria"
  },
  {
    id: 2,
    title: "Consultație BAC - Prof. Constantinescu",
    date: "22 Octombrie 2024",
    time: "16:00 - 16:45",
    type: "phone",
    teacher: "Prof. Andrei Constantinescu",
    subject: "Strategii pregătire BAC pentru Mihai"
  }];


  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      // Handle message sending logic
      setNewMessage('');
    }
  };

  return (
    <div className="bg-card rounded-xl warm-shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-headline font-bold text-primary">
          Comunicare cu Profesorii
        </h2>
        <Button variant="outline" iconName="Calendar" iconPosition="left">
          Programează Întâlnire
        </Button>
      </div>
      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-muted rounded-lg p-1">
        {[
        { id: 'messages', label: 'Mesaje', icon: 'MessageSquare' },
        { id: 'meetings', label: 'Întâlniri', icon: 'Video' },
        { id: 'teachers', label: 'Profesori', icon: 'Users' }]?.
        map((tab) =>
        <button
          key={tab?.id}
          onClick={() => setActiveTab(tab?.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md font-body font-medium transition-all duration-200 ${
          activeTab === tab?.id ?
          'bg-primary text-primary-foreground' :
          'text-text-secondary hover:text-primary'}`
          }>

            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
          </button>
        )}
      </div>
      {/* Messages Tab */}
      {activeTab === 'messages' &&
      <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-headline font-semibold text-text-primary">
              Mesaje Recente
            </h3>
            <Button variant="ghost" iconName="Search" size="sm">
              Caută
            </Button>
          </div>
          
          <div className="space-y-3">
            {recentMessages?.map((message) =>
          <div
            key={message?.id}
            className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:warm-shadow ${
            message?.unread ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`
            }>

                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Image
                  src={message?.avatar}
                  alt={message?.avatarAlt}
                  className="w-12 h-12 rounded-full object-cover" />

                    {message?.unread &&
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full"></div>
                }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-body font-semibold text-text-primary truncate">
                        {message?.from}
                      </h4>
                      <span className="text-sm text-text-secondary">{message?.time}</span>
                    </div>
                    <h5 className="font-body font-medium text-text-primary mb-1">
                      {message?.subject}
                    </h5>
                    <p className="text-sm text-text-secondary line-clamp-2">
                      {message?.preview}
                    </p>
                  </div>
                </div>
              </div>
          )}
          </div>

          {/* Quick Message */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-body font-semibold text-text-primary mb-3">
              Trimite Mesaj Rapid
            </h4>
            <div className="space-y-3">
              <Input
              type="text"
              placeholder="Scrie mesajul tău aici..."
              value={newMessage}
              onChange={(e) => setNewMessage(e?.target?.value)} />

              <div className="flex justify-between items-center">
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" iconName="Paperclip">
                    Atașează
                  </Button>
                  <Button variant="ghost" size="sm" iconName="Smile">
                    Emoji
                  </Button>
                </div>
                <Button onClick={handleSendMessage} iconName="Send" iconPosition="right">
                  Trimite
                </Button>
              </div>
            </div>
          </div>
        </div>
      }
      {/* Meetings Tab */}
      {activeTab === 'meetings' &&
      <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-headline font-semibold text-text-primary">
              Întâlniri Programate
            </h3>
            <Button variant="default" iconName="Plus" iconPosition="left">
              Programează Nouă
            </Button>
          </div>

          <div className="space-y-3">
            {upcomingMeetings?.map((meeting) =>
          <div key={meeting?.id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                meeting?.type === 'video' ? 'bg-primary/10' : 'bg-accent/10'}`
                }>
                      <Icon
                    name={meeting?.type === 'video' ? 'Video' : 'Phone'}
                    size={16}
                    className={meeting?.type === 'video' ? 'text-primary' : 'text-accent'} />

                    </div>
                    <div>
                      <h4 className="font-body font-semibold text-text-primary">
                        {meeting?.title}
                      </h4>
                      <p className="text-sm text-text-secondary mb-1">
                        {meeting?.teacher}
                      </p>
                      <p className="text-sm text-text-secondary">
                        {meeting?.subject}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-body font-medium text-text-primary">
                      {meeting?.date}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {meeting?.time}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-3">
                  <Button variant="outline" size="sm" iconName="Edit">
                    Modifică
                  </Button>
                  <Button variant="default" size="sm" iconName="ExternalLink">
                    Alătură-te
                  </Button>
                </div>
              </div>
          )}
          </div>
        </div>
      }
      {/* Teachers Tab */}
      {activeTab === 'teachers' &&
      <div className="space-y-4">
          <h3 className="text-lg font-headline font-semibold text-text-primary">
            Profesorii Copiilor
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teachers?.map((teacher) =>
          <div key={teacher?.id} className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors duration-200">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="relative">
                    <Image
                  src={teacher?.avatar}
                  alt={teacher?.avatarAlt}
                  className="w-16 h-16 rounded-full object-cover" />

                    <div className={`absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white ${
                teacher?.status === 'online' ? 'bg-success' : 'bg-warning'}`
                }></div>
                  </div>
                  <div>
                    <h4 className="font-body font-semibold text-text-primary">
                      {teacher?.name}
                    </h4>
                    <p className="text-sm text-text-secondary">
                      {teacher?.subject}
                    </p>
                    <p className={`text-xs font-medium ${
                teacher?.status === 'online' ? 'text-success' : 'text-warning'}`
                }>
                      {teacher?.status === 'online' ? 'Online' : 'Indisponibil'}
                    </p>
                  </div>
                </div>
                
                <div className="mb-3">
                  <p className="text-sm text-text-secondary mb-1">Ultimul mesaj:</p>
                  <p className="text-sm text-text-primary line-clamp-2">
                    {teacher?.lastMessage}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    {teacher?.lastMessageTime}
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" iconName="MessageSquare" fullWidth>
                    Mesaj
                  </Button>
                  <Button variant="default" size="sm" iconName="Phone" fullWidth>
                    Sună
                  </Button>
                </div>
              </div>
          )}
          </div>
        </div>
      }
    </div>);

};

export default CommunicationTools;