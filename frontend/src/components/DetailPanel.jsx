import Avatar from "./Avatar";
import networkMap from "../assets/blinkchat-network.svg";

function DetailPanel({
  files,
  members,
  onAuthToggle,
  signedIn,
}) {
  return (
    <aside aria-label="Room details" className="detail-panel">
      <section className="profile-card auth-card">
        <div className="auth-visual">
          <span className="auth-dot dot-red" />
          <span className="auth-dot dot-yellow" />
          <span className="auth-dot dot-green" />
          <img alt="" src={networkMap} />
        </div>
        <h2>Firebase Auth Ready</h2>
        <p>Email login, profile status, and secure logout states are represented in this React flow.</p>
        <button className="primary-button" onClick={onAuthToggle} type="button">
          {signedIn ? "Secure logout" : "Sign in with email"}
        </button>
      </section>

      <section className="detail-section">
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
            </div>
          ))}
        </div>
      </section>

      <section className="detail-section">
        <div className="section-heading">
          <h2>Shared Files</h2>
          <span>{files.length}</span>
        </div>
        <div className="file-list">
          {files.map((file) => (
            <div className="file-item" key={file.id}>
              <span className="file-icon">{file.type}</span>
              <span className="file-info">
                <strong>{file.name}</strong>
                <span>{file.meta}</span>
              </span>
            </div>
          ))}
        </div>
      </section>
    </aside>
  );
}

export default DetailPanel;
