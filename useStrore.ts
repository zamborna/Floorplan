type State = {
  rooms: Room[];
  generateLayout: (input: LayoutInput) => void;
  updateRoom: (id: string, updates: Partial<Room>) => void;
};

export const useStore = create<State>((set) => ({
  rooms: [],
  generateLayout: ({ roomCount, minSize, maxSize, type }) => {
    // (same as before)
  },
  updateRoom: (id, updates) =>
    set((state) => ({
      rooms: state.rooms.map((room) =>
        room.id === id ? { ...room, ...updates } : room
      ),
    })),
}));
