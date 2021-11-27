import React, { useContext,useState,useEffect } from "react";
import { InvoiceContext } from "InvoiceContext";
import empty from "images/illustration-empty.svg";
import InvoiceShort from "components/InvoiceShort";
function Home() {
    const { invoices } = useContext(InvoiceContext);
    const initialFilter=()=>(v,i)=>true;
    const [filters, setFilters] = useState(initialFilter);
        return (
            <section className="home-container">
                <header>
                    <section className="title">
                        <h1>Invoices</h1>
                        <p>
                            {invoices.filter(filters).length
                                ? `There are ${invoices.length} total `
                                : " No "}
                            invoices
                        </p>
                    </section>
                </header>
                {invoices.length ? (
                    <main>
                        {invoices.filter(filters).map((v, i) => (
                            <InvoiceShort key={i} value={v} id={i} short={true}/>
                        ))}
                    </main>
                ) : (
                    <section className="empty-container">
                        <img className="illustration-empty" src={empty} alt="empty" />
                        <h3 className="nothing-here-title">
                            There is nothing here
                        </h3>
                        <p className="nothing-here-description">
                            Create an invoice clickking the
                            <span className="new-invoice-nothing-here"> New <span>Invoice</span></span> button
                            and get started
                        </p>
                    </section>
                )}
            </section>
        );
}
export default Home;
