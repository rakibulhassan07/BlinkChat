import { createSlice } from "@reduxjs/toolkit";
import { currentUser, initialRooms } from "../data/mockData";

const initialState = {
  activeRoomId: "java-devs",
  rooms: initialRooms,
  search: "",
  theme: "midnight",
};

function activeRoom(state) {
  return state.rooms.find((room) => room.id === state.activeRoomId) ?? state.rooms[0];
}

function getInitials(name) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function canManageMembers(room) {
  return room?.members.some(
    (member) => member.id === currentUser.id && ["Admin", "Owner"].includes(member.role)
  );
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
    createCommunity(state, action) {
      const { description, memberIds, name, type } = action.payload;
      const selectedMembers = action.payload.availableUsers
        .filter((user) => memberIds.includes(user.id) && user.id !== currentUser.id)
        .map((user) => ({ ...user, role: "Member" }));

      const communityId = `community-${Date.now()}`;
      const community = {
        id: communityId,
        category: "community",
        name,
        short: getInitials(name) || "BC",
        type,
        status: "online",
        description: description || "New BlinkChat community.",
        unread: 0,
        colors: ["#31d0aa", "#e9ba4f"],
        pinned: "Pinned: admins can add or remove members from this community.",
        members: [
          { ...currentUser, role: "Admin" },
          ...selectedMembers,
        ],
        files: [],
        messages: [
          {
            id: `${communityId}-welcome`,
            author: currentUser.shortName,
            initials: currentUser.initials,
            role: "Admin",
            status: currentUser.status,
            colors: currentUser.colors,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            text: `Created ${name} and added ${selectedMembers.length} member${selectedMembers.length === 1 ? "" : "s"}.`,
            own: true,
            reactions: [{ label: "New", count: 1, active: false }],
          },
        ],
      };

      state.rooms.unshift(community);
      state.activeRoomId = communityId;
    },
    removeCommunityMember(state, action) {
      const { memberId, roomId } = action.payload;
      const room = state.rooms.find((item) => item.id === roomId);

      if (!room || !canManageMembers(room) || memberId === currentUser.id) return;

      room.members = room.members.filter((member) => member.id !== memberId);
    },
    addMessage(state, action) {
      const text = action.payload?.trim();
      const room = activeRoom(state);

      if (!room || !text) return;

      const message = {
        id: `local-${Date.now()}`,
        author: currentUser.shortName,
        initials: currentUser.initials,
        role: "You",
        status: currentUser.status,
        colors: currentUser.colors,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        text,
        own: true,
        reactions: [{ label: "Sent", count: 1, active: false }],
      };

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
  createCommunity,
  removeCommunityMember,
  selectRoom,
  setSearch,
  setTheme,
  toggleReaction,
} = chatSlice.actions;

export default chatSlice.reducer;
