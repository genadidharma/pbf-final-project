import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faPlus, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Form, InputGroup } from '@themesberg/react-bootstrap';


export default () => {
        return (
            <div>
                <Form>
                    <Form.Group>
                        <label>NAMA PRODUK</label>
                        <Form.Control type="text" id="namaproduk"/>
                    </Form.Group>
                    <Form.Group className="pt-3">
                        <label>JENIS PRODUK</label>
                        <div class="input-group">
                        <label class="input-group-text" for="jenisproduk">Options</label>
                            <select class="form-select" id="jenisproduk">
                                <option selected>Choose...</option>
                                <option value="Aksesoris">Aksesoris</option>
                                <option value="Part Mesin">Part Mesin</option>
                                <option value="Body Kit">Body Kit</option>
                            </select>
                        </div>
                    </Form.Group>
                    <Form.Group className="pt-3">
                        <label>QTY</label>
                        <Form.Control type="number" id="qty"/>
                    </Form.Group>
                    <Form.Group className="pt-3">
                        <label>HARGA</label>
                        <Form.Control type="text" id="harga"/>
                    </Form.Group>

                    <Button className="btn btn-success mt-3" type="submit">Tambahkan Sekarang</Button>
                </Form>
            </div>
        )
}

