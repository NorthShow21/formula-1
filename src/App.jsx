import './App.css'
import Home from './pages/home'
import Drivers from './pages/drivers'
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import Schedule from './pages/schedule';
import Result from './pages/result';
import { Routes, Route } from 'react-router-dom'
import Footer from './components/Footer';
import Article from './pages/article';
import Prediction from './pages/prediction';
import DriverDetails from './pages/driverdetails';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';

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
          <Route path='/article' element={<Article />} />
          <Route path='/prediction' element={<Prediction />} />
          <Route path='/driverdetails' element={<DriverDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path='/profile' element={<Profile />} />
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
