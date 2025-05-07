import React from 'react';

const TimerSettings = ({ workMinutes, breakMinutes, handleWorkMinutesChange, handleBreakMinutesChange, timerPresets, currentPreset, handlePresetSelect, themes, currentTheme }) => {
  return (
    <div className="w-full p-4 bg-white rounded-lg mb-6 shadow-sm">
      <h3 className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}>Timer Settings</h3>
      <div className="flex justify-between mb-2">
        <label htmlFor="workMinutes" className="font-medium">Work duration (min):</label>
        <input 
          id="workMinutes"
          type="number" 
          className="w-20 p-2 border border-gray-300 rounded-md text-center"
          value={workMinutes} 
          onChange={handleWorkMinutesChange}
          min="1"
          max="60"
        />
      </div>
      <div className="flex justify-between mb-2">
        <label htmlFor="breakMinutes" className="font-medium">Break duration (min):</label>
        <input 
          id="breakMinutes"
          type="number" 
          className="w-20 p-2 border border-gray-300 rounded-md text-center"
          value={breakMinutes} 
          onChange={handleBreakMinutesChange}
          min="1"
          max="30"
        />
      </div>
      
      <h3 className="font-medium mt-4 mb-3">Timer Presets</h3>
      <div className="grid grid-cols-3 gap-2">
        {Object.keys(timerPresets).map(preset => (
          <button
            key={preset}
            onClick={() => handlePresetSelect(preset)}
            className={`p-2 text-xs rounded-md text-center ${currentPreset === preset ? `${themes[currentTheme].primary} text-white` : 'bg-gray-100'}`}
          >
            {timerPresets[preset].name}
            <div className="text-xs mt-1 font-normal">
              {timerPresets[preset].work}m/{timerPresets[preset].break}m
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimerSettings;