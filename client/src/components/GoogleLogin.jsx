import React from 'react'
import { Button, buttonVariants } from './ui/button'
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/helpers/Firebase';
import { useNavigate} from 'react-router-dom';
import { getEnv } from '@/helpers/getEnv.js';
import { showToast } from '@/helpers/showtoast.js';
import { RouteIndex } from '@/helpers/RouteName.js';
import { useDispatch } from 'react-redux';
import { setUser } from '@/redux/user/user.slice.js';


const GoogleLogin = () => {
  const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogin = async ()=>{
        
        try {
                const googleResponse = await signInWithPopup(auth, provider) 
                const user = googleResponse.user
                const bodydata = {
                    name: user.displayName,
                    email: user.email,
                    avatar: user.photoURL,
                
                }
             //api respose from backend
               const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/google-login`, {
                method:'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                credentials: "include",
       //sending the data to frontend
                body: JSON.stringify(bodydata)
              })
        //backend se data liye h res e sahayata se
              const data = await response.json()
        
              if (!response.ok) {
               return showToast("error", data.message)
              }
               
              dispatch(setUser(data.user))

                navigate(RouteIndex)

              showToast("success", data.message)
        
        
            } catch (error) {
              showToast("error", error.message)
            }
              
             
            
        }
    
  return (
  <Button variant="outline" className="w-full" onClick={handleLogin}>
<FcGoogle />
 Continue with Google
  </Button>
  )
}

export default GoogleLogin