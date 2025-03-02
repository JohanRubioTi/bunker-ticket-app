import React, { useState, useRef, useEffect } from 'react';
import * as THREE from 'three';

const Roulette: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const rouletteWheelRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<THREE.AnimationMixer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const prizes = [1, 2, 3, 4, 5, 6, 7, 8]; // Data structure for prizes

  const createTextTexture = (text: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.font = 'Bold 40px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  const createRouletteWheel = (prizes: any[]) => {
    const wheel = new THREE.Group();
    const segmentAngle = (2 * Math.PI) / prizes.length;

    for (let i = 0; i < prizes.length; i++) {
      const geometry = new THREE.CylinderGeometry(
        2, // Top radius
        2, // Bottom radius
        0.5, // Height
        32, // Radial segments
        1, // Height segments
        false, // Open ended
        i * segmentAngle, // Theta start
        segmentAngle // Theta length
      );

      const color = new THREE.Color(`hsl(${i * (360 / prizes.length)}, 100%, 50%)`);
      const material = new THREE.MeshLambertMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.2,
      });

      const segment = new THREE.Mesh(geometry, material);
      wheel.add(segment);

      // Add neon outline
      const edges = new THREE.EdgesGeometry(geometry);
      const lineMaterial = new THREE.LineBasicMaterial({ color: color, linewidth: 2 });
      const outline = new THREE.LineSegments(edges, lineMaterial);
      segment.add(outline);

      // Add text label
      const textTexture = createTextTexture(String(prizes[i]));
      const textMaterial = new THREE.MeshBasicMaterial({ map: textTexture, transparent: true });
      const textGeometry = new THREE.PlaneGeometry(1, 0.25); // Adjust size as needed
      const textMesh = new THREE.Mesh(textGeometry, textMaterial);

      // Position the text
      const labelAngle = i * segmentAngle + segmentAngle / 2;
      const labelRadius = 1.5; // Adjust as needed
      textMesh.position.x = Math.cos(labelAngle) * labelRadius;
      textMesh.position.z = Math.sin(labelAngle) * labelRadius;
      textMesh.position.y = 0.3; // Place on top of the segment
      textMesh.rotation.y = labelAngle;
      textMesh.rotation.x = Math.PI / 2;

      wheel.add(textMesh);
    }

    const baseGeometry = new THREE.CylinderGeometry(2.2, 2.2, 0.2, 32);
    const baseMaterial = new THREE.MeshLambertMaterial({
      color: 0x000000,
      emissive: 0x111111,
      emissiveIntensity: 0.5,
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.y = -0.35;
    wheel.add(base);

    return wheel;
  };

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    cameraRef.current = camera;
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

        // Add point light
    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.set(0, 5, 5);
    scene.add(pointLight);

    camera.position.z = 5;
    camera.position.y = 1;
    camera.rotation.x = -0.2;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const clock = new THREE.Clock();

    // Add roulette wheel
    rouletteWheelRef.current = createRouletteWheel(prizes);
    scene.add(rouletteWheelRef.current);

    // Dynamic camera setup
    camera.position.z = 6;
    camera.position.y = 2;
    camera.rotation.x = -0.3;
    camera.fov = 50;
    camera.updateProjectionMatrix();

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (mixerRef.current) {
        mixerRef.current.update(clock.getDelta());
      }
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  const spinRoulette = () => {
    if (spinning) return;

    setSpinning(true);
    setResult(null);

    const randomPrizeIndex = Math.floor(Math.random() * prizes.length);
    const segmentAngle = (2 * Math.PI) / prizes.length;
    const finalRotation =
      -1 * (2 * Math.PI * 5 + randomPrizeIndex * segmentAngle); // Spin 5 times + angle to prize

    // Create animation
    if (!rouletteWheelRef.current) return;
    mixerRef.current = new THREE.AnimationMixer(rouletteWheelRef.current);

    // Wheel rotation
    const wheelTrack = new THREE.NumberKeyframeTrack(
      '.rotation[y]', // Property to animate
      [0, 5], // Times (in seconds)
      [0, finalRotation], // Values
      THREE.InterpolateSmooth // Interpolation type
    );

    // Camera movement - example: subtle zoom
    let cameraTrack;
    if (cameraRef.current) {
        cameraTrack = new THREE.NumberKeyframeTrack(
          '.position',
          [0, 5],
          [
            cameraRef.current.position.x,
            cameraRef.current.position.y,
            cameraRef.current.position.z,
            cameraRef.current.position.x,
            cameraRef.current.position.y,
            cameraRef.current.position.z - 1,
          ]
        );
    }

      const tracks = [wheelTrack];
      if (cameraTrack) {
        tracks.push(cameraTrack)
      }
    const clip = new THREE.AnimationClip('spin', 5, tracks);
    const action = mixerRef.current.clipAction(clip);
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;
    action.play();

    setTimeout(() => {
      setSpinning(false);
      setResult(String(prizes[randomPrizeIndex]));
    }, 5000);
  };

  return (
    <div className="roulette-container flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-4">¡Gira la Ruleta!</h1>
      <div ref={mountRef} className="w-full h-96"></div>
      <button
        className="roulette-button bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={spinRoulette}
        disabled={spinning}
      >
        {spinning ? 'Girando...' : 'Girar'}
      </button>
      {result && (
        <div className="roulette-result text-xl mt-4">¡Ganaste: {result}!</div>
      )}
    </div>
  );
};

export default Roulette;
