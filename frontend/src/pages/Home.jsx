import { Helmet } from 'react-helmet-async'
import Navbar       from '../components/layout/Navbar'
import Footer       from '../components/layout/Footer'
import Hero         from '../components/sections/Hero'
import About        from '../components/sections/About'
import Skills       from '../components/sections/Skills'
import Projects     from '../components/sections/Projects'
import Services     from '../components/sections/Services'
import Experience   from '../components/sections/Experience'
import Testimonials from '../components/sections/Testimonials'
import Contact      from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>René Mejillón | Full Stack Developer</title>
        <meta
          name="description"
          content="Portafolio profesional de René Mejillón. Full Stack Developer especialista en Laravel, React y MySQL. Construye soluciones digitales modernas y escalables."
        />
      </Helmet>

      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
