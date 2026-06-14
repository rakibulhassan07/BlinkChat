const themes = [
  { label: "Night", value: "midnight" },
  { label: "Mint", value: "aurora" },
  { label: "Solar", value: "ember" },
];

function ThemeSwitcher({ activeTheme, onThemeChange }) {
  return (
    <div aria-label="Theme" className="theme-switcher" role="group">
      {themes.map((theme) => (
        <button
          className={`theme-option ${activeTheme === theme.value ? "active" : ""}`}
          key={theme.value}
          onClick={() => onThemeChange(theme.value)}
          type="button"
        >
          {theme.label}
        </button>
      ))}
    </div>
  );
}

export default ThemeSwitcher;
