import { useState } from "react";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import TagFacesRoundedIcon from "@mui/icons-material/TagFacesRounded";
import ToolButton from "./ToolButton";

function Composer({ onSend }) {
  const [draft, setDraft] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!draft.trim()) return;

    onSend(draft);
    setDraft("");
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <ToolButton className="compact" label="Add reaction">
        <TagFacesRoundedIcon />
      </ToolButton>
      <label className="composer-input" htmlFor="messageInput">
        <input
          autoComplete="off"
          id="messageInput"
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Message BlinkChat..."
          type="text"
          value={draft}
        />
      </label>
      <ToolButton className="send-button" label="Send message" type="submit">
        <SendRoundedIcon />
      </ToolButton>
    </form>
  );
}

export default Composer;
