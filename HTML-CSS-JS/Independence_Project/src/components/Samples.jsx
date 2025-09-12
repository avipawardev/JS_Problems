import React, { useState, useEffect } from "react";
import useStore from "../state/useStore.jsx";
import { generateAllSamples, createThumbnail } from "../samples/synthetic.js";

const Samples = () => {
  const { setImageData, setImageBitmap, setReport, setProcessing } = useStore();
  const [samples, setSamples] = useState([]);
  const [selectedSample, setSelectedSample] = useState(null);

  useEffect(() => {
    // Generate samples when component mounts
    const generatedSamples = generateAllSamples();
    setSamples(generatedSamples);
  }, []);

  const handleSampleSelect = async (sample) => {
    try {
      setSelectedSample(sample);

      // Convert ImageData to ImageBitmap for display
      const canvas = document.createElement("canvas");
      canvas.width = sample.imageData.width;
      canvas.height = sample.imageData.height;
      const ctx = canvas.getContext("2d");
      ctx.putImageData(sample.imageData, 0, 0);

      // Create ImageBitmap
      const imageBitmap = await createImageBitmap(canvas);

      // Set in store
      setImageData(sample.imageData);
      setImageBitmap(imageBitmap);

      // Clear any previous report
      setReport(null);
    } catch (error) {
      console.error("Failed to load sample:", error);
      alert("Failed to load sample image");
    }
  };

  const handleValidateSample = async (sample) => {
    try {
      setProcessing(true);

      // Set the sample image
      await handleSampleSelect(sample);

      // Simulate validation (in real app, this would trigger the validation)
      // For now, just show a message
      alert(
        `Sample "${sample.name}" loaded. Click "Validate Flag" to run BIS validation.`
      );
    } catch (error) {
      console.error("Failed to validate sample:", error);
      alert("Failed to validate sample");
    } finally {
      setProcessing(false);
    }
  };

  if (samples.length === 0) {
    return (
      <div className="samples-container">
        <h3>Generating Test Samples...</h3>
      </div>
    );
  }

  return (
    <div className="samples-container">
      <h3>🧪 BIS Validation Test Samples</h3>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Test the validation system with these synthetic flags. Each sample tests
        different BIS rules.
      </p>

      <div className="samples-grid">
        {samples.map((sample, index) => (
          <div key={index} className="sample-card">
            <div className="sample-preview">
              <img
                src={createThumbnail(sample.imageData, 120)}
                alt={sample.name}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "4px",
                  border: "1px solid #ddd",
                }}
              />
            </div>

            <div className="sample-info">
              <h4>{sample.name}</h4>
              <p>{sample.description}</p>

              <div className="expected-results">
                <strong>Expected Results:</strong>
                <ul>
                  <li>Aspect Ratio: {sample.expectedResults.aspect_ratio}</li>
                  <li>Colors: {sample.expectedResults.colors}</li>
                  <li>
                    Stripe Proportion:{" "}
                    {sample.expectedResults.stripe_proportion}
                  </li>
                  <li>
                    Chakra Position: {sample.expectedResults.chakra_position}
                  </li>
                  <li>Chakra Spokes: {sample.expectedResults.chakra_spokes}</li>
                </ul>
              </div>

              <div className="sample-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleSampleSelect(sample)}
                  style={{ marginRight: "8px" }}
                >
                  📖 Load Sample
                </button>

                <button
                  className="btn btn-primary"
                  onClick={() => handleValidateSample(sample)}
                >
                  🔍 Validate
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedSample && (
        <div
          className="selected-sample-info"
          style={{
            background: "#f8f9fa",
            padding: "15px",
            borderRadius: "8px",
            marginTop: "20px",
            border: "1px solid #e9ecef",
          }}
        >
          <h4>✅ Selected Sample: {selectedSample.name}</h4>
          <p>{selectedSample.description}</p>
          <p style={{ fontSize: "14px", color: "#666" }}>
            This sample is now loaded. Click "Validate Flag" in the toolbar to
            run BIS validation.
          </p>
        </div>
      )}
    </div>
  );
};

export default Samples;
