import Image from "../nillkin-case-1.jpg";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import {set , ref , onValue, remove ,orderByChild , equalTo , query, get, child, update, limitToFirst} from "firebase/database"
import {db} from "../database/config"; 
import React, { useEffect } from "react";
import {uid} from "uid";
import {auth} from '../database/config'


function Product(props) {
  const convertToRupiah =(money)=>{
    return new Intl.NumberFormat('id-ID',
     { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(money);
  }

  const history = useHistory();

  const addToDatabase=()=>{
    const dbRef = query(ref(db,'produk'),orderByChild("uuid") , equalTo(props.uuid));

    // const dbRef1 = query(ref(db,'cart'),orderByChild("idUser") , equalTo("1a957357bf3"));
    // let checkIdUser = false;
    // onValue(dbRef1 , (snapshot) => {
    //   snapshot.forEach(childSnapshot =>{
    //     let var2 = childSnapshot.val();
        
    //     if (var2.idUser == null) {
    //       checkIdUser = true;
    //     }
    //   })
    // })

    onValue(dbRef , (snapshot) => {
      snapshot.forEach(childSnapshot =>{
          let variable = childSnapshot.val();
          const uuid = uid();
          let qtySekarang=0;
          set(ref(db,`cart/${uuid}`),{
              idProduk : variable.uuid,
              namaProduk: variable.namaProduk,
              jenisProduk : variable.jenisProduk,
              qtyProduk : qtySekarang+1,
              hargaProduk : variable.hargaProduk,
              idCart : uuid,
              emailUser : auth.currentUser.email
          });
      })
    });
  };

  return (
    <div className="col">
      <div className="card shadow-sm">
        <Link to="/products/1" href="!#" replace>
          <img
            className="card-img-top bg-dark cover"
            height="200"
            alt=""
            src={Image}
          />
        </Link>
        <div className="card-body">
          <h5 className="card-title text-center text-dark text-truncate">
            {props.namaProduk}
          </h5>
          <p className="card-text text-center text-muted mb-0">{props.jenisProduk}</p>
          <p className="card-text text-center mb-0 text-black">{convertToRupiah(props.hargaProduk)}</p>
          <div className="d-grid d-block">
              <button className="btn btn-outline-success mt-2" onClick={() => addToDatabase(props.uuid)}>
                <FontAwesomeIcon icon={["fas", "cart-plus"]} /> Add to cart
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
