import ChartCard from "@/components/SteelProductionChart";
import { getEmissionsData } from "@/lib/getAnnualSteelProdData";

export default function DashboardPage() {
  //   const data = getEmissionsData();

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">
        Steel Emissions Dashboard
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* <ChartCard title="Global Steel Sector CO₂ Emissions (2016–2022)" data={data} /> */}
      </div>
    </main>
  );
}
