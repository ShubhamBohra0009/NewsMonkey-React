import './App.css';
import LoadingBar from 'react-top-loading-bar';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import ReactDOM from "react-dom/client";
import {BrowserRouter,Routes,Route,} from "react-router-dom";

  export default function App() {
    
    const [progress, setProgress] = useState(0) ;
    let apiKey= process.env.REACT_APP_NEWS_API_2;
    const pageSize= 20;
  
    return (
      <div>
        <BrowserRouter>
      <LoadingBar
        color='#f11946'
        progress={progress}
        />
        <Navbar/>
      <Routes>
        <Route exact path='/' element={<News setProgress ={setProgress}  apiKey={apiKey} key="general" pageSize={pageSize} country="in" category="general"/>} />
        <Route exact path='/business' element={<News setProgress ={setProgress}  apiKey={apiKey} key="business" pageSize={pageSize} country="in" category="business"/>} />
        <Route exact path='/entertainment' element={<News setProgress ={setProgress}  apiKey={apiKey} key="entertainment" pageSize={pageSize} country="in" category="entertainment"/>} />
        <Route exact path='/health' element={<News setProgress ={setProgress}  apiKey={apiKey} key="health" pageSize={pageSize} country="in" category="health"/>} />
        <Route exact path='/science' element={<News setProgress ={setProgress}  apiKey={apiKey} key="science" pageSize={pageSize} country="in" category="science"/>} />
        <Route exact path='/sports' element={<News setProgress ={setProgress}  apiKey={apiKey} key="sports" pageSize={pageSize} country="in" category="sports"/>} />
        <Route exact path='/technology' element={<News setProgress ={setProgress}  apiKey={apiKey} key="technology" pageSize={pageSize} country="in" category="technology"/>} />
      </Routes>
        </BrowserRouter>
      </div>
    )
}
