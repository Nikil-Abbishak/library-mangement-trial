import { Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/Homepage'
import './App.css'
import { Inventory } from './pages/Inventory'
import { Navbar } from './components/Navbar'

function App() {
  return (
    <div className="app-layout">
      {/* Sidebar Navigation */}
      <Navbar />

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
