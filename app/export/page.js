"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ExportPage() {
  const [diagrams, setDiagrams] = useState([]);
  const [selectedDiagramId, setSelectedDiagramId] = useState('');
  const [exportContent, setExportContent] = useState('');

  useEffect(() => {
    const savedDiagrams = JSON.parse(localStorage.getItem('diagrams') || '[]');
    setDiagrams(savedDiagrams);
    if (savedDiagrams.length > 0) {
      setSelectedDiagramId(savedDiagrams[0].id);
    }
  }, []);

  useEffect(() => {
    if (selectedDiagramId) {
      const diagram = diagrams.find(d => d.id === selectedDiagramId);
      if (diagram) {
        setExportContent(JSON.stringify(diagram, null, 2));
      }
    } else {
      setExportContent('');
    }
  }, [selectedDiagramId, diagrams]);

  const handleCopy = () => {
    navigator.clipboard.writeText(exportContent).then(() => {
      alert('Diagram content copied to clipboard!');
    }).catch(err => {
      console.error('Failed to copy: ', err);
      alert('Failed to copy diagram content.');
    });
  };

  const handleDownload = () => {
    const diagram = diagrams.find(d => d.id === selectedDiagramId);
    if (!diagram) return;

    const filename = `${diagram.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.json`;
    const blob = new Blob([exportContent], { type: 'application/json' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', paddingBottom: '4rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '2rem', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', color: 'transparent' }}>
        Export Diagram
      </h1>

      <div className="glass-card export-content">
        <div className="form-group">
          <label htmlFor="selectDiagram">Select Diagram to Export:</label>
          <select
            id="selectDiagram"
            value={selectedDiagramId}
            onChange={(e) => setSelectedDiagramId(e.target.value)}
          >
            {diagrams.length === 0 ? (
              <option value="">No diagrams available</option>
            ) : (
              <>
                {diagrams.map(diagram => (
                  <option key={diagram.id} value={diagram.id}>
                    {diagram.name}
                  </option>
                ))}
              </>
            )}
          </select>
        </div>

        {exportContent && (
          <>
            <h3>Export Preview (JSON)</h3>
            <div className="export-preview-area">
              {exportContent}
            </div>
            <div className="form-actions">
              <button onClick={handleCopy} className="gradient-button">
                Copy to Clipboard
              </button>
              <button onClick={handleDownload} className="gradient-button-outline">
                Download as JSON
              </button>
            </div>
          </>
        )}
        {!selectedDiagramId && diagrams.length > 0 && (
          <p style={{ textAlign: 'center', color: '#b0b0b0' }}>Please select a diagram to view its exportable content.</p>
        )}
        {diagrams.length === 0 && (
           <p style={{ textAlign: 'center', color: '#b0b0b0' }}>No diagrams saved yet. Go to the <Link href="/editor" style={{ color: 'var(--text-light)', textDecoration: 'underline' }}>Editor</Link> to create one.</p>
        )}
      </div>
    </div>
  );
}
