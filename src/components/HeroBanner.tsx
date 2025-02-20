import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const HeroBanner: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const glitchInterval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 500);
    }, 5000);

    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    renderer.domElement.classList.add('three-canvas');

    // --- Darker Gradient Background (as a texture) ---
    const gradientCanvas = document.createElement('canvas');
    gradientCanvas.width = 512;
    gradientCanvas.height = 512;
    const gradientContext = gradientCanvas.getContext('2d');

    const updateGradient = (time: number) => {
      if (!gradientContext) return;
      const gradient = gradientContext.createLinearGradient(0, 0, gradientCanvas.width, gradientCanvas.height);
      gradient.addColorStop(0, `hsl(${time * 20}, 100%, 1%)`);
      gradient.addColorStop(0.5, 'hsl(0, 0%, 0%)');
      gradient.addColorStop(1, 'hsl(240, 100%, 0.5%)');
      gradientContext.fillStyle = gradient;
      gradientContext.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);
    };

    const gradientTexture = new THREE.CanvasTexture(gradientCanvas);
    scene.background = gradientTexture;

    // --- Neon Green Wireframe ---
    const planeSize = 2000;
    const planeSegments = 150;
    const geometry = new THREE.PlaneGeometry(planeSize, planeSize, planeSegments, planeSegments);
    const material = new THREE.MeshStandardMaterial({
      color: 0x00ff00,
      wireframe: true,
      emissive: 0x006400,
    });
    const landscape = new THREE.Mesh(geometry, material);
    landscape.rotation.x = -Math.PI / 2;
    scene.add(landscape);

    const vertices = geometry.attributes.position.array;
    for (let i = 0; i < vertices.length; i += 3) {
      vertices[i + 2] = 0;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeVertexNormals();

    // --- Lighting ---
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    camera.position.set(0, 100, 500);

    // --- Animation Loop ---
    const animate = () => {
      requestAnimationFrame(animate);

      const scrollY = window.scrollY;
      const normalizedScroll = scrollY / 1000;

      camera.position.z = 500 - scrollY * 0.5;
      camera.position.y = 100 + scrollY * 0.2;
      camera.lookAt(scene.position);

      const time = performance.now() * 0.001;

      updateGradient(time);
      gradientTexture.needsUpdate = true;

      for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i];
        const y = vertices[i + 1];
        let z = 0;
        z += Math.sin(x * 0.02 + time) * 20;
        z += Math.cos(y * 0.02 + time * 1.3) * 15;
        z += Math.sin((x + y) * 0.03 + time * 0.7) * 10;
        vertices[i + 2] = z;
      }
      geometry.attributes.position.needsUpdate = true;
      geometry.computeVertexNormals();

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
      setIsMounted(false);
      clearInterval(glitchInterval);
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

      {/* Main Header - Positioned Absolutely at the Top */}
      <h1 className={`absolute top-8 left-1/2 transform -translate-x-1/2 text-6xl md:text-[8vw] font-bold text-white z-20 ${glitch ? 'glitch' : ''}`}>
        Bunker: Boletas Rave Bogotá
      </h1>

      {/* Content Below Waves */}
      <div className="hero-content">
        <p className="text-3xl md:text-4xl text-green-500 mb-8 subheader"> {/* Added subheader class */}
          Explora los mejores eventos de música electrónica.
        </p>
        <a href="#all-events" className="bg-green-500 hover:bg-green-700 text-black font-bold py-3 px-6 rounded-full text-xl md:text-2xl transition duration-300">
          Ver Eventos
        </a>
      </div>
    </div>
  );
};

export default HeroBanner;
