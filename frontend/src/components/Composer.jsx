import { useState } from "react";
import AttachFileRoundedIcon from "@mui/icons-material/AttachFileRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import TagFacesRoundedIcon from "@mui/icons-material/TagFacesRounded";
import ToolButton from "./ToolButton";

function Composer({ attachedFile, onAttach, onSend }) {
  const [draft, setDraft] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!draft.trim() && !attachedFile) return;

    onSend(draft);
    setDraft("");
  }

  return (
    <form className="composer" onSubmit={handleSubmit}>
      <ToolButton active={Boolean(attachedFile)} className="compact" label="Attach file" onClick={onAttach}>
        <AttachFileRoundedIcon />
      </ToolButton>
      <ToolButton className="compact" label="Add reaction">
        <TagFacesRoundedIcon />
      </ToolButton>
      <label className="composer-input" htmlFor="messageInput">
        <input
          autoComplete="off"
          id="messageInput"
          onChange={(event) => setDraft(event.target.value)}
          placeholder={attachedFile ? "File ready. Add a message..." : "Message BlinkChat..."}
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
