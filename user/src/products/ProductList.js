import { Link } from "react-router-dom";
import Product from "./Product";
import ProductH from "./ProductH";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";

import {set , ref , onValue, remove ,orderByChild , equalTo , query} from "firebase/database"
import {db} from "../database/config"; 
import React, { useEffect } from "react";

const brands = ["Apple", "Samsung", "Google", "HTC"];


export class ProductList extends React.Component{

  constructor(){
    super();
    this.state = {
        produkData: [],
        jenisData: []
    }
  }

  componentDidMount(){
      const dbRef = query(ref(db,'produk'));
      onValue(dbRef, (snapshot)=>{
          let records = [];
          snapshot.forEach(childSnapshot=>{
              let keyName = childSnapshot.key;
              let data = childSnapshot.val();
              records.push({"key":keyName , "data":data});
          });
          this.setState({produkData:records})
      });

      const dbRef1 = query(ref(db,'jenis_produk'));
        onValue(dbRef1, (snapshot1)=>{
            let records1 = [];
            snapshot1.forEach(childSnapshot1=>{
                let keyName1 = childSnapshot1.key;
                let data1 = childSnapshot1.val();
                records1.push({"key":keyName1 , "data":data1});
            });
            this.setState({jenisData:records1})
        });
    };
  render(){
    return (
      <div className="container mt-5 py-4 px-xl-5">
        <ScrollToTopOnMount />
        <nav aria-label="breadcrumb" className="bg-custom-light rounded">
          <ol className="breadcrumb p-3 mb-0">
            <li className="breadcrumb-item">
              <Link
                className="text-decoration-none link-secondary"
                to="/products"
                replace
              >
                All Prodcuts
              </Link>
            </li>
          </ol>
        </nav>

        <div className="row mb-3 d-block d-lg-none">
          <div className="col-12">
            <div id="accordionFilter" className="accordion shadow-sm">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button fw-bold collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFilter"
                    aria-expanded="false"
                    aria-controls="collapseFilter"
                  >
                    Filter Products
                  </button>
                </h2>
              </div>
              <div
                id="collapseFilter"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFilter"
              >
                <div className="accordion-body p-0">
                  <ul className="list-group list-group-flush rounded">
                    <li className="list-group-item">
                      <h5 className="mt-1 mb-1">Brands</h5>
                      <div className="d-flex flex-column">
                      {this.state.jenisData.map((row)=>{
                        return(
                          <div key={row.data.uuid} className="form-check">
                            <input className="form-check-input" type="checkbox" value={row.data.nama}/>
                            <label className="form-check-label" htmlFor="flexCheckDefault">
                              {row.data.nama}
                            </label>
                          </div>
                        )
                      })}
                      </div>
                    </li>
                  <button className="btn btn-dark">Apply</button>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mb-4 mt-lg-3">
          <div className="d-none d-lg-block col-lg-3">
            <div className="border rounded shadow-sm">
              <ul className="list-group list-group-flush rounded">
                <li className="list-group-item">
                  <h5 className="mt-1 mb-1">Kategori</h5>
                  <div className="d-flex flex-column">
                  {this.state.jenisData.map((row)=>{
                    return(
                      <div key={row.data.uuid} className="form-check">
                        <input className="form-check-input" type="checkbox" />
                        <label className="form-check-label" htmlFor="flexCheckDefault">
                          {row.data.nama}
                        </label>
                      </div>
                    )
                  })}
                  </div>
                </li>
                <button className="btn btn-dark">Apply</button>
              </ul>
            </div>
          </div>
          
          <div className="col-lg-9">
            <div className="d-flex flex-column h-100">

              <div
                className={
                  "row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 row-cols-xl-3"
                }
              >
               {this.state.produkData.map((row)=>{
                  return(
                    <Product key={row.data.uuid} uuid={row.data.uuid} namaProduk={row.data.namaProduk} jenisProduk={row.data.jenisProduk} hargaProduk={row.data.hargaProduk} qtyProduk={row.data.qtyProduk} />
                    )
                })}
              </div>
              <div className="d-flex align-items-center mt-auto">
                <nav aria-label="Page navigation example" className="ms-auto">
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}



export default ProductList;
