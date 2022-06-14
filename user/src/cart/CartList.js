import 'bootstrap/dist/css/bootstrap.min.css';
import ScrollToTopOnMount from "../template/ScrollToTopOnMount";
import { child, equalTo, get, onValue, orderByChild, query, ref, remove, set, update } from "firebase/database";
import React from "react";
import { Modal } from "react-bootstrap";
import { uid } from "uid";
import { auth, db } from "../database/config";
import Cart from "./Cart";


export class CartList extends React.Component {

    constructor() {
        super();
        this.state = {
            nama: "",
            alamat: "",
            telepon: "",
            produkData: [],
            show: false
        }
    }
    componentDidMount() {
        const dbRef = query(ref(db, 'keranjang'), orderByChild('emailUser'), equalTo(auth.currentUser.email));
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
        const handleShow = () => this.setState({ show: true })
        const handleClose = () => this.setState({ show: false })

        const handleChangeNama = (e) => {
            this.setState({nama: e.target.value})
        }

        const handleChangeAlamat = (e) => {
            this.setState({alamat: e.target.value})
        }

        const handleChangeTelepon = (e) => {
            this.setState({telepon: e.target.value})
        }

        const onCheckout = () => {
            this.state.produkData.map((produk) => {
                let uuid = uid()
                set(ref(db, `transaksi/masuk/${uuid}`), {
                    produk: produk.data.produk,
                    qty: produk.data.qty,
                    emailUser: produk.data.emailUser,
                    nama: this.state.nama,
                    alamat: this.state.alamat,
                    telepon: this.state.telepon,
                    uuid: uuid
                }).then(() => {
                    get(child(ref(db), `/produk/${produk.data.produk.uuid}`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            let qty = snapshot.val().qtyProduk
                            update(ref(db, `/produk/${produk.data.produk.uuid}`), {
                                qtyProduk: parseInt(qty) - parseInt(produk.data.qty)
                            });
                        }
                    })
                }).then(() => {
                    remove(ref(db, `/keranjang/${produk.data.uuid}`))
                }).then(() => {
                    handleClose()
                })
            })
        }

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
                            {this.state.produkData.map((row) => {
                                return (
                                    <Cart key={row.data.produk.idCart} uuid={row.data.uuid} namaProduk={row.data.produk.namaProduk} qty={row.data.qty} harga={row.data.produk.hargaProduk} />
                                )
                            })}
                        </tbody>
                    </table>
                    <button className="btn btn-success" disabled={Object.keys(this.state.produkData).length === 0}
                        onClick={handleShow}
                    >Checkout</button>
                </div>

                <Modal show={this.state.show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Checkout Detail</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <from>
                            <div class="form-group">
                                <label for="nama">Nama</label>
                                <input type="text" class="form-control" id="nama" placeholder="Masukan Nama" onChange={handleChangeNama} />
                            </div>
                            <div class="form-group mt-2">
                                <label for="alamat">Alamat</label>
                                <input type="text" class="form-control" id="alamat" placeholder="Masukan Alamat" onChange={handleChangeAlamat} />
                            </div>
                            <div class="form-group mt-2">
                                <label for="telepon">Telepon</label>
                                <input type="tel" class="form-control" id="telepon" placeholder="Masukan No. Telepon" onChange={handleChangeTelepon} />
                            </div>
                            <button type="submit" class="btn btn-primary mt-3" onClick={onCheckout}>Checkout Sekarang!</button>
                        </from>
                    </Modal.Body>
                    <Modal.Footer>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}



export default CartList;
