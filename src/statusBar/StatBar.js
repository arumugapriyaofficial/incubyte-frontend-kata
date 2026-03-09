import './StatBar.css';

export const StatBar = ({ label, value, color }) => {
  const pct = Math.min((value / 200) * 100, 100);
  return (
    <div className="stat-bar-container">
      <div className="stat-bar-header">
        <span className="stat-bar-label">
          {label.replace("-", " ")}
        </span>
        <span className="stat-bar-value" style={{ color: color }}>
          {value}
        </span>
      </div>
      <div className="stat-bar-track">
        <div className="stat-bar-fill" style={{
          width: `${pct}%`,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          boxShadow: `0 0 10px ${color}66`,
        }} />
      </div>
    </div>
  );
}
