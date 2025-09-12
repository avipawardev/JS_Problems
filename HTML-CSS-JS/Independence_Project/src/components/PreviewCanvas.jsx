import React, { useRef, useEffect, useCallback } from "react";
import useStore from "../state/useStore.jsx";

const PreviewCanvas = () => {
  const { imageBitmap, report, showDebugOverlay } = useStore();
  const canvasRef = useRef(null);

  // Draw debug overlay directly in component
  const drawOverlay = useCallback((ctx, overlay, canvasWidth, canvasHeight) => {
    if (!overlay) return;

    // Draw stripe boundary lines
    overlay.lines?.forEach((line) => {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, line.y);
      ctx.lineTo(canvasWidth, line.y);
      ctx.stroke();
    });

    // Draw chakra circle
    if (overlay.circle) {
      ctx.strokeStyle = "blue";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(
        overlay.circle.x,
        overlay.circle.y,
        overlay.circle.radius,
        0,
        2 * Math.PI
      );
      ctx.stroke();
    }

    // Draw center points
    overlay.points?.forEach((point) => {
      if (point) {
        ctx.fillStyle = "green";
        ctx.beginPath();
        ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI);
        ctx.fill();
      }
    });

    // Draw spoke segments
    overlay.segments?.forEach((segment) => {
      ctx.strokeStyle = "magenta";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(segment.x1, segment.y1);
      ctx.lineTo(segment.x2, segment.y2);
      ctx.stroke();
    });
  }, []);

  const drawImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imageBitmap) return;

    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate display dimensions (maintain aspect ratio)
    const canvasRect = canvas.getBoundingClientRect();
    const imageAspect = imageBitmap.width / imageBitmap.height;
    const canvasAspect = canvasRect.width / canvasRect.height;

    let drawWidth, drawHeight, offsetX, offsetY;

    if (imageAspect > canvasAspect) {
      // Image is wider than canvas
      drawWidth = canvasRect.width;
      drawHeight = canvasRect.width / imageAspect;
      offsetX = 0;
      offsetY = (canvasRect.height - drawHeight) / 2;
    } else {
      // Image is taller than canvas
      drawHeight = canvasRect.height;
      drawWidth = canvasRect.height * imageAspect;
      offsetX = (canvasRect.width - drawWidth) / 2;
      offsetY = 0;
    }

    // Set canvas size to match display size
    canvas.width = canvasRect.width;
    canvas.height = canvasRect.height;

    // Draw image
    ctx.drawImage(imageBitmap, offsetX, offsetY, drawWidth, drawHeight);

    // Draw debug overlay if enabled and report exists
    if (showDebugOverlay && report) {
      const scaleX = drawWidth / imageBitmap.width;
      const scaleY = drawHeight / imageBitmap.height;

      // Scale overlay data to match display
      const scaledOverlay = {
        lines: report.diagnostics?.stripe_bounds
          ? [
              {
                y:
                  report.diagnostics.stripe_bounds.y_top_end * scaleY + offsetY,
              },
              {
                y:
                  report.diagnostics.stripe_bounds.y_mid_end * scaleY + offsetY,
              },
            ]
          : [],
        circle: report.diagnostics?.chakra_center
          ? {
              x: report.diagnostics.chakra_center[0] * scaleX + offsetX,
              y: report.diagnostics.chakra_center[1] * scaleY + offsetY,
              radius:
                (report.diagnostics.chakra_diameter_px / 2) *
                Math.min(scaleX, scaleY),
            }
          : null,
        points: [
          {
            x: (imageBitmap.width / 2) * scaleX + offsetX,
            y: (imageBitmap.height / 2) * scaleY + offsetY,
          },
          report.diagnostics?.chakra_center
            ? {
                x: report.diagnostics.chakra_center[0] * scaleX + offsetX,
                y: report.diagnostics.chakra_center[1] * scaleY + offsetY,
              }
            : null,
        ].filter(Boolean),
        segments: report.diagnostics?.spoke_angles_deg
          ? // Generate spoke segments from angles
            report.diagnostics.spoke_angles_deg.map((angle) => {
              const rad = (angle * Math.PI) / 180;
              const centerX =
                report.diagnostics.chakra_center[0] * scaleX + offsetX;
              const centerY =
                report.diagnostics.chakra_center[1] * scaleY + offsetY;
              const radius =
                (report.diagnostics.chakra_diameter_px / 2) *
                Math.min(scaleX, scaleY);

              const x1 = centerX + Math.cos(rad) * (radius * 0.1);
              const y1 = centerY + Math.sin(rad) * (radius * 0.1);
              const x2 = centerX + Math.cos(rad) * radius;
              const y2 = centerY + Math.sin(rad) * radius;

              return { x1, y1, x2, y2 };
            })
          : [],
      };

      drawOverlay(ctx, scaledOverlay, canvas.width, canvas.height);
    }
  }, [imageBitmap, report, showDebugOverlay, drawOverlay]);

  // Draw image when component mounts or image changes
  useEffect(() => {
    drawImage();
  }, [drawImage]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      drawImage();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [drawImage]);

  if (!imageBitmap) {
    return (
      <div className="preview-canvas">
        <div className="canvas-container">
          <div style={{ textAlign: "center", color: "#666" }}>
            <p>No image selected</p>
            <p>Upload an image to see preview</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="preview-canvas">
      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            display: "block",
          }}
        />
      </div>

      {showDebugOverlay && report && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            background: "rgba(0,0,0,0.7)",
            color: "white",
            padding: "8px",
            borderRadius: "4px",
            fontSize: "12px",
          }}
        >
          <div>Debug Overlay Active</div>
          <div>Red lines: Stripe boundaries</div>
          <div>Blue circle: Chakra</div>
          <div>Green dots: Centers</div>
          <div>Magenta lines: Spokes</div>
        </div>
      )}
    </div>
  );
};

export default PreviewCanvas;
