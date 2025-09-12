# 🇮🇳 Indian Flag BIS Validator React

A **production-quality React application** that validates Indian flag images against Bureau of Indian Standards (BIS) specifications using computer vision and OpenCV.js.

## 🎯 What It Does

This app analyzes uploaded flag images and validates them against strict BIS rules:

- **Aspect Ratio**: 3:2 (width:height) with ±1% tolerance
- **Color Accuracy**: ±5% RGB tolerance for Saffron, White, Green, and Chakra Blue
- **Stripe Proportions**: Three equal horizontal bands (±1% tolerance)
- **Ashoka Chakra**: Proper positioning, diameter, and exactly 24 spokes

## 🚀 Features

- **Real Computer Vision**: Uses OpenCV.js (WASM) for accurate image analysis
- **Drag & Drop UI**: Intuitive file upload with instant preview
- **Multiple Formats**: Supports PNG, JPG, SVG (with rasterization)
- **URL Input**: Paste image URLs for validation
- **Debug Overlay**: Visual debugging with stripe boundaries and chakra detection
- **Synthetic Samples**: Generate test flags to verify validation accuracy
- **JSON Reports**: Detailed validation results with copy/download options
- **Offline Capable**: Works offline after assets load

## 🛠️ Technology Stack

- **Frontend**: React 18 + Vite
- **Computer Vision**: OpenCV.js (WebAssembly)
- **Image Processing**: Canvas API + Web Workers
- **SVG Support**: canvg for SVG rasterization
- **State Management**: Zustand (lightweight)
- **Styling**: Pure CSS with modern design

## 📋 BIS Validation Rules

### 1. Aspect Ratio
- **Required**: 3:2 (width:height)
- **Tolerance**: ±1%
- **Formula**: `abs(aspect - 1.5) / 1.5 ≤ 0.01`

### 2. Color Accuracy
- **Saffron**: #FF9933 → (255,153,51) ±5%
- **White**: #FFFFFF → (255,255,255) ±5%
- **Green**: #138808 → (19,136,8) ±5%
- **Chakra Blue**: #000080 → (0,0,128) ±5%

### 3. Stripe Proportions
- **Top (Saffron)**: 1/3 of height ±1%
- **Middle (White)**: 1/3 of height ±1%
- **Bottom (Green)**: 1/3 of height ±1%

### 4. Ashoka Chakra
- **Diameter**: 3/4 of white band height ±2%
- **Position**: Centered horizontally, vertically in white band
- **Offset Tolerance**: ≤1% of min(image_width, image_height)
- **Spokes**: Exactly 24, evenly spaced

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd indian-flag-bis-validator-react

# Install dependencies
npm install

# Start development server
npm run dev
```

### Usage
1. **Open**: Navigate to `http://localhost:3000`
2. **Upload**: Drag & drop an image or use file picker
3. **Validate**: Click "Validate Flag" to run BIS analysis
4. **Review**: Check the detailed JSON report
5. **Debug**: Toggle debug overlay for visual analysis
6. **Test**: Generate synthetic samples to verify accuracy

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── FilePicker.jsx  # File upload & URL input
│   ├── PreviewCanvas.jsx # Image display & debug overlay
│   ├── JsonPane.jsx    # Validation report viewer
│   ├── Toolbar.jsx     # Validation controls
│   └── Samples.jsx     # Synthetic test samples
├── cv/                 # Computer vision
│   ├── opencvLoader.js # OpenCV.js loader
│   └── worker.js       # Web Worker for CV processing
├── samples/            # Test data
│   └── synthetic.js    # Flag generation functions
├── utils/              # Utility functions
│   ├── canvasUtils.js  # Canvas operations
│   ├── colorUtils.js   # Color calculations
│   ├── geometry.js     # Geometric utilities
│   ├── jsonUtils.js    # JSON handling
│   └── svgRasterize.js # SVG processing
└── state/              # State management
    └── useStore.jsx    # Zustand store
```

## 🧪 Testing with Synthetic Samples

The app includes 4 test samples to verify validation accuracy:

1. **Perfect Flag**: 3:2 ratio, exact colors, 24 spokes → All pass
2. **Wrong Aspect**: 4:3 ratio → Aspect ratio fails
3. **Wrong Spokes**: 20 spokes → Spoke count fails
4. **Color Drift**: Saffron +6% deviation → Color fails

## ⚡ Performance

- **Processing Time**: ≤3 seconds for images up to 3000px
- **Image Resizing**: Automatic downscaling to maxSide=1200px
- **Memory Efficient**: Proper OpenCV Mat cleanup
- **Web Worker**: Non-blocking UI during validation

## 🔧 Configuration

### OpenCV Loading
- **CDN Sources**: Multiple fallbacks for reliability
- **Lazy Loading**: Loads only when needed
- **WASM Support**: Full OpenCV.js functionality

### Validation Tolerances
```javascript
const config = {
  maxSide: 1200,           // Max image dimension
  aspectTolerance: 0.01,   // 1% for aspect ratio
  colorTolerance: 0.05,    // 5% for colors
  stripeTolerance: 0.01,   // 1% for stripe proportions
  chakraTolerance: 0.02    // 2% for chakra diameter
};
```

## 🚨 Limitations

- **Flat Colors Only**: No support for shadows/folds
- **Max File Size**: 5MB limit
- **CORS Restrictions**: External URLs must allow cross-origin
- **Browser Support**: Modern browsers with WebAssembly support

## 🐛 Troubleshooting

### OpenCV Loading Issues
- Check browser console for errors
- Ensure stable internet connection
- Try refreshing the page
- Check browser WebAssembly support

### SVG Processing
- Ensure valid SVG format
- Check for embedded images or external references
- Verify SVG viewBox and dimensions

### Performance Issues
- Reduce image resolution before upload
- Close other browser tabs
- Check available system memory

## 📊 Output Format

The app generates detailed JSON reports:

```json
{
  "aspect_ratio": { "status": "pass|fail", "actual": 1.5 },
  "colors": {
    "saffron": { "status": "pass|fail", "deviation": "2.1%" },
    "white": { "status": "pass|fail", "deviation": "0.5%" },
    "green": { "status": "pass|fail", "deviation": "1.8%" },
    "chakra_blue": { "status": "pass|fail", "deviation": "3.2%" }
  },
  "stripe_proportion": {
    "status": "pass|fail",
    "top": 0.333, "middle": 0.334, "bottom": 0.333
  },
  "chakra_position": {
    "status": "pass|fail",
    "offset_x": "5px", "offset_y": "3px"
  },
  "chakra_spokes": { "status": "pass|fail", "detected": 24 },
  "timing_ms": 1250,
  "diagnostics": { /* Detailed analysis data */ }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **OpenCV.js**: Computer vision capabilities
- **BIS Standards**: Indian flag specifications
- **React Team**: Frontend framework
- **Vite Team**: Build tooling

## 📞 Support

For issues, questions, or contributions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review browser console for errors

---

**Built with ❤️ for accurate Indian flag validation**
