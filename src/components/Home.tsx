import React, { useEffect, useRef } from 'react';
    import * as THREE from 'three';
    import { Link } from 'react-router-dom';

    // Datos de eventos (simulados)
    const events = [
      { id: '1', name: 'Noche Techno', date: '10/05/2024', imageUrl: 'https://via.placeholder.com/300x200' },
      { id: '2', name: 'Fiesta House', date: '17/05/2024', imageUrl: 'https://via.placeholder.com/300x200' },
      { id: '3', name: 'Sesión Drum & Bass', date: '24/05/2024', imageUrl: 'https://via.placeholder.com/300x200' },
    ];

    const Home: React.FC = () => {
      const containerRef = useRef<HTMLDivElement>(null);

      useEffect(() => {
        // Configuración de Three.js
        if (!containerRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 0);
        containerRef.current.appendChild(renderer.domElement);
        renderer.domElement.classList.add('three-canvas'); // Add class for z-index

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        const animate = () => {
          requestAnimationFrame(animate);
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
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
        <div className="relative">
          <div ref={containerRef} className="absolute inset-0 z-0"></div>
          <div className="container mx-auto p-4 relative z-10">
            <h1 className="text-4xl font-bold mb-8 text-center">Próximos Eventos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event.id} className="card">
                  <img src={event.imageUrl} alt={event.name} className="w-full h-48 object-cover" />
                  <div className="card-content">
                    <h2 className="card-title">{event.name}</h2>
                    <p className="card-date">{event.date}</p>
                    <Link to={`/event/${event.id}`} className="card-button">
                      Conseguir Boletas
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    };

    export default Home;
