import React from 'react';
import { motion } from 'framer-motion';
import ExamCountdown from '../components/ExamCountdown';
import ExamTypeCard from '../components/ExamTypeCard';
import MockExamSimulator from '../components/MockExamSimulator';
import ProgressTracker from '../components/ProgressTracker';
import SuccessStories from '../components/SuccessStories';
import StudyPlan from '../components/StudyPlan';
import { getExamQuestions, getProgressData, getSuccessStories } from '../data/examData';

const ExamContent = ({ selectedExamType, selectedExam, examDate, onStartPreparation, onMockExamComplete }) => {
  if (!selectedExamType) return null;
  return (
    <div id="exam-content">
      {/* Countdown */}
      <section className="py-16 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <ExamCountdown examType={selectedExam?.examType} examDate={examDate} className="max-w-2xl mx-auto" />
          </motion.div>
        </div>
      </section>
      {/* Details */}
      <section className="py-16 px-4 lg:px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-headline font-semibold text-3xl text-text-primary mb-4">Pregătire pentru {selectedExam?.examType}</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Program specializat cu metodologii dovedite și rezultate garantate</p>
          </motion.div>
          <div className="flex justify-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <ExamTypeCard {...selectedExam} onStartPreparation={() => onStartPreparation(selectedExam?.id)} />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Mock Exam */}
      <section className="py-16 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-headline font-semibold text-3xl text-text-primary mb-4">Simulează examenul real</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Testează-ți cunoștințele în condiții similare cu examenul oficial.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} viewport={{ once: true }}>
            <MockExamSimulator examType={selectedExam?.examType} questions={getExamQuestions(selectedExamType)} timeLimit={selectedExamType === 'evaluare' ? 90 : 120} onComplete={onMockExamComplete} />
          </motion.div>
        </div>
      </section>
      {/* Progress & Study Plan */}
      <section id="study-plan" className="py-16 px-4 lg:px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-headline font-semibold text-3xl text-text-primary mb-4">Urmărește-ți progresul</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">Planificare inteligentă și monitorizare constantă pentru rezultate optime</p>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
              <ProgressTracker {...getProgressData(selectedExamType)} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }} viewport={{ once: true }}>
              <StudyPlan examType={selectedExam?.examType} examDate={examDate} currentLevel="Intermediar" targetGrade="9+" />
            </motion.div>
          </div>
        </div>
      </section>
      {/* Success Stories */}
      <section className="py-16 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <SuccessStories stories={getSuccessStories(selectedExamType)} />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ExamContent;
