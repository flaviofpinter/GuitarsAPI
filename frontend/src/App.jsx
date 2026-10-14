import { useEffect, useState } from 'react'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import GuitarDetails from './pages/GuitarDetails'
import Favorites from './pages/Favorites'
import Cart from './pages/Cart'
import './App.css'

function App() {
  const [screen, setScreen] = useState('home')
  const [selectedGuitar, setSelectedGuitar] = useState(null)
  const [cartItems, setCartItems] = useState([])

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem('guitarFavorites')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => { localStorage.setItem('guitarFavorites', JSON.stringify(favorites)) }, [favorites])

  function toggleFavorite(id) {
    setFavorites((current) => current.includes(id) ? current.filter((favoriteId) => favoriteId !== id) : [...current, id])
  }

  function openDetails(guitar) { setSelectedGuitar(guitar); setScreen('details') }

  function addToCart(guitar) {
    const guitarId = Number(guitar?.id)
    if (!Number.isInteger(guitarId)) {
      window.alert('Esta guitarra não possui um ID numérico válido para compra.')
      return
    }
    setCartItems((current) => {
      const existing = current.find((item) => item.guitarId === guitarId)
      if (existing) return current.map((item) => item.guitarId === guitarId ? { ...item, quantity: item.quantity + 1 } : item)
      return [...current, { guitarId, guitar, quantity: 1 }]
    })
  }

  function changeCartQuantity(guitarId, quantity) {
    setCartItems((current) => current.map((item) => item.guitarId === guitarId ? { ...item, quantity } : item))
  }

  function removeFromCart(guitarId) { setCartItems((current) => current.filter((item) => item.guitarId !== guitarId)) }

  return (
      <>
        {screen === 'home' && <Home onNavigateToCatalog={() => setScreen('catalog')} onNavigateToCart={() => setScreen('cart')} onNavigateToProfile={() => setScreen('profile')} />}
        {screen === 'catalog' && <Catalog onNavigateToHome={() => setScreen('home')} onNavigateToCart={() => setScreen('cart')} onNavigateToProfile={() => setScreen('profile')} onDetails={openDetails} onFavorites={() => setScreen('favorites')} favorites={favorites} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />}
        {screen === 'details' && <GuitarDetails onNavigateToCatalog={() => setScreen('catalog')} onNavigateToHome={() => setScreen('home')} onNavigateToCart={() => setScreen('cart')} onNavigateToProfile={() => setScreen('profile')} guitar={selectedGuitar} onBack={() => setScreen('catalog')} favorites={favorites} onToggleFavorite={toggleFavorite} onAddToCart={addToCart} />}
        {screen === 'cart' && <><header className="riff-navbar"><div className="nav-container"><nav className="nav-left"><button className="nav-link" onClick={() => setScreen('home')}>HOME</button><button className="nav-link" onClick={() => setScreen('catalog')}>CATÁLOGO</button></nav><div className="nav-brand">Riff Store</div><div className="nav-right"><button className="icon-btn" onClick={() => setScreen('cart')} title="Carrinho">🛒 {cartItems.reduce((sum, item) => sum + item.quantity, 0)}</button></div></div></header><Cart items={cartItems} onChangeQuantity={changeCartQuantity} onRemove={removeFromCart} onBackToCatalog={() => setScreen('catalog')} onBackHome={() => setScreen('home')} onOrderCreated={() => setCartItems([])} /></>}
        {screen === 'favorites' && <Favorites favorites={favorites} onDetails={openDetails} onBack={() => setScreen('home')} onToggleFavorite={toggleFavorite} />}
        {screen === 'profile' && <main className="catalog-content"><div className="catalog-state-box"><h2>PERFIL</h2><p>A tela de perfil ainda não foi implementada.</p><button className="details-btn" onClick={() => setScreen('home')}>VOLTAR À HOME</button></div></main>}
      </>
  )
}

export default App