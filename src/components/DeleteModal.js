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
            <h1>Confirm Deletion</h1>
            <p>Are you sure you want to delete invoice #{invoices[id]?.id}? This action cannot be undone.</p>
            <section className="modal-buttons-container">
            <button onClick={() => hide()} className="discard">close</button>
                <button onClick={() => { d(); nav("/"); }} className="delete">Delete</button>
                </section>
        </section>
    </section>;
}
export default DeleteModal;