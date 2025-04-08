// app/api/emissions/route.js
export async function GET() {
  const headers = {
    Authorization: `Bearer ${process.env.CLIMATIQ_API_KEY}`,
    "Content-Type": "application/json",
  };

  const activities = [
    {
      activity: "Steel Production",
      params: {
        emission_factor: {
          activity_id: "metals-type_steel_production",
          data_version: "^0",
        },
        parameters: { weight: 80, weight_unit: "t" },
      },
    },
    {
      activity: "Aluminium Production",
      params: {
        emission_factor: {
          activity_id: "processes-industrial-metals-aluminium",
          region: "global",
        },
        parameters: { mass: 1000, mass_unit: "kg" },
      },
    },
    {
      activity: "Steel Casting (Generic)",
      params: {
        emission_factor: {
          activity_id: "processes-industrial-metals-casting",
          region: "global",
        },
        parameters: { mass: 1000, mass_unit: "kg" },
      },
    },
  ];

  const results = [];

  for (const item of activities) {
    const res = await fetch("https://beta4.api.climatiq.io/estimate", {
      method: "POST",
      headers,
      body: JSON.stringify(item.params),
    });

    const json = await res.json();
    results.push({
      activity: item.activity,
      co2e: json.co2e,
      emission_factor_name: json.emission_factor?.name,
      year: json.emission_factor?.year,
    });
  }

  return Response.json(results);
}
