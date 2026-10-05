
import './App.css'
import Home from './Pages/Home.jsx'
import Auth from './Pages/Auth.jsx'
import Checkout from './Pages/Checkout.jsx'
import { Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import AuthProvider from './context/AuthContext.jsx'

function App() {
  return (
    <AuthProvider>
    <div className='app'>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </div></AuthProvider>
  )
}

export default App
