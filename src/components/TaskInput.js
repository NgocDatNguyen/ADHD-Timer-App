import React from 'react';

const TaskInput = ({ currentTask, handleTaskChange, currentTip, themes, currentTheme, mode }) => {
  return (
    <div className="mx-auto max-w-md w-full p-6 bg-white rounded-lg mb-8 shadow-sm">
      <h3 className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}>What are you working on?</h3>
      <input 
        type="text" 
        className="w-full px-3 py-3 border border-gray-300 rounded-md text-base mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={currentTask} 
        onChange={handleTaskChange}
        placeholder="Enter your current task..."
      />
      <div className={`p-4 rounded-lg text-white text-center ${mode === 'work' ? themes[currentTheme].primary : themes[currentTheme].secondary}`}>
        <strong>Focus Tip:</strong> {currentTip}
      </div>
    </div>
  );
};

export default TaskInput;