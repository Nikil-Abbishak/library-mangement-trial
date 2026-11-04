import './inputText.css'

export function InputText({ inputText, setInputText, setAppliedSearch }) {

    function saveInputText(event) {
        setInputText(event.target.value)
    }

    function findBook() {
        setAppliedSearch(inputText.trim().toLowerCase())
    }

    return (
        <div className='head-container'>
            <div className='search-container'>
                <input
                    className='search-bar'
                    placeholder='Search book title'
                    onChange={saveInputText}
                    value={inputText}
                    onKeyDown={(e) => e.key === 'Enter' && findBook()}
                ></input>
                <button
                    className='search-button'
                    onClick={findBook}
                >search</button>
            </div>
            <button className='sort-item'>sort</button>
        </div>
    )
}