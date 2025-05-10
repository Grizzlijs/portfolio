import { FaLinkedin } from 'react-icons/fa'
import { Helmet } from 'react-helmet-async'

const Hero = () => {  return (
    <section className="py-10 md:py-20 bg-gradient-to-br from-primary-50 to-primary-100">
      <Helmet>
        <title>Emils Samoilovs | Front-End Architect</title>
        <link 
          rel="preload" 
          href="/profile.webp" 
          as="image" 
          type="image/webp"
          fetchPriority="high"
        />
      </Helmet>
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center pt-2 md:pt-0">
        <div className="md:w-2/3 mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-800">Emīls Samoilovs</h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 gradient-text">
            Front-End Architect | AI Technologies | E-Commerce
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            15+ years of experience in front-end and full-stack development, specializing in JavaScript, HTML5, CSS3/SCSS and modern web technologies with a focus on AI integration and e-commerce solutions.
          </p>
          <div className="flex space-x-4">
            <a
              href="#contact"
              className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium transition duration-300 shadow-md hover:shadow-lg"
            >
              Get In Touch
            </a>
            <a
              href="https://www.linkedin.com/in/emilssamoilovs/"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary-500 text-primary-500 hover:bg-primary-50 px-6 py-3 rounded-lg font-medium transition duration-300 flex items-center shadow-sm hover:shadow-md"
              aria-label="Visit LinkedIn profile"
            >
              <FaLinkedin className="mr-2" /> LinkedIn
            </a>
          </div>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <div className="relative h-auto w-[300px] h-[300px] bg-primary-200 rounded-full overflow-hidden border-8 border-white shadow-xl">
            <img 
              src="/profile.webp" 
              srcSet="/profile.webp 1x, /profile@2x.webp 2x, /profile@3x.webp 3x"
              alt="Emīls Samoilovs profile picture" 
              loading="eager"
              width="300"
              height="300"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
