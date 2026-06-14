"use client";

import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

const initialShapePalette = [
  { id: 'rect', type: 'Rectangle', text: 'Step', style: { width: '120px', height: '60px', borderRadius: '8px' } },
  { id: 'circle', type: 'Circle', text: 'Start/End', style: { width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
  { id: 'diamond', type: 'Diamond', text: 'Decision', style: { width: '100px', height: '100px', transform: 'rotate(45deg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0', overflow: 'hidden' } },
  { id: 'arrow', type: 'Arrow', text: 'Flow', style: { width: '100px', height: '30px', backgroundColor: 'transparent', border: 'none', position: 'relative' } }
];

export default function EditorPage() {
  const [shapes, setShapes] = useState([]);
  const [draggingShapeId, setDraggingShapeId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);
  const [diagramName, setDiagramName] = useState('New Diagram');
  const [selectedShapeId, setSelectedShapeId] = useState(null);
  const [shapeText, setShapeText] = useState('');

  useEffect(() => {
    const savedDiagram = localStorage.getItem('currentDiagram');
    if (savedDiagram) {
      const { name, shapes: loadedShapes } = JSON.parse(savedDiagram);
      setDiagramName(name);
      setShapes(loadedShapes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentDiagram', JSON.stringify({ name: diagramName, shapes }));
  }, [shapes, diagramName]);

  useEffect(() => {
    if (selectedShapeId) {
      const shape = shapes.find(s => s.id === selectedShapeId);
      if (shape) {
        setShapeText(shape.text);
      }
    } else {
      setShapeText('');
    }
  }, [selectedShapeId, shapes]);

  const addShapeToCanvas = (paletteItem) => {
    const newShapeId = uuidv4();
    const newShape = {
      id: newShapeId,
      type: paletteItem.type,
      text: paletteItem.text,
      x: 50,
      y: 50,
      width: parseInt(paletteItem.style.width || '120px'),
      height: parseInt(paletteItem.style.height || '60px'),
      style: paletteItem.style,
    };
    setShapes((prevShapes) => [...prevShapes, newShape]);
    setSelectedShapeId(newShapeId);
  };

  const handleMouseDown = (e, id) => {
    if (id === 'canvas') {
      setSelectedShapeId(null);
      setDraggingShapeId(null);
      return;
    }

    e.stopPropagation();
    const targetShape = shapes.find(s => s.id === id);
    if (!targetShape) return;

    setDraggingShapeId(id);
    setSelectedShapeId(id);

    const rect = e.currentTarget.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingShapeId || !canvasRef.current) return;

    const canvasRect = canvasRef.current.getBoundingClientRect();
    let newX = e.clientX - canvasRect.left - offset.x;
    let newY = e.clientY - canvasRect.top - offset.y;

    const currentShape = shapes.find(s => s.id === draggingShapeId);
    if (!currentShape) return;

    newX = Math.max(0, Math.min(newX, canvasRect.width - currentShape.width));
    newY = Math.max(0, Math.min(newY, canvasRect.height - currentShape.height));


    setShapes((prevShapes) =>
      prevShapes.map((shape) =>
        shape.id === draggingShapeId
          ? { ...shape, x: newX, y: newY }
          : shape
      )
    );
  };

  const handleMouseUp = () => {
    setDraggingShapeId(null);
    setOffset({ x: 0, y: 0 });
  };

  const updateShapeText = (e) => {
    const newText = e.target.value;
    setShapeText(newText);
    if (selectedShapeId) {
      setShapes(prevShapes =>
        prevShapes.map(shape =>
          shape.id === selectedShapeId ? { ...shape, text: newText } : shape
        )
      );
    }
  };

  const deleteSelectedShape = () => {
    if (selectedShapeId) {
      setShapes(prevShapes => prevShapes.filter(shape => shape.id !== selectedShapeId));
      setSelectedShapeId(null);
    }
  };

  const clearCanvas = () => {
    if (window.confirm("Are you sure you want to clear the canvas? All unsaved changes will be lost.")) {
      setShapes([]);
      setDiagramName('New Diagram');
      setSelectedShapeId(null);
    }
  };

  const saveDiagram = () => {
    const allDiagrams = JSON.parse(localStorage.getItem('diagrams') || '[]');
    const currentDiagramIndex = allDiagrams.findIndex(d => d.name === diagramName);

    const diagramToSave = {
      id: uuidv4(),
      name: diagramName,
      date: new Date().toISOString(),
      shapes: shapes,
    };

    if (currentDiagramIndex > -1) {
      diagramToSave.id = allDiagrams[currentDiagramIndex].id;
      allDiagrams[currentDiagramIndex] = diagramToSave;
    } else {
      allDiagrams.push(diagramToSave);
    }
    localStorage.setItem('diagrams', JSON.stringify(allDiagrams));
    alert(`Diagram "${diagramName}" saved!`);
  };

  return (
    <div className="editor-layout" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} style={{ minHeight: 'calc(100vh - 80px)' }}>
      <aside className="editor-sidebar glass-card">
        <h3>Shapes Palette</h3>
        <div className="shape-palette">
          {initialShapePalette.map((item) => (
            <div
              key={item.id}
              className="palette-item"
              onClick={() => addShapeToCanvas(item)}
            >
              {item.type === 'Arrow' ? (
                <div style={{ width: '60px', height: '10px', background: 'var(--accent-gradient)', margin: '0 auto', position: 'relative' }}>
                  <div style={{ position: 'absolute', right: '-10px', top: '-5px', width: '0', height: '0', borderLeft: '10px solid var(--accent-gradient)', borderTop: '10px solid transparent', borderBottom: '10px solid transparent' }}></div>
                </div>
              ) : (
                item.text
              )}
            </div>
          ))}
        </div>
        <h3 style={{ marginTop: '2rem' }}>Diagram Properties</h3>
        <div className="form-group">
          <label htmlFor="diagramName">Diagram Name:</label>
          <input
            type="text"
            id="diagramName"
            value={diagramName}
            onChange={(e) => setDiagramName(e.target.value)}
            placeholder="Enter diagram name"
          />
        </div>

        {selectedShapeId && (
          <div style={{ marginTop: '2rem' }}>
            <h3>Selected Shape Properties</h3>
            <div className="form-group">
              <label htmlFor="shapeText">Shape Text:</label>
              <input
                type="text"
                id="shapeText"
                value={shapeText}
                onChange={updateShapeText}
                placeholder="Enter shape text"
              />
            </div>
            <div className="form-actions">
              <button onClick={deleteSelectedShape} className="gradient-button-outline" style={{ borderColor: 'red', color: 'red' }}>
                Delete Shape
              </button>
            </div>
          </div>
        )}

        <div className="form-actions" style={{ marginTop: '2rem', justifyContent: 'flex-start' }}>
          <button onClick={saveDiagram} className="gradient-button">
            Save Diagram
          </button>
          <button onClick={clearCanvas} className="gradient-button-outline">
            Clear Canvas
          </button>
        </div>
      </aside>

      <section className="editor-canvas-container">
        <div
          ref={canvasRef}
          className="editor-canvas"
          onMouseDown={(e) => handleMouseDown(e, 'canvas')}
        >
          {shapes.map((shape) => (
            <div
              key={shape.id}
              className={`diagram-shape ${shape.type === 'Rectangle' ? 'diagram-shape-square' : ''} ${shape.type === 'Circle' ? 'diagram-shape-circle' : ''} ${shape.type === 'Diamond' ? 'diagram-shape-diamond' : ''} ${selectedShapeId === shape.id ? 'active' : ''}`}
              style={{
                left: `${shape.x}px`,
                top: `${shape.y}px`,
                width: `${shape.width}px`,
                height: `${shape.height}px`,
                ...shape.style,
                ...(shape.type === 'Diamond' && {
                  transform: 'rotate(45deg)',
                  backgroundColor: 'rgba(80, 176, 255, 0.4)',
                  border: '1px solid rgba(80, 176, 255, 0.7)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  padding: '0',
                }),
                ...(shape.type === 'Arrow' && {
                  background: 'transparent',
                  border: 'none',
                  position: 'absolute',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                })
              }}
              onMouseDown={(e) => handleMouseDown(e, shape.id)}
            >
              {shape.type === 'Diamond' ? (
                <div style={{ transform: 'rotate(-45deg)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '80%' }}>
                  {shape.text}
                </div>
              ) : shape.type === 'Arrow' ? (
                <div style={{ width: '100%', height: '10px', background: 'var(--accent-gradient)', position: 'relative' }}>
                  <div style={{ position: 'absolute', right: '-10px', top: '-5px', width: '0', height: '0', borderLeft: '10px solid var(--accent-gradient)', borderTop: '10px solid transparent', borderBottom: '10px solid transparent' }}></div>
                </div>
              ) : (
                shape.text
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
