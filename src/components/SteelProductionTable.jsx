import { topSteelProdCompanies } from "@/data/data";
const SteelProductionTable = () => {
  return (
    // <div className="p-6 space-y-8">
    //   <h2 className="text-2xl text-gray-600 font-bold text-center">
    //     Top 10 Steel Producing Companies of 2023
    //   </h2>
    //   <table className="min-w-full table-auto text-sm">
    //     <thead>
    //       <tr>
    //         <th className="py-2 px-4 text-left text-gray-700">Rank</th>
    //         <th className="py-2 px-4 text-left text-gray-700">Company</th>
    //         <th className="py-2 px-4 text-left text-gray-700">
    //           Production (Million tonnes)
    //         </th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {topSteelProdCompanies.map((item) => (
    //         <tr key={item.rank} className="border-t">
    //           <td className="py-2 px-4 text-gray-600">{item.rank}</td>
    //           <td className="py-2 px-4 text-gray-600">{item.company}</td>
    //           <td className="py-2 px-4 text-gray-600">{item.production}</td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>
    <div className="w-full h-full flex items-center justify-center bg-white rounded-lg shadow-md overflow-hidden">
      <iframe
        src="http://localhost:8000/api/steel-companies-table"
        width="150%"
        height="100%"
        style={{ border: "none" }}
        title="Top Companies by Steel Production(2023)"
      />
    </div>
  );
};

export default SteelProductionTable;
