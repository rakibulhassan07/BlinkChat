import PushPinRoundedIcon from "@mui/icons-material/PushPinRounded";
import Avatar from "./Avatar";

function MessageList({ messages, onReaction, pinned, typingMember }) {
  return (
    <section aria-label="Messages" className="message-area">
      {pinned && (
        <div className="pinned-message visible">
          <PushPinRoundedIcon />
          <span>{pinned}</span>
        </div>
      )}

      <div className="message-list">
        {messages.length === 0 ? (
          <div className="empty-state">
            <div>
              <strong>No matching messages</strong>
              <p>Try a different search term or switch rooms.</p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <article className={`message ${message.own ? "own" : ""}`} key={message.id}>
              <Avatar item={message} />
              <div className="message-body">
                <div className="message-head">
                  <strong>{message.author}</strong>
                  <span>{message.role}</span>
                  <time>{message.time}</time>
                </div>
                <div className="bubble">{message.text}</div>
                {message.reactions?.length > 0 && (
                  <div className="reactions">
                    {message.reactions.map((reaction, index) => (
                      <button
                        className={`reaction-button ${reaction.active ? "active" : ""}`}
                        key={`${message.id}-${reaction.label}`}
                        onClick={() => onReaction({ messageId: message.id, reactionIndex: index })}
                        type="button"
                      >
                        {reaction.label} {reaction.count}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))
        )}
      </div>

      <div className="typing-line">
        {typingMember && (
          <>
            <span>{typingMember.name.split(" ")[0]}</span> is typing...
          </>
        )}
      </div>
    </section>
  );
}

export default MessageList;
