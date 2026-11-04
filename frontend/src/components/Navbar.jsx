import { Link, NavLink } from "react-router-dom"
import './navbar.css'

export function Navbar() {

    // update the active class's name 
    function getNavlinkClass({ isActive }) {
        return (
            isActive ? 'nav-item active' : 'nav-item'
        )
    }
    return (
        <nav className="sidebar">
            {/* side bar title */}
            <div className="nav-header">
                <Link to='/'>
                    <div className="nav-header-brand">
                        <svg
                            className="nav-header-icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                        >
                            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                        </svg>
                        <h1>LMS</h1>
                    </div>
                </Link>
            </div>
            {/* navlinks for pages */}
            <div className="nav-links">
                <NavLink to='/' end className={getNavlinkClass}>
                    Home
                </NavLink>
                <NavLink to='/inventory' end className={getNavlinkClass}>
                    Manage Books
                </NavLink>
            </div>
        </nav >
    )
}
