// Synthetic Indian flag generation for testing BIS validation
export const generateAllSamples = () => {
  return [
    generatePerfectFlag(),
    generateWrongAspectFlag(),
    generateWrongSpokesFlag(),
    generateColorDriftFlag(),
  ];
};

// Perfect flag: 3:2 aspect ratio, correct colors, 24 spokes
export const generatePerfectFlag = () => {
  const width = 600;
  const height = 400;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Draw saffron stripe (top third)
  ctx.fillStyle = "#FF9933";
  ctx.fillRect(0, 0, width, height / 3);

  // Draw white stripe (middle third)
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, height / 3, width, height / 3);

  // Draw green stripe (bottom third)
  ctx.fillStyle = "#138808";
  ctx.fillRect(0, (2 * height) / 3, width, height / 3);

  // Draw Ashoka Chakra in center of white stripe
  const centerX = width / 2;
  const centerY = height / 2;
  const chakraRadius = (height / 3) * 0.375; // 3/4 of white band height

  // Draw chakra circle
  ctx.fillStyle = "#000080";
  ctx.beginPath();
  ctx.arc(centerX, centerY, chakraRadius, 0, 2 * Math.PI);
  ctx.fill();

  // Draw 24 spokes
  ctx.strokeStyle = "#000080";
  ctx.lineWidth = 2;
  for (let i = 0; i < 24; i++) {
    const angle = (i * 15 * Math.PI) / 180; // 15 degrees apart
    const x1 = centerX + Math.cos(angle) * (chakraRadius * 0.1);
    const y1 = centerY + Math.sin(angle) * (chakraRadius * 0.1);
    const x2 = centerX + Math.cos(angle) * chakraRadius;
    const y2 = centerY + Math.sin(angle) * chakraRadius;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  return {
    name: "Perfect Flag",
    description: "3:2 aspect ratio, exact BIS colors, 24 spokes",
    expectedResults: {
      aspect_ratio: "pass",
      colors: "all pass",
      stripe_proportion: "pass",
      chakra_position: "pass",
      chakra_spokes: "pass (24)",
    },
    imageData: ctx.getImageData(0, 0, width, height),
  };
};

// Wrong aspect ratio: 4:3 instead of 3:2
export const generateWrongAspectFlag = () => {
  const width = 800;
  const height = 600;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Draw saffron stripe (top third)
  ctx.fillStyle = "#FF9933";
  ctx.fillRect(0, 0, width, height / 3);

  // Draw white stripe (middle third)
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, height / 3, width, height / 3);

  // Draw green stripe (bottom third)
  ctx.fillStyle = "#138808";
  ctx.fillRect(0, (2 * height) / 3, width, height / 3);

  // Draw chakra
  const centerX = width / 2;
  const centerY = height / 2;
  const chakraRadius = (height / 3) * 0.375;

  ctx.fillStyle = "#000080";
  ctx.beginPath();
  ctx.arc(centerX, centerY, chakraRadius, 0, 2 * Math.PI);
  ctx.fill();

  // Draw 24 spokes
  ctx.strokeStyle = "#000080";
  ctx.lineWidth = 2;
  for (let i = 0; i < 24; i++) {
    const angle = (i * 15 * Math.PI) / 180;
    const x1 = centerX + Math.cos(angle) * (chakraRadius * 0.1);
    const y1 = centerY + Math.sin(angle) * (chakraRadius * 0.1);
    const x2 = centerX + Math.cos(angle) * chakraRadius;
    const y2 = centerY + Math.sin(angle) * chakraRadius;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  return {
    name: "Wrong Aspect Ratio",
    description: "4:3 aspect ratio (should be 3:2)",
    expectedResults: {
      aspect_ratio: "fail",
      colors: "all pass",
      stripe_proportion: "pass",
      chakra_position: "pass",
      chakra_spokes: "pass (24)",
    },
    imageData: ctx.getImageData(0, 0, width, height),
  };
};

