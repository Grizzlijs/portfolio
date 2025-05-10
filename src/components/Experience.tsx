import { FaBriefcase, FaLaptopCode, FaCode } from 'react-icons/fa'
import { experiences } from '../data'
import { Helmet } from 'react-helmet-async'

const Experience = () => {
  // Calculate duration between two dates
  const calculateDuration = (startDate: string, endDate: string): string => {
    const start = new Date(startDate)
    const end = endDate === 'present' ? new Date() : new Date(endDate)
    
    const years = end.getFullYear() - start.getFullYear()
    const months = end.getMonth() - start.getMonth()
    
    let totalMonths = years * 12 + months
    if (end.getDate() < start.getDate()) {
      totalMonths--
    }
    
    const yearsDisplay = Math.floor(totalMonths / 12)
    const monthsDisplay = totalMonths % 12
    
    let duration = ''
    if (yearsDisplay > 0) {
      duration += `${yearsDisplay} ${yearsDisplay === 1 ? 'year' : 'years'}`
    }
    if (monthsDisplay > 0) {
      if (duration) duration += ' '
      duration += `${monthsDisplay} ${monthsDisplay === 1 ? 'month' : 'months'}`
    }
    
    return duration
  }

  // Icons map
  const getIcon = (index: number) => {
    const icons = [
      <FaBriefcase key="briefcase" className="text-white text-sm" />,
      <FaLaptopCode key="laptop" className="text-white text-sm" />,
      <FaCode key="code" className="text-white text-sm" />
    ]
    return icons[index % icons.length]
  }  
  return (
    <section id="experience" className="py-10 md:py-20 bg-slate-50">
      <Helmet>
        <title>Professional Experience | Emils Samoilovs</title>
        <meta name="description" content="Professional experience of Emils Samoilovs, including roles at The Customization Group and freelance web development since 2012." />
      </Helmet>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="section-title">Professional Experience</span>
        </h2>
        
        <div className="mx-auto">
          {experiences.map((experience, index) => (
            <div key={experience.company} className={`${index !== experiences.length - 1 ? 'mb-12' : ''} timeline-item relative pl-12`}>
              <div className="absolute left-0 top-0 w-8 h-8 rounded-full bg-primary-600 border-4 border-white flex items-center justify-center">
                {getIcon(index)}
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm card">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <h3 className="text-xl font-bold text-slate-800">{experience.company}</h3>
                  <span className="text-primary-600 font-medium">
                    {calculateDuration(experience.duration.split(' to ')[0], experience.duration.split(' to ')[1])}
                  </span>
                </div>
                
                {experience.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className="mb-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                      <h4 className="font-semibold text-slate-700">{role.title}</h4>
                      <span className="text-slate-500 text-sm">
                        {role.period} · <span>{calculateDuration(role.duration.split(' to ')[0], role.duration.split(' to ')[1])}</span>
                      </span>
                    </div>
                    {role.location && <div className="text-slate-500 text-sm">{role.location}</div>}
                  </div>
                ))}
                
                {experience.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {experience.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
