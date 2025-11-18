import React from 'react';
import Button from '../../../components/ui/Button';

const GradeFilter = ({ selectedGrade, onGradeChange, grades }) => {
  return (
    <div className="bg-card rounded-xl p-6 warm-shadow">
      <h3 className="font-headline font-semibold text-lg text-text-primary mb-4">
        Alege clasa ta
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {grades?.map((grade) => (
          <Button
            key={grade?.value}
            variant={selectedGrade === grade?.value ? "default" : "outline"}
            size="sm"
            onClick={() => onGradeChange(grade?.value)}
            className={`font-cta font-semibold ${
              selectedGrade === grade?.value 
                ? 'bg-primary text-primary-foreground' 
                : 'hover:bg-primary/10 hover:text-primary hover:border-primary'
            }`}
          >
            {grade?.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default GradeFilter;