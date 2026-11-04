import { useState } from 'react'
import { dummyBooks } from '../data/dummy-books'
import './homepage.css'

export function Homepage() {

    const [allBooks, setAllBooks] = useState(dummyBooks)
    const [inputText, setInputText] = useState('')
    const [appliedSearch, setAppliedSearch] = useState('')

    function saveInputText(event) {
        setInputText(event.target.value)
    }

    function findBook() {
        setAppliedSearch(inputText.trim().toLowerCase())
    }

    // use seperate array to filter, allBooks should not be modified
    const displayedBooks = appliedSearch ?
        allBooks.filter((book) => book.title.toLowerCase().includes(appliedSearch))
        : allBooks

    return (
        <>
            <header className="page-header">
                <h1>Library Catalog</h1>
                <p className="page-subtitle">Browse and explore books available in the collection</p>
            </header>

            <div className='head-container'>
                <div className='search-container'>
                    <input
                        className='search-bar'
                        placeholder='Search book title'
                        onChange={saveInputText}
                        value={inputText}
                        onKeyDown={(e) => e.key === 'Enter' && findBook()}
                    ></input>
                    <button
                        className='search-button'
                        onClick={findBook}
                    >search</button>
                </div>
                <button className='sort-item'>sorts</button>
            </div>

            <h4>Available Titles</h4>

            {displayedBooks.length > 0 ? (
                <div className="item-container">
                    {displayedBooks.map((book) => {
                        return (
                            <div
                                className="book-card"
                                key={book.book_id}
                            >
                                <img
                                    src={book.cover_image_url}
                                    alt="picture"
                                />
                                <div className="book-info">
                                    <span className="book-title">{book.title}</span>
                                    <span className="book-author">{book.author}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : (
                <div className="no-results-card">
                    <h3>No books found</h3>
                    <p>We couldn't find any titles matching "{inputText}". Try searching a different name.</p>
                </div>
            )}


        </>
    )
}
