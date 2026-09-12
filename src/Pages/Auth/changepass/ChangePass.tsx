import {Input, Label, Link} from "@heroui/react";
import {Button} from "@heroui/react";
import { useForm } from "react-hook-form";
import{ChangePasswordEscma} from "../../../ValidationEscema/ChangePass"
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";

import { baseUrl } from "../../../Components/ProjectApi/Api";

import { useContext } from "react";
import { AuthContext } from "../../../Contaxt/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";

export default function ChangePass() {


   const navgate =useNavigate()

     const auth  =useContext(AuthContext)
     if(!auth)
          {
         throw new Error("this auth must be in contextProvider")
          }
        
        const  {token}=auth;

  const {register,handleSubmit,formState:{errors}}=useForm({
    resolver:zodResolver(ChangePasswordEscma),
    defaultValues:{
      password:"",
      newPassword:""
    }

  })


function sendNewPassword(passwordData: any) {
    console.log("Token being sent:", JSON.stringify(token));
  return axios.patch(
    `${baseUrl}/users/change-password`,
    passwordData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

const { mutate, isPending } = useMutation({
  mutationFn: sendNewPassword,
  onSuccess: () => {
    toast.success("Change password is done");
  <Navigate to ={'/home'}/>;
    
  },
  onError: (err) => {
    if (axios.isAxiosError(err)) {
      console.log("Old Password Not matched"); 
      toast.error(err.response?.data?.message ?? "حصل خطأ، حاولي تاني");
    }
  },
});

function sendData(data: any) {
  mutate(data); 
}


  return (
        <section  className=" lg:w-[85%] h-screen md:w-full p-12 m-auto ">
        
        <form className='text-center xl:w-2/3 lg:w-[80%] md:w-full  m-auto mt-5 pt-10  grid md:grid-cols-1 gap-5    shadow-2xl rounded-2xl bg-white p-12' onSubmit={handleSubmit(sendData)} >
    <div className="fristGroup flex flex-col w-full gap-y-5 items-start " >
     
      <Label htmlFor="password"> Old Password</Label>
    <Input aria-label="password" {...register("password")} id="password" 
      
    
     className="w-full" type='password'  placeholder="Enter your Old Password" /> 
    {errors.password&&(<p className="text-red-500 text-md text-start">{errors.password.message}</p>)}
    </div>
    
    <div className="secoundGroup flex flex-col gap-y-5  items-start">
     
      <Label htmlFor="newpass" >New PassWord</Label>
      <Input aria-label="newpassword" type="password" {...register("newPassword")} id="pass" className="w-full"  placeholder="Enter your new Password" /> 
     {errors.newPassword&&(<p className="text-red-500 text-md text-start">{errors.newPassword.message}</p>)}
    
     
    </div>
        <Button onClick={()=>{navgate("")}} className=" w-full  my-4" type="submit" >Submit</Button>
        <div className="  flex justify-between "> 
       
    </div>
    
     
        </form>
        </section>
  )
}

