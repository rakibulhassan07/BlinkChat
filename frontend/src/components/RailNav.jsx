import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import ToolButton from "./ToolButton";

function RailNav() {
  return (
    <aside aria-label="Primary navigation" className="rail">
      <a aria-label="BlinkChat home" className="brand-mark" href="#app">
        <span className="brand-pulse" />
        <span>B</span>
      </a>

      <nav className="rail-nav">
        <ToolButton active label="Chats">
          <ChatBubbleOutlineRoundedIcon />
        </ToolButton>
        <ToolButton label="Communities">
          <GroupsRoundedIcon />
        </ToolButton>
        <ToolButton label="Files">
          <FolderRoundedIcon />
        </ToolButton>
      </nav>

      <ToolButton className="rail-bottom" label="Settings">
        <SettingsRoundedIcon />
      </ToolButton>
    </aside>
  );
}

export default RailNav;
