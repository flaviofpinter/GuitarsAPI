import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import GuitarDetails from './pages/GuitarDetails'
import Favorites from './pages/Favorites'
import './App.css'

function App() {
  const [screen, setScreen] = useState('home')
  const [selectedGuitar, setSelectedGuitar] = useState(null)

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('guitarFavorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('guitarFavorites', JSON.stringify(favorites))
  }, [favorites])

  function toggleFavorite(id) {
    setFavorites((current) => {
      if (current.includes(id)) {
        return current.filter((favoriteId) => favoriteId !== id)
      }
      return [...current, id]
    })
  }

  function openDetails(guitar) {
    setSelectedGuitar(guitar)
    setScreen('details')
  }

  return (
      <>
        {screen === 'home' && (
            <Home
                onNavigateToCatalog={(category) => {
                  console.log('Navegar para catálogo, categoria:', category)
                  setScreen('catalog')
                }}
                onNavigateToCart={() => setScreen('cart')}
                onNavigateToProfile={() => setScreen('profile')}
            />
        )}

        {/* RENDERIZANDO O CATÁLOGO */}
        {screen === 'catalog' && (
            <Catalog
                onNavigateToHome={() => {
                  setScreen('home')
                }}
                onDetails={openDetails}
                onFavorites={() => setScreen('favorites')}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
            />
        )}

        {screen === 'details' && (
            <GuitarDetails
                onNavigateToCatalog={(category) => {
                  console.log('Navegar para catálogo, categoria:', category)
                  setScreen('catalog')
                }}
                onNavigateToHome={() => {
                  setScreen('home')
                }}
                guitar={selectedGuitar}
                onBack={() => setScreen('catalog')} // Voltar para o catálogo
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
            />
        )}

        {screen === 'favorites' && (
            <Favorites
                favorites={favorites}
                onDetails={openDetails}
                onBack={() => setScreen('home')}
                onToggleFavorite={toggleFavorite}
            />
        )}
      </>
  )
}

export default App