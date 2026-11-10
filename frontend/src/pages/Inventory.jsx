import { useEffect, useState } from 'react'
import { AddBook } from '../components/inventory/AddBook'
import { FilterComponent } from '../components/inventory/FilterComponent'
import { InventoryTable } from '../components/inventory/InventoryTable'
import { StatCards } from '../components/inventory/StatCards'
import './inventory.css'
import { filterBooks } from '../services/bookService'

export function Inventory() {
    const [books, setBooks] = useState([])
    const [page, setPage] = useState(1)
    const [limit] = useState(5)
    const [total, setTotal] = useState(0)
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function loadBooks() {
            setLoading(true)
            try {
                const response = await filterBooks({ page, limit })
                setBooks(response.data || [])
                setTotal(response.total || 0)
                setTotalPages(response.totalPages || 1)
            } catch (error) {
                console.error("Failed to load books:", error)
            } finally {
                setLoading(false)
            }
        }

        loadBooks()
    }, [page, limit])

    return (
        <>
            <header className="page-header">
                <h1>Book Management & Inventory</h1>
                <p className="page-subtitle">Add, edit, track stock, and organize books across the library collection.</p>
            </header>

            <StatCards />
            <FilterComponent />
            <AddBook />
            <InventoryTable
                books={books}
                page={page}
                limit={limit}
                total={total}
                totalPages={totalPages}
                onPageChange={(newPage) => setPage(newPage)}
            />
        </>
    )
}
