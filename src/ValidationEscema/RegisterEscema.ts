
import * as z from "zod"; 


export const custmValidationEScema =z.object({
  name:z.string().nonempty("Name is required").min(3,"Should be more than 3 chars").max(10,"should be less than 10 chars"),
  username:z.string().nonempty("UserName is required"),
  email:z.string().nonempty("Emial is required").email("enter a vaild email"),
  gender:z.enum(["male","female"],"choose male or female"),
  dateOfBirth:z.string().nonempty("Date of brithe is required").refine(function(UserDate)
  {
   let Currentyear= new Date().getFullYear();
   let userYear =new Date(UserDate).getFullYear();
   let age =Currentyear-userYear;
   return age>=20
   
  },"You Are too young"),
  password:z.string().nonempty("Password is required").regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,"Use 8+ characters with uppercase, lowercase, a number, and a symbol."),
  rePassword:z.string().nonempty("confirm password is required")
}).refine((userData)=> userData.password==userData.rePassword,{
message:"Password and rePassword not match",
path:["rePassword"]
})
