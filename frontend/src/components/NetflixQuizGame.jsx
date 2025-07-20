import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';

const NetflixQuizGame = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [detergentPersonality, setDetergentPersonality] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);

  const questions = [
    {
      question: "What's your ideal Friday night?",
      options: [
        { text: "Binge-watching action movies", genre: "Action", points: 5 },
        { text: "Romantic dinner and movie", genre: "Romance", points: 4 },
        { text: "Thriller marathon until 3 AM", genre: "Thriller", points: 5 },
        { text: "Comedy specials with friends", genre: "Comedy", points: 4 }
      ]
    },
    {
      question: "How do you handle laundry day?",
      options: [
        { text: "Like a military operation", genre: "Action", points: 5 },
        { text: "Carefully and lovingly", genre: "Romance", points: 4 },
        { text: "Hope nothing goes wrong", genre: "Thriller", points: 3 },
        { text: "With music and dancing", genre: "Comedy", points: 5 }
      ]
    },
    {
      question: "Your washing machine makes a weird noise. You:",
      options: [
        { text: "Immediately investigate and fix it", genre: "Action", points: 4 },
        { text: "Gently ask it what's wrong", genre: "Romance", points: 3 },
        { text: "Panic - something terrible will happen", genre: "Thriller", points: 5 },
        { text: "Name it and make jokes about it", genre: "Comedy", points: 5 }
      ]
    },
    {
      question: "What's your washing philosophy?",
      options: [
        { text: "Go big or go home", genre: "Action", points: 5 },
        { text: "Treat clothes like loved ones", genre: "Romance", points: 5 },
        { text: "What could possibly go wrong?", genre: "Thriller", points: 4 },
        { text: "Make it fun and entertaining", genre: "Comedy", points: 4 }
      ]
    },
    {
      question: "Your dream wash cycle duration:",
      options: [
        { text: "Quick and intense - 15 minutes", genre: "Action", points: 4 },
        { text: "Long and gentle - 2+ hours", genre: "Romance", points: 5 },
        { text: "Unpredictable timing keeps me on edge", genre: "Thriller", points: 3 },
        { text: "Whatever makes the best blooper reel", genre: "Comedy", points: 4 }
      ]
    }
  ];

  const personalities = {
    Action: {
      name: "Action Apple Rush",
      description: "You're a high-energy, get-things-done type of washer! You like your cleaning explosive and your results immediate.",
      color: "from-red-500 to-orange-500",
      icon: "💥",
      traits: ["Fast-paced", "Efficient", "Bold", "Results-driven"],
      recommendation: "Perfect for busy lifestyles and tough stains that need immediate action!"
    },
    Romance: {
      name: "Romantic Rose Rinse",
      description: "You believe washing should be a love story. Every fabric deserves tender care and attention.",
      color: "from-pink-500 to-rose-500",
      icon: "💖",
      traits: ["Gentle", "Caring", "Detailed", "Passionate"],
      recommendation: "Ideal for delicate fabrics and those who treat laundry as self-care."
    },
    Thriller: {
      name: "Suspense Citrus Soak",
      description: "Laundry is an adventure for you! You never know what's going to happen next, and you love it.",
      color: "from-purple-500 to-indigo-500",
      icon: "🔪",
      traits: ["Mysterious", "Unpredictable", "Intense", "Edge-of-seat"],
      recommendation: "For those who want their washing experience to be thrilling and unexpected."
    },
    Comedy: {
      name: "Comedy Cotton Cleanse",
      description: "You make everything fun! Laundry day is entertainment day with you around.",
      color: "from-yellow-500 to-orange-500",
      icon: "😂",
      traits: ["Fun-loving", "Optimistic", "Creative", "Entertaining"],
      recommendation: "Perfect for making mundane tasks into memorable experiences!"
    }
  };

  // Timer countdown
  useEffect(() => {
    if (timeLeft > 0 && !showResult && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showResult) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult, quizCompleted]);

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    const points = questions[currentQuestion].options[answerIndex].points;
    setScore(score + points);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === null && timeLeft > 0) return;

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(15);
      } else {
        completeQuiz();
      }
    }, 2000);
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
    
    // Calculate personality based on answers
    const genreScores = { Action: 0, Romance: 0, Thriller: 0, Comedy: 0 };
    
    // Simple scoring - in real implementation, you'd track all answers
    const topGenre = score > 20 ? "Action" : 
                    score > 15 ? "Comedy" : 
                    score > 12 ? "Romance" : "Thriller";
    
    setDetergentPersonality(personalities[topGenre]);
    
    // Save result to localStorage
    localStorage.setItem('netflixDetergentQuizResult', JSON.stringify({
      personality: topGenre,
      score: score,
      completedAt: new Date().toISOString()
    }));
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setDetergentPersonality(null);
    setTimeLeft(15);
  };

  if (quizCompleted && detergentPersonality) {
    return (
      <section className="py-12 sm:py-20 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-8">
              Your Netflix Detergent <span className="text-purple-400">Personality</span>
            </h2>
            
            <Card className="bg-black/60 backdrop-blur-lg border-purple-500/30 overflow-hidden">
              <div className={`h-4 bg-gradient-to-r ${detergentPersonality.color}`}></div>
              
              <CardContent className="p-6 sm:p-12">
                <div className="text-center mb-8">
                  <div className="text-8xl sm:text-9xl mb-4">{detergentPersonality.icon}</div>
                  <h3 className="text-3xl sm:text-4xl font-black text-white mb-4">
                    {detergentPersonality.name}
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto mb-6">
                    {detergentPersonality.description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Your Traits</h4>
                    <div className="flex flex-wrap gap-2">
                      {detergentPersonality.traits.map((trait, index) => (
                        <Badge key={index} className={`bg-gradient-to-r ${detergentPersonality.color} text-white`}>
                          {trait}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-bold text-white mb-4">Perfect For</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {detergentPersonality.recommendation}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-900/50 rounded-lg p-6 mb-8">
                  <h4 className="text-xl font-bold text-white mb-4 text-center">Your Score Breakdown</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-red-500">{score}</div>
                      <div className="text-gray-400 text-sm">Total Score</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-500">
                        {Math.round((score / (questions.length * 5)) * 100)}%
                      </div>
                      <div className="text-gray-400 text-sm">Match Rate</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-500">{questions.length}</div>
                      <div className="text-gray-400 text-sm">Questions</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-500">A+</div>
                      <div className="text-gray-400 text-sm">Grade</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button className={`w-full bg-gradient-to-r ${detergentPersonality.color} text-white py-4 text-lg font-bold transform hover:scale-105 transition-all`}>
                    🛒 Get My Perfect Detergent
                  </Button>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      variant="outline" 
                      className="flex-1 border-purple-500 text-purple-400 hover:bg-purple-500/20"
                      onClick={resetQuiz}
                    >
                      🔄 Retake Quiz
                    </Button>
                    <Button 
                      variant="outline" 
                      className="flex-1 border-purple-500 text-purple-400 hover:bg-purple-500/20"
                    >
                      📱 Share Result
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-br from-purple-900 via-black to-indigo-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-4xl sm:text-6xl font-black text-white mb-4 sm:mb-6">
              Which Netflix <span className="text-purple-400">Detergent</span> Are You?
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">
              Take our personality quiz to find your perfect washing companion!
            </p>
          </div>

          <Card className="bg-black/60 backdrop-blur-lg border-purple-500/30">
            <CardHeader>
              <div className="flex justify-between items-center mb-4">
                <CardTitle className="text-white">
                  Question {currentQuestion + 1} of {questions.length}
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-sm">⏰</span>
                  <Badge className={`${timeLeft <= 5 ? 'bg-red-600' : 'bg-blue-600'}`}>
                    {timeLeft}s
                  </Badge>
                </div>
              </div>
              <Progress value={((currentQuestion) / questions.length) * 100} className="h-2" />
            </CardHeader>

            <CardContent className="p-6 sm:p-8">
              {!showResult ? (
                <>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 text-center">
                    {questions[currentQuestion].question}
                  </h3>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className={`w-full p-4 sm:p-6 text-left border-2 transition-all text-sm sm:text-base ${
                          selectedAnswer === index
                            ? 'border-purple-500 bg-purple-500/20 text-white'
                            : 'border-gray-600 text-gray-300 hover:border-purple-400 hover:bg-purple-400/10'
                        }`}
                        onClick={() => handleAnswerSelect(index)}
                      >
                        <div className="flex items-center">
                          <span className="mr-3 font-bold">{String.fromCharCode(65 + index)}</span>
                          {option.text}
                        </div>
                      </Button>
                    ))}
                  </div>

                  <div className="flex justify-center mt-6 sm:mt-8">
                    <Button
                      onClick={handleNextQuestion}
                      disabled={selectedAnswer === null}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 sm:px-8 py-3 text-lg font-semibold disabled:opacity-50"
                    >
                      {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'} →
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 sm:py-12">
                  <div className="text-6xl sm:text-8xl mb-4">🎬</div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                    Analyzing Your Washing Style...
                  </h3>
                  <div className="flex justify-center space-x-2 mb-4">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-2 h-2 bg-purple-500 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <p className="text-gray-300">Creating your personalized detergent profile...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default NetflixQuizGame;