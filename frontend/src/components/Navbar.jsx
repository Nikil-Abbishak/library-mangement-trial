import { useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { Home, BookOpen, Menu } from "lucide-react"
import './navbar.css'

export function Navbar({ isOpen: propIsOpen, onToggle: propOnToggle }) {
    const [internalOpen, setInternalOpen] = useState(true)
    const isControlled = propIsOpen !== undefined
    const isOpen = isControlled ? propIsOpen : internalOpen

    const handleToggle = () => {
        if (propOnToggle) {
            propOnToggle()
        } else {
            setInternalOpen(prev => !prev)
        }
    }

    // update the active class's name 
    function getNavlinkClass({ isActive }) {
        return (
            isActive ? 'nav-item active' : 'nav-item'
        )
    }

    return (
        <>
            {/* Backdrop on mobile when sidebar is open */}
            {isOpen && (
                <div
                    className="sidebar-backdrop"
                    onClick={handleToggle}
                    aria-hidden="true"
                />
            )}

            {/* Floating button with 3 lines to show sidebar when hidden */}
            {!isOpen && (
                <button
                    type="button"
                    className="nav-toggle-btn floating"
                    onClick={handleToggle}
                    aria-label="Show navigation"
                    title="Show navigation"
                >
                    <Menu size={22} />
                </button>
            )}

            <nav className={`sidebar ${!isOpen ? 'hidden' : ''}`}>
                {/* side bar title & toggle button */}
                <div className="nav-header">
                    <div className="nav-header-row">
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
                        <button
                            type="button"
                            className="nav-toggle-btn"
                            onClick={handleToggle}
                            aria-label="Hide navigation"
                            title="Hide navigation"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
                {/* navlinks for pages */}
                <div className="nav-links">
                    <NavLink
                        to='/'
                        end
                        className={getNavlinkClass}
                        onClick={() => {
                            if (window.innerWidth <= 768 && isOpen) {
                                handleToggle()
                            }
                        }}
                    >
                        <Home className="nav-item-icon" size={20} />
                        <span>Home</span>
                    </NavLink>
                    <NavLink
                        to='/inventory'
                        end
                        className={getNavlinkClass}
                        onClick={() => {
                            if (window.innerWidth <= 768 && isOpen) {
                                handleToggle()
                            }
                        }}
                    >
                        <BookOpen className="nav-item-icon" size={20} />
                        <span>Manage Books</span>
                    </NavLink>
                </div>
            </nav>
        </>
    )
}
