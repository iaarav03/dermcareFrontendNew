import React, { useState, useEffect } from "react";
import axios from "axios";

const Disease = () => {
  const [diseaseData, setDiseaseData] = useState(""); // Initialize as an empty string
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://health.triage.ninja/en/patient/acne-scars/";

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        const text = response.data;

        // Create a DOMParser
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, "text/html");

        // Find the first <a> tag
        const firstLink = doc.querySelector("a");

        // Extract text until the first <a> tag
        let extractedText = "";
        if (firstLink) {
          const range = doc.createRange();
          range.setStart(doc.body, 0);
          range.setEndBefore(firstLink);
          extractedText = range.toString();
        } else {
          // If there's no <a> tag, use the entire content
          extractedText = text;
        }

        setDiseaseData(extractedText);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4 text-center">Acne Scars</h2>
      {error ? (
        <p>Error loading data. Please try again later.</p>
      ) : diseaseData ? (
        <div className="w-96 mx-auto">
          {/* Display the extracted text */}
          <p dangerouslySetInnerHTML={{ __html: diseaseData }} />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Disease;
