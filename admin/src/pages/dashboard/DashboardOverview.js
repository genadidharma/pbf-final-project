
import React from "react";
import { faBoxes, faCashRegister, faShoppingBasket, faTruckLoading } from '@fortawesome/free-solid-svg-icons';
import { Col, Row } from '@themesberg/react-bootstrap';
import { onValue, query, ref } from 'firebase/database';
import { useEffect, useState } from 'react';
import { CounterWidget } from "../../components/Widgets";
import { db } from '../../Database/config';

export default () => {
  const [jumlahProduk, setJumlahProduk] = useState(0)
  const [jumlahPesanaMasuk, setJumlahPesananMasuk] = useState(0)
  const [jumlahPesananDikemas, setJumlahPesananDikemas] = useState(0)

  useEffect(() => {
    const produkRef = query(ref(db, 'produk'));
    const transaksiMasukRef = query(ref(db, 'transaksi/masuk'))
    const transaksiDikemasRef = query(ref(db, 'transaksi/kemas'))

    onValue(produkRef, (snapshot) => {
      let count = Object.keys(snapshot.val()).length
      setJumlahProduk(count)
    })

    onValue(transaksiMasukRef, (snapshot) => {
      let count = Object.keys(snapshot.val()).length
      setJumlahPesananMasuk(count)
    })

    onValue(transaksiDikemasRef, (snapshot) => {
      let count = Object.keys(snapshot.val()).length
      setJumlahPesananDikemas(count)
    })
  }, [])

  return (
    <>
      <Row className="justify-content-md-center">
        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Produk"
            title={jumlahProduk}
            icon={faShoppingBasket}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Pesanan Masuk"
            title={jumlahPesanaMasuk}
            icon={faBoxes}
            iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={4} className="mb-4">
          <CounterWidget
            category="Pesanan Dikemas"
            title={jumlahPesananDikemas}
            icon={faTruckLoading}
            iconColor="shape-tertiary"
          />
        </Col>

      </Row>
    </>
  );
};
