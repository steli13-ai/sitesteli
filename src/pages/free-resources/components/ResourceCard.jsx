import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ resource, onDownload, onPreview }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    await onDownload(resource?.id);
    setTimeout(() => setIsDownloading(false), 1000);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'worksheet': return 'FileText';
      case 'video': return 'Play';
      case 'interactive': return 'Gamepad2';
      case 'test': return 'CheckSquare';
      default: return 'File';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'worksheet': return 'text-primary';
      case 'video': return 'text-secondary';
      case 'interactive': return 'text-accent';
      case 'test': return 'text-warning';
      default: return 'text-text-secondary';
    }
  };

  const formatDuration = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  return (
    <div className="bg-card rounded-xl warm-shadow hover:warm-shadow-lg transition-all duration-300 overflow-hidden group">
      {/* Thumbnail/Preview */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={resource?.thumbnail}
          alt={resource?.thumbnailAlt}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <div className="flex items-center space-x-2 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
            <Icon name={getTypeIcon(resource?.type)} size={16} className={getTypeColor(resource?.type)} />
            <span className={`text-xs font-cta font-semibold ${getTypeColor(resource?.type)}`}>
              {resource?.typeLabel}
            </span>
          </div>
        </div>

        {/* Duration for videos */}
        {resource?.type === 'video' && resource?.duration && (
          <div className="absolute bottom-3 right-3">
            <div className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-body font-medium text-text-primary">
              {formatDuration(resource?.duration)}
            </div>
          </div>
        )}

        {/* Play button for videos */}
        {resource?.type === 'video' && (
          <button
            onClick={() => onPreview(resource)}
            className="absolute inset-0 flex items-center justify-center bg-background/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center warm-shadow">
              <Icon name="Play" size={24} className="text-primary-foreground ml-1" />
            </div>
          </button>
        )}
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Grade and Subject */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-cta font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full">
            Clasa {resource?.grade}
          </span>
          <span className="text-xs font-body text-text-secondary">
            {resource?.subject}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-headline font-semibold text-lg text-text-primary mb-2 line-clamp-2">
          {resource?.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-text-secondary mb-4 line-clamp-3">
          {resource?.description}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4 text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={14} />
              <span>{resource?.downloads?.toLocaleString('ro-RO')}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} />
              <span>{resource?.rating?.toFixed(1)}</span>
            </div>
            {resource?.pages && (
              <div className="flex items-center space-x-1">
                <Icon name="FileText" size={14} />
                <span>{resource?.pages} pag.</span>
              </div>
            )}
          </div>
          <span className="text-xs text-text-secondary">
            {new Date(resource.updatedAt)?.toLocaleDateString('ro-RO')}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="default"
            size="sm"
            onClick={handleDownload}
            loading={isDownloading}
            iconName="Download"
            iconPosition="left"
            className="flex-1 font-cta font-semibold"
          >
            {isDownloading ? 'Se descarcă...' : 'Descarcă'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPreview(resource)}
            iconName="Eye"
            className="px-3"
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;