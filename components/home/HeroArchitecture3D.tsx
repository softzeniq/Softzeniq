"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export type ArchitectureLayer = 0 | 1 | 2 | null;

type HeroArchitecture3DProps = {
  activeLayer: ArchitectureLayer;
};

export default function HeroArchitecture3D({
  activeLayer,
}: HeroArchitecture3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const activeLayerRef = useRef<ArchitectureLayer>(activeLayer);
  const [webglUnsupported, setWebglUnsupported] = useState(false);

  useEffect(() => {
    activeLayerRef.current = activeLayer;
  }, [activeLayer]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setWebglUnsupported(true);
      return;
    }

    const disposables: { dispose: () => void }[] = [];
    const track = <T extends { dispose: () => void }>(item: T): T => {
      disposables.push(item);
      return item;
    };

    const scene = new THREE.Scene();

    const initialWidth = container.clientWidth || 520;
    const initialHeight = container.clientHeight || 440;

    const camera = new THREE.PerspectiveCamera(
      34,
      initialWidth / initialHeight,
      0.1,
      100
    );
    camera.position.set(4.9, 3.55, 5.15);
    camera.lookAt(0, 0.05, 0);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setSize(initialWidth, initialHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Studio lighting matched to the Ink-light + Cobalt palette
    const ambientLight = new THREE.AmbientLight(0xf8fafc, 1.35);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xdbeafe, 0.85);
    hemiLight.position.set(0, 6, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.85);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x2563eb, 1.15);
    rimLight.position.set(-5, 3, -4);
    scene.add(rimLight);

    // Root architectural assembly
    const rootGroup = new THREE.Group();
    rootGroup.rotation.y = -Math.PI / 14;
    scene.add(rootGroup);

    // Soft ambient floor shadow ring
    const floorShadowGeo = track(new THREE.CircleGeometry(2.4, 48));
    const floorShadowMat = track(
      new THREE.MeshBasicMaterial({
        color: 0x0f172a,
        transparent: true,
        opacity: 0.06,
      })
    );
    const floorShadow = new THREE.Mesh(floorShadowGeo, floorShadowMat);
    floorShadow.rotation.x = -Math.PI / 2;
    floorShadow.position.y = -1.62;
    rootGroup.add(floorShadow);

    // Layer groups: 0 = Client UI, 1 = API & Logic Mesh, 2 = Cloud & Data
    const baseHeights = [1.05, 0.0, -1.05];
    const layerGroups = [new THREE.Group(), new THREE.Group(), new THREE.Group()];
    layerGroups.forEach((group, idx) => {
      group.position.y = baseHeights[idx];
      rootGroup.add(group);
    });

    // Helper to add crisp edge outlines to slabs
    const addEdges = (
      parent: THREE.Object3D,
      geometry: THREE.BufferGeometry,
      color: number,
      opacity: number
    ) => {
      const edgesGeo = track(new THREE.EdgesGeometry(geometry));
      const edgesMat = track(
        new THREE.LineBasicMaterial({
          color,
          transparent: true,
          opacity,
        })
      );
      const lines = new THREE.LineSegments(edgesGeo, edgesMat);
      parent.add(lines);
      return edgesMat;
    };

    // --- LAYER 0: Client UI & Design System ---
    const uiSlabGeo = track(new THREE.BoxGeometry(2.55, 0.13, 2.55));
    const uiSlabMat = track(
      new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0.18,
        metalness: 0.05,
        clearcoat: 0.65,
        clearcoatRoughness: 0.15,
        transparent: true,
        opacity: 0.94,
      })
    );
    const uiSlab = new THREE.Mesh(uiSlabGeo, uiSlabMat);
    layerGroups[0].add(uiSlab);
    const uiEdgeMat = addEdges(uiSlab, uiSlabGeo, 0x2563eb, 0.42);

    // UI wireframe window elements mounted on Layer 0
    const navBarGeo = track(new THREE.BoxGeometry(2.05, 0.045, 0.24));
    const navBarMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x2563eb,
        roughness: 0.3,
        metalness: 0.15,
        emissive: 0x1d4ed8,
        emissiveIntensity: 0.15,
      })
    );
    const navBar = new THREE.Mesh(navBarGeo, navBarMat);
    navBar.position.set(0, 0.095, -0.85);
    layerGroups[0].add(navBar);

    const cardLeftGeo = track(new THREE.BoxGeometry(1.18, 0.05, 1.3));
    const cardMat = track(
      new THREE.MeshStandardMaterial({
        color: 0xf1f5f9,
        roughness: 0.4,
        metalness: 0.05,
      })
    );
    const cardLeft = new THREE.Mesh(cardLeftGeo, cardMat);
    cardLeft.position.set(-0.43, 0.095, 0.22);
    layerGroups[0].add(cardLeft);
    addEdges(cardLeft, cardLeftGeo, 0x94a3b8, 0.35);

    const cardRightGeo = track(new THREE.BoxGeometry(0.72, 0.05, 1.3));
    const cardRight = new THREE.Mesh(cardRightGeo, cardMat);
    cardRight.position.set(0.66, 0.095, 0.22);
    layerGroups[0].add(cardRight);
    addEdges(cardRight, cardRightGeo, 0x94a3b8, 0.35);

    // --- LAYER 1: API & Logic Mesh ---
    const apiSlabGeo = track(new THREE.BoxGeometry(2.55, 0.1, 2.55));
    const apiSlabMat = track(
      new THREE.MeshPhysicalMaterial({
        color: 0xeff6ff,
        roughness: 0.22,
        metalness: 0.08,
        transparent: true,
        opacity: 0.85,
      })
    );
    const apiSlab = new THREE.Mesh(apiSlabGeo, apiSlabMat);
    layerGroups[1].add(apiSlab);
    const apiEdgeMat = addEdges(apiSlab, apiSlabGeo, 0x2563eb, 0.45);

    // Microservice nodes on Layer 1
    const nodeGeo = track(new THREE.BoxGeometry(0.24, 0.14, 0.24));
    const coreNodeGeo = track(new THREE.OctahedronGeometry(0.24, 0));
    const nodeMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x3b82f6,
        roughness: 0.25,
        metalness: 0.35,
        emissive: 0x2563eb,
        emissiveIntensity: 0.2,
      })
    );
    const secondaryNodeMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x1e293b,
        roughness: 0.35,
        metalness: 0.4,
      })
    );

    const coreNode = new THREE.Mesh(coreNodeGeo, nodeMat);
    coreNode.position.set(0, 0.22, 0);
    layerGroups[1].add(coreNode);

    const satelliteOffsets: [number, number][] = [
      [-0.78, -0.78],
      [0.78, -0.78],
      [-0.78, 0.78],
      [0.78, 0.78],
    ];
    satelliteOffsets.forEach(([x, z]) => {
      const sat = new THREE.Mesh(nodeGeo, secondaryNodeMat);
      sat.position.set(x, 0.13, z);
      layerGroups[1].add(sat);
      addEdges(sat, nodeGeo, 0x3b82f6, 0.45);

      const linePoints = [
        new THREE.Vector3(0, 0.14, 0),
        new THREE.Vector3(x, 0.14, 0),
        new THREE.Vector3(x, 0.14, z),
      ];
      const traceGeo = track(new THREE.BufferGeometry().setFromPoints(linePoints));
      const traceMat = track(
        new THREE.LineBasicMaterial({
          color: 0x2563eb,
          transparent: true,
          opacity: 0.55,
        })
      );
      layerGroups[1].add(new THREE.Line(traceGeo, traceMat));
    });

    // --- LAYER 2: Cloud & Data Foundation ---
    const cloudSlabGeo = track(new THREE.BoxGeometry(2.75, 0.18, 2.75));
    const cloudSlabMat = track(
      new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        roughness: 0.38,
        metalness: 0.28,
      })
    );
    const cloudSlab = new THREE.Mesh(cloudSlabGeo, cloudSlabMat);
    layerGroups[2].add(cloudSlab);
    const cloudEdgeMat = addEdges(cloudSlab, cloudSlabGeo, 0x3b82f6, 0.5);

    const gridHelper = new THREE.GridHelper(2.45, 8, 0x2563eb, 0x334155);
    gridHelper.position.y = 0.095;
    layerGroups[2].add(gridHelper);
    track(gridHelper.geometry);
    if (Array.isArray(gridHelper.material)) {
      gridHelper.material.forEach((m) => track(m));
    } else {
      track(gridHelper.material);
    }

    // Structural vertical bus rails connecting the 3 layers
    const busCoords: [number, number][] = [
      [-1.12, -1.12],
      [1.12, -1.12],
      [-1.12, 1.12],
      [1.12, 1.12],
    ];
    const railGeo = track(new THREE.CylinderGeometry(0.014, 0.014, 2.2, 8));
    const railMat = track(
      new THREE.MeshBasicMaterial({
        color: 0x64748b,
        transparent: true,
        opacity: 0.3,
      })
    );
    busCoords.forEach(([x, z]) => {
      const rail = new THREE.Mesh(railGeo, railMat);
      rail.position.set(x, 0, z);
      rootGroup.add(rail);
    });

    // Animated vertical data packets traveling along the bus rails
    const packetGeo = track(new THREE.SphereGeometry(0.042, 12, 12));
    const packetMat = track(
      new THREE.MeshBasicMaterial({
        color: 0x2563eb,
      })
    );
    const packets = busCoords.map(([x, z], idx) => {
      const mesh = new THREE.Mesh(packetGeo, packetMat);
      mesh.position.set(x, -1, z);
      rootGroup.add(mesh);
      return {
        mesh,
        phase: idx * 0.25,
        speed: 0.34 + idx * 0.04,
      };
    });

    // Pointer interaction state
    let targetTiltX = 0;
    let targetTiltY = 0;
    let isHovered = false;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      targetTiltY = nx * 0.28;
      targetTiltX = ny * 0.16;
      isHovered = true;
    };

    const handlePointerLeave = () => {
      targetTiltX = 0;
      targetTiltY = 0;
      isHovered = false;
    };

    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);

    // ResizeObserver for responsive container sizing
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      }
    });
    resizeObserver.observe(container);

    // Pause animation when off-screen to preserve battery & FPS
    let isVisible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    let rafId = 0;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      const focused = activeLayerRef.current;

      // Smooth damped pointer rotation + gentle idle sway
      const idleYaw = prefersReducedMotion ? 0 : Math.sin(t * 0.45) * 0.08;
      rootGroup.rotation.y +=
        (-Math.PI / 14 + targetTiltY + idleYaw - rootGroup.rotation.y) * 0.06;
      rootGroup.rotation.x += (targetTiltX - rootGroup.rotation.x) * 0.06;

      // Rotate central API core gently
      if (!prefersReducedMotion) {
        coreNode.rotation.y = t * 0.65;
        coreNode.rotation.x = Math.sin(t * 0.5) * 0.15;
      }

      // Layer elevation & highlight emphasis based on hover / activeLayer
      const spread = isHovered || focused !== null ? 0.14 : 0;
      const targetOffsets = [spread, 0, -spread];

      layerGroups.forEach((group, idx) => {
        const isFocused = focused === idx;
        const floatY = prefersReducedMotion
          ? 0
          : Math.sin(t * 1.1 + idx * 0.8) * 0.025;
        const focusBoost = isFocused ? 0.14 : 0;
        const desiredY = baseHeights[idx] + targetOffsets[idx] + floatY + focusBoost;
        group.position.y += (desiredY - group.position.y) * 0.08;

        const targetScale =
          focused === null ? 1 : isFocused ? 1.045 : 0.965;
        group.scale.x += (targetScale - group.scale.x) * 0.08;
        group.scale.z += (targetScale - group.scale.z) * 0.08;
      });

      uiEdgeMat.opacity = focused === 0 ? 0.95 : focused === null ? 0.42 : 0.2;
      apiEdgeMat.opacity = focused === 1 ? 0.95 : focused === null ? 0.45 : 0.2;
      cloudEdgeMat.opacity = focused === 2 ? 0.95 : focused === null ? 0.5 : 0.25;
      nodeMat.emissiveIntensity = focused === 1 ? 0.55 : 0.2;
      navBarMat.emissiveIntensity = focused === 0 ? 0.4 : 0.15;

      // Animate data packets smoothly along the vertical buses
      packets.forEach((p, idx) => {
        if (prefersReducedMotion) {
          p.mesh.position.y = -0.5 + idx * 0.35;
          return;
        }
        const progress = ((t * p.speed + p.phase) % 1 + 1) % 1;
        const direction = idx % 2 === 0 ? 1 : -1;
        const y =
          direction === 1
            ? -1.0 + progress * 2.05
            : 1.05 - progress * 2.05;
        p.mesh.position.y = y;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.cancelAnimationFrame(rafId);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    };
  }, []);

  if (webglUnsupported) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-3">
          {["01 Client UI & Design", "02 API & Business Logic", "03 Cloud & Data Layer"].map(
            (label, idx) => (
              <div
                key={label}
                className={`rounded-xl border p-4 text-sm font-medium transition-colors ${
                  activeLayer === idx
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card border-border text-foreground"
                }`}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      aria-label="Interactive 3D software architecture stack"
      className="w-full h-full cursor-grab active:cursor-grabbing select-none"
    />
  );
}
