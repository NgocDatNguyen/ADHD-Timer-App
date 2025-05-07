import React from 'react';

const Achievements = ({ achievements }) => {
  return (
    <div className="w-full p-4 bg-white rounded-lg mb-4 shadow-sm">
      <h3 className="font-medium mb-3">Achievements</h3>
      <div className="grid grid-cols-3 gap-2">
        <div className={`text-center p-2 rounded-lg border ${achievements.includes('streak-3') ? 'bg-yellow-100 border-yellow-300' : 'bg-gray-100 border-gray-200 opacity-50'}`}>
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-xs font-medium">3-day streak</div>
        </div>
        <div className={`text-center p-2 rounded-lg border ${achievements.includes('streak-7') ? 'bg-yellow-100 border-yellow-300' : 'bg-gray-100 border-gray-200 opacity-50'}`}>
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-xs font-medium">7-day streak</div>
        </div>
        <div className={`text-center p-2 rounded-lg border ${achievements.includes('streak-14') ? 'bg-yellow-100 border-yellow-300' : 'bg-gray-100 border-gray-200 opacity-50'}`}>
          <div className="text-2xl mb-1">🔥</div>
          <div className="text-xs font-medium">14-day streak</div>
        </div>
        <div className={`text-center p-2 rounded-lg border ${achievements.includes('sessions-1') ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-200 opacity-50'}`}>
          <div className="text-2xl mb-1">🎯</div>
          <div className="text-xs font-medium">1 session</div>
        </div>
        <div className={`text-center p-2 rounded-lg border ${achievements.includes('sessions-10') ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-200 opacity-50'}`}>
          <div className="text-2xl mb-1">🏆</div>
          <div className="text-xs font-medium">10 sessions</div>
        </div>
        <div className={`text-center p-2 rounded-lg border ${achievements.includes('sessions-25') ? 'bg-green-100 border-green-300' : 'bg-gray-100 border-gray-200 opacity-50'}`}>
          <div className="text-2xl mb-1">⭐</div>
          <div className="text-xs font-medium">25 sessions</div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;