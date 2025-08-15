import React, { createContext, useContext, useReducer } from "react";

// Initial state
const initialState = {
  // File and image state
  file: null,
  imageData: null,
  imageBitmap: null,
  fileName: "",
  fileSize: 0,

  // Validation state
  report: null,
  isProcessing: false,
  showDebugOverlay: false,

  // UI state
  showSamples: false,
  samples: [],
};

// Action types
const ACTIONS = {
  SET_FILE: "SET_FILE",
  SET_IMAGE_DATA: "SET_IMAGE_DATA",
  SET_IMAGE_BITMAP: "SET_IMAGE_BITMAP",
  SET_REPORT: "SET_REPORT",
  SET_PROCESSING: "SET_PROCESSING",
  TOGGLE_DEBUG_OVERLAY: "TOGGLE_DEBUG_OVERLAY",
  SET_SHOW_SAMPLES: "SET_SHOW_SAMPLES",
  SET_SAMPLES: "SET_SAMPLES",
  CLEAR_FILE: "CLEAR_FILE",
  RESET: "RESET",
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_FILE:
      if (action.payload && action.payload.size > 5 * 1024 * 1024) {
        throw new Error("File size exceeds 5MB limit");
      }
      return {
        ...state,
        file: action.payload,
        fileName: action.payload?.name || "",
        fileSize: action.payload?.size || 0,
      };

    case ACTIONS.SET_IMAGE_DATA:
      return { ...state, imageData: action.payload };

    case ACTIONS.SET_IMAGE_BITMAP:
      return { ...state, imageBitmap: action.payload };

    case ACTIONS.SET_REPORT:
      return { ...state, report: action.payload };

    case ACTIONS.SET_PROCESSING:
      return { ...state, isProcessing: action.payload };

    case ACTIONS.TOGGLE_DEBUG_OVERLAY:
      return { ...state, showDebugOverlay: !state.showDebugOverlay };

    case ACTIONS.SET_SHOW_SAMPLES:
      return { ...state, showSamples: action.payload };

    case ACTIONS.SET_SAMPLES:
      return { ...state, samples: action.payload };

    case ACTIONS.CLEAR_FILE:
      return {
        ...state,
        file: null,
        imageData: null,
        imageBitmap: null,
        fileName: "",
        fileSize: 0,
        report: null,
      };

    case ACTIONS.RESET:
      return initialState;

    default:
      return state;
  }
};

// Create context
const StoreContext = createContext();

// Provider component
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const actions = {
    setFile: (file) => dispatch({ type: ACTIONS.SET_FILE, payload: file }),
    setImageData: (imageData) =>
      dispatch({ type: ACTIONS.SET_IMAGE_DATA, payload: imageData }),
    setImageBitmap: (imageBitmap) =>
      dispatch({ type: ACTIONS.SET_IMAGE_BITMAP, payload: imageBitmap }),
    setReport: (report) =>
      dispatch({ type: ACTIONS.SET_REPORT, payload: report }),
    setProcessing: (isProcessing) =>
      dispatch({ type: ACTIONS.SET_PROCESSING, payload: isProcessing }),
    toggleDebugOverlay: () => dispatch({ type: ACTIONS.TOGGLE_DEBUG_OVERLAY }),
    setShowSamples: (showSamples) =>
      dispatch({ type: ACTIONS.SET_SHOW_SAMPLES, payload: showSamples }),
    setSamples: (samples) =>
      dispatch({ type: ACTIONS.SET_SAMPLES, payload: samples }),
    clearFile: () => dispatch({ type: ACTIONS.CLEAR_FILE }),
    reset: () => dispatch({ type: ACTIONS.RESET }),
  };

  return (
    <StoreContext.Provider value={{ ...state, ...actions }}>
      {children}
    </StoreContext.Provider>
  );
};

// Hook to use store
const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return context;
};

export default useStore;
