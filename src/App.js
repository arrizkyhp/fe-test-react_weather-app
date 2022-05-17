import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Days from './pages/Days';
import Home from './pages/Home';

function App() {
  return (
    <div className="bg-slate-300 min-h-screen h-full font-poppins">
      <div className='container mx-auto max-w-4xl pt-3 pb-10'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/day" element={<Days />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
