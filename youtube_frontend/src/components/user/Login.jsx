import {useForm} from "react-hook-form"


export default function Login()
{
    const {handleSubmit,register}=useForm()

    function loginUser(data){
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(loginUser)}>
            <input type="text" {...register("username")} />
            <br/>
            <input type="text" {...register("email")} />
            <br/>
            <input type="text" {...register("password")}/>
            <br/>
            <button type="Submit">Submit</button>
        </form>
    )
}