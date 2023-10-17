import React, { useState,useEffect, useContext } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from 'react-infinite-scroll-component';
import EndMessage from './EndMessage';
import SearchKeyword from './SearchKeyword';
import { LocalArticles } from '../sample/SampleArticles';
import Maincontext from '../Context/MainContext';
import Skeleton from './Skeleton';
import FetchMoreSkeleton from './FetchMoreSkeleton';
import { useLocation } from 'react-router-dom';

  const News = ({name,country="in",category='general',language,type,sortBy})=>{ 

    const [loading, setLoading] = useState(true)
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [searchBox, setSearchBox] = useState(false);
    const [searchKeywords, setSearchKeywords] = useState("")
    const [fetchMoreSkeleton,SetFetchMoreSkeleton] = useState(true);
    const [noteWarning,setNoteWarning] = useState(false);

    const {setProgress,apiKey,pageSize}= useContext(Maincontext);

    const location = useLocation();

  useEffect(() => {
    // console.log(`The current route is ${location.pathname}`);
    window.scroll(0,0);
  }, [location]);

    useEffect(() => { 
      if(type==="everything"){
        setSearchBox(true);
      }
      else{
        setSearchBox(false);
        return () =>updateNews(); //for development purpose so that api doesn't get called twice
      }
    }, [])

    useEffect(() => {          
      document.title = `${capitalizeFirstLetter(name==='general' ?'Top Headlines' : name)} - NewsFeed`;
    }, [category])
    
    const capitalizeFirstLetter = (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const  updateNews = async()=>{  
      setProgress(10);
      setLoading(true);
      const apiUrl= `https://newsapi.org/v2/${type}?q=${type==="everything" ? searchKeywords :""}&country=${country}&category=${category}&language=${language}&sortBy=${sortBy}&apiKey=${apiKey}&page=${page}&pageSize=${pageSize}`;

      try{
        let response= await fetch(apiUrl);
        // const status = 404;
        // if(status===200){
          if(response.status===200 ){
            var data= await response.json();
            // console.log(data);
            // console.log(data.totalResults);
            setArticles(data.articles);
            setTotalResults(data.totalResults);
            setNoteWarning(false);
          }
          else{
            setArticles(LocalArticles);
            setTotalResults(LocalArticles.length)
            setNoteWarning(true);
      }
    }
      catch(error){
        console.log(error);
    }

    setProgress(40);
    setProgress(70);
    setLoading(false);
    setProgress(100);
    }

      const fetchMoreData = async ()=>{
      const url = `https://newsapi.org/v2/${type}?q=${type === "everything" ? searchKeywords :""}&country=${country}&category=${category}&language=${language}&sortBy=${sortBy}&apiKey=${apiKey}&page=${page+1}&pageSize=${pageSize}`;
      try{
        let response= await fetch(url);
        if(response.status===200){
          // if(response.status!==404 && response.status!==426 && response.status!==429){
          // console.log(response.status)
        setPage( page + 1)
        let data = await response.json();
        setArticles( [...articles,...data.articles])
        // setArticles( articles?.concat(data.articles))
        setTotalResults( data.totalResults);
        // console.log('more data fetched');
        }
        else{
          SetFetchMoreSkeleton(false);
        }
      }
      catch(error){
        console.log(error);
    }
    }

    return (
      <>
        <h1 className='text-center' style={{margin: "70px 0px 15px 0px"}}>NewsFeed - Top {capitalizeFirstLetter(name!=="general" ? name :'')} Headlines</h1>
        {searchBox && <SearchKeyword searchKeywords={searchKeywords} setSearchKeywords={setSearchKeywords} updateNews={updateNews} />}
        {/* {noteWarning && <>  <br /> <h1 className='text-center '>NOTE : Following content is not real-time News updates </h1> <br /> </>} */}
        {(loading && type!== "everything") && (<Skeleton/>)}

        <InfiniteScroll
        dataLength={articles?.length}
        next={fetchMoreData}
        // hasMore={articles?.length !== totalResults && articles?.length<pageSize}
        hasMore={articles?.length !== totalResults && articles?.length<100}
        // loader={<Skeleton/>}
        endMessage={<EndMessage loading={loading} articles={articles} SetFetchMoreSkeleton={SetFetchMoreSkeleton}/>}
        >

        <div className="container">
        <div className="row">
        {articles?.filter((element) => element.url !== 'https://removed.com').map((element)=>{
          // if(element.url==='https://removed.com') {console.log("fault cards triggered")}
          return  <div className="col-md-4 " key={element?.url}> 
            <NewsItem title={element?.title?element?.title :""} description={element?.description?element?.description :""}  newsUrl={element?.url} imageUrl={element?.urlToImage} author={element?.author} date={element?.publishedAt} source={ element?.source?.name}/>
            {/* {console.log(articles.length) } */}
            {/* { console.log( index-1)} */}
            {/* {articles.length== (index+1) &&
            } */}
            </div>
        })}
          {/* {!hasMore && <FetchMoreSkeleton/>} */}
          {fetchMoreSkeleton && <FetchMoreSkeleton/>}
        </div>
        </div>
        </InfiniteScroll>
        {/* {!fetchMoreSkeleton && <EndMessage loading={loading} articles={articles} SetFetchMoreSkeleton={SetFetchMoreSkeleton}/>} */}
    </>
    )
  }
export default News;
