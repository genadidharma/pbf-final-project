import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faPlus, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Form, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from "react-router-dom";
import { Routes } from "../../routes";
import {set , ref , onValue, remove} from "firebase/database"
import {db} from "../../Database/config" 

export class EditProduk extends React.Component{
    constructor(){
        super();
        this.state = {
            produkData: []
        }
    }
    componentDidMount(){
        const dbRef = ref(db,'produk');
        onValue(dbRef, (snapshot)=>{
            let records = [];
            snapshot.forEach(childSnapshot=>{
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({"key":keyName , "data":data});
            });
            this.setState({produkData:records})
        });
    };

    render(){
        const handleHapus = (todo) =>{
            remove(ref(db,`/produk/${todo}`));
        };
        const convertToRupiah =(numb)=>{
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
                                <h5>Produk Toko</h5>
                            </Col>
                            <Col className="text-end">
                                <Link to={Routes.TambahProduk.path}>
                                <Button className="btn btn-success" to={Routes.TambahProduk.path}><FontAwesomeIcon icon={faPlus} className="me-2" />Tambah Produk</Button>
                                </Link>
                            </Col>
                            </Row>
                        </Card.Header>
                        <Table responsive className="align-items-center table-flush">
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
                                {/* <tr>
                                    <td scope="col">Lampu Kota Avanza</td>
                                    <td scope="col">Aksesoris</td>
                                    <td scope="col">23</td>
                                    <td scope="col">Rp.250.0000</td>
                                    <td scope="col">
                                        <ButtonGroup>
                                            <Button className="btn btn-primary">Edit</Button>
                                            <Button className="btn btn-danger">Hapus</Button>
                                        </ButtonGroup>
                                    </td>
                                </tr> */}
                                {this.state.produkData.map((row, index)=>{
                                    return(
                                    <tr>
                                        <td>{row.data.namaProduk}</td>
                                        <td>{row.data.jenisProduk}</td>
                                        <td>{row.data.qtyProduk}</td>
                                        <td>{convertToRupiah(row.data.hargaProduk)}</td>
                                        <td scope="col">
                                        <ButtonGroup>
                                            <Button className="btn btn-primary">Edit</Button>
                                            <Button className="btn btn-danger" onClick={()=> handleHapus(row.data.uuid)}>Hapus</Button>
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