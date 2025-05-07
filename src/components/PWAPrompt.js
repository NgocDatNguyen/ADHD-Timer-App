import React from 'react';

const PWAPrompt = ({ message, onClose, onAction, actionText }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-blue-500 text-white text-center shadow-md z-50">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        <p>{message}</p>
        <div className="flex items-center ml-4">
          {actionText && (
            <button 
              onClick={onAction}
              className="bg-white text-blue-500 px-3 py-1 rounded-md mr-2"
            >
              {actionText}
            </button>
          )}
          <button 
            onClick={onClose}
            className="bg-white bg-opacity-20 rounded-full w-6 h-6 flex items-center justify-center"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default PWAPrompt;