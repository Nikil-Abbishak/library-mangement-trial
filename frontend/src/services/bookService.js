import { API_BASE_URL } from "../config/api";

export async function fetchAllBooks() {
    const response = await fetch(`${API_BASE_URL}/api/books`)

    if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.statusText}`)
    }

    return response.json()
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

    return response.json()


}