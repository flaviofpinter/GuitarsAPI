import {useEffect, useMemo, useState} from 'react'
import {getGuitars} from '../services/guitarApi'
import '../App.css'

const GUITARISTS = [
    {
        name: 'Jimi Hendrix',
        image: '/images/guitarists/jimi-hendrix.jpg',
        description: 'Stratocaster • Blues Rock',
    },
    {
        name: 'Eric Clapton',
        image: '/images/guitarists/eric-clapton.jpg',
        description: 'Stratocaster • Blues',
    },
    {
        name: 'Jimmy Page',
        image: '/images/guitarists/jimmy-page.jpg',
        description: 'Les Paul • Rock',
    },
    {
        name: 'Eddie Van Halen',
        image: '/images/guitarists/eddie-van-halen.jpg',
        description: 'Superstrat • Hard Rock',
    },
    {
        name: 'Carlos Santana',
        image: '/images/guitarists/carlos-santana.jpg',
        description: 'PRS • Latin Rock',
    },
    {
        name: 'Mark Knopfler',
        image: '/images/guitarists/mark-knopfler.jpg',
        description: 'Stratocaster • Rock',
    },
    {
        name: 'Stevie Ray Vaughan',
        image: '/images/guitarists/stevie-ray-vaughan.jpg',
        description: 'Stratocaster • Blues',
    },
]

