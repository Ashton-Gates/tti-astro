import React, { useEffect, useRef } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

const GlobeWrapper = ({ focusLatLng, arcsData, pointsData }) => {
  const globeRef = useRef();

  useEffect(() => {
    if (globeRef.current && focusLatLng) {
      globeRef.current.pointOfView({ lat: focusLatLng.lat, lng: focusLatLng.lng, altitude: 1.5 }, 2000);
    }
  }, [focusLatLng]);

  return (
    <Globe
    rendererConfig={{ preserveDrawingBuffer: true }}
      ref={globeRef}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      showAtmosphere
      atmosphereColor="skyblue"
      atmosphereAltitude={0.2}
      arcsData={arcsData}
      arcColor={() => 'lime'}
      arcStroke={1.5}
      arcDashLength={0.3}
      arcDashGap={1}
      arcDashAnimateTime={4000}
      arcAltitude={0.15}
      pointsData={pointsData}
      pointLat="lat"
      pointLng="lng"
      pointAltitude={0}
      pointRadius={0.01}
      pointResolution={4}
      customThreeObject={() => {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.1, 0.12, 32),
          new THREE.MeshBasicMaterial({
            color: 'cyan',
            transparent: true,
            opacity: 0.2,
            side: THREE.DoubleSide
          })
        );
        ring.rotation.x = Math.PI / 2;
        return ring;
      }}
      customThreeObjectUpdate={(obj) => {
        const scale = (1 + Math.sin(Date.now() / 200)) * 0.5 + 0.5;
        obj.scale.set(scale, scale, scale);
      }}
    />
  );
};

export default GlobeWrapper;