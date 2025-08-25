import React, { useEffect, useState } from 'react'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'

function Project() {
  const [allProject, setAllProject] = useState([])
  const [searchKey,setSearchKey] = useState('')
  const[isToken,setIsToken]=useState(false)
  const getAllProject = async () => {
    if (sessionStorage.getItem('token')) {
      const token = sessionStorage.getItem('token')
      const header = {
        'Content_Type': 'application/json',
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllProjectApi(searchKey,header)
      console.log('All project');
      console.log(result);
      setAllProject(result.data);


    }
  }
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setIsToken(true)
    }
  },[])
  useEffect(() => {
    getAllProject()
  }, [searchKey])
  return (
    <>
    {
      isToken?
<div>
  <div className='container-fluid'>
        <h3 className='text-center mt-5 text-warning'>EXPLORE PROJECTS</h3>

      </div>
      <div className='row my-5'>
        <div className='col-md-4'></div>
        <div className='col-md-4 d-flex'>
          <input type="text" className='form-control' placeholder='Search By Technologies' 
          onChange={(e)=>setSearchKey(e.target.value)}/>
          <i className="fa-solid fa-magnifying-glass" style={{ marginTop: '12px', marginLeft: '-30px', color: 'orange' }}></i>
        </div>
        <div className='col-md-4'></div>
      </div>
      <div className='row my-5 p-5'>
        {
          allProject.length > 0 ?
            allProject.map(item => (
              <div className='col-md-3 p-3'>
                <ProjectCard projectData={item}/> 
              </div>
            )):
            <p>No Project Found</p>
      }

      </div>
    </div>
   : <div className='text-center'>
      <p className='fw-bold mt-5 mb-5' style={{color:'red'}}>OOPS!! <span style={{color:'green'}}>PLEASE LOGIN</span></p>
      <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?semt=ais_hybrid&w=740" alt="" 
      height={'400px'}/>
      <p className='mt-3 mb-3 fs-5 fw-bold'>
        <Link to={'/login'} style={{textDecoration:'none',color:'orange'}}>
          LOGIN
        </Link> TO VIEW MORE PROJECTS
      </p>
    </div>
    }
    
      
    </>
  )
}

export default Project