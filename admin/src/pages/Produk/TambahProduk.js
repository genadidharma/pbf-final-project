import React, { Component } from "react";
import { Button, Form } from '@themesberg/react-bootstrap';
import { ref, set } from "firebase/database";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { uid } from "uid";
import { db } from "../../Database/config";

export default () => {
    const history = useHistory();

    const [namaProduk, setNamaProduk] = useState("");
    const [jenisProduk, setJenisProduk] = useState("");
    const [qtyProduk, setQtyProduk] = useState("");
    const [hargaProduk, setHargaProduk] = useState("");
    // const [fotoProduk , setFotoProduk] = useState("");


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

    // const handleChangeFoto = (e) =>{
    //     setHargaProduk(e.target.files[0]);
    // }

    const addToDatabase = () => {
        const uuid = uid();
        set(ref(db, `produk/${uuid}`), {
            namaProduk,
            jenisProduk,
            qtyProduk,
            hargaProduk,
            uuid
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
                        <select class="form-select" id="jenisproduk" onChange={handleChangeJenis}>
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
                    <Form.Control type="number" id="qty" value={qtyProduk} onChange={handleChangeQty} />
                </Form.Group>
                <Form.Group className="pt-3">
                    <label>HARGA</label>
                    <Form.Control type="text" id="harga" value={hargaProduk} onChange={handleChangeHarga} />
                </Form.Group>

                <Button className="btn btn-success mt-3" type="submit" onClick={addToDatabase}>Tambahkan Sekarang</Button>
            </Form>
        </div>
    )
}