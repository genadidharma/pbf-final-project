
import React from "react";
import { faBoxes, faTruckLoading, faTruckMoving, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Col, Nav, Row, Tab, Table } from '@themesberg/react-bootstrap';
import { useEffect, useState } from "react";
import { onValue, query, ref, remove, set } from "firebase/database";
import { db } from "../../Database/config";

export class Transaksi extends React.Component {

    constructor() {
        super();
        this.state = {
            transaksiMasukData: [],
            transaksiKemasData: [],
            transaksiKirimData: [],
            transaksiBatalData: []
        }
    }

    componentDidMount() {
        const dbRef = query(ref(db, 'transaksi'));
        onValue(dbRef, (snapshot) => {
            let listMasuk = []
            let listKemas = []
            let listKirim = []
            let listBatal = []

            snapshot.forEach((childSnapshot) => {
                let keyName = childSnapshot.key

                childSnapshot.forEach((grandChildSnapshot) => {
                    let data = grandChildSnapshot.val()

                    if (keyName == 'masuk') {
                        listMasuk.push(data)
                    } else if (keyName == 'kemas') {
                        listKemas.push(data)
                    } else if (keyName == 'kirim') {
                        listKirim.push(data)
                    } else if (keyName == 'batal') {
                        listBatal.push(data)
                    }
                })
            })

            this.setState({ transaksiMasukData: listMasuk, transaksiKemasData: listKemas, transaksiKirimData: listKirim, transaksiBatalData: listBatal })
        });
    };

    render() {
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

        const convertToRupiah = (numb) => {
            const format = numb.toString().split('').reverse().join('');
            const convert = format.match(/\d{1,3}/g);
            const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('');

            return rupiah;
        }

        return (
            <Tab.Container defaultActiveKey="pesanan_baru" >
                <center><h2>TRANSAKSI</h2></center>
                <Row className="mt-3">
                    <Col lg={12}>
                        <Nav fill variant="pills" className="flex-column flex-sm-row">
                            <Nav.Item>
                                <Nav.Link eventKey="pesanan_baru" className="mb-sm-3 mb-md-0">
                                    <FontAwesomeIcon icon={faBoxes} className="me-2" /> Pesanan Masuk ({Object.keys(this.state.transaksiMasukData).length})
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="pesanan_akan_dikirimkan" className="mb-sm-3 mb-md-0">
                                    <FontAwesomeIcon icon={faTruckLoading} className="me-2" /> Pengemasan ({Object.keys(this.state.transaksiKemasData).length})
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="pesanan_dikirimkan" className="mb-sm-3 mb-md-0 ">
                                    <FontAwesomeIcon icon={faTruckMoving} className="me-2" /> Dikirimkan ({Object.keys(this.state.transaksiKirimData).length})
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="pesanan_batal" className="mb-sm-3 mb-md-0 border text-danger">
                                    <FontAwesomeIcon icon={faUserSlash} className="me-2" /> Dibatalkan ({Object.keys(this.state.transaksiBatalData).length})
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>


                        <Tab.Content>
                            <Tab.Pane eventKey="pesanan_baru" className="py-4">
                                <Table responsive className="align-items-center table-flush" id="myTable">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Nama Produk</th>
                                            <th scope="col">QTY</th>
                                            <th scope="col">Harga</th>
                                            <th scope="col">Pembeli</th>
                                            <th scope="col">Alamat</th>
                                            <th scope="col">Telepon</th>
                                            <th scope="col">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.transaksiMasukData.map((transaksi) => {
                                                return (
                                                    <tr key={transaksi?.uuid}>
                                                        <td>{transaksi?.produk?.namaProduk}</td>
                                                        <td>{transaksi?.qty}</td>
                                                        <td>{convertToRupiah(transaksi?.produk?.hargaProduk)}</td>
                                                        <td>{transaksi?.nama}</td>
                                                        <td>{transaksi?.alamat}</td>
                                                        <td>{transaksi?.telepon}</td>
                                                        <td scope="col">
                                                            <ButtonGroup>
                                                                <Button className="btn btn-success" onClick={() => handleStatusBarang("masuk", "kemas", transaksi)}>Kemas</Button>
                                                                <Button className="btn btn-danger" onClick={() => handleStatusBarang("masuk", "batal", transaksi)}>Batalkan</Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Tab.Pane>
                            <Tab.Pane eventKey="pesanan_akan_dikirimkan" className="py-4">
                                <Table responsive className="align-items-center table-flush">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Nama Produk</th>
                                            <th scope="col">QTY</th>
                                            <th scope="col">Harga</th>
                                            <th scope="col">Pembeli</th>
                                            <th scope="col">Alamat</th>
                                            <th scope="col">Telepon</th>
                                            <th scope="col">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.transaksiKemasData.map((transaksi) => {
                                                return (
                                                    <tr key={transaksi?.uuid}>
                                                        <td>{transaksi?.produk?.namaProduk}</td>
                                                        <td>{transaksi?.qty}</td>
                                                        <td>{convertToRupiah(transaksi?.produk?.hargaProduk)}</td>
                                                        <td>{transaksi?.nama}</td>
                                                        <td>{transaksi?.alamat}</td>
                                                        <td>{transaksi?.telepon}</td>
                                                        <td scope="col">
                                                            <ButtonGroup>
                                                                <Button className="btn btn-success" onClick={() => handleStatusBarang("kemas", "kirim", transaksi)}>Kirim</Button>
                                                                <Button className="btn btn-danger" onClick={() => handleStatusBarang("kemas", "batal", transaksi)}>Batalkan</Button>
                                                            </ButtonGroup>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Tab.Pane>
                            <Tab.Pane eventKey="pesanan_dikirimkan" className="py-4">
                                <Table responsive className="align-items-center table-flush">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Nama Produk</th>
                                            <th scope="col">QTY</th>
                                            <th scope="col">Harga</th>
                                            <th scope="col">Pembeli</th>
                                            <th scope="col">Alamat</th>
                                            <th scope="col">Telepon</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.transaksiKirimData.map((transaksi) => {
                                                return (
                                                    <tr key={transaksi?.uuid}>
                                                        <td>{transaksi?.produk?.namaProduk}</td>
                                                        <td>{transaksi?.qty}</td>
                                                        <td>{convertToRupiah(transaksi?.produk?.hargaProduk)}</td>
                                                        <td>{transaksi?.nama}</td>
                                                        <td>{transaksi?.alamat}</td>
                                                        <td>{transaksi?.telepon}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Tab.Pane>
                            <Tab.Pane eventKey="pesanan_batal" className="py-4">
                                <Table responsive className="align-items-center table-flush">
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Nama Produk</th>
                                            <th scope="col">QTY</th>
                                            <th scope="col">Harga</th>
                                            <th scope="col">Pembeli</th>
                                            <th scope="col">Alamat</th>
                                            <th scope="col">Telepon</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.transaksiBatalData.map((transaksi) => {
                                                return (
                                                    <tr key={transaksi?.uuid}>
                                                        <td>{transaksi?.produk?.namaProduk}</td>
                                                        <td>{transaksi?.qty}</td>
                                                        <td>{convertToRupiah(transaksi?.produk?.hargaProduk)}</td>
                                                        <td>{transaksi?.nama}</td>
                                                        <td>{transaksi?.alamat}</td>
                                                        <td>{transaksi?.telepon}</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </Table>
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        )
    };
};