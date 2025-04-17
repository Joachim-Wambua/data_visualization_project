import React from "react";

const TopSteelCompanies = () => {
  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
      <iframe
        src="https://steelwatch-data.onrender.com/api/steel-map-chart"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Top Emissions Chart"
      />
    </div>
  );
};

export default TopSteelCompanies;
