import React, { useEffect, useMemo, useState } from 'react'
import { getGuitars } from '../services/guitarApi'
import './Catalog.css'

const formatPrice = (price) => {
    const value = Number(price)
    if (!Number.isFinite(value)) return null

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value)
}

export function Catalog({
                            onNavigateHome,
                            onNavigateToHome,
                            onNavigateToCart,
                            onNavigateToProfile,
                            onDetails,
                            favorites = [],
                            onToggleFavorite,
                        }) {
    const [guitars, setGuitars] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const [brand, setBrand] = useState('Todas')
    const [sort, setSort] = useState('relevance')
    const [limit] = useState(12)
    const [offset, setOffset] = useState(0)

    const handleGoHome = () => {
        if (onNavigateToHome) {
            onNavigateToHome()
        } else if (onNavigateHome) {
            onNavigateHome()
        }
    }

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
                id: guitar.id ?? `${guitar.brand}-${guitar.model}-${index}`,
                priceusd: guitar.priceusd != null ? Number(guitar.priceusd) : null,
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

    const handleSearchChange = (event) => {
        setSearch(event.target.value)
        setOffset(0)
    }

    const handleNextPage = () => setOffset((prev) => prev + limit)
    const handlePrevPage = () => setOffset((prev) => Math.max(0, prev - limit))

    const currentPage = Math.floor(offset / limit) + 1

    const brands = useMemo(() => {
        return [
            'Todas',
            ...new Set(guitars.map((guitar) => guitar.brand).filter(Boolean)),
        ]
    }, [guitars])

    const filteredGuitars = useMemo(() => {
        const searchText = search.toLowerCase().trim()

        const result = guitars.filter((guitar) => {
            if (!searchText) return true
            return (
                guitar.model?.toLowerCase().includes(searchText) ||
                guitar.brand?.toLowerCase().includes(searchText) ||
                guitar.mostFamousUser?.toLowerCase().includes(searchText)
            )
        })

        return [...result].sort((a, b) => {
            if (sort === 'name-asc') return (a.model || '').localeCompare(b.model || '')
            if (sort === 'name-desc') return (a.model || '').localeCompare(b.model || '')
            if (sort === 'year-desc') return Number(b.launchYear || 0) - Number(a.launchYear || 0)
            if (sort === 'year-asc') return Number(a.launchYear || 0) - Number(b.launchYear || 0)
            return 0
        })
    }, [guitars, search, sort])

    return (
        <div className="catalog-wrapper">
            <header className="riff-navbar">
                <div className="nav-container">
                    <nav className="nav-left">
                        <button className="nav-link" onClick={handleGoHome}>
                            HOME
                        </button>
                        <button className="nav-link active">
                            CATÁLOGO
                        </button>
                    </nav>

                    <div className="nav-brand" onClick={handleGoHome}>
                        Riff Store
                    </div>

                    <div className="nav-right">
                        <button className="icon-btn" onClick={onNavigateToCart} title="Carrinho">
                            🛒
                        </button>
                        <button className="icon-btn" onClick={onNavigateToProfile} title="Perfil">
                            👤
                        </button>
                    </div>
                </div>
            </header>

            <main className="catalog-content">
                <section className="catalog-title-header">
                    <span className="catalog-badge">CATÁLOGO EXCLUSIVO</span>
                    <h1>GUITARRAS & INSTRUMENTOS</h1>
                    <p>Explore nosso acervo com especificações completas e modelos icônicos.</p>
                </section>

                <section className="catalog-toolbar-centered">
                    <div className="search-box">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="Buscar por modelo, marca ou artista..."
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

                    <div className="filter-controls">
                        <div className="select-wrapper">
                            <label htmlFor="brand-select">MARCA:</label>
                            <select id="brand-select" value={brand} onChange={handleBrandChange}>
                                {brands.map((b) => (
                                    <option key={b} value={b}>
                                        {b === 'Todas' ? 'Todas as marcas' : b}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="select-wrapper">
                            <label htmlFor="sort-select">ORDENAR:</label>
                            <select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value)}>
                                <option value="relevance">Mais Relevantes</option>
                                <option value="name-asc">Nome: A–Z</option>
                                <option value="name-desc">Nome: Z–A</option>
                                <option value="year-desc">Ano: Mais Recentes</option>
                                <option value="year-asc">Ano: Mais Antigos</option>
                            </select>
                        </div>
                    </div>
                </section>

                <div className="results-info-centered">
                    <span>EXIBINDO <strong>{filteredGuitars.length}</strong> PRODUTOS</span>
                </div>

                {loading ? (
                    <div className="catalog-state-box">
                        <div className="red-spinner" />
                        <p>Carregando catálogo...</p>
                    </div>
                ) : filteredGuitars.length === 0 ? (
                    <div className="catalog-state-box">
                        <span className="state-icon">🎸</span>
                        <h2>NENHUM PRODUTO ENCONTRADO</h2>
                        <p>Não encontramos resultados para os filtros selecionados.</p>
                        <button
                            className="reset-filters-btn"
                            onClick={() => {
                                setSearch('')
                                setBrand('Todas')
                            }}
                        >
                            LIMPAR FILTROS
                        </button>
                    </div>
                ) : (
                    <>
                        <section className="product-grid">
                            {filteredGuitars.map((guitar) => {
                                const isFavorite = favorites.includes(guitar.id)

                                return (
                                    <article className="product-card" key={guitar.id}>
                                        <div className="card-media">
                                            {guitar.launchYear && (
                                                <span className="year-badge">{guitar.launchYear}</span>
                                            )}

                                            <button
                                                className={`fav-toggle-btn ${isFavorite ? 'active' : ''}`}
                                                onClick={() => onToggleFavorite(guitar.id)}
                                                aria-label="Favoritar"
                                            >
                                                {isFavorite ? '♥' : '♡'}
                                            </button>

                                            {guitar.imageUrl ? (
                                                <img src={guitar.imageUrl} alt={guitar.model} loading="lazy" />
                                            ) : (
                                                <div className="media-placeholder">🎸</div>
                                            )}
                                        </div>

                                        <div className="card-body">
                                            <span className="brand-tag">{guitar.brand}</span>
                                            <h3 className="product-title">{guitar.model || 'Guitarra Especial'}</h3>

                                            {guitar.mostFamousUser && (
                                                <p className="artist-tag">
                                                    <span>ÍCONE:</span> {guitar.mostFamousUser}
                                                </p>
                                            )}

                                            <div className="price-row">
                                                {formatPrice(guitar.priceusd) ? (
                                                    <span className="price">{formatPrice(guitar.priceusd)}</span>
                                                ) : (
                                                    <span className="price-consult">Sob consulta</span>
                                                )}
                                            </div>

                                            <button className="details-btn" onClick={() => onDetails(guitar)}>
                                                VER DETALHES
                                            </button>
                                        </div>
                                    </article>
                                )
                            })}
                        </section>

                        <div className="pagination-bar">
                            <button
                                className="pag-btn"
                                onClick={handlePrevPage}
                                disabled={offset === 0}
                            >
                                ← ANTERIOR
                            </button>

                            <div className="pag-info">
                                <span>PÁGINA</span>
                                <strong>{currentPage}</strong>
                            </div>

                            <button
                                className="pag-btn"
                                onClick={handleNextPage}
                                disabled={guitars.length < limit}
                            >
                                PRÓXIMA →
                            </button>
                        </div>
                    </>
                )}
            </main>

            <footer className="riff-footer">
                <div className="footer-container">
                    <div className="footer-col">
                        <h4 className="footer-brand" onClick={handleGoHome} style={{ cursor: 'pointer' }}>
                            Riff Store
                        </h4>
                        <p>Sua referência em guitarras lendárias e equipamentos de alta performance.</p>
                    </div>

                    <div className="footer-col">
                        <h5>Navegação</h5>
                        <ul>
                            <li><a href="#home" onClick={(e) => { e.preventDefault(); handleGoHome(); }}>Home</a></li>
                            <li><a href="#catalog">Catálogo</a></li>
                        </ul>
                    </div>

                    <div className="footer-col">
                        <h5>Atendimento</h5>
                        <ul>
                            <li><a href="#suporte">Suporte Técnico</a></li>
                            <li><a href="#garantia">Garantia</a></li>
                        </ul>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Riff Store. Todos os direitos reservados.</p>
                </div>
            </footer>
        </div>
    )
}

export default Catalog