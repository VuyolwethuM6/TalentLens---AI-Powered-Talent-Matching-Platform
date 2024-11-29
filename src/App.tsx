import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AssessmentGame } from './components/AssessmentGame';

function App() {
  // Simple client-side routing
  const path = window.location.pathname;
  const assessmentMatch = path.match(/^\/assessment\/(.+)/);

  if (assessmentMatch) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16">
          <AssessmentGame assessmentId={assessmentMatch[1]} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
    </div>
  );
}

export default App;