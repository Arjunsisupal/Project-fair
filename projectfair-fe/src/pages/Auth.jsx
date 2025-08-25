import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import authImage from '../assets/image2.png'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';

function Auth({registerPage}) {
  const isRegisterPage = registerPage? true:false;
  //use navigate hook is used to route from one page to another
  const navigate=useNavigate()
  // create a state to hold all input values
  const[userData,setUserData] = useState({
    name:"",
    email:"",
    password:""
  })
  const handleRegister = async()=>{
    console.log('User entered data');
    console.log(userData);
    const {name,email,password} = userData;
    if (!name || !email|| !password){
      toast.warning('Please fill the form completely')
    }
    else{
      // call api to register user
      const result = await registerApi(userData);
      if(result.status === 201){
      toast.success(`${userData.name} Successfully Registered`);
      setUserData({
        name:'',
        email:'',
        password:''
      })
      // navigate to login page
      navigate('/login')
      }
      else if(result.status === 409){
        toast.warning(`${userData.email} Already exists..Please Login!!`)
      }
      else{
        toast.error('Something Went Wrong!!')
      }
    }

  }
  const handleLogin = async()=>{
    console.log('Inside handleLogin Function');
    const {email,password}= userData;
    console.log(email,password);
    if(!email || !password){
      toast.error('Please fill the form completely')
    } 
    else{
      const result = await loginApi(userData)
      console.log('Response from login');
      console.log(result);
      if(result.status === 200){
       sessionStorage.setItem('existingUser',JSON.stringify(result.data.user_data));
       sessionStorage.setItem('token',result.data.jwt_token)
        toast.success('Login Successfull')
        navigate('/')
      }
      else if(result.status === 406){
        toast.error('Email or Password is not matched!!')
      }
      else{
        toast.error('Something went wrong!!')
      }
    }
  }
  useEffect(()=>{
    setUserData({
      name:"",
      email:"",
      password:""
    })
  },[registerPage])
  return (
    <>
    <div className='container-fluid ms-5 mt-3 mb-3'>
      <Link to={'/'} style={{textDecoration:'none'}}>
      <h5 className='text-warning fw-bold'><i className="fa-solid fa-arrow-left me-3"></i>BACK TO HOME</h5>
      </Link>
    </div>
    <div className='container-fluid bg-light'>
    <Row>
      <Col md={5} className='mb-5 ms-5 mt-5 d-flex justify-content-center align-items-center'>
      <img src={authImage} alt="" width={'70%'} />
      </Col>
      <Col md={6} className='d-flex justify-content-center align-items-center flex-column'>
      <h4 className='text-center fw-bold'><i className="fa-brands fa-stack-overflow me-2 text-warning "></i>PROJECT FAIR</h4>
      {
        isRegisterPage?
        <h5 className='text-center mt-2'>SIGN UP TO YOUR ACCOUNT</h5>:
        <h5 className='text-center mt-2'>SIGN IN TO YOUR ACCOUNT</h5>
      }
      
      <div className= 'w-100 d-flex justify-content-center flex-column align-items-center'>
        {
          isRegisterPage &&
          <input type="text" value={userData.name} placeholder='ENTER NAME' className='form-control w-50 rounded mt-3'
        onChange={(e)=>setUserData({...userData,name:e.target.value})}/>
        }
       
        
        
        <input type="text" value={userData.email} placeholder='EMAIL-ID' className='form-control w-50 rounded mt-3'
        onChange={(e)=>setUserData({...userData,email:e.target.value})} />
        
        <input type="text" value={userData.password} placeholder='PASSWORD' className='form-control w-50 rounded mt-3'
        onChange={(e)=>setUserData({...userData,password:e.target.value})} />

      {
        isRegisterPage ?
        <button className='btn btn-warning mt-3' style={{color:'black'}} onClick={handleRegister}>
        REGISTER
        </button>:
        <button className='btn btn-warning mt-3' style={{color:'black'}} onClick={handleLogin}>
        LOGIN
        </button>
      }
        
      </div>
      <div>
        {
          isRegisterPage ?
          <Link to={'/login'} style={{textDecoration:'none'}}>
             <p className='mt-2'>ALREADY REGISTERED? <span style={{color:'green'}}>LOGIN</span></p>
          </Link>:
          <Link to={'/register'}  style={{textDecoration:'none'}}>
            <p className='mt-2'>NOT REGISTERED YET? <span style={{color:'green'}}>REGISTER</span></p>
          </Link>
         
      }
       
      </div>
      </Col>
    </Row>
    </div>
    <ToastContainer
    position='top-center' autoClose={1500} />
    </>
  )
}

export default Auth