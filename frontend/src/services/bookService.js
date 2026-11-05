import { API_BASE_URL } from "../config/api";

export async function fetchAllBooks() {
    const response = await fetch(`${API_BASE_URL}/api/books`)

    if (!response.ok) {
        throw new Error(`Failed to fetch books: ${response.statusText}`)
    }

    return response.json()
}