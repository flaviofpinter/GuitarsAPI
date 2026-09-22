import '../App.css'

function GuitarDetails({ guitar, onBack, favorites = [], onToggleFavorite }) {
    if (!guitar) {
        return (
            <section className="details-screen">
                <button className="back-button" onClick={onBack}>
                    ← Voltar para o catálogo
                </button>
                <div className="empty-favorites">
                    <h2>Guitarra não encontrada</h2>
                    <p>Nenhuma informação disponível para exibição no momento.</p>
                </div>
            </section>
        )
    }

    const isFavorite = favorites.includes(guitar.id)

    return (
        <section className="details-screen">
            {/* Navegação de Topo */}
            <div className="details-nav">
                <button className="back-button" onClick={onBack}>
                    ← Voltar para o catálogo
                </button>
                <div className="breadcrumb">
                    <span>Catálogo</span> / <span>{guitar.brand || 'Marca'}</span> / <strong className="active">{guitar.model}</strong>
                </div>
            </div>

            <div className="details-layout">
                {/* Showcase Visual do Produto */}
                <div className="details-gallery">
                    <div className="details-image-container">
                        {guitar.guitarType && (
                            <span className="details-type-badge">{guitar.guitarType}</span>
                        )}

                        <div className="details-symbol">
                            {guitar.imageUrl ? (
                                <img src={guitar.imageUrl} alt={`${guitar.brand} ${guitar.model}`} />
                            ) : (
                                <span className="fallback-icon">🎸</span>
                            )}
                        </div>
                    </div>
                </div>

                {/* Painel de Informações e Compra/Detalhes */}
                <div className="details-info">
                    <div className="detail-header">
                        <div className="brand-group">
                            <span className="eyebrow">{guitar.brand}</span>
                            <h1>{guitar.model}</h1>
                        </div>

                        <button
                            className={`detail-heart ${isFavorite ? 'liked' : ''}`}
                            onClick={() => onToggleFavorite(guitar.id)}
                            title={isFavorite ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                        >
                            {isFavorite ? '♥' : '♡'}
                        </button>
                    </div>

                    {/* Banner de Usuário Icônico */}
                    {guitar.mostFamousUser && (
                        <div className="artist-highlight-banner">
                            <span className="icon">★</span>
                            <p>
                                Modelo imortalizado nas mãos de <strong>{guitar.mostFamousUser}</strong>.
                            </p>
                        </div>
                    )}

                    {/* Status do Instrumento */}
                    <div className="status-badge-container">
                        <span className="status-label">Disponibilidade / Edição:</span>
                        <span className="status-tag">{guitar.status || 'Edição Padrão'}</span>
                    </div>

                    {/* Especificações Técnicas */}
                    <div className="specs-section">
                        <h3>Especificações do Instrumento</h3>
                        <div className="spec-grid">
                            <Spec label="Ano de Lançamento" value={guitar.launchYear} />
                            <Spec label="País de Origem" value={guitar.countryOfOrigin} />
                            <Spec label="Cor Principal" value={guitar.primaryColor} />
                            <Spec label="Acabamento" value={guitar.colorOrFinish} />
                            <Spec label="Tipo de Corpo" value={guitar.guitarType} />
                            <Spec label="Captadores" value={guitar.pickupConfiguration} />
                            <Spec label="Madeira do Corpo" value={guitar.bodyWood} />
                            <Spec label="Construção do Braço" value={guitar.neckConstruction} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

function Spec({ label, value }) {
    return (
        <div className="spec-card">
            <span className="spec-label">{label}</span>
            <strong className="spec-value">{value || '-'}</strong>
        </div>
    )
}

export default GuitarDetails