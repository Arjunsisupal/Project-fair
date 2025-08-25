import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import { addProjectApi } from '../services/allApi';
import { addProjectResponseContext } from '../Context/ContextShare';

function AddProject() {
    const [show, setShow] = useState(false);
    const [token,setToken]= useState('')
    // import state created inside context api
    // useContext() hook is used to access context API
    const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)
    const [projectDetails,setProjectDetails]=useState({
      title: "",
      language:"",
      githubLink:"",
      websiteLink:"",
      overview:"",
      projectImage:""
    })
    const handleClear=()=>{
      setProjectDetails({
      title: "",
      language:"",
      githubLink:"",
      websiteLink:"",
      overview:"",
      projectImage:""
      })
      setPreview('')
    }
  const [preview,setPreview]=useState('')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])
  useEffect(()=>{
    if (sessionStorage.getItem('token')){
      setToken(sessionStorage.getItem('token'))
    }
  },[])

  const addProject = async() =>{
    console.log('Project Details');
    console.log(projectDetails);
    
    const {title,language,githubLink,websiteLink,overview,projectImage}=projectDetails
    if (!title || !language || !githubLink || !websiteLink || !overview || !projectImage){
      toast.warning('Please fill the form completely')

    }
    else{
      // send data to backend
      // here we have to send a file, so instead of sending as Object,we are passing data as formdata
      const reqBody = new FormData();
      reqBody.append('title',title),
      reqBody.append('language',language),
      reqBody.append('githubLink',githubLink),
      reqBody.append('websiteLink',websiteLink),
      reqBody.append('overview',overview),
      reqBody.append('projectImage',projectImage)

      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
      }
      const result = await addProjectApi(reqBody,reqHeader);
      if(result.status === 201){
        setAddProjectResponse(result.data)
        toast.success(result.data);
        handleClear()
        handleClose();
      }
      else if(result.status === 406){
        toast.warning(`${title} already exists,Please add a new project`)
      }
      else{
        toast.error('Something went wrong!!')
      }
    }
    }
  return (
    <>
    <button className='btn btn-danger' onClick={handleShow}>ADD PROJECT</button>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>ADD NEW PROJECT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='row'>
                <div col-md-6>
                    <label htmlFor="projectImg">
                        <input type="file" id='projectImg' 
                        onChange={(e)=>setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}/>
                        <img src={preview?preview:"https://cdn-icons-png.freepik.com/256/10099/10099883.png?semt=ais_hybrid"} alt="" className='w-25' />
                        
                    </label>
                </div>
                <div className='col-md-6'>
                <div className='mt-3'>
                    <input type="text" placeholder='Project Title'  className='form-control'
                    value={projectDetails.title}
                    onChange={(e)=>setProjectDetails({...projectDetails,title:e.target.value})}/>
                </div>

                <div className='mt-3'>
                    <input type="text" placeholder='Technologies Used'  className='form-control'
                    value={projectDetails.language}
                    onChange={(e)=>setProjectDetails({...projectDetails,language:e.target.value})}/>
                </div>

                <div className='mt-3'>
                    <input type="text" placeholder='Github Link'  className='form-control'
                    value={projectDetails.githubLink}
                    onChange={(e)=>setProjectDetails({...projectDetails,githubLink:e.target.value})}/>
                </div>

                <div className='mt-3'>
                    <input type="text" placeholder='Website Link'  className='form-control'
                    value={projectDetails.websiteLink}
                    onChange={(e)=>setProjectDetails({...projectDetails,websiteLink:e.target.value})}/>
                </div>

                <div className='mt-3'>
                <textarea placeholder='Project Overview' rows={4} className='form-control'
                value={projectDetails.overview}
                onChange={(e)=>setProjectDetails({...projectDetails,overview:e.target.value})}></textarea>
                </div>

                <div>

                  </div>

                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClear}>
            CLEAR
          </Button>
          <Button variant="primary" onClick={addProject}>
            ADD PROJECT
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer
          position='top-center' autoClose={1000} />
          
    </>
  )
}

export default AddProject