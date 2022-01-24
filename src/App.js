import React from 'react';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Homepage from './screens/Homepage';
import Css from './App.css'
import Verify from './screens/VerifyOtp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/verify-otp" element={<Verify/>}/>
      </Routes>
    </Router>
  );
}

export default App;
