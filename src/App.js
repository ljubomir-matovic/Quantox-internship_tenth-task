import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Error404 from "pages/Error404";
import Home from "pages/Home";
import logo from "images/logo.svg";
function App() {
    return (
        <div className="app-container">
            <section className="sidebar">
                <section className="big-square">
                    <img className="logo" src={logo} alt="logo" />
                    <section className="small-square"></section>
                </section>
            </section>
            <Router>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/home" exact element={<Home />} />
                    <Route path="/invoice/:id" element={<Error404 />} />
                    <Route element={<Error404 />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
