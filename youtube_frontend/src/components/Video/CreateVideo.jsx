import { useState } from "react";
import {useForm} from "react-hook-form"
import { URL } from "../../endpoints";
import axios from "axios";

function CreateVideo()
{
    let {register,handleSubmit}=useForm()

    async function sendData(data)
    {
        let payload={
            video:data.videoFile[0],
            thumbnail:data.thumbnail[0],
            title:data.title,
            description:data.description,
            isPublished:data.isPublished
        }

        console.log(payload)

        const response=await axios.post(`${URL}/video/createVideo`,payload,{
            headers:{
                'Content-Type':'multipart/form-data'
            }
        })

        console.log(response)
    }
    return (
        <form onSubmit={handleSubmit(sendData)}>
            <div>
                <input
                type="file"
                {...register("thumbnail")}/>
                <br/>
                <input
                type="file"
                {...register("videoFile")}
                />
                <br/>
                <input 
                type="text"
                {...register("title")}
                />
                <br/>
                <input 
                type="text"
                {...register("description")}
                />
                <br />
                <input
                type="checkbox"
                {...register("isPublished")}
                />
            </div>
            <button type="submit">Create</button>
        </form>
    )
}

export default CreateVideo