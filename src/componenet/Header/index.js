import React, { useEffect } from "react";
import "./style.css";
import { auth } from "../../firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { signOut } from "firebase/auth";
import profilePic from "../../assets/profilePic.jpg";
const Header = () =>{

const [user, loading] = useAuthState(auth);
const navigate = useNavigate();

useEffect(()=>{
    if(user){
        navigate("/dashboard")
    }
})

 function logoutFnc(){
    try{
        signOut(auth)
        .then(() => {
            // Sign-out successful.
            navigate("/");
            {
            toast.success("Logout successfully");
            }

          }).catch((error) => {
            toast.error(error.message);
          });
      
        }catch(error){
            toast.error(error.message);
        }
 }

    return(
        <div className="navbar">
            <p className="logo">Finacely.</p>
            { user && (

                <div className="nav-item"> 
                    <img 
                    src={user.photoURL ? user.photoURL : profilePic}
                    className="profile-img"
                    />
                 <p className="logo link" onClick={logoutFnc}>Logout</p>
                </div>
                    )}
        </div>
    )
}
export default Header;