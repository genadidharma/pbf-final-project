import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faAngleDown, faAngleUp} from '@fortawesome/free-solid-svg-icons';

import {set , ref , onValue, remove ,orderByChild , equalTo , query, update} from "firebase/database"
import {db} from "../database/config"; 
import React, { useEffect } from "react";
import Cart from "./Cart";
import {auth} from '../database/config'



export class CartList extends React.Component{

    constructor(){
        super();
        this.state = {
            produkData: []
        }
    }
    componentDidMount(){
        const dbRef = query(ref(db,'cart') , orderByChild('emailUser') , equalTo(auth.currentUser.email));
        onValue(dbRef, (snapshot)=>{
            let records = [];
            snapshot.forEach(childSnapshot=>{
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key":keyName , "data":data});
            });
            this.setState({produkData:records})
        });
    };


    render(){
        const total=0;

        return (
            <div>
                <div className="container mt-5 py-4 px-xl-5">
                    <ScrollToTopOnMount />
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">Nama Produk</th>
                                <th scope="col">QTY</th>
                                <th scope="col">HARGA</th>
                                <th scope="col">AKSI</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.produkData.map((row)=>{
                                return(
                                    <Cart key={row.data.idCart} user={row.data.idCart} namaProduk={row.data.namaProduk} qty={row.data.qtyProduk} harga={row.data.hargaProduk} />
                                )
                            })}
                        </tbody>
                    </table>
                    <button className="btn btn-success">Checkout Sekarang</button>
                </div>
            </div>
        );
    }
}



export default CartList;
