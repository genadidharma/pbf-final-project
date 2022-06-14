import { Link } from "react-router-dom";
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import Product from "./Product";

import { onValue, query, ref } from "firebase/database";
import React from "react";
import { db } from "../database/config";

export class ProductList extends React.Component {

  constructor() {
    super();
    this.state = {
      produkData: [],
      jenisData: []
    }
  }

  componentDidMount() {
    const dbRef = query(ref(db, 'produk'));
    onValue(dbRef, (snapshot) => {
      let records = [];
      snapshot.forEach(childSnapshot => {
        let keyName = childSnapshot.key;
        let data = childSnapshot.val();
        records.push({ "key": keyName, "data": data });
      });
      this.setState({ produkData: records })
    });
  };
  render() {
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

        <div className="row mb-4 mt-lg-3">
          <div className="d-none d-lg-block col-lg-3">
            <div className="border rounded shadow-sm">
              <ul className="list-group list-group-flush rounded">
                <li className="list-group-item">
                  <h5 className="mt-1 mb-1">Kategori</h5>
                  <div className="d-flex flex-column">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="Aksesoris" />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Aksesoris
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="Part Mesin" />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Part Mesin
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="Body Kit" />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Body Kit
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" value="Ban" />
                      <label className="form-check-label" htmlFor="flexCheckDefault">
                        Ban
                      </label>
                    </div>
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
                {this.state.produkData.map((row) => {
                  return (
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
