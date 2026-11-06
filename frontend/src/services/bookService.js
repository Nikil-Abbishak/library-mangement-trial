import { API_BASE_URL } from "../config/api";

export async function fetchAllBooks() {
    const response = await fetch(`${API_BASE_URL}/api/books`)

    if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.statusText}`)
    }

    return await response.json()
}

// = {} uses as a fallback default value of an empty object in case no argument is passed at all
export async function filterBooks({ search, status, language } = {}) {

    //building URLs with query parameters
    const params = new URLSearchParams();

    if (search) { params.append('search', search) }
    if (status) { params.append('status', status) }
    if (language) { params.append('language', language) }

    const queryString = params.toString()

    // console.log(queryString)

    // check for queryString has passed or not
    const url = queryString ? `${API_BASE_URL}/api/books?${queryString}` : `${API_BASE_URL}/api/books`

    // console.log(url)

    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.statusText}`)
    }

    return await response.json()


}

// create new book with POST method
export async function addNewBook(data) {
    const response = await fetch(`${API_BASE_URL}/api/books`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    )

    if (!response.ok) {
        if (response.status === 500 || response.status === 409) {
            throw new Error('A book with this ISBN already exists or the data is invalid.')
        }
        throw new Error(`Failed to post: ${response.statusText}`)
    }

    return await response.json()
}

export async function getStats() {
    const response = await fetch(`${API_BASE_URL}/api/books/stats`)

    if (!response.ok) {
        throw new Error('Failed to fetch : ', response.statusText)
    }

    return await response.json()
}