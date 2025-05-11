import React, { useState } from 'react';
import GlobeWrapper from '../components/GlobeWrapper.jsx';

const RevealGlobe = () => {
  const [revealed, setRevealed] = useState(false);
  const [focusLatLng, setFocusLatLng] = useState(null);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const arcsData = [
    { startLat: 23.6345, startLng: -102.5528, endLat: 38.9072, endLng: -77.0369 }, // Mexico → DC
    { startLat: 40.4637, startLng: -3.7492, endLat: 51.5072, endLng: -0.1276 },     // Spain → London
    { startLat: 56.1304, startLng: -106.3468, endLat: 34.0522, endLng: -118.2437 }  // Canada → LA
  ];

  const pointsData = [
    { lat: 23.6345, lng: -102.5528 },
    { lat: 40.4637, lng: -3.7492 },
    { lat: 56.1304, lng: -106.3468 },
    { lat: 38.9072, lng: -77.0369 },
    { lat: 34.0522, lng: -118.2437 },
    { lat: 51.5072, lng: -0.1276 }
  ];

  const handleClick = () => {
    setRevealed(true);
    setFocusLatLng({ lat: 34.0522, lng: -118.2437 });
  };

  const handleItemClick = (item, latLng) => {
    setSelectedItem(item);
    if (latLng) setFocusLatLng(latLng);
  };

  return (
    <div className="w-full h-full relative">
      <GlobeWrapper focusLatLng={focusLatLng} arcsData={arcsData} pointsData={pointsData} />

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

      {revealed && (
        <>
          <div className="absolute left-0 top-0 w-[300px] h-full bg-black/40 text-white z-10 overflow-y-auto p-6 border-r border-green-400">
            <h3 className="text-xl font-bold mb-4">Trafficking Tactics Index</h3>

            <div
              className="mb-2 cursor-pointer text-green-300 font-semibold"
              onClick={() => setActiveCategory(activeCategory === 'countries' ? null : 'countries')}
            >
              Countries
            </div>
            {activeCategory === 'countries' && (
              <ul className="ml-2 text-sm space-y-1 mb-4">
                <li className="hover:underline cursor-pointer" onClick={() => handleItemClick('Mexico', { lat: 23.6345, lng: -102.5528 })}>Mexico</li>
                <li className="hover:underline cursor-pointer" onClick={() => handleItemClick('Spain', { lat: 40.4637, lng: -3.7492 })}>Spain</li>
                <li className="hover:underline cursor-pointer" onClick={() => handleItemClick('Canada', { lat: 56.1304, lng: -106.3468 })}>Canada</li>
              </ul>
            )}

            <div
              className="mb-2 cursor-pointer text-green-300 font-semibold"
              onClick={() => setActiveCategory(activeCategory === 'victim' ? null : 'victim')}
            >
              Victim Recognition
            </div>
            {activeCategory === 'victim' && (
              <ul className="ml-2 text-sm space-y-1 mb-4">
                <li className="hover:underline cursor-pointer" onClick={() => handleItemClick('Bangkok Grooming Signs')}>Bangkok Grooming Signs</li>
                <li className="hover:underline cursor-pointer" onClick={() => handleItemClick('Lagos Victim Indicators')}>Lagos Victim Indicators</li>
              </ul>
            )}

            <div
              className="mb-2 cursor-pointer text-green-300 font-semibold"
              onClick={() => setActiveCategory(activeCategory === 'pattern' ? null : 'pattern')}
            >
              Pattern Avoidance
            </div>
            {activeCategory === 'pattern' && (
              <ul className="ml-2 text-sm space-y-1">
                <li className="hover:underline cursor-pointer" onClick={() => handleItemClick('Istanbul Safe Transit')}>Istanbul Safe Transit</li>
                <li className="hover:underline cursor-pointer" onClick={() => handleItemClick('Buenos Aires Hotel Checkpoint')}>Buenos Aires Hotel Checkpoint</li>
              </ul>
            )}
          </div>

          {selectedItem && (
            <div className="absolute right-0 top-0 w-[400px] h-full bg-black/80 text-white z-20 overflow-y-auto p-6 border-l border-green-400">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">{selectedItem}</h3>
                <button onClick={() => setSelectedItem(null)} className="text-gray-300 hover:text-white">✕</button>
              </div>
              <p className="text-sm text-gray-300">
                {selectedItem === 'Mexico' && 'Mexico is a high-risk trafficking corridor with known cartel-linked grooming and transport routes.'}
                {selectedItem === 'Spain' && 'Spain has reported major grooming tactics targeting tourists in coastal regions.'}
                {selectedItem === 'Canada' && 'Canada shows patterns in victim movement between provinces, especially involving indigenous communities.'}
                {selectedItem === 'Bangkok Grooming Signs' && 'Grooming signs include sudden access to tech, secretive behavior, or visible tracking devices.'}
                {selectedItem === 'Lagos Victim Indicators' && 'Common indicators include isolation from friends, change in dress, or lack of personal documents.'}
                {selectedItem === 'Istanbul Safe Transit' && 'Avoid metro stations after 9PM, and use verified rideshare options where possible.'}
                {selectedItem === 'Buenos Aires Hotel Checkpoint' && 'Hotels near Retiro are known for transit exploitation; avoid without verified contact or escort.'}
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RevealGlobe;
