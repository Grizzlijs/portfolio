import { FaJs, FaReact, FaCheck, FaCss3Alt, FaHtml5, FaNodeJs, FaPhp, FaDatabase, FaCode } from 'react-icons/fa'
import { techExpertise, techStack } from '../data'
import { Helmet } from 'react-helmet-async'

const Expertise = () => {  // Get the appropriate icon component based on icon name
  const getExpertiseIcon = (iconName: string, className: string) => {
    switch (iconName) {
      case 'js':
        return <FaJs className={className} />
      case 'react':
        return <FaReact className={className} />
      default:
        return <FaCode className={className} />
    }
  }
  // Get tech stack icon component
  const getTechStackIcon = (iconName: string, color: string) => {
    // Map for color classes
    const colorClasses: Record<string, string> = {
      'yellow-500': 'text-yellow-500',
      'blue-400': 'text-blue-400',
      'blue-500': 'text-blue-500',
      'orange-500': 'text-orange-500',
      'blue-600': 'text-blue-600',
      'green-600': 'text-green-600',
      'purple-500': 'text-purple-500',
      'blue-700': 'text-blue-700'
    };
    
    const colorClass = colorClasses[color] || 'text-gray-500';
    
    switch (iconName) {
      case 'js':
        return <FaJs className={`text-5xl ${colorClass} mb-2`} />
      case 'react':
        return <FaReact className={`text-5xl ${colorClass} mb-2`} />
      case 'css3-alt':
        return <FaCss3Alt className={`text-5xl ${colorClass} mb-2`} />
      case 'html5':
        return <FaHtml5 className={`text-5xl ${colorClass} mb-2`} />
      case 'code':
        return <FaCode className={`text-5xl ${colorClass} mb-2`} />
      case 'node-js':
        return <FaNodeJs className={`text-5xl ${colorClass} mb-2`} />
      case 'php':
        return <FaPhp className={`text-5xl ${colorClass} mb-2`} />
      case 'database':
        return <FaDatabase className={`text-5xl ${colorClass} mb-2`} />
      default:
        return <FaCode className={`text-5xl ${colorClass} mb-2`} />
    }
  }
  return (
    <section id="expertise" className="py-10 md:py-20 bg-slate-50">
      <Helmet>
        <title>Technical Expertise | Emils Samoilovs</title>
        <meta name="description" content="Technical expertise of Emils Samoilovs in JavaScript, HTML5, CSS3/SCSS, React, and mobile development." />
      </Helmet>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="section-title">Technical Expertise</span>
        </h2>
        
        <div className="mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {techExpertise.map((expertise, index) => (
              <div key={index} className="bg-white p-8 rounded-lg shadow-sm card">
                <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800">
                  {getExpertiseIcon(expertise.icon, `${expertise.iconColor} mr-3`)} {expertise.title}
                </h3>
                <ul className="space-y-3">
                  {expertise.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start">
                      <FaCheck className="text-green-500 mt-1 mr-3" />
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          {/* Tech Stack */}
          <div className="mt-16">
            <h3 className="text-2xl font-semibold mb-8 text-center text-slate-800">
              <span className="section-title">My Tech Stack</span>
            </h3>
            <div className="flex flex-wrap justify-center gap-8">
              {techStack.map((tech, index) => (
                <div key={index} className="tech-stack-icon flex flex-col items-center">
                  {getTechStackIcon(tech.icon, tech.color)}
                  <span className="text-sm font-medium text-slate-600">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Expertise
