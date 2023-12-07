import logo from './logo.svg';
import './App.css';
import{ createContext, useState } from 'react';
import Posts from './components/Posts';

const userId = createContext(null)
function App() {
  return (
    <div className="App">
      <userId.Provider value='1'>
        <Posts/>
      </userId.Provider>
    </div>
  );
}

export default App;
