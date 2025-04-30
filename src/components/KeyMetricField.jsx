import React, { useState } from "react";

const KeyMetricField = ({ label, value, explanation }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2">
        <h3 className="font-roboto text-lg font-bold">{label}</h3>
        <div
          className={`w-5 h-5 flex items-center justify-center rounded-full transition-colors duration-200 cursor-pointer ${
            showInfo ? "bg-orange-500" : "bg-black"
          }`}
          onClick={() => setShowInfo(!showInfo)}
          onMouseEnter={(e) => (e.target.style.cursor = "pointer")}
          onMouseLeave={(e) => (e.target.style.cursor = "default")}
          title="Klik for forklaring"
        >
          <span
            className={`text-xs font-bold ${
              showInfo ? "text-black" : "text-white"
            }`}
          >
            ?
          </span>
        </div>
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
