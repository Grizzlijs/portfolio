import { Experience, Skill, TechStack } from '../types'

export const experiences: Experience[] = [
  {
    company: 'The Customization Group',
    duration: '2016-05-01 to present',
    roles: [
      {
        title: 'Front End Architect',
        period: 'Feb 2025 to Present',
        location: 'Riga, Latvia · Hybrid',
        duration: '2025-02-01 to present'
      },
      {
        title: 'Senior Frontend Developer',
        period: 'Jan 2021 to Feb 2025',
        location: 'Riga, Latvia',
        duration: '2021-01-01 to 2025-02-01'
      },
      {
        title: 'Front End Developer',
        period: 'May 2016 to Jan 2021',
        location: 'Riga, Latvia',
        duration: '2016-05-01 to 2021-01-01'
      }
    ],
    skills: ['TypeScript', 'Web Application Development', '+17 skills']
  },
  {
    company: 'Freelance Web Developer',
    duration: '2012-05-01 to present',
    roles: [
      {
        title: 'Self-employed',
        period: 'May 2012 to Present',
        location: 'Latvia',
        duration: '2012-05-01 to present'
      }
    ],
    skills: []
  },
  {
    company: 'Junior Web Developer',
    duration: '2008-08-01 to 2012-08-01',
    roles: [
      {
        title: 'Self-employed',
        period: 'Aug 2008 to Aug 2012',
        location: '',
        duration: '2008-08-01 to 2012-08-01'
      }
    ],
    skills: []
  }
]

export const skills: Skill[] = [
  {
    category: 'Industry Knowledge',
    icon: 'industry',
    items: [
      'Artificial Intelligence (AI)',
      'E-commerce',
      'Page Speed and Performance Optimization',
      'Cross-browser Compatibility',
      'Web Development',
      'IT Management',
      'Project Management',
      'Web Analytics',
      'Content Management',
      'Responsive Web Design',
      'Search Engine Optimization'
    ]
  },
  {
    category: 'Tools & Technologies',
    icon: 'tools',
    items: [
      'NodeJS',
      'JavaScript',
      'TypeScript',
      'REST APIs',
      'JSON',
      'React Native',
      'PHP',
      'MySQL',
      'HTML5',
      'CSS/SCSS',
      'XHTML',
      'GitHub',
      'jQuery',
      'AWS',
      'JIRA',
      'Lua'
    ]
  },
  {
    category: 'Interpersonal Skills',
    icon: 'users',
    items: [
      'Attention to Detail',
      'Ownership',
      'Critical Thinking',
      'Work under pressure',
      'Debugging Code',
      'Skilled Multi-tasker',
      'Flexibility',
      'Design Patterns',
      'Graphic Design Principles'
    ]
  }
]

export const techExpertise = [
  {
    title: 'HTML5, CSS3/SCSS & JavaScript',
    icon: 'js',
    iconColor: 'text-yellow-500',
    items: [
      'Very strong JavaScript, HTML5, CSS3/SCSS',
      'TypeScript fundamentals',
      'Modular and reusable interfaces',
      'Asynchronous programming',
      'Promises and async/await'
    ]
  },
  {
    title: 'React & Mobile First',
    icon: 'react',
    iconColor: 'text-blue-400',
    items: [
      'React fundamentals',
      'Event-driven programming',
      'Mobile App fundamentals',
      'Cross-platform development',
      'Enthusiastic about exploring new mobile technologies'
    ]
  }
]

export const techStack: TechStack[] = [
  { name: 'JavaScript', icon: 'js', color: 'yellow-500' },
  { name: 'React', icon: 'react', color: 'blue-400' },
  { name: 'CSS3/SCSS', icon: 'css3-alt', color: 'blue-500' },
  { name: 'HTML5', icon: 'html5', color: 'orange-500' },
  { name: 'TypeScript', icon: 'code', color: 'blue-600' },
  { name: 'Node.js', icon: 'node-js', color: 'green-600' },
  { name: 'PHP', icon: 'php', color: 'purple-500' },
  { name: 'MySQL', icon: 'database', color: 'blue-700' }
]
