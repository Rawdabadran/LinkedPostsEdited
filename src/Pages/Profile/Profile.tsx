import { useContext,useRef,useState } from "react";
import CoverImg from "../../assets/Sky.jfif"
import { UserContext } from "../../Contaxt/UserContext";
import { AuthContext } from "../../Contaxt/AuthContext";
import type { post } from "../../interFaces/AllPosta";
import { MdModeEditOutline } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { baseUrl } from "../../Components/ProjectApi/Api";
import PostCard from "../../Components/Shard/PostCard/PostCard";
import Loading from "../../Components/Shard/loading/loading";
import CreatePost from "../../Components/Shard/CreatePost/CreatePost";
import { Helmet } from "react-helmet";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function Profile() {


const User  = useContext(UserContext);
 if(!User)
     {
    throw new Error("this User must be in contextProvider")
     }


     const auth  =useContext(AuthContext)
     if(!auth)
          {
         throw new Error("this auth must be in contextProvider")
          }
        
        const  {token}=auth;
     
   
   const  {userData}=User;
   const {name,username,_id,email,photo,cover,followersCount,bookmarksCount,followingCount} =
     (userData || {}) as {
       name?: string;
       username?: string;
       _id?: string;
       email?: string;
       photo?: string;
       cover?: string;
       followersCount?: number;
       bookmarksCount?: number;
       followingCount?: number;
     };
  //  console.log(userData)


 async function getUserPosts(){
  return  await axios.get(`${baseUrl}/users/${_id}/posts`,{
    headers:{
                Authorization:`Bearer ${token}`
                
            }
  })
}



const {data,isError,isLoading}=useQuery({
  queryKey:["userPosts"]
,
  queryFn:getUserPosts,
  select:(data)=>data?.data.data.posts
})




//edit profile img

// const [Imge,setImge]=useState(null);

 const fileInput = useRef<HTMLInputElement | null>(null)
  





   async function EditProfile(PhotoData:any){
    return  await axios.put(`${baseUrl}/users/upload-photo`,PhotoData,{
            headers:{
                Authorization:`Bearer ${token}`
            }
         })

   } 


   const qurey =useQueryClient();

  

   const { mutate: mutateEdit, isPending } = useMutation({
  mutationFn: EditProfile,
  onSuccess: (res) => {
    qurey.invalidateQueries({ queryKey: ["posts"] });
    qurey.invalidateQueries({ queryKey: ["userPosts"] });
    toast.success(res?.data?.message ?? "Photo updated");
  },
  onError: (err) => {
    if (axios.isAxiosError(err) && err.response?.status === 429) {
      toast.error("محاولات كتير، استني شوية وحاولي تاني");
    } else {
      toast.error("حصل خطأ، حاولي تاني");
    }
  },
});

function sendFile(e: any) {
  const file = e.target.files[0];
  if (!file) return;



  const FD = new FormData();
  FD.append("photo", file);
  mutateEdit(FD);
}
  
  




 







  return (
    <>
<Helmet><title> Profile</title> </Helmet>

    {/* profile header */}
      <main className="profile-page">
        <section className="relative block h-96">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: cover
  ? `url(${cover})`
  : `url(${CoverImg})`,
              // backgroundImage:{{userData.cover} != "" ? `url(${userData.cover})`  : `url(${CoverImg})`},
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
            style={{ transform: "translateZ(0px)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>

        <section className="relative py-16 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0  bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 relative px-4 lg:order-2 flex justify-center">
                    <div className="relative ">
                      <img
                        alt="..."
                        src={photo}
                        className="shadow-xl  w-40 h-36 rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]"
                      />
                     
                    </div>
                     <MdModeEditOutline onClick={()=>{fileInput.current?.click()}} className="z-50    lg:top-2/3 lg:right-0.5  md:-mt-5  md:right-1/2  right-1/4  absolute border-2 text-sky-800 border-sky-500 rounded-full bg-white  text-2xl " />
                    
                  </div>
                    <input onChange={(e)=>{sendFile(e)}} 
                       disabled={isPending}
                      type="file" className="hidden" ref={fileInput} />
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                 
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="flex justify-center py-4 lg:pt-4 pt-8">
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-sky-800">
                          {followersCount}
                        </span>
                        <span className="text-sm text-sky-300">Friends</span>
                      </div>
                      <div className="mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-sky-800">
                          {followingCount}
                        </span>
                        <span className="text-sm text-sky-300">Following</span>
                      </div>
                      <div className="lg:mr-4 p-3 text-center">
                        <span className="text-xl font-bold block uppercase tracking-wide text-sky-800">
                          {bookmarksCount}
                        </span>
                        <span className="text-sm text-sky-300">bookmarks</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-sky-800">
                    {name}
                  </h3>
                  <div className="text-xs leading-normal mt-0 mb-2 text-sky-400 font-semibold pb-6 uppercase">
                    <i className="  mr-2 text-xs text-blueGray-400"></i>
                  {email}
                  </div>
                  
                </div>

             
              </div>
            </div>
          </div>

        </section>
      </main>


<CreatePost/>
      {/* user Posts  */}
    {  isLoading?<Loading/>:" "}
  
      {isError?<p className="text-center h-screen text-red-600 text-xl flex justify-center items-center font-semibold"> Posts Loading Fail</p>:" "}
         {data?.length==0?<p className=" text-center py-4 text-gray-500 font-medium">There is no posts yet</p>:
         data?.map((post:post)=>(
            <PostCard  details={false} {...post} key={post._id}/>
          ))
         }
         
    



    </>
  );
}