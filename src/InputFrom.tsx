import React, { useState } from 'react';
import { useStore } from '../store/useStore';

export default function InputForm() {
  const [roomCount, setRoomCount] = useState(3);
  const [minSize, setMinSize] = useState(10);
  const [maxSize, setMaxSize] = useState(20);
  const [type, setType] = useState<'apartment' | 'house'>('apartment');

  const generateLayout = useStore((state) => state.generateLayout);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateLayout({ roomCount, minSize, maxSize, type });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Room Count:
        <input type="number" value={roomCount} onChange={(e) => setRoomCount(Number(e.target.value))} />
      </label>
      <label>
        Min Size (m²):
        <input type="number" value={minSize} onChange={(e) => setMinSize(Number(e.target.value))} />
      </label>
      <label>
        Max Size (m²):
        <input type="number" value={maxSize} onChange={(e) => setMaxSize(Number(e.target.value))} />
      </label>
      <label>
        Type:
        <select value={type} onChange={(e) => setType(e.target.value as 'apartment' | 'house')}>
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
        </select>
      </label>
      <button type="submit">Generate Plan</button>
    </form>
  );
}
