import { useState } from 'react'
import { dummyBooks } from '../data/dummy-books'
import './homepage.css'

export function Homepage() {

    const [books, setBooks] = useState(dummyBooks);
    const [inputText, setInputText] = useState('');


    console.log(books.length)

    function saveInputText(event) {
        setInputText(event.target.value)
    }

    function findBook() {
        if (inputText) {
            const filteredBooks = books.filter((book) => {
                return (book.title).includes(inputText.trim())
            })
            setBooks(filteredBooks)

            return
        }

        setBooks(dummyBooks)
    }

    return (
        <>
            <header className="page-header">
                <h1>Library Catalog</h1>
                <p className="page-subtitle">Browse and explore books available in the collection</p>
            </header>
            <div className='search-container'>
                <input
                    className='search-bar'
                    placeholder='Search book title'
                    onChange={saveInputText}
                ></input>
                <button
                    className='search-button'
                    onClick={findBook}
                >search</button>
            </div>
            <h4>Available Titles</h4>

            <div className="item-container">
                {books.map((book) => {
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
        </>
    )
}
