// lib/three-optimization.ts
// Dynamic imports untuk Three.js components
export const loadThreeComponents = () => {
  // Hanya import yang diperlukan, tidak seluruh library
  return {
    SphereGeometry: () => import("three").then((m) => m.SphereGeometry),
    MeshStandardMaterial: () => import("three").then((m) => m.MeshStandardMaterial),
    // Import lainnya sesuai kebutuhan
  };
};
