export default function Navbar() {
  return (
    <nav className="bg-[#FDFBF7] flex justify-between items-center px-10 py-4 shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="relative w-8 h-8">
          <span className="absolute -top-1 left-0 text-black font-bold text-2xl leading-none">H</span>
          <span className="absolute top-1 left-2 text-[#7D4F2C] font-bold text-2xl leading-none">H</span>
        </div>
        <h1 className="text-xl font-semibold text-[#2C2C2C]">Handmade Haven</h1>
      </div>

      {/* Links */}
      <ul className="flex space-x-8 text-[#2C2C2C]">
        {["Shop", "Collections", "Artisan Story", "Blog", "Contact"].map((item) => (
          <li key={item} className="hover:text-[#7D4F2C] cursor-pointer font-medium">
            {item}
          </li>
        ))}
      </ul>
    </nav>
  );
}