import React from 'react';
import { motion } from 'framer-motion';

const HeroSection = () => (
  <section className="pt-24 pb-16 px-4 lg:px-6 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
    <div className="absolute inset-0 opacity-30">
      <div className="absolute top-20 left-10 text-primary/20 text-6xl font-bold math-symbol-float">∫</div>
      <div className="absolute top-40 right-20 text-secondary/20 text-4xl font-bold math-symbol-float">π</div>
      <div className="absolute bottom-20 left-1/4 text-accent/20 text-5xl font-bold math-symbol-float">√</div>
      <div className="absolute bottom-32 right-1/3 text-trust/20 text-3xl font-bold math-symbol-float">∑</div>
    </div>
    <div className="max-w-7xl mx-auto relative">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="font-headline font-bold text-4xl lg:text-6xl text-text-primary mb-6">
          Examene mari,{" "}
          <span className="text-examene-purple">pași siguri</span> 📘
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
          Transformă-ți teama de examene în încredere și rezultate excelente.
          Pregătire structurată pentru Evaluarea Națională și Bacalaureat.
        </p>
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
