import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MockExamSimulator = ({ examType, questions, timeLimit, onComplete, className = '' }) => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(timeLimit * 60); // Convert to seconds
  const [isActive, setIsActive] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleFinishExam();
    }
    return () => clearInterval(interval);
  }, [isActive, timeRemaining]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours?.toString()?.padStart(2, '0')}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const handleStartExam = () => {
    // Redirect to new simulation page with selection + upload
    navigate('/simulare-examen');
  };

  const handleAnswerSelect = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinishExam = () => {
    setIsActive(false);
    
    // Calculate score
    let correctAnswers = 0;
    questions?.forEach(question => {
      if (answers?.[question?.id] === question?.correctAnswer) {
        correctAnswers++;
      }
    });
    
    const finalScore = Math.round((correctAnswers / questions?.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    
    if (onComplete) {
      onComplete({
        score: finalScore,
        correctAnswers,
        totalQuestions: questions?.length,
        timeUsed: (timeLimit * 60) - timeRemaining
      });
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  if (showResults) {
    return (
      <div className={`bg-card rounded-xl p-6 warm-shadow ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Trophy" size={32} className="text-primary" />
          </div>
          <h3 className="font-headline font-semibold text-2xl text-text-primary mb-2">
            Simulare Completă!
          </h3>
          <div className={`text-4xl font-bold mb-4 ${getScoreColor(score)}`}>
            {score}%
          </div>
          <p className="text-text-secondary mb-6">
            Ai răspuns corect la {Object.values(answers)?.filter((answer, index) => 
              answer === questions?.[index]?.correctAnswer
            )?.length} din {questions?.length} întrebări
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-lg font-semibold text-text-primary">
                {Math.floor(((timeLimit * 60) - timeRemaining) / 60)} min
              </div>
              <div className="text-sm text-text-secondary">Timp folosit</div>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <div className="text-lg font-semibold text-text-primary">
                {score >= 60 ? 'Promovat' : 'Respins'}
              </div>
              <div className="text-sm text-text-secondary">Rezultat</div>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowResults(false);
                setCurrentQuestion(0);
                setAnswers({});
                setTimeRemaining(timeLimit * 60);
              }}
              className="flex-1"
            >
              Încearcă din nou
            </Button>
            <Button 
              variant="default" 
              className="flex-1"
            >
              Vezi soluțiile
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!isActive) {
    return (
      <div className={`bg-card rounded-xl p-6 warm-shadow ${className}`}>
        <div className="text-center">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Play" size={32} className="text-secondary" />
          </div>
          <h3 className="font-headline font-semibold text-xl text-text-primary mb-2">
            Simulare {examType}
          </h3>
          <p className="text-text-secondary mb-4">
            Testează-ți cunoștințele într-un mediu similar cu examenul real
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-lg font-semibold text-text-primary">{questions?.length}</div>
              <div className="text-sm text-text-secondary">Întrebări</div>
            </div>
            <div className="p-3 bg-muted rounded-lg">
              <div className="text-lg font-semibold text-text-primary">{timeLimit} min</div>
              <div className="text-sm text-text-secondary">Timp limită</div>
            </div>
          </div>

          <Button 
            variant="default" 
            onClick={handleStartExam}
            className="w-full font-cta font-semibold"
          >
            Începe Simularea
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  const currentQ = questions?.[currentQuestion];
  const progress = ((currentQuestion + 1) / questions?.length) * 100;

  return (
    <div className={`bg-card rounded-xl p-6 warm-shadow ${className}`}>
      {/* Header with timer and progress */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Clock" size={20} className="text-warning" />
          <span className="font-mono text-lg font-semibold text-text-primary">
            {formatTime(timeRemaining)}
          </span>
        </div>
        <div className="text-sm text-text-secondary">
          Întrebarea {currentQuestion + 1} din {questions?.length}
        </div>
      </div>
      {/* Progress bar */}
      <div className="w-full bg-muted rounded-full h-2 mb-6">
        <div 
          className="bg-primary h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      {/* Question */}
      <div className="mb-6">
        <h4 className="font-headline font-semibold text-lg text-text-primary mb-4">
          {currentQ?.question}
        </h4>
        
        <div className="space-y-3">
          {currentQ?.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQ?.id, option)}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                answers?.[currentQ?.id] === option
                  ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  answers?.[currentQ?.id] === option
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {answers?.[currentQ?.id] === option && (
                    <Icon name="Check" size={14} className="text-white" />
                  )}
                </div>
                <span className="font-body">{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={handlePrevQuestion}
          disabled={currentQuestion === 0}
        >
          <Icon name="ChevronLeft" size={16} className="mr-2" />
          Anterior
        </Button>

        <div className="flex space-x-3">
          {currentQuestion === questions?.length - 1 ? (
            <Button
              variant="default"
              onClick={handleFinishExam}
              className="bg-success text-success-foreground hover:bg-success/90"
            >
              Finalizează Examenul
              <Icon name="Check" size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={handleNextQuestion}
            >
              Următoarea
              <Icon name="ChevronRight" size={16} className="ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockExamSimulator;