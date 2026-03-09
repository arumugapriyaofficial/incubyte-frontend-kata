import { TypeColors } from "../reusable/colors/TypeColors";
import "./FilterBar.css";

export const FilterBar = ({ search, setSearch, activeType, setActiveType, sort, setSort, allTypes = [] }) => {
  return (
    <div className="filter-bar">

      {/* Search */}
      <div className="filter-bar__search-wrap">
        <div className="filter-bar__search-icon">⌕</div>
        <input
          className="filter-bar__search-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search Pokémon by name or ID…"
        />
        {search && (
          <button className="filter-bar__search-clear" onClick={() => setSearch("")}>
            ×
          </button>
        )}
      </div>

      {/* Type filters + sort */}
      <div className="filter-bar__controls">

        {/* "All" button */}
        <button
          className={`filter-bar__btn${!activeType ? " filter-bar__btn--all-active" : ""}`}
          onClick={() => setActiveType(null)}
        >
          All
        </button>

        {/* Per-type buttons — dynamic color via CSS custom properties */}
        {allTypes.map(t => {
          const c      = TypeColors[t] || TypeColors.normal;
          const active = activeType === t;
          return (
            <button
              key={t}
              className="filter-bar__btn"
              onClick={() => setActiveType(active ? null : t)}
              style={{
                "--type-color":    c.bg,
                background: active ? `${c.bg}30`    : undefined,
                borderColor: active ? c.bg           : undefined,
                color:       active ? c.bg           : undefined,
              }}
            >
              {t}
            </button>
          );
        })}

        {/* Sort */}
        <select
          className="filter-bar__sort"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="id">Sort: ID</option>
          <option value="name">Sort: Name</option>
          <option value="hp">Sort: HP</option>
          <option value="speed">Sort: Speed</option>
        </select>

      </div>
    </div>
  );
};