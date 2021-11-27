import React from "react";
import { useNavigate,useParams} from "react-router";
import rightArrow from "images/icon-arrow-right.svg";
import Status from "components/Status";
import { InvoiceContext } from "InvoiceContext";
import leftArrow from "images/icon-arrow-left.svg";
import { getMonthShortName } from "Date";
function InvoiceShort({ short,id, value }) {
    let nav = useNavigate();
    let params = useParams();
    let { invoices, setInvoices } = React.useContext(InvoiceContext);
    if (short) {
        let date = new Date(value.paymentDue);
        return (
            <section
                className="invoice-short body2"
                onClick={() => {
                    nav(`/invoice/${id}`);
                }}
            >
                <p className="invoice-id">
                    <span style={{ color: "var(--purple)" }}>#</span>
                    {value.id}
                </p>
                <p className="date">
                    Due {date.getDate().toString().padStart(2, "0")}{" "}
                    {getMonthShortName(date.getMonth())} {date.getFullYear()}
                </p>
                <p className="client-name">{value.clientName}</p>
                
                <section className="right-side">
                    <section className="absolute-center">
                        <h3 className="total-price">
                            £ {new Intl.NumberFormat("en-UK").format(value.total)}
                        </h3>
                    </section>
                    <Status title={value.status} />
                    <section className="absolute-center right-arrow">
                        <img src={rightArrow} alt="right-arrow" />
                    </section>
                </section>
                <section className="absolute-center">
                    <h3 className="total-price">
                        £ {new Intl.NumberFormat("en-UK").format(value.total)}
                    </h3>
                </section>
                <Status title={value.status} />
                <section className="absolute-center right-arrow">
                    <img src={rightArrow} alt="right-arrow" />
                </section>
            
            </section>
        );
    }
    let current = invoices[params.id];
    if (current === undefined)
        nav("/");
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
export default InvoiceShort;
