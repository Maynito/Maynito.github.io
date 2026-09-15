import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      <div className="mx-auto max-w-2xl space-y-6 p-8 text-lg leading-relaxed text-white">
        {Array.from({ length: 12 }, (_, index) => (
          <p key={index}>
            Ceci est un texte générique de démonstration pour tester le défilement de la page.
            Faites défiler la page pour voir le contenu supplémentaire.
          </p>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default App
