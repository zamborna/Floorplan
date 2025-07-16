import React from 'react';
import html2canvas from 'html2canvas';
import Drawing from 'dxf-writer';
import { useStore } from '../store/useStore';

export default function ExportControls() {
  const handleExportPNG = async () => {
    const container = document.getElementById('floorplan-container');
    if (!container) return;

    const canvas = await html2canvas(container, {
      backgroundColor: '#ffffff',
      scale: 2,
    });

    const link = document.createElement('a');
    link.download = 'floorplan.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleExportDXF = () => {
    const { rooms } = useStore.getState();
    const d = new Drawing();
    d.setUnits('Meters');

    rooms.forEach((room) => {
      const x = room.x / 100;
      const y = room.y / 100;
      const w = room.width / 100;
      const h = room.height / 100;

      d.drawRect(x, y, w, h);
      d.drawText(room.name, x + 0.2, y + 0.2, 0.2, 0);
    });

    const blob = new Blob([d.toDxfString()], { type: 'application/dxf' });
    const link = document.createElement('a');
    link.download = 'floorplan.dxf';
    link.href = URL.createObjectURL(blob);
    link.click();
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={handleExportPNG}>Export as PNG</button>
      <button onClick={handleExportDXF} style={{ marginLeft: '1rem' }}>Export as DXF</button>
    </div>
  );
}
