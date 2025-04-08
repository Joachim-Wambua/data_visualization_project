"use client";
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";
import { steelByCountry } from "@/data/data";

const COLORS = [
  "#4f46e5",
  "#22c55e",
  "#f97316",
  "#ec4899",
  "#06b6d4",
  "#facc15",
  "#8b5cf6",
  "#10b981",
  "#ef4444",
  "#3b82f6",
  "#e11d48",
  "#14b8a6",
  "#a855f7",
  "#f59e0b",
  "#6366f1",
  "#9ca3af", // Others
];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const SteelProductionPieChart = () => {
  return (
    <div className="w-full h-[400px]">
      <h2 className="text-sm text-gray-500 font-semibold mb-1 text-center">
        Top Steel Producing Countries (2023)
      </h2>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={steelByCountry}
            dataKey="production"
            nameKey="country"
            cx="50%"
            cy="50%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {steelByCountry.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `${value} Mt`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SteelProductionPieChart;
