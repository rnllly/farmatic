export function getReadableLightLevel(lux: number): string {
  if (lux < 1) return "Dark";
  if (lux < 50) return "Dim";
  if (lux < 300) return "Low";
  if (lux < 1000) return "Normal";
  if (lux < 10000) return "Bright";
  if (lux < 30000) return "Sunny";
  return "Blinding";
}

