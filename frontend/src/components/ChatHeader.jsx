import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import PhoneRoundedIcon from "@mui/icons-material/PhoneRounded";
import VideocamRoundedIcon from "@mui/icons-material/VideocamRounded";
import Avatar from "./Avatar";
import ThemeSwitcher from "./ThemeSwitcher";
import ToolButton from "./ToolButton";

function ChatHeader({ onThemeChange, room, theme }) {
  return (
    <header className="chat-header">
      <div className="room-title-block">
        <Avatar item={room} large />
        <div>
          <div className="room-title-row">
            <h2>{room.name}</h2>
            <span className="badge">{room.type}</span>
          </div>
          <p>{room.description}</p>
        </div>
      </div>

      <div className="chat-actions">
        <ThemeSwitcher activeTheme={theme} onThemeChange={onThemeChange} />
        <ToolButton className="compact" label="Audio call">
          <PhoneRoundedIcon />
        </ToolButton>
        <ToolButton className="compact" label="Video call">
          <VideocamRoundedIcon />
        </ToolButton>
        <ToolButton className="compact" label="Notifications">
          <NotificationsRoundedIcon />
        </ToolButton>
      </div>
    </header>
  );
}

export default ChatHeader;
