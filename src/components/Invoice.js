import React from "react";
import { useNavigate, useParams } from "react-router";
import { Routes, Route } from "react-router-dom";
import rightArrow from "images/icon-arrow-right.svg";
import Status from "components/Status";
import { InvoiceContext } from "InvoiceContext";
import leftArrow from "images/icon-arrow-left.svg";
import { getMonthShortName,makeDate } from "Date";
import DeleteModal from "./DeleteModal";
import Form from "./Form";
function Invoice({ short, id, value }) {
    const [deleteModal, setDeleteModal] = React.useState(false);
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
    const itemsTitles = ["Item Name", "QTY.", "Price", "Total"];
    let current = invoices[params.id];
    if (current === undefined)
        nav("/");
  return (
      <>
        <section className="invoice-detailed">
            <DeleteModal show={deleteModal} hide={() => setDeleteModal(false)} id={params.id} />
            <section className="invoice-content">
        <section className="go-back " onClick={() => { nav("/"); }}>
            <section className="absolute-center">
                <img src={leftArrow} alt="left-arrow" className="left-arrow" />
            </section>
            <section className="absolute-center">
                <p className="absolute-center">Go back</p>
            </section>
        </section>
        <header className="desktop">
            <section className="status-container absolute-center">
                Status <Status title={current?.status}/>
                    </section>
            <section className="navigate-buttons">
              <button className="button1 edit-button" onClick={
                () => { nav(`/invoice/${params.id}/edit-invoice`);}
            }>Edit</button>
            <button className="delete" onClick={()=>setDeleteModal(true)}>Delete</button>
            <button onClick={() => {
                if(current.status==="pending")
                {
                    let a = invoices.map((v, i) => i === Number(params.id) ? { ...v, status: "paid" } : v);
                    setInvoices(a);
                }
            }} className="mark-as-paid">Mark as paid</button>
            </section>
                </header>

                <section className="single-card">
          <section className="single-id-container">
            <p className="single-id">#{current?.id}</p>
            <p>{current?.clientName}</p>
          </section>
          <section className="sender-address">
            <p>{current?.senderAddress?.street}</p>
            <p>{current?.senderAddress?.city}</p>
            <p>{current?.senderAddress?.postCode}</p>
            <p>{current?.senderAddress?.country}</p>
          </section>
          <section className="date-due-container">
            <section className="date-to">
              <p>Invoice Date</p>
              <h4>{makeDate(current?.createdAt)}</h4>
            </section>
            <section className="date-to">
              <p>Payment Due</p>
              <h4>{makeDate(current?.paymentDue)}</h4>
            </section>
          </section>
          <section className="client-location">
            <p>Bill To</p>
            <h2>{current?.clientName}</h2>
            <p>{current?.clientAddress?.street}</p>
            <p>{current?.clientAddress?.city}</p>
            <p>{current?.clientAddress?.postCode}</p>
            <p>{current?.clientAddress?.country}</p>
          </section>

          <section className="recepient-mail">
            <p className="rm-desc">Sent to</p>
            <p className="rm-email">{current?.clientEmail}</p>
          </section>
          <section className="items-sum">
            <section className="item-info item-title">
              <section className="item-info-name">
                <p>{itemsTitles[0]}</p>
              </section>
              <section className="item-info-quantity">
                <p>{itemsTitles[1]}</p>
              </section>
              <section>
                <p>{itemsTitles[2]}</p>
              </section>
              <section className="item-info-total">
                <p>{itemsTitles[3]}</p>
              </section>
            </section>

            <section className="items-infos-all">
              {current?.items?.map((item, index) => {
                return (
                  <section className="item-info item-properties" key={index}>
                    <section className="item-info-name">
                      <p>{item.name}</p>
                    </section>
                    <section className="item-info-quantity">
                      <p>{item.quantity}</p>
                    </section>
                    <section className="item-info-price">
                      <p>£{item.price}</p>
                    </section>
                    <section className="item-info-total">
                      <p>£{item.total}</p>
                    </section>
                  </section>
                );
              })}
            </section>
            <section className="amount-due">
              <p>Amount Due</p>
              <p>£{current?.total}</p>
            </section>
          </section>
        </section>
      </section>
      </section>
      <Routes>
        <Route path="edit-invoice" element={<Form type={'editInvoice'} invoice={current} />} />
      </Routes>
      </>);
}
export default Invoice;
