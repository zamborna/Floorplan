import React, { useRef, useEffect, useState } from 'react';
import { useStore } from '../store/useStore';

export default function FloorPlanCanvas() {
  const rooms = useStore((state) => state.rooms);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);

  // Mouse state for dragging
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const updateRoom = useStore((state) => state.updateRoom);

  const handleMouseDown = (e: React.MouseEvent, roomId: string, x: number, y: number) => {
    setSelectedRoomId(roomId);
    setDragging(true);
    setDragOffset({
      x: e.clientX - x,
      y: e.clientY - y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !selectedRoomId) return;

    const newX = e.clientX - dragOffset.x;
    const newY = e.clientY - dragOffset.y;

    updateRoom(selectedRoomId, { x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setDragging(false);
    setSelectedRoomId(null);
  };

  return (
    <svg
      width={1200}
      height={800}
      style={{ border: '1px solid #ccc', background: '#f9f9f9' }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Optional: Draw grid */}
      {Array.from({ length: 60 }).map((_, i) => (
        <line key={`v-${i}`} x1={i * 20} y1={0} x2={i * 20} y2={800} stroke="#eee" />
      ))}
      {Array.from({ length: 40 }).map((_, i) => (
        <line key={`h-${i}`} y1={i * 20} x1={0} y2={i * 20} x2={1200} stroke="#eee" />
      ))}

      {/* Draw each room */}
      {rooms.map((room) => (
        <g
          key={room.id}
          onMouseDown={(e) => handleMouseDown(e, room.id, room.x, room.y)}
          cursor="move"
        >
          <rect
            x={room.x}
            y={room.y}
            width={room.width}
            height={room.height}
            fill="#fff"
            stroke="#000"
            strokeWidth={2}
          />
          {/* Label */}
          <text x={room.x + 10} y={room.y + 20} fontSize={14} fill="#333">
            {room.name}
          </text>
          {/* Dimensions */}
          <text
            x={room.x + room.width / 2}
            y={room.y - 5}
            fontSize={12}
            textAnchor="middle"
            fill="#666"
          >
            {Math.round(room.width / 10)} m
          </text>
          <text
            x={room.x - 25}
            y={room.y + room.height / 2}
            fontSize={12}
            textAnchor="middle"
            transform={`rotate(-90, ${room.x - 25}, ${room.y + room.height / 2})`}
            fill="#666"
          >
            {Math.round(room.height / 10)} m
          </text>
        </g>
      ))}
    </svg>
  );
}
