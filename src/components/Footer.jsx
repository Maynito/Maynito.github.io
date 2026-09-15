export default

function Footer() {
    const year = new Date().getFullYear();
  return (
    <footer
      className="bottom-0 z-50 flex w-full items-center justify-between border-t border-black/10 p-20 text-slate-100"
      style={{
        backgroundColor: "#150f28",
        backgroundImage:
          'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'180\' height=\'180\' viewBox=\'0 0 180 180\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'1.8\' numOctaves=\'5\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'.55\'/%3E%3C/svg%3E"), radial-gradient(circle at top left, #17153a 0%, #17153a 20%, transparent 55%), radial-gradient(circle at top right, #312e81 0%, #312e81 20%, transparent 55%), radial-gradient(circle at bottom left, #ec4899 0%, #ec4899 20%, transparent 55%), radial-gradient(circle at bottom right, #f97316 0%, #f97316 20%, transparent 55%)',
        backgroundBlendMode: "hard-light, screen, screen, screen, screen",
      }}
    >
      <p>&copy; {year} Lucas Autret</p>
    </footer>
  );
}