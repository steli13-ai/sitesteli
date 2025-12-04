import React from 'react';
import { motion } from 'framer-motion';

const ExamTypeSelector = ({ examTypes, selectedExamType, onSelect }) => (
  <>
    {!selectedExamType && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center mb-12"
      >
        <div className="bg-card rounded-xl p-8 warm-shadow max-w-2xl">
          <h2 className="font-headline font-semibold text-2xl text-text-primary mb-6 text-center">
            Alege tipul de examen
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {examTypes.map((exam) => (
              <button
                key={exam.id}
                onClick={() => onSelect(exam.id)}
                className="p-6 rounded-lg border-2 border-border hover:border-primary transition-all duration-200 hover:warm-shadow text-left group"
              >
                <h3 className="font-headline font-semibold text-lg text-text-primary group-hover:text-primary transition-colors">
                  {exam.examType}
                </h3>
                <p className="text-text-secondary mt-2">{exam.grade}</p>
                <div className="flex items-center mt-3">
                  <span className="text-sm text-primary font-medium">Selectează →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    )}
    {selectedExamType && (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center mb-12"
      >
        <div className="bg-card rounded-xl p-2 warm-shadow">
          <div className="flex space-x-2">
            {examTypes.map((exam) => (
              <button
                key={exam.id}
                onClick={() => onSelect(exam.id)}
                className={`px-6 py-3 rounded-lg font-cta font-semibold transition-all duration-200 ${
                  selectedExamType === exam.id
                    ? 'bg-primary text-primary-foreground warm-shadow'
                    : 'text-text-secondary hover:text-primary hover:bg-muted'
                }`}
              >
                {exam.examType}
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    )}
  </>
);

export default ExamTypeSelector;
