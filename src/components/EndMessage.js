import React, { useEffect } from 'react'

export default function EndMessage({loading,articles,SetFetchMoreSkeleton}) {

  useEffect(() => {
    if (!loading && articles?.length) {
      SetFetchMoreSkeleton(false);
    }
  }, [loading, articles, SetFetchMoreSkeleton]);

  return (
    <>
    {!loading && ( 
      
      articles?.length?
      <div className="container d-flex justify-content-center">
        <button type='button' className='btn btn-dark btn-sm' style={{margin: "30px 0"}} onClick={()=>{window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} > &uarr; <br/> Scroll To Top</button></div>
        :  <div className='container d-flex justify-content-center text-center my-3'><h1>  Invalid Keyword</h1></div> 
        ) 
      }
      </>
  )
}
