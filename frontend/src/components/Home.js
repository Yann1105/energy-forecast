import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate("/prediction"); // Redirige vers la page de prédiction
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Section Hero */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold">Welcome to Energy Forecast</h1>
          <p className="mt-4 text-lg">
            Use this platform to upload data, make predictions, and gain insights to optimize energy usage.
          </p>
        </div>
      </div>

      {/* Section Features */}
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-8">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Data Upload</h3>
            <p className="text-gray-600">
              Easily upload your energy data in various formats for analysis.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Predictions</h3>
            <p className="text-gray-600">
              Get accurate energy consumption predictions based on your data.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Insights</h3>
            <p className="text-gray-600">
              Receive actionable insights to optimize your energy usage.
            </p>
          </div>
        </div>
      </div>

      {/* Section About */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-blue-600 mb-8">About Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Energy Forecast is a cutting-edge platform designed to help businesses and individuals
            optimize their energy consumption. Our advanced algorithms provide accurate predictions
            and actionable insights to reduce costs and improve efficiency.
          </p>
        </div>
      </div>

      {/* Section Call to Action */}
      <div className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8">
            Sign up today and start optimizing your energy usage with Energy Forecast.
          </p>
          <button
            onClick={handleSignUpClick}
            className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition duration-300"
          >
            Sign Up Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;