import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CoursePreviewModal = ({ course, isOpen, onClose, onEnroll }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!course) return null;

  const tabs = [
    { id: 'overview', label: 'Prezentare generală', icon: 'Eye' },
    { id: 'curriculum', label: 'Curriculum', icon: 'List' },
    { id: 'instructor', label: 'Instructor', icon: 'User' },
    { id: 'reviews', label: 'Recenzii', icon: 'Star' }
  ];

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Începător': return 'bg-success text-success-foreground';
      case 'Intermediar': return 'bg-warning text-warning-foreground';
      case 'Avansat': return 'bg-error text-error-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-text-primary mb-3">Descriere</h4>
              <p className="text-text-secondary leading-relaxed">{course?.fullDescription}</p>
            </div>
            <div>
              <h4 className="font-semibold text-text-primary mb-3">Ce vei învăța</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {course?.outcomes?.map((outcome, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon name="Check" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-text-secondary text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
            {course?.prerequisites && course?.prerequisites?.length > 0 && (
              <div>
                <h4 className="font-semibold text-text-primary mb-3">Cerințe prealabile</h4>
                <div className="flex flex-wrap gap-2">
                  {course?.prerequisites?.map((prereq, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                    >
                      {prereq}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'curriculum':
        return (
          <div className="space-y-4">
            {course?.curriculum?.map((module, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-text-primary">
                    Modulul {index + 1}: {module.title}
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    {module.duration}
                  </span>
                </div>
                <p className="text-text-secondary text-sm mb-3">{module.description}</p>
                <div className="space-y-2">
                  {module.lessons?.map((lesson, lessonIndex) => (
                    <div key={lessonIndex} className="flex items-center space-x-3 p-2 rounded hover:bg-muted/50">
                      <Icon name="Play" size={14} className="text-primary" />
                      <span className="text-sm text-text-primary flex-1">{lesson?.title}</span>
                      <span className="text-xs text-muted-foreground">{lesson?.duration}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'instructor':
        return (
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Image
                src={course?.instructor?.avatar}
                alt={course?.instructor?.avatarAlt}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-text-primary text-lg">{course?.instructor?.name}</h4>
                <p className="text-primary font-medium mb-2">{course?.instructor?.title}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="Award" size={14} />
                    <span>{course?.instructor?.experience}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>{course?.instructor?.studentsCount} studenți</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span>{course?.instructor?.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-semibold text-text-primary mb-3">Despre instructor</h5>
              <p className="text-text-secondary leading-relaxed">{course?.instructor?.bio}</p>
            </div>
            <div>
              <h5 className="font-semibold text-text-primary mb-3">Calificări</h5>
              <div className="space-y-2">
                {course?.instructor?.qualifications?.map((qual, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <Icon name="CheckCircle" size={16} className="text-accent" />
                    <span className="text-text-secondary text-sm">{qual}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-text-primary">{course?.rating}</div>
                  <div className="flex items-center justify-center space-x-1 mb-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={16}
                        className={`${i < Math.floor(course?.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}`}
                      />
                    ))}
                  </div>
                  <div className="text-sm text-muted-foreground">{course?.reviewsCount} recenzii</div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              {course?.reviews?.map((review, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-start space-x-3 mb-3">
                    <Image
                      src={review?.avatar}
                      alt={review?.avatarAlt}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h6 className="font-medium text-text-primary">{review?.name}</h6>
                        <div className="flex items-center space-x-1">
                          {[...Array(5)]?.map((_, i) => (
                            <Icon
                              key={i}
                              name="Star"
                              size={12}
                              className={`${i < review?.rating ? 'text-warning fill-current' : 'text-muted-foreground'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{review?.date}</p>
                    </div>
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed">{review?.comment}</p>
                  {review?.verified && (
                    <div className="flex items-center space-x-1 mt-2">
                      <Icon name="CheckCircle" size={14} className="text-accent" />
                      <span className="text-xs text-accent font-medium">Achiziție verificată</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="relative bg-card border border-border rounded-xl warm-shadow-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center space-x-4">
                <Image
                  src={course?.image}
                  alt={course?.imageAlt}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div>
                  <h3 className="font-headline font-bold text-xl text-text-primary mb-1">
                    {course?.title}
                  </h3>
                  <div className="flex items-center space-x-3">
                    <span className="px-2 py-1 bg-primary text-primary-foreground text-xs font-semibold rounded-full">
                      Clasa {course?.grade}
                    </span>
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getDifficultyColor(course?.difficulty)}`}>
                      {course?.difficulty}
                    </span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-muted-foreground hover:text-text-primary"
              >
                <Icon name="X" size={20} />
              </Button>
            </div>

            {/* Tabs */}
            <div className="border-b border-border">
              <nav className="flex space-x-8 px-6">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-text-primary'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {renderTabContent()}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between p-6 border-t border-border bg-muted/20">
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  {course?.originalPrice && (
                    <div className="text-sm text-muted-foreground line-through">
                      {course?.originalPrice} RON
                    </div>
                  )}
                  <div className="font-bold text-xl text-primary">
                    {course?.price === 0 ? 'GRATUIT' : `${course?.price} RON`}
                  </div>
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
                  onClick={() => onEnroll(course)}
                  className="bg-primary text-primary-foreground"
                >
                  <Icon name="BookOpen" size={16} className="mr-2" />
                  {course?.price === 0 ? 'Accesează cursul' : 'Înscrie-te acum'}
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CoursePreviewModal;