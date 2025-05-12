import React, { useState } from 'react';
import GlobeWrapper from '../components/GlobeWrapper.jsx';

const RevealGlobe = ({ entries, arcsData, pointsData }) => {
  const [revealed, setRevealed] = useState(false);
  const [focusLatLng, setFocusLatLng] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleClick = () => {
    setRevealed(true);
    setFocusLatLng({ lat: 34.0522, lng: -118.2437 }); // Default LA view
  };

  const handleItemClick = (item, latLng) => {
    setSelectedItem(item);
    if (latLng) setFocusLatLng(latLng);
  };

  const selectedData = entries.find(d => d.title === selectedItem);

  return (
    <div className="w-full h-full relative bg-black text-white overflow-hidden">
      {/* Globe stays mounted and responsive */}
      <div className="fixed inset-0 z-0">
        <GlobeWrapper
          focusLatLng={focusLatLng}
          arcsData={arcsData}
          pointsData={pointsData}
        />
      </div>

      {/* Intro overlay */}
      {!revealed && (
        <div className="absolute inset-0 bg-black/80 z-10 flex flex-col items-center justify-center text-center">
          <h1 className="text-green-300 text-xl md:text-3xl font-semibold tracking-wider mb-2">
            THEY KNOW WHO YOU ARE.
          </h1>
          <h2 className="text-white text-4xl md:text-6xl font-bold mb-6">
            IT'S TIME TO UNCOVER<br />
            <span className="text-red-500">WHO THEY ARE.</span>
          </h2>
          <p className="text-gray-300 max-w-xl mx-auto mb-10">
            Project Ojo is an interactive map that reveals the network of trafficking tactics, movements, and behaviors used worldwide.
          </p>
          <button
            onClick={handleClick}
            className="px-6 py-3 bg-green-400 text-black font-semibold rounded hover:bg-green-300 transition"
          >
            READY TO FIND OUT?
          </button>
        </div>
      )}

      {/* Sidebar + Detail pane */}
      {revealed && (
        <>
          <div className="absolute left-0 top-0 w-[300px] h-full bg-black/40 text-white z-20 overflow-y-auto p-6 border-r border-green-400">
            <h3 className="text-xl font-bold mb-4">Trafficking Tactics Index</h3>
            <div
              className="mb-2 cursor-pointer text-green-300 font-semibold"
              onClick={() =>
                setActiveCategory(activeCategory === 'countries' ? null : 'countries')
              }
            >
              Tactics
            </div>

            {activeCategory === 'countries' && (
              <ul className="ml-2 text-sm space-y-1 mb-4">
                {entries.map((entry) => (
                  <li
                    key={entry.id}
                    className="hover:underline cursor-pointer"
                    onClick={() =>
                      handleItemClick(entry.title, {
                        lat: entry.lat_start,
                        lng: entry.lng_start
                      })
                    }
                  >
                    {entry.title}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {selectedItem && selectedData && (
            <div className="absolute right-0 top-0 w-[400px] h-full bg-black/80 text-white z-30 overflow-y-auto p-6 border-l border-green-400">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{selectedData.title}</h3>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="text-gray-300 hover:text-white"
                >
                  ✕
                </button>
              </div>
              <p className="text-sm text-gray-300 whitespace-pre-wrap">
                {selectedData.summary_short || 'No description available.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RevealGlobe;