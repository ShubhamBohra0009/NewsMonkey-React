// Shubhambohra2003@gmail.com : 4a92330d3bc64b9e8db888ea42edb5b8
// En20cs302045@medicaps.ac.in : d013396a078d4581b4e4e565cf6f3e3f
import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

  const News = (props)=>{ 
    
    let articlesList = [
        {
          "source": { "id": "bbc-sport", "name": "BBC Sport" },
          "author": "BBC Sport",
          "title": "Shane Warne memorial - watch & follow updates",
          "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
          "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
          "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
          "publishedAt": "2022-03-30T08:22:26.498888Z",
          "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
        },
        {
          "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
          "author": null,
          "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
          "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
          "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
          "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
          "publishedAt": "2020-04-27T11:41:47Z",
          "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
        },
        {
          "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
          "author": null,
          "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
          "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
          "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
          "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
          "publishedAt": "2020-03-30T15:26:05Z",
          "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
        }
        
      ]
    const [articles, setArticles] = useState([])
    // const [articles, setArticles] = useState([articlesList])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    
    
    const capitalizeFirstLetter = (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // document.title = `${capitalizeFirstLetter(props.category)} - NewsMonkey`;


    const  updateNews = async()=>{
      props.setProgress(10);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      setLoading(true);
      let data= await fetch(url);
      props.setProgress(40);
      let parsedData = await data.json();
      props.setProgress(70);
      setArticles(parsedData.articles);
      setTotalResults(parsedData.totalResults);
      setLoading(false);
      props.setProgress(100);
        }
        
        useEffect(() => {          
          updateNews();
        }, [])
        useEffect(() => {          
          articlesConcat();
        }, [page])
        
      
    // const handlePrevClick = async ()=>{
    //   setPage( page - 1,updateNews);
    // }
    // const handleNextClick = async ()=>{ 
    //     // setPage( page + 1);
    //     // updateNews();
    //     setPage( page + 1,updateNews());
    // }
    
    const articlesConcat = async ()=>{

      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
      let data= await fetch(url);
      let parsedData = await data.json();
      setArticles( articles.concat(parsedData.articles))
      setTotalResults( parsedData.totalResults);
    }
    const fetchMoreData = async ()=>{
      setPage( page + 1)
  }

    return (
      <>
        <h1 className='text-center'>NewsMonkey - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
        {/* <div className="container d-flex justify-content-between">
          <button type='button' className='btn btn-dark'onClick={handlePrevClick} disabled={page <=1}> &larr; Previous</button>
          <button type='button' className='btn btn-dark'onClick={handleNextClick} disabled={page+1 > Math.ceil(totalResults/props.pageSize)}>Next &rarr; </button>
        </div> */}
        {loading && <Spinner/>}
        <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<Spinner/>}
        >

        <div className="container">
        <div className="row">
        {/* {!loading && articles.map((element)=>{ */}
        {articles.map((element)=>{
          
           return  <div className="col-md-4 " key={element.url}> 
            <NewsItem title={element.title?element.title :""} description={element.description?element.description :""}  newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

        {/* {!loading && 
        <div className="container d-flex justify-content-between">
        <button type='button' className='btn btn-dark'onClick={handlePrevClick} disabled={page <=1}> &larr; Previous</button>
        <button type='button' className='btn btn-dark'onClick={handleNextClick} disabled={page+1 > Math.ceil(totalResults/props.pageSize)}>Next &rarr; </button>
        </div>
      } */}
    </>
      // </div> 
    )
  }

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
}
News.propTypes = {
  name: propTypes.string,
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
}

export default News