import React, { useState } from 'react'
import "./style.css"
import Input from '../Input'
import Button from '../Button';
import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth , db , provider } from '../../firebase';
import { toast } from 'react-toastify';
import { doc , setDoc , getDoc} from "firebase/firestore";
import { useNavigate } from 'react-router-dom';


function SignupSignin() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [loading , setLoading] = useState(false);
  const [loginForm , setLoginForm] = useState(false);
  const navigate = useNavigate()

  function signupwithEmail(){
    setLoading(true);

    if(name != "" && email != "" && password != "" && confirmPassword != ""){
      if(password === confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log("user>>",user)
          toast.success("user created successfully")
          setLoading(false);
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setName("");
          createDoc(user);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false);
          // ..
        });
      }else{
        toast.error("Password and Confirm Password does not match");
        setLoading(false);
      }
      
    }else{
      toast.error("All fields are required");
      setLoading(false);
    }
  }
    function loginUsingEmail(){
      
      if( email != "" && password != "" ){
          signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("user>>" ,user)
            toast.success("user login successfully")
            navigate("/dashboard")
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
          });
      }else{
        toast.error("All fields are required");
      }
    
    }

    function googleAuth(){
      setLoading(true)
       try{
        signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token.  You can use it to access theGoogle API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("user>>",user);
          createDoc(user);
          setLoading(false);
          navigate("/dashboard")
          toast.success("user Authenticate!")
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage);
          setLoading(false)
          // ...
        });
       }catch(e){
          toast.error(e.message);
          setLoading(false)
       }
    }
    async function createDoc(user){
      // make sure that doc with that uid not exist
      // create a doc
      if(!user) return;
        setLoading(true);
      const userRef = doc(db,"user", user.uid);
      const userData = await getDoc(userRef);
      if(!userData.exists()){
        try{
          await setDoc(doc(db,"users",user.uid), {
             name: user.displayName ? user.displayName : name,
             email: user.email,
             photoURL: user.photoURL ? user.photoURL : "",
             createdAt: new Date(),
          });
          toast.success("doc created");
          setLoading(false)
        }catch(e){
          toast.error(e.message);
          setLoading(false)
          console.log("error while createing doc")
         }
       }else{
        toast.error("Doc already exist")
       }
    }

  return (
    <>
    { 
      loginForm ?  (
       <div className='signup-wrapper'>
        <h2 className='title'>
            Login on  <span style={{color: "var(--theme)" }}> Financely</span></h2>

        <form>
            <Input 
            type = {"email"}
            label ={"Email"}
            state ={email}
            setState ={setEmail}
            placeholder={"JohnDoe@gmail.com"}
            />
            <Input 
            type ={"password"}
            label ={"Password"}
            state ={password}
            setState ={setPassword}
            placeholder={"JohnDoe@123"}
            />
            <Button disabled ={loading} 
            text={loading ? "Loadind..." : "Login using Email and Password"}  onClick={loginUsingEmail}/>
            <p className="p-login">or</p>
            <Button disabled = {loading} 
            onClick={googleAuth}
            text={loading ? "Loading..." : "Login using Google"} blue={true} />
          <p className="p-login" onClick={()=> setLoginForm(!loginForm)}> Or Don't Have An Account? Click here</p>
        </form>

    </div> 
      )  : ( <div className='signup-wrapper'>
        <h2 className='title'>
            Sign Up on  <span style={{color: "var(--theme)" }}> Financely</span></h2>

        <form>
            <Input 
            type={"text"}
            label ={"full name"}
            state ={name}
            setState ={setName}
            placeholder={"John Doe"}
            />
            <Input 
            type = {"email"}
            label ={"Email"}
            state ={email}
            setState ={setEmail}
            placeholder={"JohnDoe@gmail.com"}
            />
            <Input 
            type ={"password"}
            label ={"Password"}
            state ={password}
            setState ={setPassword}
            placeholder={"JohnDoe@123"}
            />
            <Input 
            type = {"password"}
            label ={"Confirm Password"}
            state ={confirmPassword}
            setState ={setConfirmPassword}
            placeholder={"JohnDoe@123"}
            />
            <Button disabled ={loading} 
            text={loading ? "Loadind..." : "Signup using Email and Password"}  onClick={signupwithEmail}/>
            <p style={{textAlign:"center",margin:0}}>or</p>
            <Button disabled = {loading} 
            onClick={googleAuth}
            text={loading ? "Loading..." : "Signup using Google"} blue={true} />
          <p className="p-login" onClick={()=> setLoginForm(!loginForm)}>Have An Account? Click here to Login</p>
        </form>
    </div> )
    }
    
    </>
  );
}

export default SignupSignin