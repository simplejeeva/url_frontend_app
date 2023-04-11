import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  useEffect(() => {
    const user = JSON.stringify(localStorage.getItem("userName"));
    if (user) {
      setUsername(user);
    }
  }, []);
  const HandleClick = () => {
    localStorage.clear();
    navigate("/");
    toast.success("Logout Success");
  };
  return (
    <>
      <Toaster />
      <div className="container bg-light rounded mx-auto shadow">
        <div className="d-flex justify-content-between py-2">
          <h6 className="mx-2 my-auto">
            Welcome, <span className="fw-bolder">{username}</span>
          </h6>
          <button
            className="btn btn-outline-primary mx-2"
            onClick={HandleClick}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default NavBar;
