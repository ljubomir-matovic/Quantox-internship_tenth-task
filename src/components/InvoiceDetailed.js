import React,{useContext,useEffect,useState} from "react";
import { useNavigate,useParams } from "react-router";
import { InvoiceContext } from "InvoiceContext";
import leftArrow from "images/icon-arrow-left.svg";
import Status from "./Status";
function InvoiceDetailed(){
    let nav=useNavigate();
    let { invoices, setInvoices } = useContext(InvoiceContext);
    let params=useParams();
    let current = invoices[params.id];
    useEffect(() => {
            if (current === undefined)
            nav("/");
    }, []);
    return <section className="invoice-detailed">
        <section className="go-back" onClick={()=>{nav("/");}}>
            <section className="absolute-center">
            <img src={leftArrow} alt="left-arrow" className="left-arrow"/>
            <p>Go back</p>
            </section>
        </section>
        <header className="desktop">
            <section className="status-container">
                Status <Status title={current && current.status}/>
            </section>
            <button className="button1">Edit</button>
            <button className="delete">Delete</button>
            <button onClick={() => {
                if(current.status==="pending")
                {
                    let a = invoices.map((v, i) => i === Number(params.id) ? { ...v, status: "paid" } : v);
                    setInvoices(a);
                }
            }}>Mark as paid</button>
        </header>
    </section>;
}
export default InvoiceDetailed;