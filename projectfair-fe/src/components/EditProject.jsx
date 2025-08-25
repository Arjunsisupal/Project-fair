import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { base_url } from '../services/base_url';
import { toast } from 'react-toastify';

function EditProject({ project }) {
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("")
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  console.log('Edit Text Details');
  console.log(project);
  const [projectDetails, setProjectDetails] = useState({
    id: project._id,
    title: project.title,
    language: project.language,
    githubLink: project.github,
    websiteLink: project.website,
    overview: project.overview,
    projectImage: ""
  })
  useEffect(() => {
    if (projectDetails.projectImage) {
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  }, [projectDetails.projectImage])

  const handleUpdate = async () => {
    console.log('Update project details');
    console.log(projectDetails);


    const {id,title, language, githubLink, websiteLink, overview } = projectDetails;
    if (!title || !language || !githubLink || !websiteLink || !overview) {
      toast.warning('Please Fill the form completely')
    }
    else {
      // send data to backend
      // here we have to send a file, so instead of sending as Object,we are passing data as formdata
      const reqBody = new FormData();
        reqBody.append('title', title),
        reqBody.append('language', language),
        reqBody.append('githubLink', githubLink),
        reqBody.append('websiteLink', websiteLink),
        reqBody.append('overview', overview),
        preview?reqBody.append("projectImage",projectImage):reqBody.append('projectImage',project.projectImage)
        const token = sessionStorage.getItem("token")
        if(preview){
          const reqHeader = {
            "Content-Type":"multipart/form_data",
            "Authorization":`Bearer ${token}`
          }
          const result = await updateProjectApi(id, reqBody, reqHeader)
        }
        else{
            const reqHeader = {
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
          }
          const result = await updateProjectApi(id, reqBody, reqHeader)
        }
    }
  }

  return (

    <>
      <i className="fa-solid fa-pen-to-square ms-2 text-danger" onClick={handleShow}></i>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>EDIT PROJECT</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row'>
            <div col-md-6="true">
              <label htmlFor="projectImg">
                <input type="file" id='projectImg'
                  onChange={(e) => setProjectDetails({ ...projectDetails, projectImage: e.target.files[0] })} />
                <img src={preview ? preview : `${base_url}/uploads/${project.projectImage}`} alt="" className='w-25' />
              </label>
            </div>
            <div className='col-md-6'>
              <div className='mt-3'>
                <input type="text" placeholder='Project Title' className='form-control'
                  value={projectDetails.title} onChange={(e) => setProjectDetails({ ...projectDetails, title: e.target.value })} />
              </div>

              <div className='mt-3'>
                <input type="text" placeholder='Technologies Used' className='form-control'
                  onChange={(e) => setProjectDetails({ ...projectDetails, language: e.target.value })}
                  value={projectDetails.language} />
              </div>

              <div className='mt-3'>
                <input type="text" placeholder='Github Link' className='form-control'
                  onChange={(e) => setProjectDetails({ ...projectDetails, githubLink: e.target.value })}
                  value={projectDetails.githubLink} />
              </div>

              <div className='mt-3'>
                <input type="text" placeholder='Website Link' className='form-control'
                  onChange={(e) => setProjectDetails({ ...projectDetails, websiteLink: e.target.value })}
                  value={projectDetails.websiteLink} />
              </div>

              <div className='mt-3'>

                <textarea value={projectDetails.overview} placeholder='Project Overview'
                  onChange={(e) => setProjectDetails({ ...projectDetails, overview: e.target.value })}
                  rows={3} className='form-control'></textarea>
              </div>

            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            CANCEL
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            UPDATE PROJECT
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject