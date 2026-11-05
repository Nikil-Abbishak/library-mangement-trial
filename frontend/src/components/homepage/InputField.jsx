import './inputField.css'

export function InputField({ inputText, setInputText, setAppliedSearch, filterBy, setFilterBy }) {

    function saveInputText(event) {
        setInputText(event.target.value)
    }

    function searchBook() {
        setAppliedSearch(inputText.trim())
    }

    function selectFiltering(event) {
        setFilterBy(event.target.value)
    }

    return (
        <div className='head-container'>
            <div className='search-container'>
                <input
                    className='search-bar'
                    placeholder='Search book title or author'
                    onChange={saveInputText}
                    value={inputText}
                    onKeyDown={(e) => e.key === 'Enter' && searchBook()}
                />

                <button
                    className='search-button'
                    onClick={searchBook}
                >
                    search
                </button>
            </div>

            <div className="sort-item" aria-label="Filter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>
            </div>
            <select
                className='sort-item dropdown'
                value={filterBy}
                onChange={selectFiltering}
            >
                <option value="">-- select --</option>
                <option value="English">English</option>
                <option value="Sinhala">Sinhala</option>
                <option value="Tamil">Tamil</option>
            </select>
        </div>
    )
}
