import React, { Component } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faPlus, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Form, InputGroup } from '@themesberg/react-bootstrap';
import {set , ref} from "firebase/database"
import {db} from "../../Database/config" 
import {uid} from "uid";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default () => {
    const history = useHistory();

    const [namaProduk , setNamaProduk] = useState("");
    const [jenisProduk , setJenisProduk] = useState("");
    const [qtyProduk , setQtyProduk] = useState("");
    const [hargaProduk , setHargaProduk] = useState("");
    // const [fotoProduk , setFotoProduk] = useState("");


    const handleChangeNama = (e) =>{
        setNamaProduk(e.target.value);
    }
    const handleChangeJenis = (e) =>{
        setJenisProduk(e.target.value);
    }
    const handleChangeQty = (e) =>{
        setQtyProduk(e.target.value);
    }
    const handleChangeHarga = (e) =>{
        setHargaProduk(e.target.value);
    }
    // const handleChangeFoto = (e) =>{
    //     setHargaProduk(e.target.files[0]);
    // }
    const addToDatabase=()=>{
        const uuid = uid();
        set(ref(db,`produk/${uuid}`),{
            namaProduk,
            jenisProduk,
            qtyProduk,
            hargaProduk,
            uuid
        });
        history.push('/editproduk');
    };
        return (
            <div>
                <Form>
                    <Form.Group>
                        <label>NAMA PRODUK</label>
                        <Form.Control type="text" id="namaproduk" value={namaProduk} onChange={handleChangeNama}/>
                    </Form.Group>
                    <Form.Group className="pt-3">
                        <label>JENIS PRODUK</label>
                        <div class="input-group">
                        <label class="input-group-text" for="jenisproduk">Options</label>
                            <select class="form-select" id="jenisproduk" onChange={handleChangeJenis}>
                                <option selected>Choose...</option>
                                <option value="Aksesoris">Aksesoris</option>
                                <option value="Part Mesin">Part Mesin</option>
                                <option value="Body Kit">Body Kit</option>
                            </select>
                        </div>
                    </Form.Group>
                    <Form.Group className="pt-3">
                        <label>QTY</label>
                        <Form.Control type="number" id="qty" value={qtyProduk} onChange={handleChangeQty}/>
                    </Form.Group>
                    <Form.Group className="pt-3">
                        <label>HARGA</label>
                        <Form.Control type="text" id="harga" value={hargaProduk} onChange={handleChangeHarga}/>
                    </Form.Group>

                    <Button className="btn btn-success mt-3" type="submit" onClick={addToDatabase}>Tambahkan Sekarang</Button>
                </Form>
            </div>
        )
}

