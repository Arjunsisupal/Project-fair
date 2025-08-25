import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <div className='d-flex justify-content-center align-items-center bg-danger'
  style={{height:'300px',width:'100%'}}>
    <div className='d-flex justify-content-center align-items-evenly'> 
    
    {/* // first division*/}
    
    <div className='overview me-auto ms-6'style={{width:'400px'}}>
          
          <h5>
          <Link to={'/'} style={{textDecoration:'none',color:'orange'}}>
          <i className="fa-brands fa-stack-overflow me-2 text-warning"></i>
          <span style={{color:'white',fontWeight:'700'}}>PROJECT FAIR</span> 
          </Link>
          </h5>
          <p style={{color:'white',textAlign:'justify'}}>A good science fair project idea is one that asks a clear scientific question that can be answered through experimentation, or identifies a problem that can be solved using engineering.</p>
         </div>

          {/* // second division*/}

          <div className='links d-flex flex-column ms-5 me-3' style={{color:'white'}}>
          <h5 style={{color:'white',fontWeight:'700'}}>LINKS</h5>
          <Link to={'/'} style={{textDecoration:'none',color:'white'}}>
          HOME
          </Link>

          <Link to={'/cart'}style={{textDecoration:'none',color:'white'}}>
          CART
          </Link>

          <Link to={'/wishlist'}style={{textDecoration:'none',color:'white'}}>
          WISHLIST
          </Link>

         </div>
         <div className='links d-flex flex-column ms-5 me-3' style={{color:'white'}}>
        <h5 style={{color:'white',fontWeight:'700'}}>GUIDES</h5>
          REACT 
          <br />
          BOOTSTRAP
           <br />
           FONT

        </div>
        <div className='contact_us ms-5 me-3 ' style={{color:'white'}}>
          <h5 style={{color:'white',fontWeight:'700'}}>CONTACT US</h5>
          <div className='d-flex'>
            <input type="text" name=''  placeholder='Enter your E-mail' className='form-control'/>
            <button className='btn btn-warning ms-2' style={{color:'black'}}>SUBSCRIBE</button>
          </div>
          <div className='d-flex justify-content-between align-items-center mt-3'>
          <i className="fa-solid fa-envelope fa-2x"></i>
          <i className="fa-brands fa-instagram fa-2x"></i>
          <i className="fa-brands fa-whatsapp fa-2x"></i>
          <i className="fa-solid fa-x fa-2x"></i>
          </div>

        </div>

      </div>

  </div>
  )
}

export default Footer