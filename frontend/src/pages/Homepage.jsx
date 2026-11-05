import { useEffect, useState } from 'react'
import { filterBooks } from '../services/bookService'
import { InputText } from '../components/homepage/InputText'
import { BookComponent } from '../components/homepage/BookComponent'
import { LoadingSpinner } from '../components/loading/LoadingSpinner'
import './homepage.css'

export function Homepage() {
    // Books list fetched from server
    const [books, setBooks] = useState([])
    // Search input text state
    const [inputText, setInputText] = useState('')
    // Applied search keyword sent to server
    const [appliedSearch, setAppliedSearch] = useState('')
    // Loading state
    const [isLoading, setIsLoading] = useState(true)
    // Filter books by language
    const [filterBy, setFilterBy] = useState('')

    // Centralized server-side fetch: runs on mount and whenever search or filter changes
    useEffect(() => {
        let isMounted = true

        async function loadBooks() {
            try {
                setIsLoading(true)
                const data = await filterBooks({
                    search: appliedSearch,
                    language: filterBy
                })
                if (isMounted) {
                    setBooks(data)
                }
            } catch (err) {
                console.error('Failed to load books:', err)
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadBooks()

        return () => {
            isMounted = false
        }
    }, [appliedSearch, filterBy])

    return (
        <div className="homepage-container">
            <header className="page-header">
                <h1>Library Catalog</h1>
                <p className="page-subtitle">Browse and explore books available in the collection</p>
            </header>

            {/* Search bar and sorting */}
            <InputText
                inputText={inputText}
                setInputText={setInputText}
                setAppliedSearch={setAppliedSearch}
                filterBy={filterBy}
                setFilterBy={setFilterBy}
            />

            {/* Centered Loading Spinner or Content */}
            {isLoading ? (
                <div className="homepage-loading-area">
                    <LoadingSpinner message="Loading library catalog..." size="lg" />
                </div>
            ) : (
                <BookComponent
                    books={books}
                    appliedSearch={appliedSearch}
                    filterBy={filterBy}
                />
            )}
        </div>
    )
}
