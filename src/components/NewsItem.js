import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title, description,imageUrl,newsUrl}= this.props;
    return (
      <div className='my-3'>
        <div className="card" style={{width: "18rem"}}>
        {/* <img src={!imageUrl? "https://res.cloudinary.com/teepublic/image/private/s--79EwJk3z--/t_Preview/b_rgb:000000,c_limit,f_auto,h_630,q_90,w_630/v1608236443/production/designs/17519845_0.jpg" :imageUrl} className="card-img-top" style={{maxHeight:"160.88px"}} alt="..."/> */}
        <img src={!imageUrl? "https://res.cloudinary.com/teepublic/image/private/s--79EwJk3z--/t_Preview/b_rgb:000000,c_limit,f_auto,h_630,q_90,w_630/v1608236443/production/designs/17519845_0.jpg" :imageUrl} className="card-img-top"  alt="..."/>
        <div className="card-body ">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary mx-auto">Read More</a>
        </div>
        </div>
      </div>
    )
  }
}

export default NewsItem