import { Helmet } from 'react-helmet-async'
import Navbar       from '../components/layout/Navbar'
import Footer       from '../components/layout/Footer'
import Hero         from '../components/sections/Hero'
import About        from '../components/sections/About'
import Skills       from '../components/sections/Skills'
import Projects     from '../components/sections/Projects'
import Services     from '../components/sections/Services'
import Experience   from '../components/sections/Experience'
import { PortfolioProvider } from '../hooks/usePortfolio'
import Contact      from '../components/sections/Contact'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>René Mejillón | Desarrollador Full Stack</title>
        <meta
          name="description"
          content="Portafolio profesional de René Mejillón. Desarrollador full stack con PHP, Laravel, JavaScript, React y MySQL. Experiencia práctica desde 2023 y trayectoria TI desde 2008."
        />
      </Helmet>

      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] btn-primary">Saltar al contenido</a><Navbar />

      <PortfolioProvider><main id="contenido">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Services />
        <Experience />

        <Contact />
      </main></PortfolioProvider>

      <Footer />
    </>
  )
}
