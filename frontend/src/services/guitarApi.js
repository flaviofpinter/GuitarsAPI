const API_URL = 'http://localhost:18080'

export async function getGuitars(brand = '') {
    const url = brand ? `${API_URL}/guitars?brand=${encodeURIComponent(brand)}` : `${API_URL}/guitars`

    const response = await fetch(url)

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