import { useState } from 'react'
import './inputText.css'

export function InputText({ inputText, setInputText, setAppliedSearch }) {

    const [sortBy, setSortBy] = useState('title')

    function saveInputText(event) {
        setInputText(event.target.value)
    }

    function searchBook() {
        setAppliedSearch(inputText.trim().toLowerCase())
    }

    function selectSorting(event) {
        setSortBy(event.target.value)
    }

    return (
        <div className='head-container'>
            <div className='search-container'>
                <input
                    className='search-bar'
                    placeholder='Search book title'
                    onChange={saveInputText}
                    value={inputText}
                    onKeyDown={(e) => e.key === 'Enter' && searchBook()}
                />

                <button
                    className='search-button'
                    onClick={searchBook}
                >search</button>
            </div>
            <div className='sort-item'>
                Sort by
            </div>
            <select
                className='sort-item dropdown'
                value={sortBy}
                onChange={selectSorting}
            >
                <option value="title">Title</option>
                <option value="language">Language</option>
            </select>

        </div>
    )
}