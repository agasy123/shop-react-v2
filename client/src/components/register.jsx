import React from "react";
import { useState, useEffect } from "react";

function Register() {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const [user_status, setUser_status]=useState("");
    // const [user_data, setUserData]=useState(); 
    // const apiGet=()=>{
    // fetch("/userFromDatabase").then((resp)=>resp.json()).then((resp)=>{
    //   console.log(resp);
    //   setUserData(resp);
    // });
	// };
	// useEffect(()=>{
   	// 	apiGet();
	// },[])
    const submit=async(e)=>{
        e.preventDefault();
        const allInputValue={
            username:username,
            password:password,
            user_status:user_status
        }
        let res=await fetch("http://localhost:5000/api_register",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(allInputValue)
        })
    }
    return<div className="homediv">
        <form onSubmit={submit}>
            <h1>Register</h1>
            <label>Username</label>
            <input type={"text"} value={username} onChange={(e)=>{setUsername(e.target.value)}} required/><br />
            <label>Password</label>
            <input type={"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}} required/><br />
            <label>User Status</label>
            <input type={"user_status"} value={user_status} onChange={(e)=>{setUser_status(e.target.value)}} required/><br />
            <button type="submit">Submit</button>
        </form>
    </div>
}

export default Register;