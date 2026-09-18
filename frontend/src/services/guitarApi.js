const API_URL = 'http://localhost:18080'

export async function getGuitars(brand = '', limit = 0, offset = 0) {
    const params = new URLSearchParams({
        brand,
        limit: String(limit),
        offset: String(offset)
    })

    const response = await fetch(`${API_URL}/guitars?${params}`)

    if (!response.ok) {
        throw new Error('Erro ao buscar guitarras')
    }

    return response.json()
}

export async function getGuitar(id) {
    const response = await fetch(`${API_URL}/guitars/${id}`)

    if (!response.ok) {
        throw new Error('Erro ao buscar guitarra')
    }

    return response.json()
}

export async function createGuitar(guitar) {
    const response = await fetch(`${API_URL}/guitars/new`, {
        method: 'POST', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(guitar),
    })

    if (!response.ok) {
        throw new Error('Erro ao cadastrar guitarra')
    }

    return response.json()
}