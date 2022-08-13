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
    const pageSize= 100;
  
    return (
      <>
        <BrowserRouter>
      <LoadingBar
        color='#f11946'
        progress={progress}
        />
        <Navbar/>
      <Routes>
        <Route exact path='/' element={<News setProgress ={setProgress}  apiKey={apiKey} key="general" name="general" pageSize={pageSize} country="in" category="general" language="en" type="top-headlines" sortBy="" />} />
        <Route exact path='/business' element={<News setProgress ={setProgress}  apiKey={apiKey} key="business" name="business" pageSize={pageSize} country="in" category="business" language="en" type="top-headlines" sortBy="" />} />
        <Route exact path='/entertainment' element={<News setProgress ={setProgress}  apiKey={apiKey} key="entertainment" name="entertainment" pageSize={pageSize} country="in" category="entertainment" language="en" type="top-headlines" sortBy="" />} />
        <Route exact path='/health' element={<News setProgress ={setProgress}  apiKey={apiKey} key="health" name="health" pageSize={pageSize} country="in" category="health" language="en" type="top-headlines" sortBy="" />} />
        <Route exact path='/science' element={<News setProgress ={setProgress}  apiKey={apiKey} key="science" name="science" pageSize={pageSize} country="in" category="science" language="en" type="top-headlines" sortBy="" />} />
        <Route exact path='/sports' element={<News setProgress ={setProgress}  apiKey={apiKey} key="sports" name="sports" pageSize={pageSize} country="in" category="sports" language="en" type="top-headlines" sortBy="" />} />
        <Route exact path='/technology' element={<News setProgress ={setProgress}  apiKey={apiKey} key="technology" name="technology" pageSize={pageSize} country="in" category="technology" language="en" type="top-headlines" sortBy=""  />}/>
        <Route exact path='/global' element={<News setProgress ={setProgress}  apiKey={apiKey} key="global" name="global" pageSize={pageSize} country="" category="" language="en" type="top-headlines" sortBy="publishedAt" />} />
        <Route exact path='/keyword' element={<News setProgress ={setProgress}  apiKey={apiKey} key="keyword" name="keyword" pageSize={pageSize} country="" category="" language="en" type="everything" sortBy="publishedAt" />} />
      </Routes>
        </BrowserRouter>
      </>
    )
  }