"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MyDiagramsPage() {
  const [diagrams, setDiagrams] = useState([]);

  useEffect(() => {
    loadDiagrams();
  }, []);

  const loadDiagrams = () => {
    const savedDiagrams = JSON.parse(localStorage.getItem('diagrams') || '[]');
    setDiagrams(savedDiagrams);
  };

  const handleLoadDiagram = (diagram) => {
    localStorage.setItem('currentDiagram', JSON.stringify({ name: diagram.name, shapes: diagram.shapes }));
    window.location.href = '/editor';
  };

  const handleDeleteDiagram = (id) => {
    if (window.confirm("Are you sure you want to delete this diagram?")) {
      const updatedDiagrams = diagrams.filter(d => d.id !== id);
      localStorage.setItem('diagrams', JSON.stringify(updatedDiagrams));
      setDiagrams(updatedDiagrams);
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>
        My Diagrams
      </h1>

      {diagrams.length === 0 ? (
        <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>You haven't saved any diagrams yet.</p>
          <Link href="/editor" className="gradient-button">
            Start Building Your First Diagram
          </Link>
        </div>
      ) : (
        <div className="diagram-list">
          {diagrams.map((diagram) => (
            <div key={diagram.id} className="diagram-item">
              <div>
                <h3 className="diagram-item-name">{diagram.name}</h3>
                <p className="diagram-item-date">Saved: {new Date(diagram.date).toLocaleString()}</p>
              </div>
              <div className="diagram-item-actions">
                <button onClick={() => handleLoadDiagram(diagram)} className="gradient-button">
                  Load
                </button>
                <button onClick={() => handleDeleteDiagram(diagram.id)} className="gradient-button-outline" style={{ borderColor: 'red', color: 'red' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
