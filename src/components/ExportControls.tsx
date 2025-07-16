import html2canvas from 'html2canvas';
import Drawing from 'dxf-writer';
import { useStore } from '../store/useStore';

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

export default function ExportControls() {
  const handleExportPNG = async () => {
    const svgElement = document.getElementById('floorplan-container');
    if (!svgElement) return;

    const canvas = await html2canvas(svgElement, {
      useCORS: true,
      backgroundColor: '#ffffff',
    });

    const link = document.createElement('a');
    link.download = 'floorplan.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div style={{ marginTop: '1rem' }}>
      <button onClick={handleExportPNG}>Export as PNG</button>
    </div>
  );
}
