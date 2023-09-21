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

                <div style={{display: "flex", alignItems: "center",gap:"0.75rem"}} > 
                    <img 
                    src={user.photoURL ? user.photoURL : profilePic}
                    style={{ borderRadius: "50%", width: "1.7rem", height: "1.7rem" }}
                    />
                 <p className="logo link" onClick={logoutFnc}>Logout</p>
                </div>
                    )}
        </div>
    )
}
export default Header;