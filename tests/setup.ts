import "@testing-library/jest-dom";
import "whatwg-fetch";

// Suppress specific console warnings
const originalWarn = console.warn;
console.warn = (...args) => {
  if (
    typeof args[0] === "string" &&
    (args[0].includes("React Router Future Flag Warning") ||
      args[0].includes("v7_startTransition") ||
      args[0].includes("v7_relativeSplatPath"))
  ) {
    return;
  }
  originalWarn.apply(console, args);
};
