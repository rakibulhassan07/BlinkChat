import ChatBubbleOutlineRoundedIcon from "@mui/icons-material/ChatBubbleOutlineRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import LogoMembersMenu from "./LogoMembersMenu";
import ProfileMenu from "./ProfileMenu";
import ToolButton from "./ToolButton";

function RailNav({ canManageMembers, currentUserId, members, onLogout, onRemoveMember, roomId, user }) {
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
        <LogoMembersMenu
          canManageMembers={canManageMembers}
          currentUserId={currentUserId}
          members={members}
          onRemoveMember={onRemoveMember}
          roomId={roomId}
        />
        <ToolButton label="Files">
          <FolderRoundedIcon />
        </ToolButton>
      </nav>

      <ProfileMenu onLogout={onLogout} user={user} />
    </aside>
  );
}

export default RailNav;
