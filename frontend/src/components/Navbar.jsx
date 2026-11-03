import { NavLink } from "react-router-dom"
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
                <h2>LMS</h2>
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
        </nav>
    )
}
