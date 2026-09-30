import React, { useMemo } from 'react'
import './GuitarDetails.css'

const formatPrice = (price) => {
    const value = Number(price)
    if (!Number.isFinite(value)) return null

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    }).format(value)
}

const GUITARIST_IMAGES = {
    'jimi hendrix': '/images/guitarists/jimi-hendrix.jpg',
    'eric clapton': '/images/guitarists/eric-clapton.jpg',
    'jimmy page': '/images/guitarists/jimmy-page.jpg',
    'eddie van halen': '/images/guitarists/eddie-van-halen.jpg',
    'carlos santana': '/images/guitarists/carlos-santana.jpg',
    'mark knopfler': '/images/guitarists/mark-knopfler.jpg',
    'stevie ray vaughan': '/images/guitarists/stevie-ray-vaughan.jpg',
}

export function GuitarDetails({
                                  guitar,
                                  onBack,
                                  onNavigateHome,
                                  onNavigateToHome,
                                  onNavigateToCart,
                                  onNavigateToProfile,
                                  favorites = [],
                                  onToggleFavorite,
                              }) {
    const handleGoHome = () => {
        if (onNavigateToHome) {
            onNavigateToHome()
        } else if (onNavigateHome) {
            onNavigateHome()
        }
    }

    if (!guitar) {
        return (
            <div className="catalog-wrapper">
                <header className="riff-navbar">
                    <div className="nav-container">
                        <nav className="nav-left">
                            <button className="nav-link" onClick={handleGoHome}>
                                HOME
                            </button>
                            <button className="nav-link" onClick={onBack}>
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
                    <div className="catalog-state-box">
                        <span className="state-icon">🎸</span>
                        <h2>GUITARRA NÃO ENCONTRADA</h2>
                        <p>O modelo solicitado não está disponível ou não foi encontrado.</p>
                        <button className="reset-filters-btn" onClick={onBack}>
                            VOLTAR PARA O CATÁLOGO
                        </button>
                    </div>
                </main>

                <footer className="riff-footer">
                    <div className="footer-container">
                        <div className="footer-col">
                            <h4 className="footer-brand" onClick={handleGoHome} style={{ cursor: 'pointer' }}>
                                Riff Store
                            </h4>
                            <p>Sua referência em guitarras lendárias e equipamentos de alta performance.</p>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; {new Date().getFullYear()} Riff Store. Todos os direitos reservados.</p>
                    </div>
                </footer>
            </div>
        )
    }

    const isFavorite = favorites.includes(guitar.id)
    const price = formatPrice(guitar.priceusd)

    const artistNameLower = guitar.mostFamousUser?.toLowerCase().trim()
    const artistPhoto = GUITARIST_IMAGES[artistNameLower]

    const specs = useMemo(
        () => [
            { label: 'Tipo', value: guitar.guitarType },
            { label: 'Ano de Lançamento', value: guitar.launchYear },
            { label: 'Madeira do Corpo', value: guitar.bodyWood },
            { label: 'Construção do Braço', value: guitar.neckConstruction },
            { label: 'Configuração de Captadores', value: guitar.pickupConfiguration },
            { label: 'Acabamento', value: guitar.colorOrFinish || guitar.primaryColor },
            { label: 'País de Origem', value: guitar.countryOfOrigin },
            { label: 'Status', value: guitar.status },
        ],
        [guitar]
    )

    return (
        <div className="catalog-wrapper">
            <header className="riff-navbar">
                <div className="nav-container">
                    <nav className="nav-left">
                        <button className="nav-link" onClick={handleGoHome}>
                            HOME
                        </button>
                        <button className="nav-link active" onClick={onBack}>
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
                <div className="details-breadcrumb">
                    <button className="back-link-btn" onClick={onBack}>
                        ← VOLTAR AO CATÁLOGO
                    </button>
                    <span className="breadcrumb-sep">/</span>
                    <span className="breadcrumb-brand">{guitar.brand}</span>
                    <span className="breadcrumb-sep">/</span>
                    <strong className="breadcrumb-model">{guitar.model}</strong>
                </div>

                <section className="details-hero-grid">
                    <div className="details-image-container">
                        {guitar.status === 'In Production' && (
                            <span className="year-badge">DISPONÍVEL</span>
                        )}

                        <button
                            className={`fav-toggle-btn ${isFavorite ? 'active' : ''}`}
                            onClick={() => onToggleFavorite(guitar.id)}
                            aria-label="Favoritar"
                        >
                            {isFavorite ? '♥' : '♡'}
                        </button>

                        {guitar.imageUrl ? (
                            <img src={guitar.imageUrl} alt={`${guitar.brand} ${guitar.model}`} />
                        ) : (
                            <div className="media-placeholder">🎸</div>
                        )}

                        <div className="image-caption-row">
                            <span>{guitar.primaryColor || guitar.colorOrFinish || 'Acabamento original'}</span>
                            <span>{guitar.countryOfOrigin}</span>
                        </div>
                    </div>

                    <div className="details-info-panel">
                        <span className="brand-tag">{guitar.brand}</span>
                        <h1 className="details-title">{guitar.model}</h1>

                        <p className="details-subtitle">
                            {guitar.guitarType}
                            {guitar.launchYear && ` • ${guitar.launchYear}`}
                        </p>

                        <div className="details-rating-row">
                            <span className="stars-ic">★★★★★</span>
                            <span>MODELO EM DESTAQUE</span>
                        </div>

                        <div className="details-price-box">
                            {price ? (
                                <>
                                    <span className="price-box-label">PREÇO ESTIMADO</span>
                                    <div className="price">{price}</div>
                                    <span className="price-note">Valores em USD (sujeito a alterações)</span>
                                </>
                            ) : (
                                <div className="price-consult">Sob consulta</div>
                            )}
                        </div>

                        <div className="details-status-row">
                            <span className="status-indicator-dot" />
                            <div>
                                <strong>
                                    {guitar.status === 'In Production' ? 'Modelo em produção' : 'Modelo descontinuado'}
                                </strong>
                                <p>
                                    {guitar.status === 'In Production'
                                        ? 'Disponibilidade sujeita ao estoque'
                                        : 'Consulte disponibilidade no mercado vintage'}
                                </p>
                            </div>
                        </div>

                        <div className="details-actions-row">
                            <button
                                className="details-btn active-fav"
                                onClick={() => onToggleFavorite(guitar.id)}
                            >
                                {isFavorite ? '♥ REMOVER DOS FAVORITOS' : '♡ ADICIONAR AOS FAVORITOS'}
                            </button>

                            <button className="pag-btn" onClick={onBack}>
                                CONTINUAR EXPLORANDO
                            </button>
                        </div>

                        <div className="details-benefits-grid">
                            <div className="benefit-card">
                                <span className="benefit-icon">◈</span>
                                <div>
                                    <strong>COMPRA SEGURA</strong>
                                    <small>Processo verificado</small>
                                </div>
                            </div>
                            <div className="benefit-card">
                                <span className="benefit-icon">◇</span>
                                <div>
                                    <strong>CURATORIA PREMIUM</strong>
                                    <small>Modelos autênticos</small>
                                </div>
                            </div>
                            <div className="benefit-card">
                                <span className="benefit-icon">✦</span>
                                <div>
                                    <strong>HISTÓRIA DO ROCK</strong>
                                    <small>Instrumentos icônicos</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="details-section-box">
                    <div className="details-section-header">
                        <span className="catalog-badge">THE STORY</span>
                        <h2>MAIS DO QUE UMA GUITARRA</h2>
                        <p>Um modelo que ajudou a definir a identidade da música moderna.</p>
                    </div>

                    <div className="story-cards-grid">
                        <div className="story-card-item">
                            <span className="story-num">01</span>
                            <div>
                                <span className="brand-tag">MODELO</span>
                                <h3>{guitar.model}</h3>
                                <p>
                                    Um instrumento da {guitar.brand} associado a diferentes momentos da história da
                                    música e reconhecido por sua identidade sonora e visual inconfundível.
                                </p>
                            </div>
                        </div>

                        <div className="story-card-item">
                            <span className="story-num">02</span>
                            <div>
                                <span className="brand-tag">ARTISTA</span>
                                <h3>{guitar.mostFamousUser || 'Artistas lendários'}</h3>
                                <p>
                                    Este modelo é especialmente associado a{' '}
                                    {guitar.mostFamousUser || 'artistas de grande destaque mundial'}.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="details-section-box">
                    <div className="details-section-header">
                        <span className="catalog-badge">SPECIFICATIONS</span>
                        <h2>ESPECIFICAÇÕES TÉCNICAS</h2>
                        <p>Tudo o que você precisa saber sobre as características deste instrumento.</p>
                    </div>

                    <div className="specs-grid">
                        {specs.map((spec) => (
                            <div className="spec-card" key={spec.label}>
                                <span className="spec-label">{spec.label}</span>
                                <strong className="spec-value">{spec.value || '—'}</strong>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="details-section-box artist-highlight-box">
                    <div className="artist-text-content">
                        <span className="catalog-badge">ASSOCIATED WITH</span>
                        <h2>{guitar.mostFamousUser || 'Artistas Lendários'}</h2>
                        <p>
                            O legado deste modelo está diretamente ligado a músicos que ajudaram a transformar a
                            guitarra em um dos instrumentos mais importantes e influentes da história da música.
                        </p>

                        <div className="artist-meta-tags">
                            <span>{guitar.model}</span>
                            <span>•</span>
                            <span>{guitar.brand}</span>
                            {guitar.launchYear && (
                                <>
                                    <span>•</span>
                                    <span>{guitar.launchYear}</span>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="artist-avatar-container">
                        {artistPhoto ? (
                            <img
                                src={artistPhoto}
                                alt={guitar.mostFamousUser}
                                className="artist-avatar-img"
                            />
                        ) : (
                            <div className="artist-icon-visual">🎸</div>
                        )}
                    </div>
                </section>

                <section className="details-cta-box">
                    <div>
                        <span className="catalog-badge">{guitar.brand}</span>
                        <h2>LEVE ESTE ÍCONE PARA SUA COLEÇÃO</h2>
                    </div>

                    <div className="cta-action-group">
                        {price && <span className="price">{price}</span>}
                        <button className="details-btn" onClick={() => onToggleFavorite(guitar.id)}>
                            {isFavorite ? '♥ NOS FAVORITOS' : '♡ ADICIONAR AOS FAVORITOS'}
                        </button>
                    </div>
                </section>
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
                            <li>
                                <a href="#home" onClick={(e) => { e.preventDefault(); handleGoHome(); }}>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#catalog" onClick={(e) => { e.preventDefault(); onBack(); }}>
                                    Catálogo
                                </a>
                            </li>
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

export default GuitarDetails