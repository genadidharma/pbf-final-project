import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Button, Table, ButtonGroup, Form, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from "react-router-dom";
import { Routes } from "../../routes";
import { ref, onValue, remove, child, get } from "firebase/database"
import { db } from "../../Database/config"
import { useHistory } from "react-router-dom";

export class JenisProduk extends React.Component {
    constructor() {
        super();
        this.state = {
            jenisProdukData: []
        }
    }
    componentDidMount() {
        const dbRef = ref(db, 'jenis_produk');
        onValue(dbRef, (snapshot) => {
            let records = [];
            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({ "key": keyName, "data": data });
            });
            this.setState({ jenisProdukData: records })
        });
    }

    render() {

        const handleHapus = (id) => {
            remove(ref(db, `/jenis_produk/${id}`));
        };

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
                                    <h5>Jenis Produk Toko</h5>
                                </Col>
                                <Col className="text-end">
                                    <Link to={Routes.TambahJenisProduk.path}>
                                        <Button className="btn btn-success" to={Routes.TambahJenisProduk.path}><FontAwesomeIcon icon={faPlus} className="me-2" />Tambah Jenis Produk</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Table responsive className="align-items-center table-flush">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">Nama</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.jenisProdukData.map((row, index) => {
                                    return (
                                        <tr key={row.data.uuid}>
                                            <td>{index + 1}</td>
                                            <td>{row.data.nama}</td>
                                            <td scope="col">
                                                <ButtonGroup>
                                                    <Link to={`jenis-produk/edit/${row.data.uuid}`}> <Button className="btn btn-primary">Edit</Button> </Link>
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

export default JenisProduk;