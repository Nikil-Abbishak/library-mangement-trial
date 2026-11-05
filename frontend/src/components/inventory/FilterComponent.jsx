import './filterComponent.css'

export function FilterComponent() {
    return (
        <div className="inventory-actions-toolbar">
            <button className="btn-add-book">
                <span className="btn-icon">+</span> Add New Book
            </button>
            <div className="search-input-wrapper">
                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
                <input
                    type="text"
                    placeholder="Search by Title, Author, or ISBN..."
                    className="search-input"
                />
            </div>
            <button className="btn-filter" aria-label="Filter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
            </button>
            <div className="select-wrapper">
                <select className="select-dropdown" defaultValue="all">
                    <option value="all">Genre: All</option>
                </select>
            </div>
            <div className="select-wrapper">
                <select className="select-dropdown" defaultValue="all">
                    <option value="all">Status: All</option>
                </select>
            </div>
        </div>
    )
}