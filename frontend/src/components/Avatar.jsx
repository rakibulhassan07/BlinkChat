function Avatar({ item, large = false }) {
  return (
    <div
      aria-hidden="true"
      className={`avatar ${large ? "avatar-large" : ""} status-${item.status ?? "online"}`}
      style={{
        "--avatar-a": item.colors?.[0] ?? "#31d0aa",
        "--avatar-b": item.colors?.[1] ?? "#e9ba4f",
      }}
    >
      {item.initials ?? item.short ?? "BC"}
    </div>
  );
}

export default Avatar;
