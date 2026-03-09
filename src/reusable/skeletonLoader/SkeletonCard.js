import './SkeletonCard.css';

export const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-shimmer" />
      {[{ w: "50%", h: 80, r: "50%", mx: "auto", mb: 16 },
        { w: "60%", h: 12, r: 4, mx: "auto", mb: 10 },
        { w: "40%", h: 8, r: 99, mx: "auto", mb: 16 },
      ].map((s, i) => (
        <div key={i} className="skeleton-item" style={{
          width: s.w, height: s.h, borderRadius: s.r,
          margin: `0 ${s.mx} ${s.mb}`,
        }} />
      ))}
    </div>
  );
}