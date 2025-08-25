import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Col, Row } from 'react-bootstrap';
import mediaplayer from '../assets/mediaplayer.png'
import { Link } from 'react-router-dom';
import { base_url } from '../services/base_url';

function ProjectCard({projectData}) {
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
     <Card style={{ width: '100%' }} className='shadow rounded-0 border-0'
     onClick={handleShow}>
      <Card.Img variant="top" src={`${base_url}/uploads/${projectData.projectImage}`}
      height={'200px'} className='p-2' />
      <Card.Body>
        <Card.Title>{projectData.title}</Card.Title>
        <Card.Text>
        </Card.Text>
      </Card.Body>
    </Card>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{projectData.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col md={6} lg={6}>
                <img src={`${base_url}/uploads/${projectData.projectImage}`} alt="" width={'100%'}/>
                </Col>
                <Col md={6} lg={6}>
                <h5>Description:</h5>
                <p>{projectData.__v}</p>
                <h5>Technologies:</h5>
                <p>{projectData.language}</p>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
          <Link to={projectData.github} target='_blank'>
          <i className="fa-brands fa-github fa-2x me-1"></i>
          </Link>
          <Link to={projectData.website} target='_blank'>
          <i className="fa-solid fa-link fa-2x"></i>
          </Link>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default ProjectCard