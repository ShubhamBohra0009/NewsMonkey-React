import React from 'react'

export default function EndMessage(props) {
  return (
    <>
    {!props.loading && 
        <div className="container d-flex justify-content-center">
        <button type='button' className='btn btn-dark btn-sm' style={{margin: "30px 0"}} onClick={()=>{window.scrollTo({top: 0, left: 0, behavior: 'smooth'});}} > &uarr; <br/> Scroll To Top</button>
        </div>
      }
      </>
  )
}
