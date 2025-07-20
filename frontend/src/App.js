import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NetflixLoadingScreen from "./components/NetflixLoadingScreen";
import HeroSection from "./components/HeroSection";
import ProductShowcase from "./components/ProductShowcase";
import NetflixRecommendations from "./components/NetflixRecommendations";
import NetflixQuizGame from "./components/NetflixQuizGame";
import WashingMachineTheater from "./components/WashingMachineTheater";
import FeatureShowcase from "./components/FeatureShowcase";
import InteractiveBottleLab from "./components/InteractiveBottleLab";
import SoundVisualizer from "./components/SoundVisualizer";
import MoodMatcher from "./components/MoodMatcher";
import BingeWashingStreaks from "./components/BingeWashingStreaks";
import Testimonials from "./components/Testimonials";
import PricingPlans from "./components/PricingPlans";
import Footer from "./components/Footer";
import EasterEggs from "./components/EasterEggs";
import { Toaster } from "./components/ui/toaster";

const NetflixDetergentApp = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Check if user has seen loading screen before
  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem('hasSeenNetflixLoading');
    if (hasSeenLoading) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    sessionStorage.setItem('hasSeenNetflixLoading', 'true');
    // Ensure any lingering popups are dismissed
    document.body.classList.remove('popup-active'); // Example cleanup
  };

  if (isLoading) {
    return <NetflixLoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <EasterEggs />
      <HeroSection />
      <ProductShowcase />
      <NetflixRecommendations />
      <NetflixQuizGame />
      <WashingMachineTheater />
      <FeatureShowcase />
      <InteractiveBottleLab />
      <SoundVisualizer />
      <MoodMatcher />
      <BingeWashingStreaks />
      <Testimonials />
      <PricingPlans />
      <Footer />
      <Toaster />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<NetflixDetergentApp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;