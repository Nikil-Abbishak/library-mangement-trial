import './statCards.css'

export function StatCards() {
    return (
        <div className="stats-grid">
            <div className="stat-card">
                <span className="stat-title">Total Books</span>
                <span className="stat-value">1,248</span>
            </div>

            <div className="stat-card">
                <span className="stat-title">Available Books</span>
                <span className="stat-value">982</span>
            </div>
        </div>
    )
}