import { useEffect, useState } from 'react'
import { AddBook } from '../components/inventory/AddBook'
import { FilterComponent } from '../components/inventory/FilterComponent'
import { InventoryTable } from '../components/inventory/InventoryTable'
import { StatCards } from '../components/inventory/StatCards'
import './inventory.css'
import { fetchAllBooks } from '../services/bookService'

export function Inventory() {
    const [books, setBooks] = useState([])

    useEffect(() => {
        async function loadBooks() {

            const data = await fetchAllBooks();

            setBooks(data.data)
            console.log(data)
        }

        loadBooks()
    }, [])

    return (
        <>
            <header className="page-header">
                <h1>Book Management & Inventory</h1>
                <p className="page-subtitle">Add, edit, track stock, and organize books across the library collection.</p>
            </header>

            <StatCards />
            <FilterComponent />
            <AddBook />
            <InventoryTable books={books} />

        </>
    )
}
