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
                        There are
                        {invoices.length
                            ? ` ${invoices.length} total `
                            : " no "}
                        invoices.
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
                <img src={empty} alt="logo" />
            )}
        </section>
    );
}
export default Home;
