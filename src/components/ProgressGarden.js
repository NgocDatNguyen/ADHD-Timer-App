import React from 'react';

const ProgressGarden = ({ garden }) => {
  const renderGarden = () => {
    if (garden === 0) {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🌱</div>
          <div className="text-sm font-medium">Seed</div>
        </div>
      );
    } else if (garden === 1) {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🌿</div>
          <div className="text-sm font-medium">Sprout</div>
        </div>
      );
    } else if (garden === 2) {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🪴</div>
          <div className="text-sm font-medium">Small Plant</div>
        </div>
      );
    } else if (garden === 3) {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🌳</div>
          <div className="text-sm font-medium">Healthy Tree</div>
        </div>
      );
    } else if (garden === 4) {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🌲</div>
          <div className="text-sm font-medium">Mature Tree</div>
        </div>
      );
    } else {
      return (
        <div className="text-center p-4">
          <div className="text-4xl mb-2">🌴🌲🌳</div>
          <div className="text-sm font-medium">Beautiful Garden</div>
        </div>
      );
    }
  };

  return (
    <div className="w-full p-4 bg-white rounded-lg mb-4 shadow-sm">
      <h3 className="font-medium mb-3">Progress Garden</h3>
      {renderGarden()}
    </div>
  );
};

export default ProgressGarden;