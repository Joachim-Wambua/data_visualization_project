import React from "react";

const CompanyEmissions = () => {
  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
      <iframe
        src="http://localhost:8000/api/steel-bar-chart"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Top Companies by Steel Production(2023)"
      />
    </div>
  );
};

export default CompanyEmissions;
