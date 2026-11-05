import { Pencil, Trash2 } from 'lucide-react'
import './inventoryTable.css'

export function InventoryTable() {
    return (
        <div className="table-container">
            <table className="inventory-table">
                <thead>
                    <tr>
                        <th>Book Title</th>
                        <th>Author</th>
                        <th>ISBN</th>
                        <th>Status</th>
                        <th>Language</th>
                        <th className="th-actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Clean Code</td>
                        <td>Robert C. Martin</td>
                        <td>9780132350884</td>
                        <td><span className="badge badge-available">Available</span></td>
                        <td>English</td>
                        <td className="td-actions">
                            <button className="btn-action btn-edit" title="Edit book" aria-label="Edit book">
                                <Pencil size={15} />
                            </button>
                            <button className="btn-action btn-delete" title="Delete book" aria-label="Delete book">
                                <Trash2 size={15} />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Designing Data-Intensive Applications</td>
                        <td>Martin Kleppmann</td>
                        <td>9781491950357</td>
                        <td><span className="badge badge-available">Available</span></td>
                        <td>English</td>
                        <td className="td-actions">
                            <button className="btn-action btn-edit" title="Edit book" aria-label="Edit book">
                                <Pencil size={15} />
                            </button>
                            <button className="btn-action btn-delete" title="Delete book" aria-label="Delete book">
                                <Trash2 size={15} />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>You Don't Know JS: Scope & Closures</td>
                        <td>Kyle Simpson</td>
                        <td>9781449335588</td>
                        <td><span className="badge badge-borrowed">Borrowed</span></td>
                        <td>English</td>
                        <td className="td-actions">
                            <button className="btn-action btn-edit" title="Edit book" aria-label="Edit book">
                                <Pencil size={15} />
                            </button>
                            <button className="btn-action btn-delete" title="Delete book" aria-label="Delete book">
                                <Trash2 size={15} />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>The Pragmatic Programmer</td>
                        <td>Andrew Hunt, David Thomas</td>
                        <td>9780135957059</td>
                        <td><span className="badge badge-available">Available</span></td>
                        <td>English</td>
                        <td className="td-actions">
                            <button className="btn-action btn-edit" title="Edit book" aria-label="Edit book">
                                <Pencil size={15} />
                            </button>
                            <button className="btn-action btn-delete" title="Delete book" aria-label="Delete book">
                                <Trash2 size={15} />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td>Refactoring</td>
                        <td>Martin Fowler</td>
                        <td>9780134757599</td>
                        <td><span className="badge badge-reserved">Reserved</span></td>
                        <td>English</td>
                        <td className="td-actions">
                            <button className="btn-action btn-edit" title="Edit book" aria-label="Edit book">
                                <Pencil size={15} />
                            </button>
                            <button className="btn-action btn-delete" title="Delete book" aria-label="Delete book">
                                <Trash2 size={15} />
                            </button>
                        </td>
                    </tr>
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