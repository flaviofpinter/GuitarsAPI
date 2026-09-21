import { useEffect, useState } from 'react'
import Catalog from './pages/Catalog'
import GuitarDetails from './pages/GuitarDetails'
import Favorites from './pages/Favorites'
import './App.css'

function App() {
  const [screen, setScreen] = useState('catalog')
  const [selectedGuitar, setSelectedGuitar] = useState(null)

  // Estado dos favoritos
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

  // Recebe a guitarra completa do Catálogo ou dos Favoritos
  function openDetails(guitar) {
    setSelectedGuitar(guitar)
    setScreen('details')
  }

  return (
      <>
        {screen === 'catalog' && (
            <Catalog
                onDetails={openDetails}
                onFavorites={() => setScreen('favorites')}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
            />
        )}

        {screen === 'details' && (
            <GuitarDetails
                guitar={selectedGuitar}
                onBack={() => setScreen('catalog')}
                favorites={favorites}
                onToggleFavorite={toggleFavorite}
            />
        )}

        {screen === 'favorites' && (
            <Favorites
                favorites={favorites}
                onDetails={openDetails}
                onBack={() => setScreen('catalog')}
                onToggleFavorite={toggleFavorite}
            />
        )}
      </>
  )
}

export default App