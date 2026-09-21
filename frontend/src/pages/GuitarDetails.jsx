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
                    <p>Nenhuma informação disponível para exibição.</p>
                </div>
            </section>
        )
    }

    const isFavorite = favorites.includes(guitar.id)

    return (
        <section className="details-screen">
            <button className="back-button" onClick={onBack}>
                ← Voltar para o catálogo
            </button>

            <div className="details-layout">
                <div className="details-image">
                    {guitar.guitarType && <span>{guitar.guitarType}</span>}

                    <div className="details-symbol">
                        {guitar.imageUrl ? (
                            <img src={guitar.imageUrl} alt={guitar.model} />
                        ) : (
                            '🎸'
                        )}
                    </div>
                </div>

                <div className="details-info">
                    <div className="detail-top">
                        <div>
                            <span className="eyebrow">{guitar.brand}</span>
                            <h1>{guitar.model}</h1>
                        </div>

                        <button
                            className={`detail-heart ${isFavorite ? 'liked' : ''}`}
                            onClick={() => onToggleFavorite(guitar.id)}
                        >
                            {isFavorite ? '♥' : '♡'}
                        </button>
                    </div>

                    <p className="description">
                        Mais famoso por: <strong>{guitar.mostFamousUser || '-'}</strong>
                    </p>

                    <div className="status">
                        <span>Status</span>
                        <strong>{guitar.status || '-'}</strong>
                    </div>

                    <div className="spec-grid">
                        <Spec label="Ano de lançamento" value={guitar.launchYear} />
                        <Spec label="Usuário mais famoso" value={guitar.mostFamousUser} />
                        <Spec label="Cor principal" value={guitar.primaryColor} />
                        <Spec label="Cor / acabamento" value={guitar.colorOrFinish} />
                        <Spec label="Tipo" value={guitar.guitarType} />
                        <Spec label="País de origem" value={guitar.countryOfOrigin} />
                        <Spec label="Captadores" value={guitar.pickupConfiguration} />
                        <Spec label="Madeira do corpo" value={guitar.bodyWood} />
                        <Spec label="Construção do braço" value={guitar.neckConstruction} />
                    </div>
                </div>
            </div>
        </section>
    )
}

function Spec({ label, value }) {
    return (
        <div>
            <span>{label}</span>
            <strong>{value || '-'}</strong>
        </div>
    )
}

export default GuitarDetails