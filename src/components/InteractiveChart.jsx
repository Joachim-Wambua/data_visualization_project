export default function InteractiveChart() {
  return (
    <div className="w-full h-[600px] bg-white rounded-lg shadow-md overflow-hidden">
      <iframe
        src="http://localhost:8000/api/interactive-emissions"
        width="100%"
        height="100%"
        style={{ border: "none" }}
        title="Top Emissions Chart"
      />
    </div>
  );
}
