import { useState } from 'react'
import { FaBars } from 'react-icons/fa'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navLinks = [
    { href: '#about', text: 'About' },
    { href: '#experience', text: 'Experience' },
    { href: '#skills', text: 'Skills' },
    { href: '#expertise', text: 'Expertise' },
    { href: '#showcase', text: 'Showcase' },
    { href: '#contact', text: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-3 md:py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <img 
            src="/profile.webp" 
            srcSet="/profile.webp 1x, /profile@2x.webp 2x"
            alt="Profile" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" 
            width="40"
            height="40"
          />
          <span className="text-xl font-semibold text-slate-800">Emīls Samoilovs</span>
        </div>
          {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-slate-600 hover:text-slate-900"
            >
              {link.text}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-slate-600 hover:text-slate-900"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <FaBars className="text-2xl" />
        </button>        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="absolute top-full left-0 right-0 bg-white shadow-md md:hidden">
            <div className="container mx-auto px-6 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block py-2 text-slate-600 hover:text-slate-900"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
