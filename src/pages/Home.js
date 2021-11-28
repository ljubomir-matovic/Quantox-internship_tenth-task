import React, { useContext,useState,useEffect} from "react";
import { InvoiceContext } from "InvoiceContext";
import empty from "images/illustration-empty.svg";
import Invoice from "components/Invoice";
import { Route,Routes,Link } from "react-router-dom";
import Form from "components/Form";
function Home() {
    const { invoices } = useContext(InvoiceContext);
    const [filters, setFilters] = useState([true, true, true]);
    const FilterArray = (a) => (v, i) => i === a ? !v : v;
    const Filter =()=>(v, i) => {
            if ((filters.length === 0) || (filters.every((v,i)=>!v)) || (filters[0] && v.status === "draft") || (filters[1] && v.status === "pending") || (filters[2] && v.status === "paid"))
                return true;
            return false;
    };
    const [l, setl] = useState(invoices.length);
    useEffect(() => setl(invoices.filter(Filter()).length), [filters]);
    return (
            <>
            <section className="home-container">
                <header>
                    <section className="title">
                        <h1>Invoices</h1>
                        <p>
                            {l
                                ? `There are ${l} total `
                                : " No "}
                            invoices
                        </p>
                    </section>
                    <div className="dropdown">
                        <button className="dropbtn">Dropdown</button>
                        <div className="dropdown-content">
                            <section><input type="checkbox" name="draft" onChange={() => setFilters(filters.map(FilterArray(0)))} defaultChecked={true} />Draft</section>
                            <section><input type="checkbox" name="draft" onChange={() => setFilters(filters.map(FilterArray(1)))} defaultChecked={true} />Pending</section>
                            <section><input type="checkbox" name="draft" onChange={() => setFilters(filters.map(FilterArray(2)))} defaultChecked={true} />Paid</section>
                            </div>
                        </div>
                    <Link to="/new-invoice"><button>New <span className="desktop">Invoice</span></button></Link>
                </header>
                {invoices.length ? (
                    <main>
                        {invoices.filter(Filter()).map((v, i) => (
                            <Invoice key={i} value={v} id={i} short={true}/>
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
            <Routes>
                <Route path="new-invoice" element={<Form type={"newInvoice"} />} />
            </Routes>
            </>
        );
}
export default Home;
