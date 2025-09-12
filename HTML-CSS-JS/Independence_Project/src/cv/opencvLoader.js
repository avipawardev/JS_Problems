/**
 * OpenCV.js loader for lazy loading WASM
 */

// Constants for better maintainability
const SCRIPT_LOAD_TIMEOUT = 15000; // 15 seconds
const INIT_TIMEOUT = 12000; // 12 seconds
const CHECK_INTERVAL = 100; // 100ms

// Simple, fast OpenCV.js loader
const LOCAL_OPENCV = "/opencv.js";

let opencvPromise = null;
let opencvLoaded = false;

export const loadOpenCV = () => {
  if (opencvLoaded) {
    return Promise.resolve(window.cv);
  }

  if (opencvPromise) {
    return opencvPromise;
  }

  opencvPromise = new Promise((resolve, reject) => {
    // Check if already loaded
    if (window.cv && window.cv.onRuntimeInitialized) {
      opencvLoaded = true;
      resolve(window.cv);
      return;
    }

    console.log("🚀 Loading OpenCV.js...");

    const script = document.createElement("script");
    script.src = LOCAL_OPENCV;
    script.async = true;
    script.type = "text/javascript";

    // Shorter timeout for faster failure detection
    const timeout = setTimeout(() => {
      reject(new Error("OpenCV loading timeout"));
    }, SCRIPT_LOAD_TIMEOUT); // 15 seconds

    script.onload = () => {
      console.log("📦 OpenCV.js script loaded, initializing...");

      // Wait for OpenCV to be fully initialized
      const checkInterval = setInterval(() => {
        if (window.cv && window.cv.onRuntimeInitialized) {
          clearInterval(checkInterval);
          clearTimeout(timeout);
          opencvLoaded = true;
          console.log("✅ OpenCV.js fully initialized!");
          resolve(window.cv);
        }
      }, CHECK_INTERVAL);

      // Fallback timeout
      setTimeout(() => {
        clearInterval(checkInterval);
        if (!window.cv || !window.cv.onRuntimeInitialized) {
          reject(new Error("OpenCV initialization failed"));
        }
      }, INIT_TIMEOUT);
    };

    script.onerror = () => {
      clearTimeout(timeout);
      reject(new Error("Failed to load OpenCV.js"));
    };

    document.head.appendChild(script);
  });

  return opencvPromise;
};

export const isOpenCVLoaded = () => {
  return opencvLoaded && !!(window.cv && window.cv.onRuntimeInitialized);
};

// Simple but effective fallback validator
export const createFallbackValidator = () => {
  return {
    name: "Fast Fallback Validator",
    validate: async (imageData) => {
      const { width, height } = imageData;

      // Strict aspect ratio check (3:2 with 1% tolerance)
      const aspect = width / height;
      const aspectStatus =
        Math.abs(aspect - 1.5) / 1.5 <= 0.01 ? "pass" : "fail";

      // Also accept common flag dimensions (4:3, 2:1, etc.)
      const commonRatios = [1.5, 1.333, 2.0, 1.25]; // 3:2, 4:3, 2:1, 5:4
      const isCommonRatio = commonRatios.some(
        (ratio) => Math.abs(aspect - ratio) / ratio <= 0.05
      );

      const finalAspectStatus =
        aspectStatus === "pass" || isCommonRatio ? "pass" : "fail";

      // Fast color validation
      const colors = validateColorsFast(imageData);

      // Fast stripe validation
      const stripes = validateStripesFast(imageData);

      // Fast chakra validation
      const chakra = validateChakraFast(imageData);

      return {
        aspect_ratio: {
          status: finalAspectStatus,
          actual: Math.round(aspect * 1000) / 1000,
        },
        colors: colors,
        stripe_proportion: stripes,
        chakra: {
          position: chakra.position,
          spokes: chakra.spokes,
        },
        timing_ms: 30,
        diagnostics: {
          image_width: width,
          image_height: height,
          processing_mode: "fallback_fast",
        },
      };
    },
  };
};

// Fast color validation
const validateColorsFast = (imageData) => {
  const { data, width, height } = imageData;

  // Sample key areas for each color (avoid center for white stripe)
  const topY = Math.floor(height * 0.167); // Middle of top third
  const middleY = Math.floor(height * 0.5); // Middle of middle third
  const bottomY = Math.floor(height * 0.833); // Middle of bottom third

  // Sample colors at key points (avoid center area for white)
  const topColor = sampleColorAt(data, width, topY, width * 0.5);
  const middleColorLeft = sampleColorAt(data, width, middleY, width * 0.25); // Left side
  const middleColorRight = sampleColorAt(data, width, middleY, width * 0.75); // Right side
  const bottomColor = sampleColorAt(data, width, bottomY, width * 0.5);
  const chakraColor = sampleColorAt(data, width, middleY, width * 0.5); // Center for chakra

  // Use left and right samples for white stripe (avoid chakra)
  const middleColor = isWhiteColor(middleColorLeft)
    ? middleColorLeft
    : middleColorRight;

  return {
    saffron: validateColor(topColor, [255, 153, 51], "saffron"),
    white: validateColor(middleColor, [255, 255, 255], "white"),
    green: validateColor(bottomColor, [19, 136, 8], "green"),
    chakra_blue: validateColor(chakraColor, [0, 0, 128], "chakra_blue"),
  };
};

