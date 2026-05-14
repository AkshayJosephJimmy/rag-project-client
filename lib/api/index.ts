// Api config

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
import { useParams} from 'next/navigation'



export const apiClient={
    get:async(endpoint:string,token?:string|null)=>{
        const header :HeadersInit ={}
        if(token){
            header['Authorization']=`Bearer ${token}`
        }
        const res= await fetch(`${API_BASE_URL}${endpoint}`,{headers:header})
        if(!res.ok){
            throw new Error(`API error: ${res.status}`)
           
           
        }
        return res.json()


    },
    post:async(endpoint:string,data:any,token?:string|null)=>{
        console.log(data)

        const header:HeadersInit={
            "Content-Type":"application/json"
        }
        if(token){

            header["Authorization"]=`Bearer ${token}`
        }

        const res =await fetch(`${API_BASE_URL}${endpoint}`,{
            headers:header,
            method:"POST",
            body:JSON.stringify(data)
        })
        console.log(res.body)
          
        if(!res.ok){
             throw new Error(`API error: ${res.status}`)
        }
        return res.json()
    },
    delete:async(endpoint:string,token?:string|null)=>{

        const header:HeadersInit={}
        if(token){
            header["Authorization"]=`Bearer ${token}`
        }
        

        const res= await fetch(`${API_BASE_URL}${endpoint}`,{
            headers:header,
            method:"DELETE"
        })

        if(!res.ok){
            throw new Error(`API error: ${res.status}`)
        }

        const result =res.json()

        return result






    }









}












