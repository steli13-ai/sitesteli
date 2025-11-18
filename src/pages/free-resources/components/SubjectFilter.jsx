import React from 'react';
import Icon from '../../../components/AppIcon';

const SubjectFilter = ({ selectedSubjects, onSubjectChange, subjects }) => {
  const toggleSubject = (subjectId) => {
    if (selectedSubjects?.includes(subjectId)) {
      onSubjectChange(selectedSubjects?.filter(id => id !== subjectId));
    } else {
      onSubjectChange([...selectedSubjects, subjectId]);
    }
  };

  return (
    <div className="bg-card rounded-xl p-6 warm-shadow">
      <h3 className="font-headline font-semibold text-lg text-text-primary mb-4">
        Domenii matematice
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {subjects?.map((subject) => (
          <button
            key={subject?.id}
            onClick={() => toggleSubject(subject?.id)}
            className={`flex items-center space-x-3 p-3 rounded-lg border-2 transition-all duration-200 ${
              selectedSubjects?.includes(subject?.id)
                ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted text-text-secondary hover:text-primary'
            }`}
          >
            <Icon 
              name={subject?.icon} 
              size={20} 
              className={selectedSubjects?.includes(subject?.id) ? 'text-primary' : 'text-text-secondary'} 
            />
            <span className="font-body font-medium text-sm">{subject?.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SubjectFilter;