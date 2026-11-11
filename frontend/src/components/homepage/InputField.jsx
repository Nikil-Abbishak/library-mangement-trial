import './inputField.css'

export function InputField({ inputText, setInputText, setAppliedSearch, filterBy, setFilterBy }) {

    function saveInputText(event) {
        setInputText(event.target.value)
    }

    function searchBook() {
        setAppliedSearch(inputText.trim())
    }

    function clearSearch() {
        setInputText('')
        setAppliedSearch('')
    }

    function selectFiltering(event) {
        setFilterBy(event.target.value)
    }

    return (
        <div className='head-container'>
            {/* Search Input Bar */}
            <div className='search-container'>
                <svg className="search-leading-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>

                <input
                    className='search-bar'
                    placeholder='Search title or author...'
                    onChange={saveInputText}
                    value={inputText}
                    onKeyDown={(e) => e.key === 'Enter' && searchBook()}
                    aria-label="Search book title or author"
                />

                {inputText && (
                    <button
                        type="button"
                        className="clear-button"
                        onClick={clearSearch}
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}

                <button
                    type="button"
                    className='search-button'
                    onClick={searchBook}
                    aria-label="Search"
                >
                    <span className="search-button-text">Search</span>
                    <svg className="search-button-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                </button>
            </div>

            {/* Unified Filter Dropdown */}
            <div className={`filter-wrapper ${filterBy ? 'filter-active' : ''}`}>
                <svg className="filter-leading-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>

                <select
                    className='filter-select'
                    value={filterBy}
                    onChange={selectFiltering}
                    aria-label="Filter by language"
                >
                    <option value="">All Languages</option>
                    <option value="English">English</option>
                    <option value="Sinhala">Sinhala</option>
                    <option value="Tamil">Tamil</option>
                </select>

                <svg className="filter-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </div>
        </div>
    )
}
