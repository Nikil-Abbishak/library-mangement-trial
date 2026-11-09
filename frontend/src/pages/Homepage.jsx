import { useEffect, useState } from 'react'
import { filterBooks } from '../services/bookService'
import { InputField } from '../components/homepage/InputField'
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
    // Filter books by language
    const [filterBy, setFilterBy] = useState('')
    // Loading state
    const [isLoading, setIsLoading] = useState(true)

    //runs on mount and whenever search or filter changes
    useEffect(() => {
        let isMounted = true

        async function loadBooks() {
            try {
                setIsLoading(true)
                const data = await filterBooks({
                    search: appliedSearch,
                    language: filterBy,
                    limit: 5
                })
                if (isMounted) {
                    setBooks(data.data)
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
                <p className="page-subtitle">
                    Browse and explore books available in the collection
                </p>
            </header>

            {/* Search bar and sorting */}
            <InputField
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
