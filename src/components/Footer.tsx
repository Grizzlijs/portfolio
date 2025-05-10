import { FaLinkedin, FaGithub } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
    return (
    <footer className="bg-slate-900 text-white py-8 md:py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-3">
              <img 
                src="/profile.webp" 
                srcSet="/profile.webp 1x, /profile@2x.webp 2x"
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow" 
                width="40"
                height="40"
              />
              <span className="text-xl font-semibold">Emils Samoilovs</span>
            </div>
            <p className="mt-2 text-slate-400">Front-End Architect | AI Technologies | E-Commerce</p>
          </div>
          <div className="flex space-x-6">
            <a 
              href="https://www.linkedin.com/in/emilssamoilovs/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-slate-400 hover:text-white transition"
              aria-label="LinkedIn Profile"
            >
              <FaLinkedin className="text-2xl" />
            </a>
            <a 
              href="#" 
              className="text-slate-400 hover:text-white transition"
              aria-label="GitHub Profile"
            >
              <FaGithub className="text-2xl" />
            </a>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
          <p>&copy; {currentYear} Emils Samoilovs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
