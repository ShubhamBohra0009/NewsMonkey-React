import React, { Component } from 'react'
import inf from "./Inf.jpg"

export class NewsItem extends Component {
  constructor(props){
    super(props);
    this.state= { title_readMores : false};
    this.state= { readMores : false};
    // if(!this.props.description){
    //   console.log(this.props.description);
    // }
  }
  render() {
    let {title, description,imageUrl,newsUrl,author,date,source}= this.props;
    // const [readMores, setReadMores] = useState(false)

    // console.log(this.state)
    return (
      <div className='my-3'>
        <div className="card" >
          <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right: "0"}}>
          <span className='badge rounded-pill bg-danger' > {source}</span>
          </div>
        {/* <div className="card" style={{width: "18rem"}}> */}
        {/* <img src={!imageUrl? "https://res.cloudinary.com/teepublic/image/private/s--79EwJk3z--/t_Preview/b_rgb:000000,c_limit,f_auto,h_630,q_90,w_630/v1608236443/production/designs/17519845_0.jpg" :imageUrl} className="card-img-top" style={{maxHeight:"160.88px"}} alt="..."/> */}
        <img   src={!imageUrl? inf :imageUrl} className="card-img-top"  alt="..."/>
        {/* <img   src={!imageUrl? "https://res.cloudinary.com/teepublic/image/private/s--79EwJk3z--/t_Preview/b_rgb:000000,c_limit,f_auto,h_630,q_90,w_630/v1608236443/production/designs/17519845_0.jpg" :imageUrl} className="card-img-top"  alt="..."/> */}
        

        <div className="card-body ">
          {/* title portion */}
            {/* <h5 style={{display: "inline"}} className="card-title">{this.props.title && (this.state.title_readMores ?title : title.substring(0,70))}...</h5>
            <span style={{color:"#0d6efd"}} onClick={()=>{this.setState({title_readMores : !this.state.title_readMores})}}>{this.props.title && (this.state.title_readMores ? "Show Less" : "Show More")}</span> */}
            <h5  className="card-title">{title}</h5>


          {/* Description portion */}
            <div className='mb-3'>
             <p style={{display: "inline"}} className="card-text">{this.props.description && (this.state.readMores ?description : description.substring(0,70))}...</p> 
            <span  style={{color:"#0d6efd"}} onClick={()=>{this.setState({readMores : !this.state.readMores})}}>
             {this.props.description && (this.state.readMores ? "Show Less" : "Show More")}
            </span>
            </div>

            <div>
              {/* <p className='card-text'><small className='text-muted '>By {!author? "Unknown" :author} on {new Date(date).toDateString()}  {new Date(date).toLocaleTimeString()}</small></p> */}
              <p className='card-text'><small className='text-muted '>By {!author? "Unknown" :author} on {new Date(date).toLocaleDateString()}  {new Date(date).toLocaleTimeString()}</small></p>
              {/* <p className='card-text text-muted'><small className='text-muted'>By </small>{!author? "Unknown" :author} <small className='text-muted'>On </small> {new Date(date).toGMTString()}</p> */}
          <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark mx-auto">Read More</a>
            </div>
            </div>
            
        </div>
      </div>
    )
  }
}
export default NewsItem

{/* <div className="card-body ">
    <h5  className="card-title">{title}</h5>
    <div>
    <p  className="card-text">{description}</p>
</div>
    <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary mx-auto">Read More</a>
</div>
*/}