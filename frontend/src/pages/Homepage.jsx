import { useEffect, useState } from 'react'
// import { dummyBooks } from '../data/dummy-books'
import { fetchAllBooks } from '../services/bookService'
import { InputText } from '../components/homepage/InputText'
import { BookComponent } from '../components/homepage/BookComponent'
import './homepage.css'

export function Homepage() {
    // save all books
    const [allBooks, setAllBooks] = useState([])
    // save input text from search input
    const [inputText, setInputText] = useState('')
    // save searching keyword
    const [appliedSearch, setAppliedSearch] = useState('')

    // Fetch all books at initial render
    useEffect(() => {
        async function loadAllbooks() {
            try {
                const data = await fetchAllBooks()
                setAllBooks(data)
                console.log(allBooks)
            } catch (err) {
                console.log(err)
            }
        }

        loadAllbooks()
    }, [])

    return (
        <>
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

            {/* Component to display books */}
            <BookComponent
                inputText={inputText}
                allBooks={allBooks}
                appliedSearch={appliedSearch}
            />

        </>
    )
}
