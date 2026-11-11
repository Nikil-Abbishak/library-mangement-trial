import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/Homepage'
import './App.css'
import { Inventory } from './pages/Inventory'
import { Navbar } from './components/Navbar'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 768
    }
    return true
  })

  return (
    <div className={`app-layout ${!isSidebarOpen ? 'sidebar-hidden' : ''}`}>
      {/* Sidebar Navigation */}
      <Navbar isOpen={isSidebarOpen} onToggle={() => setIsSidebarOpen(prev => !prev)} />

      {/* Main Content Area */}
      <main className="main-content">
        <Routes>
          <Route index element={<Homepage />} />
          <Route path='/inventory' element={<Inventory />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
