import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import { ref, remove, update } from "firebase/database";
import { db } from "../database/config";


function Cart(props) {
    const history = useHistory();
    const handleChangeTambah = (qty, uuid) => {
        update(ref(db, `/keranjang/${uuid}`), {
            qty: qty + 1,
        });
        history.push('/cart');
    }
    const handleChangeKurang = (qty, uuid) => {
        update(ref(db, `/keranjang/${uuid}`), {
            qty: qty - 1,
        });
        history.push('/cart');
    }
    const convertToRupiah = (money) => {
        return new Intl.NumberFormat('id-id',
            { style: 'currency', currency: 'idr', minimumFractionDigits: 0 }).format(money);
    }
    const handleHapus = (uuid) => {
        remove(ref(db, `/keranjang/${uuid}`));
    };
    return (
        <tr>
            <td>{props.namaProduk}</td>
            <td>
                <button className="btn btn-outline-danger" onClick={() => handleChangeKurang(props.qty, props.uuid)}><FontAwesomeIcon icon={faMinus} /></button>
                <span className="ms-2 me-2">{props.qty}</span>
                <button className="btn btn-outline-success" onClick={() => handleChangeTambah(props.qty, props.uuid)}><FontAwesomeIcon icon={faPlus} /></button>
            </td>
            <td>{convertToRupiah(props.harga * props.qty)}</td>
            <td>
                <button className="btn btn-danger" onClick={() => handleHapus(props.uuid)}><FontAwesomeIcon icon={faTrash} /></button>
            </td>
        </tr>
    );
}



export default Cart;
