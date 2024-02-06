import {useForm} from "react-hook-form"
import axios from "axios"
import { URL } from "../../endpoints"
import {loginUser} from "../../reduxtoolkit/authSlice.js"
import { useDispatch } from "react-redux"

export default function Login()
{
    const {handleSubmit,register}=useForm()
    const dispatch=useDispatch()
    async function loginCurrentUser(data){


        let payload={
            username:data.username,
            email:data.email,
            password:data.password,
        }

        console.log(payload)

        const response=await axios.post(`${URL}/users/login`,payload,{
            headers:{
                "Content-Type": "application/json",
            },
            withCredentials:true
        })
        
        console.log(response)
        const userDetails=response.data.data
        dispatch(loginUser(userDetails))

        const accessToken=response.data.accessToken
        localStorage.setItem("accessToken",accessToken)
        localStorage.setItem("user-id",userDetails._id)
    }

    return (
        <form onSubmit={handleSubmit(loginCurrentUser)}>
            <input type="text" {...register("username")} placeholder="enter username"/>
            <br/>
            <input type="text" {...register("email")} placeholder="enter email"/>
            <br/>
            <input type="text" {...register("password")} placeholder="enter password"/>
            <br/>
            <button type="Submit">Submit</button>
        </form>
    )
}