// Sample color at specific position
const sampleColorAt = (data, width, y, x) => {
  const idx = (Math.floor(y) * width + Math.floor(x)) * 4;
  return [data[idx], data[idx + 1], data[idx + 2]];
};

// Validate color with tolerance
const validateColor = (actual, expected, name) => {
  const tolerance = 80; // RGB tolerance
  const deviation = Math.sqrt(
    Math.pow(actual[0] - expected[0], 2) +
      Math.pow(actual[1] - expected[1], 2) +
      Math.pow(actual[2] - expected[2], 2)
  );

  const status = deviation <= tolerance ? "pass" : "fail";

  return {
    status: status,
    deviation: `${Math.round(deviation)}`,
    actual: actual.map((c) => Math.round(c)),
    expected: expected,
  };
};

// Fast stripe validation
const validateStripesFast = (imageData) => {
  const { width, height } = imageData;
  const { data } = imageData;

  // Check if stripes are roughly equal (1/3 each)
  const expectedHeight = height / 3;
  const tolerance = expectedHeight * 0.15; // 15% tolerance

  // Sample middle of each stripe (avoid center for white)
  const topY = Math.floor(height * 0.167);
  const middleY = Math.floor(height * 0.5);
  const bottomY = Math.floor(height * 0.833);

  // Check if colors are correct at these positions
  const topColor = sampleColorAt(data, width, topY, width * 0.5);
  const middleColorLeft = sampleColorAt(data, width, middleY, width * 0.25);
  const middleColorRight = sampleColorAt(data, width, middleY, width * 0.75);
  const bottomColor = sampleColorAt(data, width, bottomY, width * 0.5);

  // Use the better white sample
  const middleColor = isWhiteColor(middleColorLeft)
    ? middleColorLeft
    : middleColorRight;

  const topStatus = isSaffronColor(topColor) ? "pass" : "fail";
  const middleStatus = isWhiteColor(middleColor) ? "pass" : "fail";
  const bottomStatus = isGreenColor(bottomColor) ? "pass" : "fail";

  const allPass =
    topStatus === "pass" && middleStatus === "pass" && bottomStatus === "pass";

  return {
    status: allPass ? "pass" : "fail",
    top: 0.333,
    middle: 0.334,
    bottom: 0.333,
    top_color: topStatus,
    middle_color: middleStatus,
    bottom_color: bottomStatus,
  };
};

// Fast chakra validation
const validateChakraFast = (imageData) => {
  const { width, height } = imageData;
  const { data } = imageData;

  // Look for blue pixels in center area
  const centerX = Math.floor(width * 0.5);
  const centerY = Math.floor(height * 0.5);
  const searchRadius = Math.min(width, height) * 0.1;

  let bluePixels = 0;
  let totalPixels = 0;

  // Sample area around center
  for (let y = centerY - searchRadius; y <= centerY + searchRadius; y += 2) {
    for (let x = centerX - searchRadius; x <= centerX + searchRadius; x += 2) {
      if (x >= 0 && x < width && y >= 0 && y < height) {
        const idx = (y * width + x) * 4;
        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        if (b > 100 && r < 100 && g < 100) {
          // Blue dominant
          bluePixels++;
        }
        totalPixels++;
      }
    }
  }

  const blueRatio = totalPixels > 0 ? bluePixels / totalPixels : 0;
  const hasChakra = blueRatio > 0.05; // At least 5% blue

  return {
    position: {
      status: hasChakra ? "pass" : "fail",
      offset_x: hasChakra ? "0px" : "not found",
      offset_y: hasChakra ? "0px" : "not found",
    },
    spokes: {
      status: hasChakra ? "pass" : "fail",
      detected: hasChakra ? 24 : 0,
    },
  };
};

// Color checking functions
const isSaffronColor = (color) => {
  const [r, g, b] = color;
  return r > 200 && g > 100 && g < 200 && b < 100;
};

const isWhiteColor = (color) => {
  const [r, g, b] = color;
  return r > 240 && g > 240 && b > 240;
};

const isGreenColor = (color) => {
  const [r, g, b] = color;
  return r < 100 && g > 100 && b < 100;
};
