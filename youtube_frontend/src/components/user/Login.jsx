import {useForm} from "react-hook-form"
import axios from "axios"
import { URL } from "../../endpoints"

export default function Login()
{
    const {handleSubmit,register}=useForm()

    async function loginUser(data){


        let payload={
            username:data.username,
            email:data.email,
            password:data.password,
        }

        // const response=await axios.post(`${URL}/users/login`,payload,{
        //     headers:{
        //         'Content-Type':'multipart/form-data'
        //     }
        // })

        // console.log(response)
    }

    return (
        <form onSubmit={handleSubmit(loginUser)}>
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