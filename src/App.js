import './App.css';
import React from 'react';
import Posts from './components/Posts';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Todos from './components/Todos';

const userContext = React.createContext();

function App() {
 const userId=3
  return (
    <userContext.Provider value={userId}>
      <div className="App">
          <ToastContainer/>
          <NavBar/>
          <Routes>
            <Route path="/" exact element={<Posts/>} />
            <Route path="/todos" element={<Todos/>} />
          </Routes>
      </div>
    </userContext.Provider>
  );
}

export default App;
export {userContext}