// Wrong number of spokes: 20 instead of 24
export const generateWrongSpokesFlag = () => {
  const width = 600;
  const height = 400;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Draw stripes
  ctx.fillStyle = "#FF9933";
  ctx.fillRect(0, 0, width, height / 3);

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, height / 3, width, height / 3);

  ctx.fillStyle = "#138808";
  ctx.fillRect(0, (2 * height) / 3, width, height / 3);

  // Draw chakra
  const centerX = width / 2;
  const centerY = height / 2;
  const chakraRadius = (height / 3) * 0.375;

  ctx.fillStyle = "#000080";
  ctx.beginPath();
  ctx.arc(centerX, centerY, chakraRadius, 0, 2 * Math.PI);
  ctx.fill();

  // Draw only 20 spokes
  ctx.strokeStyle = "#000080";
  ctx.lineWidth = 2;
  for (let i = 0; i < 20; i++) {
    const angle = (i * 18 * Math.PI) / 180; // 18 degrees apart for 20 spokes
    const x1 = centerX + Math.cos(angle) * (chakraRadius * 0.1);
    const y1 = centerY + Math.sin(angle) * (chakraRadius * 0.1);
    const x2 = centerX + Math.cos(angle) * chakraRadius;
    const y2 = centerY + Math.sin(angle) * chakraRadius;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  return {
    name: "Wrong Spokes",
    description: "20 spokes instead of 24",
    expectedResults: {
      aspect_ratio: "pass",
      colors: "all pass",
      stripe_proportion: "pass",
      chakra_position: "pass",
      chakra_spokes: "fail (20)",
    },
    imageData: ctx.getImageData(0, 0, width, height),
  };
};

// Color drift: saffron too orange (+6% deviation)
export const generateColorDriftFlag = () => {
  const width = 600;
  const height = 400;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Draw saffron stripe with drifted color (more orange)
  ctx.fillStyle = "#FFA500"; // More orange than #FF9933
  ctx.fillRect(0, 0, width, height / 3);

  // Draw white stripe
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, height / 3, width, height / 3);

  // Draw green stripe
  ctx.fillStyle = "#138808";
  ctx.fillRect(0, (2 * height) / 3, width, height / 3);

  // Draw chakra
  const centerX = width / 2;
  const centerY = height / 2;
  const chakraRadius = (height / 3) * 0.375;

  ctx.fillStyle = "#000080";
  ctx.beginPath();
  ctx.arc(centerX, centerY, chakraRadius, 0, 2 * Math.PI);
  ctx.fill();

  // Draw 24 spokes
  ctx.strokeStyle = "#000080";
  ctx.lineWidth = 2;
  for (let i = 0; i < 24; i++) {
    const angle = (i * 15 * Math.PI) / 180;
    const x1 = centerX + Math.cos(angle) * (chakraRadius * 0.1);
    const y1 = centerY + Math.sin(angle) * (chakraRadius * 0.1);
    const x2 = centerX + Math.cos(angle) * chakraRadius;
    const y2 = centerY + Math.sin(angle) * chakraRadius;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  return {
    name: "Color Drift",
    description: "Saffron color drifted to orange (+6% deviation)",
    expectedResults: {
      aspect_ratio: "pass",
      colors: "saffron fail, others pass",
      stripe_proportion: "pass",
      chakra_position: "pass",
      chakra_spokes: "pass (24)",
    },
    imageData: ctx.getImageData(0, 0, width, height),
  };
};

// Helper function to create thumbnail
export const createThumbnail = (imageData, maxSize = 100) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Calculate thumbnail dimensions
  const ratio = Math.min(maxSize / imageData.width, maxSize / imageData.height);
  const thumbWidth = Math.round(imageData.width * ratio);
  const thumbHeight = Math.round(imageData.height * ratio);

  canvas.width = thumbWidth;
  canvas.height = thumbHeight;

  // Create temporary canvas for resizing
  const tempCanvas = document.createElement("canvas");
  tempCanvas.width = imageData.width;
  tempCanvas.height = imageData.height;
  const tempCtx = tempCanvas.getContext("2d");
  tempCtx.putImageData(imageData, 0, 0);

  // Draw resized thumbnail
  ctx.drawImage(tempCanvas, 0, 0, thumbWidth, thumbHeight);

  return canvas.toDataURL("image/png");
};
