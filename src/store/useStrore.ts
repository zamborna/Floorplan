import { create } from 'zustand';

type Room = {
  id: string;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
};

type LayoutInput = {
  roomCount: number;
  minSize: number;
  maxSize: number;
  type: 'apartment' | 'house';
};

type State = {
  rooms: Room[];
  generateLayout: (input: LayoutInput) => void;
};

export const useStore = create<State>((set) => ({
  rooms: [],
  generateLayout: ({ roomCount, minSize, maxSize, type }) => {
    const rooms: Room[] = [];
    const gridWidth = 1000; // in cm (10m width canvas)
    const padding = 50; // space between rooms
    const rowHeight = 300; // fixed row height for simplicity
    let cursorX = padding;
    let cursorY = padding;

    for (let i = 0; i < roomCount; i++) {
      const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      const aspectRatio = Math.random() > 0.5 ? 1.2 : 0.8;
      const width = Math.floor(size * aspectRatio * 10); // 1m = 10 units
      const height = Math.floor(size / aspectRatio * 10);

      // Wrap to next row if overflow
      if (cursorX + width > gridWidth) {
        cursorX = padding;
        cursorY += rowHeight + padding;
      }

      rooms.push({
        id: `room-${i}`,
        name: `Room ${i + 1}`,
        width,
        height,
        x: cursorX,
        y: cursorY,
      });

      cursorX += width + padding;
    }

    set({ rooms });
  },
  updateRoom: (id, updates) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === id ? { ...room, ...updates } : room
      ),
    })),
  
}));
