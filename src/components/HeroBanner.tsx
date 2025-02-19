import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    renderer.domElement.classList.add('three-canvas');

    // --- Procedural Landscape Geometry ---
    const planeSize = 2000;
    const planeSegments = 150; // Increased segments for detail
    const geometry = new THREE.PlaneGeometry(planeSize, planeSize, planeSegments, planeSegments);
    const material = new THREE.MeshStandardMaterial({
      color: 0x222222, // Dark base color
      wireframe: true,
      emissive: 0x001111 // Subtle emissive glow
    });
    const landscape = new THREE.Mesh(geometry, material);
    landscape.rotation.x = -Math.PI / 2; // Lay it flat
    scene.add(landscape);

    // Vertex displacement for landscape
    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      const x = vertices[i];
      const y = vertices[i + 1];
      const z = 0; // Initial flat plane
      vertices[i + 2] = z;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals(); // Ensure lighting works correctly

    // --- Lighting ---
    const directionalLight = new THREE.DirectionalLight(0x00ffff, 0.5); // Cyan light
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xff00ff, 0.3); // Magenta ambient
    scene.add(ambientLight);


    camera.position.set(0, 100, 500); // Initial camera position


    const animate = () => {
      requestAnimationFrame(animate);

      const scrollY = window.scrollY;
      const normalizedScroll = scrollY / 1000; // Normalize scroll for animation

      // --- Camera Movement based on Scroll ---
      camera.position.z = 500 - scrollY * 0.5; // Move camera forward as scrolling
      camera.position.y = 100 + scrollY * 0.2; // Move camera up slightly
      camera.lookAt(scene.position); // Keep looking at scene center


      // --- Landscape Vertex Displacement Animation ---
      const time = performance.now() * 0.0001 + normalizedScroll; // Time + scroll for animation progression

      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        let z = 0;

        // Combine multiple noise waves for a richer landscape
        z += Math.sin(x * 0.02 + time) * 20;
        z += Math.cos(y * 0.02 + time * 1.3) * 15;
        z += Math.sin((x + y) * 0.03 + time * 0.7) * 10;

        vertices[i + 2] = z;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals(); // Recalculate normals for lighting


      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!containerRef.current) return;
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="hero-banner">
      <div className="hero-banner-canvas-container">
        <div ref={containerRef} className="three-canvas"></div>
      </div>
      <div className="hero-content">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Bunker: Boletas Rave Bogotá</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">Explora los mejores eventos de música electrónica.</p>
        <a href="#all-events" className="bg-green-500 hover:bg-green-700 text-black font-bold py-3 px-6 rounded-full text-lg transition duration-300">
          Ver Eventos
        </a>
      </div>
    </div>
  );
};

export default HeroBanner;
