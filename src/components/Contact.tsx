import { FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaPhone } from 'react-icons/fa'
import { Helmet } from 'react-helmet-async'

const Contact = () => {  return (
    <div id="contact" className="h-full flex flex-col justify-center">
      <Helmet>
        <title>Contact Emils Samoilovs | Front-End Architect</title>
        <meta name="description" content="Get in touch with Emils Samoilovs, a Front-End Architect with expertise in JavaScript, HTML5, CSS3/SCSS and modern web technologies." />
      </Helmet>
      
      <h2 className="text-3xl font-bold mb-8 text-center md:text-left">
        <span className="section-title relative inline-block after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-sky-500 after:rounded">Get In Touch</span>
      </h2>
      
      <div className="space-y-6">
        <div className="flex items-start">
          <FaEnvelope className="text-primary-600 mt-1 mr-4 text-xl" />
          <div>
            <h3 className="font-medium text-slate-700">Email</h3>
            <p className="text-slate-600">info@emilssamoilovs.com</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <FaPhone className="text-primary-600 mt-1 mr-4 text-xl" />
          <div>
            <h3 className="font-medium text-slate-700">Phone</h3>
            <a 
              href="tel:+37126493029"
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              +371 26493029
            </a>
          </div>
        </div>
        
        <div className="flex items-start">
          <FaMapMarkerAlt className="text-primary-600 mt-1 mr-4 text-xl" />
          <div>
            <h3 className="font-medium text-slate-700">Location</h3>
            <p className="text-slate-600">Latvia</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <FaLinkedin className="text-primary-600 mt-1 mr-4 text-xl" />
          <div>
            <h3 className="font-medium text-slate-700">LinkedIn</h3>
            <a 
              href="https://www.linkedin.com/in/emilssamoilovs/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 hover:underline"
            >
              linkedin.com/in/emilssamoilovs
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
