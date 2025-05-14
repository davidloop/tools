import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import PxToRemConverter from './components/PxToRemConverter';
import RatioCalculator from './components/RatioCalculator';
import ModularScale from './components/ModularScale';
import ImageCompressor from './components/ImageCompressor';

function App() {
  const [activeTool, setActiveTool] = useState('pxToRem');

  const tools = [
    { id: 'pxToRem', name: 'Font Size Converter' },
    { id: 'ratioCalculator', name: 'Ratio Calculator' },
    { id: 'modularScale', name: 'Modular Font Size Scale' },
    { id: 'imageCompressor', name: 'Image Compressor' }
  ];

  const renderActiveTool = () => {
    switch (activeTool) {
      case 'pxToRem':
        return <PxToRemConverter />;
      case 'ratioCalculator':
        return <RatioCalculator />;
      case 'modularScale':
        return <ModularScale />;
      case 'imageCompressor':
        return <ImageCompressor />;
      default:
        return <PxToRemConverter />;
    }
  };

  return (
    <div className="App">
      <Header />
      <Navigation 
        tools={tools} 
        activeTool={activeTool} 
        setActiveTool={setActiveTool} 
      />
      <main>
        {renderActiveTool()}
      </main>
    </div>
  );
}

export default App;
