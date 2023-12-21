import { useState } from 'react';
import './App.css';
import Topbar from './components/common/Topbar';
import LoginModal from './components/common/LoginModal';

function App() {
  const [showLogin,setShowLogin]=useState(false)
  return (
    <div className="App">
      <Topbar setShowLogin={setShowLogin}/>
      <LoginModal modalValue={showLogin} setShowLogin={setShowLogin}/>
    </div>
  );
}

export default App;
