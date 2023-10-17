import React from 'react'

export default function SearchKeyword({searchKeywords,setSearchKeywords,updateNews}) {
 
  return (
    <>
    <main className='d-flex justify-content-center  '>
    <div className=' container card  mx-2 mb-2  ' style={{maxWidth: "25rem"}}>
    <div className="my-3">
    <label htmlFor="keywords" className="form-label mx-2 ">Enter the keyword for Searching News </label>
    <div className='d-flex '>
    <input type="text" className="form-control" id="keywords" placeholder="Tesla" value={searchKeywords} onChange={(e)=>setSearchKeywords(e.target.value)}
     onKeyDown={(e)=>e.key==='Enter' && (searchKeywords.length>0 && updateNews()) } />
    <button  className="btn btn-dark mx-2" onClick={updateNews} disabled={searchKeywords.length===0}>Search</button>
    </div>
    </div>
    </div>
    </main>
    </>
  )
}
