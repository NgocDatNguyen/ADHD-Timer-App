import React from 'react';

const DistractionJournal = ({ distractions, currentDistraction, handleDistractionsChange, saveDistraction, themes, currentTheme }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
      <h3 className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}>Distraction Journal</h3>
      
      <div className="mb-4 flex">
        <input
          type="text"
          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md"
          placeholder="Note what distracted you..."
          value={currentDistraction}
          onChange={handleDistractionsChange}
        />
        <button
          onClick={saveDistraction}
          className={`px-4 py-2 ${themes[currentTheme].primary} text-white rounded-r-md`}
        >
          Save
        </button>
      </div>
      
      {distractions.length > 0 && (
        <div>
          <h4 className="font-medium mb-2">Distraction History</h4>
          <div className="max-h-40 overflow-y-auto">
            {distractions.map(distraction => (
              <div key={distraction.id} className="p-2 border-b border-gray-200 text-sm">
                <div>{distraction.text}</div>
                <div className="text-xs text-gray-500">
                  {new Date(distraction.date).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DistractionJournal;