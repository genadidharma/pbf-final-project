import { useState } from "react";
import { Component } from "react";
import { useRef } from "react";
import {createUserWithEmailAndPassword, signOut} from 'firebase/auth'
import {auth} from '../database/config'
import { Link, useHistory } from "react-router-dom";


const Register = () => {
    const [registerEmail , setRegisterEmail] = useState("");
    const [registerPassword , setRegisterPassword] = useState("");

    const history = useHistory();

    const register = async() =>{
        try{
            const user = await createUserWithEmailAndPassword(auth , registerEmail , registerPassword);
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
                        Register Form
                    </div>
                    <div class="card-body">
                        <blockquote class="blockquote mb-0">
                            <p>Username</p>
                            <input className="form-control" placeholder="Username" type="text"
                                onChange={(event) =>{ setRegisterEmail(event.target.value);
                            }}
                            ></input>
                            <p className="pt-3">Password</p>
                            <input className="form-control" placeholder="Password" type="password"
                                onChange={(event) =>{ setRegisterPassword(event.target.value);
                                }}
                            ></input>
                            <div class="d-grid gap-2">
                                <button className="btn btn-primary mt-3"
                                    onClick={register} 
                                >
                                    Register
                                </button>
                            </div>
                            <div>
                            <div class="d-grid mt-3">
                                <Link to="/login">
                                    Login
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

export default Register;