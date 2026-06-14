import { createSlice } from "@reduxjs/toolkit";
import { currentUser, initialRooms } from "../data/mockData";

const mockUpload = {
  id: "file-upload-preview",
  name: "blinkchat-upload-preview.png",
  type: "PNG",
  meta: "842 KB",
};

const initialState = {
  activeRoomId: "java-devs",
  attachedFile: null,
  rooms: initialRooms,
  search: "",
  theme: "midnight",
};

function activeRoom(state) {
  return state.rooms.find((room) => room.id === state.activeRoomId) ?? state.rooms[0];
}

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    selectRoom(state, action) {
      state.activeRoomId = action.payload;
      const room = activeRoom(state);
      if (room) room.unread = 0;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    attachMockFile(state) {
      state.attachedFile = mockUpload;
    },
    addMessage(state, action) {
      const text = action.payload?.trim();
      const room = activeRoom(state);

      if (!room || (!text && !state.attachedFile)) return;

      const message = {
        id: `local-${Date.now()}`,
        author: currentUser.shortName,
        initials: currentUser.initials,
        role: "You",
        status: currentUser.status,
        colors: currentUser.colors,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text: text || "Shared a file with the room.",
        own: true,
        reactions: [{ label: "Sent", count: 1, active: false }],
      };

      if (state.attachedFile) {
        const uploadedFile = {
          ...state.attachedFile,
          id: `file-${Date.now()}`,
        };

        message.attachment = uploadedFile;
        room.files.unshift(uploadedFile);
        state.attachedFile = null;
      }

      room.messages.push(message);
    },
    toggleReaction(state, action) {
      const { messageId, reactionIndex } = action.payload;
      const room = activeRoom(state);
      const message = room?.messages.find((item) => item.id === messageId);
      const reaction = message?.reactions?.[reactionIndex];

      if (!reaction) return;

      reaction.active = !reaction.active;
      reaction.count += reaction.active ? 1 : -1;
    },
  },
});

export const {
  addMessage,
  attachMockFile,
  selectRoom,
  setSearch,
  setTheme,
  toggleReaction,
} = chatSlice.actions;

export default chatSlice.reducer;
