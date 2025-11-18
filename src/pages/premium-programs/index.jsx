import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import NetopiaCheckout from '../../components/payment/NetopiaCheckout';
import ProgramHero from './components/ProgramHero';
import ProtectedButton from '../../components/ProtectedButton';
import Icon from '../../components/AppIcon';
import { homepagePremiumPrograms as programs } from '../../content/premiumPrograms';


import ComparisonTable from './components/ComparisonTable';
import PaymentPlans from './components/PaymentPlans';
import SuccessStories from './components/SuccessStories';
import ExpertEndorsements from './components/ExpertEndorsements';
// import ScholarshipProgram from './components/ScholarshipProgram';

const PremiumPrograms = () => {
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const { user } = useAuth();

  // programs imported from shared content

  const handleProgramSelect = (program) => {
    setSelectedProgram(program);
    setShowCheckout(true);
  };

  const handleCheckoutClose = () => {
    setShowCheckout(false);
    setSelectedProgram(null);
  };

  const handlePaymentSuccess = () => {
    setShowCheckout(false);
    setSelectedProgram(null);
    // Success handling will be done by the checkout component
  };

  return (
    <div className="min-h-screen bg-background">
  {/* Header provided by layout */}
      {/* Hero Section */}
      <ProgramHero />
      {/* Programs Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Alege programul potrivit pentru tine
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Fiecare program este conceput pentru a te ajuta să obții rezultatele dorite la matematică.
            </p>
          </motion.div>

          {/* Centered 3-column grid matching homepage card style */}
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs?.map((program, index) => {
              const styles = [
                { bg: 'from-primary/10 to-primary/5', border: 'border-primary/20', text: 'text-primary', badgeBg: 'bg-primary' },
                { bg: 'from-secondary/10 to-secondary/5', border: 'border-secondary/20', text: 'text-secondary', badgeBg: 'bg-secondary' },
                { bg: 'from-warning/10 to-warning/5', border: 'border-warning/20', text: 'text-warning', badgeBg: 'bg-warning' }
              ][index % 3];
              return (
              <motion.div
                key={program?.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-gradient-to-br ${styles.bg} border ${styles.border} rounded-2xl p-8 warm-shadow hover:warm-shadow-lg transition-all duration-300 group`}
              >
                {/* Badge */}
                {program?.badge && (
                  <div className={`absolute -top-3 left-6 px-3 py-1 ${styles.badgeBg} text-white text-sm font-medium rounded-full`}>
                    {program?.badge}
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <div className={`w-14 h-14 ${styles.badgeBg} rounded-xl flex items-center justify-center warm-shadow mb-3`}>
                    <span className="text-2xl font-bold text-white">{program?.title?.charAt(0)}</span>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary mb-1">{program?.title}</h3>
                  <p className={`${styles.text} text-sm font-medium mb-2`}>{program?.subtitle}</p>
                  <p className="text-text-secondary text-sm">{program?.description}</p>
                </div>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline space-x-2 mb-2">
                    <span className="text-3xl font-bold text-text-primary">
                      {new Intl.NumberFormat('ro-RO', {
                        style: 'currency',
                        currency: 'RON'
                      })?.format(program?.price)}
                    </span>
                    {program?.originalPrice && (
                      <span className="text-lg text-text-secondary line-through">
                        {new Intl.NumberFormat('ro-RO', {
                          style: 'currency',
                          currency: 'RON'
                        })?.format(program?.originalPrice)}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-text-secondary">
                    pentru {program?.duration}
                  </p>
                </div>

                {/* Features */}
                <div className="mb-8">
                  <ul className="space-y-3">
                    {program?.features?.slice(0, 4)?.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start space-x-2 text-sm">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                        <span className="text-text-secondary">{feature}</span>
                      </li>
                    ))}
                    {program?.features?.length > 4 && (
                      <li className="text-sm text-primary font-medium pl-7">
                        +{program?.features?.length - 4} alte beneficii
                      </li>
                    )}
                  </ul>
                </div>

                {/* Updated CTA Button using ProtectedButton */}
                <ProtectedButton
                  planId={program?.id}
                  planType={program?.type}
                  className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 ${styles.badgeBg} text-white hover:scale-105 hover:shadow-lg border-0`}
                >
                  Plătește acum
                </ProtectedButton>
              </motion.div>
            );})}
          </div>

          {/* Enhanced Banner for Authentication */}
          {!user && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl text-center"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <Icon name="User" size={24} className="text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2">
                Autentifică-te pentru a-ți vedea progresul
              </h3>
              <p className="text-blue-700 mb-4">
                Creează un cont gratuit pentru a salva fișele preferate și a-ți urmări progresul.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/account?auth=login"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Conectare
                </a>
                <a
                  href="/account?auth=signup"
                  className="bg-white text-blue-600 border-2 border-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                >
                  Creează cont gratuit
                </a>
              </div>
            </motion.div>
          )}
        </div>
      </section>
      {/* Comparison Table */}
      <ComparisonTable programs={programs} onSelectProgram={handleProgramSelect} />
      {/* Payment Plans */}
      <PaymentPlans />
      {/* Success Stories */}
      <SuccessStories />
      {/* Expert Endorsements */}
      <ExpertEndorsements />
  {/* Scholarship Program removed per request */}
      {/* Checkout Modal */}
      {showCheckout && selectedProgram && (
        <NetopiaCheckout
          subscriptionType={selectedProgram?.type}
          price={selectedProgram?.price}
          title={selectedProgram?.title}
          description={selectedProgram?.description}
          features={selectedProgram?.features}
          onClose={handleCheckoutClose}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default PremiumPrograms;