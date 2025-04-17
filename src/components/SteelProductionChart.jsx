"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getAnnualSteelProdData } from "@/lib/getAnnualSteelProdData";

const SteelProductionChart = () => {
  const data = getAnnualSteelProdData();

  return (
    <div className="w-full h-[400px]">
      <h2 className="text-sm font-semibold mb-4 text-gray-500 text-center">
        Annual World Crude Steel Production (1950–2023)
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" tick={{ fontSize: 12 }} />
          <YAxis
            label={{
              value: "Million Tonnes",
              angle: -90,
              position: "insideLeft",
            }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="world_crude_steel_production_million_tonnes"
            stroke="#4bc0c0"
            strokeWidth={2}
            fill="#009b9d"
            dot={false}
            name="World Steel Production"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SteelProductionChart;
