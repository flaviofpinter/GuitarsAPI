import { useEffect, useState } from 'react'
import { getGuitars } from '../services/guitarApi'
import '../App.css'

function Catalog({ onDetails, onFavorites, favorites = [], onToggleFavorite }) {
    const [guitars, setGuitars] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [brand, setBrand] = useState('Todas')
    const [limit, setLimit] = useState(9)
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        loadGuitars()
    }, [brand, offset, limit])

    async function loadGuitars() {
        try {
            setLoading(true)
            const data = await getGuitars(
                brand === 'Todas' ? '' : brand,
                limit,
                offset
            )

            // Injeta um ID único baseado nas propriedades caso não venha da API
            const formattedData = (data || []).map((guitar, index) => ({
                ...guitar,
                id: guitar.id ?? `${guitar.brand}-${guitar.model}-${index}`
            }))

            setGuitars(formattedData)
        } catch (error) {
            console.error('Erro ao carregar guitarras:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleBrandChange = (event) => {
        setBrand(event.target.value)
        setOffset(0)
    }

    const handleNextPage = () => setOffset((prev) => prev + limit)
    const handlePrevPage = () => setOffset((prev) => Math.max(0, prev - limit))

    const currentPage = Math.floor(offset / limit) + 1
    const brands = ['Todas', ...new Set(guitars.map((g) => g.brand).filter(Boolean))]

    const filteredGuitars = guitars.filter((guitar) => {
        const searchText = search.toLowerCase()
        return (
            guitar.model?.toLowerCase().includes(searchText) ||
            guitar.brand?.toLowerCase().includes(searchText) ||
            guitar.mostFamousUser?.toLowerCase().includes(searchText)
        )
    })

    return (
        <section className="catalog-screen">
            <div className="hero">
                <div>
                    <span className="eyebrow">THE GUITAR COLLECTION</span>
                    <h1>
                        Encontre sua
                        <br />
                        <em>guitarra.</em>
                    </h1>
                    <p>Explore guitarras icônicas, artistas lendários e especificações detalhadas.</p>
                </div>
                <div className="hero-guitar">🎸</div>
            </div>

            <div className="catalog-header">
                <div>
                    <span className="section-label">COLLECTION</span>
                    <h2>Guitarras</h2>
                </div>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <button className="pagination-btn" onClick={onFavorites}>
                        ♥ Favoritos ({favorites.length})
                    </button>
                    <span className="results">{filteredGuitars.length} guitarras</span>
                </div>
            </div>

            <div className="filters">
                <div className="search-box">
                    <span>⌕</span>
                    <input
                        type="text"
                        placeholder="Buscar guitarra, marca ou artista..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <select value={brand} onChange={handleBrandChange}>
                    {brands.map((b) => (
                        <option key={b} value={b}>{b}</option>
                    ))}
                </select>
            </div>

            {loading ? (
                <div className="loading">Carregando guitarras...</div>
            ) : filteredGuitars.length === 0 ? (
                <div className="empty-favorites">
                    <h2>Nenhuma guitarra encontrada</h2>
                    <p>Tente alterar sua busca ou filtro.</p>
                </div>
            ) : (
                <>
                    <div className="guitar-grid">
                        {filteredGuitars.map((guitar) => {
                            const isFavorite = favorites.includes(guitar.id)

                            return (
                                <article className="guitar-card" key={guitar.id}>
                                    <div className="guitar-image">
                                        <span className="guitar-type">{guitar.guitarType}</span>

                                        <button
                                            className={`heart ${isFavorite ? 'liked' : ''}`}
                                            onClick={() => onToggleFavorite(guitar.id)}
                                        >
                                            {isFavorite ? '♥' : '♡'}
                                        </button>

                                        <div className="guitar-symbol">
                                            {guitar.imageUrl ? (
                                                <img src={guitar.imageUrl} alt={guitar.model} />
                                            ) : (
                                                '🎸'
                                            )}
                                        </div>
                                    </div>

                                    <div className="card-content">
                                        <span className="brand">{guitar.brand}</span>
                                        <h3>{guitar.model}</h3>
                                        <p>Famoso por: <strong>{guitar.mostFamousUser || '-'}</strong></p>

                                        <div className="card-footer">
                                            <span>{guitar.launchYear || '-'}</span>
                                            {/* Passa o objeto guitar completo */}
                                            <button onClick={() => onDetails(guitar)}>
                                                Ver detalhes →
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>

                    <div className="pagination">
                        <button className="pagination-btn" onClick={handlePrevPage} disabled={offset === 0}>
                            ← Anterior
                        </button>
                        <span className="pagination-info">Página {currentPage}</span>
                        <button className="pagination-btn" onClick={handleNextPage} disabled={guitars.length < limit}>
                            Próxima →
                        </button>
                    </div>
                </>
            )}
        </section>
    )
}

export default Catalog