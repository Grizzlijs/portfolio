import { Helmet } from 'react-helmet-async'

const About = () => {
  return (
    <section id="about" className="py-10 md:py-20 bg-white">
      <Helmet>
        <title>About Emils Samoilovs | Front-End Architect</title>
        <meta name="description" content="With over 15 years of experience in front-end and full-stack development, Emils Samoilovs has deep technical expertise in JavaScript, HTML5, CSS3/SCSS, and more." />
      </Helmet>
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center">
          <span className="section-title">About Me</span>
        </h2>
        <div className="mx-auto">
          <p className="text-lg mb-6 text-slate-600 leading-relaxed">
            With over <span className="font-semibold text-primary-600">15 years</span> of dedicated experience in front-end and full-stack development (since 2008), I have cultivated a deep technical expertise that evolved from early passion into a professional career.
          </p>
          
          <p className="text-lg mb-6 text-slate-600 leading-relaxed">
            My foundation was built through consistent daily development, starting with foundational web technologies (<span className="font-semibold">HTML/HTML5, CSS/SCSS, JavaScript</span>) and expanding also into backend systems (<span className="font-semibold">PHP, MySQL, Lua</span>, etc.) and broader technical domains like game engine servers.
          </p>
          
          <p className="text-lg mb-6 text-slate-600 leading-relaxed">
            Since 2012, I have further honed my skills through freelance website development, tackling diverse projects and staying at the forefront of industry trends.
          </p>
          
          <p className="text-lg mb-8 text-slate-600 leading-relaxed">
            Currently serving as a <span className="font-semibold">Front-End Architect / Senior Developer</span> at The Customization Group (ex Picanova), I specialize in <span className="font-semibold">JavaScript, NodeJS, XHTML, SCSS, and Gulp</span>. I possess strong JavaScript fundamentals, with extensive experience in asynchronous programming paradigms, including a deep understanding of Promises and callback-oriented patterns. My current work frequently involves complex API integrations (JSON, REST), particularly in leveraging AI technologies.
          </p>
          
          <p className="text-lg text-slate-600 leading-relaxed">
            My broad experience across multiple frameworks enables me to quickly adapt, efficiently solve complex problems, and accelerate development timelines.
          </p>
        </div>
      </div>
    </section>
  )
}

export default About
