import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import firstImage from '../assets/main_img.jpeg'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getHomeProjectApi } from '../services/allApi'

function Home() {
  const [isLogin,setIsLogin]=useState(false);
  const [homeProject,setHomeProject]= useState([])
  const getHomeProject = async()=>{
    const result= await getHomeProjectApi();
    console.log('Home Project');
    console.log(result);
    setHomeProject(result.data)
     }
     useEffect(()=>{
      getHomeProject()
     },[])
  useEffect(()=>{
    if (sessionStorage.getItem('token')){
      setIsLogin(true)
    }
  },[])
  return (
    <>
    <div className='container-fluid bg-success p-5' style={{width:'100%',height:'100vh'}}>
      <Row className='mt-5'>
        <Col md={6} lg={6} className='d-flex justify-content-center align-items-center flex-column'>
        <div>
          <h3 className='text-light'>PROJECT FAIR</h3>
          <h6>One stop destination for all software projects</h6>
          {
          !isLogin?
          <Link to={'/login'}>
          <button className='btn btn-outline-light mt-2'>GET STARTED <i class="fa-solid fa-arrow-right ms-1"></i></button>
          </Link>:
            <Link to={'/dashboard'}>
            <button className='btn btn-outline-light mt-2'>MANAGE PROJECTS <i class="fa-solid fa-arrow-right ms-1"></i></button>
            </Link>
           
         
          }
        
        </div>
        </Col>
        <Col md={6} lg={6} >
        <img src={firstImage}alt="" width={'100%'} />
        </Col>
      </Row>

    </div>
    <div className='container-fluid'>
      <h3 className='text-center my-5'>EXPLORE YOUR PROJECTS</h3>
      <div className='row mb-5'>

        <marquee scrollAmount={'10'}>
          <div className='row'>
          {
            homeProject.length>0&&
            homeProject.map(item=>(
          <div className='col-md-4 col-lg-4 justify-content-center d-flex p-4'>
          <ProjectCard projectData={item}/>
          </div>
            ))
          }
          </div>
          
        
        </marquee>
        
        <Link to={'/project'} style={{textDecoration:'none'}}>
        <h5 className='text-center text-warning my-5 bold'>SEE MORE PROJECTS</h5>
        </Link>

       

      </div>

    </div>
    </>
  )
}

export default Home