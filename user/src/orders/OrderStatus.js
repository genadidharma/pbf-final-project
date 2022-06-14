import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import ScrollToTopOnMount from '../template/ScrollToTopOnMount';
import { equalTo, onValue, orderByChild, query, ref, remove, set } from 'firebase/database';
import { auth, db } from '../database/config';

class OrderStatus extends React.Component {
    constructor() {
        super();
        this.state = {
            orderData: []
        }
    }

    componentDidMount() {
        const dbRef = query(ref(db, 'transaksi'));
        onValue(dbRef, (snapshot) => {
            let records = []

            snapshot.forEach(childSnapshot => {
                let status = childSnapshot.key

                childSnapshot.forEach(grandChildSnapshot => {
                    let keyName = grandChildSnapshot.key;
                    let data = grandChildSnapshot.val();


                    if (data.emailUser == auth.currentUser.email) {
                        records.push({ "key": keyName, "status": status, "data": data });
                    }
                })
            });
            this.setState({ orderData: records })
        })
    }

    render() {
        const convertOrderStatus = (status) => {
            if (status == 'masuk') {
                return <p className='text-info'>Dipesan</p>
            } else if (status == 'kemas') {
                return <p className='text-warning'>Dikemas</p>
            } else if (status == 'kirim') {
                return <p className='text-primary'>Dikirim</p>
            } else {
                return <p className='text-danger'>Dibatalkan</p>
            }
        }

        const handleStatusBarang = (from, to, transaksi) => {
            set(ref(db, `/transaksi/${to}/${transaksi.uuid}`), {
                produk: transaksi.produk,
                qty: transaksi.qty,
                emailUser: transaksi.emailUser,
                nama: transaksi.nama,
                alamat: transaksi.alamat,
                telepon: transaksi.telepon,
                uuid: transaksi.uuid
            }).then(() => {
                remove(ref(db, `/transaksi/${from}/${transaksi.uuid}`))
            });
        }

        return (
            <div className="container mt-5 py-4 px-xl-5" >
                <ScrollToTopOnMount />
                <nav aria-label="breadcrumb" className="bg-custom-light rounded">
                    <ol className="breadcrumb p-3 mb-0">
                        <li className="breadcrumb-item">
                            <Link
                                className="text-decoration-none link-secondary"
                                to="/products"
                                replace
                            >
                                Order Status
                            </Link>
                        </li>
                    </ol>
                </nav>

                <div className="row mb-4 mt-lg-3">
                    <div className="col-lg-12">
                        <div className="d-flex flex-column h-100">

                            <div className={"row row-cols-1 row-cols-md-2 row-cols-lg-2 g-3 mb-4 flex-shrink-0 row-cols-xl-3"}>
                                {
                                    this.state.orderData.map(order => {
                                        return (
                                            <Card style={{ width: '100%' }}>
                                                <Card.Body>
                                                    <Card.Title>{order.data.produk.namaProduk}</Card.Title>
                                                    <Card.Text>Jumlah: {order.data.qty}</Card.Text>
                                                    <Card.Text>
                                                        {convertOrderStatus(order.status)}
                                                    </Card.Text>
                                                    {
                                                        order.status == 'masuk' || order.status == 'kemas' ?
                                                            <Button className='btn btn-danger float-end' onClick={() => handleStatusBarang(order.status, "batal", order.data)}>Batalkan</Button>
                                                            : null
                                                    }
                                                </Card.Body>
                                            </Card>
                                        )
                                    })
                                }
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

export default OrderStatus