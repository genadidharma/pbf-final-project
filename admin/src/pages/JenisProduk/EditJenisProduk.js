import React, { Component, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faPlus, faSearch, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Form, InputGroup } from '@themesberg/react-bootstrap';
import { set, ref, onValue, push, update } from "firebase/database"
import { db } from "../../Database/config"
import { uid } from "uid";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default () => {
    const history = useHistory();
    const { id } = useParams()

    const [namaJenisProduk, setNamaJenisProduk] = useState("");

    useEffect(() => {
        const dbRef = ref(db, `jenis_produk/${id}`);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            setNamaJenisProduk(data.nama)
        });
    }, [])

    const handleChangeNama = (e) => {
        setNamaJenisProduk(e.target.value);
    }

    const updateToDatabase = () => {
        update(ref(db, `jenis_produk/${id}`), {
            nama: namaJenisProduk,
        });
        history.push('/jenis-produk');
    };
    return (
        <div>
            <Form>
                <Form.Group className="pt-3">
                    <label>PRODUK</label>
                </Form.Group>
                <Form.Group className="pt-3">
                    <label>Nama</label>
                    <Form.Control type="text" id="nama" value={namaJenisProduk} onChange={handleChangeNama} />
                </Form.Group>

                <Button className="btn btn-success mt-3" type="submit" onClick={updateToDatabase}>Ubah</Button>
            </Form>
        </div>
    )
}

