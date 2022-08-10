// Shubhambohra2003@gmail.com : 4a92330d3bc64b9e8db888ea42edb5b8
// En20cs302045@medicaps.ac.in : d013396a078d4581b4e4e565cf6f3e3f
import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import propTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {

  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  }
  static propTypes = {
    name: propTypes.string,
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string,

  }

    articles = [
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
    
    capitalizeFirstLetter = (string)=> {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state= {
            articles: this.articles,
            // articles: [],
            loading: false,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async updateNews(){
      this.props.setProgress(10);
      window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading: true})
      let data= await fetch(url);
      this.props.setProgress(40);
      let parsedData = await data.json();
      this.props.setProgress(70);
      this.setState({articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false})
      this.props.setProgress(100);
      // // console.log(parsedData);
      //  console.log(url);
      // console.log(url);

        }
        
        async componentDidMount(){
          // this.updateNews();
        }
      
      handlePrevClick = async ()=>{
      this.setState({page: this.state.page - 1},this.updateNews);
      }
      handleNextClick = async ()=>{ 
      this.setState({page: (this.state.page + 1)},this.updateNews);
    }
    
    fetchMoreData = async ()=>{
      this.setState({page: (this.state.page + 1)}, async ()=>{

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data= await fetch(url);
        let parsedData = await data.json();
        this.setState({articles: this.state.articles.concat(parsedData.articles), totalResults: parsedData.totalResults})
        // console.log(this.state.page);
        console.log(this.state.articles.length);
        console.log(this.state.totalResults);
      });
    }

      render() {
    return (
      // <div className='container my-3'>
      <>
        <h1 className='text-center'>NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
        {/* <div className="container d-flex justify-content-between">
          <button type='button' className='btn btn-dark'onClick={this.handlePrevClick} disabled={this.state.page <=1}> &larr; Previous</button>
          <button type='button' className='btn btn-dark'onClick={this.handleNextClick} disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)}>Next &rarr; </button>
        </div> */}
        {this.state.loading && <Spinner/>}
        <InfiniteScroll
        dataLength={this.state.articles.length}
        next={this.fetchMoreData}
        hasMore={this.state.articles.length !== this.state.totalResults}
        loader={<Spinner/>}
        // loader={<h4>Loading...</h4>}
        >

        <div className="container">
        <div className="row">
        {/* {!this.state.loading && this.state.articles.map((element)=>{ */}
        {this.state.articles.map((element,pos)=>{
          
          // return  <div className="col-md-4 " key={pos}>
           return  <div className="col-md-4 " key={element.url}> 
            <NewsItem title={element.title?element.title :""} description={element.description?element.description :""}  newsUrl={element.url} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>
        })}
        </div>
        </div>
        </InfiniteScroll>

        {/* {!this.state.loading && 
        <div className="container d-flex justify-content-between">
        <button type='button' className='btn btn-dark'onClick={this.handlePrevClick} disabled={this.state.page <=1}> &larr; Previous</button>
        <button type='button' className='btn btn-dark'onClick={this.handleNextClick} disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)}>Next &rarr; </button>
        </div>
      } */}
    </>
      // </div> 
    )
  }
}

export default News