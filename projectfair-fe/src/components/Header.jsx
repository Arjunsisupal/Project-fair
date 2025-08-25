import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate()
  const logout = ()=>{
    if(sessionStorage.getItem('token')){
      sessionStorage.removeItem('token');
    }
    if(sessionStorage.getItem('existingUser')){
      sessionStorage.removeItem('existingUser')
    }
    navigate('/')
  }
  return (
    <>
     <Navbar className="bg-danger">
        <Container>
          <Link to='/'style={{textDecoration:'none'}}>
          <Navbar.Brand>
          <i className="fa-brands fa-stack-overflow me-2 text-warning "></i>
        
           <span className='fw-bold' style={{color:'white', fontSize:'22px'}}>PROJECT FAIR</span> 
          </Navbar.Brand>
          </Link>
          
          <button className='btn btn-warning' style={{color:'black'}} onClick={logout}> <i className="fa-solid fa-power-off me-1"></i> LOGOUT</button>
        </Container>
      </Navbar>
    </>
  )
}

export default Header