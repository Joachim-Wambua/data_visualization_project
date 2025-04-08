import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { topSteelProdCompanies } from "@/data/data"; // Import your data

// Data Transformation for the BarChart
const barData = topSteelProdCompanies.map((item) => ({
  company: item.company,
  production: item.production,
}));

const SteelProductionBarChart = () => {
  const totalProduction = topSteelProdCompanies.reduce(
    (total, item) => total + item.production,
    0
  );

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-600 text-center">
        Top 10 Steel Producing Companies of 2023
      </h2>

      {/* Bar Chart */}
      <div className="max-w-md mx-auto" style={{ height: "400px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              className="text-xs"
              dataKey="company"
              angle={-60} // This will rotate the labels
              textAnchor="end" // Adjusts the alignment of the rotated text
              height={100} // Adjusts the space for the rotated labels
            />
            <YAxis />
            <Tooltip formatter={(value) => `${value} Mt`} />
            <Legend />
            <Bar dataKey="production" fill="#74cbcb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Total Production */}
      <div className="mt-4 text-center text-gray-600">
        <p>Total Production: {totalProduction.toFixed(2)} Mt</p>
      </div>
    </div>
  );
};

export default SteelProductionBarChart;
