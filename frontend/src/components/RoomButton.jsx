import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import Avatar from "./Avatar";
import { getRoomIconType } from "../utils/chatUtils";

const iconMap = {
  direct: ChatBubbleOutlineRoundedIcon,
  private: LockRoundedIcon,
  public: PublicRoundedIcon,
};

function RoomButton({ active, onSelect, room }) {
  const Icon = iconMap[getRoomIconType(room)];

  return (
    <button className={`room-item ${active ? "active" : ""}`} onClick={() => onSelect(room.id)} type="button">
      <Avatar item={room} />
      <span className="room-meta">
        <strong>{room.name}</strong>
        <span>{room.description}</span>
      </span>
      {room.unread > 0 ? (
        <span className="room-pill">{room.unread}</span>
      ) : (
        <span className="room-pill quiet">
          <Icon />
        </span>
      )}
    </button>
  );
}

export default RoomButton;
