import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProjectsChart = ({ data }) => {
  // Aggregate data based on technology
  const aggregatedData = data.reduce((acc, { technology }) => {
    if (!acc[technology]) {
      acc[technology] = 0;
    }
    acc[technology] += 1;
    return acc;
  }, {});

  // Convert aggregated data to an array of objects for Recharts
  const chartData = Object.keys(aggregatedData).map(tech => ({
    name: tech,
    number_of_projects: aggregatedData[tech],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="number_of_projects" fill="#74cbcb" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProjectsChart;
