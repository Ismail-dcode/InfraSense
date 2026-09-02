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
    <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8 space-y-5 shadow-sm">
      
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <span className="text-xs font-mono font-bold text-blue-600 uppercase tracking-widest block">
            SAVED BLUEPRINTS & HISTORY
          </span>
          <h3 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mt-0.5">
            <Bookmark className="w-5 h-5 text-amber-600" />
            Saved Favorites & Recommendation History
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveCurrent}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors cursor-pointer"
          >
            + Save Current Setup
          </button>
          
          {favorites.length > 0 && (
            <button
              onClick={handleClear}
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Clear all saved history"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {favorites.length === 0 ? (
        <p className="text-xs text-slate-500 font-normal">No saved favorites yet. Click "+ Save Current Setup" to store blueprints in your local history.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {favorites.map(fav => (
            <div key={fav.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div>
                <h4 className="text-xs font-bold text-slate-900">{fav.title}</h4>
                <p className="text-[10px] font-mono text-slate-500">{fav.date}</p>
              </div>
              <Bookmark className="w-4 h-4 text-amber-500" />
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
