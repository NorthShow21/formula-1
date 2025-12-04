import './App.css'
import Home from './pages/home'
import Drivers from './pages/drivers'
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import { Routes, Route } from 'react-router-dom'

function App() {


  return (
    <div>
      <header className='app-header'>
        <Header />
      </header>
      <main className='main-content'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/drivers' element={<Drivers />} />
        </Routes>
      </main>
      <BottomNav />
    </div>
  );
}

export default App
