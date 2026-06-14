import { useEffect } from "react";
import ChatHeader from "../components/ChatHeader";
import Composer from "../components/Composer";
import DetailPanel from "../components/DetailPanel";
import LoginScreen from "../components/LoginScreen";
import MessageList from "../components/MessageList";
import RailNav from "../components/RailNav";
import StatusStrip from "../components/StatusStrip";
import WorkspaceSidebar from "../components/WorkspaceSidebar";
import { useBlinkChat } from "../hooks/useBlinkChat";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";

function ChatLayout() {
  const chat = useBlinkChat();
  const auth = useFirebaseAuth();

  useEffect(() => {
    document.body.dataset.theme = chat.theme;
  }, [chat.theme]);

  if (!auth.initialized) {
    return (
      <LoginScreen
        authError=""
        loading
        mode="loading"
        onClearError={auth.actions.clearError}
        onCreateAccount={auth.actions.createAccount}
        onSignIn={auth.actions.signIn}
        onThemeChange={chat.actions.setTheme}
        theme={chat.theme}
      />
    );
  }

  if (!auth.signedIn) {
    return (
      <LoginScreen
        authError={auth.error}
        loading={auth.loading}
        onClearError={auth.actions.clearError}
        onCreateAccount={auth.actions.createAccount}
        onSignIn={auth.actions.signIn}
        onThemeChange={chat.actions.setTheme}
        theme={chat.theme}
      />
    );
  }

  return (
    <div className="app-shell">
      <RailNav />
      <WorkspaceSidebar
        activeRoomId={chat.activeRoomId}
        communities={chat.visibleCommunities}
        directs={chat.visibleDirects}
        onSearch={chat.actions.setSearch}
        onSelectRoom={chat.actions.selectRoom}
        search={chat.search}
      />
      <main className="chat-panel" id="app">
        <ChatHeader
          onThemeChange={chat.actions.setTheme}
          room={chat.activeRoom}
          theme={chat.theme}
        />
        <StatusStrip pinned={chat.activeRoom.pinned} signedIn={auth.signedIn} />
        <MessageList
          messages={chat.visibleMessages}
          onReaction={chat.actions.toggleReaction}
          pinned={chat.activeRoom.pinned}
          typingMember={chat.typingMember}
        />
        <Composer
          attachedFile={chat.attachedFile}
          onAttach={chat.actions.attachMockFile}
          onSend={chat.actions.addMessage}
        />
      </main>
      <DetailPanel
        files={chat.activeRoom.files}
        members={chat.activeRoom.members}
        onAuthToggle={auth.actions.signOut}
        signedIn={auth.signedIn}
      />
    </div>
  );
}

export default ChatLayout;
