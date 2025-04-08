import React from "react";

const HeroSection = () => {
  return (
    <section
      className="relative w-full h-[60vh] bg-center bg-cover bg-no-repeat flex items-center justify-center text-white"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://res.cloudinary.com/dltjv8zbh/image/upload/v1744111009/steel-bg_fmfeyq.jpg')",
      }}
    >
      <div className="text-center px-6 max-w-3xl">
        <h1 className="text-4xl md:text-4xl font-bold leading-tight">
          Decoding Steel: A Data-Driven Dive into Global Production & Emissions
        </h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200">
          Discover trends on one of the world's most carbon-intensive industry
        </p>
        {/* <div className="mt-6">
          <a
            href="#explore"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-xl transition"
          >
            Explore the Dashboard
          </a>
        </div> */}
      </div>
    </section>
  );
};

export default HeroSection;
