import React, { useState,useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';
import EndMessage from './EndMessage';
import SearchKeyword from './SearchKeyword';

  const News = (props)=>{ 
    
    // let articles = [
    //     {
    //       "source": { "id": "bbc-sport", "name": "BBC Sport" },
    //       "author": "BBC Sport",
    //       "title": "Shane Warne memorial - watch & follow updates",
    //       "description": "Watch live coverage and follow text updates and tributes from the state memorial for Australian cricket legend Shane Warne at the Melbourne Cricket Ground.",
    //       "url": "http://www.bbc.co.uk/sport/live/cricket/60916236",
    //       "urlToImage": "https:////m.files.bbci.co.uk/modules/bbc-morph-sport-seo-meta/1.22.0/images/bbc-sport-logo.png",
    //       "publishedAt": "2022-03-30T08:22:26.498888Z",
    //       "content": "Former England bowler and BBC cricket presenter Isa Guha, who became a colleague of Warne's in the commentary box: \"It has been a strange few weeks - a lot of shock and then we did our own tribute at… [+396 chars]"
    //     },
    //     {
    //       "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
    //       "author": null,
    //       "title": "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //       "description": "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //       "url": "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //       "publishedAt": "2020-04-27T11:41:47Z",
    //       "content": "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]"
    //     },
    //     {
    //       "source": { "id": "espn-cric-info", "name": "ESPN Cric Info" },
    //       "author": null,
    //       "title": "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //       "description": "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //       "url": "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //       "urlToImage": "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //       "publishedAt": "2020-03-30T15:26:05Z",
    //       "content": "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]"
    //     }
        
    //   ]
    const [loading, setLoading] = useState(true)
    const [articles, setArticles] = useState([])
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)
    const [searchBox, setSearchBox] = useState(false)
    const [searchKeywords, setSearchKeywords] = useState("")
    
    const capitalizeFirstLetter = (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    const  updateNews = async()=>{  
      props.setProgress(10);
      setLoading(true);
      await fetch(  `https://newsapi.org/v2/${props.type}?q=${props.type=== "everything" ? searchKeywords :""}&country=${props.country}&category=${props.category}&language=${props.language}&sortBy=${props.sortBy}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`)
      .then(res =>{ return  res.json()})
      .then(
        data => {
          setArticles(data.articles),
          setTotalResults(data.totalResults)
        }
        )
      .catch(err=> console.log(err));
      props.setProgress(40);
      props.setProgress(70);
      setLoading(false);
      props.setProgress(100);
    }

    useEffect(() => { 
      if(props.type==="everything"){
        setSearchBox(true);
      }
      else{
        setSearchBox(false);
        updateNews();
      }
    }, [])

    useEffect(() => {          
      document.title = `${capitalizeFirstLetter(props.name)} - NewsMonkey`;
    }, [props.category])
        
    const fetchMoreData = async ()=>{
      const url = `https://newsapi.org/v2/${props.type}?q=${props.type === "everything" ? searchKeywords :""}&country=${props.country}&category=${props.category}&language=${props.language}&sortBy=${props.sortBy}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage( page + 1)
      let data= await fetch(url);
      let parsedData = await data.json();
      setArticles( articles.concat(parsedData.articles))
      setTotalResults( parsedData.totalResults);
    }

    return (
      <>
        <h1 className='text-center' style={{margin: "70px 0px 15px 0px"}}>NewsMonkey - Top {capitalizeFirstLetter(props.name)} Headlines</h1>
        {searchBox && <SearchKeyword setSearchBox={setSearchBox} setSearchKeywords={setSearchKeywords} updateNews={updateNews} />}
        {(loading && props.type!== "everything") && (<Spinner/>)}

        <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults && articles.length<100}
        loader={<Spinner/>}
        endMessage={<EndMessage loading={loading} articles={articles}/>}>

        <div className="container">
        <div className="row">
        {articles.map((element)=>{
          return  <div className="col-md-4 " key={element.url}> 
            <NewsItem title={element.title?element.title :""} description={element.description?element.description :""}  newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={ element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>
    </>
    )
  }

News.defaultProps = {
  country: "in",
  pageSize: 38,
  category: "general",
}
News.propTypes = {
  name: propTypes.string,
  country: propTypes.string,
  pageSize: propTypes.number,
  category: propTypes.string,
}
export default News