import { useState } from "react";
import AlternateEmailRoundedIcon from "@mui/icons-material/AlternateEmailRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import SecurityRoundedIcon from "@mui/icons-material/SecurityRounded";
import ThemeSwitcher from "./ThemeSwitcher";

function LoginScreen({
  authError,
  loading,
  mode = "auth",
  onClearError,
  onCreateAccount,
  onSignIn,
  onThemeChange,
  theme,
}) {
  const [authMode, setAuthMode] = useState("login");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isCreateMode = authMode === "create";
  const isLoading = loading || mode === "loading";

  function toggleAuthMode() {
    onClearError?.();
    setAuthMode(isCreateMode ? "login" : "create");
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {
      displayName: displayName.trim(),
      email: email.trim(),
      password,
    };

    if (isCreateMode) {
      onCreateAccount(payload);
      return;
    }

    onSignIn(payload);
  }

  return (
    <main className="login-screen" aria-label="BlinkChat login">
      <section className="login-hero-panel" aria-label="Welcome">
        <div className="login-hero-brand">
          <span className="brand-mark login-mark">
            <span className="brand-pulse" />
            <span>B</span>
          </span>
          <strong>BlinkChat</strong>
        </div>

        <div className="login-hero-copy">
          <h1>
            Welcome to
            <span>BlinkChat</span>
          </h1>
          <p>Join communities, chat in real-time, and stay connected with your people.</p>
        </div>

        <div className="login-illustration" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="hero-bubble hero-bubble-large">
            <span />
            <span />
            <span />
          </div>
          <div className="hero-bubble hero-bubble-small">
            <span />
            <span />
          </div>
          <div className="hero-profile profile-left" />
          <div className="hero-profile profile-right" />
          <div className="hero-window">
            <div className="window-top">
              <span />
              <span />
              <span />
            </div>
            <div className="window-row">
              <i />
              <span />
            </div>
            <div className="window-row">
              <i />
              <span />
            </div>
            <div className="window-row">
              <i />
              <span />
            </div>
          </div>
          <div className="hero-chat-pill pill-one" />
          <div className="hero-chat-pill pill-two" />
          <span className="spark spark-one" />
          <span className="spark spark-two" />
          <span className="spark spark-three" />
        </div>
      </section>

      <section className="login-auth-panel" aria-label="Sign in">
        <div className="login-theme-row">
          <ThemeSwitcher activeTheme={theme} onThemeChange={onThemeChange} />
        </div>

        <div className="login-card">
          <div className="login-card-mark">
            <span />
            <span />
            <span />
          </div>
          <div className="login-copy">
            <h2>{isCreateMode ? "Create your account" : "Login to your account"}</h2>
            <p>{isCreateMode ? "Create a BlinkChat account with email" : "Login with your email to continue"}</p>
          </div>

          <form className="email-auth-form" onSubmit={handleSubmit}>
            {isCreateMode && (
              <label className="auth-input" htmlFor="displayName">
                <PersonRoundedIcon />
                <input
                  autoComplete="name"
                  id="displayName"
                  onChange={(event) => setDisplayName(event.target.value)}
                  placeholder="Display name"
                  type="text"
                  value={displayName}
                />
              </label>
            )}

            <label className="auth-input" htmlFor="email">
              <AlternateEmailRoundedIcon />
              <input
                autoComplete="email"
                id="email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Email address"
                required
                type="email"
                value={email}
              />
            </label>

            <label className="auth-input" htmlFor="password">
              <LockRoundedIcon />
              <input
                autoComplete={isCreateMode ? "new-password" : "current-password"}
                id="password"
                minLength={6}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Password"
                required
                type="password"
                value={password}
              />
            </label>

            {authError && <p className="auth-error">{authError}</p>}

            <button className="email-login-button" disabled={isLoading} type="submit">
              <AlternateEmailRoundedIcon />
              {isLoading ? "Checking account..." : isCreateMode ? "Create account" : "Continue with email"}
            </button>
          </form>

          <div className="login-secure-line">
            <SecurityRoundedIcon />
            <span>Secure login powered by Firebase Auth</span>
          </div>
        </div>

        <p className="login-account-line">
          {isCreateMode ? "Already have a BlinkChat account?" : "New to BlinkChat?"}
          <button onClick={toggleAuthMode} type="button">
            {isCreateMode ? "Login" : "Create an account"}
          </button>
        </p>

        <footer className="login-footer">
          <span>Terms of Service</span>
          <span>Privacy Policy</span>
          <span>Help</span>
        </footer>
      </section>
    </main>
  );
}

export default LoginScreen;
