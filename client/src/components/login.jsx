import React from "react";
import { useState } from "react";

function Login() {
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const submit=async(e)=>{
        e.preventDefault();
        const allInputValue={
            username:username,
            password:password
        }
        let res=await fetch("http://localhost:5000/api_login",{
            method:"POST",
            headers:{'content-type':'application/json'},
            body:JSON.stringify(allInputValue)
        })
    }
    return<div className="homediv">
        <form onSubmit={submit}>
            <h1>Login</h1>
            <label>username</label>
            <input type={"text"} value={username} onChange={(e)=>{setUsername(e.target.value)}}/><br />
            <label>password</label>
            <input type={"password"} value={password} onChange={(e)=>{setPassword(e.target.value)}}/><br />
            <button type="submit">Submit</button>
        </form>
    </div>
}

export default Login;