import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Button, Table, ButtonGroup, Form, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from "react-router-dom";
import { Routes } from "../../routes";
import { ref, onValue, remove, child, get } from "firebase/database"
import { db } from "../../Database/config"

export class Stok extends React.Component {
    constructor() {
        super();
        this.state = {
            stokData: []
        }
    }
    componentDidMount() {
        const stokRef = ref(db, 'stok');

        onValue(stokRef, (snapshot) => {
            let records = [];

            snapshot.forEach((childSnapshot) => {
                let produkId = childSnapshot.key
                let qty = childSnapshot.val().qtyProduk

                const produkRef = ref(db, `produk/${produkId}`)

                onValue(produkRef, (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                        let keyName = childSnapshot.key;
                        let data = childSnapshot.val()
                        records.push({ "key": keyName, "data": data });
                    })
                })

            });
            this.setState({ stokData: records })
            console.log(this.state.stokData)
        });
    }

    render() {
        const handleHapus = (id) => {
            remove(ref(db, `/stok/${id}`));
        };
        const convertToRupiah = (numb) => {
            const format = numb.toString().split('').reverse().join('');
            const convert = format.match(/\d{1,3}/g);
            const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('');

            return rupiah;
        }
        return (
            <div>
                <Form>
                    <div className="d-flex align-items-center mb-3">
                        <Form className="navbar-search">
                            <Form.Group id="topbarSearch">
                                <InputGroup className="input-group-merge search-bar">
                                    <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                                    <Form.Control type="text" placeholder="Search" />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </div>
                    <Card border="light" className="shadow-sm">
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <h5>Stok Produk Toko</h5>
                                </Col>
                                <Col className="text-end">
                                    <Link to={Routes.TambahStok.path}>
                                        <Button className="btn btn-success" to={Routes.TambahStok.path}><FontAwesomeIcon icon={faPlus} className="me-2" />Tambah Stok</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Table responsive className="align-items-center table-flush">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Nama Produk</th>
                                    <th scope="col">Harga Satuan</th>
                                    <th scope="col">Stok</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.stokData.map((row, index) => {
                                    console.log(row)
                                    return (
                                        <tr>
                                            <td>{row.data.namaProduk}</td>
                                            <td>{row.data.hargaProduk}</td>
                                            <td>{row.data.qty}</td>
                                            <td scope="col">
                                                <ButtonGroup>
                                                    <Button className="btn btn-primary">Edit</Button>
                                                    <Button className="btn btn-danger" onClick={() => handleHapus(row.data.uuid)}>Hapus</Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Card>
                </Form>
            </div>
        )
    }
}

export default Stok;