import './MiniCart.css'

const formatPrice = (price) => {
    const value = Number(price)
    if (!Number.isFinite(value)) return 'Preço indisponível'
    return new Intl.NumberFormat('en-US', {
        style: 'currency', currency: 'USD', maximumFractionDigits: 0,
    }).format(value)
}

export default function MiniCart({ open, items, onClose, onChangeQuantity, onRemove, onViewCart, onContinueShopping }) {
    if (!open) return null

    const count = items.reduce((sum, item) => sum + item.quantity, 0)
    const total = items.reduce((sum, item) => sum + (Number(item.guitar?.priceusd) || 0) * item.quantity, 0)

    return (
        <div className="mini-cart-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
            <aside className="mini-cart-drawer" role="dialog" aria-modal="true" aria-labelledby="mini-cart-title">
                <header className="mini-cart-header">
                    <div><span className="mini-cart-eyebrow">RIFF STORE</span><h2 id="mini-cart-title">Seu carrinho <span>({count})</span></h2></div>
                    <button className="mini-cart-close" onClick={onClose} aria-label="Fechar carrinho">×</button>
                </header>

                {items.length === 0 ? (
                    <div className="mini-cart-empty"><span>🛒</span><h3>Seu carrinho está vazio</h3><p>Encontre sua próxima guitarra favorita.</p><button onClick={onContinueShopping}>EXPLORAR CATÁLOGO</button></div>
                ) : (
                    <>
                        <div className="mini-cart-items">
                            {items.map((item) => (
                                <article className="mini-cart-item" key={item.guitarId}>
                                    <div className="mini-cart-image">{item.guitar?.imageUrl ? <img src={item.guitar.imageUrl} alt={item.guitar?.model || 'Guitarra'} /> : <span>🎸</span>}</div>
                                    <div className="mini-cart-item-info">
                                        <span className="mini-cart-brand">{item.guitar?.brand || 'Guitarra'}</span>
                                        <strong>{item.guitar?.model || `Guitarra #${item.guitarId}`}</strong>
                                        <span className="mini-cart-price">{formatPrice(item.guitar?.priceusd)}</span>
                                        <div className="mini-cart-controls">
                                            <label>Qtd.
                                                <select aria-label={`Quantidade de ${item.guitar?.model || 'guitarra'}`} value={item.quantity} onChange={(event) => onChangeQuantity(item.guitarId, Number(event.target.value))}>
                                                    {Array.from({ length: 10 }, (_, i) => i + 1).map((quantity) => <option key={quantity} value={quantity}>{quantity}</option>)}
                                                </select>
                                            </label>
                                            <button onClick={() => onRemove(item.guitarId)}>Remover</button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                        <footer className="mini-cart-footer">
                            <div className="mini-cart-total"><span>Subtotal estimado</span><strong>{formatPrice(total)}</strong></div>
                            <p>Frete e demais valores não incluídos.</p>
                            <button className="mini-cart-primary" onClick={onViewCart}>VER CARRINHO E FINALIZAR</button>
                            <button className="mini-cart-secondary" onClick={onContinueShopping}>CONTINUAR COMPRANDO</button>
                        </footer>
                    </>
                )}
            </aside>
        </div>
    )
}
