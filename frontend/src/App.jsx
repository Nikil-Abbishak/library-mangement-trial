import { Routes, Route } from 'react-router-dom'
import { Homepage } from './pages/Homepage'
import './App.css'
import { Inventory } from './pages/Inventory'

function App() {

  return (
    <>
      {/* Routing for pages */}
      <Routes>
        <Route index element={<Homepage />} />
        <Route path='/edit' element={<Inventory />} />
      </Routes>
    </>
  )
}

export default App
