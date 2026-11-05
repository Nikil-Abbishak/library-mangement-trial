import { useEffect, useState } from 'react'
// import { dummyBooks } from '../data/dummy-books'
import { fetchAllBooks } from '../services/bookService'
import { InputText } from '../components/homepage/InputText'
import { BookComponent } from '../components/homepage/BookComponent'
import { LoadingSpinner } from '../components/loading/LoadingSpinner'
import './homepage.css'

export function Homepage() {
    // save all books
    const [allBooks, setAllBooks] = useState([])
    // save input text from search input
    const [inputText, setInputText] = useState('')
    // save searching keyword
    const [appliedSearch, setAppliedSearch] = useState('')
    // loading state
    const [isLoading, setIsLoading] = useState(true)

    // Fetch all books at initial render
    useEffect(() => {
        async function loadAllbooks() {
            try {
                setIsLoading(true)
                const data = await fetchAllBooks()
                setAllBooks(data)
            } catch (err) {
                console.error(err)
            } finally {
                setIsLoading(false)
            }
        }

        loadAllbooks()
    }, [])

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
            />

            {/* Centered Loading Spinner or Content */}
            {isLoading ? (
                <div className="homepage-loading-area">
                    <LoadingSpinner message="Loading library catalog..." size="lg" />
                </div>
            ) : (
                <BookComponent
                    inputText={inputText}
                    allBooks={allBooks}
                    appliedSearch={appliedSearch}
                />
            )}
        </div>
    )
}
