import NavBar from './components/NavBar'
import Footer from './components/Footer'

function App() {
  return (
    <div className="App bg-background">
      <NavBar />
      <main className="page-width">
        <section id="hero" className="bottom-0 z-50 flex w-full items-center justify-between border-t border-black/10 p-20 text-primary-text">
          <h2 className="text-3xl font-bold text-center text-secondary-text">Bienvenue sur mon site</h2>
          <p className="text-center text-secondary-text mt-4">
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
