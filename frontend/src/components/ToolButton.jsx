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
  const wrapperClassName = className.includes("rail-bottom") ? "rail-bottom" : undefined;
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
      <span className={wrapperClassName}>{button}</span>
    </Tooltip>
  );
}

export default ToolButton;
