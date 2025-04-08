"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import SteelProductionChart from "@/components/SteelProductionChart";
import SteelProductionTable from "@/components/SteelProductionTable";
import SteelProductionPieChart from "@/components/SteelProductionPieChart";
import SteelProductionBarChart from "@/components/SteelProductionBarChart";
import HeroSection from "@/components/HeroSection";
import EmissionsMapChart from "@/components/EmissionsMapChart";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DashboardPage() {
  const [emissionData, setEmissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmissions = async () => {
      try {
        const response = await fetch("/api/emissions");
        if (!response.ok) {
          throw new Error("Failed to fetch emissions data");
        }
        const data = await response.json();
        setEmissionData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchEmissions();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Loading environmental data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-center text-red-600">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Prepare data for the chart
  const chartData = {
    labels: emissionData?.map((item) => item.activity),
    datasets: [
      {
        label: "kg CO₂e per activity",
        data: emissionData?.map((item) => item.co2e),
        backgroundColor: "#3b82f6",
      },
    ],
  };

  return (
    <>
      <HeroSection />
      <div className="p-6 space-y-8 mx-8">
        <div
          data-aos="fade-up"
          className="text-justify w-full flex flex-col items-center"
        >
          <p className="text-gray-700 px-4 mt-2 my-1 w-full">
            Steel production is one of the largest contributors to global CO₂
            emissions. This dashboard analyzes the top steel-producing countries
            based on 2023 data, highlighting steel’s journey from post-war
            expansion to today’s powerhouse producers.
          </p>
        </div>

        <div className="flex lg:flex-row sm:flex-col w-full ">
          <div
            className="lg:w-1/2 sm:w-full m-4 bg-white rounded-2xl shadow p-4 border"
            data-aos="fade-right"
          >
            <SteelProductionChart />
          </div>
          <div
            className="lg:w-1/2 sm:w-full m-4 bg-white rounded-2xl shadow p-4 border"
            data-aos="fade-left"
          >
            {/* <SteelProductionTable /> */}
            <SteelProductionPieChart />
          </div>
        </div>
        <p className="text-gray-500 w-full px-4">
          While global output surged—especially post-2000 with China&lsquo;s
          rise—2023&lsquo;s snapshot reveals China, India, and a few others
          dominating the scene, reflecting shifting industrial priorities and
          global influence.
        </p>

        <div className="flex lg:flex-row sm:flex-col w-full ">
          <div
            className="lg:w-1/2 sm:w-full m-4 bg-white rounded-2xl shadow p-4 border"
            data-aos="fade-right"
          >
            <SteelProductionTable />
          </div>
          <div
            className="lg:w-1/2 sm:w-full m-4 bg-white rounded-2xl shadow p-4 border"
            data-aos="fade-left"
          >
            <SteelProductionBarChart />
          </div>
        </div>
        <p className="text-gray-500 w-full px-4">
          This section highlights the top 10 steel-producing companies shaping
          global output. The bar chart reveals just how concentrated the
          industry is, with giants—mostly from China and India—dominating the
          landscape.
        </p>

        <EmissionsMapChart />

        {/* Summary Cards */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {emissionData?.slice(0, 3).map((item, index) => (
            <div key={index} className="bg-white rounded-2xl shadow p-4 border">
              <p className="text-sm text-gray-500">
                {item.year ? item.year : ""} {item.activity} Emissions
              </p>
              <p className="text-xl font-semibold my-1 text-blue-800">
                {item.co2e} Tonnes CO₂e
              </p>
              <p className="text-xs text-gray-400">
                Emission Factor: {item.emission_factor_name}
              </p>
            </div>
          ))}
        </div> */}

        {/* Bar Chart */}
        {/* <div className="bg-white rounded-2xl p-6 shadow border">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Emissions per Activity
          </h2>
          <Bar data={chartData} />
        </div> */}
      </div>
    </>
  );
}
