import { useEffect, useState } from 'react'
import './statCards.css'
import { getStats } from '../../services/bookService'

export function StatCards() {

    const [stats, setStats] = useState({})
    const [loading, isLoading] = useState(false)

    useEffect(() => {
        async function loadStats() {
            try {
                isLoading(true)
                const data = await getStats()
                setStats(data)
            } catch (err) {
                console.error('Failed to fetch stats ', err)
            } finally {
                isLoading(false)
            }
        }
        loadStats()
    }, [])
    return (
        <div className="stats-grid">
            <div className="stat-card">
                <span className="stat-title">Total Books</span>
                <span className="stat-value">{loading ? 'Loading' : stats.total_books}</span>
            </div>

            <div className="stat-card">
                <span className="stat-title">Available Books</span>
                <span className="stat-value">{loading ? 'Loading' : stats.available_books}</span>
            </div>
        </div>
    )
}