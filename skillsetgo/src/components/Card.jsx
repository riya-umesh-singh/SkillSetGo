export default function Card({ children, className = "", padded = true, bracket = false }) {
  return (
    <div
      className={`bg-white border border-border rounded-[4px] ${bracket ? "bracket-panel" : ""} ${padded ? "p-6" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
