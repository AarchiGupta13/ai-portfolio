import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">
          Aarchi<span className="text-blue-500">.AI</span>
        </h1>

        <div className="hidden md:flex space-x-8 text-gray-300">
          <a href="#about" className="hover:text-blue-500 transition">About</a>
          <a href="#projects" className="hover:text-blue-500 transition">Projects</a>
          <a href="#contact" className="hover:text-blue-500 transition">Contact</a>
        </div>

        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-800 px-6 py-4 space-y-4">
          <a href="#about" className="block text-gray-300 hover:text-blue-500">About</a>
          <a href="#projects" className="block text-gray-300 hover:text-blue-500">Projects</a>
          <a href="#contact" className="block text-gray-300 hover:text-blue-500">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;