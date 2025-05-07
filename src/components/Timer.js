import React from 'react';

const Timer = ({ formatTime, secondsLeft, isActive, mode, startTimer, pauseTimer, resetTimer, themes, currentTheme }) => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto max-w-md mb-8">
      {/* Timer Display */}
      <div className={`text-7xl font-bold ${themes[currentTheme].textPrimary} mb-6 ${themes[currentTheme].timerDisplay} bg-opacity-40 px-8 py-4 rounded-xl w-full text-center shadow-sm relative`}>
        {formatTime()}
        {/* Mode indicator */}
        <div className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-white bg-opacity-30">
          {mode === 'work' ? 'Focus' : 'Break'}
        </div>
      </div>
      
      {/* Control Buttons */}
      <div className="flex gap-4 mb-6 w-full justify-center">
        <button 
          onClick={startTimer} 
          disabled={isActive}
          className={`px-3 py-3 border-none rounded-full ${mode === 'work' ? themes[currentTheme].primary : themes[currentTheme].secondary} text-white font-bold cursor-pointer transition-all duration-200 text-base flex-1 max-w-32 text-center disabled:bg-gray-300 disabled:cursor-not-allowed hover:shadow-md hover:-translate-y-1`}
        >
          {mode === 'work' ? 'Start Focus' : 'Start Break'}
        </button>
        <button 
          onClick={pauseTimer} 
          disabled={!isActive}
          className="px-3 py-3 border-none rounded-full bg-orange-500 text-white font-bold cursor-pointer transition-all duration-200 text-base flex-1 max-w-32 text-center disabled:bg-gray-300 disabled:cursor-not-allowed hover:shadow-md hover:-translate-y-1"
        >
          Pause
        </button>
        <button 
          onClick={resetTimer}
          className="px-3 py-3 border-none rounded-full bg-gray-500 text-white font-bold cursor-pointer transition-all duration-200 text-base flex-1 max-w-32 text-center hover:shadow-md hover:-translate-y-1"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;