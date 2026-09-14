export default function SceneWrapper({ children, className = "", scrollable = false }) {
  if (scrollable) {
    return (
      <div
        className={`w-full min-h-dvh relative ${className}`}
        style={{ minHeight: "100dvh" }}
      >
        <div className="w-full min-h-dvh flex flex-col items-center">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`w-full min-h-dvh flex flex-col items-center justify-center px-6 py-10 relative overflow-hidden ${className}`}
      style={{ minHeight: "100dvh" }}
    >
      {children}
    </div>
  );
}
