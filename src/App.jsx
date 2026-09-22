import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App bg-background">
      <NavBar />
      <main className="page-width">

        <section id="hero" className="flex-col bottom-0 z-50 flex border-t border-black/10 p-20 text-primary-text gap-6">
          <h2 className="text-sm font-bold text-secondary-text">Présentation</h2>
          <p className="text-primary-text text-md leading-relaxed">
            Ceci est un exemple de contenu pour la section d'accueil.
          </p>
        </section>

        <div id="projets" className="mx-auto max-w-2xl space-y-6 p-8 text-lg leading-relaxed text-primary-text">
          {Array.from({ length: 12 }, (_, index) => (
            <p key={index}>
              Ceci est un texte générique de démonstration pour tester le défilement de la page.
              Faites défiler la page pour voir le contenu supplémentaire.
            </p>
          ))}
        </div>
        
      </main>
      <Footer />
    </div>
  )
}

export default App
