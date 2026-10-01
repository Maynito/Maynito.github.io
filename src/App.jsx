import { HashRouter, Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Kamas from './pages/Kamas'
import FedIA from './pages/FedIA'
import NotFound from './pages/NotFound'
import PageTransition from './components/PageTransition'

function App() {
  return (
    <HashRouter>
      <div className="App bg-bg min-h-screen flex flex-col">
        <NavBar />
        <main className="page-width flex-1">
          <PageTransition>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/kamas" element={<Kamas />} />
              <Route path="/fedia" element={<FedIA />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}

export default App
