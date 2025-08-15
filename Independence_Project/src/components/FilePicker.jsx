import React, { useCallback, useRef, useState } from "react";
import useStore from "../state/useStore.jsx";

// Constants for better maintainability
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_IMAGE_SIDE = 800; // Maximum dimension for resizing
const PROCESSING_TIMEOUT = 10000; // 10 seconds
const BITMAP_TIMEOUT = 5000; // 5 seconds
const IMAGE_LOAD_TIMEOUT = 8000; // 8 seconds

const FilePicker = () => {
  const { file, fileName, fileSize, setFile, setImageData, setImageBitmap } =
    useStore();
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const fileInputRef = useRef(null);

  const processFile = useCallback(
    async (selectedFile) => {
      try {
        setIsProcessing(true);
        console.log("Processing file:", selectedFile.name);

        // Validate file size
        if (selectedFile.size > MAX_FILE_SIZE) {
          throw new Error("File size exceeds 5MB limit");
        }

        // Validate file type
        const validTypes = [
          "image/png",
          "image/jpeg",
          "image/jpg",
          "image/svg+xml",
        ];

        const fileName = selectedFile.name.toLowerCase();
        const fileType = selectedFile.type;

        // Check if it's a valid file type
        const isValidType =
          validTypes.includes(fileType) ||
          fileName.endsWith(".svg") ||
          fileName.endsWith(".png") ||
          fileName.endsWith(".jpg") ||
          fileName.endsWith(".jpeg");

        if (!isValidType) {
          throw new Error(
            "Invalid file type. Please select PNG, JPG, or SVG files."
          );
        }

        // Set file in store
        setFile(selectedFile);

        // Process image with timeout
        let result;
        const isSvgFile =
          fileType === "image/svg+xml" || fileName.endsWith(".svg");

        const processPromise = isSvgFile
          ? processSvgFile(selectedFile)
          : processImageFile(selectedFile);

        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(
            () => reject(new Error("Processing timeout")),
            PROCESSING_TIMEOUT
          )
        );

        result = await Promise.race([processPromise, timeoutPromise]);

        // Set processed data
        setImageData(result.imageData);

        // Create ImageBitmap for display (with timeout and fallback)
        try {
          const bitmapPromise = createImageBitmap(selectedFile);
          const bitmapTimeoutPromise = new Promise((_, reject) =>
            setTimeout(
              () => reject(new Error("Bitmap creation timeout")),
              BITMAP_TIMEOUT
            )
          );

          const imageBitmap = await Promise.race([
            bitmapPromise,
            bitmapTimeoutPromise,
          ]);
          setImageBitmap(imageBitmap);
        } catch (bitmapError) {
          console.warn(
            "ImageBitmap creation failed, using fallback:",
            bitmapError.message
          );

          // Fallback: create bitmap from canvas
          try {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = result.width;
            canvas.height = result.height;

            // Put the image data back to canvas
            ctx.putImageData(result.imageData, 0, 0);

            // Create bitmap from canvas
            const fallbackBitmap = await createImageBitmap(canvas);
            setImageBitmap(fallbackBitmap);
          } catch (fallbackError) {
            console.warn(
              "Fallback bitmap creation also failed:",
              fallbackError.message
            );
            // Continue without bitmap - the imageData is still available for validation
          }
        }

        console.log("File processed successfully:", selectedFile.name);
      } catch (error) {
        console.error("File processing error:", error);
        alert(`Error processing file: ${error.message}`);
        // Clear any partial data
        setImageData(null);
        setImageBitmap(null);
      } finally {
        setIsProcessing(false);
      }
    },
    [setFile, setImageData, setImageBitmap]
  );

  const processImageFile = async (file) => {
    return new Promise((resolve, reject) => {
      const img = new Image();

      // Add timeout for image loading
      const loadTimeout = setTimeout(() => {
        reject(new Error("Image loading timeout"));
      }, IMAGE_LOAD_TIMEOUT);

      img.onload = () => {
        clearTimeout(loadTimeout);

        try {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Resize if needed (more aggressive resizing for performance)
          let { width, height } = img;
          const maxSide = MAX_IMAGE_SIDE; // Reduced from 1200 for faster processing

          if (width > maxSide || height > maxSide) {
            const ratio = Math.min(maxSide / width, maxSide / height);
            width = Math.round(width * ratio);
            height = Math.round(height * ratio);
          }

          canvas.width = width;
          canvas.height = height;

          // Draw and get image data
          ctx.drawImage(img, 0, 0, width, height);
          const imageData = ctx.getImageData(0, 0, width, height);

          // Clean up
          if (img.src && img.src.startsWith("blob:")) {
            URL.revokeObjectURL(img.src);
          }

          resolve({
            imageData,
            width,
            height,
            originalWidth: img.naturalWidth,
            originalHeight: img.naturalHeight,
            scaleFactor: width / img.naturalWidth,
          });
        } catch (error) {
          reject(new Error("Canvas processing failed"));
        }
      };

      img.onerror = () => {
        clearTimeout(loadTimeout);
        reject(new Error("Failed to load image"));
      };

      img.src = URL.createObjectURL(file);
    });
  };

  const processSvgFile = async (file) => {
    try {
      const svgContent = await file.text();

      // Validate SVG content
      if (!svgContent.includes("<svg") || !svgContent.includes("</svg>")) {
        throw new Error("Invalid SVG file format");
      }

      return new Promise((resolve, reject) => {
        const img = new Image();

        // Add timeout for SVG loading
        const loadTimeout = setTimeout(() => {
          reject(new Error("SVG loading timeout"));
        }, IMAGE_LOAD_TIMEOUT);

        img.onload = () => {
          clearTimeout(loadTimeout);

          try {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            // Set reasonable size for SVG (smaller for performance)
            const width = Math.min(img.width || MAX_IMAGE_SIDE, MAX_IMAGE_SIDE);
            const height = Math.min(img.height || 600, 600);

            canvas.width = width;
            canvas.height = height;

            // Clear canvas first
            ctx.clearRect(0, 0, width, height);

            // Draw SVG to canvas
            ctx.drawImage(img, 0, 0, width, height);
            const imageData = ctx.getImageData(0, 0, width, height);

            // Clean up
            if (img.src && img.src.startsWith("blob:")) {
              URL.revokeObjectURL(img.src);
            }

            resolve({
              imageData,
              width,
              height,
              originalWidth: img.naturalWidth || width,
              originalHeight: img.naturalHeight || height,
              scaleFactor: width / (img.naturalWidth || width),
            });
          } catch (error) {
            reject(new Error("SVG canvas processing failed"));
          }
        };

        img.onerror = (error) => {
          clearTimeout(loadTimeout);
          console.error("SVG loading error:", error);
          reject(
            new Error("Failed to load SVG - invalid format or corrupted file")
          );
        };

        // Create blob URL for SVG with proper MIME type
        const blob = new Blob([svgContent], {
          type: "image/svg+xml;charset=utf-8",
        });
        img.src = URL.createObjectURL(blob);
      });
    } catch (error) {
      throw new Error(`SVG processing failed: ${error.message}`);
    }
  };

  const handleFileSelect = useCallback(
    (event) => {
      const selectedFile = event.target.files[0];
      if (selectedFile) {
        processFile(selectedFile);
      }
    },
    [processFile]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((event) => {
    event.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      setIsDragOver(false);

      const files = event.dataTransfer.files;
      if (files.length > 0) {
        processFile(files[0]);
      }
    },
    [processFile]
  );

  const handlePaste = useCallback(
    async (event) => {
      const items = event.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            processFile(file);
            break;
          }
        }
      }
    },
    [processFile]
  );

  const handleUrlSubmit = useCallback(async () => {
    if (!urlInput.trim()) {
      alert("Please enter a valid image URL");
      return;
    }

    try {
      setIsProcessing(true);
      console.log("Loading image from URL:", urlInput);

      // Validate URL format
      let url;
      try {
        url = new URL(urlInput);
      } catch (urlError) {
        throw new Error("Invalid URL format");
      }

      // Check if it's an HTTP/HTTPS URL
      if (!url.protocol.startsWith("http")) {
        throw new Error("Only HTTP/HTTPS URLs are supported");
      }

      const response = await fetch(urlInput, {
        mode: "cors",
        headers: {
          Accept: "image/*",
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch image: ${response.status} ${response.statusText}`
        );
      }

      const blob = await response.blob();
      console.log("Blob received:", blob.type, blob.size);

      // Validate content type
      if (!blob.type.startsWith("image/")) {
        throw new Error(
          `URL does not point to a valid image. Content type: ${blob.type}`
        );
      }

      // Create a file object from the blob
      const file = new File([blob], "image-from-url.png", { type: blob.type });
      console.log("File created from URL:", file.name, file.size, file.type);

      await processFile(file);
    } catch (error) {
      console.error("URL loading error:", error);
      let errorMessage = error.message;

      // Provide more helpful error messages
      if (error.message.includes("Failed to fetch")) {
        errorMessage =
          "Failed to fetch image. This might be due to CORS restrictions or the image URL is not accessible.";
      } else if (error.message.includes("Invalid URL format")) {
        errorMessage =
          "Please enter a valid URL starting with http:// or https://";
      }

      alert(`Error loading image from URL: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  }, [urlInput, processFile]);

  const handleUrlKeyPress = useCallback(
    (event) => {
      if (event.key === "Enter") {
        handleUrlSubmit();
      }
    },
    [handleUrlSubmit]
  );

  // Add paste event listener
  React.useEffect(() => {
    const handleGlobalPaste = (event) => {
      if (
        event.target.tagName !== "INPUT" &&
        event.target.tagName !== "TEXTAREA"
      ) {
        handlePaste(event);
      }
    };

    document.addEventListener("paste", handleGlobalPaste);
    return () => document.removeEventListener("paste", handleGlobalPaste);
  }, [handlePaste]);

  return (
    <div className="file-picker">
      <h3>Upload Flag Image</h3>

      <div
        className={`upload-area ${isDragOver ? "drag-over" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="upload-icon">📁</div>
        <p>Drag & drop an image here, or click to select</p>
        <p className="file-types">Supports: PNG, JPG, SVG (max 5MB)</p>

        {isProcessing && (
          <button className="processing-btn" disabled>
            ⏳ Processing...
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/svg+xml"
        onChange={handleFileSelect}
        style={{ display: "none" }}
      />

      {file && (
        <div className="file-info">
          <p>
            <strong>File:</strong> {fileName}
          </p>
          <p>
            <strong>Size:</strong> {fileSize}
          </p>
        </div>
      )}

      <div className="url-input">
        <h4>Or paste image URL:</h4>
        <div className="url-controls">
          <input
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyPress={handleUrlKeyPress}
            placeholder="https://example.com/flag.png"
            disabled={isProcessing}
          />
          <button
            onClick={handleUrlSubmit}
            disabled={!urlInput.trim() || isProcessing}
          >
            Load URL
          </button>
        </div>
        <div className="url-help">
          <button
            type="button"
            onClick={() =>
              setUrlInput(
                "https://upload.wikimedia.org/wikipedia/commons/4/41/Flag_of_India.svg"
              )
            }
            style={{ fontSize: "12px", padding: "4px 8px", marginTop: "8px" }}
          >
            Test with Wikipedia Flag
          </button>
          <p style={{ fontSize: "11px", color: "#666", marginTop: "4px" }}>
            Try this test URL to verify the feature works
          </p>
        </div>
      </div>
    </div>
  );
};

export default FilePicker;
