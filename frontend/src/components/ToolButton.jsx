import Tooltip from "@mui/material/Tooltip";

function ToolButton({
  active = false,
  ariaPressed,
  children,
  className = "",
  label,
  type = "button",
  ...props
}) {
  const button = (
    <button
      aria-label={label}
      aria-pressed={ariaPressed}
      className={`icon-button ${active ? "active" : ""} ${className}`.trim()}
      title={label}
      type={type}
      {...props}
    >
      {children}
    </button>
  );

  return (
    <Tooltip arrow title={label}>
      <span>{button}</span>
    </Tooltip>
  );
}

export default ToolButton;
