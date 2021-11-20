import React from "react";
import { useNavigate } from "react-router";
import rightArrow from "images/icon-arrow-right.svg";
import Status from "components/Status";
function Invoice({ short, id, value }) {
    let nav = useNavigate();
    if (short) {
        let date = new Date(value.paymentDue);
        const month = (n) => {
            switch (n) {
                case 0:
                    return "Jan";
                case 1:
                    return "Feb";
                case 2:
                    return "Mar";
                case 3:
                    return "Apr";
                case 4:
                    return "May";
                case 5:
                    return "Jun";
                case 6:
                    return "Jul";
                case 7:
                    return "Aug";
                case 8:
                    return "Sep";
                case 9:
                    return "Oct";
                case 10:
                    return "Nov";
                default:
                    return "Dec";
            }
        };
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
                    {month(date.getMonth())} {date.getFullYear()}
                </p>
                <p className="client-name">{value.clientName}</p>
                <section className="right-side">
                    <h3 className="total-price">
                        £ {new Intl.NumberFormat("en-UK").format(value.total)}
                    </h3>
                    <Status title={value.status}/>
                    <section>
                        <img src={rightArrow} alt="right-arrow" />
                    </section>
                </section>
            </section>
        );
    }
    return null;
}
export default Invoice;
