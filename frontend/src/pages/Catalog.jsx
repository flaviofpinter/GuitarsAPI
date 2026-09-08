import {useEffect, useState} from 'react'
import {getGuitars} from '../services/guitarApi'
import '../App.css'

function Catalog({
                     onDetails, favorites, onToggleFavorite,
                 }) {
    const [guitars, setGuitars] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [brand, setBrand] = useState('Todas')

    useEffect(() => {
        loadGuitars()
    }, [brand])

    async function loadGuitars() {
        try {
            setLoading(true)

            // GET /guitars
            // GET /guitars?brand=Fender

            const data = await getGuitars(brand === 'Todas' ? '' : brand)

            setGuitars(data)
        } catch (error) {
            console.error('Erro ao carregar guitarras:', error)
        } finally {
            setLoading(false)
        }
    }

    const brands = ['Todas', ...new Set(guitars
        .map((guitar) => guitar.brand)
        .filter(Boolean)),]

    const filteredGuitars = guitars.filter((guitar) => {
        const searchText = search.toLowerCase()

        return (guitar.model
                ?.toLowerCase()
                .includes(searchText) || guitar.brand
                ?.toLowerCase()
                .includes(searchText) || guitar.mostFamousUser
                ?.toLowerCase()
                .includes(searchText))
    })

    return (<section className="catalog-screen">
            <div className="hero">
                <div>
          <span className="eyebrow">
            THE GUITAR COLLECTION
          </span>

                    <h1>
                        Encontre sua
                        <br/>
                        <em>guitarra.</em>
                    </h1>

                    <p>
                        Explore guitarras icônicas, artistas lendários
                        e especificações detalhadas.
                    </p>
                </div>

                <div className="hero-guitar">
                    🎸
                </div>
            </div>

            <div className="catalog-header">
                <div>
          <span className="section-label">
            COLLECTION
          </span>

                    <h2>Guitarras</h2>
                </div>

                <span className="results">
          {filteredGuitars.length} guitarras
        </span>
            </div>

            <div className="filters">
                <div className="search-box">
                    <span>⌕</span>

                    <input
                        type="text"
                        placeholder="Buscar guitarra, marca ou artista..."
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                    />
                </div>

                <select
                    value={brand}
                    onChange={(event) => setBrand(event.target.value)}
                >
                    {brands.map((item) => (<option key={item} value={item}>
                            {item}
                        </option>))}
                </select>
            </div>

            {loading ? (<div className="loading">
                    Carregando guitarras...
                </div>) : filteredGuitars.length === 0 ? (<div className="empty-favorites">
                    <h2>Nenhuma guitarra encontrada</h2>

                    <p>
                        Tente alterar sua busca ou filtro.
                    </p>
                </div>) : (<div className="guitar-grid">
                    {filteredGuitars.map((guitar) => {
                        const isFavorite = favorites.includes(guitar.id)

                        return (<article
                                className="guitar-card"
                                key={guitar.id}
                            >
                                <div className="guitar-image">
                  <span className="guitar-type">
                    {guitar.guitarType}
                  </span>

                                    <button
                                        className={`heart ${isFavorite ? 'liked' : ''}`}
                                        onClick={() => onToggleFavorite(guitar.id)}
                                    >
                                        {isFavorite ? '♥' : '♡'}
                                    </button>

                                    <div className="guitar-symbol">
                                        🎸
                                    </div>
                                </div>

                                <div className="card-content">
                  <span className="brand">
                    {guitar.brand}
                  </span>

                                    <h3>
                                        {guitar.model}
                                    </h3>

                                    <p>
                                        Famoso por:{' '}
                                        <strong>
                                            {guitar.mostFamousUser || '-'}
                                        </strong>
                                    </p>

                                    <div className="card-footer">
                    <span>
                      {guitar.launchYear || '-'}
                    </span>

                                        <button
                                            onClick={() => onDetails(guitar.id)}
                                        >
                                            Ver detalhes →
                                        </button>
                                    </div>
                                </div>
                            </article>)
                    })}
                </div>)}
        </section>)
}

export default Catalog