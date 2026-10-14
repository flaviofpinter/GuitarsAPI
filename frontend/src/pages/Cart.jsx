import { useEffect, useState } from 'react';
import { createOrder, getPendingOrders } from '../services/orderApi';
import './Cart.css';

const formatPrice = (price) => {
    const value = Number(price);
    if (!Number.isFinite(value)) return 'Preço indisponível';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);
};

export default function Cart({ items, onChangeQuantity, onRemove, onBackToCatalog, onBackHome, onOrderCreated }) {
    const [pendingOrders, setPendingOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(false);
    const [ordersError, setOrdersError] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    async function loadPendingOrders() {
        setLoadingOrders(true);
        setOrdersError('');
        try {
            const data = await getPendingOrders();
            setPendingOrders(Array.isArray(data) ? data : []);
        } catch (e) {
            setOrdersError(e.message || 'Não foi possível carregar os pedidos pendentes.');
        } finally {
            setLoadingOrders(false);
        }
    }

    useEffect(() => { loadPendingOrders(); }, []);

    async function handleCheckout() {
        setError('');
        setMessage('');
        if (!items.length) { setError('Adicione pelo menos uma guitarra ao carrinho.'); return; }
        const validItems = items.every((item) => Number.isInteger(Number(item.guitarId)) && Number(item.quantity) > 0);
        if (!validItems) { setError('Há itens com ID ou quantidade inválidos.'); return; }
        setSubmitting(true);
        try {
            const orderId = await createOrder(items.map((item) => ({ guitarId: Number(item.guitarId), quantity: Number(item.quantity) })));
            setMessage(`Pedido criado com sucesso. Número do pedido: ${orderId}`);
            onOrderCreated?.();
            await loadPendingOrders();
        } catch (e) {
            setError(e.message || 'Não foi possível finalizar o pedido.');
        } finally {
            setSubmitting(false);
        }
    }

    const total = items.reduce((sum, item) => sum + (Number(item.guitar?.priceusd) || 0) * item.quantity, 0);
    const count = items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);

    return (
        <main className="catalog-content cart-page">
            <div className="details-breadcrumb">
                <button className="back-link-btn" onClick={onBackToCatalog}>← CONTINUAR COMPRANDO</button>
            </div>

            <header className="cart-heading">
                <div>
                    <span className="catalog-badge">RIFF STORE / SUA SELEÇÃO</span>
                    <h1>Seu carrinho<span style={{ color: '#e34242' }}>.</span></h1>
                    <p>Confira sua seleção antes de confirmar o pedido.</p>
                </div>
                <span className="cart-step">01&nbsp; / &nbsp;REVISÃO DO PEDIDO</span>
            </header>

            {items.length === 0 ? (
                <section className="cart-empty-state">
                    <div className="cart-empty-icon">🛒</div>
                    <h2>Seu próximo riff começa aqui.</h2>
                    <p>Seu carrinho está vazio. Explore o catálogo e encontre sua próxima guitarra.</p>
                    <button className="cart-empty-btn" onClick={onBackToCatalog}>EXPLORAR CATÁLOGO&nbsp; →</button>
                </section>
            ) : (
                <section className="cart-layout">
                    <div className="cart-items-list">
                        {items.map((item) => (
                            <article className="cart-item" key={item.guitarId}>
                                <div className="cart-item-media">
                                    {item.guitar?.imageUrl ? <img src={item.guitar.imageUrl} alt={item.guitar.model || 'Guitarra'} /> : <div className="media-placeholder">🎸</div>}
                                </div>
                                <div className="cart-item-body">
                                    <div className="cart-item-topline"><span className="brand-tag">{item.guitar?.brand || 'RIFF STORE'}</span></div>
                                    <h2 className="product-title">{item.guitar?.model || `Guitarra #${item.guitarId}`}</h2>
                                    <p className="cart-item-meta">Preço unitário · {formatPrice(item.guitar?.priceusd)}</p>
                                    <div className="cart-item-controls">
                                        <label className="quantity-control">Quantidade
                                            <input type="number" min="1" max="99" value={item.quantity} onChange={(e) => onChangeQuantity(item.guitarId, Math.min(99, Math.max(1, Number(e.target.value) || 1)))} />
                                        </label>
                                        <button className="cart-remove" onClick={() => onRemove(item.guitarId)}>✕ &nbsp; REMOVER</button>
                                    </div>
                                </div>
                            </article>
                        ))}
                        <p style={{ color: '#a9a4a0', fontSize: 12, margin: '6px 2px 0' }}>Você pode alterar as quantidades ou remover itens antes de finalizar.</p>
                    </div>

                    <aside className="cart-summary">
                        <span className="cart-summary-kicker">RESUMO</span>
                        <h2>Resumo do pedido</h2>
                        <div className="cart-summary-line"><span>Produtos</span><strong>{count} {count === 1 ? 'item' : 'itens'}</strong></div>
                        <div className="cart-summary-line"><span>Subtotal estimado</span><strong>{formatPrice(total)}</strong></div>
                        <div className="cart-summary-line"><span>Frete</span><strong>A calcular</strong></div>
                        <div className="cart-summary-total"><span>Total estimado</span><strong>{formatPrice(total)}</strong></div>
                        <p className="cart-summary-note">Valores exibidos em USD conforme o catálogo. O total não inclui frete ou outros encargos.</p>
                        <button className="cart-checkout-btn" disabled={submitting} onClick={handleCheckout}>{submitting ? 'ENVIANDO PEDIDO…' : 'CONFIRMAR PEDIDO  →'}</button>
                        <p className="cart-secure-note"><span>◆</span> Seu pedido será registrado no sistema para acompanhamento.</p>
                    </aside>
                </section>
            )}

            {message && <p role="status" className="cart-alert cart-success">✓ &nbsp;{message}</p>}
            {error && <p role="alert" className="cart-alert cart-error">{error}</p>}

            <section className="pending-orders-section">
                <div className="pending-orders-header">
                    <div><span className="cart-summary-kicker">ACOMPANHAMENTO</span><h2>Pedidos pendentes</h2><p>Pedidos já registrados no sistema que ainda estão pendentes.</p></div>
                    <button className="cart-outline-btn" onClick={loadPendingOrders} disabled={loadingOrders}>{loadingOrders ? 'ATUALIZANDO…' : '↻ &nbsp; ATUALIZAR'}</button>
                </div>
                {ordersError && <p role="alert" className="cart-alert cart-error">{ordersError}</p>}
                {loadingOrders && <p className="pending-empty">Carregando pedidos…</p>}
                {!loadingOrders && !ordersError && pendingOrders.length === 0 && <p className="pending-empty">Nenhum pedido pendente encontrado.</p>}
                {pendingOrders.map((order, index) => (
                    <article className="pending-order" key={order.id ?? order.orderId ?? index}>
                        <strong>Pedido #{order.id ?? order.orderId ?? '—'}</strong>
                        <span className="pending-status">{order.status ?? 'Pendente'}</span>
                        {order.orderDate && <span>Data: {order.orderDate}</span>}
                        {order.totalPrice != null && <span>Total: {formatPrice(order.totalPrice)}</span>}
                    </article>
                ))}
            </section>
        </main>
    );
}
