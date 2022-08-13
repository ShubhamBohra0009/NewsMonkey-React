import React, {useState,useEffect}from 'react'

export default function SearchKeyword(props) {
  const [keywords, setKeywords] = useState("");

  const handleOnChange = (event)=>{
    setKeywords(event.target.value);
  }
  
  const clickFunction = ()=>{
    props.updateNews();
  }
  useEffect(() => {
    props.setSearchKeywords(keywords);
  }, [clickFunction])

  return (
    <>
    <main className='d-flex justify-content-center '>
    <div className=' container card text-center mx-2 mb-2 ' style={{maxWidth: "25rem"}}>
    <div className="my-3">
    <label htmlFor="keywords" className="form-label">Enter the keyword for News related to that keyword</label>
    <div className='d-flex '>
    <input  type="text" className="form-control" id="keywords" placeholder="Eg. modi" value={keywords} onChange={handleOnChange} />
    <button  className="btn btn-dark   mx-2" onClick={clickFunction} >Search</button>
    </div>
    </div>
    </div>
    </main>
    </>
  )
}
