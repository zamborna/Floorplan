import { create } from 'zustand';

type Room = {
  x: number;
  y: number;
  width: number;
  height: number;
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

    for (let i = 0; i < roomCount; i++) {
      const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
      rooms.push({
        x: i * (size + 10),
        y: 10,
        width: size * 10,
        height: size * 10,
      });
    }

    set({ rooms });
  },
}));
