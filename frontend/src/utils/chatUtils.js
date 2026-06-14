export function roomMatches(room, query) {
  if (!query) return true;

  const searchableText = [
    room.name,
    room.type,
    room.description,
    room.pinned,
    ...room.messages.map((message) => `${message.author} ${message.text}`),
  ]
    .join(" ")
    .toLowerCase();

  return searchableText.includes(query.toLowerCase());
}

export function filterMessages(messages, query) {
  if (!query) return messages;

  return messages.filter((message) =>
    `${message.author} ${message.role} ${message.text}`.toLowerCase().includes(query.toLowerCase())
  );
}

export function getRoomIconType(room) {
  if (room.type === "Private") return "private";
  if (room.type === "Public") return "public";
  return "direct";
}

export function getTypingMember(room, currentUserName) {
  return room.members.find((member) => member.name !== currentUserName && member.status === "online");
}
