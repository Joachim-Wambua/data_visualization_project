"use client";
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import {
  geoData,
  countriesData,
  steelCompaniesData,
  steelActiveProjects,
} from "@/data/data";
import SteelProductionChart from "@/components/SteelProductionChart";
import SteelProductionTable from "@/components/SteelProductionTable";
import SteelProductionPieChart from "@/components/SteelProductionPieChart";
import SteelProductionBarChart from "@/components/SteelProductionBarChart";
import HeroSection from "@/components/HeroSection";
import WorldEmissionsMap from "@/components/WorldEmissionsMap";
import ProjectsChart from "@/components/ProjectsChart";
import ActiveProjectsMap from "@/components/ActiveProjectsMap";
import CompanySteelProduction from "@/components/CompanySteelProduction";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function DashboardPage() {
  const [emissionData, setEmissionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure we are in a client-side environment
  useEffect(() => {
    setIsClient(true);
  }, []);

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

    if (isClient) {
      fetchEmissions();
    }
  }, [isClient]);

  if (!isClient) {
    return null; // Return null to prevent rendering server-side
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="spinner"></div>
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
        <p className="text-gray-500 font-sans w-full px-4">
          This section highlights the top 10 steel-producing companies shaping
          global output. The bar chart reveals just how concentrated the
          industry is, with giants—mostly from China and India—dominating the
          landscape.
        </p>

        <div className="flex flex-col items-center justify-center my-8 bg-white rounded-2xl shadow p-4 border">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Active Low-Carbon Projects in the Steel Industry
          </h2>
          <p className="text-gray-600 text-center mb-6">
            This map highlights the locations of active low-carbon projects that
            have been announced within the steel industry. It provides insight
            into the global efforts to reduce carbon emissions, showcasing the
            regions where these innovative projects are being implemented to
            transform the future of steel production.
          </p>
          <ActiveProjectsMap data={steelActiveProjects} />
        </div>

        <div className="flex lg:flex-row sm:flex-col w-full ">
          <div
            className="lg:w-1/2 sm:w-full m-4 bg-white rounded-2xl shadow p-4 border"
            data-aos="fade-right"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Technologies Used in Active Low-Carbon Projects in the Steel
              Industry
            </h2>
            <p className="text-gray-600 mb-6">
              This chart shows the distribution of technologies used in active
              low-carbon steel projects, highlighting innovations that reduce
              emissions and enhance sustainability.
            </p>
            <ProjectsChart data={steelActiveProjects} />
          </div>
        </div>

        <div
          className="w-full font-sans m-4 bg-white rounded-2xl shadow p-4 border"
          data-aos="fade-left"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Global Emissions by Country
            </h2>
            <p className="text-gray-600">
              This map provides a visual representation of emissions levels
              across different countries, with a focus on highlighting the
              environmental impact of steel production globally.
            </p>
          </div>
          <WorldEmissionsMap />
        </div>
      </div>
    </>
  );
}
