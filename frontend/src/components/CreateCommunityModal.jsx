import { useMemo, useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Avatar from "./Avatar";
import ToolButton from "./ToolButton";

function CreateCommunityModal({ currentUser, onClose, onCreate, users }) {
  const selectableUsers = useMemo(
    () => users.filter((user) => user.id !== currentUser.id),
    [currentUser.id, users]
  );
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [selectedIds, setSelectedIds] = useState(selectableUsers.slice(0, 2).map((user) => user.id));
  const [type, setType] = useState("Public");

  function toggleMember(userId) {
    setSelectedIds((ids) =>
      ids.includes(userId) ? ids.filter((id) => id !== userId) : [...ids, userId]
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim()) return;

    onCreate({
      description: description.trim(),
      memberIds: selectedIds,
      name: name.trim(),
      type,
    });
    onClose();
  }

  return (
    <div className="modal-backdrop" role="presentation">
      <section className="community-modal" aria-label="Create community">
        <header className="modal-header">
          <div>
            <p className="eyebrow">Admin tools</p>
            <h2>Create community</h2>
          </div>
          <ToolButton className="compact" label="Close" onClick={onClose}>
            <CloseRoundedIcon />
          </ToolButton>
        </header>

        <form className="community-form" onSubmit={handleSubmit}>
          <label className="form-field" htmlFor="communityName">
            <span>Community name</span>
            <input
              id="communityName"
              onChange={(event) => setName(event.target.value)}
              placeholder="Example: CSE Batch 2026"
              required
              type="text"
              value={name}
            />
          </label>

          <label className="form-field" htmlFor="communityDescription">
            <span>Description</span>
            <textarea
              id="communityDescription"
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What is this community for?"
              rows="3"
              value={description}
            />
          </label>

          <div className="form-field">
            <span>Type</span>
            <div className="segmented-control">
              {["Public", "Private"].map((option) => (
                <button
                  className={type === option ? "active" : ""}
                  key={option}
                  onClick={() => setType(option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div className="form-field">
            <span>Members</span>
            <div className="member-picker">
              <div className="member-picker-row selected">
                <Avatar item={currentUser} />
                <span className="member-info">
                  <strong>{currentUser.name}</strong>
                  <span>Admin</span>
                </span>
                <span className="member-role">Creator</span>
              </div>

              {selectableUsers.map((user) => (
                <label className="member-picker-row" key={user.id}>
                  <input
                    checked={selectedIds.includes(user.id)}
                    onChange={() => toggleMember(user.id)}
                    type="checkbox"
                  />
                  <Avatar item={user} />
                  <span className="member-info">
                    <strong>{user.name}</strong>
                    <span>{user.status}</span>
                  </span>
                  <span className="member-role">Member</span>
                </label>
              ))}
            </div>
          </div>

          <button className="primary-action" type="submit">
            Create community
          </button>
        </form>
      </section>
    </div>
  );
}

export default CreateCommunityModal;
