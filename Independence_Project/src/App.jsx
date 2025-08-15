import React, { useState, Suspense, lazy } from "react";
import useStore from "./state/useStore.jsx";

// Lazy load components for faster initial load
const FilePicker = lazy(() => import("./components/FilePicker.jsx"));
const PreviewCanvas = lazy(() => import("./components/PreviewCanvas.jsx"));
const JsonPane = lazy(() => import("./components/JsonPane.jsx"));
const Toolbar = lazy(() => import("./components/Toolbar.jsx"));
const Samples = lazy(() => import("./components/Samples.jsx"));

// Simple loading spinner
const LoadingSpinner = () => (
  <div
    style={{
      width: "20px",
      height: "20px",
      border: "2px solid #f3f3f3",
      borderTop: "2px solid #3498db",
      borderRadius: "50%",
      animation: "spin 1s linear infinite",
      margin: "10px auto",
    }}
  ></div>
);

function App() {
  const { showSamples } = useStore();
  const [devMode] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("dev") === "true";
  });

  return (
    <div className="app">
      <div className="header">
        <h1>Indian Flag BIS Validator</h1>
        <p>
          Computer Vision-powered flag validation against BIS specifications
        </p>
        {devMode && (
          <div
            style={{
              background: "#fef3c7",
              color: "#92400e",
              padding: "8px 16px",
              borderRadius: "8px",
              marginTop: "10px",
              fontSize: "14px",
            }}
          >
            🧪 Development Mode - Fast validation with mock results
          </div>
        )}
      </div>

      <div className="main-content">
        <div className="preview-section">
          <Suspense fallback={<LoadingSpinner />}>
            <FilePicker />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <PreviewCanvas />
          </Suspense>

          <Suspense fallback={<LoadingSpinner />}>
            <Toolbar />
          </Suspense>
        </div>

        <div className="json-section">
          <Suspense fallback={<LoadingSpinner />}>
            <JsonPane />
          </Suspense>
        </div>
      </div>

      {showSamples && (
        <Suspense fallback={<LoadingSpinner />}>
          <Samples />
        </Suspense>
      )}
    </div>
  );
}

export default App;
