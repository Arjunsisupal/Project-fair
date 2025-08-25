import { data } from "react-router-dom";
import { base_url } from "./base_url";
import { commonApi } from "./commonApi";

// register user
export const registerApi = async(userdata)=>{
    return await commonApi("POST",`${base_url}/user/register`,userdata,"")
};

// login user
export const loginApi = async(data)=>{
    return await commonApi("POST",`${base_url}/user/login`,data,'')

}

// add project
export const addProjectApi = async(data,reqHeader)=>{
    return await commonApi('POST',`${base_url}/project/add`, data,reqHeader)

}

// get home project
export const getHomeProjectApi = async()=>{
    return await commonApi('GET',`${base_url}/project/homeproject`,"","")
}

// get all project
export const getAllProjectApi = async(searchkey,reqheader)=>{
    return await commonApi('GET',`${base_url}/project/allproject?search=${searchkey}`,"",reqheader)
}

// get userProject
export const getUserProjectApi = async(reqheader)=>{
    return await commonApi('GET',`${base_url}/project/userproject`,"",reqheader)
}

// update project
export const updateProjectApi = async(projectId,reqBody,reqHeader)=>{
return await commonApi('PUT', `${base_url}/project/edit/${projectId}`,reqBody,reqHeader)
}