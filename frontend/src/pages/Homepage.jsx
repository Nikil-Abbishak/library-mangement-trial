import { Fragment } from 'react'
import { books } from '../data/dummy-books'
import './homepage.css'

export function Homepage() {
    return (
        <>
            <header className="page-header">
                <h1>Library Catalog</h1>
                <p className="page-subtitle">Browse and explore books available in the collection</p>
            </header>
            <h4>Available Titles</h4>

            <div className="item-container">
                {books.map((book) => {
                    return (
                        <Fragment key={book.book_id}>
                            <div className="book-card">
                                <img
                                    src={book.cover_image_url}
                                    alt="picture"
                                />
                                <div className="book-info">
                                    <span className="book-title">{book.title}</span>
                                    <span className="book-author">{book.author}</span>
                                </div>
                            </div>
                        </Fragment>
                    )
                })}
            </div>
        </>
    )
}
