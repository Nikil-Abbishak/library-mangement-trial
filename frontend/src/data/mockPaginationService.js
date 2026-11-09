import mockBooks from './mock-books.json'

/**
 * Simulates a paginated server response using the mock books dataset.
 *
 * @param {Object} options
 * @param {number} [options.page=1] - 1-based page index
 * @param {number} [options.limit=4] - Number of items per chunk/page
 * @param {string} [options.search=''] - Keyword to filter title or author
 * @param {string} [options.language=''] - Language filter (e.g. 'English', 'Sinhala')
 * @param {string} [options.status=''] - Status filter ('Available' or 'Borrowed')
 * @returns {Promise<{
 *   data: Array<object>,
 *   page: number,
 *   limit: number,
 *   total: number,
 *   totalPages: number,
 *   hasMore: boolean
 * }>}
 */
export async function getMockPaginatedBooks({
    page = 1,
    limit = 4,
    search = '',
    language = '',
    status = ''
} = {}) {
    // Optional fake network delay (e.g., 300ms)
    await new Promise((resolve) => setTimeout(resolve, 300))

    // 1. Filter dataset according to parameters
    let filtered = [...mockBooks]

    if (search) {
        const query = search.toLowerCase()
        filtered = filtered.filter(
            (b) =>
                b.title.toLowerCase().includes(query) ||
                b.author.toLowerCase().includes(query) ||
                b.isbn.includes(query)
        )
    }

    if (language) {
        filtered = filtered.filter((b) => b.language.toLowerCase() === language.toLowerCase())
    }

    if (status) {
        filtered = filtered.filter((b) => b.status.toLowerCase() === status.toLowerCase())
    }

    // 2. Compute pagination numbers
    const total = filtered.length
    const totalPages = Math.ceil(total / limit) || 1
    const safePage = Math.max(1, page)

    // 3. Slice chunk
    const startIndex = (safePage - 1) * limit
    const chunkData = filtered.slice(startIndex, startIndex + limit)

    return {
        data: chunkData,
        page: safePage,
        limit,
        total,
        totalPages,
        hasMore: safePage < totalPages
    }
}

