import Image from "../nillkin-case-1.jpg";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { set, ref, onValue, remove, orderByChild, equalTo, query, get, child, update, limitToFirst } from "firebase/database"
import { db } from "../database/config";
import React, { useEffect } from "react";
import { uid } from "uid";
import { auth } from '../database/config'


function Product(props) {
  const convertToRupiah = (money) => {
    return new Intl.NumberFormat('id-ID',
      { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(money);
  }

  const addToDatabase = () => {
    const uuid = uid();
    let qtySekarang = 0;
    set(ref(db, `keranjang/${uuid}`), {
      produk: {
        uuid: props.uuid,
        namaProduk: props.namaProduk,
        jenisProduk: props.jenisProduk,
        qtyProduk: props.qtyProduk,
        hargaProduk: props.hargaProduk,
      },
      qty: qtySekarang + 1,
      emailUser: auth.currentUser.email,
      uuid: uuid,
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
            src={props.gambarProduk}
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
