import { useState } from "react";
import { TypeColors } from "../reusable/colors/TypeColors";
import { TypeBadge } from "../typeBadge/TypeBadge";
import "./PokemanCard.css";

const STAT_META = [
  { label: "HP", key: "hp", mod: "hp" },
  { label: "ATK", key: "attack", mod: "atk" },
  { label: "SPD", key: "speed", mod: "spd" },
];

export const PokemonCard = ({ pokemon, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const primaryType = pokemon.types[0];
  const c = TypeColors[primaryType] || TypeColors.normal;

  // Dynamic values that depend on the Pokémon's type color are passed
  // as CSS custom properties so the stylesheet can reference var(--card-color).
  const cssVars = {
    "--card-color": c.bg,
    "--card-border-color": hovered ? `${c.bg}55` : "var(--border)",
    "--card-shadow": hovered ? `0 20px 48px ${c.bg}22, var(--shadow-card)` : "var(--shadow-card)",
    "--card-sprite-bg": `radial-gradient(circle, ${c.bg}22 0%, transparent 70%)`,
  };

  return (
    <div
      onClick={() => onClick(pokemon)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="pokemon-card"
      style={{
        ...cssVars,
        border: `1px solid var(--card-border-color)`,
        boxShadow: "var(--card-shadow)",
      }}
    >
      {/* Background type glow */}
      <div
        className="pokemon-card__glow"
        style={{ background: "var(--card-color)" }}
      />

      {/* ID */}
      <div className="pokemon-card__id">
        #{String(pokemon.id).padStart(3, "0")}
      </div>

      {/* Sprite */}
      <div
        className="pokemon-card__sprite-wrap"
        style={{ background: "var(--card-sprite-bg)" }}
      >
        {pokemon.sprite}
      </div>

      {/* Name */}
      <div className="pokemon-card__name">{pokemon.name}</div>

      {/* Types */}
      <div className="pokemon-card__types">
        {pokemon.types.map(t => <TypeBadge key={t} type={t} />)}
      </div>

      {/* Quick stats */}
      <div className="pokemon-card__stats">
        {STAT_META.map(s => (
          <div key={s.label} className="pokemon-card__stat">
            <div className={`pokemon-card__stat-value pokemon-card__stat-value--${s.mod}`}>
              {pokemon[s.key]}
            </div>
            <div className="pokemon-card__stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
