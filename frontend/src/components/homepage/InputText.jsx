import './inputText.css'

export function InputText({ inputText, setInputText, setAppliedSearch, filterBy, setFilterBy }) {

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

            <div className='sort-item'>
                filter By
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
