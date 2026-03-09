import { TypeColors } from "../reusable/colors/TypeColors";
import { StatColors } from "../reusable/colors/StatColors";
import { TypeBadge } from "../typeBadge/TypeBadge";
import { StatBar } from "../statusBar/StatBar";
import "./DetailPanel.css";

const SPECS = [
  { label: "Height", format: p => `${(p.height / 10).toFixed(1)} m` },
  { label: "Weight", format: p => `${(p.weight / 10).toFixed(1)} kg` },
];

const buildStats = pokemon => [
  { label: "hp",              value: pokemon.hp },
  { label: "attack",          value: pokemon.attack },
  { label: "defense",         value: pokemon.defense },
  { label: "special-attack",  value: Math.floor(pokemon.attack * 0.9) },
  { label: "special-defense", value: Math.floor(pokemon.defense * 0.85) },
  { label: "speed",           value: pokemon.speed },
];

export const DetailPanel = ({ pokemon, onClose }) => {
  if (!pokemon) return null;

  const c     = TypeColors[pokemon.types[0]] || TypeColors.normal;
  const stats = buildStats(pokemon);
  const total = stats.reduce((a, s) => a + s.value, 0);

  // Dynamic type-color values passed as CSS custom properties
  const cssVars = {
    "--panel-color":        c.bg,
    "--panel-border-color": `${c.bg}44`,
    "--panel-shadow":       `0 32px 80px rgba(0,0,0,0.6), 0 0 60px ${c.bg}22`,
    "--panel-header-bg":    `linear-gradient(135deg, ${c.bg}22 0%, ${c.bg}08 100%)`,
    "--panel-header-border":`${c.bg}30`,
    "--panel-radial-bg":    `radial-gradient(ellipse at 50% 0%, ${c.bg}30 0%, transparent 70%)`,
  };

  return (
    <div className="detail-backdrop" onClick={onClose}>
      <div
        className="detail-modal"
        onClick={e => e.stopPropagation()}
        style={{
          ...cssVars,
          border:    "1px solid var(--panel-border-color)",
          boxShadow: "var(--panel-shadow)",
        }}
      >
        {/* Header strip */}
        <div
          className="detail-header"
          style={{
            background:   "var(--panel-header-bg)",
            borderBottom: "1px solid var(--panel-header-border)",
          }}
        >
          {/* Radial background */}
          <div
            className="detail-header__radial-bg"
            style={{ background: "var(--panel-radial-bg)" }}
          />

          {/* Close button */}
          <button className="detail-header__close" onClick={onClose}>×</button>

          <div className="detail-header__sprite">{pokemon.sprite}</div>
          <div className="detail-header__id">#{String(pokemon.id).padStart(3, "0")}</div>
          <div className="detail-header__name">{pokemon.name}</div>

          <div className="detail-header__types">
            {pokemon.types.map(t => <TypeBadge key={t} type={t} size="lg" />)}
          </div>
        </div>

        {/* Body */}
        <div className="detail-body">

          {/* Physical specs */}
          <div className="detail-specs">
            {SPECS.map(spec => (
              <div key={spec.label} className="detail-spec">
                <div className="detail-spec__value">{spec.format(pokemon)}</div>
                <div className="detail-spec__label">{spec.label}</div>
              </div>
            ))}
          </div>

          {/* Base stats */}
          <div className="detail-stats">
            <div className="detail-stats__header">
              <span className="detail-stats__title">Base Stats</span>
              <span className="detail-stats__total">Total: <strong>{total}</strong></span>
            </div>
            {stats.map(s => (
              <StatBar
                key={s.label}
                label={s.label}
                value={s.value}
                color={StatColors[s.label] || "#aaa"}
              />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};