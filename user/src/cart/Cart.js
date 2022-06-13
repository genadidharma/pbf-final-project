import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import 'bootstrap/dist/css/bootstrap.min.css';
import { faAngleDown, faAngleUp ,faTrash , faMinus , faPlus} from '@fortawesome/free-solid-svg-icons';


import {set , ref , onValue, remove ,orderByChild , equalTo , query, update} from "firebase/database"
import {db} from "../database/config"; 
import React, { useEffect } from "react";


function Cart(props){
    const history = useHistory();
    const handleChangeTambah = (qty , user) => {
        update(ref(db, `/cart/${user}`), {
            qtyProduk:qty+1,
        });
        history.push('/cart');
    }
    const handleChangeKurang = (qty , user) => {
        update(ref(db, `/cart/${user}`), {
            qtyProduk:qty-1,
        });
        history.push('/cart');
    }
    const convertToRupiah =(money)=>{
        return new Intl.NumberFormat('id-ID',
         { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(money);
      }
    const handleHapus = (userId) =>{
        remove(ref(db,`/cart/${userId}`));
    };
    return (
        <tr>
            <td>{props.namaProduk}</td>
            <td>
                <button className="btn btn-outline-danger"  onClick={() => handleChangeKurang(props.qty , props.user)}><FontAwesomeIcon icon={faMinus}/></button>
                    <span className="ms-2 me-2">{props.qty}</span>
                <button className="btn btn-outline-success" onClick={() => handleChangeTambah(props.qty , props.user)}><FontAwesomeIcon icon={faPlus} /></button>
            </td>
            <td>{convertToRupiah(props.harga*props.qty)}</td>
            <td>
                <button className="btn btn-danger" onClick={()=> handleHapus(props.user)}><FontAwesomeIcon icon={faTrash}/></button>
            </td>
        </tr>              
    );
}



export default Cart;
