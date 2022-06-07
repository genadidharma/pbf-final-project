import React, { Component, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faPlus, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Form, InputGroup } from '@themesberg/react-bootstrap';
import { ref, update, set, orderByChild, equalTo, get, onValue } from "firebase/database";
import { db } from "../../Database/config"
import { useHistory, useParams, useLocation } from "react-router-dom";

const EditProdukPage = () => {

    const [namaProduk, setNamaProduk] = useState("");
    const [jenisProduk, setJenisProduk] = useState("");
    const [qtyProduk, setQtyProduk] = useState("");
    const [hargaProduk, setHargaProduk] = useState("");
    const history = useHistory();

    useEffect(() => {
        const dbRef = ref(db, `produk/${params.id}`);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            setNamaProduk(data.namaProduk)
            setJenisProduk(data.jenisProduk)
            setQtyProduk(data.qtyProduk)
            setHargaProduk(data.hargaProduk)
        });
    }, [])

    const params = useParams();

    const handleChangeNama = (e) => {
        setNamaProduk(e.target.value);
    }
    const handleChangeJenis = (e) => {
        setJenisProduk(e.target.value);
    }
    const handleChangeQty = (e) => {
        setQtyProduk(e.target.value);
    }
    const handleChangeHarga = (e) => {
        setHargaProduk(e.target.value);
    }
    const handleChange = () => {
        update(ref(db, `/produk/${params.id}`), {
            namaProduk,
            jenisProduk,
            qtyProduk,
            hargaProduk,
        });
        history.push('/editproduk');
    }
    return (
        <div>
            <Form>
                <Form.Group>
                    <label>NAMA PRODUK</label>
                    <Form.Control type="text" id="namaproduk" value={namaProduk} onChange={handleChangeNama} required />
                </Form.Group>
                <Form.Group className="pt-3">
                    <label>JENIS PRODUK</label>
                    <div class="input-group">
                        <label class="input-group-text" for="jenisproduk">Options</label>
                        <select class="form-select" id="jenisproduk" onChange={handleChangeJenis} required value={jenisProduk}>
                            <option selected>Choose...</option>
                            <option value="Aksesoris">Aksesoris</option>
                            <option value="Part Mesin">Part Mesin</option>
                            <option value="Body Kit">Body Kit</option>
                            <option value="Ban">Ban</option>
                        </select>
                    </div>
                </Form.Group>
                <Form.Group className="pt-3">
                    <label>QTY</label>
                    <Form.Control type="number" id="qty" value={qtyProduk} onChange={handleChangeQty} required />
                </Form.Group>
                <Form.Group className="pt-3">
                    <label>HARGA</label>
                    <Form.Control type="text" id="harga" value={hargaProduk} onChange={handleChangeHarga} required />
                </Form.Group>

                <Button className="btn btn-success mt-3" type="submit" onClick={handleChange}>Edit Barang</Button>
            </Form>
        </div>
    )
}
export default EditProdukPage;

