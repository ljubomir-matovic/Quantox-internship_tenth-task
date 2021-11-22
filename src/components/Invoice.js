import React,{useContext} from "react";
import { useNavigate,useParams } from "react-router";
import rightArrow from "images/icon-arrow-right.svg";
import Status from "components/Status";
import { InvoiceContext } from "InvoiceContext";
import { getMonthShortName } from "Date";
function Invoice({ short, id, value }) {
    let nav = useNavigate();
    let {invoices}=useContext(InvoiceContext);
    let params=useParams();
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
                    <Status title={value.status}/>
                    <section>
                        <img src={rightArrow} alt="right-arrow" />
                    </section>
                </section>
            </section>
        );
    }
    let current=invoices[params.id];
    if(current===undefined)
        nav("/");
    return <section>
        aaa
    </section>;
}
export default Invoice;
