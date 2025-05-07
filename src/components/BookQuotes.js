import React from 'react';

const BookQuotes = ({ currentQuote, themes, currentTheme }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm mb-6">
      <h3 className={`text-lg font-medium ${themes[currentTheme].textPrimary} mb-4`}>Book Quotes</h3>
      
      <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 italic">
        "{currentQuote}"
      </div>
    </div>
  );
};

export default BookQuotes;