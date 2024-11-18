export const baseUrl = import.meta.env.VITE_API_URL

export const fetchPOSTFactory = (url: string, data: any): Promise<any> => {
    return fetch(url,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    ).then(res => res.json())
}

export const fetchDELETEFactory = (url: string, data: any): Promise<any> => {
    return fetch(url,
        {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    ).then(res => res.json())
}