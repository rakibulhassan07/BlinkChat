import { useEffect, useRef, useState } from "react";
import GroupsRoundedIcon from "@mui/icons-material/GroupsRounded";
import PersonRemoveRoundedIcon from "@mui/icons-material/PersonRemoveRounded";
import Avatar from "./Avatar";

function LogoMembersMenu({ canManageMembers, currentUserId, members, onRemoveMember, roomId }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="logo-members-wrap" ref={menuRef}>
      <button
        aria-expanded={open}
        aria-label="Show site members"
        className="icon-button logo-member-trigger"
        onClick={() => setOpen((value) => !value)}
        title="Members"
        type="button"
      >
        <GroupsRoundedIcon />
      </button>

      {open && (
        <div className="logo-members-menu" role="dialog" aria-label="Members">
          <div className="section-heading">
            <h2>Members</h2>
            <span>{members.length}</span>
          </div>
          <div className="member-list">
            {members.map((member) => (
              <div className="member-item" key={member.id}>
                <Avatar item={member} />
                <span className="member-info">
                  <strong>{member.name}</strong>
                  <span>{member.status}</span>
                </span>
                <span className="member-role">{member.role}</span>
                {canManageMembers && member.id !== currentUserId && (
                  <button
                    className="member-remove-button"
                    onClick={() => onRemoveMember({ memberId: member.id, roomId })}
                    title={`Remove ${member.name}`}
                    type="button"
                  >
                    <PersonRemoveRoundedIcon />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LogoMembersMenu;
