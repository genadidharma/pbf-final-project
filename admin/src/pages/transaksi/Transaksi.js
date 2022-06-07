
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxes, faLaptopCode, faPalette, faShoppingBasket, faTruckLoading, faTruckMoving, faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Col, Row, Nav, Tab, Card, Container, Table, ButtonGroup, Button } from '@themesberg/react-bootstrap';

import Documentation from "../../components/Documentation";

export default () => {
  return (
    <Tab.Container defaultActiveKey="pesanan_baru">
        <center><h2>TRANSAKSI</h2></center>
        <Row className="mt-3">
            <Col lg={12}>
            <Nav fill variant="pills" className="flex-column flex-sm-row">
                <Nav.Item>
                    <Nav.Link eventKey="pesanan_baru" className="mb-sm-3 mb-md-0">
                        <FontAwesomeIcon icon={faBoxes} className="me-2" /> Pesanan Masuk
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="pesanan_akan_dikirimkan" className="mb-sm-3 mb-md-0">
                        <FontAwesomeIcon icon={faTruckLoading} className="me-2" /> Pengemasan
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="pesanan_dikirimkan" className="mb-sm-3 mb-md-0 ">
                        <FontAwesomeIcon icon={faTruckMoving} className="me-2" /> Dikirimkan
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="pesanan_batal" className="mb-sm-3 mb-md-0 border text-danger">
                        <FontAwesomeIcon icon={faUserSlash} className="me-2" /> Dibatalkan
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
                                <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ban Mobil</td>
                                <td>12</td>
                                <td>Rp.400.000</td>
                                <td scope="col">
                                    <ButtonGroup>
                                        <Button className="btn btn-success" >Kemas</Button>
                                        <Button className="btn btn-danger" >Batalkan</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
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
                                <th scope="col">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ban Mobil</td>
                                <td>12</td>
                                <td>Rp.400.000</td>
                                <td scope="col">
                                    <ButtonGroup>
                                        <Button className="btn btn-success" >Kirimkan</Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ban Mobil</td>
                                <td>12</td>
                                <td>Rp.400.000</td>
                            </tr>
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ban Mobil</td>
                                <td>12</td>
                                <td>Rp.400.000</td>
                            </tr>
                        </tbody>
                    </Table>
                </Tab.Pane>
            </Tab.Content>
            </Col>
        </Row>
    </Tab.Container>
  );
};