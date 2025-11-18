import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = ({ stats }) => {
  const statItems = [
    {
      icon: 'Users',
      value: stats?.activeUsers?.toLocaleString('ro-RO'),
      label: 'Elevi activi',
      color: 'text-primary'
    },
    {
      icon: 'Download',
      value: stats?.totalDownloads?.toLocaleString('ro-RO'),
      label: 'Descărcări totale',
      color: 'text-secondary'
    },
    {
      icon: 'FileText',
      value: stats?.totalResources?.toLocaleString('ro-RO'),
      label: 'Resurse disponibile',
      color: 'text-accent'
    },
    {
      icon: 'Star',
      value: stats?.averageRating?.toFixed(1),
      label: 'Rating mediu',
      color: 'text-warning'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="font-headline font-bold text-2xl text-text-primary mb-3">
          Comunitatea Mate cu succes în cifre
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto">
          Mii de elevi au descoperit deja bucuria matematicii prin resursele noastre gratuite.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems?.map((item, index) => (
          <div key={index} className="text-center">
            <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto mb-4 warm-shadow">
              <Icon name={item?.icon} size={24} className={item?.color} />
            </div>
            <div className="font-headline font-bold text-2xl text-text-primary mb-1">
              {item?.value}
            </div>
            <div className="text-sm text-text-secondary font-body">
              {item?.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;