import { data } from "react-router-dom";
import axios from 'axios';

export const commonApi = async(httpRequest,URL,reqBody,reqHeader)=>{
    const reqConfig = {
        method:httpRequest,
        url:URL,
        data:reqBody,
        headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
}
return await axios(reqConfig).then((result)=>{
    return result 
}).catch((err)=>{
    return err;
})
}
