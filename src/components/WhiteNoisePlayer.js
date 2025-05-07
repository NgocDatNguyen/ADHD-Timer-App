import React from 'react';

const WhiteNoisePlayer = ({ whiteNoiseOptions, currentSound, soundPlaying, playWhiteNoise, themes, currentTheme }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
      <h3 className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}>Focus Sounds</h3>
      
      <div className="grid grid-cols-3 gap-2">
        {whiteNoiseOptions.map((sound, index) => (
          <button
            key={index}
            onClick={() => playWhiteNoise(index)}
            className={`p-3 rounded-lg text-center ${currentSound === index && soundPlaying ? themes[currentTheme].primary + ' text-white' : 'bg-gray-100'}`}
          >
            <div className="text-2xl">{sound.icon}</div>
            <div className="text-xs mt-1">{sound.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default WhiteNoisePlayer;