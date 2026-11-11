import { Fragment } from 'react'
import { Pencil, Trash2, BookImage } from 'lucide-react'
import './inventoryTable.css'

export function InventoryTable({
    books = [],
    page = 1,
    limit = 5,
    total = 0,
    totalPages = 1,
    onPageChange
}) {

    const startIndex = total === 0 ? 0 : (page - 1) * limit + 1
    const endIndex = Math.min(page * limit, total)

    return (
        <div className="table-container">
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th className="th-cover">Cover</th>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Status</th>
                        <th>Language</th>
                        <th className="th-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.length === 0 ? (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center', padding: '32px', color: '#64748b' }}>
                                No books found.
                            </td>
                        </tr>
                    ) : (
                        books.map((book) => {
                            return (
                                <Fragment key={book.isbn || book.id}>
                                    <tr>
                                        <td className="td-cover">
                                            {book.cover_image_url ? (
                                                <img
                                                    src={book.cover_image_url}
                                                    alt={book.title || 'Book cover'}
                                                    className="book-cover-img"
                                                />
                                            ) : null}
                                            <div
                                                className="book-cover-placeholder"
                                                style={{ display: book.cover_image_url ? 'none' : 'flex' }}
                                            >
                                                <BookImage size={18} />
                                            </div>
                                        </td>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.isbn}</td>
                                        <td>
                                            <span className={book.status === 'Available' ? "badge badge-available" : 'badge badge-borrowed'}>
                                                {book.status}
                                            </span>
                                        </td>
                                        <td>{book.language}</td>
                                        <td className="td-actions">
                                            <button className="btn-action btn-edit" title="Edit book" aria-label="Edit book">
                                                <Pencil size={15} />
                                            </button>
                                            <button className="btn-action btn-delete" title="Delete book" aria-label="Delete book">
                                                <Trash2 size={15} />
                                            </button>
                                        </td>
                                    </tr>
                                </Fragment>
                            )
                        })
                    )}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <span className="pagination-info">
                    Showing {startIndex} to {endIndex} of {total} entries
                </span>
                <div className="pagination-controls">
                    <button
                        className="pagination-btn"
                        onClick={() => onPageChange && onPageChange(page - 1)}
                        disabled={page <= 1}
                    >
                        Previous
                    </button>
                    <span style={{ fontSize: '0.875rem', color: '#475569', padding: '0 8px' }}>
                        Page {page} of {totalPages || 1}
                    </span>
                    <button
                        className="pagination-btn"
                        onClick={() => onPageChange && onPageChange(page + 1)}
                        disabled={page >= totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}