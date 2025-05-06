import React, { useState } from "react";

const KeyMetricField = ({ label, value, explanation }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2">
        <h3 className="font-roboto text-lg font-bold">{label}</h3>
        <button
          type="button"
          onClick={() => setShowInfo(!showInfo)}
          className={`w-6 h-6 flex items-center justify-center rounded-full 
            transition-colors duration-200 
            bg-black text-white hover:bg-orange-400 
            ${showInfo ? "bg-orange-500 text-black" : ""} 
            cursor-pointer`}
          title="Klik for forklaring"
          style={{ cursor: "pointer" }}
        >
          <span className="text-xs font-bold">?</span>
        </button>
      </div>

      <div className="mt-1 text-gray-800 text-xl font-medium">{value}</div>

      {showInfo && (
        <div className="mt-2 text-sm text-gray-600 border-l-4 border-orange-500 pl-3">
          {explanation}
        </div>
      )}
    </div>
  );
};

export default KeyMetricField;
