import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "css/App.css";
import "css/Home.css";
import "css/Invoice.css";
import PageNotFound from "pages/PageNotFound";
import Home from "pages/Home";
import logo from "images/logo.svg";
import * as allInvoices from "data.json";
import { InvoiceContext } from "InvoiceContext";
import InvoiceDetailed from "components/InvoiceDetailed";
import InvoiceShort from "components/InvoiceShort";
function App() {
    const [invoices, setInvoices] = useState([]);
    const [theme, setTheme] = useState(false);
    useEffect(() => {
        let data = localStorage.getItem("invoices");
        if (data != null) {
            setInvoices(JSON.parse(data));
        } else {
            setInvoices(allInvoices.default);
        }
    }, []);
    useEffect(() => {
        localStorage.setItem("invoices", JSON.stringify(invoices));
    }, [invoices]);
    return (
        <div className={`app-container ${theme ? "dark" : "light"}`}>
            <aside className="sidebar">
                <section className="big-square">
                    <img className="logo" src={logo} alt="logo" />
                    <section className="small-square"></section>
                </section>
                <section className="sidebar-footer">
                    <section className="change-theme-container">
                        <section
                            className="change-theme"
                            onClick={() => setTheme(!theme)}
                        ></section>
                    </section>
                    <section className="avatar"></section>
                </section>
            </aside>
            <InvoiceContext.Provider value={{ invoices, setInvoices }}>
                <Router>
                    <Routes>
                        <Route path="/" exact element={<Home />} />
                        <Route path="/home" exact element={<Home />} />
                        <Route path="/invoice/:id" element={<InvoiceShort short={false} />} />
                        <Route element={<PageNotFound />} />
                    </Routes>
                </Router>
            </InvoiceContext.Provider>
        </div>
    );
}

export default App;
