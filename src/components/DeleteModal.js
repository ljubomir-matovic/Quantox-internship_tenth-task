import { InvoiceContext } from "InvoiceContext";
import React,{useContext} from "react";
import { useNavigate } from "react-router";
function DeleteModal({ show, hide, id }) {
    const nav = useNavigate();
    let { invoices, setInvoices } = useContext(InvoiceContext);
    const d=() => {
        setInvoices(invoices.filter((v, i) => i !== Number(id)));
    };
    return <section className={`modal-del-overlay ${show ? "" : "hide"}`} onClick={(e) => {
        if (e.target.className === "modal-del-overlay ")
            hide();
    }}>
        <section className="modal-del-container">
            <button onClick={() => hide()}>close</button>
            <button onClick={() => { d(); nav("/");}}>Delete</button>
        </section>
    </section>;
}
export default DeleteModal;