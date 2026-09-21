export default

function NavBar() {
  return (
    <header className="fixed  top-0 z-50 flex w-full items-center justify-between border-b border-slate-700/60 bg-slate-950/10 p-4 text-slate-100 backdrop-blur-md">
      <nav className="flex items-center space-x-4 text-lg font-semibold">
        <a href="#home" className="text-lg font-semibold hover:text-main-text">Lucas Autret</a>
      </nav>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#home" className="hover:text-main-text">Home</a></li>
          <li><a href="#about" className="hover:text-main-text">About</a></li>
          <li><a href="#contact" className="hover:text-main-text">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}