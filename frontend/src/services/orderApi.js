// Configure VITE_API_BASE_URL no .env com a URL completa até o recurso de pedidos.
// Ex.: http://localhost:18080/sua-aplicacao/api/orders
const API_BASE_URL = ('http://localhost:18080/orders').replace(/\/$/, '');

async function readResponse(response) {
    if (!response.ok) {
        const details = await response.text().catch(() => '');
        throw new Error(details || `Erro HTTP ${response.status}`);
    }
    return response.json();
}

export async function createOrder(items) {
    // O backend espera { items: [{ guitarId, quantity }, ...] }.
    const payload = {
        items: items.map(({ guitarId, quantity }) => ({
            guitarId: Number(guitarId),
            quantity: Number(quantity),
        })),
    };

    const response = await fetch(`${API_BASE_URL}/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
    });
    return readResponse(response);
}

export async function getPendingOrders() {
    const response = await fetch(`${API_BASE_URL}/pending`, {
        headers: { 'Accept': 'application/json' },
    });
    return readResponse(response);
}