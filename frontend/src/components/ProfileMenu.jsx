import { useEffect, useRef, useState } from "react";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

function getInitials(user) {
  const name = user?.displayName || user?.email || "BlinkChat User";
  const parts = name.split(/[ @.]+/).filter(Boolean);

  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function ProfileMenu({ onLogout, user }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const displayName = user?.displayName || "BlinkChat User";
  const email = user?.email || "Signed in";

  useEffect(() => {
    function handleClickOutside(event) {
      if (!menuRef.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    setOpen(false);
    onLogout();
  }

  return (
    <div className="profile-menu-wrap" ref={menuRef}>
      <button
        aria-expanded={open}
        aria-label="Open profile menu"
        className="profile-trigger"
        onClick={() => setOpen((value) => !value)}
        title="Profile"
        type="button"
      >
        {user?.photoURL ? <img alt="" src={user.photoURL} /> : <span>{getInitials(user)}</span>}
      </button>

      {open && (
        <div className="profile-menu" role="menu">
          <div className="profile-menu-head">
            {user?.photoURL ? <img alt="" src={user.photoURL} /> : <span>{getInitials(user)}</span>}
            <div>
              <strong>{displayName}</strong>
              <small>{email}</small>
            </div>
          </div>
          <button className="profile-logout" onClick={handleLogout} role="menuitem" type="button">
            <LogoutRoundedIcon />
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
