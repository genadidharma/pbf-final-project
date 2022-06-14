import { useState } from "react";
import { Component } from "react";
import { useRef } from "react";
import {createUserWithEmailAndPassword, signOut , signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import {auth} from '../database/config'
import { Link, useHistory } from "react-router-dom";


const Login = () => {
    const [loginEmail , setLoginEmail] = useState("");
    const [loginPassword , setLoginPassword] = useState("");

    const history = useHistory();
    const login = async() =>{
        try{
            const user = await signInWithEmailAndPassword(auth , loginEmail , loginPassword);
            console.log(user);
            history.push('/productlist')
        }catch(error){
            console.log(error.message);
        }
    }
        return(
            <div>
            <div className="container mt-5 w-25 text-center d-flex justify-content-center">
                <div className="card mt-5">
                    <div class="card-header">
                        Login Form
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p>Username</p>
                            <input className="form-control" placeholder="Username" type="text"
                                onChange={(event) =>{ setLoginEmail(event.target.value);
                            }}
                            ></input>
                            <p className="pt-3">Password</p>
                            <input className="form-control" placeholder="Password" type="password"
                                onChange={(event) =>{ setLoginPassword(event.target.value);
                                }}
                            ></input>
                            <div class="d-grid gap-2">
                                <button className="btn btn-primary mt-3"
                                    onClick={login} 
                                >
                                    Login
                                </button>
                            </div>
                            <div>
                            <div class="d-grid mt-3">
                                <Link to="/login">
                                    Register
                                </Link>
                            </div>     
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
            </div>
        );
}

export default Login;