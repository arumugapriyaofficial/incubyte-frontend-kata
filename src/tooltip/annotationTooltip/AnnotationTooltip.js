import { TypeColors } from "../../reusable/colors/TypeColors";


export const AnnotationTooltip = ({ x, y, arrow, label, sub, color = "#C8A6FF", lineDir = "right" }) => {
    
  return (
    <div className="annotation-tooltip-container" style={{
      left: x, top: y,
      flexDirection: lineDir === "left" ? "row-reverse" : "row",
    }}>
      <div className="annotation-tooltip-content" style={{
        background: color + "18",
        border: `1px solid ${color}44`,
      }}>
        <div className="annotation-tooltip-label" style={{ color }}>
          {label}
        </div>
        {sub && <div className="annotation-tooltip-sub">{sub}</div>}
      </div>
    </div>
  );
}
