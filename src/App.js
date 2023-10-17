import LoadingBar from 'react-top-loading-bar';
import React, {  useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import {BrowserRouter,Routes,Route, useNavigate, useLocation,} from "react-router-dom";
import Maincontext from './Context/MainContext'

  export default function App() {
    
    const [progress, setProgress] = useState(0) ;

    let apiKey= process.env.REACT_APP_NEWS_API_2;
    const pageSize= 50;
  
    return (
      <>
        <BrowserRouter>
        <Maincontext.Provider value={{setProgress,apiKey,pageSize}} >
      <LoadingBar color='#f11946' progress={progress}/>
        <Navbar />
      <Routes>
        <Route exact path='/' element={<News key="general" name="general" country="in" category="general" language="en" type="top-headlines" sortBy="" />} />
        <Route exact path='/business' element={<News key="business" name="business" country="in" category="business" language="en" type="top-headlines" sortBy="" />} />
        <Route exact path='/entertainment' element={<News key="entertainment" name="entertainment" country="in" category="entertainment" language="en" type="top-headlines" sortBy="" />} />
        <Route exact path='/health' element={<News key="health" name="health" country="in" category="health" language="en" type="top-headlines" sortBy="" />} />
        <Route exact path='/science' element={<News key="science" name="science" country="in" category="science" language="en" type="top-headlines" sortBy="" />} />
        <Route exact path='/sports' element={<News key="sports" name="sports" country="in" category="sports" language="en" type="top-headlines" sortBy="" />} />
        <Route exact path='/technology' element={<News key="technology" name="technology" country="in" category="technology" language="en" type="top-headlines" sortBy=""  />}/>
        <Route exact path='/global' element={<News key="global" name="global" country="" category="" language="en" type="top-headlines" sortBy="publishedAt" />} />
        <Route exact path='/keyword' element={<News key="keyword" name="keyword" country="" category="" language="en" type="everything" sortBy="publishedAt" />} />
      </Routes>
        </Maincontext.Provider>
        </BrowserRouter>
      </>
    )
  }