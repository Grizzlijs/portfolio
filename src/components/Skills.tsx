import { FaIndustry, FaTools, FaUsers } from 'react-icons/fa'
import { skills } from '../data'
import { Helmet } from 'react-helmet-async'

const Skills = () => {
  // Get the appropriate icon component based on icon name
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'industry':
        return <FaIndustry className="text-primary-600 mr-3" />
      case 'tools':
        return <FaTools className="text-primary-600 mr-3" />
      case 'users':
        return <FaUsers className="text-primary-600 mr-3" />
      default:
        return <FaTools className="text-primary-600 mr-3" />
    }
  }
  return (
    <section id="skills" className="py-10 md:py-20 bg-white">
      <Helmet>
        <title>Skills & Technologies | Emils Samoilovs</title>
        <meta name="description" content="Skills and technologies of Emils Samoilovs, including AI, e-commerce, web development, JavaScript, TypeScript, NodeJS and more." />
      </Helmet>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="section-title">Skills & Technologies</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skills.map((skill, index) => (
            <div key={index} className="bg-slate-50 p-6 rounded-lg shadow-sm card">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-slate-800">
                {getIcon(skill.icon)} {skill.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, itemIndex) => (
                  <span 
                    key={itemIndex} 
                    className="skill-pill px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
