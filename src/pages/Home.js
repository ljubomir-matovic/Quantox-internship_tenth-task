import React, { useContext,useState,useEffect} from "react";
import { InvoiceContext } from "InvoiceContext";
import empty from "images/illustration-empty.svg";
import Invoice from "components/Invoice";
import { useNavigate } from "react-router";
import { Route,Routes} from "react-router-dom";
import Form from "components/Form";
import plus from "images/icon-plus.svg";
import arrowDown from "images/icon-arrow-down.svg";
function Home() {
    const navigate = useNavigate();
    const { invoices } = useContext(InvoiceContext);
    const [filters, setFilters] = useState([true, true, true]);
    const FilterArray = (a) => (v, i) => i === a ? !v : v;
    const Filter =()=>(v, i) => {
            if ((filters.length === 0) || (filters.every((v,i)=>!v)) || (filters[0] && v.status === "draft") || (filters[1] && v.status === "pending") || (filters[2] && v.status === "paid"))
                return true;
            return false;
    };
    const [l, setl] = useState(0);
    useEffect(() => setl(invoices.filter(Filter()).length), [filters,invoices.length]);
    return (
            <>
            <section className="home-container">
                <header>
                    <section className="title">
                        <h1>Invoices</h1>
                        <p>
                            {l
                                ? <><span className="desktop">There are</span> {l} <span className="desktop">total </span></>
                                : " No "}
                            invoices
                        </p>
                    </section>
                    <section className="header-end">
                    <div className="dropdown">
                            <button className="dropbtn absolute-center"><span>Filter &nbsp;</span><span className="desktop">by status</span><span><img src={arrowDown} alt="arrow-down"/></span></button>
                        <div className="dropdown-content">
                            <section className="dropdown-item"><input type="checkbox" id="draft" onChange={() => setFilters(filters.map(FilterArray(0)))} defaultChecked={true} /><label htmlFor="draft">Draft</label></section>
                            <section className="dropdown-item"><input type="checkbox" id="pending" onChange={() => setFilters(filters.map(FilterArray(1)))} defaultChecked={true} /><label htmlFor="pending">Pending</label></section>
                            <section className="dropdown-item"><input type="checkbox" id="paid" onChange={() => setFilters(filters.map(FilterArray(2)))} defaultChecked={true} /><label htmlFor="paid">Paid</label></section>
                            </div>
                        </div>
                    <button onClick={()=>navigate("/new-invoice")}className="new-invoice absolute-center"><section className="plus absolute-center"><img src={plus} alt={plus}/></section>New <span className="desktop"> Invoice</span></button>
                    </section>
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
