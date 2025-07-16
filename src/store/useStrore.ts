import { create } from 'zustand';

export interface Room {
  id: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface LayoutInput {
  roomCount: number;
  minSize: number;
  maxSize: number;
  type: 'house' | 'apartment';
}

type State = {
  rooms: Room[];
  generateLayout: (input: LayoutInput) => void;
  updateRoom: (id: string, updates: Partial<Room>) => void;
};

export const useStore = create<State>((set) => ({
  rooms: [],
  generateLayout: ({ roomCount, minSize, maxSize }) => {
    const rooms: Room[] = Array.from({ length: roomCount }).map((_, i) => {
      const width = Math.random() * (maxSize - minSize) + minSize;
      const height = Math.random() * (maxSize - minSize) + minSize;
      return {
        id: `room-${i}`,
        name: `Room ${i + 1}`,
        x: 50 + i * 20,
        y: 50 + i * 20,
        width,
        height,
      };
    });
    set({ rooms });
  },
  updateRoom: (id, updates) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === id ? { ...room, ...updates } : room
      ),
    })),
}));
