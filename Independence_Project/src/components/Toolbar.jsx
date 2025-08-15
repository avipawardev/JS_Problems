import React, { useCallback, useRef, useState, useEffect } from "react";
import useStore from "../state/useStore.jsx";
import { loadOpenCV, createFallbackValidator } from "../cv/opencvLoader.js";

const Toolbar = () => {
  const { imageData, setReport, setProcessing, showDebugOverlay, setShowDebugOverlay, showSamples, setShowSamples } = useStore();
  const [opencvStatus, setOpencvStatus] = useState("initializing");
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");
  const [fallbackMode, setFallbackMode] = useState(false);
  const workerRef = useRef(null);
  const fallbackValidator = useRef(null);

  // Initialize fallback validator immediately
  useEffect(() => {
    fallbackValidator.current = createFallbackValidator();
  }, []);

  // Try to load OpenCV with timeout
  useEffect(() => {
    let mounted = true;
    
    const initOpenCV = async () => {
      try {
        setOpencvStatus("loading");
        setLoadingMessage("🚀 Loading OpenCV.js...");
        
        // Try to load OpenCV with a short timeout
        const opencvPromise = loadOpenCV();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("OpenCV loading timeout")), 10000)
        );
        
        await Promise.race([opencvPromise, timeoutPromise]);
        
        if (mounted) {
          setOpencvStatus("loaded");
          setLoadingMessage("✅ OpenCV.js loaded - Ready for real BIS validation!");
          console.log("✅ OpenCV.js loaded successfully");
          
          // Clear message after 3 seconds
          setTimeout(() => setLoadingMessage(""), 3000);
        }
      } catch (error) {
        if (mounted) {
          console.warn("OpenCV loading failed, using fallback mode:", error.message);
          setOpencvStatus("fallback");
          setFallbackMode(true);
          setLoadingMessage("⚠️ Using fast fallback validation");
          setTimeout(() => setLoadingMessage(""), 3000);
        }
      }
    };

    // Start loading after a short delay
    const timer = setTimeout(initOpenCV, 500);
    
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, []);

  // Initialize Web Worker only when OpenCV is loaded
  useEffect(() => {
    if (opencvStatus === "loaded" && !workerRef.current) {
      try {
        setLoadingMessage("🔧 Initializing validation worker...");
        
        workerRef.current = new Worker(
          new URL("../cv/worker.js", import.meta.url),
          { type: "module" }
        );

        workerRef.current.onmessage = (event) => {
          const { type, result, error } = event.data;

          if (type === "VALIDATION_COMPLETE") {
            setReport(result);
            setProcessing(false);
          } else if (type === "ERROR") {
            console.error("Worker error:", error);
            // Fall back to fallback validation
            runFallbackValidation();
          }
        };

        workerRef.current.onerror = (error) => {
          console.error("Worker error:", error);
          // Fall back to fallback validation
          runFallbackValidation();
        };

        setLoadingMessage("🚀 Worker ready - Full OpenCV validation available!");
        setTimeout(() => setLoadingMessage(""), 2000);
      } catch (error) {
        console.error("Failed to create worker:", error);
        setOpencvStatus("fallback");
        setFallbackMode(true);
        setLoadingMessage("⚠️ Worker failed - Using fallback validation");
      }
    }

    return () => {
      if (workerRef.current) {
        workerRef.current.terminate();
        workerRef.current = null;
      }
    };
  }, [opencvStatus, setReport, setProcessing]);

  // Run fallback validation
  const runFallbackValidation = async () => {
    if (!imageData || !fallbackValidator.current) {
      alert("No image data or validator available");
      setProcessing(false);
      return;
    }

    try {
      setLoadingMessage("⚠️ Running fallback validation...");
      const result = await fallbackValidator.current.validate(imageData);
      setReport(result);
      setProcessing(false);
      setLoadingMessage("✅ Fallback validation complete");
      setTimeout(() => setLoadingMessage(""), 2000);
    } catch (error) {
      console.error("Fallback validation error:", error);
      alert(`Validation failed: ${error.message}`);
      setProcessing(false);
      setLoadingMessage("❌ Validation failed");
    }
  };

  // Fast validation handler
  const handleValidate = useCallback(async () => {
    if (!imageData) {
      alert("Please select an image first");
      return;
    }

    setProcessing(true);

    try {
      if (opencvStatus === "loaded" && workerRef.current) {
        // Use OpenCV validation
        console.log("🔍 Running OpenCV.js validation...");
        setLoadingMessage("🔍 Running computer vision validation...");
        
        workerRef.current.postMessage({
          type: "VALIDATE",
          imageData,
          config: { maxSide: 1200 }
        });
      } else {
        // Use fallback validation
        console.log("⚠️ Running fallback validation...");
        await runFallbackValidation();
      }
    } catch (error) {
      console.error("Validation error:", error);
      alert(`Validation failed: ${error.message}`);
      setProcessing(false);
      setLoadingMessage("❌ Validation failed");
    }
  }, [imageData, opencvStatus, setProcessing]);

  const handleGenerateSamples = useCallback(() => {
    setShowSamples(!showSamples);
  }, [showSamples, setShowSamples]);

  const handleToggleDebug = useCallback(() => {
    setShowDebugOverlay(!showDebugOverlay);
  }, [showDebugOverlay, setShowDebugOverlay]);

  // Render loading state
  if (opencvStatus === "initializing") {
    return (
      <div className="toolbar">
        <div style={{
          background: "#dbeafe",
          color: "#1e40af",
          padding: "15px",
          borderRadius: "8px",
          textAlign: "center",
          fontSize: "16px"
        }}>
          ⏳ {loadingMessage}
        </div>
      </div>
    );
  }

  return (
    <div className="toolbar">
      <button
        className="btn btn-primary"
        onClick={handleValidate}
        disabled={!imageData || opencvStatus === "initializing"}
      >
        {opencvStatus === "initializing" ? "Loading..." : "🔍 Validate Flag"}
      </button>

      <button
        className="btn btn-secondary"
        onClick={handleToggleDebug}
        disabled={!imageData}
      >
        {showDebugOverlay ? "🔍 Hide Debug" : "🔍 Show Debug"}
      </button>

      <button className="btn btn-secondary" onClick={handleGenerateSamples}>
        {showSamples ? "📊 Hide Samples" : "📊 Generate Samples"}
      </button>

      {/* Status Messages */}
      {loadingMessage && (
        <div style={{
          background: opencvStatus === "loaded" ? "#dcfce7" : 
                     opencvStatus === "fallback" ? "#fef3c7" : "#dbeafe",
          color: opencvStatus === "loaded" ? "#166534" : 
                 opencvStatus === "fallback" ? "#92400e" : "#1e40af",
          padding: "8px 16px",
          borderRadius: "8px",
          marginTop: "10px",
          textAlign: "center",
          fontSize: "14px"
        }}>
          {loadingMessage}
        </div>
      )}

      {/* OpenCV Status */}
      {opencvStatus === "loaded" && !loadingMessage && (
        <div style={{
          background: "#dcfce7",
          color: "#166534",
          padding: "8px 16px",
          borderRadius: "8px",
          marginTop: "10px",
          textAlign: "center",
          fontSize: "14px"
        }}>
          ✅ OpenCV.js loaded - Ready for real BIS validation
        </div>
      )}

      {opencvStatus === "fallback" && !loadingMessage && (
        <div style={{
          background: "#fef3c7",
          color: "#92400e",
          padding: "8px 16px",
          borderRadius: "8px",
          marginTop: "10px",
          textAlign: "center",
          fontSize: "14px"
        }}>
          ⚠️ Fast Fallback Mode - Quick validation without OpenCV.js
          <br />
          <small>Upload a wrong flag to test the improved validation</small>
        </div>
      )}
    </div>
  );
};

export default Toolbar;
