import React from "react";
function Status({ title }) {
    switch (title) {
        case "paid":
            return (
                <section
                    className="status"
                    style={{
                        backgroundColor: "rgba(51, 214, 159, 0.06)",
                        color: "rgb(51, 214, 159)",
                    }}
                >
                    <section
                        className="small-circle"
                        style={{ backgroundColor: "rgb(51, 214, 159)" }}
                    ></section>
                    <p>Paid</p>
                </section>
            );
            break;
        case "pending":
            return (
                <section
                    className="status"
                    style={{
                        backgroundColor: "rgba(255, 143, 0, 0.06)",
                        color: "rgba(255, 143, 0, 1)",
                    }}
                >
                    <section
                        className="small-circle"
                        style={{ backgroundColor: "rgba(255, 143, 0, 1)" }}
                    ></section>
                    <p>Pending</p>
                </section>
            );
            break;
        default:
            return (
                <section
                    className="status"
                    style={{
                        backgroundColor: "rgba(55, 59, 83, 0.06)",
                        color: "rgba(55, 59, 83, 1)",
                    }}
                >
                    <section
                        className="small-circle"
                        style={{ backgroundColor: "rgba(55, 59, 83, 1)" }}
                    ></section>
                    <p>Draft</p>
                </section>
            );
            break;
    }
}
export default Status;
