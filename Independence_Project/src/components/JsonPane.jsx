import React, { useState } from "react";
import useStore from "../state/useStore.jsx";

// Utility functions implemented directly in component
const prettyPrintJson = (obj) => {
  return JSON.stringify(obj, null, 2);
};

const downloadJson = (data, filename) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const copyJsonToClipboard = async (data) => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
};

const getValidationSummary = (report) => {
  if (!report) return { passed: 0, total: 0, percentage: 0, checks: [] };

  const checks = [
    { name: "Aspect Ratio", status: report.aspect_ratio?.status || "fail" },
    { name: "Saffron Color", status: report.colors?.saffron?.status || "fail" },
    { name: "White Color", status: report.colors?.white?.status || "fail" },
    { name: "Green Color", status: report.colors?.green?.status || "fail" },
    {
      name: "Chakra Blue",
      status: report.colors?.chakra_blue?.status || "fail",
    },
    {
      name: "Stripe Proportion",
      status: report.stripe_proportion?.status || "fail",
    },
    {
      name: "Chakra Position",
      status: report.chakra?.position?.status || "fail",
    },
    { name: "Chakra Spokes", status: report.chakra?.spokes?.status || "fail" },
  ];

  const passed = checks.filter((check) => check.status === "pass").length;
  const total = checks.length;
  const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;

  return { passed, total, percentage, checks };
};

const JsonPane = () => {
  const { report } = useStore();
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    if (!report) return;

    const success = await copyJsonToClipboard(report);
    setCopySuccess(success);

    if (success) {
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!report) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `flag-validation-${timestamp}.json`;
    downloadJson(report, filename);
  };

  const formatStatus = (status) => {
    return status === "pass" ? "✅ Pass" : "❌ Fail";
  };

  if (!report) {
    return (
      <div className="json-pane">
        <h3 className="section-title">Validation Report</h3>
        <div className="json-content">
          <p style={{ textAlign: "center", color: "#666" }}>
            No validation report available
          </p>
          <p style={{ textAlign: "center", color: "#666", fontSize: "14px" }}>
            Upload an image and click "Validate" to generate a report
          </p>
        </div>
      </div>
    );
  }

  const summary = getValidationSummary(report);

  return (
    <div className="json-pane">
      <h3 className="section-title">Validation Report</h3>

      {/* Summary Section */}
      <div
        style={{
          background: "#f8f9fa",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "15px",
          border: "1px solid #e9ecef",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0", color: "#1a1a1a" }}>Summary</h4>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <span style={{ fontSize: "24px", fontWeight: "bold" }}>
              {summary.passed}/{summary.total}
            </span>
            <span style={{ color: "#666", marginLeft: "5px" }}>
              checks passed
            </span>
          </div>
          <div
            style={{
              background: summary.percentage === 100 ? "#dcfce7" : "#fee2e2",
              color: summary.percentage === 100 ? "#166534" : "#dc2626",
              padding: "4px 12px",
              borderRadius: "20px",
              fontWeight: "bold",
            }}
          >
            {summary.percentage}%
          </div>
        </div>

        {/* Quick status grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
            gap: "8px",
            marginTop: "15px",
          }}
        >
          {summary.checks.map((check) => (
            <div
              key={check.name}
              style={{
                background: check.status === "pass" ? "#dcfce7" : "#fee2e2",
                color: check.status === "pass" ? "#166534" : "#dc2626",
                padding: "4px 8px",
                borderRadius: "4px",
                fontSize: "12px",
                fontWeight: "500",
                textAlign: "center",
              }}
            >
              {check.name}: {check.status === "pass" ? "Pass" : "Fail"}
            </div>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div
        style={{
          background: "#f8f9fa",
          padding: "15px",
          borderRadius: "8px",
          marginBottom: "15px",
          border: "1px solid #e9ecef",
        }}
      >
        <h4 style={{ margin: "0 0 10px 0", color: "#1a1a1a" }}>Key Metrics</h4>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "10px",
          }}
        >
          <div>
            <strong>Aspect Ratio:</strong>{" "}
            {report.aspect_ratio?.actual || "N/A"}
          </div>
          <div>
            <strong>Processing Time:</strong> {report.timing_ms || "N/A"}ms
          </div>
          <div>
            <strong>Spokes Detected:</strong>{" "}
            {report.chakra?.spokes?.detected || 0}/24
          </div>
          <div>
            <strong>Image Size:</strong>{" "}
            {report.diagnostics?.image_width || "N/A"}×
            {report.diagnostics?.image_height || "N/A"}
          </div>
        </div>
      </div>

      {/* JSON Content */}
      <div className="json-content">
        <pre style={{ margin: 0, fontSize: "12px" }}>
          {prettyPrintJson(report)}
        </pre>
      </div>

      {/* Actions */}
      <div className="json-actions">
        <button
          className="btn btn-secondary"
          onClick={handleCopy}
          disabled={!report}
        >
          {copySuccess ? "✓ Copied!" : "📋 Copy JSON"}
        </button>
        <button
          className="btn btn-secondary"
          onClick={handleDownload}
          disabled={!report}
        >
          💾 Download JSON
        </button>
      </div>
    </div>
  );
};

export default JsonPane;