function Catalog({
                     onDetails,
                     onFavorites,
                     favorites = [],
                     onToggleFavorite,
                 }) {
    const [guitars, setGuitars] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [brand, setBrand] = useState('Todas')
    const [sort, setSort] = useState('relevance')
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

            const formattedData = (data || []).map((guitar, index) => ({
                ...guitar,
                id:
                    guitar.id ??
                    `${guitar.brand}-${guitar.model}-${index}`,
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

    const handleNextPage = () => {
        setOffset((prev) => prev + limit)
    }

    const handlePrevPage = () => {
        setOffset((prev) => Math.max(0, prev - limit))
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        setOffset(0)
    }

    const currentPage = Math.floor(offset / limit) + 1

    const brands = useMemo(() => {
        return [
            'Todas',
            ...new Set(
                guitars
                    .map((guitar) => guitar.brand)
                    .filter(Boolean)
            ),
        ]
    }, [guitars])

    const filteredGuitars = useMemo(() => {
        const searchText = search.toLowerCase().trim()

        const result = guitars.filter((guitar) => {
            if (!searchText) return true

            return (
                guitar.model
                    ?.toLowerCase()
                    .includes(searchText) ||
                guitar.brand
                    ?.toLowerCase()
                    .includes(searchText) ||
                guitar.mostFamousUser
                    ?.toLowerCase()
                    .includes(searchText)
            )
        })

        return [...result].sort((a, b) => {
            if (sort === 'name-asc') {
                return (a.model || '').localeCompare(b.model || '')
            }

            if (sort === 'name-desc') {
                return (b.model || '').localeCompare(a.model || '')
            }

            if (sort === 'year-desc') {
                return (
                    Number(b.launchYear || 0) -
                    Number(a.launchYear || 0)
                )
            }

            if (sort === 'year-asc') {
                return (
                    Number(a.launchYear || 0) -
                    Number(b.launchYear || 0)
                )
            }

            return 0
        })
    }, [guitars, search, sort])

    return (
        <main className="catalog-screen">

            {/* HERO */}
            <section className="shop-hero">
                <div className="shop-hero-content">
                    <span className="eyebrow">
                        THE GUITAR COLLECTION
                    </span>

                    <h1>
                        Encontre a guitarra
                        <br/>
                        <em>que combina com você.</em>
                    </h1>

                    <p>
                        Explore modelos icônicos, marcas lendárias
                        e guitarras que fizeram história.
                    </p>

                    <button
                        className="hero-cta"
                        onClick={() =>
                            document
                                .querySelector('.catalog-products')
                                ?.scrollIntoView({
                                    behavior: 'smooth',
                                })
                        }
                    >
                        Explorar coleção
                        <span>→</span>
                    </button>
                </div>

                <div className="hero-product">
                    <div className="hero-glow"/>
                    <div className="hero-guitar-image">
                        🎸
                    </div>

                    <div className="hero-floating-card">
                        <span>COLEÇÃO</span>
                        <strong>Instrumentos icônicos</strong>
                    </div>
                </div>
            </section>

            {/* ARTIST STRIP */}
            <section className="artist-section">
                <div className="section-heading">
                    <div>
                        <span className="section-label">
                            LEGENDS
                        </span>
                        <h2>
                            Inspiradas por gigantes.
                        </h2>
                    </div>

                    <p>
                        Descubra as guitarras associadas aos
                        maiores nomes da história.
                    </p>
                </div>

                <div className="artist-grid">
                    {GUITARISTS.map((artist) => (
                        <div
                            className="artist-card"
                            key={artist.name}
                        >
                            <img
                                src={artist.image}
                                alt={artist.name}
                            />

                            <div className="artist-overlay">
                                <span>
                                    {artist.description}
                                </span>

                                <h3>{artist.name}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* PRODUCTS */}
            <section className="catalog-products">

                <div className="catalog-header">
                    <div>
                        <span className="section-label">
                            COLLECTION
                        </span>

                        <h2>
                            Guitarras
                            <span className="product-count">
                                {filteredGuitars.length}
                            </span>
                        </h2>
                    </div>

                    <button
                        className="favorites-button"
                        onClick={onFavorites}
                    >
                        <span>♥</span>
                        Favoritos
                        <strong>{favorites.length}</strong>
                    </button>
                </div>

                {/* FILTERS */}
                <div className="shop-toolbar">

                    <div className="search-box">
                        <span className="search-icon">
                            ⌕
                        </span>

                        <input
                            type="text"
                            placeholder="Buscar guitarra, marca ou artista..."
                            value={search}
                            onChange={handleSearchChange}
                        />

                        {search && (
                            <button
                                className="clear-search"
                                onClick={() => setSearch('')}
                                aria-label="Limpar busca"
                            >
                                ×
                            </button>
                        )}
                    </div>

                    <div className="filter-group">
                        <select
                            value={brand}
                            onChange={handleBrandChange}
                        >
                            {brands.map((b) => (
                                <option key={b} value={b}>
                                    {b === 'Todas'
                                        ? 'Todas as marcas'
                                        : b}
                                </option>
                            ))}
                        </select>

                        <select
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value)
                            }
                        >
                            <option value="relevance">
                                Mais relevantes
                            </option>

                            <option value="name-asc">
                                Nome: A–Z
                            </option>

                            <option value="name-desc">
                                Nome: Z–A
                            </option>

                            <option value="year-desc">
                                Mais recentes
                            </option>

                            <option value="year-asc">
                                Mais antigas
                            </option>
                        </select>
                    </div>
                </div>

                {/* RESULTS */}
                {loading ? (
                    <div className="shop-loading">
                        <div className="loading-spinner"/>
                        <p>Carregando coleção...</p>
                    </div>
                ) : filteredGuitars.length === 0 ? (
                    <div className="empty-shop">
                        <div className="empty-icon">
                            🎸
                        </div>

                        <h2>
                            Nenhuma guitarra encontrada
                        </h2>

                        <p>
                            Tente buscar por outro modelo,
                            marca ou artista.
                        </p>

                        <button
                            onClick={() => {
                                setSearch('')
                                setBrand('Todas')
                            }}
                        >
                            Limpar filtros
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="guitar-grid">

                            {filteredGuitars.map((guitar) => {
                                const isFavorite =
                                    favorites.includes(
                                        guitar.id
                                    )

                                return (
                                    <article
                                        className="guitar-card"
                                        key={guitar.id}
                                    >
                                        <div className="guitar-image">

                                            {guitar.launchYear && (
                                                <span className="product-badge">
                                                    CLÁSSICA
                                                </span>
                                            )}

                                            <button
                                                className={`heart ${
                                                    isFavorite
                                                        ? 'liked'
                                                        : ''
                                                }`}
                                                onClick={() =>
                                                    onToggleFavorite(
                                                        guitar.id
                                                    )
                                                }
                                                aria-label={
                                                    isFavorite
                                                        ? 'Remover dos favoritos'
                                                        : 'Adicionar aos favoritos'
                                                }
                                            >
                                                {isFavorite
                                                    ? '♥'
                                                    : '♡'}
                                            </button>

                                            {guitar.imageUrl ? (
                                                <img
                                                    src={
                                                        guitar.imageUrl
                                                    }
                                                    alt={
                                                        guitar.model
                                                    }
                                                />
                                            ) : (
                                                <div className="guitar-placeholder">
                                                    🎸
                                                </div>
                                            )}

                                            <span className="guitar-type">
                                                {
                                                    guitar.guitarType
                                                }
                                            </span>
                                        </div>

                                        <div className="card-content">

                                            <span className="brand">
                                                {guitar.brand}
                                            </span>

                                            <h3>
                                                {guitar.model}
                                            </h3>

                                            <p className="famous-user">
                                                <span>
                                                    Associada a
                                                </span>

                                                <strong>
                                                    {guitar.mostFamousUser ||
                                                        'Artistas lendários'}
                                                </strong>
                                            </p>

                                            <div className="product-meta">
                                                <span>
                                                    {guitar.launchYear ||
                                                        '—'}
                                                </span>

                                                <span>
                                                    ★ Destaque
                                                </span>
                                            </div>

                                            <button
                                                className="details-button"
                                                onClick={() =>
                                                    onDetails(
                                                        guitar
                                                    )
                                                }
                                            >
                                                <span>
                                                    Ver guitarra
                                                </span>
                                                <strong>
                                                    →
                                                </strong>
                                            </button>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>

                        {/* PAGINATION */}
                        <div className="pagination">
                            <button
                                className="pagination-btn"
                                onClick={handlePrevPage}
                                disabled={offset === 0}
                            >
                                ←
                                <span>
                                    Anterior
                                </span>
                            </button>

                            <div className="pagination-current">
                                <span>PÁGINA</span>
                                <strong>
                                    {currentPage}
                                </strong>
                            </div>

                            <button
                                className="pagination-btn"
                                onClick={handleNextPage}
                                disabled={
                                    guitars.length < limit
                                }
                            >
                                <span>
                                    Próxima
                                </span>
                                →
                            </button>
                        </div>
                    </>
                )}
            </section>
        </main>
    )
}

export default Catalog
