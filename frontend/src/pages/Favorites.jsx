import {useEffect, useState} from 'react'
import {getGuitar} from '../services/guitarApi'
import '../App.css'

function Favorites({
                       favorites, onDetails, onBack, onToggleFavorite,
                   }) {
    const [guitars, setGuitars] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadFavorites()
    }, [favorites])

    async function loadFavorites() {
        if (favorites.length === 0) {
            setGuitars([])
            setLoading(false)
            return
        }

        try {
            setLoading(true)

            // GET /guitars/{id}
            // para cada guitarra favoritada

            const results = await Promise.all(favorites.map((id) => getGuitar(id)))

            setGuitars(results)
        } catch (error) {
            console.error('Erro ao carregar favoritos:', error)
        } finally {
            setLoading(false)
        }
    }

    return (<section className="favorites-screen">
            <button
                className="back-button"
                onClick={onBack}
            >
                ← Voltar para o catálogo
            </button>

            <div className="favorites-heading">
        <span className="eyebrow">
          YOUR COLLECTION
        </span>

                <h1>Favoritos</h1>

                <p>
                    Suas guitarras favoritas.
                </p>
            </div>

            {loading ? (<div className="loading">
                    Carregando favoritos...
                </div>) : guitars.length === 0 ? (<div className="empty-favorites">
                    <div>♡</div>

                    <h2>
                        Nenhuma guitarra favorita
                    </h2>

                    <p>
                        Adicione guitarras aos favoritos
                        para vê-las aqui.
                    </p>

                    <button onClick={onBack}>
                        Explorar catálogo
                    </button>
                </div>) : (<div className="favorite-list">
                    {guitars.map((guitar) => (<article
                            className="favorite-row"
                            key={guitar.id}
                            onClick={() => onDetails(guitar.id)}
                        >
                            <div className="mini-guitar">
                                🎸
                            </div>

                            <div className="favorite-main">
                <span>
                  {guitar.brand}
                </span>

                                <h3>
                                    {guitar.model}
                                </h3>
                            </div>

                            <div className="favorite-spec">
                                <span>TIPO</span>

                                <strong>
                                    {guitar.guitarType || '-'}
                                </strong>
                            </div>

                            <div className="favorite-spec">
                                <span>ANO</span>

                                <strong>
                                    {guitar.launchYear || '-'}
                                </strong>
                            </div>

                            <div className="favorite-spec">
                                <span>ARTISTA</span>

                                <strong>
                                    {guitar.mostFamousUser || '-'}
                                </strong>
                            </div>

                            <button
                                onClick={(event) => {
                                    event.stopPropagation()
                                    onToggleFavorite(guitar.id)
                                }}
                                aria-label="Remover dos favoritos"
                            >
                                ♥
                            </button>
                        </article>))}
                </div>)}
        </section>)
}

export default Favorites