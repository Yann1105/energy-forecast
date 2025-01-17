import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const App = () => {
  const [hours, setHours] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePredict = async () => {
    setError("");
    setLoading(true);
    setPredictions([]);

    if (!hours || isNaN(hours) || hours <= 0) {
      setError("Please enter a valid number of hours.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hours: Number(hours) }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch predictions.");
      }

      const data = await response.json();
      setPredictions(data.predictions);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Formater les prédictions pour le graphique
  const chartData = predictions.map((prediction, index) => ({
    hour: index + 1,
    prediction: prediction.toFixed(2),
  }));

  // Conseils basés sur les prédictions
  const getAdvice = () => {
    if (predictions.length === 0) return "";
    const averagePrediction = predictions.reduce((a, b) => a + b, 0) / predictions.length;
    if (averagePrediction > 200) {
      return "High energy consumption detected. Consider reducing usage during peak hours.";
    } else if (averagePrediction > 100) {
      return "Moderate energy consumption. Optimize usage to save energy.";
    } else {
      return "Low energy consumption. Keep up the good work!";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          Energy Predictions
        </h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Hours to Predict:
          </label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter number of hours"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button
          onClick={handlePredict}
          className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Get Predictions"}
        </button>

        {predictions.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-medium text-gray-800 mb-4">Predictions:</h2>

            {/* Graphique interactif */}
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" name="Hour" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="prediction"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Conseils */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-blue-800 mb-2">Advice:</h3>
              <p className="text-gray-700">{getAdvice()}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;