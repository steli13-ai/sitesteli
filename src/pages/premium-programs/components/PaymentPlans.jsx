import React, { useMemo, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { homepagePremiumPrograms as programsData } from '../../../content/premiumPrograms';
import ProtectedButton from '../../../components/ProtectedButton';

const PaymentPlans = () => {
  const priceFmt = (n) => new Intl.NumberFormat('ro-RO', { style: 'currency', currency: 'RON' }).format(n);

  const programs = useMemo(() => programsData?.map(p => ({
    id: p.id,
    name: p.title,
    totalPrice: p.price,
    originalPrice: p.originalPrice,
    duration: p.duration,
  })), []);

  const monthsFromDuration = (d) => {
    const m = /([0-9]+)/.exec(d || '');
    return m ? Math.max(1, parseInt(m[1], 10)) : 6;
  };

  const buildPlansFor = (p) => {
    const months = monthsFromDuration(p?.duration);
    const fullDiscount = p?.originalPrice && p?.originalPrice > p?.totalPrice
      ? Math.round((1 - p.totalPrice / p.originalPrice) * 100)
      : 0;
    const full = {
      id: 'full',
      name: 'Plată Integrală',
      discount: fullDiscount,
      price: p?.totalPrice,
      originalPrice: p?.originalPrice || p?.totalPrice,
      installments: 1,
      description: fullDiscount > 0 ? `Economisești ${priceFmt((p?.originalPrice - p?.totalPrice))}` : 'Acces imediat la toate materialele',
      popular: false,
      benefits: [
        fullDiscount > 0 ? `${fullDiscount}% reducere` : 'Cel mai bun preț',
        'Acces imediat la toate materialele',
        'Certificat de finalizare',
      ],
    };

    const monthly = {
      id: 'monthly',
      name: 'Plată Lunară',
      discount: 0,
      price: Math.ceil((p?.totalPrice / months) * 100) / 100,
      originalPrice: Math.ceil((p?.totalPrice / months) * 100) / 100,
      installments: months,
      description: `${months} rate lunare`,
      popular: true,
      benefits: ['Fără dobândă', 'Flexibilitate maximă', 'Posibilitate de anulare'],
    };

    const bi = {
      id: 'bi-monthly',
      name: 'Plată la 2 Luni',
      discount: 5,
      price: Math.ceil(((p?.totalPrice * 0.95) / Math.max(1, Math.floor(months / 2))) * 100) / 100,
      originalPrice: Math.ceil(((p?.totalPrice) / Math.max(1, Math.floor(months / 2))) * 100) / 100,
      installments: Math.max(1, Math.floor(months / 2)),
      description: `${Math.max(1, Math.floor(months / 2))} rate la 2 luni`,
      popular: false,
      benefits: ['5% reducere', 'Rate mai mici', 'Planificare ușoară'],
    };

    return months >= 3 ? [full, monthly, bi] : [full, monthly];
  };

  const [selectedProgram, setSelectedProgram] = useState(programs?.[0]?.id || '');
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const paymentPlans = useMemo(() => {
    const map = {};
    programs?.forEach(p => { map[p.id] = buildPlansFor(p); });
    return map;
  }, [programs]);

  const paymentMethods = [
    {
      id: 'card',
      name: 'Card Bancar',
      icon: 'CreditCard',
      description: 'Visa, Mastercard, American Express',
      processing: 'Instant'
    },
    {
      id: 'bank-transfer',
      name: 'Transfer Bancar',
      icon: 'Building',
      description: 'Transfer direct din contul bancar',
      processing: '1-2 zile lucrătoare'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: 'Wallet',
      description: 'Plată securizată prin PayPal',
      processing: 'Instant'
    },
    {
      id: 'installments',
      name: 'Rate prin bancă',
      icon: 'Calendar',
      description: 'Rate fără dobândă prin partenerii bancari',
      processing: '2-3 zile lucrătoare'
    }
  ];

  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Plăți 100% Securizate',
      description: 'Certificare SSL și criptare de nivel bancar'
    },
    {
      icon: 'Lock',
      title: 'Protecție Date',
      description: 'Datele tale sunt protejate conform GDPR'
    },
    {
      icon: 'RefreshCw',
      title: 'Garanție Rambursare',
      description: '30 de zile garanție de rambursare'
    },
    {
      icon: 'Headphones',
      title: 'Suport 24/7',
      description: 'Echipa noastră te ajută oricând'
    }
  ];

  const currentProgram = programs?.find(p => p?.id === selectedProgram);
  const currentPlans = paymentPlans?.[selectedProgram] || [];
  const currentPlan = currentPlans?.find(p => p?.id === selectedPlan) || currentPlans?.[0];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Planuri de Plată Flexibile
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            Alege modalitatea de plată care se potrivește cel mai bine bugetului tău. 
            Oferim opțiuni flexibile pentru fiecare familie.
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Program Selector */}
          <div className="mb-12">
            <h3 className="font-headline text-xl font-bold text-text-primary mb-6 text-center">
              Selectează Programul
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {programs?.map((program) => (
                <button
                  key={program?.id}
                  onClick={() => setSelectedProgram(program?.id)}
                  className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                    selectedProgram === program?.id
                      ? 'border-primary bg-primary/5 warm-shadow'
                      : 'border-border bg-card hover:border-primary/50'
                  }`}
                >
                  <h4 className="font-body font-semibold text-text-primary mb-1">
                    {program?.name}
                  </h4>
                  <div className="text-sm text-text-secondary">
                    {priceFmt(program?.totalPrice)} • {program?.duration}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Plans */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {currentPlans?.map((plan) => (
              <div
                key={plan?.id}
                className={`bg-card border rounded-2xl p-8 transition-all duration-300 relative ${
                  plan?.popular
                    ? 'border-primary warm-shadow-lg scale-105'
                    : 'border-border warm-shadow hover:warm-shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {plan?.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Cel mai popular
                    </div>
                  </div>
                )}

                {/* Plan Header */}
                <div className="text-center mb-6">
                  <h4 className="font-headline text-xl font-bold text-text-primary mb-2">
                    {plan?.name}
                  </h4>
                  <div className="mb-4">
                    <span className="text-3xl font-bold text-text-primary">
                      {priceFmt(plan?.price)}
                    </span>
                    {plan?.installments > 1 && (
                      <div className="text-sm text-text-secondary mt-1">
                        x {plan?.installments} rate
                      </div>
                    )}
                  </div>
                  
                  {plan?.discount > 0 && (
                    <div className="flex items-center justify-center space-x-2 mb-2">
                      <span className="text-sm text-text-secondary line-through">
                        {priceFmt(plan?.originalPrice)}
                      </span>
                      <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold">
                        -{plan?.discount}%
                      </span>
                    </div>
                  )}
                  
                  <p className="text-sm text-text-secondary">
                    {plan?.description}
                  </p>
                </div>

                {/* Benefits */}
                <div className="mb-6">
                  <ul className="space-y-2">
                    {plan?.benefits?.map((benefit, index) => (
                      <li key={index} className="flex items-center space-x-2 text-sm text-text-secondary">
                        <Icon name="Check" size={16} className="text-accent" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Button
                  variant={plan?.popular ? "default" : "outline"}
                  fullWidth
                  onClick={() => setSelectedPlan(plan?.id)}
                  className={plan?.popular ? "bg-primary text-primary-foreground hover:bg-primary/90 font-cta font-semibold" : "font-cta"}
                >
                  {selectedPlan === plan?.id ? (
                    <>
                      <Icon name="Check" size={16} className="mr-2" />
                      Selectat
                    </>
                  ) : (
                    'Selectează Planul'
                  )}
                </Button>
                <div className="mt-3">
                  <ProtectedButton
                    planId={currentProgram?.id}
                    planType={currentProgram?.id}
                    planMode={plan?.id}
                    variant="default"
                    className="w-full"
                  >
                    Mergi la plată
                  </ProtectedButton>
                </div>
              </div>
            ))}
          </div>

          {/* Payment Methods */}
          <div className="bg-card border border-border rounded-2xl p-8 mb-12 warm-shadow">
            <h3 className="font-headline text-xl font-bold text-text-primary mb-6 text-center">
              Modalități de Plată Acceptate
            </h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {paymentMethods?.map((method) => (
                <div key={method?.id} className="text-center p-4 rounded-xl hover:bg-muted/50 transition-colors duration-200">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Icon name={method?.icon} size={24} className="text-primary" />
                  </div>
                  <h4 className="font-body font-semibold text-text-primary mb-2">
                    {method?.name}
                  </h4>
                  <p className="text-sm text-text-secondary mb-2">
                    {method?.description}
                  </p>
                  <div className="text-xs text-accent font-semibold">
                    {method?.processing}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Security Features */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
            {securityFeatures?.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon name={feature?.icon} size={24} className="text-accent" />
                </div>
                <h4 className="font-body font-semibold text-text-primary mb-2">
                  {feature?.title}
                </h4>
                <p className="text-sm text-text-secondary">
                  {feature?.description}
                </p>
              </div>
            ))}
          </div>

          {/* Summary & CTA */}
          <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 border border-primary/20 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Summary */}
              <div>
                <h3 className="font-headline text-2xl font-bold text-text-primary mb-4">
                  Rezumatul Selecției Tale
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Program:</span>
                    <span className="font-semibold text-text-primary">{currentProgram?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Plan de plată:</span>
                    <span className="font-semibold text-text-primary">{currentPlan?.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Preț per rată:</span>
                    <span className="font-semibold text-text-primary">{priceFmt(currentPlan?.price)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-text-secondary">Numărul de rate:</span>
                    <span className="font-semibold text-text-primary">{currentPlan?.installments}</span>
                  </div>
                  {currentPlan?.discount > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Economii:</span>
                      <span className="font-semibold text-accent">
                        {priceFmt((currentPlan?.originalPrice - currentPlan?.price) * currentPlan?.installments)}
                      </span>
                    </div>
                  )}
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-text-primary">Total de plată:</span>
                      <span className="text-xl font-bold text-primary">
                        {priceFmt(currentPlan?.price * currentPlan?.installments)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="text-center lg:text-right">
                <div className="mb-6">
                  <div className="text-sm text-text-secondary mb-2">Începe transformarea ta matematică astăzi!</div>
                  <div className="flex items-center justify-center lg:justify-end space-x-2 text-sm text-accent">
                    <Icon name="Shield" size={16} />
                    <span>30 zile garanție de rambursare</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <ProtectedButton
                    planId={currentProgram?.id}
                    planType={currentProgram?.id}
                    planMode={currentPlan?.id}
                    className="h-12 text-lg font-semibold w-full lg:w-auto"
                  >
                    <Icon name="CreditCard" size={20} className="mr-2" />
                    Continuă la plată
                  </ProtectedButton>
                  <div className="text-xs text-text-secondary">Vei fi redirecționat către pagina de plată securizată</div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-12 text-center">
            <p className="font-body text-text-secondary mb-4">
              Ai întrebări despre planurile de plată?
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Button asChild variant="outline" size="sm">
                <a href="/intrebari-frecvente">
                <Icon name="HelpCircle" size={16} className="mr-2" />
                Întrebări Frecvente
                </a>
              </Button>
              <Button asChild variant="outline" size="sm">
                <a href="/contact">
                <Icon name="MessageCircle" size={16} className="mr-2" />
                Contactează-ne
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentPlans;