import './App.css';
// function App() {
//   return ();}
// export default App;

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';

export default class App extends Component {
  render() {
    return (
      <>
      <Navbar/>
      <News/>
      </>
    )
  }
}
