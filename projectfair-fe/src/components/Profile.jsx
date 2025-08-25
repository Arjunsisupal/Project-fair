import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

function Profile() {
  const [open, setOpen] = useState(false);
  return (
    <>
    <div className='shadow p-4'>
      <div className='d-flex mt-2'>
        <h5 className='text-danger'>MY PROFILE</h5>
        <div className='ms-auto'>
          <button className='btn btn-danger'
           onClick={() => setOpen(!open)}><i className="fa-solid fa-angle-up"></i></button>
        </div>
      </div>

      {/* collapse */}

      <Collapse in={open}>
        <div>
          <div className='d-flex justify-content-center align-items-center'>
            <label htmlFor="profileImg">
              <input type="file" id='profileImg' />
              <img height={'180px'} width={'180px'} style={{borderRadius:'50%',display:'none'}} 
              src="https://marketplace.canva.com/EAFXS8-cvyQ/1/0/1600w/canva-brown-and-light-brown%2C-circle-framed-instagram-profile-picture-2PE9qJLmPac.jpg" alt="" />
            </label>
          </div>
          <div className='mt-3'>
            <input type="text"  placeholder='GITHUB LINK'className='form-control'/>
          </div>
          <div className='mt-3'>
            <input type="text" placeholder='LINKEDIN LINK' className='form-control'/>
          </div>
          <div className='mt-3'>
            <button className='btn btn-danger w-100'>UPDATE PROFILE</button>
          </div>
        </div>
      </Collapse>
    </div>
    </>
  )
}

export default Profile