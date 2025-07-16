import html2canvas from 'html2canvas';

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
