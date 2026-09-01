import React, { useState, useEffect } from 'react';
import { Bookmark, History, Trash2, ArrowRight } from 'lucide-react';

export default function RecommendationHistory({ onSelectSavedBlueprint }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('infrasence_favorites');
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch (e) {
        console.warn(e);
      }
    }
  }, []);

  const handleSaveCurrent = () => {
    const newFav = {
      id: `fav-${Date.now()}`,
      title: `Architecture Blueprint - ${new Date().toLocaleDateString()}`,
      date: new Date().toLocaleDateString(),
      input: { vcpu: 4, ram: 16, workload: 'general_web' }
    };
    const updated = [newFav, ...favorites];
    setFavorites(updated);
    localStorage.setItem('infrasence_favorites', JSON.stringify(updated));
  };

  const handleClear = () => {
    setFavorites([]);
    localStorage.removeItem('infrasence_favorites');
  };

  return (
    <div className="glass-panel p-6 sm:p-8 border border-slate-800 space-y-5">
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block">
            SAVED BLUEPRINTS & HISTORY
          </span>
          <h3 className="text-xl font-extrabold text-white flex items-center gap-2 mt-0.5">
            <Bookmark className="w-5 h-5 text-amber-400" />
            Saved Favorites & Recommendation History
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveCurrent}
            className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 hover:bg-amber-500/20"
          >
            + Save Current Setup
          </button>
          
          {favorites.length > 0 && (
            <button
              onClick={handleClear}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-slate-900"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {favorites.length === 0 ? (
        <p className="text-xs text-slate-400">No saved favorites yet. Click "+ Save Current Setup" to store blueprints in your local history.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {favorites.map(fav => (
            <div key={fav.id} className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-100">{fav.title}</h4>
                <p className="text-[10px] font-mono text-slate-400">{fav.date}</p>
              </div>
              <Bookmark className="w-4 h-4 text-amber-400" />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
