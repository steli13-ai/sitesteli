import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PreviewModal = ({ resource, isOpen, onClose, onDownload }) => {
  if (!isOpen || !resource) return null;

  const handleBackdropClick = (e) => {
    if (e?.target === e?.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-card rounded-2xl warm-shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon 
                name={resource?.type === 'video' ? 'Play' : 'FileText'} 
                size={24} 
                className="text-primary" 
              />
            </div>
            <div>
              <h2 className="font-headline font-bold text-xl text-text-primary">
                {resource?.title}
              </h2>
              <p className="text-sm text-text-secondary">
                Clasa {resource?.grade} • {resource?.subject}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            className="text-text-secondary hover:text-text-primary"
          />
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {resource?.type === 'video' ? (
            <div className="space-y-6">
              {/* Video Thumbnail */}
              <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                <Image
                  src={resource?.thumbnail}
                  alt={resource?.thumbnailAlt}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-background/20">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center warm-shadow">
                    <Icon name="Play" size={32} className="text-primary-foreground ml-1" />
                  </div>
                </div>
                {resource?.duration && (
                  <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded text-sm font-body font-medium">
                    {Math.floor(resource?.duration / 60)}h {resource?.duration % 60}min
                  </div>
                )}
              </div>

              {/* Video Description */}
              <div className="space-y-4">
                <h3 className="font-headline font-semibold text-lg text-text-primary">
                  Despre acest videoclip
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {resource?.description}
                </p>
                
                {/* Topics Covered */}
                {resource?.topics && (
                  <div>
                    <h4 className="font-body font-semibold text-text-primary mb-2">
                      Subiecte abordate:
                    </h4>
                    <ul className="space-y-1">
                      {resource?.topics?.map((topic, index) => (
                        <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                          <Icon name="CheckCircle" size={16} className="text-accent" />
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* PDF Preview Pages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {resource?.previewPages?.map((page, index) => (
                  <div key={index} className="border border-border rounded-lg overflow-hidden">
                    <Image
                      src={page?.image}
                      alt={page?.alt}
                      className="w-full h-auto"
                    />
                    <div className="p-3 bg-muted">
                      <p className="text-xs text-text-secondary text-center">
                        Pagina {page?.number} din {resource?.pages}
                      </p>
                    </div>
                  </div>
                )) || (
                  <div className="col-span-2 aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <Icon name="FileText" size={48} className="text-text-secondary mx-auto mb-2" />
                      <p className="text-text-secondary">Previzualizare indisponibilă</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Resource Description */}
              <div className="space-y-4">
                <h3 className="font-headline font-semibold text-lg text-text-primary">
                  Despre această resursă
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {resource?.description}
                </p>
                
                {/* Resource Details */}
                <div className="grid grid-cols-2 gap-4 p-4 bg-muted rounded-lg">
                  <div className="text-center">
                    <div className="font-body font-semibold text-text-primary">
                      {resource?.pages}
                    </div>
                    <div className="text-xs text-text-secondary">Pagini</div>
                  </div>
                  <div className="text-center">
                    <div className="font-body font-semibold text-text-primary">
                      {resource?.downloads?.toLocaleString('ro-RO')}
                    </div>
                    <div className="text-xs text-text-secondary">Descărcări</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex items-center space-x-4 text-sm text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} />
              <span>{resource?.rating?.toFixed(1)}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Download" size={16} />
              <span>{resource?.downloads?.toLocaleString('ro-RO')}</span>
            </div>
            <div>
              Actualizat: {new Date(resource.updatedAt)?.toLocaleDateString('ro-RO')}
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Închide
            </Button>
            <Button
              variant="default"
              onClick={() => onDownload(resource?.id)}
              iconName="Download"
              iconPosition="left"
              className="font-cta font-semibold"
            >
              Descarcă Gratuit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;