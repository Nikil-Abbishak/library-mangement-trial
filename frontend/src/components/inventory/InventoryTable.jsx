import { Fragment } from 'react'
import { Pencil, Trash2, BookImage } from 'lucide-react'
import './inventoryTable.css'

export function InventoryTable({ books }) {
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
                    {books.map((book) => {
                        return (
                            <Fragment key={book.isbn}>
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
                                    <td><span className={book.status === 'Available' ? "badge badge-available" : 'badge badge-borrowed'}>{book.status}</span></td>
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
                    })}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="pagination">
                <span className="pagination-info">Showing 1 to 5 of 1,248 entries</span>
                <div className="pagination-controls">
                    <button className="pagination-btn" disabled>&larr; Previous</button>
                    <button className="pagination-btn">Next &rarr;</button>
                </div>
            </div>
        </div>
    )
}