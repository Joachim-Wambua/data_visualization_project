import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts/core";
import { countriesData } from "@/data/data";

const EmissionsMapChart = () => {
  const [mapOption, setMapOption] = useState(null);
  const [isMapRegistered, setIsMapRegistered] = useState(false);

  useEffect(() => {
    const fetchWorldMap = async () => {
      const response = await fetch(
        "https://geo.datav.aliyun.com/areas/bound/geojson?code=world"
      );
      const worldGeoJSON = await response.json();

      echarts.registerMap("world", worldGeoJSON);
      setIsMapRegistered(true);
    };

    fetchWorldMap();
  }, []);

  useEffect(() => {
    if (!isMapRegistered) return;

    // This assumes countriesData has .name (e.g., 'China') and .emissions
    const emissionsMap = countriesData.reduce((acc, curr) => {
      acc[curr.name] = curr.emissions;
      return acc;
    }, {});

    const option = {
      title: {
        text: "Global Emissions Map",
        left: "center",
      },
      tooltip: {
        trigger: "item",
        formatter: (params) =>
          `${params.name}<br/>Emissions: ${
            params.value ? params.value.toLocaleString() : "No data"
          }`,
      },
      visualMap: {
        min: 0,
        max: Math.max(...Object.values(emissionsMap)),
        text: ["High", "Low"],
        realtime: false,
        calculable: true,
        inRange: {
          color: ["#e0f7fa", "#006064"],
        },
      },
      series: [
        {
          name: "Emissions",
          type: "map",
          map: "world",
          roam: true,
          emphasis: {
            label: {
              show: true,
            },
          },
          data: countriesData.map((country) => ({
            name: country.name, // Make sure this matches GeoJSON feature name!
            value: country.emissions,
          })),
        },
      ],
    };

    setMapOption(option);
  }, [isMapRegistered]);

  return (
    mapOption && (
      <ReactECharts
        option={mapOption}
        style={{ height: "600px", width: "100%" }}
        opts={{ renderer: "svg" }}
      />
    )
  );
};

export default EmissionsMapChart;
