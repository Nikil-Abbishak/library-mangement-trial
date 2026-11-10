import { useEffect, useState } from 'react'
import { filterBooks } from '../services/bookService'
import { InputField } from '../components/homepage/InputField'
import { BookComponent } from '../components/homepage/BookComponent'
import { LoadingSpinner } from '../components/loading/LoadingSpinner'
import './homepage.css'

export function Homepage() {
    // Books list fetched from server
    const [books, setBooks] = useState([])
    // Page number based on the height
    const [pageNumber, setPageNumber] = useState(1)
    // Search input text state
    const [inputText, setInputText] = useState('')
    // Applied search keyword sent to server
    const [appliedSearch, setAppliedSearch] = useState('')
    // Filter books by language
    const [filterBy, setFilterBy] = useState('')
    // check for more pages
    const [totalPages, setTotalPages] = useState(0)
    // Loading state
    const [isLoading, setIsLoading] = useState(true)

    // add initial eventListener when scrolls with cleaning function
    useEffect(() => {

        // checks the screen height to reach the bottom
        function handleScroll() {
            // values to calculate the screen width when reaches the screen bottom
            let innerHeight = window.innerHeight
            let scrollHeight = document.documentElement.scrollHeight
            let scrollTop = document.documentElement.scrollTop

            // console.log(innerHeight, scrollHeight, scrollTop)
            if (innerHeight + scrollTop + 1 >= scrollHeight) {
                setPageNumber(prev => prev >= totalPages && totalPages > 0 ? prev : prev + 1)
                console.log(innerHeight, scrollHeight, scrollTop)
            }
        }

        document.addEventListener('scroll', handleScroll)
        return () => {
            document.removeEventListener('scroll', handleScroll)
        }
    }, [totalPages])

    //runs on mount and whenever search or filter changes
    useEffect(() => {
        let isMounted = true

        async function loadBooks() {
            try {
                setIsLoading(true)
                const data = await filterBooks({
                    search: appliedSearch,
                    language: filterBy,
                    page: pageNumber,
                    limit: 7
                })
                if (isMounted) {
                    setBooks(prev => pageNumber === 1 ? data.data : [...prev, ...data.data])
                    setTotalPages(data.totalPages)
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
    }, [appliedSearch, filterBy, pageNumber])

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
            {/* isLoading true only on the initial loading (pageNumber = 1) */}
            {isLoading && pageNumber === 1 ? (
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
