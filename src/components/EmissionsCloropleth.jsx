export default function EmissionsCloropleth() {
    return (
      <div className="w-full h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
        <iframe
          src="https://steelwatch-data.onrender.com/api/emissions-map"
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="Top Emissions Chart"
        />
      </div>
    );
  }
  