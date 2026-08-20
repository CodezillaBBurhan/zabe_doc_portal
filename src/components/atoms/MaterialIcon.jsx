export default function MaterialIcon({ icon, className = '' }) {
  return (
    <span 
      className={`material-symbols-outlined ${className}`}
      style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
    >
      {icon}
    </span>
  );
}
