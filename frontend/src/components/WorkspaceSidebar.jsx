import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import RoomButton from "./RoomButton";
import ToolButton from "./ToolButton";

function WorkspaceSidebar({
  activeRoomId,
  communities,
  directs,
  onCreateCommunity,
  onSearch,
  onSelectRoom,
  search,
}) {
  return (
    <aside aria-label="BlinkChat workspace" className="workspace-panel">
      <header className="workspace-header">
        <div>
          <p className="eyebrow">Workspace</p>
          <h1>BlinkChat</h1>
        </div>
        <ToolButton className="compact" label="New community" onClick={onCreateCommunity}>
          <AddRoundedIcon />
        </ToolButton>
      </header>

      <label className="search-box" htmlFor="roomSearch">
        <SearchRoundedIcon />
        <input
          autoComplete="off"
          id="roomSearch"
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search rooms or messages"
          type="search"
          value={search}
        />
      </label>

      <section aria-labelledby="communityTitle" className="workspace-section">
        <div className="section-heading">
          <h2 id="communityTitle">Communities</h2>
          <span>{communities.length}</span>
        </div>
        <div className="room-list">
          {communities.map((room) => (
            <RoomButton
              active={room.id === activeRoomId}
              key={room.id}
              onSelect={onSelectRoom}
              room={room}
            />
          ))}
        </div>
      </section>

      <section aria-labelledby="directTitle" className="workspace-section">
        <div className="section-heading">
          <h2 id="directTitle">Direct Messages</h2>
          <span>{directs.length}</span>
        </div>
        <div className="room-list">
          {directs.map((room) => (
            <RoomButton
              active={room.id === activeRoomId}
              key={room.id}
              onSelect={onSelectRoom}
              room={room}
            />
          ))}
        </div>
      </section>
    </aside>
  );
}

export default WorkspaceSidebar;
