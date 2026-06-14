import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addMessage,
  attachMockFile,
  selectRoom,
  setSearch,
  setTheme,
  toggleReaction,
} from "../store/chatSlice";
import { currentUser } from "../data/mockData";
import { filterMessages, getTypingMember, roomMatches } from "../utils/chatUtils";

export function useBlinkChat() {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);

  const activeRoom = useMemo(
    () => chat.rooms.find((room) => room.id === chat.activeRoomId) ?? chat.rooms[0],
    [chat.activeRoomId, chat.rooms]
  );

  const visibleCommunities = useMemo(
    () => chat.rooms.filter((room) => room.category === "community" && roomMatches(room, chat.search)),
    [chat.rooms, chat.search]
  );

  const visibleDirects = useMemo(
    () => chat.rooms.filter((room) => room.category === "direct" && roomMatches(room, chat.search)),
    [chat.rooms, chat.search]
  );

  const visibleMessages = useMemo(
    () => filterMessages(activeRoom.messages, chat.search),
    [activeRoom.messages, chat.search]
  );

  const typingMember = useMemo(
    () => getTypingMember(activeRoom, currentUser.name),
    [activeRoom]
  );

  return {
    ...chat,
    activeRoom,
    currentUser,
    typingMember,
    visibleCommunities,
    visibleDirects,
    visibleMessages,
    actions: {
      addMessage: (text) => dispatch(addMessage(text)),
      attachMockFile: () => dispatch(attachMockFile()),
      selectRoom: (roomId) => dispatch(selectRoom(roomId)),
      setSearch: (value) => dispatch(setSearch(value)),
      setTheme: (theme) => dispatch(setTheme(theme)),
      toggleReaction: (payload) => dispatch(toggleReaction(payload)),
    },
  };
}
