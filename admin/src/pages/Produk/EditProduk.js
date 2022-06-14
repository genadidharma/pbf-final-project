import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, ButtonGroup, Card, Col, Form, InputGroup, Row, Table } from '@themesberg/react-bootstrap';
import { onValue, query, ref, remove } from "firebase/database";
import React from "react";
import { useState, useEffect } from "react";
import { update } from "firebase/database";
import { useHistory, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { db } from "../../Database/config";
import { Routes } from "../../routes";

export default () => {
    const history = useHistory();
    const { id } = useParams()

    const [namaProduk, setNamaProduk] = useState("");
    const [jenisProduk, setJenisProduk] = useState("");
    const [gambarProduk, setGambarProduk] = useState("");
    const [qtyProduk, setQtyProduk] = useState("");
    const [hargaProduk, setHargaProduk] = useState("");

    const handleChangeNama = (e) => {
        setNamaProduk(e.target.value);
    }
    const handleChangeJenis = (e) => {
        setJenisProduk(e.target.value);
    }
    const handleChangeGambar = (e) => {
        setGambarProduk(e.target.value);
    }
    const handleChangeQty = (e) => {
        setQtyProduk(e.target.value);
    }
    const handleChangeHarga = (e) => {
        setHargaProduk(e.target.value);
    }

    useEffect(() => {
        const dbRef = ref(db, `produk/${id}`);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            setNamaProduk(data.namaProduk)
            setJenisProduk(data.jenisProduk)
            setGambarProduk(data.gambarProduk)
            setQtyProduk(data.qtyProduk)
            setHargaProduk(data.hargaProduk)
        });
    }, [])

    const updateToDatabase = () => {
        update(ref(db, `produk/${id}`), {
            namaProduk,
            jenisProduk,
            gambarProduk,
            qtyProduk,
            hargaProduk
        });
        history.push('/produk');
    };

    return (
        <div>
            <Form>
                <Form.Group>
                    <label>NAMA PRODUK</label>
                    <Form.Control type="text" id="namaproduk" value={namaProduk} onChange={handleChangeNama} />
                </Form.Group>
                <Form.Group className="pt-3">
                    <label>JENIS PRODUK</label>
                    <div class="input-group">
                        <label class="input-group-text" for="jenisproduk">Options</label>
                        <select class="form-select" id="jenisproduk" value={jenisProduk} onChange={handleChangeJenis}>
                            <option selected>Choose...</option>
                            <option value="Aksesoris">Aksesoris</option>
                            <option value="Part Mesin">Part Mesin</option>
                            <option value="Body Kit">Body Kit</option>
                            <option value="Ban">Ban</option>
                        </select>
                    </div>
                </Form.Group>
                <Form.Group className="pt-3">
                    <label>URL Gambar</label>
                    <Form.Control type="text" id="gambar" value={gambarProduk} onChange={handleChangeGambar} />
                </Form.Group>
                <Form.Group className="pt-3">
                    <label>QTY</label>
                    <Form.Control type="number" id="qty" value={qtyProduk} onChange={handleChangeQty} />
                </Form.Group>
                <Form.Group className="pt-3">
                    <label>HARGA</label>
                    <Form.Control type="text" id="harga" value={hargaProduk} onChange={handleChangeHarga} />
                </Form.Group>

                <Button className="btn btn-success mt-3" type="submit" onClick={updateToDatabase}>Ubah</Button>
            </Form>
        </div>
    )
}