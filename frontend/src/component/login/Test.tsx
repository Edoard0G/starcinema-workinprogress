import { useState } from 'react';
import { DBCALL_URL } from '../../root';
// import {  useNavigate } from "react-router-dom"  
import { UserDBcall } from '../../const';
import { FetchDataPost } from '../../fetchDB';
import axios from 'axios';
function Test() {
    // const navigate = useNavigate();
    const [username, setUsername] = useState<string>();
    const [email,setEmail] = useState<string>()
    const [password, setPassword] = useState<string>();

    function NewUser(){
        
        axios.post(DBCALL_URL+UserDBcall.SINGUP,{username:username,email:email,password:password}).then((res) => {
           
            // navigate("/")
        }
        )
    }
    // function NewUser(){
        
    //     FetchDataPost(DBCALL_URL+UserDBcall.SINGUP,{username:username,email:email,password:password}).then((res) => {
    //         alert(res)
    //         navigate("/")
    //     }
    //     )
    // }

    return (
        <div>
            <div>
            <p>username</p>

                <input
                    type="text"
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                />
                <p>mail</p>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                />
                <p>psw</p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                />
                <button
                    onClick={() => {
                        NewUser();
                    }}
                >
                    Create Account
                </button>
                
            </div>
        </div>
    );
}

export default Test;