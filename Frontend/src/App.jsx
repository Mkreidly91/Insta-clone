import { useState } from 'react';
import { Router, Routes, Route } from 'react-router-dom';
import './App.css';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import DashBoard from './pages/Dashboard';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/dashBoard" element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
