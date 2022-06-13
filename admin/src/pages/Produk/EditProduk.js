import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Col, Form, InputGroup, Row, Table } from '@themesberg/react-bootstrap';
import { onValue, query, ref, remove } from "firebase/database";
import React from "react";
import { Link } from "react-router-dom";
import { db } from "../../Database/config";
import { Routes } from "../../routes";

export class EditProduk extends React.Component {

    constructor() {
        super();
        this.state = {
            produkData: []
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
        const handleHapus = (todo) => {
            remove(ref(db, `/produk/${todo}`));
        };
        const convertToRupiah = (numb) => {
            const format = numb.toString().split('').reverse().join('');
            const convert = format.match(/\d{1,3}/g);
            const rupiah = 'Rp ' + convert.join('.').split('').reverse().join('');

            return rupiah;
        }

        function myFunction() {
            // Declare variables
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                    txtValue = td.textContent || td.innerText;
                    if (txtValue.toUpperCase().indexOf(filter) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }
                }
            }
        }
        return (
            <div>
                <Form>
                    <div className="d-flex align-items-center mb-3">
                        <Form className="navbar-search">
                            <Form.Group id="topbarSearch">
                                <InputGroup className="input-group-merge search-bar">
                                    <InputGroup.Text><FontAwesomeIcon icon={faSearch} /></InputGroup.Text>
                                    <Form.Control type="text" placeholder="Search" id="myInput" onKeyUp={myFunction} />
                                </InputGroup>
                            </Form.Group>
                        </Form>
                    </div>
                    <Card border="light" className="shadow-sm">
                        <Card.Header>
                            <Row className="align-items-center">
                                <Col>
                                    <h5>Produk Toko</h5>
                                </Col>
                                <Col className="text-end">
                                    <Link to={Routes.TambahProduk.path}>
                                        <Button className="btn btn-success" to={Routes.TambahProduk.path}><FontAwesomeIcon icon={faPlus} className="me-2" />Tambah Produk</Button>
                                    </Link>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Table responsive className="align-items-center table-flush" id="myTable">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Nama Produk</th>
                                    <th scope="col">Jenis Produk</th>
                                    <th scope="col">QTY</th>
                                    <th scope="col">Harga</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.produkData.map((row) => {
                                    return (
                                        <tr>
                                            <td>{row.data.namaProduk}</td>
                                            <td>{row.data.jenisProduk}</td>
                                            <td>{row.data.qtyProduk}</td>
                                            <td>{convertToRupiah(row.data.hargaProduk)}</td>
                                            <td scope="col">
                                                <ButtonGroup>
                                                    <Button className="btn btn-primary" ><Link to={`/updateproduk/${row.data.uuid}`} key={row.data.uuid} className="text-white">Edit</Link></Button>
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

export default EditProduk;