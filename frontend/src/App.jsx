import { Helmet } from 'react-helmet-async'
import Home from './pages/Home'
export default function App() {
  if (window.location.pathname !== '/') return <main className="section-container py-24">
    <Helmet><title>Página no encontrada | René Mejillón</title><meta name="robots" content="noindex" /></Helmet>
    <h1 className="text-3xl font-bold mb-5">Página no encontrada</h1>
    <a href="/" className="btn-primary">Volver al portafolio</a>
  </main>
  return <Home />
}
