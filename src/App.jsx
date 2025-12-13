import './App.css'
import Home from './pages/home'
import Drivers from './pages/drivers'
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Schedule from './pages/schedule';
import Result from './pages/result';
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer';

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
          <Route path='/schedule' element={<Schedule />} />
          <Route path='/result' element={<Result />} />
        </Routes>
      </main>
      <footer className='app-footer'>
        <Footer />
      </footer>
      <BottomNav />
    </div>
  );
}

export default App
