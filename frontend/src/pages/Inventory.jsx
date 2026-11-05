import { FilterComponent } from '../components/inventory/FilterComponent'
import { InventoryTable } from '../components/inventory/InventoryTable'
import { StatCards } from '../components/inventory/StatCards'
import './inventory.css'

export function Inventory() {
    return (
        <>
            <header className="page-header">
                <h1>Book Management & Inventory</h1>
                <p className="page-subtitle">Add, edit, track stock, and organize books across the library collection.</p>
            </header>

            <StatCards />
            <FilterComponent />

            <InventoryTable />

        </>
    )
}
