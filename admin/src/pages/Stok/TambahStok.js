import React, { Component, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faPlus, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Form, InputGroup } from '@themesberg/react-bootstrap';
import { set, ref, onValue, push } from "firebase/database"
import { db } from "../../Database/config"
import { uid } from "uid";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default () => {
    const history = useHistory();

    const [listProduk, setListProduk] = useState([]);
    const [produkId, setProdukId] = useState("")
    const [qtyProduk, setQtyProduk] = useState("");

    useEffect(() => {
        const dbRef = ref(db, 'produk');
        onValue(dbRef, (snapshot) => {
            let records = [];
            snapshot.forEach(childSnapshot => {
                let keyName = childSnapshot.key;
                let data = childSnapshot.val();
                records.push({ "key": keyName, "data": data });
            });
            setListProduk(records)
        });
    }, [])

    const handleChangeProduk = (e) => {
        setProdukId(e.target.value);
    }
    const handleChangeQty = (e) => {
        setQtyProduk(e.target.value);
    }

    const addToDatabase = () => {
        set(ref(db, `stok/${produkId}`), {
            qtyProduk
        });
        history.push('/stok');
    };
    return (
        <div>
            <Form>
                <Form.Group className="pt-3">
                    <label>PRODUK</label>
                    <div class="input-group">
                        <label class="input-group-text" for="jenisproduk">Options</label>
                        <select class="form-select" id="jenisproduk" onChange={handleChangeProduk}>
                            <option selected disabled>Choose...</option>
                            {listProduk.map((row) => {
                                return (
                                    <option key={row.data.uuid} value={row.data.uuid}>{row.data.namaProduk}</option>
                                )
                            })}
                        </select>
                    </div>
                </Form.Group>
                <Form.Group className="pt-3">
                    <label>QTY</label>
                    <Form.Control type="number" id="qty" value={qtyProduk} onChange={handleChangeQty} />
                </Form.Group>

                <Button className="btn btn-success mt-3" type="submit" onClick={addToDatabase}>Tambah</Button>
            </Form>
        </div>
    )
}

