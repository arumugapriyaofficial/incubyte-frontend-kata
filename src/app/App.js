import { useState, useEffect } from "react";
import { DesignCss } from '../reusable/Css/designCss/DesignCss';
import { PokemonCard } from '../card/PokemanCard';
import { DetailPanel } from '../detailPanel/DetailPanel';
import { FilterBar } from '../filterBar/FilterBar';
import { SkeletonCard } from '../reusable/skeletonLoader/SkeletonCard';
import './App.css';

export default function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [search, setSearch]       = useState("");
  const [activeType, setActiveType] = useState(null);
  const [sort, setSort]           = useState("id");
  const [selected, setSelected]   = useState(null);
  const [showLoading, setShowLoading] = useState(true);
  const [error, setError]         = useState(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setShowLoading(true);
        // Fetch a list of 50 Pokemon to populate the grid
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
        if (!response.ok) throw new Error("Failed to fetch pokemon list");
        const data = await response.json();
        
        // Fetch details for each pokemon
        const detailedPromises = data.results.map(async (p) => {
          const detailRes = await fetch(p.url);
          if (!detailRes.ok) throw new Error(`Failed to fetch details for ${p.name}`);
          const detailData = await detailRes.json();
          
          return {
            id: detailData.id,
            name: detailData.name.charAt(0).toUpperCase() + detailData.name.slice(1),
            types: detailData.types.map(t => t.type.name),
            hp: detailData.stats.find(s => s.stat.name === 'hp')?.base_stat || 0,
            attack: detailData.stats.find(s => s.stat.name === 'attack')?.base_stat || 0,
            defense: detailData.stats.find(s => s.stat.name === 'defense')?.base_stat || 0,
            speed: detailData.stats.find(s => s.stat.name === 'speed')?.base_stat || 0,
            height: detailData.height,
            weight: detailData.weight,
            sprite: <img 
                      src={detailData.sprites.other["official-artwork"].front_default || detailData.sprites.front_default} 
                      alt={detailData.name} 
                      style={{ width: '100%', height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))' }} 
                    />
          };
        });

        const detailedPokemon = await Promise.all(detailedPromises);
        setPokemonList(detailedPokemon);
        
        // Extract all unique types
        const types = [...new Set(detailedPokemon.flatMap(p => p.types))].sort();
        setAllTypes(types);
      } catch (err) {
        console.error("Error fetching pokemon:", err);
        setError("Failed to load Pokémon data. Please try again later.");
      } finally {
        setShowLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const filtered = pokemonList
    .filter(p => {
      const q = search.toLowerCase();
      const matchSearch = p.name.toLowerCase().includes(q) || String(p.id).includes(q);
      const matchType   = !activeType || p.types.includes(activeType);
      return matchSearch && matchType;
    })
    .sort((a, b) => {
      if (sort === "name")  return a.name.localeCompare(b.name);
      if (sort === "hp")    return b.hp - a.hp;
      if (sort === "speed") return b.speed - a.speed;
      return a.id - b.id;
    });

  return (
    <>
      <style>{DesignCss}</style>

      {/* Background */}
      <div className="grain-overlay" />
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>

      <div className="app-container">

        {/* HEADER */}
        <div className="header">
          <div className="header__title-row">
            <div className="header__icon">◈</div>
            <div className="header__label">National Pokédex</div>
          </div>

          <h1 className="header__title">Pokémon Explorer</h1>

          <p className="header__subtitle">
            Browse, filter, and inspect every Pokémon in the National Dex. Click any card to view detailed stats.
          </p>

          {/* Stats row */}
          <div className="stats-row">
            {[
              { v: filtered.length,          l: "Showing" },
              { v: pokemonList.length,       l: "Total"   },
              { v: allTypes.length,          l: "Types"   },
            ].map(s => (
              <div key={s.l} className="stat-item">
                <span className="stat-item__value">{s.v}</span>
                <span className="stat-item__label">{s.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FILTER BAR */}
        <FilterBar
          search={search}
          setSearch={setSearch}
          activeType={activeType}
          setActiveType={setActiveType}
          sort={sort}
          setSort={setSort}
          allTypes={allTypes}
        />

        {/* Skeleton loading toggle */}
        <div className="skeleton-toggle-row">
          <button
            onClick={() => setShowLoading(v => !v)}
            className={`skeleton-toggle-btn${showLoading ? " skeleton-toggle-btn--active" : ""}`}
            disabled={pokemonList.length === 0}
          >
            {showLoading ? "◌ Loading Cards" : "◌ Preview Skeleton State"}
          </button>
          <span className="skeleton-toggle-hint">Toggle loading skeleton</span>
        </div>

        {/* GRID */}
        {error ? (
          <div className="empty-state">
            <div className="empty-state__emoji">⚠️</div>
            <div className="empty-state__title">Error Loading Pokémon</div>
            <div className="empty-state__subtitle">{error}</div>
            <button
              className="empty-state__reset-btn"
              onClick={() => window.location.reload()}
            >
              Retry
            </button>
          </div>
        ) : showLoading ? (
          <div className="pokemon-grid">
            {Array.from({ length: 12 }, (_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state__emoji">😴</div>
            <div className="empty-state__title">No Pokémon found</div>
            <div className="empty-state__subtitle">
              Try adjusting your search or clearing the type filter.
            </div>
            <button
              className="empty-state__reset-btn"
              onClick={() => { setSearch(""); setActiveType(null); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="pokemon-grid">
            {filtered.map(p => <PokemonCard key={p.id} pokemon={p} onClick={setSelected} />)}
          </div>
        )}

      </div>

      {/* DETAIL MODAL */}
      {selected && <DetailPanel pokemon={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
