import React from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "../assets/style.css";

const Home = () => {
  const currentUser = sessionStorage.getItem("username");

  return (
    <div>
      <Header />
      <div className="container" style={{ marginTop: "2rem", textAlign: "center" }}>
        <h3>Welcome to Best Cars Dealership Portal</h3>
        <p>Browse dealerships, read reviews, and share your own experience.</p>

        <div className="form_panel" style={{ maxWidth: "700px" }}>
          <div className="row" style={{ gap: "1rem", flexWrap: "wrap" }}>
            <Link className="homepage_links" to="/dealers" style={{ padding: "0.5rem 1rem" }}>
              View Dealers
            </Link>

            {!currentUser ? (
              <>
                <Link className="homepage_links" to="/login" style={{ padding: "0.5rem 1rem" }}>
                  Login
                </Link>
                <Link className="homepage_links" to="/register" style={{ padding: "0.5rem 1rem" }}>
                  Register
                </Link>
              </>
            ) : (
              <span className="small_header">Signed in as {currentUser}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
