import React from 'react';

const BreathingExercise = ({ breathingPhase, breathingActive, toggleBreathingExercise, themes, currentTheme }) => {
  const phases = {
    inhale: { text: 'Breathe In', duration: 4, color: 'bg-blue-500' },
    hold: { text: 'Hold', duration: 4, color: 'bg-purple-500' },
    exhale: { text: 'Breathe Out', duration: 6, color: 'bg-green-500' }
  };
  
  const current = phases[breathingPhase];
  
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
      <h3 className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}>Breathing Exercise</h3>
      
      {breathingActive ? (
        <div className="mb-6">
          <div className={`text-center py-10 rounded-lg ${current.color} text-white mb-4`}>
            <div className="text-2xl font-medium mb-2">{current.text}</div>
            <div className="inline-block w-24 h-24 rounded-full border-4 border-white flex items-center justify-center">
              <div 
                className={`w-20 h-20 rounded-full bg-white bg-opacity-50 transition-all duration-1000 ease-in-out ${
                  breathingPhase === 'inhale' ? 'transform scale-100' : 
                  breathingPhase === 'hold' ? 'transform scale-100' : 
                  'transform scale-50'
                }`}
              ></div>
            </div>
          </div>
          <button 
            onClick={toggleBreathingExercise}
            className={`w-full px-4 py-3 ${themes[currentTheme].primary} text-white rounded-lg font-medium`}
          >
            Stop Breathing Exercise
          </button>
        </div>
      ) : (
        <button 
          onClick={toggleBreathingExercise}
          className={`w-full px-4 py-3 ${themes[currentTheme].primary} text-white rounded-lg font-medium`}
        >
          Start Breathing Exercise
        </button>
      )}
    </div>
  );
};

export default BreathingExercise;