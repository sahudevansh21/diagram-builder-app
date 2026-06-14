"use client";

import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>
        Simple Diagram Builder
      </h1>
      <p style={{ fontSize: '1.25rem', maxWidth: '800px', margin: '0 auto 3rem auto', color: '#b0b0b0' }}>
        Visualize your ideas with ease. Drag, drop, and connect basic shapes to create stunning flowcharts, mind maps, and diagrams, all for free and right in your browser.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '4rem' }}>
        <Link href="/editor"
          className="gradient-button"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)', transition: 'transform 0.2s ease-in-out' }}
        >
          Start Building Your Diagram
        </Link>
        <Link href="/my-diagrams" className="gradient-button-outline">
          View My Diagrams
        </Link>
      </div>

      <div className="grid-cols-2" style={{ marginTop: '3rem' }}>
        <div className="glass-card">
          <h2>Problem: Complexity & Cost</h2>
          <p>Individuals frequently need to visualize ideas, processes, or plans in a structured way but lack a simple, accessible tool. Complex drawing software is often overkill or expensive, and manual drawing can be messy and hard to edit.</p>
        </div>
        <div className="glass-card">
          <h2>Solution: Intuitive Visualization</h2>
          <p>This website provides an intuitive canvas where users can drag, drop, and connect basic shapes to create simple flowcharts, mind maps, or diagrams. All created diagrams can be saved, loaded, and managed directly within the browser, offering a quick and free visualization tool.</p>
        </div>
      </div>
    </div>
  );
}
