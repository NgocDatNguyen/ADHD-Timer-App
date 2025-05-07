import React from 'react';

const TabNavigation = ({ tabCategories, currentTab, setCurrentTab, themes, currentTheme }) => {
  return (
    <div className="flex border-b overflow-x-auto">
      {tabCategories.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setCurrentTab(tab.id)}
          className={`px-4 py-3 text-sm font-medium flex items-center
            ${currentTab === tab.id ? 
              `${themes[currentTheme].textPrimary} border-b-2 ${themes[currentTheme].textPrimary.replace('text', 'border')}` : 
              'text-gray-500'
            }`}
        >
          <span className="mr-2">{tab.icon}</span>
          <span>{tab.name}</span>
        </button>
      ))}
      <button
        onClick={() => setCurrentTab('customize')}
        className={`px-4 py-3 text-sm font-medium flex items-center
          ${currentTab === 'customize' ? 
            `${themes[currentTheme].textPrimary} border-b-2 ${themes[currentTheme].textPrimary.replace('text', 'border')}` : 
            'text-gray-500'
          }`}
      >
        <span className="mr-2">⚙️</span>
        <span>Customize</span>
      </button>
    </div>
  );
};

export default TabNavigation;