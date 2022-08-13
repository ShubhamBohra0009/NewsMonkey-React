import React, {useState,useEffect}from 'react'

export default function SearchKeyword(props) {
  const [keywords, setKeywords] = useState("");

  const handleOnChange = (event)=>{
    setKeywords(event.target.value);
  }

  
  const clickFunction = ()=>{
    props.updateNews();
    // setTimeout(() => {
    //   // props.setSearchBox(false);
    // }, 1000);
  }
  useEffect(() => {
    props.setSearchKeywords(keywords);
  }, [clickFunction])
  
  return (
    <>
    <main className='d-flex justify-content-center '>
    {/* 
      <div className="card-body">
      <button type='button' className='btn btn-dark '  onClick={()=>{props.setSearchKey(false)}} > &uarr; <br/> show</button>
      
    </div> */}
    {/* <button type='button' className='btn btn-dark '  onClick={props.setSearchKey(false)} > &uarr; <br/> show</button> */}
    <div className=' container card text-center mx-2 mb-2 ' style={{maxWidth: "25rem"}}>
    {/* <div className='container' > */}
    {/* <h1 className='mb-3'>{props.heading}</h1> */}
<div className="my-3">
  {/* <textarea className="form-control" value={keywords} id="myBox"  ></textarea> */}
  {/* <div className="mb-3"> */}
  <label htmlFor="keywords" className="form-label">Enter the keyword for News related to that keyword</label>
  {/* <span className='row' > */}
  {/* </span> */}
{/* </div> */}
<div className='d-flex '>
  <input  type="text" className="form-control" id="keywords" placeholder="Eg. modi" value={keywords} onChange={handleOnChange} />

<button  className="btn btn-dark   mx-2" onClick={clickFunction} >Search</button>
{/* <form class="d-flex" role="search"> */}
        {/* <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-dark" type="submit">Search</button> */}
      {/* </form> */}
</div>
<div className='text-center'>
</div>
{/* <div>{keywords}</div> */}
    </div  >
    </div>
    </main>
    </>
  )
}
