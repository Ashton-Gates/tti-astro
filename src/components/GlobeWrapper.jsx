import React, { useRef, useEffect } from 'react';
import Globe from 'react-globe.gl';
import * as THREE from 'three';

function GlobeWrapper({ focusLatLng, arcsData = [], pointsData = [] }) {
  const globeRef = useRef();

  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current.controls().autoRotate = true;
    globeRef.current.controls().autoRotateSpeed = 0.5;
    globeRef.current.pointOfView({ altitude: 2.5 });

    if (focusLatLng) {
      globeRef.current.pointOfView({
        lat: focusLatLng.lat,
        lng: focusLatLng.lng,
        altitude: 1.4
      }, 1200);
    }
  }, [focusLatLng]);

  return (
    <Globe
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

    // 👇 use custom mesh for each point
    pointsData={pointsData}
    pointLat="lat"
    pointLng="lng"
    pointAltitude={0.00}
    pointLabel={() => ''}
    pointRadius={0.01}           // lower = thinner point
    pointResolution={4}
    customThreeObject={() => {
        const ring = new THREE.Mesh(
          new THREE.RingGeometry(0.05, 0.06, 32),
          new THREE.MeshBasicMaterial({
            color: 'cyan',
            transparent: true,
            opacity: 0.5,
            side: THREE.DoubleSide,
            depthWrite: false
          })
        );
        ring.rotation.x = Math.PI / 2;
        return ring;
      }}
      customThreeObjectUpdate={(obj, d) => {
        const t = Date.now() / 200;
        const scale = 0.5 + 0.5 * Math.sin(t);
        obj.scale.set(scale, scale, scale);
        obj.material.opacity = 0.4 + 0.3 * Math.sin(t);
      }}
    />
  );
}

export default GlobeWrapper;