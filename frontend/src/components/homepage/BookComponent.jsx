import './bookComponent.css'

export function BookComponent({ books, appliedSearch, filterBy }) {
    return (
        <>
            <h4>Available Titles</h4>

            {books && books.length > 0 ? (
                <div className="item-container">
                    {books.map((book) => {
                        return (
                            <div
                                className="book-card"
                                key={book.book_id}
                            >
                                <img
                                    src={book.cover_image_url}
                                    alt={book.title || 'Book cover'}
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
                    <p>
                        {appliedSearch && filterBy
                            ? `We couldn't find any "${filterBy}" titles matching "${appliedSearch}".`
                            : appliedSearch
                                ? `We couldn't find any titles matching "${appliedSearch}". Try searching a different name.`
                                : filterBy
                                    ? `No books found for language "${filterBy}".`
                                    : `There are currently no books available in the collection.`}
                    </p>
                </div>
            )}
        </>
    )
}
