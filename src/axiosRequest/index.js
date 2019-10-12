import axios from "axios";
import { resolve } from "path";
import { reject } from "q";

class AxiosRequest {

    create(obj) {
        const instance = axios.create({})
        this.instance = instance;
        return this.instance;
    }
    async prepare() {
        const promise = ()=> new Promise((resolve)=>{
            setTimeout(()=>resolve(this.instance) ,1)
        })
        const instance = await promise()
        return instance
    }     
}


// export default AxiosRequest;
const axiosRequest = new AxiosRequest()
axiosRequest.create();
export default  axiosRequest