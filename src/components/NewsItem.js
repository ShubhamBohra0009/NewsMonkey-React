import React,{useState} from 'react'
import inf from "./Inf.jpg"

  const NewsItem = (props)=>{ 
  const [title_readMores, setTitle_readMores] = useState(false);
  const [readMores, setReadMores] = useState(false);
    let {title, description,imageUrl,newsUrl,author,date,source}= props;

    return (
      <div className='my-3'>
        <div className="card" >
          <div style={{display:"flex",justifyContent:"flex-end",position:"absolute",right: "0"}}>
          <span className='badge rounded-pill bg-danger' > {source}</span>
          </div>
        <img   src={!imageUrl? inf :imageUrl} className="card-img-top"  alt="..."/>

        <div className="card-body ">
            <h5  className="card-title">{title}</h5>
            <div className='mb-3'>
             <p style={{display: "inline"}} className="card-text">{props.description && (readMores ?description : description.substring(0,70))}...</p> 
            <span  style={{color:"#0d6efd"}} onClick={()=>{setReadMores( !readMores)}}>
             {props.description && (readMores ? "Show Less" : "Show More")}
            </span>
            </div>
            <div>
              <p className='card-text'><small className='text-muted '>By {!author? "Unknown" :author} on {new Date(date).toLocaleDateString()}  {new Date(date).toLocaleTimeString()}</small></p>
          <a href={newsUrl} target="_blank" className="btn btn-sm btn-dark mx-auto">Read More</a>
            </div>
            </div>
        </div>
      </div>
    )
  }
export default NewsItem