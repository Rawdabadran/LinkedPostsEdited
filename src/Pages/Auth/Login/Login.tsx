
import {Input, Label, Link} from "@heroui/react";
import { useNavigate } from "react-router-dom";
import {useForm} from  "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import {Button} from "@heroui/react";
import {  toast } from 'react-toastify';
import {custmValidationEScema} from '../../../ValidationEscema/LoginEscema'
import { sendLogDate } from "../../../services/Auth/login";
import { AuthContext } from "../../../Contaxt/AuthContext";
import { useContext } from "react";
import type { LoginInterFace } from "../../../interFaces/login"





export default function Login() {
  let Navegate =useNavigate();
  const navegate=useNavigate()

  // const [passWord, sendPass] = useState<string | null>(null)

  let auth  =useContext(AuthContext)
  if(!auth)
  {
 throw new Error("this auth must be in contextProvider")
  }

let  {setToken}=auth;

  const {register,handleSubmit,formState:{errors}}= useForm({
    resolver:zodResolver(custmValidationEScema),
    defaultValues: {
      email: "",
      password:""
    },
    mode:"onBlur"
  });
  
  async function submitForm( data:LoginInterFace){
   try{
    
     let result= await sendLogDate(data);
    
     let mes=result.data.message;
     toast.success(mes);
     setToken(result.data.data.token)
    
     localStorage.setItem("token",result.data.data.token)

     localStorage.setItem("password",data.password)

     Navegate('/home');
     
   }
   catch{
     toast.error("Enter a vaild data")
   }
  
  }

  return (
    <section  className=" lg:w-[85%] h-screen md:w-full p-12 m-auto ">
    
  

    <h1 className="text-center font-bold text-5xl text-sky-800 ">Login Now</h1>



    <form className='text-center xl:w-2/3 lg:w-[80%] md:w-full  m-auto mt-5 pt-10  grid md:grid-cols-1 gap-5    shadow-2xl rounded-2xl bg-white p-12' onSubmit={handleSubmit(submitForm)} >
<div className="fristGroup flex flex-col w-full gap-y-5 items-start " >
 
  <Label htmlFor="email"> Email</Label>
<Input aria-label="email" id="email" {...register("email")} 
  

 className="w-full" type='email'  placeholder="Enter your Mail" /> 
{errors.email&&(<p className="text-red-500 text-md text-start">{errors.email.message}</p>)}
</div>

<div className="secoundGroup flex flex-col gap-y-5  items-start">
 
  <Label htmlFor="pass"> PassWord</Label>
  <Input aria-label="password" id="pass" className="w-full" {...register("password")} type='password' placeholder="Enter your Password" /> 
 {errors.password&&(<p className="text-red-500 text-md text-start">{errors.password.message}</p>)}

 
</div>
    <Button className=" w-full  my-4" type="submit" >Submit</Button>
    <div className="  flex justify-between "> 
    <span className=" text-start text-xs text-stone-400"> Don't have an account </span>
<span onClick={()=>{navegate("/Register")}} className="text-sky-900">sign up</span>
</div>

 <div  className= {` flex justify-center `} > 

</div>
    </form>
  

    </section>

  )
}
