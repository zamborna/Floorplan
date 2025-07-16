import InputForm from './components/InputForm';
import FloorPlanCanvas from './components/FloorPlanCanvas';
import ExportControls from './components/ExportControls';

export default function App() {
  return (
    <div className="app-container">
      <h1>Floor Plan Generator</h1>
      <InputForm />
      <FloorPlanCanvas />
      <ExportControls />
    </div>
  );
}
