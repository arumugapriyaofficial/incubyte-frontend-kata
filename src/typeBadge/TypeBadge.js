import { TypeColors } from "../reusable/colors/TypeColors";
import './TypeBadge.css';

export const TypeBadge = ({ type, size = "sm" }) => {
  const c = TypeColors[type] || TypeColors.normal;
  return (
    <span className={`type-badge type-badge-${size}`} style={{
      background: c.bg + "28",
      color: c.bg,
      border: `1px solid ${c.bg}44`,
    }}>
      {type}
    </span>
  );
}
