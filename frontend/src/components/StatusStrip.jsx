import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";

function StatusStrip({ pinned, signedIn }) {
  return (
    <section aria-label="Room status" className="status-strip">
      <div className="status-item">
        <span className="signal live" />
        <span>{signedIn ? "WebSocket connected as Rakibul" : "WebSocket connected"}</span>
      </div>
      <div className="status-item">
        <SecurityRoundedIcon />
        <span>Firebase auth active</span>
      </div>
      <div className="status-item">
        <PushPinRoundedIcon />
        <span>{pinned ? "Pinned message loaded" : "No pinned message"}</span>
      </div>
    </section>
  );
}

export default StatusStrip;
