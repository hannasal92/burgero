export default function Spinner({
  size = 40,
  color = "#ff9800",
  thickness = 4,
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `${thickness}px solid rgba(0,0,0,0.1)`,
        borderTop: `${thickness}px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 1s linear infinite",
      }}
    />
  );
}