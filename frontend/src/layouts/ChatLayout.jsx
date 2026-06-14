import { useEffect, useState } from "react";
import ChatHeader from "../components/ChatHeader";
import Composer from "../components/Composer";
import CreateCommunityModal from "../components/CreateCommunityModal";
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
  const [creatingCommunity, setCreatingCommunity] = useState(false);

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
        onGoogleSignIn={auth.actions.signInGoogle}
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
        onGoogleSignIn={auth.actions.signInGoogle}
        onSignIn={auth.actions.signIn}
        onThemeChange={chat.actions.setTheme}
        theme={chat.theme}
      />
    );
  }

  return (
    <div className="app-shell">
      <RailNav
        canManageMembers={chat.canManageMembers}
        currentUserId={chat.currentUser.id}
        members={chat.activeRoom.members}
        onLogout={auth.actions.signOut}
        onRemoveMember={chat.actions.removeCommunityMember}
        roomId={chat.activeRoom.id}
        user={auth.user}
      />
      <WorkspaceSidebar
        activeRoomId={chat.activeRoomId}
        communities={chat.visibleCommunities}
        directs={chat.visibleDirects}
        onCreateCommunity={() => setCreatingCommunity(true)}
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
          onSend={chat.actions.addMessage}
        />
      </main>
      {creatingCommunity && (
        <CreateCommunityModal
          currentUser={chat.currentUser}
          onClose={() => setCreatingCommunity(false)}
          onCreate={chat.actions.createCommunity}
          users={chat.availableUsers}
        />
      )}
    </div>
  );
}

export default ChatLayout;
