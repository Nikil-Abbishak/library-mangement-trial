import './bookComponent.css'

export function BookComponent({ allBooks, appliedSearch }) {

    // use seperate array to filter, allBooks should not be modified
    const displayedBooks = appliedSearch ?
        allBooks.filter((book) => book.title.toLowerCase().includes(appliedSearch))
        : allBooks

    return (
        <>
            <h4>Available Titles</h4>

            {/* Checks the length size and display error message if not found */}
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
                    <p>We couldn't find any titles matching "{appliedSearch}". Try searching a different name.</p>
                </div>
            )}
        </>
    )
}