import React, { useContext } from "react";
import { InvoiceContext } from "InvoiceContext";
import Invoice from "components/Invoice";
import empty from "images/illustration-empty.svg";
function Home() {
    const { invoices } = useContext(InvoiceContext);
    return (
        <section className="home-container">
            <header>
                <section className="title">
                    <h1>Invoices</h1>
                    <p>
                        {invoices.length
                            ? `There are ${invoices.length} total `
                            : " No "}
                        invoices
                    </p>
                </section>
            </header>
            {invoices.length ? (
                <main>
                    {invoices.map((v, i) => (
                        <Invoice short={true} key={i} value={v} id={i} />
                    ))}
                </main>
            ) : (
                <section className="empty-container">
                <img className="illustration-empty" src={empty} alt="empty"/>
                <h3 className="nothing-here-title">
                    There is nothing here
                </h3>
                <p className="nothing-here-description">
                    Create an invoice clickking the 
                    <span className="new-invoice-nothing-here"> New {window.screen.width>600?"Invoice":""}</span> button
                    and get started
                </p>
            </section>
            )}
        </section>
    );
}
export default Home;
